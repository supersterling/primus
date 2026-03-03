# Protect content and read user data

Clerk provides helpers that you can use to protect content and read user data in your Astro application.

## Server-side

The [`auth()`](https://clerk.com/docs/reference/astro/locals.md) and [`currentUser()`](https://clerk.com/docs/reference/astro/locals.md) locals are Astro-specific helpers that you can use inside of your Astro components and [endpoints](https://docs.astro.build/en/guides/endpoints/#server-endpoints-api-routes).

- The `auth()` local returns the [`Auth`](https://clerk.com/docs/reference/backend/types/auth-object.md) object of the currently active user.
- The `currentUser()` local returns the [`Backend User`](https://clerk.com/docs/reference/backend/types/backend-user.md) object of the currently active user. This is helpful if you want to render user information, like their first and last name, directly from the server. Under the hood, `currentUser()` uses the [`clerkClient`](https://clerk.com/docs/js-backend/getting-started/quickstart.md) wrapper to make a call to the Backend API. **This does count towards the [Backend API request rate limit](https://clerk.com/docs/guides/how-clerk-works/system-limits.md)**. This also uses `fetch()` so it is automatically deduped per request.

The following example demonstrates how to protect a page from unauthenticated users and access the current user's information.

**.astro component**

```astro {{ filename: 'src/pages/me.astro' }}
---
// Use `locals.auth()` to access `isAuthenticated` and the user's ID
const { isAuthenticated, userId } = Astro.locals.auth()

// Protect the route by checking if the user is signed in
if (!isAuthenticated) {
  return Astro.redirect('/login')
}

// Get the Backend User object when you need access to the user's information
const user = await Astro.locals.currentUser()
---

<!-- Use `user` to render user details or create UI elements -->
<div>Welcome, {user.firstName}!</div>
```

**API Route**

```tsx {{ filename: 'src/api/me.ts' }}
export async function GET({ locals }) {
  // Use `locals.auth()` to access `isAuthenticated` and the user's ID
  const { isAuthenticated, userId } = locals.auth()

  // Protect the route by checking if the user is signed in
  if (!isAuthenticated) {
    return new Response('Unauthorized', { status: 401 })
  }

  // Get the Backend User object when you need access to the user's information
  const user = await locals.currentUser()

  // Add your Route Handler's logic with the returned `user` object

  return new Response(
    JSON.stringify({ userId: user.id, email: user.emailAddresses[0].emailAddress }),
  )
}
```

### Retrieve data from external sources

Clerk provides integrations with a number of popular databases.

To retrieve a token from a [JWT template](https://clerk.com/docs/guides/sessions/jwt-templates.md) and fetch data from an external source, use the [`getToken()`](https://clerk.com/docs/reference/backend/types/auth-object.md#get-token){{ target: '_blank' }} method from the `auth()` local.

```ts {{ filename: 'src/pages/api/route.ts' }}
export async function GET({ locals }) {
  // Use `locals.auth()` to access `isAuthenticated`, the user's ID, and the `getToken()` method
  const { isAuthenticated, userId, getToken } = locals.auth()

  // Protect the route by checking if the user is signed in
  if (!isAuthenticated) {
    return new Response('Unauthorized', { status: 401 })
  }

  // Use `getToken()` to get a token from the JWT template
  const token = await getToken({ template: 'supabase' })

  // Fetch data from Supabase and return it
  const data = { supabaseData: 'Hello World' }

  return new Response(JSON.stringify(data))
}
```

## Client-side

Clerk Astro provides a set of useful [`stores`](https://clerk.com/docs/reference/astro/overview.md#client-side-helpers) that give you access to many important objects, such as the `Clerk`, `User`, and `Session` object.

### `$authStore`

The following example demonstrates how to use the [`$authStore`](https://clerk.com/docs/reference/astro/client-side-helpers/auth-store.md) to access the current auth state. It uses `userId` to detect if the user is signed in.

**React**

```tsx {{ filename: 'components/external-data.tsx' }}
import { useStore } from '@nanostores/react'
import { $authStore } from '@clerk/astro/client'

export default function ExternalData() {
  const { userId } = useStore($authStore)

  if (userId === undefined) {
    // Handle loading state however you like
    return <div>Loading...</div>
  }

  if (userId === null) {
    // Handle signed out state however you like
    return <div>Sign in to view this page</div>
  }

  return <div>...</div>
}
```

**Vue**

```vue {{ filename: 'components/external-data.vue' }}
<script setup>
import { useStore } from '@nanostores/vue'
import { $authStore } from '@clerk/astro/client'

const auth = useStore($authStore)
</script>

<template>
  <div v-if="auth.userId === undefined">Loading...</div>
  <div v-else-if="auth.userId === null">Sign in to view this page</div>
  <div v-else>...</div>
</template>
```

**Svelte**

```svelte {{ filename: 'components/external-data.svelte' }}
<script>
  // The $ prefix is reserved in Svelte for its own reactivity system.
  // Alias the imports to avoid conflicts.
  import { $authStore as auth } from '@clerk/astro/client'
</script>

{#if $auth.userId === undefined}
  <div>Loading...</div>
{:else if $auth.userId === null}
  <div>Sign in to view this page</div>
{:else}
  <div>...</div>
{/if}
```

### `$userStore`

The following example demonstrates how to use the [`$userStore`](https://clerk.com/docs/reference/astro/client-side-helpers/user-store.md) to access the `User` object. It returns `undefined` while Clerk is still loading and `null` if the user is not signed in.

For more information, see the [`User reference`](https://clerk.com/docs/reference/javascript/user.md){{ target: '_blank' }}.

**React**

```tsx {{ filename: 'user.tsx' }}
import { useStore } from '@nanostores/react'
import { $userStore } from '@clerk/astro/client'

export default function User() {
  const user = useStore($userStore)

  if (user === undefined) {
    // Handle loading state however you like
    return null
  }

  if (user === null) {
    return <div>Not signed in</div>
  }

  return <div>Hello {user.fullName}!</div>
}
```

**Vue**

```vue {{ filename: 'user.vue' }}
<script setup>
import { useStore } from '@nanostores/vue'
import { $userStore } from '@clerk/astro/client'

const user = useStore($userStore)
</script>

<template>
  <div v-if="user === undefined">
    <!-- Handle loading state however you like -->
  </div>
  <div v-else-if="user === null">Not signed in</div>
  <div v-else>Hello {{ user.fullName }}!</div>
</template>
```

**Svelte**

```svelte {{ filename: 'user.svelte' }}
<script>
  // The $ prefix is reserved in Svelte for its own reactivity system.
  // Alias the imports to avoid conflicts.
  import { $userStore as user } from '@clerk/astro/client'
</script>

{#if $user === undefined}
  <!-- Handle loading state however you like -->
{:else if $user === null}
  <div>Not signed in</div>
{:else}
  <div>Hello {$user.fullName}!</div>
{/if}
```

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
