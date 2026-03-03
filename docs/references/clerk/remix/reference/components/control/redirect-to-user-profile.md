# <RedirectToUserProfile /> (deprecated)

> This feature is deprecated. Please use the [`redirectToUserProfile() method`](https://clerk.com/docs/reference/javascript/clerk.md#redirect-to-user-profile) instead.

The `<RedirectToUserProfile />` component will navigate to the Account Portal User Profile URL which has been configured in your application instance. The behavior will be just like a server-side (3xx) redirect, and will override the current location in the history stack.

To find your User Profile URL:

1. In the Clerk Dashboard, navigate to the [**Account Portal**](https://dashboard.clerk.com/~/account-portal) page.
2. Under **User profile**, select the **Visit** icon.

## Example

```tsx {{ filename: 'app/routes/_index.tsx' }}
import { SignedIn, SignedOut, RedirectToUserProfile } from '@clerk/remix'

export default function Index() {
  return (
    <div>
      <SignedIn>
        <RedirectToUserProfile />
      </SignedIn>
      <SignedOut>
        <p>You need to sign in to view your user profile.</p>
      </SignedOut>
    </div>
  )
}
```

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
