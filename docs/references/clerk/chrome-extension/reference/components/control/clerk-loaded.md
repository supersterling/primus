# <ClerkLoaded>

The `<ClerkLoaded>` component guarantees that the Clerk object has loaded (the `status` is `'ready'` or `'degraded'`) and will be available under `window.Clerk`. This allows you to wrap child components to access the `Clerk` object without the need to check it exists.

## Example

It's not recommended to wrap the entire app in the `<ClerkLoaded>` component; instead, only wrap the components that need access to the `Clerk` object.

```jsx {{ filename: 'src/routes/home.tsx' }}
import { ClerkLoaded, ClerkLoading, ClerkDegraded, ClerkFailed } from '@clerk/chrome-extension'

export default function Home() {
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
