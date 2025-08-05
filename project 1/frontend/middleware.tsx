import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Verificar se está tentando acessar rotas admin
  if (pathname.startsWith('/admin')) {
    const token = request.cookies.get('auth-token')?.value || 
                  request.headers.get('authorization');

    if (!token) {
      // Redireciona para login se não tem token
      return NextResponse.redirect(new URL('/Login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*']
};