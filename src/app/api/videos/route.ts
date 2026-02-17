import { NextResponse } from 'next/server';

export async function GET() {
  // TODO: Fetch videos from database
  const videos = [
    { id: 1, title: 'Docker Tutorial for Beginners', url: 'https://youtube.com/embed/placeholder' },
    { id: 2, title: 'Next.js Full Course', url: 'https://youtube.com/embed/placeholder' },
  ];

  return NextResponse.json(videos);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // TODO: Save video to database
    return NextResponse.json({ success: true, id: 3 });
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
