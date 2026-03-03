# list()

> API keys is currently in beta. The API may change before general availability.

Retrieves a list of API keys for a given user or organization. Returns a [`PaginatedResourceResponse`](https://clerk.com/docs/reference/backend/types/paginated-resource-response.md) object with a `data` property that contains an array of [`APIKey`](https://clerk.com/docs/reference/backend/types/backend-api-key.md) objects, and a `totalCount` property that indicates the total number of API keys in the system.

```ts
function list(
  queryParams: GetAPIKeyListParams,
): Promise<PaginatedResourceResponse<APIKeyResource[]>>
```

## `GetAPIKeyListParams`

| Name            | Type    | Description                                                                  |
| --------------- | ------- | ---------------------------------------------------------------------------- |
| subject         | string  | The user or organization ID to query API keys by.                            |
| includeInvalid? | boolean | Whether to include invalid API keys (revoked or expired). Defaults to false. |
| limit?          | number  | The maximum number of API keys to return. Defaults to 10.                    |
| offset?         | number  | The number of API keys to skip before returning results. Defaults to 0.      |

## Example

> Using `clerkClient` varies based on your framework. Refer to the [`JS Backend SDK overview`](https://clerk.com/docs/js-backend/getting-started/quickstart.md) for usage details, including guidance on [`how to access the userId and other properties`](https://clerk.com/docs/js-backend/getting-started/quickstart.md#get-the-user-id-and-other-properties).

### List API keys for a user

```tsx
const userId = 'user_123'

const apiKeys = await clerkClient.apiKeys.list({
  subject: userId,
})
```

### List API keys for a user, including invalid ones

```tsx
const userId = 'user_123'

const apiKeys = await clerkClient.apiKeys.list({
  subject: userId,
  includeInvalid: true,
})
```

### List API keys for a user with pagination

```tsx
const userId = 'user_123'

const apiKeys = await clerkClient.apiKeys.list({
  subject: userId,
  limit: 20,
  offset: 0,
})
```

## Backend API (BAPI) endpoint

This method in the SDK is a wrapper around the BAPI endpoint `GET/api_keys`. See the [BAPI reference](https://clerk.com/docs/reference/backend-api/tag/api-keys/get/api_keys.md){{ target: '_blank' }} for more information.

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
