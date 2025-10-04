import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from './auth'

export function middleware(request: NextRequest) {
  const token = request.headers.get('authorization')?.replace('Bearer ', '')

  const protectedPaths = ['/mi-perfil', '/tienda', '/referidos', '/admin']
  const isProtectedPath = protectedPaths.some(path =>
    request.nextUrl.pathname.startsWith(path)
  )

  if (isProtectedPath && !token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (token) {
    const userPayload = verifyToken(token)
    if (!userPayload) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    if (request.nextUrl.pathname.startsWith('/admin') && !userPayload.isAdmin) {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/mi-perfil/:path*', '/tienda/:path*', '/referidos/:path*', '/admin/:path*']
}