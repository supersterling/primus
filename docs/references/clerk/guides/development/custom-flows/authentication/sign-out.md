# Build a custom sign-out flow

> This guide is for users who want to build a custom flow. To use a _prebuilt_ UI, use the [Account Portal pages](https://clerk.com/docs/guides/account-portal/overview.md) or [`prebuilt components`](https://clerk.com/docs/nextjs/reference/components/overview.md).

Clerk's [`<UserButton />`](https://clerk.com/docs/nextjs/reference/components/user/user-button.md) and [`<SignOutButton />`](https://clerk.com/docs/nextjs/reference/components/unstyled/sign-out-button.md) components provide an out-of-the-box solution for signing out users. However, if you're building a custom solution, you can use the `signOut()` function to handle the sign-out process.

The `signOut()` function signs a user out of all sessions in a [multi-session application](https://clerk.com/docs/guides/secure/session-options.md#multi-session-applications), or only the current session in a single-session context. You can also specify a specific session to sign out by passing the `sessionId` parameter.

> The sign-out flow deactivates only the current session. Other valid sessions associated with the same user (e.g., if the user is signed in on another device) will remain active.

The [`useClerk()`](https://clerk.com/docs/nextjs/reference/hooks/use-clerk.md) hook is used to access the `signOut()` function, which is called when the user clicks the "Sign out" button.

**This example is written for Next.js App Router but it can be adapted for any React-based framework, such as React Router or Tanstack React Start.**

```jsx {{ filename: 'app/components/sign-out-button.tsx' }}
'use client'

import { useClerk } from '@clerk/nextjs'

export const SignOutButton = () => {
  const { signOut } = useClerk()

  return (
    // Clicking this button signs out a user
    // and redirects them to the home page "/".
    <button onClick={() => signOut({ redirectUrl: '/' })}>Sign out</button>
  )
}
```

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
