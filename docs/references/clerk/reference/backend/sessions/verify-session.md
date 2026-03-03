# verifySession() (deprecated)

> This method is now deprecated. Refer to the [Manual JWT Verification](https://clerk.com/docs/guides/sessions/manual-jwt-verification.md) guide for the recommended way to verify sessions/tokens.

Verifies whether a session with a given ID corresponds to the provided session token. Throws an error if the provided ID is invalid.

## Example

> Using `clerkClient` varies based on your framework. Refer to the [`JS Backend SDK overview`](https://clerk.com/docs/js-backend/getting-started/quickstart.md) for usage details, including guidance on [`how to access the userId and other properties`](https://clerk.com/docs/js-backend/getting-started/quickstart.md#get-the-user-id-and-other-properties).

```tsx
const sessionId = 'my-session-id'

const token = 'my-session-token'

const session = await clerkClient.sessions.verifySession(sessionId, token)
```

## Required parameters

| Name      | Type   | Description                              |
| --------- | ------ | ---------------------------------------- |
| sessionId | string | The ID of the session to verify.         |
| token     | string | The token of the session to verify with. |

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
