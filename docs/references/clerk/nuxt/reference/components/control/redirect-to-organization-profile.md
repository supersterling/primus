# <RedirectToOrganizationProfile /> (deprecated)

> This feature is deprecated. Please use the [`redirectToOrganizationProfile() method`](https://clerk.com/docs/reference/javascript/clerk.md#redirect-to-organization-profile) instead.

The `<RedirectToOrganizationProfile />` component will navigate to the Organization profile URL which has been configured in your application instance. The behavior will be just like a server-side (3xx) redirect, and will override the current location in the history stack.

## Example

```vue {{ filename: 'App.vue' }}
<script setup lang="ts">
// Components are automatically imported
</script>

<template>
  <SignedIn>
    <RedirectToOrganizationProfile />
  </SignedIn>
  <SignedOut>
    <p>You need to sign in to view your Organization profile.</p>
  </SignedOut>
</template>
```

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
