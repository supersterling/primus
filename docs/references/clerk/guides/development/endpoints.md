# Endpoints

Clerk provides helpers that allow you to protect your [Astro endpoints](https://docs.astro.build/en/guides/endpoints/#server-endpoints-api-routes), fetch the current user, and interact with the Clerk Backend API.

## Protect your endpoints

If you aren't protecting your endpoints using [`clerkMiddleware()`](https://clerk.com/docs/reference/astro/clerk-middleware.md), you can use the [`auth() local`](https://clerk.com/docs/reference/astro/locals.md) and check for the `isAuthenticated` value, as shown in the following example:

```ts {{ filename: 'src/pages/api/route.ts' }}
export async function GET({ locals }) {
  const { isAuthenticated, userId } = locals.auth()

  if (!isAuthenticated) {
    return new Response('Error: No signed in user', { status: 401 })
  }

  // Add your Endpoint logic here

  return new Response(JSON.stringify({ userId }))
}
```

## Retrieve data from external sources

Clerk provides integrations with a number of popular databases.

To retrieve a token from a JWT template and fetch data from an external source, use the [`getToken()`](https://clerk.com/docs/reference/backend/types/auth-object.md#get-token){{ target: '_blank' }} method from the [`auth() local`](https://clerk.com/docs/reference/astro/locals.md), as shown in the following example:

```ts {{ filename: 'src/pages/api/route.ts' }}
export async function GET({ locals }) {
  const { isAuthenticated, userId, getToken } = locals.auth()

  if (!isAuthenticated) {
    return new Response('Unauthorized', { status: 401 })
  }

  const token = await getToken({ template: 'supabase' })

  // Fetch data from Supabase and return it.
  const data = { supabaseData: 'Hello World' }

  return new Response(JSON.stringify(data))
}
```

## Retrieve the current user

In some cases, you might need the current user in your endpoint. Use the asynchronous [`currentUser() local`](https://clerk.com/docs/reference/astro/locals.md#locals-current-user) to retrieve the current [`Backend User`](https://clerk.com/docs/reference/backend/types/backend-user.md){{ target: '_blank' }} object, as shown in the following example:

> The [`Backend User`](https://clerk.com/docs/reference/backend/types/backend-user.md) object includes a `privateMetadata` field that should not be exposed to the frontend. Avoid passing the full user object returned by `currentUser()` to the frontend. Instead, pass only the specified fields you need.

```ts {{ filename: 'src/pages/api/route.ts' }}
export async function GET({ locals }) {
  const user = await locals.currentUser()

  if (!user) {
    return new Response('Unauthorized', { status: 401 })
  }

  return new Response(
    JSON.stringify({ userId: user.id, email: user.emailAddresses[0].emailAddress }),
  )
}
```

## Interact with Clerk's Backend API

The [`JS Backend SDK`](https://clerk.com/docs/js-backend/getting-started/quickstart.md) exposes the [Backend API](https://clerk.com/docs/reference/backend-api.md){{ target: '_blank' }} resources and low-level authentication utilities for JavaScript environments.

`clerkClient` exposes an instance of the JS Backend SDK for use in server environments. Use this instance to interact with the Clerk Backend API, as shown in the following example:

```ts {{ filename: 'src/pages/api/route.ts' }}
import { clerkClient } from '@clerk/astro/server'

export async function POST(context) {
  const { isAuthenticated, userId } = context.locals.auth()

  if (!isAuthenticated) {
    return new Response('Unauthorized', { status: 401 })
  }

  const params = { firstName: 'Clerk', lastName: 'Cookie' }

  const user = await clerkClient(context).users.updateUser(userId, params)

  return new Response(JSON.stringify({ user }))
}
```

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
