# <RedirectToSignIn />

The `<RedirectToSignIn />` component will navigate to the sign in URL which has been configured in your application instance. The behavior will be just like a server-side (3xx) redirect, and will override the current location in the history stack.

## Example

```vue {{ filename: 'App.vue' }}
<script setup lang="ts">
// Components are automatically imported
</script>

<template>
  <SignedIn>
    <UserButton />
  </SignedIn>
  <SignedOut>
    <RedirectToSignIn />
  </SignedOut>
</template>
```

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
