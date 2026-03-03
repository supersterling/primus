# createAllowlistIdentifier()

Adds a new identifier to the allowlist. Returns the created [`AllowlistIdentifier`](https://clerk.com/docs/reference/backend/types/backend-allowlist-identifier.md) object.

```ts
function createAllowlistIdentifier(
  params: AllowlistIdentifierCreateParams,
): Promise<AllowlistIdentifier>
```

## `AllowlistIdentifierCreateParams`

| Name       | Type    | Description                                                                                                                                                                                                                                   |
| ---------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| identifier | string  | The identifier to be added in the allowlist. Can be an email address, a phone number in international E.164 format, a domain, or a Web3 wallet address.                                                                                       |
| notify     | boolean | Whether the given identifier will receive an invitation to join the application. Note that this only works for email address and phone number identifiers. Not available for wildcard identifiers or Web3 wallet addresses. Defaults to true. |

## Example

> Using `clerkClient` varies based on your framework. Refer to the [`JS Backend SDK overview`](https://clerk.com/docs/js-backend/getting-started/quickstart.md) for usage details, including guidance on [`how to access the userId and other properties`](https://clerk.com/docs/js-backend/getting-started/quickstart.md#get-the-user-id-and-other-properties).

```tsx
const response = await clerkClient.allowlistIdentifiers.createAllowlistIdentifier({
  identifier: 'test@example.com',
  notify: false,
})
```

## Backend API (BAPI) endpoint

This method in the SDK is a wrapper around the BAPI endpoint `POST/allowlist-identifiers`. See the [BAPI reference](https://clerk.com/docs/reference/backend-api/tag/allow-list-block-list/post/allowlist_identifiers.md){{ target: '_blank' }} for more information.

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
