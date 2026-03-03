# getToken()

Retrieves a token for a JWT Template that is defined on the [**JWT templates**](https://dashboard.clerk.com/~/jwt-templates) page in the Clerk Dashboard.

```ts
function getToken(sessionId: string, template: string): Promise<Token>
```

## Parameters

| Name      | Type   | Description                                                                                                                                              |
| --------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| sessionId | string | The ID of the session to retrieve a token for.                                                                                                           |
| template  | string | The name of the JWT template from the Clerk Dashboard to generate a new token from. For example: 'firebase', 'grafbase', or your custom template's name. |

## Example

> Using `clerkClient` varies based on your framework. Refer to the [`JS Backend SDK overview`](https://clerk.com/docs/js-backend/getting-started/quickstart.md) for usage details, including guidance on [`how to access the userId and other properties`](https://clerk.com/docs/js-backend/getting-started/quickstart.md#get-the-user-id-and-other-properties).

```js
const sessionId = 'sess_123'

const template = 'test'

const response = await clerkClient.sessions.getToken(sessionId, template)
```

## Examples with frameworks

The following examples demonstrate how to use `getToken()` with different frameworks. Each example performs the following steps:

1. Gets the current session ID using framework-specific auth helpers.
2. Checks if there's an active session.
3. Uses the JS Backend SDK's `getToken()` method to generate a token from a template.
4. Returns the token in the response.

The token resembles the following:

```
{
  jwt: 'eyJhbG...'
}
```

> For these examples to work, you must have a JWT template named "test" in the [Clerk Dashboard](https://dashboard.clerk.com/~/jwt-templates) before running the code.

**Next.js**

**App Router**

```js {{ filename: 'app/api/get-token-example/route.ts' }}
import { auth, clerkClient } from '@clerk/nextjs/server'

export async function GET() {
  const { sessionId } = await auth()

  if (!sessionId) {
    return Response.json({ message: 'Unauthorized' }, { status: 401 })
  }

  const template = 'test'
  const client = await clerkClient()
  const token = await client.sessions.getToken(sessionId, template)

  return Response.json({ token })
}
```

**Pages Router**

```ts {{ filename: 'pages/api/getToken.ts' }}
import { clerkClient, getAuth } from '@clerk/nextjs/server'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { sessionId } = getAuth(req)

  if (!sessionId) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const template = 'test'
  const client = await clerkClient()
  const token = await client.sessions.getToken(sessionId, template)

  return res.json({ token })
}
```

## Backend API (BAPI) endpoint

This method in the SDK is a wrapper around the BAPI endpoint `POST/sessions/{session_id}/tokens/{template_name}`. See the [BAPI reference](https://clerk.com/docs/reference/backend-api/tag/sessions/post/sessions/%7Bsession_id%7D/tokens/%7Btemplate_name%7D.md){{ target: '_blank' }} for more information.

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
