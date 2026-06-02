import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import NewsArticle from '@/models/NewsArticle';

// GET /api/news?slot=morning|evening&date=YYYY-MM-DD&limit=20
export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const slot = searchParams.get('slot');       // "morning" | "evening" | null (all)
    const date = searchParams.get('date');        // ISO date string
    const limit = parseInt(searchParams.get('limit') || '20');

    const filter: Record<string, unknown> = {};
    if (slot) filter.slot = slot;
    if (date) {
      const start = new Date(date);
      const end = new Date(date);
      end.setDate(end.getDate() + 1);
      filter.published_at = { $gte: start, $lt: end };
    }

    const articles = await NewsArticle.find(filter)
      .sort({ published_at: -1 })
      .limit(limit)
      .lean();

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
    await NewsArticle.findByIdAndUpdate(id, { is_read });
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
