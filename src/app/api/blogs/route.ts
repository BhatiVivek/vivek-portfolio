import { NextResponse } from 'next/server';

export async function GET() {
  // TODO: Fetch blogs from database
  const blogs = [
    { id: 1, title: 'Getting Started with Docker', excerpt: 'Learn the basics of Docker containerization...', date: '2024-01-15' },
    { id: 2, title: 'Next.js Best Practices', excerpt: 'Tips and tricks for building performant Next.js apps...', date: '2024-01-10' },
  ];

  return NextResponse.json(blogs);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // TODO: Save blog to database
    return NextResponse.json({ success: true, id: 3 });
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
