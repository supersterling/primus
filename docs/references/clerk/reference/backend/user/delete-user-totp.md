# deleteUserTOTP()

Deletes all of a user's TOTPs.

```ts
function deleteUserTOTP(userId: string): Promise<UserID>
```

## Example

> Using `clerkClient` varies based on your framework. Refer to the [`JS Backend SDK overview`](https://clerk.com/docs/js-backend/getting-started/quickstart.md) for usage details, including guidance on [`how to access the userId and other properties`](https://clerk.com/docs/js-backend/getting-started/quickstart.md#get-the-user-id-and-other-properties).

```tsx
const userId = 'user_123'

const response = await clerkClient.users.deleteUserTOTP(userId)
```

## Backend API (BAPI) endpoint

This method in the SDK is a wrapper around the BAPI endpoint `DELETE/users/{user_id}/totp`. See the [BAPI reference](https://clerk.com/docs/reference/backend-api/tag/users/delete/users/%7Buser_id%7D/totp.md){{ target: '_blank' }} for more information.

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
