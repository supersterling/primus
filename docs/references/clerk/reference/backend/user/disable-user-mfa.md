# disableUserMFA()

> On November 14, 2025, Clerk introduced [**Client Trust**](https://clerk.com/docs/guides/secure/client-trust.md). This free security protection automatically enforces MFA **the first time** a user logs in from a new device even if MFA is disabled. Learn more about [Client Trust and our commitment to security](https://clerk.com/changelog/2025-11-14-client-trust-credential-stuffing-killer).

Disable all of a user's MFA methods (e.g. OTP sent via SMS, TOTP on their authenticator app) at once.

```ts
function disableUserMFA(userId: string): Promise<UserID>
```

## Parameters

| Name   | Type   | Description                            |
| ------ | ------ | -------------------------------------- |
| userId | string | The ID of the user to disable MFA for. |

## Example

> Using `clerkClient` varies based on your framework. Refer to the [`JS Backend SDK overview`](https://clerk.com/docs/js-backend/getting-started/quickstart.md) for usage details, including guidance on [`how to access the userId and other properties`](https://clerk.com/docs/js-backend/getting-started/quickstart.md#get-the-user-id-and-other-properties).

```tsx
const userId = 'user_123'

const response = await clerkClient.users.disableUserMFA(userId)
```

## Backend API (BAPI) endpoint

This method in the SDK is a wrapper around the BAPI endpoint `DELETE/users/{user_id}/mfa`. See the [BAPI reference](https://clerk.com/docs/reference/backend-api/tag/users/delete/users/%7Buser_id%7D/mfa.md){{ target: '_blank' }} for more information.

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
