import { Inngest } from "inngest"
import { env } from "@/lib/env"
import { logger } from "@/lib/logger"

export const inngest = new Inngest({
    id: "primus:core",
    logger,
    eventKey: env.INNGEST_EVENT_KEY,
    signingKey: env.INNGEST_SIGNING_KEY,
    env: env.VERCEL_ENV === "preview" ? env.VERCEL_GIT_COMMIT_REF : undefined,
    isDev: env.INNGEST_DEV === "1",
})
