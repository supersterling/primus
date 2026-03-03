# <ClerkLoaded>

The `<ClerkLoaded>` component guarantees that the Clerk object has loaded (the `status` is `'ready'` or `'degraded'`) and will be available under `window.Clerk`. This allows you to wrap child components to access the `Clerk` object without the need to check it exists.

## Example

It's not recommended to wrap the entire app in the `<ClerkLoaded>` component; instead, only wrap the components that need access to the `Clerk` object.

```vue {{ filename: 'App.vue' }}
<script setup lang="ts">
import { ClerkLoaded } from '@clerk/vue'
</script>

<template>
  <ClerkLoaded>
    <p>Clerk has loaded</p>
  </ClerkLoaded>
</template>
```

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
