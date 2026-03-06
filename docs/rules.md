# Rules

Coding rules enforced by GritQL lint rules in `.grit/`. Each section explains the why behind the constraint.

## Index

| Rule | File | Summary |
|---|---|---|
| Error Handling | [`rules/error-handling.md`](rules/error-handling.md) | `result.trycatch()` over try/catch, error construction with `{ cause }` |
| Logging | [`rules/logging.md`](rules/logging.md) | Structured `logger`, object-first syntax, log before throw/fail |
| Type Safety | [`rules/type-safety.md`](rules/type-safety.md) | Type guards over `as`, no `any`/`!`/`??`, discriminated unions |
| Imports | [`rules/imports.md`](rules/imports.md) | `@/` absolute imports only, no relative paths |
| Database | [`rules/database.md`](rules/database.md) | Explicit `select()` columns, derive types from queries |
| Zod | [`rules/zod.md`](rules/zod.md) | `safeParse` over `parse`, infer types from schemas |
| React & Tailwind | [`rules/react-tailwind.md`](rules/react-tailwind.md) | Tailwind over inline styles, theme tokens, named Suspense skeletons, no inline ternaries |
| Code Style | [`rules/code-style.md`](rules/code-style.md) | No IIFEs, no `??` — fix nullability at the source |
