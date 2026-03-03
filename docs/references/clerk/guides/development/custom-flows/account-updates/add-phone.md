# Build a custom flow for adding a phone number to a user's account

> This guide is for users who want to build a custom flow. To use a _prebuilt_ UI, use the [Account Portal pages](https://clerk.com/docs/guides/account-portal/overview.md) or [`prebuilt components`](https://clerk.com/docs/nextjs/reference/components/overview.md).

Users are able to add multiple phone numbers to their account. Adding a phone number requires the user to verify the phone number before it can be added to the user's account.

This guide demonstrates how to build a custom user interface that allows users to add and verify a phone number for their account.

## Configure phone number verification

To use phone number verification, you first need to enable it for your application.

1. In the Clerk Dashboard, navigate to the [**User & authentication**](https://dashboard.clerk.com/~/user-authentication/user-and-authentication) page.
2. Select the **Phone** tab and enable either **Sign-up with phone** or **Sign-in with phone** or both, depending on your application's needs.

## Build the custom flow

> Phone numbers must be in [E.164 format](https://en.wikipedia.org/wiki/E.164).

**This example is written for Next.js App Router but it can be adapted for any React-based framework, such as React Router or Tanstack React Start.**

1. Every user has a [`User`](https://clerk.com/docs/reference/javascript/user.md) object that represents their account. The `User` object has a `phoneNumbers` property that contains all the phone numbers associated with the user. The [`useUser()`](https://clerk.com/docs/nextjs/reference/hooks/use-user.md) hook is used to get the `User` object.
2. The [`User.createPhoneNumber()`](https://clerk.com/docs/reference/javascript/user.md#create-phone-number) method is passed to the [`useReverification()`](https://clerk.com/docs/nextjs/reference/hooks/use-reverification.md) hook to require the user to reverify their credentials before being able to add a phone number to their account.
3. If the `createPhoneNumber()` function is successful, a new [`PhoneNumber`](https://clerk.com/docs/reference/javascript/types/phone-number.md) object is created and stored in `User.phoneNumbers`.
4. Uses the `prepareVerification()` method on the newly created `PhoneNumber` object to send a verification code to the user.
5. Uses the `attemptVerification()` method on the same `PhoneNumber` object with the verification code provided by the user to verify the phone number.

```tsx {{ filename: 'app/account/add-phone/page.tsx', collapsible: true }}
'use client'

import * as React from 'react'
import { useUser, useReverification } from '@clerk/nextjs'
import { PhoneNumberResource } from '@clerk/types'

export default function Page() {
  const { isLoaded, isSignedIn, user } = useUser()
  const [phone, setPhone] = React.useState('')
  const [code, setCode] = React.useState('')
  const [isVerifying, setIsVerifying] = React.useState(false)
  const [successful, setSuccessful] = React.useState(false)
  const [phoneObj, setPhoneObj] = React.useState<PhoneNumberResource | undefined>()
  const createPhoneNumber = useReverification((phone: string) =>
    user?.createPhoneNumber({ phoneNumber: phone }),
  )

  // Handle loading state
  if (!isLoaded) <p>Loading...</p>

  // Handle signed-out state
  if (!isSignedIn) <p>You must be signed in to access this page</p>

  // Handle addition of the phone number
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      // Add unverified phone number to user
      const res = await createPhoneNumber(phone)
      // Reload user to get updated User object
      await user.reload()

      // Create a reference to the new phone number to use related methods
      const phoneNumber = user.phoneNumbers.find((a) => a.id === res?.id)
      setPhoneObj(phoneNumber)

      // Send the user an SMS with the verification code
      phoneNumber?.prepareVerification()

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
      // Verify that the provided code matches the code sent to the user
      const phoneVerifyAttempt = await phoneObj?.attemptVerification({ code })

      if (phoneVerifyAttempt?.verification.status === 'verified') {
        setSuccessful(true)
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(phoneVerifyAttempt, null, 2))
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2))
    }
  }

  // Display a success message if the phone number was added successfully
  if (successful) {
    return <h1>Phone added</h1>
  }

  // Display the verification form to capture the code
  if (isVerifying) {
    return (
      <>
        <h1>Verify phone</h1>
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

  // Display the initial form to capture the phone number
  return (
    <>
      <h1>Add phone</h1>
      <div>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div>
            <label htmlFor="phone">Enter phone number</label>
            <input
              onChange={(e) => setPhone(e.target.value)}
              id="phone"
              name="phone"
              type="phone"
              value={phone}
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

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
