# verifyToken()

Verifies an [M2M token](https://clerk.com/docs/guides/development/machine-auth/m2m-tokens.md). Must be authenticated via a Machine Secret Key.

```ts
function verifyToken(params: VerifyM2MTokenParams): Promise<M2MToken>
```

## `VerifyM2MTokenParams`

| Name              | Type   | Description                                                                                                              |
| ----------------- | ------ | ------------------------------------------------------------------------------------------------------------------------ |
| machineSecretKey? | string | Custom machine secret key for authentication. If not provided, the SDK will use the value from the environment variable. |
| token             | string | The M2M token to verify.                                                                                                 |

## Example

> Using `clerkClient` varies based on your framework. Refer to the [`JS Backend SDK overview`](https://clerk.com/docs/js-backend/getting-started/quickstart.md) for usage details, including guidance on [`how to access the userId and other properties`](https://clerk.com/docs/js-backend/getting-started/quickstart.md#get-the-user-id-and-other-properties).

```ts
const response = await clerkClient.m2m.verifyToken({ token })
```

## Backend API (BAPI) endpoint

This method in the SDK is a wrapper around the BAPI endpoint `POST/m2m_tokens/verify`. See the [BAPI reference](https://clerk.com/docs/reference/backend-api/tag/m2m-tokens/post/m2m_tokens/verify.md){{ target: '_blank' }} for more information.

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
