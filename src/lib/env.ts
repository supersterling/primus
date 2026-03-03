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
        NODE_ENV: z
            .enum(["development", "test", "production"])
            .default("development")
            .describe("Node environment"),
        INNGEST_EVENT_KEY: z.string().optional().describe("Inngest event key for sending events"),
        INNGEST_SIGNING_KEY: z
            .string()
            .optional()
            .describe("Inngest signing key for webhook verification"),
        LOGGER_LOWEST_LEVEL: z
            .enum(["DEBUG", "INFO", "WARN", "ERROR"])
            .default("DEBUG")
            .describe("Minimum log level to emit"),
        LOGGER_FORMAT_STYLE: z
            .enum(["pretty", "json"])
            .optional()
            .describe(
                "Log output format — pretty for dev, json for prod. Defaults to pretty in development",
            ),
    },

    client: {
        // NEXT_PUBLIC_* vars go here
    },

    runtimeEnv: {
        NODE_ENV: process.env.NODE_ENV,
        INNGEST_EVENT_KEY: process.env.INNGEST_EVENT_KEY,
        INNGEST_SIGNING_KEY: process.env.INNGEST_SIGNING_KEY,
        LOGGER_LOWEST_LEVEL: process.env.LOGGER_LOWEST_LEVEL,
        LOGGER_FORMAT_STYLE: process.env.LOGGER_FORMAT_STYLE,
    },

    // biome-ignore lint/complexity/noImplicitCoercions: standard idiom for boolean coercion
    skipValidation: !!process.env.SKIP_ENV_VALIDATION,
    emptyStringAsUndefined: true,
})
