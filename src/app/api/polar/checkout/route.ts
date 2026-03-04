import { Checkout } from "@polar-sh/nextjs"
import { type NextRequest, NextResponse } from "next/server"
import { env } from "@/lib/env"

/**
 * Redirects the user to Polar's hosted checkout page.
 *
 * Usage: link to this route with the product ID as a query param.
 *   /api/polar/checkout?products=<polarProductId>
 *
 * Find your product ID in the Polar dashboard → Products → copy ID.
 * In dev, use your sandbox product ID from sandbox.polar.sh.
 *
 * Optional params:
 *   customerExternalId   your internal user ID (e.g. Clerk user ID)
 *   customerEmail        pre-fill the email field
 *   customerName         pre-fill the name field
 */
export const GET = (req: NextRequest) => {
    if (!env.POLAR_ACCESS_TOKEN) {
        return NextResponse.json(
            { error: "POLAR_ACCESS_TOKEN is not set. See src/app/api/polar/checkout/route.ts." },
            { status: 503 },
        )
    }

    return Checkout({
        accessToken: env.POLAR_ACCESS_TOKEN,
        server: env.POLAR_SERVER,
    })(req)
}
