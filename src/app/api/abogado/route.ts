// src/app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  // Manejar GET request
  return NextResponse.json({ message: 'Get users' });
}

export async function POST(request: NextRequest) {
  // Manejar POST request
  const body = await request.json();
  return NextResponse.json({ message: 'User created', data: body }, { status: 201 });
}
