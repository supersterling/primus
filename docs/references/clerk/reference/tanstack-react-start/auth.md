# auth()

The `auth()` helper returns the [`Auth`](https://clerk.com/docs/reference/backend/types/auth-object.md){{ target: '_blank' }} object of the currently active user.

## Parameters

| Name                                                                            | Type                                                                                                                        | Description |
| ------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- | ----------- |
| acceptsToken?: The type of authentication token(s) to accept. Valid values are: | treatPendingAsSignedOut?: A boolean that indicates whether to treat pending session status as signed out. Defaults to true. |             |

## Returns

`auth()` returns the [`Auth`](https://clerk.com/docs/reference/backend/types/auth-object.md){{ target: '_blank' }} object.

## Usage

See the [`dedicated guide`](https://clerk.com/docs/tanstack-react-start/guides/users/reading.md#server-side) for example usage.

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
