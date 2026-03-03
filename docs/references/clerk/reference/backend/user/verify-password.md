# verifyPassword()

Check that the user's password matches the supplied input. Useful for custom auth flows and re-verification.

```ts
function verifyPassword(params: VerifyPasswordParams): Promise<{ verified: true }>
```

## `VerifyPasswordParams`

| Name     | Type   | Description                                    |
| -------- | ------ | ---------------------------------------------- |
| userId   | string | The ID of the user to verify the password for. |
| password | string | The password to verify.                        |

## Example

> Using `clerkClient` varies based on your framework. Refer to the [`JS Backend SDK overview`](https://clerk.com/docs/js-backend/getting-started/quickstart.md) for usage details, including guidance on [`how to access the userId and other properties`](https://clerk.com/docs/js-backend/getting-started/quickstart.md#get-the-user-id-and-other-properties).

```tsx
const userId = 'user_123'

const password = 'testpassword123'

const response = await clerkClient.users.verifyPassword({
  userId,
  password,
})
```

## Backend API (BAPI) endpoint

This method in the SDK is a wrapper around the BAPI endpoint `POST/users/{user_id}/verify_password`. See the [BAPI reference](https://clerk.com/docs/reference/backend-api/tag/users/post/users/%7Buser_id%7D/verify_password.md){{ target: '_blank' }} for more information.

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
