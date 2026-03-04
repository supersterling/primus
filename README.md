# Primus

The foundation for what comes next.

Primus is an opinionated Next.js 16 starter for teams who want to ship product, not scaffolding. Auth, payments, background jobs, transactional email, structured logging, and 50+ lint rules — all wired together, tested, and documented before you write your first line of business logic.

**It is not a minimal starter.** If you want a blank canvas, use `create-next-app`. Primus exists because the decisions most teams make in the first week of a project are consistently the same, consistently wrong in the same ways, and consistently painful to fix later. This template makes them once, makes them deliberately, and documents why.

---

## Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | [Next.js 16](https://nextjs.org) on [Vercel](https://vercel.com) | App Router, RSC, typed routes, React Compiler — the current ceiling of full-stack React |
| Runtime | [Bun](https://bun.sh) | Faster installs, faster scripts, `.env.local` loaded automatically, no config for TypeScript |
| Auth | [Clerk](https://clerk.com) | User management is a product, not a library. Clerk handles MFA, OAuth, user profiles, and org management so you don't have to. |
| Background jobs | [Inngest v4](https://inngest.com) | Durable execution with retries, sleep, event fan-out, and realtime — without managing queues or workers |
| Payments | [Polar](https://polar.sh) | Stripe is powerful and complex. Polar is opinionated and fast. Hosted checkout, webhooks, and subscriptions with less surface area. |
| Database | [Drizzle ORM](https://orm.drizzle.team) + PostgreSQL | Type-safe queries, explicit column selection, no magic. Drizzle stays close to SQL. |
| Email | [Resend](https://resend.com) + [React Email](https://react.email) | Send transactional email from React components. Dead simple API. |
| UI | [shadcn/ui](https://ui.shadcn.com) + [Tailwind v4](https://tailwindcss.com) | Components you own, not a dependency. Design tokens enforced by the linter. |
| Linting | [Biome](https://biomejs.dev) + [GritQL](https://about.grit.io) | Biome covers standard rules. GritQL adds custom AST-level rules enforcing error handling, logging, and type safety patterns that Biome can't express. |
| Logging | [Pino](https://getpino.io) | Structured, fast, object-first syntax. Pretty in dev, JSON in prod. |
| Env | [t3-env](https://env.t3.gg) + Zod | Validated at startup. Missing vars throw immediately, not at runtime. |
| Doc integrity | [docref](https://github.com/supersterling/docref) | Semantic hashing of referenced code symbols in docs. Detects when code changes but docs don't. |

---

## What you get out of the box

**Auth** — Clerk with protected routes via middleware. `/app/*` requires sign-in. User profile management in the settings page.

**Payments** — Polar checkout (`/api/polar/checkout`) and HMAC-verified webhooks (`/api/polar/webhook`). Every Polar event becomes an Inngest event — write handlers by subscribing to `polar/<type>`. Both routes are opt-in: they return 503 with a clear error if the env vars aren't set.

**Background jobs** — Inngest client, typed event definitions, function registry, and a working example (`hello-world`) with realtime publishing. Add a function: create a file in `src/inngest/core/functions/`, register it in `functions.ts`, done.

**Transactional email** — `send-welcome-email` Inngest function fires on `app/user.created`. Welcome email is a proper React Email component with your design tokens.

**50+ lint rules** — Error handling, logging, type safety, React patterns, DB queries, and import style all enforced mechanically. `bun run checks` is the gate; it runs on pre-push.

**Documented architecture** — `docs/` covers the codemap, layer boundaries, coding rules, patterns, and billing integration. The docs are kept honest by docref: if referenced code changes without the docs updating, `docref check` fails.

---

## Prerequisites

**Bun**

```bash
curl -fsSL https://bun.sh/install | bash
```

Bun is the runtime, package manager, and script runner. Do not use `npm`, `yarn`, or `node` — they will work in some contexts and silently fail in others.

**Rust** (for docref)

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

**docref**

```bash
cargo install docref
```

docref keeps documentation in sync with code. It runs on pre-push and in `bun run checks`. Without it, those commands fail.

---

## Setup

**1. Clone and install**

```bash
git clone <your-repo>
cd primus
bun install
```

**2. Configure environment**

```bash
cp .env.example .env.local
```

Fill in `.env.local`. The required vars at minimum:

| Var | Get it from |
|---|---|
| `RESEND_API_KEY` | [resend.com/api-keys](https://resend.com/api-keys) |
| `DATABASE_URL` | Your PostgreSQL connection string |

Everything else (Clerk, Inngest, Polar) is optional — the app starts without them. Clerk keys come from environment variables injected by their Next.js SDK; follow [Clerk's Next.js quickstart](https://clerk.com/docs/quickstarts/nextjs) to set those up.

**3. Push the database schema**

```bash
bun run db:push
```

**4. Start the dev servers**

```bash
# Terminal 1 — Next.js
bun run dev

# Terminal 2 — Inngest local dev UI (http://localhost:8288)
bun run dev:inngest

# Terminal 3 — Polar webhook tunnel (optional, only if using payments)
bun run dev:polar
```

---

## Commands

```bash
bun run dev           # Next.js dev server
bun run dev:inngest   # Inngest local dev UI at localhost:8288
bun run dev:polar     # Tunnel Polar webhooks to localhost

bun run checks        # tsc + biome + docref — runs on pre-push
bun run biome:fix     # Auto-fix lint and format issues

bun run db:push       # Push schema to database (dev)
bun run db:generate   # Generate a Drizzle migration
bun run db:migrate    # Run migrations
bun run db:studio     # Open Drizzle Studio

bun run env:example   # Regenerate .env.example from env.ts
bun run env:local     # Generate .env.local interactively
bun run env:pull      # Pull env vars from Vercel
```

---

## Key conventions

Read `docs/rules.md` before writing code. The short version:

- **Error handling** — `result.trycatch()` instead of `try/catch`. Errors are values.
- **Logging** — `logger.info({ key }, "message")`. Object first, string literal second. Never `console.log`.
- **Env** — `env` from `@/lib/env` only. `process.env` is banned everywhere else.
- **Imports** — `@/` prefix always. No relative `../` across feature boundaries. No barrel files.
- **DB queries** — explicit column selection in every `select()` and `returning()`.
- **Types** — no `as`, no `!`, no `any`. Type guards and explicit null checks.

The linter enforces all of these. `bun run checks` must pass before pushing.

---

## Docs

| File | What it covers |
|---|---|
| `docs/architecture.md` | Codemap, layer boundaries, invariants |
| `docs/rules.md` | Coding rules with examples and reasoning |
| `docs/billing.md` | Polar checkout, webhook pipeline, Inngest event handlers |
| `docs/patterns/` | RSC streaming, Suspense boundaries, URL state, skeletons, Inngest patterns |

---

## Honest shortcomings

**Inngest v4 is in beta.** The realtime API and `eventType()` helper used throughout are v4-only features. The dependency is pinned intentionally. Upgrade when Inngest ships stable v4.

**No tests.** The template does not include application tests. The lint rules are thorough, but there are no unit or integration tests. You will need to add these for your own code.

**Polar is less established than Stripe.** It is simpler and faster to integrate, but has a smaller ecosystem, fewer third-party integrations, and a shorter track record. If you need Stripe specifically, you will need to replace the payment layer.

**PostgreSQL only.** The DB client uses `pg` with a connection pool attached to Vercel's infrastructure. SQLite, MySQL, and other databases are not supported without replacing `src/lib/db/index.ts`.

**Clerk is not free at scale.** Clerk's free tier is generous for early stage but pricing scales with monthly active users. Factor this into your cost model before you grow.
