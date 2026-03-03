# update()

> API keys is currently in beta. The API may change before general availability.

Updates an [API key](https://clerk.com/docs/guides/development/machine-auth/api-keys.md) by its ID. Returns an [`APIKey`](https://clerk.com/docs/reference/backend/types/backend-api-key.md) object.

```ts
function update(params: UpdateAPIKeyParams): Promise<APIKeyResource>
```

## `UpdateAPIKeyParams`

| Name                    | Type                             | Description                                                                              |
| ----------------------- | -------------------------------- | ---------------------------------------------------------------------------------------- |
| apiKeyID                | string                           | The ID of the API key to update.                                                         |
| subject                 | string                           | The user ID (user\_xxx) or organization ID (org\_xxx) to associate the API key with.     |
| description?            | string | null                   | A longer description of what the API key is used for.                                    |
| scopes?                 | string[]                        | An array of scope strings that define what the API key can access.                       |
| claims?                 | Record<string, unknown> | null | Additional custom claims to store additional information about the API key.              |
| secondsUntilExpiration? | number | null                   | Number of seconds until the API key expires. Defaults to null (API key does not expire). |

## Example

> Using `clerkClient` varies based on your framework. Refer to the [`JS Backend SDK overview`](https://clerk.com/docs/js-backend/getting-started/quickstart.md) for usage details, including guidance on [`how to access the userId and other properties`](https://clerk.com/docs/js-backend/getting-started/quickstart.md#get-the-user-id-and-other-properties).

```tsx
const apiKeyId = 'apikey_123'
const userId = 'user_123'

const response = await clerkClient.apiKeys.update({
  apiKeyId: apiKeyId,
  subject: userId,
  description: 'API key for accessing my application',
  scopes: ['read:users', 'write:users'],
  secondsUntilExpiration: 86400, // expires in 24 hours
})
```

## Backend API (BAPI) endpoint

This method in the SDK is a wrapper around the BAPI endpoint `PATCH/api_keys/{apiKeyID}`. See the [BAPI reference](https://clerk.com/docs/reference/backend-api/tag/api-keys/patch/api_keys/%7BapiKeyID%7D.md){{ target: '_blank' }} for more information.

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
