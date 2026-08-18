import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { sessionId } = await request.json();
  
  // Check if session is premium
  const isPremium = await kv.get(`user:${sessionId}:premium`);
  if (isPremium) return NextResponse.json({ allowed: true });

  // Handle free tier credits
  const creditsUsed = await kv.get<number>(`user:${sessionId}:credits`) || 0;
  if (creditsUsed >= 3) {
    return NextResponse.json({ allowed: false, error: "Upgrade to premium" }, { status: 403 });
  }

  // Increment credit counter
  await kv.set(`user:${sessionId}:credits`, creditsUsed + 1);
  return NextResponse.json({ allowed: true });
}
