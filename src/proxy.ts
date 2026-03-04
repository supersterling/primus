// Next.js 16 renamed middleware.ts → proxy.ts. This file is the equivalent
// of the old src/middleware.ts — Next.js picks it up automatically.
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"

const isDashboard = createRouteMatcher(["/app(.*)"])

export default clerkMiddleware(async (auth, req) => {
    if (isDashboard(req)) {
        await auth.protect()
    }
})

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
        // Always run for API routes
        "/(api|trpc)(.*)",
    ],
}
