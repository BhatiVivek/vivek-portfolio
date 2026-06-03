'use client';

import { useRef, useState } from 'react';
import styles from '../../app/home.module.css';

type FieldErrors = { name?: string; email?: string; message?: string };

function validate(name: string, email: string, message: string): FieldErrors {
  const errors: FieldErrors = {};
  if (!name.trim()) errors.name = 'Name is required.';
  if (!email.trim()) {
    errors.email = 'Email is required.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Enter a valid email address.';
  }
  if (!message.trim()) errors.message = 'Message is required.';
  if (name.length > 100) errors.name = 'Name is too long.';
  if (message.length > 2000) errors.message = 'Message must be under 2000 characters.';
  return errors;
}

export default function ContactSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState(''); // never shown to real users
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  // Record when the form was rendered.
  // Bots submit instantly; humans take at least a couple of seconds.
  const loadedAt = useRef(Date.now());

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Time-based bot check: reject submissions under 1.5 seconds.
    const elapsed = Date.now() - loadedAt.current;
    if (elapsed < 1500) {
      // Silently ignore — don't tell the bot why it failed.
      return;
    }

    const fieldErrors = validate(name, email, message);
    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length > 0) return;

    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message, website: honeypot }),
      });

      if (res.status === 429) {
        setStatus('error');
        setErrors({ message: 'Too many messages sent. Please try again in 30 minutes.' });
        return;
      }

      if (!res.ok) throw new Error();
      setStatus('sent');
      setName(''); setEmail(''); setMessage('');
    } catch {
      setStatus('error');
    }
  };

  const fieldStyle = (hasError: boolean): React.CSSProperties => ({
    borderColor: hasError ? '#ef4444' : undefined,
  });

  return (
    <section id="contact" className="container section-spacer" style={{ marginBottom: '100px' }}>
      <p className="section-label fade-up" style={{ textAlign: 'center' }}>Get in Touch</p>
      <div className={`spotlight-card ${styles.contactCard} fade-up`}>
        <h2 style={{ textAlign: 'center', marginBottom: '8px' }}>Let&apos;s Connect</h2>
        <p style={{ textAlign: 'center', marginBottom: '32px' }}>
          Interested in building something together? Drop me a line.
        </p>

        {status === 'sent' ? (
          <div style={{
            textAlign: 'center', padding: '40px 0',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px',
          }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--accent-glow)" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10" /><polyline points="9 12 11 14 15 10" />
            </svg>
            <p style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '1.05rem', margin: 0 }}>
              Message sent!
            </p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
              I&apos;ll get back to you soon.
            </p>
            <button
              onClick={() => setStatus('idle')}
              className="btn btn-secondary"
              style={{ marginTop: '8px' }}
            >
              Send another
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate>

            {/* ── Honeypot ─────────────────────────────────────────────────
                Real users never see this (positioned off-screen).
                Bots that fill all inputs get silently rejected server-side.
                tabIndex={-1} and autoComplete="off" reduce false positives
                from browser autofill.
            ─────────────────────────────────────────────────────────────── */}
            <input
              type="text"
              name="website"
              value={honeypot}
              onChange={e => setHoneypot(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}
            />

            <div className={styles.inputGroup}>
              <input
                id="contact-name"
                type="text"
                className="form-input"
                placeholder="Your Name *"
                maxLength={100}
                value={name}
                onChange={(e) => { setName(e.target.value); setErrors((p) => ({ ...p, name: undefined })); }}
                style={fieldStyle(!!errors.name)}
              />
              {errors.name && <p style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '4px' }}>{errors.name}</p>}
            </div>

            <div className={styles.inputGroup}>
              <input
                type="email"
                className="form-input"
                placeholder="Your Email *"
                maxLength={254}
                value={email}
                onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: undefined })); }}
                style={fieldStyle(!!errors.email)}
              />
              {errors.email && <p style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '4px' }}>{errors.email}</p>}
            </div>

            <div className={styles.inputGroup}>
              <textarea
                className="form-input"
                rows={4}
                placeholder="Message *"
                maxLength={2000}
                value={message}
                onChange={(e) => { setMessage(e.target.value); setErrors((p) => ({ ...p, message: undefined })); }}
                style={fieldStyle(!!errors.message)}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
                {errors.message
                  ? <p style={{ color: '#ef4444', fontSize: '0.8rem', margin: 0 }}>{errors.message}</p>
                  : <span />
                }
                <p style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', margin: 0 }}>
                  {message.length}/2000
                </p>
              </div>
            </div>

            {status === 'error' && !errors.message && (
              <p style={{ color: '#ef4444', fontSize: '0.85rem', marginBottom: '16px', textAlign: 'center' }}>
                Something went wrong. Please try again.
              </p>
            )}

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: '100%' }}
              disabled={status === 'sending'}
            >
              {status === 'sending' ? 'Sending…' : 'Send Message'}
            </button>
          </form>
        )}

        <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'center', gap: '24px' }}>
          <a href="https://www.linkedin.com/in/vivek-bhati-94324063/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 500 }}>LinkedIn</a>
          <a href="https://github.com/bhativivek" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 500 }}>GitHub</a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('contact-name')?.focus();
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 500 }}
          >
            Email
          </a>
        </div>
      </div>
    </section>
  );
}
