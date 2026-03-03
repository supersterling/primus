# Build a custom sign-in flow with multi-factor authentication

> This guide is for users who want to build a custom flow. To use a _prebuilt_ UI, use the [Account Portal pages](https://clerk.com/docs/guides/account-portal/overview.md) or [`prebuilt components`](https://clerk.com/docs/nextjs/reference/components/overview.md).

[Multi-factor verification (MFA)](https://clerk.com/docs/guides/configure/auth-strategies/sign-up-sign-in-options.md#multi-factor-authentication) is an added layer of security that requires users to provide a second verification factor to access an account.

Clerk supports second factor verification through **SMS verification code**, **Authenticator application**, and **Backup codes**.

This guide will walk you through how to build a custom email/password sign-in flow that supports **Authenticator application** and **Backup codes** as the second factor.

1. ## Enable email and password

   This guide uses email and password to sign in, however, you can modify this approach according to the needs of your application.

   To follow this guide, you first need to ensure email and password are enabled for your application.

   1. In the Clerk Dashboard, navigate to the [**User & authentication**](https://dashboard.clerk.com/~/user-authentication/user-and-authentication) page.
   2. Enable **Sign-in with email**.
   3. Select the **Password** tab and enable **Sign-up with password**. Leave **Require a password at sign-up** enabled.
2. ## Enable multi-factor authentication

   For your users to be able to enable MFA for their account, you need to enable MFA for your application.

   1. In the Clerk Dashboard, navigate to the [**Multi-factor**](https://dashboard.clerk.com/~/user-authentication/multi-factor) page.
   2. For the purpose of this guide, toggle on both the **Authenticator application** and **Backup codes** strategies.
   3. Select **Save**.

   > If you're using Duo as an authenticator app, please note that Duo generates TOTP codes differently than other authenticator apps. Duo allows a code to be valid for 30 seconds from _the moment it is first displayed_, which may cause frequent `invalid_code` errors if the code is not entered promptly. More information can be found in [Duo's Help Center](https://help.duo.com/s/article/2107).
3. ## Sign-in flow

   Signing in to an MFA-enabled account is identical to the regular sign-in process. However, in the case of an MFA-enabled account, a sign-in won't convert until both first factors and second factors verifications are completed.

   > For this example to work, the user must have MFA enabled on their account. You need to add the ability for your users to manage their MFA settings. See the [manage MFA](https://clerk.com/docs/guides/development/custom-flows/account-updates/manage-mfa.md) guide.

   **This example is written for Next.js App Router but it can be adapted for any React-based framework, such as React Router or Tanstack React Start.**

   ```tsx {{ filename: 'app/sign-in/[[...sign-in]]/page.tsx', collapsible: true }}
   'use client'

   import * as React from 'react'
   import { useSignIn } from '@clerk/nextjs'
   import { useRouter } from 'next/navigation'

   export default function SignInForm() {
     const { isLoaded, signIn, setActive } = useSignIn()
     const [email, setEmail] = React.useState('')
     const [password, setPassword] = React.useState('')
     const [code, setCode] = React.useState('')
     const [useBackupCode, setUseBackupCode] = React.useState(false)
     const [displayTOTP, setDisplayTOTP] = React.useState(false)
     const router = useRouter()

     // Handle user submitting email and pass and swapping to TOTP form
     const handleFirstStage = (e: React.FormEvent) => {
       e.preventDefault()
       setDisplayTOTP(true)
     }

     // Handle the submission of the TOTP of Backup Code submission
     const handleSubmit = async (e: React.FormEvent) => {
       e.preventDefault()

       if (!isLoaded) return

       // Start the sign-in process using the email and password provided
       try {
         await signIn.create({
           identifier: email,
           password,
         })

         // Attempt the TOTP or backup code verification
         const signInAttempt = await signIn.attemptSecondFactor({
           strategy: useBackupCode ? 'backup_code' : 'totp',
           code: code,
         })

         // If verification was completed, set the session to active
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

               await router.push('/')
             },
           })
         } else {
           // If the status is not complete, check why. User may need to
           // complete further steps.
           console.log(signInAttempt)
         }
       } catch (err) {
         // See https://clerk.com/docs/guides/development/custom-flows/error-handling
         // for more info on error handling
         console.error('Error:', JSON.stringify(err, null, 2))
       }
     }

     if (displayTOTP) {
       return (
         <div>
           <h1>Verify your account</h1>
           <form onSubmit={(e) => handleSubmit(e)}>
             <div>
               <label htmlFor="code">Code</label>
               <input
                 onChange={(e) => setCode(e.target.value)}
                 id="code"
                 name="code"
                 type="text"
                 value={code}
               />
             </div>
             <div>
               <label htmlFor="backupcode">This code is a backup code</label>
               <input
                 onChange={() => setUseBackupCode((prev) => !prev)}
                 id="backupcode"
                 name="backupcode"
                 type="checkbox"
                 checked={useBackupCode}
               />
             </div>
             <button type="submit">Verify</button>
           </form>
         </div>
       )
     }

     return (
       <>
         <h1>Sign in</h1>
         <form onSubmit={(e) => handleFirstStage(e)}>
           <div>
             <label htmlFor="email">Email</label>
             <input
               onChange={(e) => setEmail(e.target.value)}
               id="email"
               name="email"
               type="email"
               value={email}
             />
           </div>
           <div>
             <label htmlFor="password">Password</label>
             <input
               onChange={(e) => setPassword(e.target.value)}
               id="password"
               name="password"
               type="password"
               value={password}
             />
           </div>
           <button type="submit" disabled={!email.trim() || !password.trim()}>
             Continue
           </button>
         </form>
       </>
     )
   }
   ```

## Next steps

Now that users can sign in with MFA, you need to add the ability for your users to manage their MFA settings. Learn how to build a custom flow for [managing MFA](https://clerk.com/docs/guides/development/custom-flows/account-updates/manage-mfa.md).

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
