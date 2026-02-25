# Clerk Integration Design

## Decision

Use Clerk for authentication. Keyless mode means zero configuration to start developing — no Clerk account, no env vars, no setup scripts.

## Scope

- Email/password + social auth (configured in Clerk dashboard when ready)
- Pre-built UI components (`<SignInButton>`, `<UserButton>`, etc.)
- Server-side auth via `auth()` from `@clerk/nextjs/server`
- Route protection via `clerkMiddleware()` in proxy

## Not in scope

- Shadow table / user sync webhooks (defer until needed)
- Organization support (add later)
- Custom auth UI (use Clerk's components)

## Files changed

| File | Action | Description |
|---|---|---|
| `package.json` | modify | Add `@clerk/nextjs` |
| `src/proxy.ts` | create | `clerkMiddleware()` with standard matcher |
| `src/app/layout.tsx` | modify | Wrap with `<ClerkProvider>`, add auth components |
| `.mcp.json` | create | Clerk MCP server for AI tooling |

## Environment variables

Optional. Keyless mode auto-generates temporary keys when none are set.

When ready for production, add to `.env.local`:

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...
```

## Server-side auth pattern

```tsx
import { auth } from "@clerk/nextjs/server"

export default async function Page() {
    const { userId } = await auth()
    if (!userId) redirect("/sign-in")
    // ...
}
```

## Future additions

- Shadow table + Clerk webhooks when domain-specific user queries are needed
- Organization plugin when multi-tenancy is needed
- `src/lib/env.ts` Zod schema for Clerk vars when going to production
