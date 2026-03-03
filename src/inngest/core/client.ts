import { ConsoleLogger, Inngest, wrapStringFirstLogger } from "inngest"
import { env } from "@/lib/env"
import { logger } from "@/lib/logger"

export const inngest = new Inngest({
    id: "primus:core",
    // Our logger is string-first (message, context). Inngest v4 is object-first
    // (Pino-style: obj, message). wrapStringFirstLogger adapts the call signature.
    logger: wrapStringFirstLogger(logger),
    // Keep SDK-internal noise (nested step warnings, registration pings, etc.)
    // separate from application logs. In dev we let them through at warn+.
    internalLogger: new ConsoleLogger({ level: env.NODE_ENV === "development" ? "warn" : "error" }),
    eventKey: env.INNGEST_EVENT_KEY,
    signingKey: env.INNGEST_SIGNING_KEY,
    env: env.VERCEL_ENV === "preview" ? env.VERCEL_GIT_COMMIT_REF : undefined,
    isDev: env.INNGEST_DEV === "1",
})
