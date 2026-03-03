# Primus — Agent Guide

An opinionated Next.js starter on Vercel + Inngest. This file is the map. Read it first, then follow the pointers into `docs/` and `src/` for details.

---

## Runtime

This project runs on **Bun**. Use Bun everywhere:

- `bun <file>` not `node <file>`
- `bun test` not jest/vitest
- `bun install` not npm/yarn/pnpm
- `bunx` not npx
- Bun auto-loads `.env.local` — no dotenv needed

---

## Codemap

```
src/
  app/              Next.js App Router — pages, layouts, route handlers
    api/            Route handlers (HTTP endpoints)
    (dashboard)/    Authenticated dashboard routes (route group)
  components/       React components
    ui/             shadcn/ui primitives — do not lint or modify directly
  lib/              Pure utilities, no framework dependencies
    db/             Drizzle ORM client and schemas
      index.ts      Database client (pg pool)
      schemas/      Table definitions (core.ts)
    either.ts       Result type — result.pass / result.fail / result.trycatch / result.is
    env.ts          Validated environment variables (t3-env) — the only place process.env is read
    logger.ts       Pino logger — object-first syntax: logger.info({ key }, "message")
    types.ts        Shared TypeScript types
    utils.ts        Shared pure utilities
  inngest/
    core/           Inngest client, event types, functions
      client.ts     Inngest client instance
      events.ts     Typed event definitions
      functions.ts  Inngest function registry
      functions/    Individual Inngest function implementations
  scripts/          One-off scripts run with `bun src/scripts/<name>.ts`

docs/
  rules.md          Coding rules — read before writing any code
  references/       External documentation (ignore; large, not for context)

.grit/              GritQL lint rules — enforced by Biome plugins
biome/base.json     All Biome linter and formatter config
biome.json          Extends base.json, registers .grit plugins
```

---

## Architectural Invariants

These are enforced by linters or the type system. Violations will fail CI.

- **No `process.env` outside `src/lib/env.ts`** — Biome `noProcessEnv` rule. All env access goes through the validated `env` export.
- **No `console.log`** — Biome `noConsole` rule. Use `logger` from `src/lib/logger.ts`.
- **No `try/catch` for recoverable errors** — use `result.trycatch` from `src/lib/either.ts` instead.
- **No `as` type assertions** — use type guards. GritQL `require-type-guards-over-as-assertion`.
- **No `?? null` / `?? undefined`** — handle nullability explicitly. GritQL `require-explicit-nullability-handling`.
- **No barrel files (`index.ts` re-exports)** — Biome `noBarrelFile`. Import directly from the source file.
- **No `forEach`** — use `for...of`. Biome `noForEach`.
- **`src/components/ui/`** is excluded from all linting — do not modify these files manually; use `bunx shadcn add`.
- **Imports use `@/` prefix** — `@/lib/either`, `@/components/Button`, etc. Never relative `../` across feature boundaries.

---

## Key Commands

```bash
bun run dev           # Next.js dev server
bun run dev:inngest   # Inngest local dev server (run alongside dev)
bun run checks        # tsc + biome + docref (run before committing)
bun run biome:fix     # Auto-fix lint/format issues
bun run db:push       # Push schema to database (dev)
bun run db:generate   # Generate Drizzle migration
bun run db:migrate    # Run migrations
bun run db:studio     # Open Drizzle Studio
```

---

## Coding Rules

Read `docs/rules.md` before writing code. It covers:

- Error handling (`result.trycatch`, `result.fail`, `result.pass`)
- Logging (`logger.info`, `logger.error` — object-first)
- TypeScript patterns (no `as`, explicit nullability, type guards)
- React patterns (`<Fragment>` named import, no inline styles, variable assignment for ternaries)
- Database patterns (explicit column selection, no `select *`)

---

## Error Handling Pattern

```typescript
import { result } from "@/lib/either"
import { logger } from "@/lib/logger"

// Wrapping async operations
const [err, data] = await result.trycatch(() => fetchSomething())
if (result.is.err(err)) {
    logger.error({ err }, "Failed to fetch something")
    return result.fail(new Error("fetch failed", { cause: err }))
}

return result.pass(data)
```

Never `throw` for recoverable errors. `throw` is for unrecoverable programmer errors only.

---

## Environment Variables

All env vars are in `src/lib/env.ts`, validated with t3-env at startup. To add a new variable:

1. Add it to the appropriate schema in `env.ts`
2. Add it to `.env.example` (`bun run env:example` regenerates this)
3. Never access `process.env` directly — import from `@/lib/env`
