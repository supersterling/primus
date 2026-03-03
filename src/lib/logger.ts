import pino from "pino"
import { env } from "@/lib/env"

const isDev = env.NODE_ENV === "development"

function prettyTransport(): Pick<pino.LoggerOptions, "transport"> | undefined {
    if (!isDev) {
        return
    }
    return {
        transport: { target: "pino-pretty", options: { colorize: true, ignore: "pid,hostname" } },
    }
}

export const logger = pino({
    level: isDev ? "debug" : "info",
    ...prettyTransport(),
})
