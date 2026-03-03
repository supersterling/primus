# <RedirectToOrganizationProfile /> (deprecated)

> This feature is deprecated. Please use the [`redirectToOrganizationProfile() method`](https://clerk.com/docs/reference/javascript/clerk.md#redirect-to-organization-profile) instead.

The `<RedirectToOrganizationProfile />` component will navigate to the Organization profile URL which has been configured in your application instance. The behavior will be just like a server-side (3xx) redirect, and will override the current location in the history stack.

## Example

```tsx {{ filename: 'pages/index.tsx' }}
import { SignedIn, SignedOut, RedirectToOrganizationProfile } from '@clerk/clerk-react'

export default function Page() {
  return (
    <>
      <SignedIn>
        <RedirectToOrganizationProfile />
      </SignedIn>
      <SignedOut>You need to sign in to view your Organization profile.</SignedOut>
    </>
  )
}
```

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
