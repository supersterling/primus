/**
 * logger.ts — Structured logging for TypeScript serverless.
 *
 * Two modes: JSON lines to stdout for production, colored pretty
 * output for local dev. No buffering — every call writes immediately
 * (safe for Vercel/Lambda cold shutdown).
 *
 * Child loggers pre-stringify bound context at creation time so
 * the per-call cost is a single string concatenation instead of
 * object spreading.
 *
 * @example
 * ```ts
 * import { logger } from "./logger"
 *
 * logger.info("server started", { port: 3000 })
 *
 * const reqLog = logger.child({ requestId: "req_abc" })
 * reqLog.info("request started", { path: "/api/users" })
 * ```
 */

import { hostname } from "node:os"
import process from "node:process"

/**
 * Process identity captured once at module load.
 * Static for the lifetime of the process — zero per-call cost.
 */
const PID = process.pid
const HOSTNAME = hostname()

/**
 * Human-readable log line. Kept as a branded alias so call sites
 * read as documentation (e.g. `message: Message` vs `message: string`).
 */
type Message = string

/**
 * Arbitrary structured data attached to a log entry.
 * Serialized as JSON — values must survive {@link JSON.stringify}.
 */
type Context = Record<string, unknown>

/**
 * Immutable structured logger interface.
 *
 * Every method writes synchronously to the output stream.
 * Child loggers inherit and merge bound context from their parent.
 */
type Logger = Readonly<{
    /**
     * Verbose diagnostics, typically suppressed in production.
     *
     * @param message - What happened
     * @param context - Structured data for the log entry
     */
    debug(message: Message, context: Context): void
    /**
     * Normal operational events (startup, request handled, job completed).
     *
     * @param message - What happened
     * @param context - Structured data for the log entry
     */
    info(message: Message, context: Context): void
    /**
     * Unexpected but recoverable conditions (deprecated usage, retry).
     *
     * @param message - What happened
     * @param context - Structured data for the log entry
     */
    warn(message: Message, context: Context): void
    /**
     * Failures requiring attention (unhandled rejection, missing resource).
     *
     * @param message - What happened
     * @param context - Structured data for the log entry
     */
    error(message: Message, context: Context): void
    /**
     * Creates a child logger with additional bound context.
     * The child merges parent context with the provided context,
     * and per-call context overrides both.
     *
     * @param context - Key-value pairs to bind to every future log call
     * @returns A new Logger with the merged context
     */
    child(context: Context): Logger
}>

/**
 * Canonical log level strings, used as keys in both structured
 * JSON output and pretty-printed terminal output.
 */
const LEVELS = {
    DEBUG: "DEBUG",
    INFO: "INFO",
    WARN: "WARN",
    ERROR: "ERROR",
} as const
type Level = keyof typeof LEVELS

/**
 * Numeric severity for each level. Higher value = more severe.
 * Used by {@link enabled} to gate log methods at construction time.
 */
const LEVEL_VALUES = {
    DEBUG: 0,
    INFO: 1,
    WARN: 2,
    ERROR: 3,
} as const satisfies Record<Level, number>

/** No-op function swapped in for suppressed log levels. Zero per-call cost. */
// biome-ignore lint/suspicious/noEmptyBlockStatements: intentional no-op
const NOOP = () => {}

/**
 * Returns `true` when `level` meets or exceeds the `lowest` threshold.
 *
 * @param level     - The level to test
 * @param threshold - Minimum level that should produce output
 */
function enabled(level: Level, threshold: Level): boolean {
    return LEVEL_VALUES[level] >= LEVEL_VALUES[threshold]
}

/** Type predicate — narrows `unknown` to {@link Level} without assertion. */
function isLevel(value: unknown): value is Level {
    return typeof value === "string" && value in LEVELS
}

/**
 * Parses an env-var string into a {@link Level}, defaulting to `"DEBUG"`
 * (all levels emitted) when the value is absent or unrecognized.
 */
function parseLevel(value: string | undefined): Level {
    if (isLevel(value)) {
        return value
    }
    return "DEBUG"
}

/**
 * ANSI escape codes for terminal colorization.
 * Only used in pretty (development) mode — production JSON is uncolored.
 */
const COLORS = {
    CYAN: "\x1b[36m",
    GREEN: "\x1b[32m",
    YELLOW: "\x1b[33m",
    RED: "\x1b[31m",
    MAGENTA: "\x1b[35m",
    BLUE: "\x1b[34m",
    RESET: "\x1b[0m",
} as const
type Color = keyof typeof COLORS

/**
 * Pre-computed colored level labels for pretty output.
 * Each level name is wrapped in its corresponding ANSI color
 * and terminated with RESET.
 */
const LEVEL_PRETTY_STRINGS = {
    DEBUG: `${COLORS.BLUE}DEBUG${COLORS.RESET}`,
    INFO: `${COLORS.GREEN}INFO${COLORS.RESET}`,
    WARN: `${COLORS.YELLOW}WARN${COLORS.RESET}`,
    ERROR: `${COLORS.RED}ERROR${COLORS.RESET}`,
} as const satisfies Record<
    Level,
    `${Exclude<(typeof COLORS)[Color], typeof COLORS.RESET>}${Level}${typeof COLORS.RESET}`
>

/**
 * Returns the current UTC timestamp in ISO 8601 format.
 *
 * @returns ISO string, e.g. `"2026-02-13T14:30:00.123Z"`
 */
function datetime(): string {
    return new Date().toISOString()
}

/** Start index of the time portion ("HH:mm:ss.SSS") in an ISO 8601 string. */
const ISO_TIME_START = 11
/** End index (exclusive) of the time portion in an ISO 8601 string. */
const ISO_TIME_END = 23

/**
 * Returns the time portion of the current UTC timestamp (HH:mm:ss.SSS).
 * Used in pretty output where the full date would be noise.
 *
 * @returns Time string, e.g. `"14:30:00.123"`
 */
function time(): string {
    return datetime().slice(ISO_TIME_START, ISO_TIME_END)
}

/**
 * Thin wrapper around {@link JSON.stringify} that normalizes the
 * indent parameter for the two output modes.
 *
 * @param obj - Object to serialize
 * @param indent - Spaces per indent level (0 for single-line)
 * @returns JSON string
 * @throws {TypeError} If `obj` contains circular references
 */
function stringify(obj: Record<string, unknown>, indent = 0): string {
    return JSON.stringify(obj, null, indent)
}

/**
 * Serializes an object as indented JSON with ANSI-colored keys.
 * Keys are highlighted in magenta for terminal readability.
 *
 * @param obj - Object to serialize
 * @returns Colored, indented JSON string
 * @throws {TypeError} If `obj` contains circular references
 */
function toPrettyJson(obj: Record<string, unknown>): string {
    const json = stringify(obj, 2 as const)
    return json.replace(/"([^"\\]+)":/g, `"${COLORS.MAGENTA}$1${COLORS.RESET}":`)
}

/**
 * Serializes an object as compact single-line JSON.
 * Used for production log lines where each entry is one line.
 *
 * @param obj - Object to serialize
 * @returns Single-line JSON string
 * @throws {TypeError} If `obj` contains circular references
 */
function toInlineJson(obj: Record<string, unknown>): string {
    return stringify(obj, 0 as const)
}

/**
 * Formats a log entry for terminal display with timestamp,
 * colored level badge, message, and indented context JSON.
 *
 * @param level - Log severity
 * @param message - Human-readable description
 * @param context - Structured data (rendered as colored JSON below the message)
 * @returns Multi-line formatted string ready for stdout
 * @throws {TypeError} If `context` contains circular references
 */
function createPrettyLogMessage(level: Level, message: Message, context: Context = {}) {
    const json = toPrettyJson(context)
    const line = `[${time()}] ${LEVEL_PRETTY_STRINGS[level]} (${PID}) ${COLORS.CYAN}${message}${COLORS.RESET}`
    return `${line}\n${json}`
}

/**
 * Formats a log entry as a single-line JSON object with `level`,
 * `message`, and `context` fields. One line per entry for
 * machine parsing (CloudWatch, Datadog, etc.).
 *
 * @param level - Log severity
 * @param message - Human-readable description
 * @param context - Structured data nested under the `context` key
 * @returns Single-line JSON string
 * @throws {TypeError} If `context` contains circular references
 */
function createInlineLogMessage(level: Level, message: Message, context: Context = {}) {
    return toInlineJson({
        level,
        datetime: datetime(),
        pid: PID,
        hostname: HOSTNAME,
        message,
        context,
    })
}

/**
 * Creates a Logger that writes colored, human-readable output.
 * Intended for local development where terminal readability matters.
 *
 * @param writer - Bound write function (e.g. `process.stdout.write.bind(process.stdout)`)
 * @param bindings - Key-value pairs inherited from a parent logger via {@link Logger.child}
 * @param threshold - Minimum level that produces output; levels below are replaced with {@link NOOP}
 * @returns Immutable Logger instance
 */
function createPrettyLogger(
    writer: typeof process.stdout.write,
    bindings: Context = {},
    threshold: Level = "DEBUG",
): Logger {
    function log(level: Level, message: Message, context: Context = {}) {
        const msg = createPrettyLogMessage(level, message, { ...bindings, ...context })
        writer(`${msg}\n`)
    }

    return {
        debug: enabled("DEBUG", threshold) ? log.bind(null, LEVELS.DEBUG) : NOOP,
        info: enabled("INFO", threshold) ? log.bind(null, LEVELS.INFO) : NOOP,
        warn: enabled("WARN", threshold) ? log.bind(null, LEVELS.WARN) : NOOP,
        error: enabled("ERROR", threshold) ? log.bind(null, LEVELS.ERROR) : NOOP,
        child: (ctx: Context = {}) =>
            createPrettyLogger(writer, { ...bindings, ...ctx }, threshold),
    } as const satisfies Logger
}

/**
 * Creates a Logger that writes single-line JSON to stdout.
 * Intended for production where logs are ingested by a collector.
 *
 * @param writer - Bound write function (e.g. `process.stdout.write.bind(process.stdout)`)
 * @param bindings - Key-value pairs inherited from a parent logger via {@link Logger.child}
 * @param threshold - Minimum level that produces output; levels below are replaced with {@link NOOP}
 * @returns Immutable Logger instance
 */
function createInlineLogger(
    writer: typeof process.stdout.write,
    bindings: Context = {},
    threshold: Level = "DEBUG",
): Logger {
    function log(level: Level, message: Message, context: Context = {}) {
        const msg = createInlineLogMessage(level, message, { ...bindings, ...context })
        writer(msg)
    }

    return {
        debug: enabled("DEBUG", threshold) ? log.bind(null, LEVELS.DEBUG) : NOOP,
        info: enabled("INFO", threshold) ? log.bind(null, LEVELS.INFO) : NOOP,
        warn: enabled("WARN", threshold) ? log.bind(null, LEVELS.WARN) : NOOP,
        error: enabled("ERROR", threshold) ? log.bind(null, LEVELS.ERROR) : NOOP,
        child: (ctx: Context = {}) =>
            createInlineLogger(writer, { ...bindings, ...ctx }, threshold),
    } as const satisfies Logger
}

const output = process.stdout.write.bind(process.stdout)
const lowest = parseLevel(process.env.LOGGER_LOWEST_LEVEL)

const logger =
    process.env.LOGGER_FORMAT_STYLE === "pretty" && Boolean(process.stdout.isTTY)
        ? createPrettyLogger(output, {}, lowest)
        : createInlineLogger(output, {}, lowest)

export type { Logger }
export { logger }
