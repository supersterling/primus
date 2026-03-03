# Clerk Fastify SDK

The Clerk Fastify SDK provides a powerful set of tools and utilities to seamlessly integrate authentication, user management, and Organization management into your Fastify application. Refer to the [`quickstart guide`](https://clerk.com/docs/fastify/getting-started/quickstart.md) to get started.

## `clerkPlugin()`

The `clerkPlugin()` function is required to integrate Clerk's authentication into your application. The function checks request cookies and headers for a session JWT. If valid, it attaches the [`Auth`](https://clerk.com/docs/reference/backend/types/auth-object.md){{ target: '_blank' }} object to the `request` object under the `auth` key. See the [`reference doc`](https://clerk.com/docs/reference/fastify/clerk-plugin.md) for more information.

## `getAuth()`

The `getAuth()` helper retrieves the current user's authentication state from the `request` object. It returns the [`Auth object`](https://clerk.com/docs/reference/backend/types/auth-object.md){{ target: '_blank' }}, which includes helpful authentication information like the user's ID, session ID, and Organization ID. It's also useful for protecting routes. See the [`reference doc`](https://clerk.com/docs/reference/fastify/get-auth.md) for more information.

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
