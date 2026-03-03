# createToken()

Creates a new [M2M token](https://clerk.com/docs/guides/development/machine-auth/m2m-tokens.md). Must be authenticated via a Machine Secret Key.

```ts
function createToken(params?: CreateM2MTokenParams): Promise<M2MToken>
```

## `CreateM2MTokenParams`

| Name                    | Type                             | Description                                                                                                              |
| ----------------------- | -------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| machineSecretKey?       | string                           | Custom machine secret key for authentication. If not provided, the SDK will use the value from the environment variable. |
| secondsUntilExpiration? | number | null                   | Number of seconds until the token expires. Defaults to null (token does not expire).                                     |
| claims?                 | Record<string, unknown> | null | Additional custom claims to include in the token payload.                                                                |

## Example

> Using `clerkClient` varies based on your framework. Refer to the [`JS Backend SDK overview`](https://clerk.com/docs/js-backend/getting-started/quickstart.md) for usage details, including guidance on [`how to access the userId and other properties`](https://clerk.com/docs/js-backend/getting-started/quickstart.md#get-the-user-id-and-other-properties).

```ts
const m2mToken = await clerkClient.m2m.createToken()
console.log(m2mToken)
```

While it is strongly recommended to use environment variables for security, if you need to pass in the machine secret key directly rather than using an environment variable, you can do so by passing it as an argument to the `createToken()` method, as shown in the following example:

```ts
const m2mToken = await clerkClient.m2m.createToken({
  machineSecretKey: 'ak_xxx',
})
console.log(m2mToken)
```

## Backend API (BAPI) endpoint

This method in the SDK is a wrapper around the BAPI endpoint `POST/m2m_tokens`. See the [BAPI reference](https://clerk.com/docs/reference/backend-api/tag/m2m-tokens/post/m2m_tokens.md){{ target: '_blank' }} for more information.

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
