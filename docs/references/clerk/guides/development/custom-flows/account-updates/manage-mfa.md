# Build a custom flow for managing multi-factor authentication

> This guide is for users who want to build a custom flow. To use a _prebuilt_ UI, use the [Account Portal pages](https://clerk.com/docs/guides/account-portal/overview.md) or [`prebuilt components`](https://clerk.com/docs/nextjs/reference/components/overview.md).

[Multi-factor verification (MFA)](https://clerk.com/docs/guides/configure/auth-strategies/sign-up-sign-in-options.md#multi-factor-authentication) is an added layer of security that requires users to provide a second verification factor to access an account.

Clerk supports MFA through **SMS verification code**, **Authenticator application**, and **Backup codes**.

This guide will walk you through how to build a custom flow that allows users to manage their MFA settings:

- [SMS verification code & backup codes](#sms-verification-code)
- [Authenticator application (TOTP) & backup codes](#authenticator-application-totp)

## SMS verification code

1. ### Enable multi-factor authentication

   For your users to be able to enable MFA for their account, you need to enable MFA for your application.

   1. In the Clerk Dashboard, navigate to the [**Multi-factor**](https://dashboard.clerk.com/~/user-authentication/multi-factor) page.
   2. For the purpose of this guide, toggle on both the **SMS verification code** and **Backup codes** strategies.
   3. Select **Save**.
2. ### Build the custom flow

   This example consists of two pages:

   - The main page where users can manage their SMS MFA settings
   - The page where users can add a phone number to their account

   Use the following tabs to view the code necessary for each page.

   **Manage MFA page**

   **This example is written for Next.js App Router but it can be adapted for any React-based framework, such as React Router or Tanstack React Start.**

   ```tsx {{ filename: 'app/account/manage-mfa/page.tsx', collapsible: true }}
   'use client'

   import * as React from 'react'
   import { useUser, useReverification } from '@clerk/nextjs'
   import { BackupCodeResource, PhoneNumberResource } from '@clerk/types'
   import Link from 'next/link'

   // Display phone numbers reserved for MFA
   const ManageMfaPhoneNumbers = () => {
     const { isSignedIn, user } = useUser()

     if (!isSignedIn) {
       // Handle signed out state
       return null
     }

     // Check if any phone numbers are reserved for MFA
     const mfaPhones = user.phoneNumbers
       .filter((ph) => ph.verification.status === 'verified')
       .filter((ph) => ph.reservedForSecondFactor)
       .sort((ph: PhoneNumberResource) => (ph.defaultSecondFactor ? -1 : 1))

     if (mfaPhones.length === 0) {
       return <p>There are currently no phone numbers reserved for MFA.</p>
     }

     return (
       <>
         <h2>Phone numbers reserved for MFA</h2>
         <ul>
           {mfaPhones.map((phone) => {
             return (
               <li key={phone.id} style={{ display: 'flex', gap: '10px' }}>
                 <p>
                   {phone.phoneNumber} {phone.defaultSecondFactor && '(Default)'}
                 </p>
                 <div>
                   <button onClick={() => phone.setReservedForSecondFactor({ reserved: false })}>
                     Disable for MFA
                   </button>
                 </div>

                 {!phone.defaultSecondFactor && (
                   <div>
                     <button onClick={() => phone.makeDefaultSecondFactor()}>Make default</button>
                   </div>
                 )}

                 <div>
                   <button onClick={() => phone.destroy()}>Remove from account</button>
                 </div>
               </li>
             )
           })}
         </ul>
       </>
     )
   }

   // Display phone numbers that are not reserved for MFA
   const ManageAvailablePhoneNumbers = () => {
     const { isSignedIn, user } = useUser()
     const setReservedForSecondFactor = useReverification((phone: PhoneNumberResource) =>
       phone.setReservedForSecondFactor({ reserved: true }),
     )
     const destroyPhone = useReverification((phone: PhoneNumberResource) => phone.destroy())

     if (!isSignedIn) {
       // Handle signed out state
       return null
     }

     // Check if any phone numbers aren't reserved for MFA
     const availableForMfaPhones = user.phoneNumbers
       .filter((ph) => ph.verification.status === 'verified')
       .filter((ph) => !ph.reservedForSecondFactor)

     // Reserve a phone number for MFA
     const reservePhoneForMfa = async (phone: PhoneNumberResource) => {
       // Set the phone number as reserved for MFA
       await setReservedForSecondFactor(phone)
       // Refresh the user information to reflect changes
       await user.reload()
     }

     if (availableForMfaPhones.length === 0) {
       return <p>There are currently no verified phone numbers available to be reserved for MFA.</p>
     }

     return (
       <>
         <h2>Phone numbers that are not reserved for MFA</h2>

         <ul>
           {availableForMfaPhones.map((phone) => {
             return (
               <li key={phone.id} style={{ display: 'flex', gap: '10px' }}>
                 <p>{phone.phoneNumber}</p>
                 <div>
                   <button onClick={() => reservePhoneForMfa(phone)}>Use for MFA</button>
                 </div>
                 <div>
                   <button onClick={() => destroyPhone()}>Remove from account</button>
                 </div>
               </li>
             )
           })}
         </ul>
       </>
     )
   }

   // Generate and display backup codes
   function GenerateBackupCodes() {
     const { user } = useUser()
     const [backupCodes, setBackupCodes] = React.useState<BackupCodeResource | undefined>(undefined)
     const createBackupCode = useReverification(() => user?.createBackupCode())

     const [loading, setLoading] = React.useState(false)

     React.useEffect(() => {
       if (backupCodes) {
         return
       }

       setLoading(true)
       void createBackupCode()
         .then((backupCode: BackupCodeResource) => {
           setBackupCodes(backupCode)
           setLoading(false)
         })
         .catch((err) => {
           // See https://clerk.com/docs/guides/development/custom-flows/error-handling
           // for more info on error handling
           console.error(JSON.stringify(err, null, 2))
           setLoading(false)
         })
     }, [])

     if (loading) {
       return <p>Loading...</p>
     }

     if (!backupCodes) {
       return <p>There was a problem generating backup codes</p>
     }

     return (
       <ol>
         {backupCodes.codes.map((code, index) => (
           <li key={index}>{code}</li>
         ))}
       </ol>
     )
   }

   export default function ManageSMSMFA() {
     const [showBackupCodes, setShowBackupCodes] = React.useState(false)

     const { isLoaded, isSignedIn, user } = useUser()

     if (!isLoaded) {
       // Handle loading state
       return null
     }

     if (!isSignedIn) {
       // Handle signed out state
       return <p>You must be signed in to access this page</p>
     }

     return (
       <>
         <h1>User MFA Settings</h1>

         {/* Manage SMS MFA */}
         <ManageMfaPhoneNumbers />
         <ManageAvailablePhoneNumbers />
         <Link href="/account/add-phone">Add a new phone number</Link>

         {/* Manage backup codes */}
         {user.twoFactorEnabled && (
           <div>
             <p>
               Generate new backup codes? -{' '}
               <button onClick={() => setShowBackupCodes(true)}>Generate</button>
             </p>
           </div>
         )}
         {showBackupCodes && (
           <>
             <GenerateBackupCodes />
             <button onClick={() => setShowBackupCodes(false)}>Done</button>
           </>
         )}
       </>
     )
   }
   ```

   **Add phone number page**

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

## Authenticator application (TOTP)

1. ### Enable multi-factor authentication

   For your users to be able to enable MFA for their account, you need to enable MFA for your application.

   1. In the Clerk Dashboard, navigate to the [**Multi-factor**](https://dashboard.clerk.com/~/user-authentication/multi-factor) page.
   2. For the purpose of this guide, toggle on both the **Authenticator application** and **Backup codes** strategies.
   3. Select **Save**.

   > If you're using Duo as an authenticator app, please note that Duo generates TOTP codes differently than other authenticator apps. Duo allows a code to be valid for 30 seconds from _the moment it is first displayed_, which may cause frequent `invalid_code` errors if the code is not entered promptly. More information can be found in [Duo's Help Center](https://help.duo.com/s/article/2107).
2. ### Build the custom flow

   **This example is written for Next.js App Router but it can be adapted for any React-based framework, such as React Router or Tanstack React Start.**

   This example consists of two pages:

   - The main page where users can manage their MFA settings
   - The page where users can add TOTP MFA.

   Use the following tabs to view the code necessary for each page.

   **Manage MFA page**

   ```tsx {{ filename: 'app/account/manage-mfa/page.tsx', collapsible: true }}
   'use client'

   import * as React from 'react'
   import { useUser, useReverification } from '@clerk/nextjs'
   import Link from 'next/link'
   import { BackupCodeResource } from '@clerk/types'

   // If TOTP is enabled, provide the option to disable it
   const TotpEnabled = () => {
     const { user } = useUser()
     const disableTOTP = useReverification(() => user?.disableTOTP())

     return (
       <p>
         TOTP via authentication app enabled - <button onClick={() => disableTOTP()}>Remove</button>
       </p>
     )
   }

   // If TOTP is disabled, provide the option to enable it
   const TotpDisabled = () => {
     return (
       <p>
         Add TOTP via authentication app -{' '}
         <Link href="/account/manage-mfa/add">
           <button>Add</button>
         </Link>
       </p>
     )
   }

   // Generate and display backup codes
   export function GenerateBackupCodes() {
     const { user } = useUser()
     const [backupCodes, setBackupCodes] = React.useState<BackupCodeResource | undefined>(undefined)
     const createBackupCode = useReverification(() => user?.createBackupCode())

     const [loading, setLoading] = React.useState(false)

     React.useEffect(() => {
       if (backupCodes) return

       setLoading(true)
       void createBackupCode()
         .then((backupCode: BackupCodeResource | undefined) => {
           setBackupCodes(backupCode)
           setLoading(false)
         })
         .catch((err) => {
           // See https://clerk.com/docs/guides/development/custom-flows/error-handling
           // for more info on error handling
           console.error(JSON.stringify(err, null, 2))
           setLoading(false)
         })
     }, [])

     // Handle loading state
     if (loading) <p>Loading...</p>

     if (!backupCodes) return <p>There was a problem generating backup codes</p>

     return (
       <ol>
         {backupCodes.codes.map((code, index) => (
           <li key={index}>{code}</li>
         ))}
       </ol>
     )
   }

   export default function ManageMFA() {
     const { isLoaded, isSignedIn, user } = useUser()
     const [showNewCodes, setShowNewCodes] = React.useState(false)

     // Handle loading state
     if (!isLoaded) <p>Loading...</p>

     // Handle signed-out state
     if (!isSignedIn) <p>You must be signed in to access this page</p>

     return (
       <>
         <h1>User MFA Settings</h1>

         {/* Manage TOTP MFA */}
         {user.totpEnabled ? <TotpEnabled /> : <TotpDisabled />}

         {/* Manage backup codes */}
         {user.backupCodeEnabled && user.twoFactorEnabled && (
           <p>
             Generate new backup codes? -{' '}
             <button onClick={() => setShowNewCodes(true)}>Generate</button>
           </p>
         )}
         {showNewCodes && (
           <>
             <GenerateBackupCodes />
             <button onClick={() => setShowNewCodes(false)}>Done</button>
           </>
         )}
       </>
     )
   }
   ```

   **Add TOTP page**

   ```tsx {{ filename: 'app/account/manage-mfa/add/page.tsx', collapsible: true }}
   'use client'

   import { useUser, useReverification } from '@clerk/nextjs'
   import { TOTPResource } from '@clerk/types'
   import Link from 'next/link'
   import * as React from 'react'
   import { QRCodeSVG } from 'qrcode.react'
   import { GenerateBackupCodes } from '../page'

   type AddTotpSteps = 'add' | 'verify' | 'backupcodes' | 'success'

   type DisplayFormat = 'qr' | 'uri'

   function AddTotpScreen({
     setStep,
   }: {
     setStep: React.Dispatch<React.SetStateAction<AddTotpSteps>>
   }) {
     const { user } = useUser()
     const [totp, setTOTP] = React.useState<TOTPResource | undefined>(undefined)
     const [displayFormat, setDisplayFormat] = React.useState<DisplayFormat>('qr')
     const createTOTP = useReverification(() => user?.createTOTP())

     React.useEffect(() => {
       void createTOTP()
         .then((totp: TOTPResource) => {
           setTOTP(totp)
         })
         .catch((err) =>
           // See https://clerk.com/docs/guides/development/custom-flows/error-handling
           // for more info on error handling
           console.error(JSON.stringify(err, null, 2)),
         )
     }, [])

     return (
       <>
         <h1>Add TOTP MFA</h1>

         {totp && displayFormat === 'qr' && (
           <>
             <div>
               <QRCodeSVG value={totp?.uri || ''} size={200} />
             </div>
             <button onClick={() => setDisplayFormat('uri')}>Use URI instead</button>
           </>
         )}
         {totp && displayFormat === 'uri' && (
           <>
             <div>
               <p>{totp.uri}</p>
             </div>
             <button onClick={() => setDisplayFormat('qr')}>Use QR Code instead</button>
           </>
         )}
         <button onClick={() => setStep('add')}>Reset</button>

         <p>Once you have set up your authentication app, verify your code</p>
         <button onClick={() => setStep('verify')}>Verify</button>
       </>
     )
   }

   function VerifyTotpScreen({
     setStep,
   }: {
     setStep: React.Dispatch<React.SetStateAction<AddTotpSteps>>
   }) {
     const { user } = useUser()
     const [code, setCode] = React.useState('')

     const verifyTotp = async (e: React.FormEvent) => {
       e.preventDefault()
       try {
         await user?.verifyTOTP({ code })
         setStep('backupcodes')
       } catch (err) {
         console.error(JSON.stringify(err, null, 2))
       }
     }

     return (
       <>
         <h1>Verify TOTP</h1>
         <form onSubmit={(e) => verifyTotp(e)}>
           <label htmlFor="totp-code">Enter the code from your authentication app</label>
           <input type="text" id="totp-code" onChange={(e) => setCode(e.currentTarget.value)} />
           <button type="submit">Verify code</button>
           <button onClick={() => setStep('add')}>Reset</button>
         </form>
       </>
     )
   }

   function BackupCodeScreen({
     setStep,
   }: {
     setStep: React.Dispatch<React.SetStateAction<AddTotpSteps>>
   }) {
     return (
       <>
         <h1>Verification was a success!</h1>
         <div>
           <p>
             Save this list of backup codes somewhere safe in case you need to access your account in
             an emergency
           </p>
           <GenerateBackupCodes />
           <button onClick={() => setStep('success')}>Finish</button>
         </div>
       </>
     )
   }

   function SuccessScreen() {
     return (
       <>
         <h1>Success!</h1>
         <p>You have successfully added TOTP MFA via an authentication application.</p>
       </>
     )
   }

   export default function AddMFaScreen() {
     const { isLoaded, isSignedIn, user } = useUser()

     const [step, setStep] = React.useState<AddTotpSteps>('add')

     // Handle loading state
     if (!isLoaded) <p>Loading...</p>

     // Handle signed out state
     if (!isSignedIn) <p>You must be signed in to access this page</p>

     return (
       <>
         {step === 'add' && <AddTotpScreen setStep={setStep} />}
         {step === 'verify' && <VerifyTotpScreen setStep={setStep} />}
         {step === 'backupcodes' && <BackupCodeScreen setStep={setStep} />}
         {step === 'success' && <SuccessScreen />}
         <Link href="/account/manage-mfa">Manage MFA</Link>
       </>
     )
   }
   ```

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
