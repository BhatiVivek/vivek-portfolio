import { NextRequest, NextResponse } from 'next/server';
import { runCrawl, getSlot } from '@/lib/crawl-job';

/**
 * GET /api/news/crawl
 *
 * Called automatically by Vercel Cron Jobs (see vercel.json).
 * Vercel always sends GET — secured via CRON_SECRET header.
 * Schedule: 06:00 UTC (morning) and 18:00 UTC (evening) daily.
 */
export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const slot = getSlot();
  runCrawl(slot).catch((err) => console.error('[Cron] Error:', err));

  return NextResponse.json({ message: `Cron triggered for ${slot} slot`, slot });
}

/**
 * POST /api/news/crawl
 *
 * Manual trigger from the News page "Run Now" button.
 * Accepts optional body: { slot: "morning" | "evening" }
 *
 * The crawl runs async — we fire it and return immediately so the
 * browser doesn't time out waiting. Poll GET /api/news to see results.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({})) as { slot?: 'morning' | 'evening' };
    const slot = body.slot ?? getSlot();

    // Fire-and-forget: don't await so the response returns quickly
    runCrawl(slot).catch((err) => console.error('[Crawl API] Error:', err));

    return NextResponse.json({
      message: `Crawl started for ${slot} slot`,
      slot,
    });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
