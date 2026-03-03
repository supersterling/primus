# Build a custom flow for displaying the last authentication method

> This guide is for users who want to build a custom flow. To use a _prebuilt_ UI, use the [Account Portal pages](https://clerk.com/docs/guides/account-portal/overview.md) or [`prebuilt components`](https://clerk.com/docs/nextjs/reference/components/overview.md).

The `Client` object includes a `lastAuthenticationStrategy` property that tracks the last authentication method used by the user. This is useful for improving the user experience by showing a "Last used" badge on OAuth buttons, helping returning users quickly identify their preferred sign-in method.

## Access the last authentication strategy

The `lastAuthenticationStrategy` property is available on the [`Client`](https://clerk.com/docs/reference/javascript/client.md) object. You can access it through the `client` property of the [`Clerk`](https://clerk.com/docs/reference/javascript/clerk.md) instance.

The following example demonstrates how to:

1. Access the `client` object using the [`useClerk()`](https://clerk.com/docs/nextjs/reference/hooks/use-clerk.md) hook.
2. Check the `lastAuthenticationStrategy` property to identify which OAuth provider was last used.
3. Display a badge next to the corresponding OAuth button.

**This example is written for Next.js App Router but it can be adapted for any React-based framework, such as React Router or Tanstack React Start.**

```tsx {{ filename: 'app/sign-in/[[...sign-in]]/page.tsx' }}
'use client'

import * as React from 'react'
import { OAuthStrategy } from '@clerk/types'
import { useSignIn, useClerk } from '@clerk/nextjs'

export default function Page() {
  const { signIn } = useSignIn()
  const { client } = useClerk()

  if (!signIn) return null

  const lastStrategy = client?.lastAuthenticationStrategy

  const signInWith = (strategy: OAuthStrategy) => {
    return signIn.authenticateWithRedirect({
      strategy,
      redirectUrl: '/sign-in/sso-callback',
      redirectUrlComplete: '/',
    })
  }

  const providers = [
    { strategy: 'oauth_google' as const, name: 'Google' },
    { strategy: 'oauth_github' as const, name: 'GitHub' },
  ]

  return (
    <div>
      <h1>Sign in</h1>
      {providers.map((provider) => (
        <button key={provider.strategy} onClick={() => signInWith(provider.strategy)}>
          Sign in with {provider.name}
          {lastStrategy === provider.strategy && <span> (Last used)</span>}
        </button>
      ))}
    </div>
  )
}
```

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
