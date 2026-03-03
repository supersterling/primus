# <RedirectToCreateOrganization /> (deprecated)

> This feature is deprecated. Please use the [`redirectToCreateOrganization() method`](https://clerk.com/docs/reference/javascript/clerk.md#redirect-to-create-organization) instead.

The `<RedirectToCreateOrganization />` component will navigate to the create Organization flow which has been configured in your application instance. The behavior will be just like a server-side (3xx) redirect, and will override the current location in the history stack.

## Example

```tsx {{ filename: 'app/routes/_index.tsx' }}
import { SignedIn, SignedOut, RedirectToCreateOrganization } from '@clerk/remix'

export default function Index() {
  return (
    <div>
      <SignedIn>
        <RedirectToCreateOrganization />
      </SignedIn>
      <SignedOut>
        <p>You need to sign in to create an Organization.</p>
      </SignedOut>
    </div>
  )
}
```

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
