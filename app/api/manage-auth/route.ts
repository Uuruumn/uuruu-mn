import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  const correctUsername = process.env.ADMIN_USERNAME;
  const correctPassword = process.env.ADMIN_PASSWORD;

  if (username === correctUsername && password === correctPassword) {
    const res = NextResponse.json({ ok: true });
    res.cookies.set('manage_session', 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 24時間
      path: '/',
    });
    return res;
  }

  return NextResponse.json({ ok: false }, { status: 401 });
}