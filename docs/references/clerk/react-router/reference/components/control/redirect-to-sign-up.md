# <RedirectToSignUp />

The `<RedirectToSignUp />` component will navigate to the sign up URL which has been configured in your application instance. The behavior will be just like a server-side (3xx) redirect, and will override the current location in the history stack.

## Example

```tsx {{ filename: 'app/routes/home.tsx' }}
import { SignedIn, SignedOut, RedirectToSignUp, UserButton } from '@clerk/react-router'

export default function Home() {
  return (
    <>
      <SignedIn>
        <UserButton />
      </SignedIn>
      <SignedOut>
        <RedirectToSignUp />
      </SignedOut>
    </>
  )
}
```

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
