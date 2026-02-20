/**
 * inngest.ts — Typed event definitions for Inngest.
 *
 * Provides {@link createEvent} for pairing a slash-delimited event name with
 * a Zod data schema, producing a frozen {@link Event} object. Definitions
 * are collected into an {@link EventRecord} in each client's events.ts,
 * then passed to `EventSchemas.fromSchema()` for end-to-end type safety
 * across triggers, sends, and step functions.
 *
 * @example
 * ```ts
 * import { createEvent, type EventRecord, type InferEventPayload } from "@/lib/inngest"
 * import { z } from "zod"
 *
 * const UserCreated = createEvent("app/user-created", z.object({
 *     userId: z.string(),
 *     email: z.string().email(),
 * }))
 *
 * type UserCreatedPayload = InferEventPayload<typeof UserCreated>
 * // { readonly name: "app/user-created"; readonly data: { userId: string; email: string } }
 *
 * const events = {
 *     [UserCreated.name]: UserCreated.data,
 * } as const satisfies EventRecord
 * ```
 */

import { type z } from "zod"

//
// Types
//

/** Slash-delimited, kebab-case event identifier (e.g. `"app/user-created"`). */
type EventName = string

/** Zod object schema describing the event's data payload. */
type EventData = z.ZodObject

/**
 * A typed Inngest event definition.
 *
 * Bundles an event name (preserved as a const string literal via the `const`
 * generic on {@link createEvent}) with a Zod object schema describing the
 * event's data payload. Both generics flow through unchanged — no widening.
 *
 * Events are building blocks. Collect them into an events record with
 * computed keys (`[Def.name]: Def.data`) and pass to
 * `EventSchemas.fromSchema()` for full Inngest type safety.
 *
 * @example
 * const def: Event<"app/user-created", z.ZodObject<{ userId: z.ZodString }>>
 */
type Event<Name extends EventName = EventName, Data extends EventData = EventData> = {
    /** The event name as a const string literal. */
    readonly name: Name
    /** The Zod schema for the event's data payload. */
    readonly data: Data
}

/**
 * Infer the fully resolved event payload from an Event.
 *
 * Resolves the Zod schema to its output TypeScript type, producing a clean
 * object with `name` (string literal) and `data` (resolved shape). Useful
 * for typing variables, function parameters, and return types outside of
 * Inngest's built-in handler inference.
 *
 * @example
 * const UserCreated = createEvent("app/user-created", z.object({
 *     userId: z.string(),
 * }))
 *
 * type Payload = InferEventPayload<typeof UserCreated>
 * // { readonly name: "app/user-created"; readonly data: { userId: string } }
 */
type InferEventPayload<T extends Event> = {
    readonly name: T["name"]
    readonly data: z.infer<T["data"]>
}

/**
 * Constraint type for the events record in each client's events.ts.
 *
 * Maps event names to their Zod data schemas. Apply with `satisfies` to
 * get both type checking and literal key preservation:
 *
 * ```ts
 * const events = {
 *     [UserCreated.name]: UserCreated.data,
 * } as const satisfies EventRecord
 * ```
 *
 * The resulting object is directly compatible with `EventSchemas.fromSchema()`.
 */
type EventRecord = Record<EventName, EventData>

//
// Factory
//

/**
 * Create a typed Inngest event definition.
 *
 * The `const` generic parameter preserves the event name as a string literal
 * (not widened to `string`), enabling computed property keys in the events
 * record to be fully typed. The returned object is frozen — event definitions
 * are immutable constants.
 *
 * @param name - Slash-delimited, kebab-case event identifier (e.g. `"app/user-created"`)
 * @param data - Zod object schema describing the event's data payload
 * @returns A frozen {@link Event} with const-narrowed name and schema
 *
 * @example
 * const UserCreated = createEvent("app/user-created", z.object({
 *     userId: z.string(),
 *     email: z.string().email(),
 * }))
 *
 * // In the events record:
 * const events = {
 *     [UserCreated.name]: UserCreated.data,
 * } as const satisfies EventRecord
 *
 * // In the Inngest client:
 * const inngest = new Inngest({
 *     id: "my-app",
 *     schemas: new EventSchemas().fromSchema(events),
 * })
 */
function createEvent<const Name extends EventName, Data extends EventData>(
    name: Name,
    data: Data,
): Event<Name, Data> {
    return Object.freeze({ name, data })
}

export { createEvent }
export type { Event, EventData, EventName, EventRecord, InferEventPayload }
