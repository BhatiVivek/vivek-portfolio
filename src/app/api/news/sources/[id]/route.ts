import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import NewsSource from '@/models/NewsSource';

// PATCH /api/news/sources/[id] — toggle is_active
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await req.json() as { is_active?: boolean };
    const source = await NewsSource.findByIdAndUpdate(id, body, { new: true });
    if (!source) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ source });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

// DELETE /api/news/sources/[id]
export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;
    await NewsSource.findByIdAndDelete(id);
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
