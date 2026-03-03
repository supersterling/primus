# Build a custom email/password authentication flow

> This guide is for users who want to build a custom flow. To use a _prebuilt_ UI, use the [Account Portal pages](https://clerk.com/docs/guides/account-portal/overview.md) or [`prebuilt components`](https://clerk.com/docs/nextjs/reference/components/overview.md).

This guide will walk you through how to build a custom email and password sign-up and sign-in flow.

1. ## Enable email and password authentication

   To use email and password authentication, you first need to ensure they are enabled for your application.

   1. Enable **Sign-up with email**.
      - For **Verify at sign-up**, **Email verification code** is enabled by default, and is used for this guide. If you'd like to use **Email verification link** instead, see the [email links custom flow](https://clerk.com/docs/guides/development/custom-flows/authentication/email-links.md).
   2. Enable **Sign in with email**.
      - This guide supports password authentication. If you'd like to build a custom flow that allows users to sign in passwordlessly, see the [email code custom flow](https://clerk.com/docs/guides/development/custom-flows/authentication/email-sms-otp.md) or the [email links custom flow](https://clerk.com/docs/guides/development/custom-flows/authentication/email-links.md).
   3. Select the **Password** tab and enable **Sign-up with password**.
2. ## Sign-up flow

   **This example is written for Next.js App Router but it can be adapted for any React-based framework, such as React Router or Tanstack React Start.**

   1. Initiate the sign-up process by passing the user's email address and password to the [`SignUp.create()`](https://clerk.com/docs/reference/javascript/sign-up.md#create) method.
   2. To verify the user's email address, send a one-time code to the provided email address with the [`SignUp.prepareEmailAddressVerification()`](https://clerk.com/docs/reference/javascript/sign-up.md#prepare-email-address-verification) method.
   3. Collect the user's one-time code and verify it with the [`SignUp.attemptEmailAddressVerification()`](https://clerk.com/docs/reference/javascript/sign-up.md#attempt-email-address-verification) method.
   4. If the email address verification is successful, the `SignUp.status` will be `complete`, and you can finish the sign-up flow by calling the [`setActive()`](https://clerk.com/docs/reference/javascript/clerk.md#set-active) method, which will set the newly created session as the active session. You may need to check for session tasks that are required for the user to complete after signing up.

   ```tsx {{ filename: 'app/sign-up/[[...sign-up]]/page.tsx', collapsible: true }}
   'use client'

   import * as React from 'react'
   import { useSignUp } from '@clerk/nextjs'
   import { useRouter } from 'next/navigation'

   export default function Page() {
     const { isLoaded, signUp, setActive } = useSignUp()
     const [emailAddress, setEmailAddress] = React.useState('')
     const [password, setPassword] = React.useState('')
     const [verifying, setVerifying] = React.useState(false)
     const [code, setCode] = React.useState('')
     const router = useRouter()

     // Handle submission of the sign-up form
     const handleSubmit = async (e: React.FormEvent) => {
       e.preventDefault()

       if (!isLoaded) return <div>Loading...</div>

       // Start the sign-up process using the email and password provided
       try {
         await signUp.create({
           emailAddress,
           password,
         })

         // Send the user an email with the verification code
         await signUp.prepareEmailAddressVerification({
           strategy: 'email_code',
         })

         // Set 'verifying' true to display second form
         // and capture the code
         setVerifying(true)
       } catch (err: any) {
         // See https://clerk.com/docs/guides/development/custom-flows/error-handling
         // for more info on error handling
         console.error(JSON.stringify(err, null, 2))
       }
     }

     // Handle the submission of the verification form
     const handleVerify = async (e: React.FormEvent) => {
       e.preventDefault()

       if (!isLoaded) return <div>Loading...</div>

       try {
         // Use the code the user provided to attempt verification
         const signUpAttempt = await signUp.attemptEmailAddressVerification({
           code,
         })

         // If verification was completed, set the session to active
         // and redirect the user
         if (signUpAttempt.status === 'complete') {
           await setActive({
             session: signUpAttempt.createdSessionId,
             navigate: async ({ session }) => {
               if (session?.currentTask) {
                 // Handle pending session tasks
                 // See https://clerk.com/docs/guides/development/custom-flows/authentication/session-tasks
                 console.log(session?.currentTask)
                 return
               }

               router.push('/')
             },
           })
         } else {
           // If the status is not complete, check why. User may need to
           // complete further steps.
           console.error('Sign-up attempt not complete:', signUpAttempt)
           console.error('Sign-up attempt status:', signUpAttempt.status)
         }
       } catch (err: any) {
         // See https://clerk.com/docs/guides/development/custom-flows/error-handling
         // for more info on error handling
         console.error(JSON.stringify(err, null, 2))
       }
     }

     // Display the verification form to capture the code
     if (verifying) {
       return (
         <>
           <h1>Verify your email</h1>
           <form onSubmit={handleVerify}>
             <label id="code">Enter your verification code</label>
             <input value={code} id="code" name="code" onChange={(e) => setCode(e.target.value)} />
             <button type="submit">Verify</button>
           </form>
         </>
       )
     }

     // Display the initial sign-up form to capture the email and password
     return (
       <>
         <h1>Sign up</h1>
         <form onSubmit={handleSubmit}>
           <div>
             <label htmlFor="email">Enter email address</label>
             <input
               id="email"
               type="email"
               name="email"
               value={emailAddress}
               onChange={(e) => setEmailAddress(e.target.value)}
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

           {/* Required for sign-up flows
           Clerk's bot sign-up protection is enabled by default */}
           <div id="clerk-captcha" />

           <div>
             <button type="submit">Continue</button>
           </div>
         </form>
       </>
     )
   }
   ```
3. ## Sign-in flow

   **This example is written for Next.js App Router but it can be adapted for any React-based framework, such as React Router or Tanstack React Start.**

   1. Initiate the sign-in process by passing the user's email address and password to the [`SignIn.create()`](https://clerk.com/docs/reference/javascript/sign-in.md#create) method.
   2. Check if the sign-in requires a second factor. [Client Trust](https://clerk.com/docs/guides/secure/client-trust.md), which is enabled by default for new Clerk applications, may require users to verify their identity with second factor. This example handles the `email_code` second factor, so send a one-time code to the provided email address with the [`SignIn.prepareSecondFactor()`](https://clerk.com/docs/reference/javascript/sign-in.md#prepare-second-factor) method.
   3. Collect the user's one-time code and verify it with the [`SignIn.attemptSecondFactor()`](https://clerk.com/docs/reference/javascript/sign-in.md#attempt-second-factor) method.
   4. If the second factor verification is successful, the `SignIn.status` will be `complete`, and you can finish the sign-in flow by calling the [`setActive()`](https://clerk.com/docs/reference/javascript/clerk.md#set-active) method, which will set the newly created session as the active session. You may need to check for session tasks that are required for the user to complete after signing in.

   ```tsx {{ filename: 'app/sign-in/[[...sign-in]]/page.tsx', collapsible: true }}
   'use client'

   import * as React from 'react'
   import { useSignIn } from '@clerk/nextjs'
   import { useRouter } from 'next/navigation'
   import type { EmailCodeFactor } from '@clerk/types'

   export default function SignInForm() {
     const { isLoaded, signIn, setActive } = useSignIn()
     const [email, setEmail] = React.useState('')
     const [password, setPassword] = React.useState('')
     const [code, setCode] = React.useState('')
     const [showEmailCode, setShowEmailCode] = React.useState(false)
     const router = useRouter()

     // Handle the submission of the sign-in form
     const handleSubmit = async (e: React.FormEvent) => {
       e.preventDefault()

       if (!isLoaded) return

       // Start the sign-in process using the email and password provided
       try {
         const signInAttempt = await signIn.create({
           identifier: email,
           password,
         })

         // If sign-in process is complete, set the created session as active
         // and redirect the user
         if (signInAttempt.status === 'complete') {
           await setActive({
             session: signInAttempt.createdSessionId,
             navigate: async ({ session }) => {
               if (session?.currentTask) {
                 // Handle pending session tasks
                 // See https://clerk.com/docs/guides/development/custom-flows/authentication/session-tasks
                 console.log(session?.currentTask)
                 return
               }

               router.push('/')
             },
           })
         } else if (signInAttempt.status === 'needs_second_factor') {
           // Check if email_code is a valid second factor
           // This is required when Client Trust is enabled and the user
           // is signing in from a new device.
           // See https://clerk.com/docs/guides/secure/client-trust
           const emailCodeFactor = signInAttempt.supportedSecondFactors?.find(
             (factor): factor is EmailCodeFactor => factor.strategy === 'email_code',
           )

           if (emailCodeFactor) {
             await signIn.prepareSecondFactor({
               strategy: 'email_code',
               emailAddressId: emailCodeFactor.emailAddressId,
             })
             setShowEmailCode(true)
           }
         } else {
           // If the status is not complete, check why. User may need to
           // complete further steps.
           console.error(JSON.stringify(signInAttempt, null, 2))
         }
       } catch (err: any) {
         // See https://clerk.com/docs/guides/development/custom-flows/error-handling
         // for more info on error handling
         console.error(JSON.stringify(err, null, 2))
       }
     }

     // Handle the submission of the email verification code
     const handleEmailCode = async (e: React.FormEvent) => {
       e.preventDefault()

       if (!isLoaded) return

       try {
         const signInAttempt = await signIn.attemptSecondFactor({
           strategy: 'email_code',
           code,
         })

         if (signInAttempt.status === 'complete') {
           await setActive({
             session: signInAttempt.createdSessionId,
             navigate: async ({ session }) => {
               // Handle pending session tasks
               // See https://clerk.com/docs/guides/development/custom-flows/authentication/session-tasks
               if (session?.currentTask) {
                 console.log(session?.currentTask)
                 return
               }

               router.push('/')
             },
           })
         } else {
           console.error(JSON.stringify(signInAttempt, null, 2))
         }
       } catch (err: any) {
         console.error(JSON.stringify(err, null, 2))
       }
     }

     // Display email code verification form
     if (showEmailCode) {
       return (
         <>
           <h1>Verify your email</h1>
           <p>A verification code has been sent to your email.</p>
           <form onSubmit={handleEmailCode}>
             <div>
               <label htmlFor="code">Enter verification code</label>
               <input
                 onChange={(e) => setCode(e.target.value)}
                 id="code"
                 name="code"
                 type="text"
                 inputMode="numeric"
                 value={code}
               />
             </div>
             <button type="submit">Verify</button>
           </form>
         </>
       )
     }

     // Display a form to capture the user's email and password
     return (
       <>
         <h1>Sign in</h1>
         <form onSubmit={handleSubmit}>
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
             <label htmlFor="password">Enter password</label>
             <input
               onChange={(e) => setPassword(e.target.value)}
               id="password"
               name="password"
               type="password"
               value={password}
             />
           </div>
           <button type="submit">Sign in</button>
         </form>
       </>
     )
   }
   ```

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
