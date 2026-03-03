# Protect content and read user data

Clerk provides [`composables`](https://clerk.com/docs/reference/nuxt/overview.md#client-side-helpers) to protect content and read user data in your Nuxt application.

## Client-side

### `useAuth()`

The `useAuth()` composable provides access to the current user's authentication state and methods to manage the active session. You can use this composable to protect pages; learn more about how to use it to protect pages in the [dedicated guide](https://clerk.com/docs/guides/secure/protect-pages.md).

In the following example, the `isLoaded` property checks if Clerk has finished initializing and the `isSignedIn` property checks if the user is signed in in order to protect the page.

```vue {{ filename: 'app/pages/protected-page.vue' }}
<script setup>
const { isSignedIn, isLoaded, userId } = useAuth()
</script>

<template>
  <!-- Use `isLoaded` to check if Clerk is loaded -->
  <div v-if="!isLoaded">Loading...</div>
  <!-- Use `isSignedIn` to check if the user is signed in -->
  <div v-else-if="!isSignedIn">Sign in to access this page</div>
  <!-- Use `userId` to access the current user's ID -->
  <div v-else>Hello, {{ userId }}!</div>
</template>
```

## `useUser()`

The `useUser()` composable provides access the [`User`](https://clerk.com/docs/reference/javascript/user.md) object, which contains the current user's data such as their full name.

The following example uses the `useUser()` composable to display the user's first name if they are signed in. The `isLoaded` property checks if Clerk has finished initializing and the `isSignedIn` property checks if a user is currently signed in.

```vue {{ filename: 'app/pages/protected-page.vue' }}
<script setup>
const { isLoaded, isSignedIn, user } = useUser()
</script>

<template>
  <div v-if="!isLoaded">Loading...</div>
  <div v-else-if="!isSignedIn">Sign in to access this page</div>
  <div v-else>Hello, {{ user.firstName }}!</div>
</template>
```

## Server-side

The `Auth` object is available at `event.context.auth()` in your [event handlers](https://h3.unjs.io/guide/event-handler). This JavaScript object contains important authentication information like the current user's session ID, user ID, and Organization ID, and an `isAuthenticated` property to protect your API routes from unauthenticated users.

In some cases, you may need the full [`Backend User`](https://clerk.com/docs/reference/backend/types/backend-user.md){{ target: '_blank' }} object of the currently active user. This is helpful if you want to render information, like their first and last name, directly from the server. The `clerkClient()` helper returns an instance of the [`JS Backend SDK`](https://clerk.com/docs/js-backend/getting-started/quickstart.md){{ target: '_blank' }}, which exposes Clerk's Backend API resources through methods such as the [`getUser()`](https://clerk.com/docs/reference/backend/user/get-user.md){{ target: '_blank' }} method. This method returns the full `Backend User` object.

The following example uses the `Auth` object to access the `userId` and `isAuthenticated` properties. The `userId` is passed to the JS Backend SDK's `getUser()` method to get the user's full `Backend User` object.

```ts {{ filename: 'server/api/auth/index.ts' }}
import { clerkClient } from '@clerk/nuxt/server'

export default defineEventHandler(async (event) => {
  // Use `auth` to get the user's ID
  const { isAuthenticated, userId } = event.context.auth()

  // Protect the API route by checking if the user is signed in
  if (!isAuthenticated) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized: No user ID provided',
    })
  }

  // Get the user's full `Backend User` object
  const user = await clerkClient(event).users.getUser(userId)

  return user
})
```

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
