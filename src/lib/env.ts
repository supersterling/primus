import process from "node:process"
import { vercel } from "@t3-oss/env-core/presets-zod"
import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

const isServerRuntime = typeof window === "undefined"

if (!process.env.NEXT_RUNTIME && isServerRuntime) {
    // biome-ignore lint/style/noCommonJs: dynamic require needed for conditional env loading outside Next.js runtime
    // biome-ignore lint/correctness/noUndeclaredDependencies: @next/env is a transitive dep from next
    const { loadEnvConfig } = require("@next/env")
    const projectDir = process.cwd()
    loadEnvConfig(projectDir)
}

/**
 * Type-safe environment variables with runtime validation.
 *
 * Validates and exposes env vars at startup. Throws if required vars are missing.
 * Uses @t3-oss/env-nextjs with Zod schemas.
 */
export const env = createEnv({
    extends: [vercel()],
    server: {
        DATABASE_URL: z.url().describe("PostgreSQL connection string"),
        NODE_ENV: z
            .enum(["development", "test", "production"])
            .default("development")
            .describe("Node environment"),
        INNGEST_DEV: z
            .enum(["1", "0"])
            .optional()
            .describe("Set to '1' to run Inngest in local dev mode (no signing key required)"),
        INNGEST_EVENT_KEY: z.string().optional().describe("Inngest event key for sending events"),
        INNGEST_SIGNING_KEY: z
            .string()
            .optional()
            .describe("Inngest signing key for webhook verification"),
    },

    client: {
        // NEXT_PUBLIC_* vars go here
    },

    runtimeEnv: {
        DATABASE_URL: process.env.DATABASE_URL,
        NODE_ENV: process.env.NODE_ENV,
        INNGEST_DEV: process.env.INNGEST_DEV,
        INNGEST_EVENT_KEY: process.env.INNGEST_EVENT_KEY,
        INNGEST_SIGNING_KEY: process.env.INNGEST_SIGNING_KEY,
    },

    // biome-ignore lint/complexity/noImplicitCoercions: standard idiom for boolean coercion
    skipValidation: !!process.env.SKIP_ENV_VALIDATION,
    emptyStringAsUndefined: true,
})
