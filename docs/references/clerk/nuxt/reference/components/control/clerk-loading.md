# <ClerkLoading>

The `<ClerkLoading>` renders its children while Clerk is loading, and is helpful for showing a custom loading state.

## Example

It's not recommended to wrap the entire app in the `<ClerkLoading>` component; instead, only wrap the components that need access to the `Clerk` object.

```vue {{ filename: 'App.vue' }}
<script setup lang="ts">
// Components are automatically imported
</script>

<template>
  <ClerkLoading>
    <p>Clerk is loading</p>
  </ClerkLoading>
  <ClerkLoaded>
    <p>Clerk has loaded</p>
  </ClerkLoaded>
</template>
```

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
