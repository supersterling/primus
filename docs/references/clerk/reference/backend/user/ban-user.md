# banUser()

Marks the given [`User`](https://clerk.com/docs/reference/backend/types/backend-user.md) as banned, which means that all their sessions are revoked and they are not allowed to sign in again.

```ts
function banUser(userId: string): Promise<User>
```

## Parameters

| Name   | Type   | Description                |
| ------ | ------ | -------------------------- |
| userId | string | The ID of the user to ban. |

## Example

> Using `clerkClient` varies based on your framework. Refer to the [`JS Backend SDK overview`](https://clerk.com/docs/js-backend/getting-started/quickstart.md) for usage details, including guidance on [`how to access the userId and other properties`](https://clerk.com/docs/js-backend/getting-started/quickstart.md#get-the-user-id-and-other-properties).

```tsx
const userId = 'user_123'

const response = await clerkClient.users.banUser(userId)
```

## Backend API (BAPI) endpoint

This method in the SDK is a wrapper around the BAPI endpoint `POST/users/{user_id}/ban`. See the [BAPI reference](https://clerk.com/docs/reference/backend-api/tag/users/post/users/%7Buser_id%7D/ban.md){{ target: '_blank' }} for more information.

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
