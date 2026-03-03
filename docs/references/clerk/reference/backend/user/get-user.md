# getUser()

Retrieves a single [`User`](https://clerk.com/docs/reference/backend/types/backend-user.md) by their ID, if the ID is valid.

```ts
function getUser(userId: string): Promise<User>
```

## Parameters

| Name   | Type   | Description                     |
| ------ | ------ | ------------------------------- |
| userId | string | The ID of the user to retrieve. |

## Example

> Using `clerkClient` varies based on your framework. Refer to the [`JS Backend SDK overview`](https://clerk.com/docs/js-backend/getting-started/quickstart.md) for usage details, including guidance on [`how to access the userId and other properties`](https://clerk.com/docs/js-backend/getting-started/quickstart.md#get-the-user-id-and-other-properties).

```tsx
const userId = 'user_123'

const response = await clerkClient.users.getUser(userId)
```

## Backend API (BAPI) endpoint

This method in the SDK is a wrapper around the BAPI endpoint `GET/users/{user_id}`. See the [BAPI reference](https://clerk.com/docs/reference/backend-api/tag/users/get/users/%7Buser_id%7D.md){{ target: '_blank' }} for more information.

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
