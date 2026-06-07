import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// ─── Rate Limiter ────────────────────────────────────────────────────────────
// In-memory store: works for a single-instance server (local dev, small VPS).
// For Vercel/serverless (multiple instances), replace with Upstash Redis:
//   https://upstash.com/docs/redis/sdks/ratelimit-ts/overview
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 30 * 60 * 1000; // 15-minute sliding window
const MAX_PER_WINDOW = 3;          // max 3 submissions per IP per window

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  if (entry.count >= MAX_PER_WINDOW) return true;
  entry.count++;
  return false;
}

// ─── HTML Escaping ───────────────────────────────────────────────────────────
// Prevents XSS: if someone puts <script>alert(1)</script> in their name,
// it becomes &lt;script&gt; in the email — harmless text.
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// ─── Header Injection Guard ──────────────────────────────────────────────────
// Email headers can be hijacked if a field contains \n or \r.
// e.g. name = "Alice\nBcc: victim@evil.com" would add a secret Bcc header.
function containsNewline(str: string): boolean {
  return /[\r\n]/.test(str);
}

export async function POST(req: NextRequest) {
  // ── 1. Rate limit by IP ──────────────────────────────────────────────────
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    req.headers.get('x-real-ip') ||
    'unknown';

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429 }
    );
  }

  try {
    const body = await req.json() as {
      name: string;
      email: string;
      message: string;
      website?: string; // honeypot field
    };

    const { name, email, message, website } = body;
    console.log("body", body);

    // ── 2. Honeypot check ──────────────────────────────────────────────────
    // Real users never see or fill this field (it's hidden via CSS).
    // Bots that blindly fill all inputs get silently rejected.
    if (website) {
      // Return 200 to not tip off the bot that it was blocked.
      console.log("inside website", website);
      return NextResponse.json({ ok: true });
    }

    // ── 3. Server-side validation (never trust the client) ─────────────────
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      console.log("inside server side validation");
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      console.log("inside regex of email");
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 });
    }

    // ── 4. Input length limits ─────────────────────────────────────────────
    // Stops 10MB message payloads from hitting your SMTP server.
    if (name.length > 100 || email.length > 254 || message.length > 2000) {
      console.log("inside input  length");
      return NextResponse.json({ error: 'Input too long.' }, { status: 400 });
    }

    // ── 5. Header injection guard ──────────────────────────────────────────
    if (containsNewline(name) || containsNewline(email)) {
      console.log("inside header injection");
      return NextResponse.json({ error: 'Invalid input.' }, { status: 400 });
    }

    // ── 6. Escape HTML before injecting into email body ────────────────────
    const safeName = escapeHtml(name.trim());
    const safeEmail = escapeHtml(email.trim());
    const safeMessage = escapeHtml(message.trim()).replace(/\n/g, '<br/>');

    const transporter = nodemailer.createTransport({
      host: 'smtp.zoho.com',
      port: 465,
      secure: true, // SSL on port 465
      auth: {
        user: process.env.ZOHO_USER,
        pass: process.env.ZOHO_PASSWORD,
      },
    });

    console.log("inside 6", transporter);
    const info = await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.ZOHO_USER}>`,
      to: process.env.ZOHO_USER,
      replyTo: email.trim(), // safe: nodemailer validates the header value
      subject: `Portfolio Contact from ${name.trim()}`,
      html: `
        <div style="font-family: Inter, sans-serif; max-width: 560px; margin: 0 auto; padding: 32px; border: 1px solid #e5e7eb; border-radius: 12px;">
          <h2 style="margin: 0 0 8px; color: #111827; font-size: 1.25rem;">New message from your portfolio</h2>
          <p style="margin: 0 0 24px; color: #6b7280; font-size: 0.9rem;">Someone reached out via the contact form.</p>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; font-size: 0.85rem; width: 80px;">Name</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #111827; font-weight: 600;">${safeName}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; font-size: 0.85rem;">Email</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #0d9488; font-weight: 600;">
                <a href="mailto:${safeEmail}" style="color: #0d9488;">${safeEmail}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #6b7280; font-size: 0.85rem; vertical-align: top;">Message</td>
              <td style="padding: 10px 0; color: #111827; line-height: 1.6;">${safeMessage}</td>
            </tr>
          </table>
        </div>
      `,
    });

    // info.accepted → addresses the SMTP server accepted
    // info.rejected → addresses it refused (non-empty = delivery failed)
    // info.response → raw SMTP reply, e.g. "250 OK" means queued for delivery
    console.log('[contact] SMTP response:', info.response);
    console.log('[contact] Accepted:', info.accepted);

    if (info.rejected.length > 0) {
      console.error('[contact] Rejected addresses:', info.rejected);
      return NextResponse.json({ error: 'Mail delivery rejected.' }, { status: 502 });
    }

    return NextResponse.json({ ok: true, messageId: info.messageId });
  } catch (err) {
    console.error('Contact mail error:', err);
    return NextResponse.json({ error: 'Failed to send message.' }, { status: 500 });
  }
}
