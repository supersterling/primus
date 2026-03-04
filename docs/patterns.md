# Patterns

Recipes for building features in this codebase. Where `rules.md` says **what** and **what not**, this directory says **how**. Each pattern includes the decision framework, a minimal recipe, and references to real code when available.

## Index

| Pattern | File | Summary |
|---|---|---|
| Server-to-Client Promise Streaming | `patterns/server-promise-streaming.md` | Start fetch in RSC, pass unresolved promise to client, unwrap with `use()` |
| Suspense Boundary Placement | `patterns/suspense-boundaries.md` | Push boundaries as far down as possible; split on independent data/latency/errors |
| URL State over React State | `patterns/url-state.md` | nuqs for type-safe URL params; `useState` only for ephemeral UI state |
| Collocating Skeletons and Errors | `patterns/skeleton-collocation.md` | Export skeleton + error fallback from same file as the component |
| Inngest Function Patterns | `patterns/inngest-functions.md` | Durable execution model, step patterns, idempotency, flow control, error handling |