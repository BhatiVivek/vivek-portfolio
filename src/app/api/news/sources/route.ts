import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import NewsSource from '@/models/NewsSource';

// GET /api/news/sources — list all sources
export async function GET() {
  try {
    await connectDB();
    const sources = await NewsSource.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json({ sources });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

// POST /api/news/sources — add a new source
// body: { url: string, name: string }
export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { url, name } = await req.json() as { url: string; name: string };

    if (!url || !name) {
      return NextResponse.json({ error: 'url and name are required' }, { status: 400 });
    }

    const source = await NewsSource.create({ url, name, is_active: true });
    return NextResponse.json({ source }, { status: 201 });
  } catch (err) {
    // Duplicate key error
    if (String(err).includes('E11000')) {
      return NextResponse.json({ error: 'Source URL already exists' }, { status: 409 });
    }
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
