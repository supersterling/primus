# Script loading

It sometimes might happen that Clerk doesn't successfully load and initialize during page rendering. This could happen for a myriad of reasons, including but not limited to:

- You have no internet connection
- The CDN which is used for the [ClerkJS script](https://clerk.com/docs/reference/javascript/overview.md) is offline or blocked
- Another script is colliding with Clerk
- Missing or invalid Publishable Key

Check your internet access and that e.g. no Ad-Blocker is blocking Clerk's scripts.

If Clerk stops working after you've added another script (e.g. through a React component), you can try delaying the loading of that other script. For example, to only mount `@monaco-editor/react` after Clerk loaded you can use the [`useClerk() hook`](https://clerk.com/docs/nextjs/reference/hooks/use-clerk.md):

```jsx
import { Editor } from '@monaco-editor/react'
import { useClerk } from '@clerk/nextjs'

export default function Home() {
  const clerk = useClerk()

  return <main>{clerk.loaded && <Editor />}</main>
}
```

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
