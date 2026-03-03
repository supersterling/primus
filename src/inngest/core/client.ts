import { ConsoleLogger, Inngest } from "inngest"
import { env } from "@/lib/env"

export const inngest = new Inngest({
    id: "primus:core",
    // Keep SDK-internal noise (nested step warnings, registration pings, etc.)
    // separate from application logs. In dev we let them through at warn+.
    internalLogger: new ConsoleLogger({ level: env.NODE_ENV === "development" ? "warn" : "error" }),
    eventKey: env.INNGEST_EVENT_KEY,
    signingKey: env.INNGEST_SIGNING_KEY,
    env: env.VERCEL_ENV === "preview" ? env.VERCEL_GIT_COMMIT_REF : undefined,
    isDev: env.INNGEST_DEV === "1",
})
