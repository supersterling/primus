/**
 * Utility types not provided by TypeScript.
 *
 * @example
 * import type {
 *     Prettify, Mutable, ValueOf, Brand, StrictOmit,
 *     DeepPartial, DeepReadonly, DeepRequired,
 *     PartialBy, RequiredBy,
 *     KeysMatching, PickByValue, OmitByValue,
 *     Xor, Nullable, NonEmptyArray, Length, Zip,
 * } from "@/lib/types"
 */

/**
 * Flattens intersection types for readable IDE tooltips.
 *
 * Without Prettify, hovering shows: `Pick<User, "id"> & { extra: string }`
 * With Prettify, hovering shows: `{ id: string; extra: string }`
 *
 * @example
 * type Merged = Prettify<Pick<User, "id" | "email"> & { role: string }>
 * // Tooltip shows all properties expanded inline
 */
export type Prettify<T> = { [K in keyof T]: T[K] } & {}

/**
 * Removes `readonly` modifier from all properties. Opposite of `Readonly<T>`.
 *
 * @example
 * type Frozen = Readonly<{ id: string; name: string }>
 * type Thawed = Mutable<Frozen>
 * // { id: string; name: string } - no longer readonly
 */
export type Mutable<T> = { -readonly [K in keyof T]: T[K] }

/**
 * Gets union of all property values in an object type. Counterpart to `keyof`.
 *
 * @example
 * const STATUS = { PENDING: "pending", ACTIVE: "active", DONE: "done" } as const
 * type Status = ValueOf<typeof STATUS>
 * // "pending" | "active" | "done"
 *
 * @example
 * type User = { id: string; age: number; active: boolean }
 * type UserValue = ValueOf<User>
 * // string | number | boolean
 */
export type ValueOf<T> = T[keyof T]

/**
 * Creates a branded (tagged/opaque) type from a base type.
 *
 * Branded types are structurally incompatible even when the base type is the same.
 * Use for domain primitives that shouldn't be accidentally interchanged.
 *
 * @example
 * type UserId = Brand<string, "UserId">
 * type OrderId = Brand<string, "OrderId">
 *
 * function getUser(id: UserId): User { ... }
 *
 * const userId = "user_123" as UserId
 * const orderId = "order_456" as OrderId
 *
 * getUser(userId)   // OK
 * getUser(orderId)  // Error: OrderId not assignable to UserId
 */
export type Brand<T, BrandName> = T & { readonly __brand: BrandName }

/**
 * Like `Omit<T, K>` but errors if K contains keys not in T.
 *
 * Built-in `Omit` silently accepts invalid keys:
 * ```typescript
 * type Test = Omit<User, "typo">  // No error, produces User unchanged
 * ```
 *
 * StrictOmit catches the typo at compile time.
 *
 * @example
 * type User = { id: string; email: string; name: string }
 *
 * type WithoutEmail = StrictOmit<User, "email">      // OK
 * type Typo = StrictOmit<User, "emial">              // Error: "emial" not in keyof User
 */
export type StrictOmit<T, K extends keyof T> = Omit<T, K>

// -----------------------------------------------------------------------------
// Deep Variants
// -----------------------------------------------------------------------------

/**
 * Recursively makes all properties optional.
 *
 * Built-in `Partial` only works one level deep.
 *
 * @example
 * type Config = {
 *     db: { host: string; port: number }
 *     cache: { ttl: number }
 * }
 *
 * // Partial<Config> makes db/cache optional but host/port/ttl are still required
 * // DeepPartial<Config> makes everything optional at all levels
 *
 * const override: DeepPartial<Config> = { db: { port: 5433 } }  // OK
 */
export type DeepPartial<T> = T extends object ? { [P in keyof T]?: DeepPartial<T[P]> } : T

/**
 * Recursively makes all properties readonly.
 *
 * Built-in `Readonly` only works one level deep.
 *
 * @example
 * type State = { user: { name: string; prefs: { theme: string } } }
 * type FrozenState = DeepReadonly<State>
 *
 * const state: FrozenState = { user: { name: "Jo", prefs: { theme: "dark" } } }
 * state.user.prefs.theme = "light"  // Error: cannot assign to readonly property
 */
export type DeepReadonly<T> = T extends object ? { readonly [P in keyof T]: DeepReadonly<T[P]> } : T

/**
 * Recursively makes all properties required.
 *
 * Built-in `Required` only works one level deep.
 *
 * @example
 * type PartialConfig = {
 *     db?: { host?: string; port?: number }
 * }
 *
 * type FullConfig = DeepRequired<PartialConfig>
 * // { db: { host: string; port: number } }
 */
export type DeepRequired<T> = T extends object ? { [P in keyof T]-?: DeepRequired<T[P]> } : T

// -----------------------------------------------------------------------------
// Selective Modifiers
// -----------------------------------------------------------------------------

/**
 * Makes only the specified keys optional, leaving others unchanged.
 *
 * @example
 * type User = { id: string; email: string; name: string }
 *
 * type UserDraft = PartialBy<User, "id">
 * // { id?: string; email: string; name: string }
 *
 * // Useful for create vs update: id is optional on create, required on update
 */
export type PartialBy<T, K extends keyof T> = Prettify<Omit<T, K> & Partial<Pick<T, K>>>

/**
 * Makes only the specified keys required, leaving others unchanged.
 *
 * @example
 * type Form = { name?: string; email?: string; age?: number }
 *
 * type SubmittedForm = RequiredBy<Form, "name" | "email">
 * // { name: string; email: string; age?: number }
 */
export type RequiredBy<T, K extends keyof T> = Prettify<Omit<T, K> & Required<Pick<T, K>>>

// -----------------------------------------------------------------------------
// Value-Based Selection
// -----------------------------------------------------------------------------

/**
 * Gets keys whose values are assignable to the given type.
 *
 * @example
 * type User = { id: string; name: string; age: number; active: boolean }
 *
 * type StringKeys = KeysMatching<User, string>
 * // "id" | "name"
 *
 * type NumberKeys = KeysMatching<User, number>
 * // "age"
 */
export type KeysMatching<T, V> = {
    [K in keyof T]: T[K] extends V ? K : never
}[keyof T]

/**
 * Picks properties whose values are assignable to the given type.
 *
 * @example
 * type User = { id: string; name: string; age: number; active: boolean }
 *
 * type StringProps = PickByValue<User, string>
 * // { id: string; name: string }
 *
 * type NumericProps = PickByValue<User, number | boolean>
 * // { age: number; active: boolean }
 */
export type PickByValue<T, V> = Pick<T, KeysMatching<T, V>>

/**
 * Omits properties whose values are assignable to the given type.
 *
 * @example
 * type User = { id: string; name: string; age: number; active: boolean }
 *
 * type WithoutStrings = OmitByValue<User, string>
 * // { age: number; active: boolean }
 */
export type OmitByValue<T, V> = Omit<T, KeysMatching<T, V>>

// -----------------------------------------------------------------------------
// Exclusive Types
// -----------------------------------------------------------------------------

/**
 * Exclusive OR - exactly one of T or U, never both, never neither.
 *
 * Useful when two shapes are mutually exclusive but share no discriminant field.
 * Prefer discriminated unions when possible - they're clearer and have better
 * TypeScript support. Use Xor for external types you can't modify.
 *
 * @example
 * type ContactMethod = Xor<{ email: string }, { phone: string }>
 *
 * const a: ContactMethod = { email: "a@b.com" }                      // OK
 * const b: ContactMethod = { phone: "555-1234" }                     // OK
 * const c: ContactMethod = { email: "a@b.com", phone: "555-1234" }   // Error
 * const d: ContactMethod = {}                                         // Error
 */
export type Xor<T, U> =
    | (T & { [K in Exclude<keyof U, keyof T>]?: never })
    | (U & { [K in Exclude<keyof T, keyof U>]?: never })

// -----------------------------------------------------------------------------
// Nullability
// -----------------------------------------------------------------------------

/**
 * Makes a type nullable. Opposite of `NonNullable<T>`.
 *
 * @example
 * type MaybeUser = Nullable<User>
 * // User | null | undefined
 */
export type Nullable<T> = T | null | undefined

// -----------------------------------------------------------------------------
// Arrays
// -----------------------------------------------------------------------------

/**
 * Array with at least one element.
 *
 * Useful when an empty array is invalid - guarantees `.length > 0` and
 * allows `arr[0]` without undefined, and `reduce` without initial value.
 *
 * @example
 * function average(nums: NonEmptyArray<number>): number {
 *     return nums.reduce((a, b) => a + b) / nums.length
 * }
 *
 * average([1, 2, 3])  // OK
 * average([])         // Error: Source has 0 element(s) but target requires 1
 */
export type NonEmptyArray<T> = [T, ...T[]]

/**
 * Gets the length of a tuple as a literal type.
 *
 * @example
 * type Three = Length<[string, number, boolean]>
 * // 3 (literal, not `number`)
 *
 * @example
 * type Args = Parameters<typeof someFunction>
 * type ArgCount = Length<Args>
 * // Literal count of function parameters
 */
export type Length<T extends readonly unknown[]> = T["length"]

/**
 * Zips two tuples into a tuple of pairs. Requires equal lengths.
 *
 * Returns `never` if tuple lengths don't match, catching mismatches at compile time.
 *
 * @example
 * type Names = ["alice", "bob"]
 * type Ages = [30, 25]
 * type Zipped = Zip<Names, Ages>
 * // [["alice", 30], ["bob", 25]]
 *
 * @example
 * type A = [string, number]
 * type B = [boolean, Date, Error]
 * type Mismatch = Zip<A, B>
 * // never (lengths don't match)
 */
export type Zip<A extends readonly unknown[], B extends readonly unknown[]> =
    Length<A> extends Length<B>
        ? { [K in keyof A]: [A[K], K extends keyof B ? B[K] : never] }
        : never

/**
 * Default placeholder string shown instead of sensitive values.
 */
export const DEFAULT_REDACTED_PLACEHOLDER = "[REDACTED]"

/**
 * Wrapper for sensitive values that prevents accidental exposure in logs, JSON, or string interpolation.
 *
 * ## Why a Class?
 *
 * This is intentionally a class with `#private` fields, not a plain object with Symbols.
 * Symbol-keyed properties can be discovered and accessed via reflection:
 *
 * ```typescript
 * // Symbol approach - value is discoverable
 * const secret = { [SYMBOL]: "password" }
 * const symbols = Object.getOwnPropertySymbols(secret)
 * console.log(secret[symbols[0]])  // "password" - exposed!
 * ```
 *
 * Class `#private` fields are truly inaccessible - no reflection API can see them:
 *
 * ```typescript
 * // Class approach - truly private
 * const secret = new Redacted("password")
 * Object.getOwnPropertySymbols(secret)  // []
 * Object.getOwnPropertyNames(secret)    // []
 * Object.keys(secret)                   // []
 * // No way to access "password" without reveal()
 * ```
 *
 * For a security primitive, this distinction matters.
 *
 * @example
 * import { Redacted } from "@/lib/types"
 *
 * const apiKey = new Redacted("sk-1234567890abcdef")
 *
 * // Safe - all of these output the placeholder
 * console.log(`Key: ${apiKey}`)
 * console.log(String(apiKey))
 * JSON.stringify({ apiKey })
 * logger.info({ apiKey }, "making request")
 *
 * // Note: console.log(apiKey) shows the class structure but NOT the secret value
 * // The #private field is truly inaccessible - use util.inspect for debugging
 *
 * // Explicit reveal when you actually need the value
 * fetch(url, {
 *     headers: { Authorization: apiKey.reveal() }
 * })
 */
export class Redacted<T> {
    readonly #value: T

    constructor(value: T) {
        this.#value = value
    }

    /**
     * Returns the placeholder to prevent accidental exposure in string contexts.
     */
    toString(): string {
        return DEFAULT_REDACTED_PLACEHOLDER
    }

    /**
     * Returns the placeholder to prevent accidental exposure in JSON serialization.
     */
    // biome-ignore lint/style/useNamingConvention: standard JS method for JSON.stringify()
    toJSON(): string {
        return DEFAULT_REDACTED_PLACEHOLDER
    }

    /**
     * Explicitly unwraps the sensitive value.
     *
     * Use sparingly - every call site is a potential exposure point.
     * Each reveal() should be auditable and intentional.
     */
    reveal(): T {
        return this.#value
    }
}
