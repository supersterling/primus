# Phone Number

Phone number plugin

The phone number plugin extends the authentication system by allowing users to sign in and sign up using their phone number. It includes OTP (One-Time Password) functionality to verify phone numbers.

## Installation

    ### Add Plugin to the server

```ts
    import { betterAuth } from "better-auth"
    import { phoneNumber } from "better-auth/plugins"

    const auth = betterAuth({
        plugins: [ 
            phoneNumber({
                sendOTP: ({ phoneNumber, code }, ctx) => {
                    // Implement sending OTP code via SMS
                }
            })
        ] 
    })
```

    ### Migrate the database

    Run the migration or generate the schema to add the necessary fields and tables to the database.

```bash
            npx @better-auth/cli migrate
```

```bash
            pnpm dlx @better-auth/cli migrate
```

```bash
            yarn dlx @better-auth/cli migrate
```

```bash
            bun x @better-auth/cli migrate
```

```bash
            npx @better-auth/cli generate
```

```bash
            pnpm dlx @better-auth/cli generate
```

```bash
            yarn dlx @better-auth/cli generate
```

```bash
            bun x @better-auth/cli generate
```

    See the [Schema](#schema) section to add the fields manually.

    ### Add the client plugin

```ts
    import { createAuthClient } from "better-auth/client"
    import { phoneNumberClient } from "better-auth/client/plugins"

    const authClient = createAuthClient({
        plugins: [
            phoneNumberClient()
        ]
    })
```

## Usage

### Send OTP for Verification

To send an OTP to a user's phone number for verification, you can use the `sendVerificationCode` endpoint.

### Client Side

```ts
const { data, error } = await authClient.phoneNumber.sendOtp({
    phoneNumber: +1234567890,
});
```

### Server Side

```ts
const data = await auth.api.sendPhoneNumberOTP({
    body: {
        phoneNumber: +1234567890,
    }
});
```

### Type Definition

```ts
type sendPhoneNumberOTP = {
      /**
       * Phone number to send OTP. 
       */
      phoneNumber: string = "+1234567890"
  
}
```

### Verify Phone Number

After the OTP is sent, users can verify their phone number by providing the code.

### Client Side

```ts
const { data, error } = await authClient.phoneNumber.verify({
    phoneNumber: +1234567890,
    code: 123456,
    disableSession, // optional
    updatePhoneNumber, // optional
});
```

### Server Side

```ts
const data = await auth.api.verifyPhoneNumber({
    body: {
        phoneNumber: +1234567890,
        code: 123456,
        disableSession, // optional
        updatePhoneNumber, // optional
    }
});
```

### Type Definition

```ts
type verifyPhoneNumber = {
      /**
       * Phone number to verify.
       */
      phoneNumber: string = "+1234567890"
      /**
       * OTP code.
       */
      code: string = "123456"
      /**
       * Disable session creation after verification.
       */
      disableSession?: boolean = false
      /**
       * Update the phone number of an existing logged-in user.
       * Requires an active session.
       */
      updatePhoneNumber?: boolean = false
  
}
```

### Allow Sign-Up with Phone Number

To allow users to sign up using their phone number, you can pass `signUpOnVerification` option to your plugin configuration. It requires you to pass `getTempEmail` function to generate a temporary email for the user.

```ts
export const auth = betterAuth({
    plugins: [
        phoneNumber({
            sendOTP: ({ phoneNumber, code }, ctx) => {
                // Implement sending OTP code via SMS
            },
            signUpOnVerification: {
                getTempEmail: (phoneNumber) => {
                    return `${phoneNumber}@my-site.com`
                },
                //optionally, you can also pass `getTempName` function to generate a temporary name for the user
                getTempName: (phoneNumber) => {
                    return phoneNumber //by default, it will use the phone number as the name
                }
            }
        })
    ]
})
```

  We highly recommend not awaiting the `sendOTP` function. If you await it, it'll slow down the request and could cause timing attacks. For serverless platforms, you can use `waitUntil` to ensure the OTP is sent.

If you have additional required fields in your user schema, you can pass them in the verify request body:

```ts
await authClient.phoneNumber.verify({
    phoneNumber: "+1234567890",
    code: "123456",
    customField: "custom-value", // additional field [!code highlight]
})
```

### Sign In with Phone Number

In addition to signing in a user using send-verify flow, you can also use phone number as an identifier and sign in a user using phone number and password.

### Client Side

```ts
const { data, error } = await authClient.signIn.phoneNumber({
    phoneNumber: +1234567890,
    password,
    rememberMe, // optional
});
```

### Server Side

```ts
const data = await auth.api.signInPhoneNumber({
    body: {
        phoneNumber: +1234567890,
        password,
        rememberMe, // optional
    }
});
```

### Type Definition

```ts
type signInPhoneNumber = {
      /**
       * Phone number to sign in. 
       */
      phoneNumber: string = "+1234567890"
      /**
       * Password to use for sign in. 
       */
      password: string
      /**
       * Remember the session. 
       */
      rememberMe?: boolean = true
  
}
```

### Update Phone Number

Already logged-in users can change their phone number to a new one. First, send an OTP to the new phone number:

```ts
await authClient.phoneNumber.sendOtp({
    phoneNumber: "+1234567890" // New phone number
})
```

Then verify the new phone number with `updatePhoneNumber: true`:

```ts
const isVerified = await authClient.phoneNumber.verify({
    phoneNumber: "+1234567890",
    code: "123456",
    updatePhoneNumber: true
})
```

### Disable Session Creation

By default, the plugin creates a session for the user after verifying the phone number. You can disable this behavior by passing `disableSession: true` to the `verify` method.

```ts
const isVerified = await authClient.phoneNumber.verify({
    phoneNumber: "+1234567890",
    code: "123456",
    disableSession: true
})
```

### Request Password Reset

To initiate a request password reset flow using `phoneNumber`, you can start by calling `requestPasswordReset` on the client to send an OTP code to the user's phone number.

### Client Side

```ts
const { data, error } = await authClient.phoneNumber.requestPasswordReset({
    phoneNumber: +1234567890,
});
```

### Server Side

```ts
const data = await auth.api.requestPasswordResetPhoneNumber({
    body: {
        phoneNumber: +1234567890,
    }
});
```

### Type Definition

```ts
type requestPasswordResetPhoneNumber = {
      /**
       * The phone number which is associated with the user. 
       */
      phoneNumber: string = "+1234567890"
  
}
```

Then, you can reset the password by calling `resetPassword` on the client with the OTP code and the new password.

### Client Side

```ts
const { data, error } = await authClient.phoneNumber.resetPassword({
    otp: 123456,
    phoneNumber: +1234567890,
    newPassword: new-and-secure-password,
});
```

### Server Side

```ts
const data = await auth.api.resetPasswordPhoneNumber({
    body: {
        otp: 123456,
        phoneNumber: +1234567890,
        newPassword: new-and-secure-password,
    }
});
```

### Type Definition

```ts
type resetPasswordPhoneNumber = {
      /**
       * The one time password to reset the password. 
       */
      otp: string = "123456"
      /**
       * The phone number to the account which intends to reset the password for. 
       */
      phoneNumber: string = "+1234567890"
      /**
       * The new password. 
       */
      newPassword: string = "new-and-secure-password"
  
}
```

## Options

### `otpLength`

The length of the OTP code to be generated. Default is `6`.

### `sendOTP`

A function that sends the OTP code to the user's phone number. It takes the phone number and the OTP code as arguments.

### `expiresIn`

The time in seconds after which the OTP code expires. Default is `300` seconds.

### `callbackOnVerification`

A function that is called after the phone number is verified. It takes the phone number and the user object as the first argument and a request object as the second argument.

```ts
export const auth = betterAuth({
    plugins: [
        phoneNumber({
            sendOTP: ({ phoneNumber, code }, ctx) => {
                // Implement sending OTP code via SMS
            },
            callbackOnVerification: async ({ phoneNumber, user }, ctx) => {
                // Implement callback after phone number verification
            }
        })
    ]
})
```

### `sendPasswordResetOTP`

A function that sends the OTP code to the user's phone number for password reset. It takes the phone number and the OTP code as arguments.

### `phoneNumberValidator`

A custom function to validate the phone number. It takes the phone number as an argument and returns a boolean indicating whether the phone number is valid.

### `verifyOTP`

A custom function to verify the OTP code. When provided, this function will be used instead of the default internal verification logic. This is useful when you want to integrate with external SMS providers that handle OTP verification (e.g., Twilio Verify, AWS SNS). The function takes an object with `phoneNumber` and `code` properties and a request object, and returns a boolean or a promise that resolves to a boolean indicating whether the OTP is valid.

```ts
export const auth = betterAuth({
    plugins: [
        phoneNumber({
            sendOTP: ({ phoneNumber, code }, ctx) => {
                // Send OTP via your SMS provider
            },
            verifyOTP: async ({ phoneNumber, code }, ctx) => {
                // Verify OTP with your desired logic (e.g., Twilio Verify)
                // This is just an example, not a real implementation.
                const isValid = await twilioClient.verify
                    .services('YOUR_SERVICE_SID')
                    .verificationChecks
                    .create({ to: phoneNumber, code });
                return isValid.status === 'approved';
            }
        })
    ]
})
```

  When using this option, ensure that proper validation is implemented, as it overrides our internal verification logic.

### `signUpOnVerification`

An object with the following properties:

* `getTempEmail`: A function that generates a temporary email for the user. It takes the phone number as an argument and returns the temporary email.
* `getTempName`: A function that generates a temporary name for the user. It takes the phone number as an argument and returns the temporary name.

### `requireVerification`

When enabled, users cannot sign in with their phone number until it has been verified. If an unverified user attempts to sign in, the server will respond with a 401 error (PHONE\_NUMBER\_NOT\_VERIFIED) and automatically trigger an OTP send to start the verification process.

## Schema

The plugin requires 2 fields to be added to the user table

### User Table

### OTP Verification Attempts

The phone number plugin includes a built-in protection against brute force attacks by limiting the number of verification attempts for each OTP code.

```typescript
phoneNumber({
  allowedAttempts: 3, // default is 3
  // ... other options
})
```

When a user exceeds the allowed number of verification attempts:

* The OTP code is automatically deleted
* Further verification attempts will return a 403 (Forbidden) status with "Too many attempts" message
* The user will need to request a new OTP code to continue

Example error response after exceeding attempts:

```json
{
  "error": {
    "status": 403,
    "message": "Too many attempts"
  }
}
```

  When receiving a 403 status, prompt the user to request a new OTP code
