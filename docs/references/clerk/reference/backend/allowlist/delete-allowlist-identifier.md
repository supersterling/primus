# deleteAllowlistIdentifier()

Deletes an [`AllowlistIdentifier`](https://clerk.com/docs/reference/backend/types/backend-allowlist-identifier.md).

```ts
function deleteAllowlistIdentifier(allowlistIdentifierId: string): Promise<AllowlistIdentifier>
```

## Parameters

| Name                  | Type   | Description                                   |
| --------------------- | ------ | --------------------------------------------- |
| allowlistIdentifierId | string | The ID of the allowlist identifier to delete. |

## Example

> Using `clerkClient` varies based on your framework. Refer to the [`JS Backend SDK overview`](https://clerk.com/docs/js-backend/getting-started/quickstart.md) for usage details, including guidance on [`how to access the userId and other properties`](https://clerk.com/docs/js-backend/getting-started/quickstart.md#get-the-user-id-and-other-properties).

```tsx
const allowlistIdentifierId = 'alid_123'

const response =
  await clerkClient.allowlistIdentifiers.deleteAllowlistIdentifier(allowlistIdentifierId)
```

## Backend API (BAPI) endpoint

This method in the SDK is a wrapper around the BAPI endpoint `DELETE/allowlist-identifiers/{identifier_id}`. See the [BAPI reference](https://clerk.com/docs/reference/backend-api/tag/allow-list-block-list/delete/allowlist_identifiers/%7Bidentifier_id%7D.md){{ target: '_blank' }} for more information.

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
