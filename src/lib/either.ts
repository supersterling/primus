/**
 * either.ts — Algebraic error handling primitives for TypeScript.
 *
 * Exports two namespace objects:
 *
 *   - `result` — Result<T, E> for fallible operations (pass, fail, trycatch, is)
 *   - `option` — Option<T> for nullable values (some, none)
 *
 * Designed around two principles:
 *
 *   1. Errors are values, not control flow.
 *   2. The type system should make unhandled errors unrepresentable.
 *
 * Result uses a two-shape discriminated union ({ ok: true } | { ok: false })
 * because V8/JSC optimize this pattern aggressively — 2x faster allocation
 * than single-shape alternatives, with correct narrowing on both branches.
 *
 * Option is T | undefined — the language's native nullable type. Compatible
 * with optional properties, ?. chaining, default parameters, and every JS
 * data structure that returns undefined for "not found."
 *
 * @example
 * ```ts
 * import { result, option } from "./either"
 *
 * const parsed = result.trycatch(() => JSON.parse(raw))
 * if (!parsed.ok) {
 *     throw new Error("config parse failed", { cause: parsed.error })
 * }
 * const config = parsed.value
 *
 * const cached: Option<User> = cache.has(id) ? option.some(cache.get(id)) : option.none
 * ```
 */

/**
 * The success branch of a Result. Narrows to { ok: true } with the
 * carried value accessible via .value.
 *
 * @example
 * ```ts
 * const p: Pass<number> = pass(42)
 * p.ok    // true
 * p.value // 42
 * ```
 */
type Pass<T> = Readonly<{ ok: true; value: T }>

/**
 * The failure branch of a Result. Narrows to { ok: false } with the
 * error accessible via .error. E is constrained to Error subclasses
 * so that .message, .stack, and .cause are always available.
 *
 * @example
 * ```ts
 * const f: Fail<TypeError> = fail(new TypeError("bad input"))
 * f.ok    // false
 * f.error // TypeError
 * ```
 */
type Fail<E extends Error = Error> = Readonly<{ ok: false; error: E }>

/**
 * A discriminated union representing a computation that either succeeded
 * with a value T or failed with an error E. Check .ok to narrow:
 *
 * @example
 * ```ts
 * const result: Result<User> = trycatch(() => db.getUser(id))
 * if (result.ok) {
 *     result.value  // User — compiler knows this exists
 * } else {
 *     result.error  // Error — compiler knows this exists
 * }
 * ```
 */
type Result<T, E extends Error = Error> = Pass<T> | Fail<E>

/**
 * A value that may or may not exist. Implemented as T | undefined —
 * TypeScript's native nullable type.
 *
 * This is not a wrapper. There is no allocation for the present case
 * (it's just the value) and no allocation for none (it's just undefined).
 * Compatible with the entire JS ecosystem:
 *
 *   - Optional properties: { name?: string } is Option<string>
 *   - Default params: function f(x = 5) is unwrapOr built into syntax
 *   - Optional chaining: obj?.prop is flatMap returning undefined
 *   - Map.get, array[i], obj.prop all return undefined for "not found"
 *
 * @example
 * ```ts
 * const user: Option<User> = users.get(id)
 * if (user !== none) {
 *     user.name  // User — narrowed
 * }
 *
 * // With default parameter (free unwrapOr):
 * function greet(name: Option<string> = "world") { ... }
 * ```
 */
type Option<T> = T | undefined

/**
 * Construct a successful Result carrying the given value.
 *
 * @example
 * ```ts
 * const r = pass(42)
 * r.ok    // true
 * r.value // 42
 * ```
 */
function pass<T>(value: T): Pass<T> {
    return { ok: true, value } as const
}

/**
 * Construct a failed Result carrying the given error. The error must
 * extend Error — this is enforced at the type level so that .message,
 * .stack, and .cause are always available downstream.
 *
 * @example
 * ```ts
 * const r = fail(new Error("disk full"))
 * r.ok    // false
 * r.error // Error("disk full")
 *
 * // With custom error types:
 * class HttpError extends Error {
 *     constructor(readonly status: number, message: string) {
 *         super(message)
 *     }
 * }
 * const r = fail(new HttpError(404, "not found"))
 * r.error // HttpError — subclass preserved
 * ```
 */
function fail<E extends Error>(error: E): Fail<E> {
    return { ok: false, error } as const
}

/**
 * Construct a present Option value. This is the identity function — it
 * returns the value unchanged. Its purpose is semantic: it marks a value
 * as intentionally present, mirroring how `none` marks intentional absence.
 *
 * Zero overhead — no wrapper, no allocation. The returned value IS the
 * original value. Useful when building Option<T> values programmatically
 * where the symmetry with `none` improves readability.
 *
 * @example
 * ```ts
 * const cached: Option<User> = cache.has(id) ? some(cache.get(id)) : none
 *
 * // Equivalent to just using the value directly:
 * const user: Option<User> = some(currentUser)
 * // same as: const user: Option<User> = currentUser
 * ```
 */
function some<T>(value: T): T {
    return value
}

/**
 * The absent value. A const reference to undefined — zero overhead,
 * no function call. Reads as intentional absence rather than a
 * forgotten return.
 *
 * @example
 * ```ts
 * const user: Option<User> = none
 * const items = ids.map(id => cache.has(id) ? cache.get(id) : none)
 * ```
 */
const none = undefined

/**
 * Coerce an unknown caught value into a Fail<Error>. If the value is
 * already an Error (the 99% case), it is used as-is — no allocation.
 * Non-Error throws (strings, numbers) are wrapped in new Error().
 */
function onReject(e: unknown): Fail<Error> {
    return fail(e instanceof Error ? e : new Error(String(e)))
}

/**
 * Execute an async thunk and capture the outcome as a Result.
 * If the promise rejects, the rejection is caught and returned as a Fail.
 * If the thunk throws synchronously before returning a promise, that is
 * also caught.
 *
 * Uses .then() chaining internally rather than async/await, avoiding
 * the async frame overhead (~16ns faster per call).
 *
 * @example
 * ```ts
 * const res = await trycatch(async () => {
 *     const r = await fetch(url)
 *     return r.json()
 * })
 * if (!res.ok) {
 *     throw new Error("api call failed", { cause: res.error })
 * }
 *
 * // Also catches sync throws during promise construction:
 * const res = await trycatch(() => fetch(url))
 * ```
 */
function trycatch<T>(fn: () => Promise<T>): Promise<Result<T>>
/**
 * Execute a synchronous thunk and capture the outcome as a Result.
 * If the thunk throws, the error is caught and returned as a Fail.
 *
 * @example
 * ```ts
 * const parsed = trycatch(() => JSON.parse(raw))
 * if (!parsed.ok) {
 *     logger.error("parse failed", { error: parsed.error })
 *     return
 * }
 * const data = parsed.value
 * ```
 */
function trycatch<T>(fn: () => T): Result<T>

function trycatch<T>(fn: () => T | Promise<T>): Result<T> | Promise<Result<T>> {
    try {
        const value = fn()
        if (value instanceof Promise) {
            return value.then(pass, onReject)
        }
        return pass(value)
    } catch (e) {
        return onReject(e)
    }
}

/**
 * Walk an error's cause chain looking for an instance of the given
 * constructor. Returns the matched error (correctly typed as E) or
 * option.none if no match is found within the depth limit.
 *
 * Unlike a type guard (error is E), this returns the actual matched
 * error from the chain — not the outer wrapper. This matters when the
 * match is buried under wrap() layers: narrowing the outer error would
 * give you access to properties that don't exist on the wrapper.
 *
 * The depth parameter guards against pathological circular cause
 * chains. Default of 50 is far beyond any realistic wrapping depth.
 *
 * @example
 * ```ts
 * class HttpError extends Error {
 *     constructor(readonly status: number, message: string) {
 *         super(message)
 *     }
 * }
 *
 * const result = trycatch(() => api.fetchUser(id))
 * if (!result.ok) {
 *     const http = is(result.error, HttpError)
 *     if (http) {
 *         if (http.status === 404) {
 *             return null
 *         }
 *         if (http.status === 429) {
 *             return retry()
 *         }
 *     }
 *     throw result.error
 * }
 * ```
 */
function is<E extends Error>(
    error: Error,
    ctor: new (...args: never[]) => E,
    depth = 50,
): Option<E> {
    let current: unknown = error
    for (let i = 0; i < depth && current instanceof Error; i += 1) {
        if (current instanceof ctor) {
            return current
        }
        current = current.cause
    }
    return none
}

/**
 * Result namespace — fallible operations.
 *
 * @example
 * ```ts
 * // Sync — catch, throw with cause
 * const parsed = result.trycatch(() => JSON.parse(raw))
 * if (!parsed.ok) {
 *     throw new Error("config parse failed", { cause: parsed.error })
 * }
 * const config = parsed.value
 *
 * // Async — cause chain inspection
 * const res = await result.trycatch(async () => {
 *     const r = await fetch(url)
 *     if (!r.ok) {
 *         throw new HttpError(r.status, r.statusText)
 *     }
 *     return r.json() as Promise<User>
 * })
 * if (!res.ok) {
 *     const http = result.is(res.error, HttpError)
 *     if (http !== option.none && http.status === 404) {
 *         return result.fail(new Error("user not found", { cause: res.error }))
 *     }
 *     throw new Error("fetch failed", { cause: res.error })
 * }
 * const user = res.value
 *
 * // Returning Result from functions
 * function findUser(id: string): Result<User> {
 *     const user = users.get(id)
 *     if (user === option.none) {
 *         return result.fail(new Error(`user ${id} not found`, { cause: undefined }))
 *     }
 *     return result.pass(user)
 * }
 * ```
 */
const result = { pass, fail, trycatch, is } as const

/**
 * Option namespace — nullable values.
 *
 * @example
 * ```ts
 * const cached: Option<User> = cache.has(id) ? option.some(cache.get(id)) : option.none
 * ```
 */
const option = { some, none } as const

export type { Pass, Fail, Result, Option }
export { result, option }
