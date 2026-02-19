import process from "node:process"
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
    server: {
        NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
    },

    client: {
        // NEXT_PUBLIC_* vars go here
    },

    runtimeEnv: {
        NODE_ENV: process.env.NODE_ENV,
    },

    // biome-ignore lint/complexity/noImplicitCoercions: standard idiom for boolean coercion
    skipValidation: !!process.env.SKIP_ENV_VALIDATION,
    emptyStringAsUndefined: true,
})
