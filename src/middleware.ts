import { clerkMiddleware } from "@clerk/nextjs/server"
import { type NextRequest, NextResponse } from "next/server"

export default clerkMiddleware((_auth, req: NextRequest) => {
    const headers = new Headers(req.headers)
    headers.set("x-pathname", req.nextUrl.pathname)
    return NextResponse.next({ request: { headers } })
})

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
        // Always run for API routes
        "/(api|trpc)(.*)",
    ],
}
