# Build a custom flow for authenticating with enterprise connections

> This guide is for users who want to build a custom flow. To use a _prebuilt_ UI, use the [Account Portal pages](https://clerk.com/docs/guides/account-portal/overview.md) or [`prebuilt components`](https://clerk.com/docs/nextjs/reference/components/overview.md).

## Before you start

You must configure your application instance through the Clerk Dashboard for the enterprise connection(s) that you want to use. Visit [the appropriate guide for your platform](https://clerk.com/docs/guides/configure/auth-strategies/enterprise-connections/overview.md) to learn how to configure your instance.

## Create the sign-up and sign-in flow

**This example is written for Next.js App Router but it can be adapted for any React-based framework, such as React Router or Tanstack React Start.**

The following example **will both sign up _and_ sign in users**, eliminating the need for a separate sign-up page. However, if you want to have separate sign-up and sign-in pages, the sign-up and sign-in flows are equivalent, meaning that all you have to do is swap out the `SignIn` object for the `SignUp` object using the [`useSignUp()`](https://clerk.com/docs/nextjs/reference/hooks/use-sign-up.md) hook.

The following example:

1. Accesses the [`SignIn`](https://clerk.com/docs/reference/javascript/sign-in.md) object using the [`useSignIn()`](https://clerk.com/docs/nextjs/reference/hooks/use-sign-in.md) hook.
2. Starts the authentication process by calling [`SignIn.authenticateWithRedirect(params)`](https://clerk.com/docs/reference/javascript/sign-in.md#authenticate-with-redirect). This method requires a `redirectUrl` param, which is the URL that the browser will be redirected to once the user authenticates with the identity provider.
3. Creates a route at the URL that the `redirectUrl` param points to. The following example names this route `/sso-callback`. This route should either render the prebuilt [`<AuthenticateWithRedirectCallback/>`](https://clerk.com/docs/nextjs/reference/components/control/authenticate-with-redirect-callback.md) component or call the [`Clerk.handleRedirectCallback()`](https://clerk.com/docs/reference/javascript/clerk.md#handle-redirect-callback) method if you're not using the prebuilt component.

The following example shows two files:

1. The sign-in page where the user can start the authentication flow.
2. The SSO callback page where the flow is completed.

**Sign in page**

```tsx {{ filename: 'app/sign-in/[[...sign-in]]/page.tsx' }}
'use client'

import * as React from 'react'
import { useSignIn } from '@clerk/nextjs'

export default function Page() {
  const { signIn, isLoaded } = useSignIn()

  const signInWithEnterpriseSSO = (e: React.FormEvent) => {
    e.preventDefault()

    if (!isLoaded) return null

    const email = (e.target as HTMLFormElement).email.value

    signIn
      .authenticateWithRedirect({
        identifier: email,
        strategy: 'enterprise_sso',
        redirectUrl: '/sign-in/sso-callback',
        redirectUrlComplete: '/',
      })
      .then((res) => {
        console.log(res)
      })
      .catch((err: any) => {
        // See https://clerk.com/docs/guides/development/custom-flows/error-handling
        // for more info on error handling
        console.log(err.errors)
        console.error(err, null, 2)
      })
  }

  return (
    <form onSubmit={(e) => signInWithEnterpriseSSO(e)}>
      <input id="email" type="email" name="email" placeholder="Enter email address" />
      <button>Sign in with Enterprise SSO</button>
    </form>
  )
}
```

**SSO callback page**

```jsx {{ filename: 'app/sign-in/sso-callback/page.tsx' }}
import { AuthenticateWithRedirectCallback } from '@clerk/nextjs'

export default function Page() {
  // Handle the redirect flow by calling the Clerk.handleRedirectCallback() method
  // or rendering the prebuilt <AuthenticateWithRedirectCallback/> component.
  // This is the final step in the custom Enterprise SSO flow.
  return <AuthenticateWithRedirectCallback />
}
```

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
