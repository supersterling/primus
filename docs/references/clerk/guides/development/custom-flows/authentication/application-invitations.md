# Sign-up with application invitations

> This guide is for users who want to build a custom flow. To use a _prebuilt_ UI, use the [Account Portal pages](https://clerk.com/docs/guides/account-portal/overview.md) or [`prebuilt components`](https://clerk.com/docs/nextjs/reference/components/overview.md).

When a user visits an [invitation](https://clerk.com/docs/guides/users/inviting.md) link, Clerk first checks whether a custom redirect URL was provided.

**If no redirect URL is specified**, the user will be redirected to the appropriate Account Portal page (either [sign-up](https://clerk.com/docs/guides/account-portal/overview.md#sign-up) or [sign-in](https://clerk.com/docs/guides/account-portal/overview.md#sign-in)), or to the custom sign-up/sign-in pages that you've configured for your application.

**If you specified [a redirect URL when creating the invitation](https://clerk.com/docs/guides/users/inviting.md#with-a-redirect-url)**, you must handle the authentication flows in your code for that page. You can either embed the [`<SignIn />`](https://clerk.com/docs/nextjs/reference/components/authentication/sign-in.md) component on that page, or if the prebuilt component doesn't meet your specific needs or if you require more control over the logic, you can rebuild the existing Clerk flows using the Clerk API. **This guide demonstrates how to use Clerk's API to build a custom flow for accepting application invitations.**

## Build the custom flow

Once the user visits the invitation link and is redirected to the specified URL, the query parameter `__clerk_ticket` will be appended to the URL. This query parameter contains the invitation token.

For example, if the redirect URL was `https://www.example.com/accept-invitation`, the URL that the user would be redirected to would be `https://www.example.com/accept-invitation?__clerk_ticket=.....`.

To create a sign-up flow using the invitation token, you need to extract the token from the URL and pass it to the [`signUp.create()`](https://clerk.com/docs/reference/javascript/sign-up.md#create) method, as shown in the following example.

The following example expects the user to be signing up with a password and also demonstrates how to collect additional user information for the sign-up, like a first and last name. You can keep, remove, or adjust these fields to fit your application, but either way, **you will need to have these settings [properly configured in the Clerk Dashboard](https://clerk.com/docs/guides/configure/auth-strategies/sign-up-sign-in-options.md)**.

**This example is written for Next.js App Router but it can be adapted for any React-based framework, such as React Router or Tanstack React Start.**

```tsx {{ filename: 'app/accept-invitation/page.tsx', collapsible: true }}
'use client'

import * as React from 'react'
import { useSignUp, useUser } from '@clerk/nextjs'
import { useSearchParams, useRouter } from 'next/navigation'

export default function Page() {
  const { isSignedIn, user } = useUser()
  const router = useRouter()
  const { isLoaded, signUp, setActive } = useSignUp()

  const [password, setPassword] = React.useState('')
  // Optionally, collect additional fields that your app requires
  const [firstName, setFirstName] = React.useState('')
  const [lastName, setLastName] = React.useState('')

  // Handle signed-in users visiting this page
  // This will also redirect the user once they finish the sign-up process
  React.useEffect(() => {
    if (isSignedIn) {
      router.push('/')
    }
  }, [isSignedIn])

  // Get the token from the query params
  const token = useSearchParams().get('__clerk_ticket')

  // If there is no invitation token, restrict access to this page
  if (!token) {
    return <p>No invitation token found.</p>
  }

  // Handle submission of the sign-up form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isLoaded) return

    try {
      if (!token) return null

      // Create a new sign-up with the supplied invitation token.
      // Make sure you're also passing the ticket strategy.
      // After the below call, the user's email address will be
      // automatically verified because of the invitation token.
      const signUpAttempt = await signUp.create({
        strategy: 'ticket',
        ticket: token,
        firstName,
        lastName,
        password,
      })

      // If the sign-up was completed, set the session to active
      if (signUpAttempt.status === 'complete') {
        await setActive({ session: signUpAttempt.createdSessionId })
      } else {
        // If the sign-up status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signUpAttempt, null, 2))
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2))
    }
  }

  return (
    <>
      <h1>Sign up</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">Enter first name</label>
          <input
            id="firstName"
            type="text"
            name="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="lastName">Enter last name</label>
          <input
            id="lastName"
            type="text"
            name="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Enter password</label>
          <input
            id="password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div id="clerk-captcha" />
        <div>
          <button type="submit">Next</button>
        </div>
      </form>
    </>
  )
}
```

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
