import { NextRequest, NextResponse } from 'next/server';
import { runCrawl, getSlot } from '@/lib/crawl-job';

/**
 * POST /api/news/crawl
 *
 * Manual trigger for the crawler (admin panel "Run Now" button).
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
