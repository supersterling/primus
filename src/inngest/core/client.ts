import { realtimeMiddleware } from "@inngest/realtime/middleware"
import { EventSchemas, Inngest } from "inngest"
import { endpointAdapter } from "inngest/next"
import { events } from "@/inngest/core/events"
import { env } from "@/lib/env"
import { logger } from "@/lib/logger"

export const inngest = new Inngest({
    id: "primus:core",
    schemas: new EventSchemas().fromSchema(events),
    middleware: [realtimeMiddleware()],
    checkpointing: true,
    endpointAdapter,
    logger,
    eventKey: env.INNGEST_EVENT_KEY,
    signingKey: env.INNGEST_SIGNING_KEY,
    env: env.VERCEL_ENV === "preview" ? env.VERCEL_GIT_COMMIT_REF : undefined,
})
