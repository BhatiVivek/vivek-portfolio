# Vivek Portfolio

Personal portfolio and AI-augmented content hub built with Next.js, Material UI, and MongoDB. Includes an automated news pipeline that crawls RSS feeds, summarizes articles with GPT-4o mini, and publishes a daily AI news brief.

## Live Site

| Page | URL |
|------|-----|
| Portfolio | [https://vivekbhati.vercel.app/](https://vivekbhati.vercel.app/) |
| AI News Brief | [https://vivekbhati.vercel.app/news](https://vivekbhati.vercel.app/news) |

## Features

- **Portfolio** — experience, skills, education, certifications, and contact form
- **AI News Brief** — RSS crawl → article extraction → GPT-4o mini summarization → MongoDB → `/news` UI
- **Blog & Videos** — content pages backed by MongoDB
- **MCP servers** — portfolio data and news crawler exposed via Model Context Protocol (`src/mcp/`)
- **Scheduled crawls** — Vercel Cron hits `/api/news/crawl` daily (see `vercel.json`)

## Tech Stack

Next.js 16 · React 19 · TypeScript · MUI · MongoDB · OpenAI · MCP SDK · Docker

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment Variables

Create `.env.local`:

```env
MONGODB_URI=
OPENAI_API_KEY=
CRON_SECRET=          # secures GET /api/news/crawl (Vercel Cron)
ZOHO_USER=            # contact form (optional)
ZOHO_PASSWORD=        # contact form (optional)
```

### Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run cron:now` | Trigger a news crawl locally |

### Docker

```bash
docker compose up --build
```

Serves the app at [http://localhost:3000](http://localhost:3000).

## What's Next

- **Admin panel for the news pipeline** — re-enable `/admin` and `/admin/news` with real authentication (planned as a separate auth service consumed by this app)
- **Manage crawl sources** — add, update, and remove RSS feed URLs from the admin UI instead of relying on seeded defaults in MongoDB
- **Configurable crawl schedule** — move from a single daily run to twice-daily crawls (morning + evening slots); the pipeline already supports `evening` slots — next step is wiring the second Vercel Cron job and exposing schedule controls in admin
- **Manual crawl triggers** — run a morning or evening crawl on demand from the admin dashboard (UI scaffolded, pending auth)

## Deploy

Deployed on [Vercel](https://vercel.com). Push to the connected branch to trigger a deploy.
