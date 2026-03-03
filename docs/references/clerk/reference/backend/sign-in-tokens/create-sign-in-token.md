# createSignInToken()

Creates a new sign-in token and associates it with the given user. By default, sign-in tokens expire in 30 days. You can optionally supply a different duration in seconds using the `expires_in_seconds` property.

```ts
function createSignInToken(params: CreateSignInTokensParams): Promise<SignInToken>
```

## `CreateSignInTokenParams`

| Name             | Type   | Description                                                                                |
| ---------------- | ------ | ------------------------------------------------------------------------------------------ |
| userId           | string | The ID of the user who can use the newly created sign-in token.                            |
| expiresInSeconds | string | Specifies the life duration of the sign in token in seconds. Defaults to 2592000 (30 days) |

## Example

> Using `clerkClient` varies based on your framework. Refer to the [`JS Backend SDK overview`](https://clerk.com/docs/js-backend/getting-started/quickstart.md) for usage details, including guidance on [`how to access the userId and other properties`](https://clerk.com/docs/js-backend/getting-started/quickstart.md#get-the-user-id-and-other-properties).

```tsx
const userId = 'user_123'

const expiresInSeconds = 60 * 60 * 24 * 7 // 1 week

const response = await clerkClient.signInTokens.createSignInToken({
  userId,
  expiresInSeconds,
})
```

## Backend API (BAPI) endpoint

This method in the SDK is a wrapper around the BAPI endpoint `POST/sign_in_tokens`. See the [BAPI reference](https://clerk.com/docs/reference/backend-api/tag/sign-in-tokens/post/sign_in_tokens.md){{ target: '_blank' }} for more information.

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
