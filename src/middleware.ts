import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';
import { IUsuarioBack } from './interfaces/User.interface';

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;

  if (!token) return NextResponse.redirect(new URL('/login', req.url));

  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);
    console.log("Tipo de payload:", typeof payload); // ¿Es "object" o algo más?
    console.log("Contenido de payload:", payload);
    const user = payload.user as IUsuarioBack;
    console.log(user.rol, "rol de usuario")
    const isAbogado = req.nextUrl.pathname.startsWith('/dashboard/abogado');
    const isCliente = req.nextUrl.pathname.startsWith('/dashboard/cliente');

    if ((isAbogado && user.rol !== 'abogado') || (isCliente && user.rol !== 'cliente')) {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Error verificando el token:", error);
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
