# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What is this?

Primus is an opinionated Next.js 16 starter on Vercel + Inngest + Clerk + Polar. It enforces strict coding rules through Biome + custom GritQL lint plugins.

## Commands

```bash
bun run dev              # Next.js dev server
bun run dev:inngest      # Inngest local dev server (run alongside dev)
bun run dev:polar        # Polar webhook tunnel (prints POLAR_WEBHOOK_SECRET)
bun run checks           # tsc + biome + docref — run before every commit
bun run biome:fix        # Auto-fix lint/format issues
bun run db:push          # Push schema to database (dev)
bun run db:generate      # Generate Drizzle migration
bun run db:migrate       # Run migrations
bun run db:studio        # Open Drizzle Studio
bun run grit:test        # Run GritQL lint rule tests
```

Runtime is **Bun**, not Node: `bun install`, `bun <file>`, `bunx` (not npm/npx). Bun auto-loads `.env.local`.

## Required reading

Read these before writing code — rules are enforced by linters and `bun run checks` will reject violations:

- **`docs/rules.md`** — Error handling, logging, type safety, imports, database, React/Tailwind, code style
- **`docs/architecture.md`** — Codemap, layer boundaries, invariants
- **`docs/patterns.md`** — Pattern index; individual patterns in `docs/patterns/` (RSC streaming, Suspense, URL state, Inngest functions)
- **`docs/billing.md`** — Polar payment integration (checkout, webhooks, Inngest events)

## Architecture

### Layer boundaries

```
env.ts          ← no imports from src/ (reads process.env at startup)
lib/            ← pure TypeScript, no Next.js or React imports
lib/db/         ← server-side only (app/api/, inngest/, scripts/)
components/     ← no direct db access; data via server components or route handlers
inngest/        ← no HTTP response logic; background/side-effect processing only
```

### Key integration points

- **Auth**: Clerk — middleware in `src/proxy.ts`, dashboard routes behind `(dashboard)/` route group
- **Database**: Drizzle ORM + PostgreSQL — client at `src/lib/db/index.ts`, schemas in `src/lib/db/schemas/core.ts` (uses `pgSchema("core")`)
- **Background jobs**: Inngest — client at `src/inngest/core/client.ts`, served at `src/app/api/inngest/core/route.ts`. Register new functions in `src/inngest/core/functions.ts`
- **Payments**: Polar (not Stripe) — checkout redirect at `/api/polar/checkout`, webhooks at `/api/polar/webhook` forwarded as Inngest events (`polar/<type>`)
- **Environment**: All env access through `src/lib/env.ts` (t3-env with Zod validation). Never use `process.env` elsewhere.
- **UI**: shadcn/ui (new-york style) — add components with `bunx shadcn add <name>`. **Never edit `src/components/ui/` manually** (linting is disabled there).

### Inngest pattern

Events are defined with `eventType()` and Zod schemas. Functions are registered in the `functions` array exported from `src/inngest/core/functions.ts`. Use `logger` from the function handler context, not the import.

## Enforced rules (quick reference)

These are all lint-enforced. Violations fail `bun run checks`.

| Rule | What | Enforced by |
|---|---|---|
| `result.trycatch()` over `try/catch` | Error-as-value pattern | GritQL |
| `result.fail()` over `throw` (prefer) | Return errors, don't throw | GritQL |
| Log before throw/fail/pass | No silent outcomes | GritQL |
| `{ cause }` on every `new Error()` | Explicit error chains | GritQL |
| `logger` over `console.*` | Structured logging (pino) | Biome `noConsole` |
| Logger syntax: `logger.info({ key }, "message")` | Object first, string literal second | docs/rules.md |
| `@/` imports, no relative `../` | Absolute imports only | GritQL |
| No barrel files | Import from source files directly | Biome `noBarrelFile` |
| No `process.env` outside `env.ts` | Validated env access | Biome `noProcessEnv` |
| No `any` — use `unknown` | Strict types | Biome `noExplicitAny` |
| No `as` assertions — use type guards | Runtime-proven types | GritQL |
| No `!` non-null assertions | Check nullability | Biome `noNonNullAssertion` |
| No `??` — use `fallback()` or fix source | Explicit nullability handling | GritQL |
| Explicit `select()` columns | No `select()` without column list | GritQL |
| `<Fragment>` over `<>` | Named fragments | GritQL |
| `<Suspense fallback={<NamedSkeleton />}>` | Skeleton components, not inline HTML | GritQL |
| Tailwind over inline `style={{}}` | Design system compliance | GritQL |
| Theme tokens over raw colors | `bg-primary` not `bg-blue-500` | GritQL |
| Ternary → assign to variable | No inline `? :` in JSX | GritQL |
| `safeParse` over `parse` (Zod) | Error-as-value for validation | docs/rules.md |
| No `forEach` — use `for...of` | Biome `noForEach` |
| `i += 1` not `i++` | Biome `noIncrementDecrement` |

## Formatting

- 4-space indent, no semicolons, double quotes, trailing commas
- Line width: 100
- Array types: shorthand (`T[]` not `Array<T>`)
- Type definitions: `type` not `interface`
- Filenames: kebab-case or PascalCase
- Max cognitive complexity: 10, max lines per function: 70

## GritQL lint plugins

Custom rules live in `.grit/` and are registered as Biome plugins in `biome.json`. Test them with `bun run grit:test`. The `src/scripts/` directory has relaxed linting (no console/process.env/unused-var restrictions).
