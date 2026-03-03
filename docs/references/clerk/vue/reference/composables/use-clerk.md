# useClerk() | Vue

> This composable should only be used for advanced use cases, such as building a completely custom OAuth flow or as an escape hatch to access to the `Clerk` object.

The `useClerk()` composable provides access to the [`Clerk`](https://clerk.com/docs/reference/javascript/clerk.md) object, giving you the ability to build alternatives to any [`Clerk component`](https://clerk.com/docs/vue/reference/components/overview.md).

## Returns

The `useClerk()` composable returns the `Clerk` object, which includes all the methods and properties listed in the [`Clerk reference`](https://clerk.com/docs/reference/javascript/clerk.md).

## How to use the `useClerk()` composable

The following example uses the `useClerk()` composable to access the `clerk` object. The `clerk` object is used to call the [`openSignIn()`](https://clerk.com/docs/reference/javascript/clerk.md#sign-in) method to open the sign-in modal.

```vue
<script setup>
import { useClerk } from '@clerk/vue'

const clerk = useClerk()
</script>

<template>
  <button @click="clerk.openSignIn">Sign in</button>
</template>
```

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
