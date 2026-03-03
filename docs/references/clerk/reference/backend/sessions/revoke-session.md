# revokeSession()

Revokes a [`Session`](https://clerk.com/docs/reference/backend/types/backend-session.md).

User will be signed out from the particular client the referred to.

```ts
function revokeSession(sessionId: string): Promise<Session>
```

## Parameters

| Name      | Type   | Description                      |
| --------- | ------ | -------------------------------- |
| sessionId | string | The ID of the session to revoke. |

## Example

> Using `clerkClient` varies based on your framework. Refer to the [`JS Backend SDK overview`](https://clerk.com/docs/js-backend/getting-started/quickstart.md) for usage details, including guidance on [`how to access the userId and other properties`](https://clerk.com/docs/js-backend/getting-started/quickstart.md#get-the-user-id-and-other-properties).

```tsx
const sessionId = 'sess_123'

const response = await clerkClient.sessions.revokeSession(sessionId)
```

## Backend API (BAPI) endpoint

This method in the SDK is a wrapper around the BAPI endpoint `POST/sessions/{session_id}/revoke`. See the [BAPI reference](https://clerk.com/docs/reference/backend-api/tag/sessions/post/sessions/%7Bsession_id%7D/revoke.md){{ target: '_blank' }} for more information.

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
