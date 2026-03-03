# <RedirectToOrganizationProfile /> (deprecated)

> This feature is deprecated. Please use the [`redirectToOrganizationProfile() method`](https://clerk.com/docs/reference/javascript/clerk.md#redirect-to-organization-profile) instead.

The `<RedirectToOrganizationProfile />` component will navigate to the Organization profile URL which has been configured in your application instance. The behavior will be just like a server-side (3xx) redirect, and will override the current location in the history stack.

## Example

```tsx {{ filename: 'app/routes/index.tsx' }}
import { SignedIn, SignedOut, RedirectToOrganizationProfile } from '@clerk/tanstack-react-start'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <div>
      <SignedIn>
        <RedirectToOrganizationProfile />
      </SignedIn>
      <SignedOut>
        <p>You need to sign in to view your Organization profile.</p>
      </SignedOut>
    </div>
  )
}
```

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
