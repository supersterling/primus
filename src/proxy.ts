import { getSessionCookie } from "better-auth/cookies"
import { type NextRequest, NextResponse } from "next/server"

const DASHBOARD_PATTERN = /^\/app(\/|$)/

export function proxy(request: NextRequest) {
    if (DASHBOARD_PATTERN.test(request.nextUrl.pathname)) {
        const sessionCookie = getSessionCookie(request)

        if (!sessionCookie) {
            const signInUrl = new URL("/sign-in", request.url)
            signInUrl.searchParams.set("callback-url", request.nextUrl.pathname)
            return NextResponse.redirect(signInUrl)
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
        // Always run for API routes
        "/(api|trpc)(.*)",
    ],
}
