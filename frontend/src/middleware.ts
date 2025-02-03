import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const isPublicPath = path === '/login' || path === '/signup'
  let hasVerified = false

  if (path !== '/login') {
    try {
      const res = await fetch('http://localhost:3001/auth/verify', {
        method: 'POST',
        credentials: 'include',
      })
      console.log(res.status)
      if (res.status === 201) {
        hasVerified = true
      } else {
        hasVerified = false
        return NextResponse.redirect(new URL('/tasks', request.nextUrl))
      }
    } catch (err) {
      console.error(err)
    }
  }
}

