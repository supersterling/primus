# src/lib

Shared primitives. Zero cross-dependencies. See JSDoc in each file for full API docs.

## [env](lib:env.ts#env)

Type-safe env vars via `@t3-oss/env-nextjs` + Zod. Throws at startup if required vars are missing. Add new vars by extending the Zod schemas in [env](lib:env.ts#env) and mapping them in `runtimeEnv`.

## either

Algebraic error handling — [result](lib:either.ts#result) for fallible operations, [option](lib:either.ts#option) for nullable values.

- [result.pass](lib:either.ts#pass) / [result.fail](lib:either.ts#fail) — construct results
- [result.trycatch](lib:either.ts#trycatch) — capture sync/async throws as Result
- [result.is](lib:either.ts#is) — walk cause chain for an error type
- [option.some](lib:either.ts#some) / [option.none](lib:either.ts#none) — `T | undefined`, zero allocation

## [logger](lib:logger.ts#logger)

Structured logging via [logger](lib:logger.ts#logger). Object-first syntax: `logger.info({ key }, "message")`. Use `.child({ requestId })` to bind context across calls.

Level is `debug` in development, `info` in production. Format is pretty-printed in development, JSON in production. Both are hardcoded in `logger.ts` — there are no env vars to configure them.

## types

Utility types. Key exports:

| Type | What it does |
| ---- | ------------ |
| [Brand](lib:types.ts#Brand)`<T, Name>` | Branded/opaque primitives |
| [Prettify](lib:types.ts#Prettify)`<T>` | Flatten intersections for IDE tooltips |
| [StrictOmit](lib:types.ts#StrictOmit)`<T, K>` | `Omit` that errors on invalid keys |
| [DeepPartial](lib:types.ts#DeepPartial) / [DeepReadonly](lib:types.ts#DeepReadonly) / [DeepRequired](lib:types.ts#DeepRequired) | Recursive variants of builtins |
| [PartialBy](lib:types.ts#PartialBy) / [RequiredBy](lib:types.ts#RequiredBy) | Selective key modifiers |
| [KeysMatching](lib:types.ts#KeysMatching) / [PickByValue](lib:types.ts#PickByValue) / [OmitByValue](lib:types.ts#OmitByValue) | Value-based property selection |
| [Xor](lib:types.ts#Xor)`<T, U>` | Exactly one of T or U |
| [NonEmptyArray](lib:types.ts#NonEmptyArray)`<T>` | Array with `length > 0` |
| [Redacted](lib:types.ts#Redacted)`<T>` | Wraps secrets — `toString`/`toJSON` return `[REDACTED]`, `.reveal()` to unwrap |
