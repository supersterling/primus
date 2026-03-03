# <ClerkLoading>

The `<ClerkLoading>` renders its children while Clerk is loading, and is helpful for showing a custom loading state.

## Example

It's not recommended to wrap the entire app in the `<ClerkLoading>` component; instead, only wrap the components that need access to the `Clerk` object.

> Unlike other Clerk components for Astro, `ClerkLoading` must be imported from `@clerk/astro/react`. This requires that your Astro app is set up with React. See [`Use Clerk with Astro and React`](https://clerk.com/docs/reference/astro/react.md) for guidance.

```astro {{ filename: 'index.astro' }}
---
import { ClerkLoading, ClerkLoaded } from '@clerk/astro/react'
---

<ClerkLoading client:load>
  <p>Clerk is loading</p>
</ClerkLoading>
<ClerkLoaded client:load>
  <p>Clerk has loaded</p>
</ClerkLoaded>
```

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
