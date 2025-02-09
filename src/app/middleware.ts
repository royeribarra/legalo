import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verify } from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET!;

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  if (!token) return NextResponse.redirect(new URL('/login', req.url));

  try {
    const user = verify(token, SECRET_KEY) as { role: string };
    const isAbogado = req.nextUrl.pathname.startsWith('/dashboard/abogado');
    const isCliente = req.nextUrl.pathname.startsWith('/dashboard/cliente');

    if ((isAbogado && user.role !== 'abogado') || (isCliente && user.role !== 'cliente')) {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
