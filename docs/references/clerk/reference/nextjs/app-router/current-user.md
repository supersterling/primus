# currentUser()

> For optimal performance and to avoid rate limiting, it's recommended to use the [`useUser()`](https://clerk.com/docs/nextjs/reference/hooks/use-user.md) hook on the client-side when possible. Only use `currentUser()` when you specifically need user data in a server context.

The `currentUser()` helper returns the [`Backend User`](https://clerk.com/docs/reference/backend/types/backend-user.md) object of the currently active user. It can be used in Server Components, Route Handlers, and Server Actions.

Under the hood, this helper:

- calls `fetch()`, so it is automatically deduped per request.
- uses the [`GET /v1/users/{user_id}`](https://clerk.com/docs/reference/backend-api/tag/users/get/users/%7Buser_id%7D.md){{ target: '_blank' }} endpoint.
- counts towards the [Backend API request rate limit](https://clerk.com/docs/guides/how-clerk-works/system-limits.md).

> The [`Backend User`](https://clerk.com/docs/reference/backend/types/backend-user.md) object includes a `privateMetadata` field that should not be exposed to the frontend. Avoid passing the full user object returned by `currentUser()` to the frontend. Instead, pass only the specified fields you need.

```tsx {{ filename: 'app/page.tsx' }}
import { currentUser } from '@clerk/nextjs/server'

export default async function Page() {
  const user = await currentUser()

  if (!user) return <div>Not signed in</div>

  return <div>Hello {user?.firstName}</div>
}
```

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
