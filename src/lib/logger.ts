/**
 * Structured logger backed by pino.
 *
 * Object-first convention matching pino and Inngest v4: `(context, message)`.
 *
 * In development, logs are pretty-printed via pino-pretty.
 * In production, logs are written as newline-delimited JSON
 * to stdout — ready for Vercel log drains, Datadog, etc.
 *
 * @example
 * ```ts
 * import { logger } from "@/lib/logger"
 *
 * logger.info({ port: 3000 }, "server started")
 *
 * const reqLog = logger.child({ requestId: "req_abc" })
 * reqLog.info({ path: "/api/users" }, "request started")
 * ```
 */

import pino from "pino"
import { env } from "@/lib/env"

type Context = Record<string, unknown>

/**
 * Immutable structured logger interface.
 * Object-first `(context, message)` — matches pino and Inngest v4.
 */
export type Logger = Readonly<{
    debug(context: Context, message: string): void
    info(context: Context, message: string): void
    warn(context: Context, message: string): void
    error(context: Context, message: string): void
    /** Returns a child logger with additional bound context. */
    child(context: Context): Logger
}>

const isDev = env.NODE_ENV === "development"

const pinoInstance = pino({
    level: isDev ? "debug" : "info",
    ...(isDev && {
        transport: {
            target: "pino-pretty",
            options: { colorize: true, ignore: "pid,hostname" },
        },
    }),
})

function wrap(p: pino.Logger): Logger {
    return {
        debug: (ctx, msg) => p.debug(ctx, msg),
        info: (ctx, msg) => p.info(ctx, msg),
        warn: (ctx, msg) => p.warn(ctx, msg),
        error: (ctx, msg) => p.error(ctx, msg),
        child: (ctx) => wrap(p.child(ctx)),
    }
}

export const logger: Logger = wrap(pinoInstance)
