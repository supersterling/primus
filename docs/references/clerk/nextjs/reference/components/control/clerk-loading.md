# <ClerkLoading>

The `<ClerkLoading>` renders its children while Clerk is loading, and is helpful for showing a custom loading state.

## Example

It's not recommended to wrap the entire app in the `<ClerkLoading>` component; instead, only wrap the components that need access to the `Clerk` object.

**App Router**

```tsx {{ filename: 'app/page.tsx' }}
import { ClerkLoaded, ClerkLoading, ClerkDegraded, ClerkFailed } from '@clerk/nextjs'

export default function Page() {
  return (
    <>
      <ClerkLoading>
        <p>Clerk is loading...</p>
      </ClerkLoading>
      <ClerkLoaded>
        <p>Clerk has loaded (ready or degraded)</p>
        <MyCustomSignInFlow />
        <ClerkDegraded>
          <p>Clerk is experiencing issues. Please try again later.</p>
        </ClerkDegraded>
      </ClerkLoaded>
      <ClerkFailed>
        <p>Something went wrong with Clerk. Please contact support.</p>
      </ClerkFailed>
    </>
  )
}
```

**Pages Router**

```tsx {{ filename: 'pages/index.tsx' }}
import { ClerkLoaded, ClerkLoading, ClerkDegraded, ClerkFailed } from '@clerk/nextjs'

export default function Page() {
  return (
    <>
      <ClerkLoading>
        <p>Clerk is loading...</p>
      </ClerkLoading>
      <ClerkLoaded>
        <p>Clerk has loaded (ready or degraded)</p>
        <MyCustomSignInFlow />
        <ClerkDegraded>
          <p>Clerk is experiencing issues. Please try again later.</p>
        </ClerkDegraded>
      </ClerkLoaded>
      <ClerkFailed>
        <p>Something went wrong with Clerk. Please contact support.</p>
      </ClerkFailed>
    </>
  )
}
```

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
