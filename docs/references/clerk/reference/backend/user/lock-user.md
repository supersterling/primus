# lockUser()

Marks the given [`User`](https://clerk.com/docs/reference/backend/types/backend-user.md) as locked, which means they are not allowed to sign in again until the lock expires.

By default, lockout duration is 1 hour, but it can be configured in the application's [**Attack protection**](https://dashboard.clerk.com/~/user-authentication/attack-protection) settings. For more information, see the [dedicated guide for customizing **Attack protection** settings](https://clerk.com/docs/guides/secure/user-lockout.md).

```ts
function lockUser(userId: string): Promise<User>
```

## Parameters

| Name   | Type   | Description                    |
| ------ | ------ | ------------------------------ |
| userId | string | The ID of the user to lockout. |

## Example

> Using `clerkClient` varies based on your framework. Refer to the [`JS Backend SDK overview`](https://clerk.com/docs/js-backend/getting-started/quickstart.md) for usage details, including guidance on [`how to access the userId and other properties`](https://clerk.com/docs/js-backend/getting-started/quickstart.md#get-the-user-id-and-other-properties).

```tsx
const userId = 'user_123'

const response = await clerkClient.users.lockUser(userId)
```

## Backend API (BAPI) endpoint

This method in the SDK is a wrapper around the BAPI endpoint `POST/users/{user_id}/lock`. See the [BAPI reference](https://clerk.com/docs/reference/backend-api/tag/users/post/users/%7Buser_id%7D/lock.md){{ target: '_blank' }} for more information.

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
