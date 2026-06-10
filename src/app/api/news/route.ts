import { createHash } from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import NewsArticle from '@/models/NewsArticle';
import ReadRecord from '@/models/ReadRecord';

function getIpHash(req: NextRequest): string {
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    req.headers.get('x-real-ip') ??
    'unknown';
  return createHash('sha256').update(ip).digest('hex');
}

// GET /api/news?slot=morning|evening&date=YYYY-MM-DD&limit=20
export async function GET(req: NextRequest) {
  try {
    // Step 1: Connect to DB
    await connectDB();

    // Step 2: Read query params from URL (slot, startDate, endDate, limit)
    const { searchParams } = new URL(req.url);
    const slot      = searchParams.get('slot');
    const startDate = searchParams.get('startDate'); // YYYY-MM-DD
    const endDate   = searchParams.get('endDate');   // YYYY-MM-DD
    const limit     = parseInt(searchParams.get('limit') || '20');

    // Step 3: Build MongoDB filter — optional date range between startDate and endDate
    const filter: Record<string, unknown> = {};
    if (slot) filter.slot = slot;
    if (startDate || endDate) {
      const range: Record<string, Date> = {};
      if (startDate) range.$gte = new Date(startDate);
      if (endDate) {
        const end = new Date(endDate);
        end.setDate(end.getDate() + 1); // include the end date fully
        range.$lt = end;
      }
      filter.published_at = range;
    }

    // Step 4: Query NewsArticle collection — sorted newest first, max 30
    const articles = await NewsArticle.find(filter)
      .sort({ published_at: -1 })
      .limit(limit)
      .lean();

    if (articles.length > 0) {
      // Step 5: Hash the caller's IP with SHA-256
      const ipHash     = getIpHash(req);

      // Step 6: Query ReadRecord collection — only records matching this IP + these article IDs
      const articleIds  = articles.map((a) => a._id);
      const readRecords = await ReadRecord.find({
        ipHash,
        articleId: { $in: articleIds },
      }).lean();

      // Step 7: Convert read records into a Set for fast O(1) lookup
      const readSet = new Set(readRecords.map((r) => String(r.articleId)));

      // Step 8: Loop over articles, add is_read based on whether article ID is in the Set
      const articlesWithRead = articles.map((a) => ({
        ...a,
        is_read: readSet.has(String(a._id)),
      }));

      // Step 9: Return articles with is_read overlaid
      return NextResponse.json({ articles: articlesWithRead });
    }

    return NextResponse.json({ articles });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

// PATCH /api/news  body: { id: string, is_read: boolean }
export async function PATCH(req: NextRequest) {
  try {
    await connectDB();
    const { id, is_read } = await req.json() as { id: string; is_read: boolean };
    const ipHash = getIpHash(req);

    if (is_read) {
      // upsert — duplicate (ipHash, articleId) pairs are silently ignored by the unique index
      await ReadRecord.updateOne(
        { ipHash, articleId: id },
        { $setOnInsert: { ipHash, articleId: id, readAt: new Date() } },
        { upsert: true },
      );
    } else {
      await ReadRecord.deleteOne({ ipHash, articleId: id });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
