# <ClerkDegraded>

The `<ClerkDegraded>` component indicates that Clerk is partially operational.

## Example

It's not recommended to wrap the entire app in control components; instead, only wrap the components that need access to the `Clerk` object, such as custom flows.

```tsx {{ filename: 'app/routes/_index.tsx' }}
import { ClerkLoading, ClerkLoaded, ClerkDegraded, ClerkFailed } from '@clerk/remix'

export default function Index() {
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
