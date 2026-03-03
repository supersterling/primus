# verify()

> API keys is currently in beta. The API may change before general availability.

Verifies an [API key](https://clerk.com/docs/guides/development/machine-auth/api-keys.md) secret. Returns an [`APIKey`](https://clerk.com/docs/reference/backend/types/backend-api-key.md) object.

- If the API key is valid, the method returns the API key object with its properties.
- If the API key is invalid, revoked, or expired, the method will throw an error.

> In most cases, you'll want to verify API keys using framework-specific helpers like `auth()` in Next.js, which handles the verification automatically. See the [`verifying API keys`](https://clerk.com/docs/guides/development/verifying-api-keys.md) guide for more details.

```ts
function verify(secret: string): Promise<APIKeyResource>
```

## Parameters

| Name   | Type   | Description                   |
| ------ | ------ | ----------------------------- |
| secret | string | The API key secret to verify. |

## Example

> Using `clerkClient` varies based on your framework. Refer to the [`JS Backend SDK overview`](https://clerk.com/docs/js-backend/getting-started/quickstart.md) for usage details, including guidance on [`how to access the userId and other properties`](https://clerk.com/docs/js-backend/getting-started/quickstart.md#get-the-user-id-and-other-properties).

```tsx
const apiKeySecret = 'ak_live_123'

const response = await clerkClient.apiKeys.verify(apiKeySecret)
```

## Backend API (BAPI) endpoint

This method in the SDK is a wrapper around the BAPI endpoint `POST/api_keys/verify`. See the [BAPI reference](https://clerk.com/docs/reference/backend-api/tag/api-keys/post/api_keys/verify.md){{ target: '_blank' }} for more information.

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
