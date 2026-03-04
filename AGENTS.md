# Primus — Agent Guide

An opinionated Next.js starter on Vercel + Inngest.

## Start here

- `docs/architecture.md` — codemap, layer boundaries, architectural invariants
- `docs/rules.md` — coding rules (error handling, logging, TypeScript, React, DB)
- `docs/billing.md` — Polar payment integration (checkout, webhooks, Inngest events)

## Before writing any code

Read `docs/rules.md` in full before writing or editing code. Then, as you write each piece:

- **Error handling** — are you using `result.trycatch`? Logging before failing or throwing?
- **Logging** — structured object first, string literal second, no template literals?
- **Types** — type guards over `as`? No `any`, no `!`, no `??`?
- **Imports** — `@/` prefix, no barrel files, no relative `../` across boundaries?
- **DB** — explicit column selection in every `select()` and `returning()`?
- **React** — Tailwind over inline styles, theme tokens over raw colors, `Fragment` over `<>`?

If you are unsure whether your code follows a rule, check `docs/rules.md` before proceeding. The rules are enforced by linters — violations will fail `bun run checks`.

## Runtime

Bun, not Node:

- `bun <file>` not `node <file>`
- `bun test` not jest/vitest
- `bun install` not npm/yarn/pnpm
- `bunx` not npx
- Bun auto-loads `.env.local` — no dotenv needed

## Key commands

```bash
bun run dev           # Next.js dev server
bun run dev:inngest   # Inngest local dev server (run alongside dev)
bun run checks        # tsc + biome + docref — run before committing
bun run biome:fix     # Auto-fix lint/format issues
bun run db:push       # Push schema to database (dev)
bun run db:generate   # Generate Drizzle migration
bun run db:migrate    # Run migrations
bun run db:studio     # Open Drizzle Studio
```
