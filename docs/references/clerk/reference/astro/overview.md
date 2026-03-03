# Clerk Astro SDK

The Clerk Astro SDK gives you access to prebuilt components, stores, and helpers to make user authentication easier. Refer to the [`quickstart guide`](https://clerk.com/docs/astro/getting-started/quickstart.md) to get started.

## Integration

To configure Clerk with Astro, you must pass [`the clerk() integration`](https://clerk.com/docs/reference/astro/integration.md) to the `integrations` array in your `astro.config.mjs` file. See the [`quickstart`](https://clerk.com/docs/astro/getting-started/quickstart.md#update-astro-config-mjs) for more information on configuring the integration.

## `updateClerkOptions()`

The `updateClerkOptions()` function is used to update Clerk's options at runtime. It can be called at any time after [`Clerk has been initialized`](https://clerk.com/docs/reference/astro/integration.md). See the [`reference documentation`](https://clerk.com/docs/reference/astro/update-clerk-options.md) for more information.

## Client-side helpers

The Astro SDK provides [stores](https://github.com/nanostores/nanostores) that give you access to the [`Clerk`](https://clerk.com/docs/reference/javascript/clerk.md) object and helper methods for authentication flows.

- [`$authStore`](https://clerk.com/docs/reference/astro/client-side-helpers/auth-store.md)
- [`$clerkStore`](https://clerk.com/docs/reference/astro/client-side-helpers/clerk-store.md)
- [`$userStore`](https://clerk.com/docs/reference/astro/client-side-helpers/user-store.md)
- [`$signInStore`](https://clerk.com/docs/reference/astro/client-side-helpers/sign-in-store.md)
- [`$signUpStore`](https://clerk.com/docs/reference/astro/client-side-helpers/sign-up-store.md)
- [`$sessionStore`](https://clerk.com/docs/reference/astro/client-side-helpers/session-store.md)
- [`$sessionListStore`](https://clerk.com/docs/reference/astro/client-side-helpers/session-list-store.md)
- [`$organizationStore`](https://clerk.com/docs/reference/astro/client-side-helpers/organization-store.md)

## Server-side helpers

The following references show how to integrate Clerk features into your Astro app on the server-side.

### Locals

The Astro SDK provides access to Clerk's authentication data through [Astro's `locals`](https://docs.astro.build/en/guides/middleware/#storing-data-in-contextlocals) object. The following references show how to access authentication data in server-side code:

- [`Auth`](https://clerk.com/docs/reference/astro/locals.md#locals-auth)
- [`CurrentUser`](https://clerk.com/docs/reference/astro/locals.md#locals-current-user)

### `clerkMiddleware()`

The `clerkMiddleware()` helper integrates Clerk authentication and authorization into your Astro application through middleware. You can learn more [`here`](https://clerk.com/docs/reference/astro/clerk-middleware.md).

### `clerkClient()`

[`Clerk's JS Backend SDK`](https://clerk.com/docs/js-backend/getting-started/quickstart.md) is a wrapper around the [Backend API](https://clerk.com/docs/reference/backend-api.md){{ target: '_blank' }} that makes it easier to interact with the API. For example, to retrieve a list of all users in your application, you can use the `users.getUserList()` method from the JS Backend SDK instead of manually making a fetch request to the `https://api.clerk.com/v1/users` endpoint.

To access a resource, you must first instantiate a `clerkClient` instance. See the [`reference documentation`](https://clerk.com/docs/js-backend/getting-started/quickstart.md) for more information.

### Example: Use `clerkClient` to get a user's information

The following example uses `clerkClient` to get information about the currently signed-in user. If the user is authenticated, their `userId` is passed to [`clerkClient.users.getUser()`](https://clerk.com/docs/reference/backend/user/get-user.md){{ target: '_blank' }} to get the current user's [`User`](https://clerk.com/docs/reference/javascript/user.md){{ target: '_blank' }} object. If not authenticated, the user is redirected to the sign-in page.

```tsx
import { clerkClient } from '@clerk/astro/server'

export async function GET(context) {
  const { isAuthenticated, userId, redirectToSignIn } = context.locals.auth()

  if (!isAuthenticated) {
    return redirectToSignIn()
  }

  const user = await clerkClient(context).users.getUser(userId)

  return new Response(JSON.stringify({ user }))
}
```

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
