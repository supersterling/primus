# getAllowlistIdentifierList()

Retrieves the list of all allowlist identifiers. Returns a [`PaginatedResourceResponse`](https://clerk.com/docs/reference/backend/types/paginated-resource-response.md) object with a `data` property that contains an array of [`AllowlistIdentifier`](https://clerk.com/docs/reference/backend/types/backend-allowlist-identifier.md) objects, and a `totalCount` property that indicates the total number of allowlist identifiers in the system.

```ts
function getAllowlistIdentifierList(): Promise<PaginatedResourceResponse<AllowlistIdentifier[]>>
```

## Example

> Using `clerkClient` varies based on your framework. Refer to the [`JS Backend SDK overview`](https://clerk.com/docs/js-backend/getting-started/quickstart.md) for usage details, including guidance on [`how to access the userId and other properties`](https://clerk.com/docs/js-backend/getting-started/quickstart.md#get-the-user-id-and-other-properties).

```tsx
const response = await clerkClient.allowlistIdentifiers.getAllowlistIdentifierList()
```

## Backend API (BAPI) endpoint

This method in the SDK is a wrapper around the BAPI endpoint `GET/allowlist-identifiers`. See the [BAPI reference](https://clerk.com/docs/reference/backend-api/tag/allow-list-block-list/get/allowlist_identifiers.md){{ target: '_blank' }} for more information.

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
