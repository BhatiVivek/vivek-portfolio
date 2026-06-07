import type { NextConfig } from "next";

// Your production domain. In dev, requests come from localhost so we allow both.
const ALLOWED_ORIGIN =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // Apply these headers only to API routes
        source: "/api/:path*",
        headers: [
          // ── CORS ──────────────────────────────────────────────────────────
          // Tells browsers: only requests coming from ALLOWED_ORIGIN
          // are permitted to read the response.
          // Effect: if someone embeds your /api/contact in their own website,
          // the browser will block the response — even if the request gets through.
          {
            key: "Access-Control-Allow-Origin",
            value: ALLOWED_ORIGIN,
          },
          // Which HTTP methods this API accepts
          {
            key: "Access-Control-Allow-Methods",
            value: "POST, OPTIONS",
          },
          // Which request headers the browser is allowed to send
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type",
          },

          // ── Security Headers ───────────────────────────────────────────────
          // Prevents the response being loaded inside an <iframe> on another site
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          // Stops browsers from guessing the content type (MIME sniffing attacks)
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          // Tells browser not to send the Referer header to other origins
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
