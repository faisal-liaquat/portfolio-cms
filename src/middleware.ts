// src/middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Rate limit store (in-memory, per-instance — good enough for a personal portfolio)
// For production multi-instance, use Upstash Redis instead
const rateLimitStore = new Map<string, { count: number; resetAt: number }>()

const RATE_LIMIT_WINDOW_MS = 60 * 1000 // 1 minute
const RATE_LIMIT_MAX = 60 // 60 requests per minute per IP

function getIP(req: NextRequest): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    req.headers.get('x-real-ip') ??
    '127.0.0.1'
  )
}

function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now()
  const entry = rateLimitStore.get(ip)

  if (!entry || now > entry.resetAt) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    return { allowed: true, remaining: RATE_LIMIT_MAX - 1 }
  }

  entry.count++
  const remaining = Math.max(0, RATE_LIMIT_MAX - entry.count)
  return { allowed: entry.count <= RATE_LIMIT_MAX, remaining }
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // ── Block registration endpoint ────────────────────────────────────────────
  // Block POST /api/users (Payload's self-registration endpoint)
  if (pathname === '/api/users' && req.method === 'POST') {
    return new NextResponse(JSON.stringify({ error: 'Registration is disabled.' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  // ── Block access to the users collection API entirely for non-login ops ───
  // Allow: POST /api/users/login, POST /api/users/logout, POST /api/users/refresh-token
  // Block: everything else on /api/users from unauthenticated
  const allowedUserEndpoints = [
    '/api/users/login',
    '/api/users/logout',
    '/api/users/refresh-token',
    '/api/users/me',
    '/api/users/first-register',
  ]
  if (
    pathname.startsWith('/api/users') &&
    !allowedUserEndpoints.some((ep) => pathname.startsWith(ep))
  ) {
    const authHeader = req.headers.get('authorization') ?? ''
    const hasPayloadToken = req.cookies.has('payload-token')
    if (!authHeader.startsWith('Bearer ') && !hasPayloadToken) {
      return new NextResponse(JSON.stringify({ error: 'Unauthorized.' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      })
    }
  }

  // ── Rate limiting on all /api/* routes ────────────────────────────────────
  if (pathname.startsWith('/api/')) {
    const ip = getIP(req)
    const { allowed, remaining } = checkRateLimit(ip)

    if (!allowed) {
      return new NextResponse(JSON.stringify({ error: 'Too many requests. Slow down.' }), {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'Retry-After': '60',
          'X-RateLimit-Limit': String(RATE_LIMIT_MAX),
          'X-RateLimit-Remaining': '0',
        },
      })
    }

    const response = NextResponse.next()
    response.headers.set('X-RateLimit-Limit', String(RATE_LIMIT_MAX))
    response.headers.set('X-RateLimit-Remaining', String(remaining))
    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // Match all API routes
    '/api/:path*',
  ],
}
