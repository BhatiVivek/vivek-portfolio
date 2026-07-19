// NOTE: This file is not being used anywhere, it is kept here for future use
// ADMIN FEATURE — temporarily disabled (pending real authentication)

import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json({ error: 'Admin feature disabled' }, { status: 503 });
}

/*
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;
    // TODO: replace with real auth (NextAuth / JWT)
    if (email && password) {
      return NextResponse.json({ success: true, token: 'dummy-token' });
    }
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
*/
