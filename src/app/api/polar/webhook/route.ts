import { Webhooks } from "@polar-sh/nextjs"
import { SDKValidationError } from "@polar-sh/sdk/models/errors/sdkvalidationerror"
import { type NextRequest, NextResponse } from "next/server"
import { inngest } from "@/inngest/core/client"
import { result } from "@/lib/either"
import { env } from "@/lib/env"
import { logger } from "@/lib/logger"

/**
 * Receives and validates incoming Polar webhook events.
 *
 * Polar signs every request with HMAC — the Webhooks handler verifies the
 * signature automatically and returns 403 if it doesn't match.
 *
 * In dev: run `bun dev:polar` in a separate terminal. It tunnels webhook
 * events from your sandbox org to this route and prints the secret to copy
 * into POLAR_WEBHOOK_SECRET in your .env.local.
 *
 * @see https://polar.sh/docs/integrate/webhooks/locally
 */
export const POST = async (req: NextRequest) => {
    if (!env.POLAR_WEBHOOK_SECRET) {
        return NextResponse.json(
            { error: "POLAR_WEBHOOK_SECRET is not set. See src/app/api/polar/webhook/route.ts." },
            { status: 503 },
        )
    }

    const secret = env.POLAR_WEBHOOK_SECRET
    const res = await result.trycatch(() =>
        Webhooks({
            webhookSecret: secret,
            onPayload: async (payload) => {
                logger.info({ type: payload.type }, "polar webhook received")
                await inngest.send({
                    name: `polar/${payload.type}`,
                    data: payload,
                })
            },
        })(req),
    )

    if (!res.ok) {
        const validationError = result.is(res.error, SDKValidationError)
        if (validationError) {
            // Polar sent an event type the SDK doesn't recognise yet (e.g. member.created).
            // Acknowledge it so Polar doesn't retry — nothing we can do with an unknown type.
            logger.warn(
                { message: validationError.message },
                "polar webhook unknown event type, ignoring",
            )
            return new NextResponse(null, { status: 200 })
        }

        logger.error({ error: res.error }, "polar webhook handler failed")
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }

    return res.value
}
