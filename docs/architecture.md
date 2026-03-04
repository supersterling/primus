# Architecture

## Codemap

```
src/
  proxy.ts          Next.js middleware entry point (Next.js 16 renamed middleware.ts → proxy.ts)
  app/              Next.js App Router — pages, layouts, route handlers
    api/            Route handlers (HTTP endpoints)
    (dashboard)/    Authenticated dashboard routes (route group)
  components/       React components
    ui/             shadcn/ui primitives — do not lint or modify directly
  lib/              Pure utilities, no framework dependencies
    db/             Drizzle ORM client and schemas
      index.ts      Database client (pg pool)
      schemas/      Table definitions (core.ts)
    either.ts       [Result type](lib:either.ts#result) — result.pass / result.fail / result.trycatch / result.is
    env.ts          [Validated environment variables](lib:env.ts#env) (t3-env) — the only place process.env is read
    logger.ts       [Pino logger](lib:logger.ts#logger) — object-first syntax: logger.info({ key }, "message")
    types.ts        Shared TypeScript types
    utils.ts        Shared pure utilities — [cn](lib:utils.ts#cn), [baseUrl](lib:utils.ts#baseUrl)
  inngest/
    core/           Inngest client, event types, functions
      client.ts     [Inngest client instance](inngest:core/client.ts#inngest)
      events.ts     [Typed event definitions](inngest:core/events.ts#appHelloWorld)
      functions.ts  [Inngest function registry](inngest:core/functions.ts#functions)
      functions/    Individual Inngest function implementations
  scripts/          One-off scripts run with `bun src/scripts/<name>.ts`

docs/
  rules.md          Coding rules — read before writing any code
  architecture.md   This file
  patterns/         Individual pattern files -- RSC streaming, Suspense, URL state, skeletons
  billing.md        Polar payment integration — checkout, webhook pipeline, Inngest events
  references/       External documentation (large; excluded from agent context)

.grit/              GritQL lint rules — enforced as Biome plugins
biome/base.json     All Biome linter and formatter config
biome.json          Extends base.json, registers .grit plugins
```

## Invariants

These are encoded into the type system or enforced by linters. They are invariants because they are checked mechanically — not by convention.

- **No `process.env` outside `src/lib/env.ts`** — Biome `noProcessEnv`. All env access goes through the validated [`env` export](lib:env.ts#env).
- **No `console.log`** — Biome `noConsole`. Use [`logger`](lib:logger.ts#logger) from `src/lib/logger.ts`.
- **No `try/catch` for recoverable errors** — use [`result.trycatch`](lib:either.ts#trycatch) from `src/lib/either.ts`.
- **No `as` type assertions** — use type guards. GritQL `require-type-guards-over-as-assertion`.
- **No barrel files** — Biome `noBarrelFile`. Import directly from source files, never from `index.ts` re-exports.
- **No `forEach`** — use `for...of`. Biome `noForEach`.
- **`src/components/ui/` is linting-exempt** — shadcn primitives. Add components with `bunx shadcn add`, never edit manually.
- **Imports use `@/` prefix** — never relative `../` across feature boundaries.

## Layer Boundaries

```
env.ts          ← no imports from src/ (reads process.env at startup)
lib/            ← no Next.js or React imports (pure TypeScript)
lib/db/         ← only imported by server-side code (app/api/, inngest/, scripts/)
components/     ← no direct db access; data comes from server components or route handlers
inngest/        ← no direct HTTP response logic; side-effects only
```

Nothing in `lib/` depends on Next.js internals. Nothing in `components/` imports from `lib/db/` directly.

## Intentional Beta Dependencies

- **`inngest@^4.0.0-beta.2`** — Inngest v4 is in beta. It is pinned intentionally: v4 introduces the realtime API (`step.realtime.publish`) and the `eventType()` helper used throughout `src/inngest/`. The `@inngest/realtime` package is locked to this version via `overrides` in `package.json`. Upgrade only when Inngest publishes a stable v4 release.
