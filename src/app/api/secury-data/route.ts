// src/app/api/secure-data/route.ts
import { verifyToken } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const token = request.headers.get('Authorization');

  if (!token || !verifyToken(token)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  return NextResponse.json({ message: 'Secure data' });
}
