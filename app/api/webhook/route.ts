import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  
  // Extract custom metadata passed during Checkout session creation
  if (body.type === 'checkout.session.completed') {
    const sessionId = body.data.object.metadata.session_id;
    
    // Set this user session as lifetime premium inside Vercel KV
    await kv.set(`user:${sessionId}:premium`, true);
  }

  return NextResponse.json({ received: true });
}

