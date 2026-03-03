# delete()

> API keys is currently in beta. The API may change before general availability.

Deletes an [API key](https://clerk.com/docs/guides/development/machine-auth/api-keys.md) by its ID. Returns a [`DeletedObjectResource`](https://clerk.com/docs/reference/javascript/types/deleted-object-resource.md) object.

```ts {{ prettier: false }}
function delete(apiKeyId: string): Promise<DeletedObjectResource>
```

## Parameters

| Name     | Type   | Description                      |
| -------- | ------ | -------------------------------- |
| apiKeyId | string | The ID of the API key to delete. |

## Example

> Using `clerkClient` varies based on your framework. Refer to the [`JS Backend SDK overview`](https://clerk.com/docs/js-backend/getting-started/quickstart.md) for usage details, including guidance on [`how to access the userId and other properties`](https://clerk.com/docs/js-backend/getting-started/quickstart.md#get-the-user-id-and-other-properties).

```tsx
const apiKeyId = 'apikey_123'

const response = await clerkClient.apiKeys.delete(apiKeyId)
```

## Backend API (BAPI) endpoint

This method in the SDK is a wrapper around the BAPI endpoint `DELETE/api_keys/{apiKeyID}`. See the [BAPI reference](https://clerk.com/docs/reference/backend-api/tag/api-keys/delete/api_keys/%7BapiKeyID%7D.md){{ target: '_blank' }} for more information.

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
