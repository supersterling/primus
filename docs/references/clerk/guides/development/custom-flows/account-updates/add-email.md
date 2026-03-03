# Build a custom flow for adding an email to a user's account

> This guide is for users who want to build a custom flow. To use a _prebuilt_ UI, use the [Account Portal pages](https://clerk.com/docs/guides/account-portal/overview.md) or [`prebuilt components`](https://clerk.com/docs/nextjs/reference/components/overview.md).

Users are able to add multiple email addresses to their account. Adding an email address requires the user to verify the email address before it can be added to the user's account.

This guide demonstrates how to build a custom user interface that allows users to add and verify an email address for their account.

## Configure email verification

There are two verification methods available for email addresses:

- **Email verification code**: Users receive an email with an OTP to verify their email address.
- **Email verification link**: Users receive an email with a **link** to verify their email address.

By default, the verification method that is enabled is **email verification code**. To use email code verification, skip to the [Email code verification](#email-code-verification) section.

To use email links, you must configure the following settings in the Clerk Dashboard:

1. On the [**User & authentication**](https://dashboard.clerk.com/~/user-authentication/user-and-authentication) page of the Clerk Dashboard, in the **Email** tab, under the **Sign-in with email** section, enable the **Email verification link** option. By default, **Require the same device and browser** is enabled, which means that email links are required to be verified from the same device and browser on which the sign-up or sign-in was initiated. For this guide, leave this setting enabled.
2. Disable **Email verification code**.
3. Save your changes.

Then skip to the [Email link verification](#email-link-verification) section.

## Email code verification

**This example is written for Next.js App Router but it can be adapted for any React-based framework, such as React Router or Tanstack React Start.**

1. Every user has a [`User`](https://clerk.com/docs/reference/javascript/user.md) object that represents their account. The `User` object has a `emailAddresses` property that contains all the email addresses associated with the user. The [`useUser()`](https://clerk.com/docs/nextjs/reference/hooks/use-user.md) hook is used to get the `User` object.
2. The [`User.createEmailAddress()`](https://clerk.com/docs/reference/javascript/user.md#create-email-address) method is passed to the [`useReverification()`](https://clerk.com/docs/nextjs/reference/hooks/use-reverification.md) hook to require the user to reverify their credentials before being able to add an email address to their account.
3. If the `createEmailAddress()` function is successful, a new [`EmailAddress`](https://clerk.com/docs/reference/javascript/types/email-address.md) object is created and stored in `User.emailAddresses`.
4. The `prepareVerification()` method is used on the newly created `EmailAddress` object to send a verification code to the user.
5. The `attemptVerification()` method is used on the same `EmailAddress` object with the verification code provided by the user to verify the email address.

```tsx {{ filename: 'app/account/add-email/page.tsx', collapsible: true }}
'use client'

import { useReverification, useUser } from '@clerk/nextjs'
import { EmailAddressResource } from '@clerk/types'
import * as React from 'react'

export default function Page() {
  const { isLoaded, isSignedIn, user } = useUser()

  const [email, setEmail] = React.useState('')
  const [code, setCode] = React.useState('')
  const [isVerifying, setIsVerifying] = React.useState(false)
  const [successful, setSuccessful] = React.useState(false)
  const [emailObj, setEmailObj] = React.useState<EmailAddressResource | undefined>()
  const createEmailAddress = useReverification((email: string) =>
    user?.createEmailAddress({ email }),
  )

  // Handle loading state
  if (!isLoaded) return <p>Loading...</p>

  // Handle signed-out state
  if (!isSignedIn) return <p>You must be signed in to access this page</p>

  // Handle addition of the email address
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      // Add an unverified email address to user
      const res = await createEmailAddress(email)
      // Reload user to get updated User object
      await user.reload()

      // Find the email address that was just added
      const emailAddress = user.emailAddresses.find((a) => a.id === res?.id)
      // Create a reference to the email address that was just added
      setEmailObj(emailAddress)

      // Send the user an email with the verification code
      emailAddress?.prepareVerification({ strategy: 'email_code' })

      // Set to true to display second form
      // and capture the code
      setIsVerifying(true)
    } catch (err) {
      // See https://clerk.com/docs/guides/development/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }
  }

  // Handle the submission of the verification form
  const verifyCode = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      // Verify that the code entered matches the code sent to the user
      const emailVerifyAttempt = await emailObj?.attemptVerification({ code })

      if (emailVerifyAttempt?.verification.status === 'verified') {
        setSuccessful(true)
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(emailVerifyAttempt, null, 2))
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2))
    }
  }

  // Display a success message if the email was added successfully
  if (successful) {
    return <h1>Email added!</h1>
  }

  // Display the verification form to capture the code
  if (isVerifying) {
    return (
      <>
        <h1>Verify email</h1>
        <div>
          <form onSubmit={(e) => verifyCode(e)}>
            <div>
              <label htmlFor="code">Enter code</label>
              <input
                onChange={(e) => setCode(e.target.value)}
                id="code"
                name="code"
                type="text"
                value={code}
              />
            </div>
            <div>
              <button type="submit">Verify</button>
            </div>
          </form>
        </div>
      </>
    )
  }

  // Display the initial form to capture the email address
  return (
    <>
      <h1>Add Email</h1>
      <div>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div>
            <label htmlFor="email">Enter email address</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              name="email"
              type="email"
              value={email}
            />
          </div>
          <div>
            <button type="submit">Continue</button>
          </div>
        </form>
      </div>
    </>
  )
}
```

## Email link verification

**This example is written for Next.js App Router but it can be adapted for any React-based framework, such as React Router or Tanstack React Start.**

1. Every user has a [`User`](https://clerk.com/docs/reference/javascript/user.md) object that represents their account. The `User` object has a `emailAddresses` property that contains all the email addresses associated with the user. The [`useUser()`](https://clerk.com/docs/nextjs/reference/hooks/use-user.md) hook is used to get the `User` object.
2. The [`User.createEmailAddress()`](https://clerk.com/docs/reference/javascript/user.md#create-email-address) method is passed to the [`useReverification()`](https://clerk.com/docs/nextjs/reference/hooks/use-reverification.md) hook to require the user to reverify their credentials before being able to add an email address to their account.
3. If the `createEmailAddress()` function is successful, a new [`EmailAddress`](https://clerk.com/docs/reference/javascript/types/email-address.md) object is created and stored in `User.emailAddresses`.
4. The newly created `EmailAddress` object is used to access the [`createEmailLinkFlow()`](https://clerk.com/docs/reference/javascript/types/email-address.md#create-email-link-flow) method.
5. The `createEmailLinkFlow()` method is used to access the `startEmailLinkFlow()` method.
6. The `startEmailLinkFlow()` method is called with the `redirectUrl` parameter set to `/account/add-email/verify`. It sends an email with a verification link to the user. When the user visits the link, they are redirected to the URL that was provided.
7. On the `/account/add-email/verify` page, the [`useClerk()`](https://clerk.com/docs/nextjs/reference/hooks/use-clerk.md) hook is used to get the `handleEmailLinkVerification()` method.
8. The [`handleEmailLinkVerification()`](https://clerk.com/docs/reference/javascript/clerk.md#handle-email-link-verification) method is called to verify the email address. Error handling is included to handle any errors that occur during the verification process.

**Add email page**

```tsx {{ filename: 'app/account/add-email/page.tsx', collapsible: true }}
'use client'

import * as React from 'react'
import { useUser, useReverification } from '@clerk/nextjs'

export default function Page() {
  const { isLoaded, isSignedIn, user } = useUser()
  const [email, setEmail] = React.useState('')
  const [verifying, setVerifying] = React.useState(false)
  const [error, setError] = React.useState('')
  const createEmailAddress = useReverification((email: string) =>
    user?.createEmailAddress({ email }),
  )

  if (!isLoaded) {
    // Handle loading state
    return null
  }

  if (!isSignedIn) {
    // Handle signed out state
    return <p>You must be signed in to access this page</p>
  }

  // Handle addition of the email address
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      setVerifying(true)

      // Add an unverified email address to user
      const res = await createEmailAddress(email)
      // Reload user to get updated User object
      await user.reload()

      // Find the email address that was just added
      const emailAddress = user.emailAddresses.find((a) => a.id === res.id)

      if (!emailAddress) {
        setError('Email address not found')
        return
      }

      const { startEmailLinkFlow } = emailAddress.createEmailLinkFlow()

      // Dynamically set the host domain for dev and prod
      // You could instead use an environment variable or other source for the host domain
      const protocol = window.location.protocol
      const host = window.location.host

      // Send the user an email with the verification link
      startEmailLinkFlow({ redirectUrl: `${protocol}//${host}/account/add-email/verify` })
    } catch (err) {
      // See https://clerk.com/docs/guides/development/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
      setError('An error occurred.')
    }
  }

  async function reset(e: React.FormEvent) {
    e.preventDefault()
    setVerifying(false)
  }

  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
        <button onClick={() => setError('')}>Try again</button>
      </div>
    )
  }

  if (verifying) {
    return (
      <div>
        <p>Check your email and visit the link that was sent to you.</p>
        <form onSubmit={reset}>
          <button type="submit">Restart</button>
        </form>
      </div>
    )
  }

  // Display the initial form to capture the email address
  return (
    <>
      <h1>Add email</h1>
      <div>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            placeholder="Enter email address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit">Continue</button>
        </form>
      </div>
    </>
  )
}
```

**Verify page**

```tsx {{ filename: 'app/account/add-email/verify/page.tsx', collapsible: true }}
'use client'

import * as React from 'react'
import { useClerk } from '@clerk/nextjs'
import { EmailLinkErrorCodeStatus, isEmailLinkError } from '@clerk/nextjs/errors'
import Link from 'next/link'

export type VerificationStatus =
  | 'expired'
  | 'failed'
  | 'loading'
  | 'verified'
  | 'verified_switch_tab'
  | 'client_mismatch'

export default function VerifyEmailLink() {
  const [verificationStatus, setVerificationStatus] = React.useState('loading')

  const { handleEmailLinkVerification, loaded } = useClerk()

  async function verify() {
    try {
      await handleEmailLinkVerification({})
      setVerificationStatus('verified')
    } catch (err: any) {
      let status: VerificationStatus = 'failed'

      if (isEmailLinkError(err)) {
        // If link expired, set status to expired
        if (err.code === EmailLinkErrorCodeStatus.Expired) {
          status = 'expired'
        } else if (err.code === EmailLinkErrorCodeStatus.ClientMismatch) {
          // OPTIONAL: This check is only required if you have
          // the 'Require the same device and browser' setting
          // enabled in the Clerk Dashboard
          status = 'client_mismatch'
        }
      }

      setVerificationStatus(status)
      return
    }
  }

  React.useEffect(() => {
    if (!loaded) return

    verify()
  }, [handleEmailLinkVerification, loaded])

  if (verificationStatus === 'loading') {
    return <div>Loading...</div>
  }

  if (verificationStatus === 'failed') {
    return (
      <div>
        <h1>Verify your email</h1>
        <p>The email link verification failed.</p>
        <Link href="/account/add-email">Return to add email</Link>
      </div>
    )
  }

  if (verificationStatus === 'expired') {
    return (
      <div>
        <h1>Verify your email</h1>
        <p>The email link has expired.</p>
        <Link href="/account/add-email">Return to add email</Link>
      </div>
    )
  }

  // OPTIONAL: This check is only required if you have
  // the 'Require the same device and browser' setting
  // enabled in the Clerk Dashboard
  if (verificationStatus === 'client_mismatch') {
    return (
      <div>
        <h1>Verify your email</h1>
        <p>
          You must complete the email link verification on the same device and browser as you
          started it on.
        </p>
        <Link href="/account/add-email">Return to add email</Link>
      </div>
    )
  }

  return (
    <div>
      <h1>Verify your email</h1>
      <p>Successfully added email!</p>
    </div>
  )
}
```

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
