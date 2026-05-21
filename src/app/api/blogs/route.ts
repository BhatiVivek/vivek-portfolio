import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Blog from '@/models/Blog';

export async function GET() {
  try {
    await connectDB();
    const blogs = await Blog.find().sort({ date: -1 }).lean();
    return NextResponse.json(blogs);
  } catch (err) {
    console.error('GET /api/blogs error:', err);
    return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await connectDB();
    const blog = await Blog.create(body);
    return NextResponse.json(blog, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to create blog' }, { status: 500 });
  }
}
