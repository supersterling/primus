# verifyClient()

Verifies the [`Client`](https://clerk.com/docs/reference/javascript/client.md) in the provided token.

```ts
function verifyClient(token: string): Promise<Client>
```

## Parameters

| Name  | Type   | Description                  |
| ----- | ------ | ---------------------------- |
| token | string | The session token to verify. |

## Example

> Using `clerkClient` varies based on your framework. Refer to the [`JS Backend SDK overview`](https://clerk.com/docs/js-backend/getting-started/quickstart.md) for usage details, including guidance on [`how to access the userId and other properties`](https://clerk.com/docs/js-backend/getting-started/quickstart.md#get-the-user-id-and-other-properties).

```tsx
const token = 'my-session-token'

const response = await clerkClient.clients.verifyClient(token)
```

## Backend API (BAPI) endpoint

This method in the SDK is a wrapper around the BAPI endpoint `GET/clients/verify`. See the [BAPI reference](https://clerk.com/docs/reference/backend-api/tag/clients/post/clients/verify.md){{ target: '_blank' }} for more information.

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
