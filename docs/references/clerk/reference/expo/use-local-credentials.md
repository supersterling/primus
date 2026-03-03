# useLocalCredentials()

The `useLocalCredentials()` hook enables you to store a user's password credentials on their device and subsequently use biometrics for sign-in. This enhances the user experience by allowing users to sign in using Face ID or another biometric authentication method during future sign-ins.

> This hook isn't supported in web apps and can only be used in native apps.
> This API is available only for [`@clerk/clerk-expo >=2.2.0`](https://clerk.com/docs/guides/development/upgrading/upgrade-guides/expo-v2.md).
> Be aware that this works only for sign-in attempts using a [password](https://clerk.com/docs/guides/configure/auth-strategies/sign-up-sign-in-options.md#password).

## Returns

| Name                | Type                                         | Description                                                                                                                                                                                                                                                                                                        |
| ------------------- | -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| hasCredentials      | boolean                                      | Indicates if there are any credentials stored on the device.                                                                                                                                                                                                                                                       |
| userOwnsCredentials | boolean                                      | Indicates if the stored credentials belong to the signed in user. When there is no signed-in user, the value will always be false.                                                                                                                                                                                 |
| biometricType       | 'face-recognition' | 'fingerprint' | null  | Indicates the supported enrolled biometric authenticator type.                                                                                                                                                                                                                                                     |
| setCredentials()    | (params: LocalCredentials) => Promise<void> | Stores the provided credentials on the device if the device has enrolled biometrics. The end user needs to have a passcode set in order for the credentials to be stored, and those credentials will be removed if the passcode gets removed. The promise will reject if the value cannot be stored on the device. |
| clearCredentials()  | () => Promise<void>                         | Removes the stored credentials from the device. The promise will reject if the value cannot be deleted from the device.                                                                                                                                                                                            |
| authenticate()      | () => Promise<SignInResource>               | Attempts to read the stored credentials and creates a sign-in attempt with the password strategy.The promise will resolve to a SignInResource if the stored credentials were accessed. Otherwise, the promise will reject.                                                                                         |

### `LocalCredentials`

| Name       | Type    | Description                                                                                                                                                                           |
| ---------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| identifier | string? | The identifier of the credentials to be stored on the device. It can be a username, email, phone number, etc.                                                                         |
| password   | string  | The password for the identifier to be stored on the device. If an identifier already exists on the device, passing only password would update the password for the stored identifier. |

## How to use the `useLocalCredentials()` hook

To learn how to use the `useLocalCredentials()` hook, see the [reference doc](https://clerk.com/docs/guides/development/local-credentials.md).

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
