import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Protected routes
  if (
    !session &&
    (req.nextUrl.pathname.startsWith("/country-selection") ||
      req.nextUrl.pathname.startsWith("/document-upload") ||
      req.nextUrl.pathname.startsWith("/results"))
  ) {
    return NextResponse.redirect(new URL("/sign-in", req.url))
  }

  // Redirect to country selection if already signed in
  if (session && (req.nextUrl.pathname === "/sign-in" || req.nextUrl.pathname === "/sign-up")) {
    return NextResponse.redirect(new URL("/country-selection", req.url))
  }

  return res
}

export const config = {
  matcher: ["/country-selection", "/document-upload", "/results", "/sign-in", "/sign-up"],
}

