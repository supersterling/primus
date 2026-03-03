# Primus — Agent Guide

An opinionated Next.js starter on Vercel + Inngest.

## Start here

- `docs/architecture.md` — codemap, layer boundaries, architectural invariants
- `docs/rules.md` — coding rules (error handling, logging, TypeScript, React, DB)

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
