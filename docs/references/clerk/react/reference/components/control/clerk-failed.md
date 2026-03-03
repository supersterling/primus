# <ClerkFailed>

The `<ClerkFailed>` component indicates that the Clerk object has failed to load. This is useful for displaying an error message to the user.

## Example

It's not recommended to wrap the entire app in control components; instead, only wrap the components that need access to the `Clerk` object, such as custom flows.

```tsx {{ filename: 'src/App.tsx' }}
import { ClerkLoaded, ClerkLoading, ClerkDegraded, ClerkFailed } from '@clerk/clerk-react'

export default function App() {
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

export default App
```

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
