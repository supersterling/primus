# getAuth()

The `getAuth()` helper retrieves authentication state from the request object.

> If you are using App Router, use the [`auth() helper`](https://clerk.com/docs/reference/nextjs/app-router/auth.md) instead.

## Parameters

| Name                                                                                                                                                                                                                                                                                                                                                                                                           | Type | Description                 |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---- | --------------------------- |
| req                                                                                                                                                                                                                                                                                                                                                                                                            |      | The Next.js request object. |
| secretKey?: A string that represents the Secret KeyYour Clerk Secret Key is used to authenticate requests from your backend to Clerk's API. You can find it on the API keys page in the Clerk Dashboard. Do not expose this on the frontend with a public environment variable. used to sign the session token. If not provided, the Secret Key is retrieved from the environment variable CLERK\_SECRET\_KEY. |      |                             |

## Returns

`getAuth()` returns the `Auth` object. See the [`Auth reference`](https://clerk.com/docs/reference/backend/types/auth-object.md) for more information.

## Usage

The following example uses `getAuth()` to protect a route and load the user's data. If the user is authenticated, their `userId` is passed to [`clerkClient.users.getUser()`](https://clerk.com/docs/reference/backend/user/get-user.md){{ target: '_blank' }} to get the current user's [`User`](https://clerk.com/docs/reference/javascript/user.md){{ target: '_blank' }} object. If not authenticated, the request is rejected with a `401` status code.

See more detailed examples in the [`dedicated guide`](https://clerk.com/docs/nextjs/guides/users/reading.md#pages-router).

```tsx {{ filename: 'pages/api/auth.ts' }}
import { getAuth, clerkClient } from '@clerk/nextjs/server'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Use `getAuth()` to access `isAuthenticated` and the user's ID
  const { isAuthenticated, userId } = getAuth(req)

  // Protect the route by checking if the user is signed in
  if (!isAuthenticated) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  // Initialize the JS Backend SDK
  const client = await clerkClient()

  // Get the user's full Backend User object
  const user = await client.users.getUser(userId)

  return res.status(200).json({ user })
}
```

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
