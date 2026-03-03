# getAuth()

The `getAuth()` helper retrieves the current user's authentication state from the request object.

## Parameters

| Name                                                                            | Type                                                                                                                        | Description           |
| ------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- | --------------------- |
| args                                                                            | LoaderFunctionArgs                                                                                                          | The arguments object. |
| acceptsToken?: The type of authentication token(s) to accept. Valid values are: | treatPendingAsSignedOut?: A boolean that indicates whether to treat pending session status as signed out. Defaults to true. |                       |

## Returns

`getAuth()` returns the `Auth` object. This JavaScript object contains important information like the current user's session ID, user ID, and Organization ID. Learn more about the [`Auth object`](https://clerk.com/docs/reference/backend/types/auth-object.md){{ target: '_blank' }}.

## Usage

See the [`dedicated guide`](https://clerk.com/docs/react-router/guides/users/reading.md#server-side) for example usage.

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
