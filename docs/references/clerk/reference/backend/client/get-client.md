# getClient()

Retrieves a single [`Client`](https://clerk.com/docs/reference/javascript/client.md).

```ts
function getClient(clientId: string): Promise<Client>
```

## Parameters

| Name     | Type   | Description                       |
| -------- | ------ | --------------------------------- |
| clientId | string | The ID of the client to retrieve. |

## Example

> Using `clerkClient` varies based on your framework. Refer to the [`JS Backend SDK overview`](https://clerk.com/docs/js-backend/getting-started/quickstart.md) for usage details, including guidance on [`how to access the userId and other properties`](https://clerk.com/docs/js-backend/getting-started/quickstart.md#get-the-user-id-and-other-properties).

```tsx
const clientId = 'client_123'

const response = await clerkClient.clients.getClient(clientId)
```

## Backend API (BAPI) endpoint

This method in the SDK is a wrapper around the BAPI endpoint `GET/clients/{client_id}`. See the [BAPI reference](https://clerk.com/docs/reference/backend-api/tag/clients/get/clients/%7Bclient_id%7D.md){{ target: '_blank' }} for more information.

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
