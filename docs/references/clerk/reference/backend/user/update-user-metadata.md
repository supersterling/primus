# updateUserMetadata()

Updates the metadata associated with the specified user by merging existing values with the provided parameters.

A "deep" merge will be performed - "deep" means that any nested JSON objects will be merged as well. You can remove metadata keys at any level by setting their value to `null`.

Returns a [`User`](https://clerk.com/docs/reference/backend/types/backend-user.md) object.

```ts
function updateUserMetadata(userId: string, params: UpdateUserMetadataParams): Promise<User>
```

## `UpdateUserMetadataParams`

| Name             | Type                | Description                                                                                               |
| ---------------- | ------------------- | --------------------------------------------------------------------------------------------------------- |
| userId           | string              | The ID of the user to update.                                                                             |
| publicMetadata?  | UserPublicMetadata  | Metadata that can be read from the Frontend API and Backend API and can be set only from the Backend API. |
| privateMetadata? | UserPrivateMetadata | Metadata that can be read and set only from the Backend API.                                              |

## Usage

> Using `clerkClient` varies based on your framework. Refer to the [`JS Backend SDK overview`](https://clerk.com/docs/js-backend/getting-started/quickstart.md) for usage details, including guidance on [`how to access the userId and other properties`](https://clerk.com/docs/js-backend/getting-started/quickstart.md#get-the-user-id-and-other-properties).

```tsx
const userId = 'user_123'

const response = await clerkClient.users.updateUserMetadata(userId, {
  publicMetadata: {
    example: 'metadata',
  },
})
```

## Example

This example updates the user's public metadata to include a birthday, but you can update the public, private, or unsafe metadata to include any information you want.

**Next.js**

```ts {{ filename: 'app/api/example/route.ts' }}
import { auth, clerkClient } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export async function POST() {
  const { userId } = await auth()
  const client = await clerkClient()

  await client.users.updateUserMetadata(userId, {
    publicMetadata: {
      birthday: '1990-01-01',
    },
  })

  return NextResponse.json({ success: true })
}
```

## Backend API (BAPI) endpoint

This method in the SDK is a wrapper around the BAPI endpoint `PATCH/users/{user_id}/metadata`. See the [BAPI reference](https://clerk.com/docs/reference/backend-api/tag/users/patch/users/%7Buser_id%7D/metadata.md){{ target: '_blank' }} for more information.

Here's an example of making a request directly to the endpoint using cURL.

Replace `YOUR_SECRET_KEY` with your Clerk Secret Key. You can find your Secret Key on the [**API keys**](https://dashboard.clerk.com/~/api-keys) page in the Clerk Dashboard.

```bash {{ filename: 'curl.sh' }}
curl -XPATCH -H 'Authorization: Bearer {{secret}}' -H "Content-type: application/json" -d '{
  "public_metadata": {
    "birthday": "1990-01-01"
  }
}' 'https://api.clerk.com/v1/users/{user_id}/metadata'
```

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
