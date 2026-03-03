# deleteUser()

Deletes a [`User`](https://clerk.com/docs/reference/backend/types/backend-user.md) given a valid ID.

```ts
function deleteUser(userId: string): Promise<User>
```

## Parameters

| Name   | Type   | Description                   |
| ------ | ------ | ----------------------------- |
| userId | string | The ID of the user to delete. |

## Usage

> Using `clerkClient` varies based on your framework. Refer to the [`JS Backend SDK overview`](https://clerk.com/docs/js-backend/getting-started/quickstart.md) for usage details, including guidance on [`how to access the userId and other properties`](https://clerk.com/docs/js-backend/getting-started/quickstart.md#get-the-user-id-and-other-properties).

```tsx
const userId = 'user_123'

const response = await clerkClient.users.deleteUser(userId)
```

## Example

**Next.js**

```ts {{ filename: 'app/api/example/route.ts' }}
import { clerkClient } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export async function POST() {
  await clerkClient.users.deleteUser('user_123')

  return NextResponse.json({ success: true })
}
```

## Backend API (BAPI) endpoint

This method in the SDK is a wrapper around the BAPI endpoint `DELETE/users/{user_id}`. See the [BAPI reference](https://clerk.com/docs/reference/backend-api/tag/users/delete/users/%7Buser_id%7D.md){{ target: '_blank' }} for more information.

Here's an example of making a request directly to the endpoint using cURL.

Replace `YOUR_SECRET_KEY` with your Clerk Secret Key.

```bash {{ filename: 'terminal' }}
  curl 'https://api.clerk.com/v1/users/{user_id}' -X DELETE -H 'Authorization:Bearer {{secret}}' -H 'Content-Type:application/json'
```

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
