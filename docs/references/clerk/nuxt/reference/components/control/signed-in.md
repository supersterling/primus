# <SignedIn>

## Overview

The `<SignedIn>` component offers authentication checks as a cross-cutting concern. Any children components wrapped by a `<SignedIn>` component will be rendered only if there's a user with an active session signed in your application.

> This component only **visually hides** its children when the current user is not authenticated. The contents of its children remain accessible via the browser's source code even if the user fails the authentication check. Do not use this component to hide sensitive information that should be completely inaccessible to unauthorized users. For truly sensitive data, perform authorization checks on the server before sending the data to the client.

## Example

```vue {{ filename: 'App.vue' }}
<script setup lang="ts">
// Components are automatically imported
</script>

<template>
  <SignedIn>
    <div>You are signed in.</div>
  </SignedIn>
  <p>This content is always visible.</p>
</template>
```

## Properties

| Name                     | Type    | Description                                                                                 |
| ------------------------ | ------- | ------------------------------------------------------------------------------------------- |
| treatPendingAsSignedOut? | boolean | A boolean that indicates whether to treat pending sessions as signed out. Defaults to true. |

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
