# Build a custom flow for handling email links

> This guide is for users who want to build a custom flow. To use a _prebuilt_ UI, use the [Account Portal pages](https://clerk.com/docs/guides/account-portal/overview.md) or [`prebuilt components`](https://clerk.com/docs/nextjs/reference/components/overview.md).

[Email links](https://clerk.com/docs/guides/configure/auth-strategies/sign-up-sign-in-options.md) can be used to sign up new users, sign in existing users, or allow existing users to verify newly added email addresses to their user profiles.

The email link flow works as follows:

1. The user enters their email address and asks for an email link.
2. Clerk sends an email to the user, containing a link to the verification URL.
3. The user visits the email link, either on the same device where they entered their email address or on a different device, depending on the settings in the Clerk Dashboard.
4. Clerk verifies the user's identity and advances any sign-up or sign-in attempt that might be in progress.
5. If the verification is successful, the user is authenticated or their email address is verified, depending on the reason for the email link.

This guide demonstrates how to use Clerk's API to build a custom flow for handling email links. It covers the following scenarios:

- [Sign up](#sign-up-flow)
- [Sign in](#sign-in-flow)
- [Verify a new email address](#add-new-email-flow)

1. ## Enable email link authentication

   To allow your users to sign up or sign in using email links, you must first configure the appropriate settings in the Clerk Dashboard.

   1. In the Clerk Dashboard, navigate to the [**User & authentication**](https://dashboard.clerk.com/~/user-authentication/user-and-authentication) page.
   2. Enable **Verify at sign-up**, and under **Verification methods**, enable **Email verification link**.
   3. Enable **Sign-in with email**. Because this guide focuses on email links, disable **Email verification code** and enable **Email verification link**. By default, **Require the same device and browser** is enabled, which means that email links are required to be verified from the same device and browser on which the sign-up or sign-in was initiated. For this guide, leave this setting enabled.
2. ## Sign-up flow

   1. The [`useSignUp()`](https://clerk.com/docs/nextjs/reference/hooks/use-sign-up.md) hook is used to get the [`SignUp`](https://clerk.com/docs/reference/javascript/sign-up.md) object.
   2. The `SignUp` object is used to access the [`createEmailLinkFlow()`](https://clerk.com/docs/reference/javascript/types/email-address.md#create-email-link-flow) method.
   3. The `createEmailLinkFlow()` method is used to access the `startEmailLinkFlow()` method.
   4. The `startEmailLinkFlow()` method is called with the `redirectUrl` parameter set to `/sign-up/verify`. It sends an email with a verification link to the user. When the user visits the link, they are redirected to the URL that was provided.
   5. On the `/sign-up/verify` page, the [`useClerk()`](https://clerk.com/docs/nextjs/reference/hooks/use-clerk.md) hook is used to get the [`handleEmailLinkVerification()`](https://clerk.com/docs/reference/javascript/clerk.md#handle-email-link-verification) method.
   6. The `handleEmailLinkVerification()` method is called to verify the email address. Error handling is included to handle any errors that occur during the verification process.

   **This example is written for Next.js App Router but it can be adapted for any React-based framework, such as React Router or Tanstack React Start.**

   **Sign up page**

   ```tsx {{ filename: 'app/sign-up/[[...sign-up]]/page.tsx', collapsible: true }}
   'use client'

   import * as React from 'react'
   import { useSignUp } from '@clerk/nextjs'

   export default function SignInPage() {
     const [emailAddress, setEmailAddress] = React.useState('')
     const [verified, setVerified] = React.useState(false)
     const [verifying, setVerifying] = React.useState(false)
     const [error, setError] = React.useState('')
     const { signUp, isLoaded } = useSignUp()

     if (!isLoaded) return null

     const { startEmailLinkFlow } = signUp.createEmailLinkFlow()

     async function submit(e: React.FormEvent) {
       e.preventDefault()
       // Reset states in case user resubmits form mid sign-up
       setVerified(false)
       setError('')

       setVerifying(true)

       if (!isLoaded && !signUp) return null

       // Start the sign-up process using the email provided
       try {
         await signUp.create({
           emailAddress,
         })

         // Dynamically set the host domain for dev and prod
         // You could instead use an environment variable or other source for the host domain
         const protocol = window.location.protocol
         const host = window.location.host

         // Send the user an email with the email link
         const signUpAttempt = await startEmailLinkFlow({
           // URL to navigate to after the user visits the link in their email
           redirectUrl: `${protocol}//${host}/sign-up/verify`,
         })

         // Check the verification result
         const verification = signUpAttempt.verifications.emailAddress

         // Handle if user visited the link and completed sign-up from /sign-up/verify
         if (verification.verifiedFromTheSameClient()) {
           setVerifying(false)
           setVerified(true)
         }
       } catch (err: any) {
         // See https://clerk.com/docs/guides/development/custom-flows/error-handling
         // for more info on error handling
         console.error(JSON.stringify(err, null, 2))

         if (err.errors?.[0]?.longMessage) {
           console.log('Clerk error:', err.errors[0].longMessage)
           setError(err.errors[0].longMessage)
         } else {
           setError('An error occurred.')
         }
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

     if (verified) {
       return <div>Signed up successfully!</div>
     }

     return (
       <div>
         <h1>Sign up</h1>
         <form onSubmit={submit}>
           <input
             type="email"
             placeholder="Enter email address"
             value={emailAddress}
             onChange={(e) => setEmailAddress(e.target.value)}
           />
           <button type="submit">Continue</button>
         </form>
       </div>
     )
   }
   ```

   **Verify page**

   ```tsx {{ filename: 'app/sign-up/verify/page.tsx', collapsible: true }}
   'use client'

   import * as React from 'react'
   import { useClerk } from '@clerk/nextjs'
   import { EmailLinkErrorCodeStatus, isEmailLinkError } from '@clerk/nextjs/errors'
   import Link from 'next/link'

   export default function VerifyEmailLink() {
     const [verificationStatus, setVerificationStatus] = React.useState('loading')

     const { handleEmailLinkVerification, loaded } = useClerk()

     async function verify() {
       try {
         // Dynamically set the host domain for dev and prod
         // You could instead use an environment variable or other source for the host domain
         const protocol = window.location.protocol
         const host = window.location.host

         await handleEmailLinkVerification({
           // URL to navigate to if sign-up flow needs more requirements, such as MFA
           redirectUrl: `${protocol}//${host}/sign-up`,
         })

         // If not redirected at this point,
         // the flow has completed
         setVerificationStatus('verified')
       } catch (err: any) {
         let status = 'failed'

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
           <Link href="/sign-up">Sign up</Link>
         </div>
       )
     }

     if (verificationStatus === 'expired') {
       return (
         <div>
           <h1>Verify your email</h1>
           <p>The email link has expired.</p>
           <Link href="/sign-up">Sign up</Link>
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
             You must complete the email link sign-up on the same device and browser that you started
             it on.
           </p>
           <Link href="/sign-up">Sign up</Link>
         </div>
       )
     }

     return (
       <div>
         <h1>Verify your email</h1>
         <p>Successfully signed up. Return to the original tab to continue.</p>
       </div>
     )
   }
   ```
3. ## Sign-in flow

   1. The [`useSignIn()`](https://clerk.com/docs/nextjs/reference/hooks/use-sign-in.md) hook is used to get the [`SignIn`](https://clerk.com/docs/reference/javascript/sign-in.md) object.
   2. The `SignIn` object is used to access the [`createEmailLinkFlow()`](https://clerk.com/docs/reference/javascript/types/email-address.md#create-email-link-flow) method.
   3. The `createEmailLinkFlow()` method is used to access the `startEmailLinkFlow()` method.
   4. The `startEmailLinkFlow()` method is called with the `redirectUrl` parameter set to `/sign-in/verify`. It sends an email with a verification link to the user. When the user visits the link, they are redirected to the URL that was provided.
   5. On the `/sign-in/verify` page, the [`useClerk()`](https://clerk.com/docs/nextjs/reference/hooks/use-clerk.md) hook is used to get the [`handleEmailLinkVerification()`](https://clerk.com/docs/reference/javascript/clerk.md#handle-email-link-verification) method.
   6. The `handleEmailLinkVerification()` method is called to verify the email address. Error handling is included to handle any errors that occur during the verification process.

   **This example is written for Next.js App Router but it can be adapted for any React-based framework, such as React Router or Tanstack React Start.**

   **Sign in page**

   ```tsx {{ filename: 'app/sign-in/[[...sign-in]]/page.tsx', collapsible: true }}
   'use client'

   import * as React from 'react'
   import { useSignIn } from '@clerk/nextjs'
   import { EmailLinkFactor, SignInFirstFactor } from '@clerk/types'

   export default function SignInPage() {
     const [emailAddress, setEmailAddress] = React.useState('')
     const [verified, setVerified] = React.useState(false)
     const [verifying, setVerifying] = React.useState(false)
     const [error, setError] = React.useState('')
     const { signIn, isLoaded } = useSignIn()

     if (!isLoaded) return null

     const { startEmailLinkFlow } = signIn.createEmailLinkFlow()

     async function submit(e: React.FormEvent) {
       e.preventDefault()
       // Reset states in case user resubmits form mid sign-in
       setVerified(false)
       setError('')

       if (!isLoaded && !signIn) return null

       // Start the sign-in process using the email provided
       try {
         const { supportedFirstFactors } = await signIn.create({
           identifier: emailAddress,
         })

         setVerifying(true)

         // Filter the returned array to find the 'email_link' entry
         const isEmailLinkFactor = (factor: SignInFirstFactor): factor is EmailLinkFactor => {
           return factor.strategy === 'email_link'
         }
         const emailLinkFactor = supportedFirstFactors?.find(isEmailLinkFactor)

         if (!emailLinkFactor) {
           setError('Email link factor not found')
           return
         }

         const { emailAddressId } = emailLinkFactor

         // Dynamically set the host domain for dev and prod
         // You could instead use an environment variable or other source for the host domain
         const protocol = window.location.protocol
         const host = window.location.host

         // Send the user an email with the email link
         const signInAttempt = await startEmailLinkFlow({
           emailAddressId,
           redirectUrl: `${protocol}//${host}/sign-in/verify`,
         })

         // Check the verification result
         const verification = signInAttempt.firstFactorVerification

         // Handle if verification expired
         if (verification.status === 'expired') {
           setError('The email link has expired.')
         }

         // Handle if user visited the link and completed sign-in from /sign-in/verify
         if (verification.verifiedFromTheSameClient()) {
           setVerifying(false)
           setVerified(true)
         }
       } catch (err: any) {
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

     if (verified) {
       return <div>Signed in successfully!</div>
     }

     return (
       <div>
         <h1>Sign in</h1>
         <form onSubmit={submit}>
           <input
             type="email"
             placeholder="Enter email address"
             value={emailAddress}
             onChange={(e) => setEmailAddress(e.target.value)}
           />
           <button type="submit">Continue</button>
         </form>
       </div>
     )
   }
   ```

   **Verify page**

   ```tsx {{ filename: 'app/sign-in/verify/page.tsx', collapsible: true }}
   'use client'

   import * as React from 'react'
   import { useClerk } from '@clerk/nextjs'
   import { EmailLinkErrorCodeStatus, isEmailLinkError } from '@clerk/nextjs/errors'
   import Link from 'next/link'

   export default function VerifyEmailLink() {
     const [verificationStatus, setVerificationStatus] = React.useState('loading')

     const { handleEmailLinkVerification, loaded } = useClerk()

     async function verify() {
       try {
         // Dynamically set the host domain for dev and prod
         // You could instead use an environment variable or other source for the host domain
         const protocol = window.location.protocol
         const host = window.location.host

         await handleEmailLinkVerification({
           // URL to navigate to if sign-in flow needs more requirements, such as MFA
           redirectUrl: `${protocol}//${host}/sign-in`,
         })

         // If not redirected at this point,
         // the flow has completed
         setVerificationStatus('verified')
       } catch (err: any) {
         let status = 'failed'

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
           <Link href="/sign-in">Sign in</Link>
         </div>
       )
     }

     if (verificationStatus === 'expired') {
       return (
         <div>
           <h1>Verify your email</h1>
           <p>The email link has expired.</p>
           <Link href="/sign-in">Sign in</Link>
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
             You must complete the email link sign-in on the same device and browser as you started it
             on.
           </p>
           <Link href="/sign-in">Sign in</Link>
         </div>
       )
     }

     return (
       <div>
         <h1>Verify your email</h1>
         <p>Successfully signed in. Return to the original tab to continue.</p>
       </div>
     )
   }
   ```
4. ## Add new email flow

   When a user adds an email address to their account, you can use email links to verify the email address.

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
