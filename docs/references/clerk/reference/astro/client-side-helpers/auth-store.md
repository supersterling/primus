# $authStore

The `$authStore` store provides a convenient way to access the current auth state and helper methods for managing the session.

## Returns

| Name      | Type   | Description                                                                                                                                                                                                                                                                                                             |
| --------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| userId    | string | The ID of the current user.                                                                                                                                                                                                                                                                                             |
| sessionId | string | The ID of the current session.                                                                                                                                                                                                                                                                                          |
| orgId     | string | The ID of the user's Active OrganizationA user can be a member of multiple Organizations, but only one can be active at a time. The Active Organization determines which Organization-specific data the user can access and which Role and related Permissions they have within the Organization..                      |
| orgRole   | string | The current user's Role in their Active OrganizationA user can be a member of multiple Organizations, but only one can be active at a time. The Active Organization determines which Organization-specific data the user can access and which Role and related Permissions they have within the Organization..          |
| orgSlug   | string | The URL-friendly identifier of the user's Active OrganizationA user can be a member of multiple Organizations, but only one can be active at a time. The Active Organization determines which Organization-specific data the user can access and which Role and related Permissions they have within the Organization.. |

## How to use the `$authStore` store

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

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
