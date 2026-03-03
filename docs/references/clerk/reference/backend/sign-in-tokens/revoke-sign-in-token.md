# revokeSignInToken()

Revokes a pending sign-in token.

```ts
function revokeSignInToken(signInTokenId: string): Promise<SignInToken>
```

## Parameters

| Name          | Type   | Description                            |
| ------------- | ------ | -------------------------------------- |
| signInTokenId | string | The ID of the sign-in token to revoke. |

## Example

> Using `clerkClient` varies based on your framework. Refer to the [`JS Backend SDK overview`](https://clerk.com/docs/js-backend/getting-started/quickstart.md) for usage details, including guidance on [`how to access the userId and other properties`](https://clerk.com/docs/js-backend/getting-started/quickstart.md#get-the-user-id-and-other-properties).

```tsx
const signInTokenId = 'sit_123'

const response = await clerkClient.signInTokens.revokeSignInToken(signInTokenId)
```

## Backend API (BAPI) endpoint

This method in the SDK is a wrapper around the BAPI endpoint `POST/sign_in_tokens/{sign_in_token_id}/revoke`. See the [BAPI reference](https://clerk.com/docs/reference/backend-api/tag/sign-in-tokens/post/sign_in_tokens/%7Bsign_in_token_id%7D/revoke.md){{ target: '_blank' }} for more information.

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
