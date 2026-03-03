# revokeInvitation()

Revokes an [`Invitation`](https://clerk.com/docs/reference/backend/types/backend-invitation.md).

Revoking an invitation makes the invitation email link unusable. However, it doesn't prevent the user from signing up if they follow the sign up flow.

Only active (i.e. non-revoked) invitations can be revoked.

```ts
function revokeInvitation(invitationId: string): Promise<Invitation>
```

## Parameters

| Name         | Type   | Description                         |
| ------------ | ------ | ----------------------------------- |
| invitationId | string | The ID of the invitation to revoke. |

## Usage

> Using `clerkClient` varies based on your framework. Refer to the [`JS Backend SDK overview`](https://clerk.com/docs/js-backend/getting-started/quickstart.md) for usage details, including guidance on [`how to access the userId and other properties`](https://clerk.com/docs/js-backend/getting-started/quickstart.md#get-the-user-id-and-other-properties).

```tsx
const invitationId = 'inv_123'

const response = await clerkClient.invitations.revokeInvitation(invitationId)
```

## Example

**Next.js**

```ts {{ filename: 'app/api/example/route.ts' }}
import { clerkClient } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export async function POST() {
  const client = await clerkClient()
  const invitation = await client.invitations.revokeInvitation({
    invitationId: 'invitation_123',
  })

  return NextResponse.json({ message: 'Invitation revoked' })
}
```

## Backend API (BAPI) endpoint

This method in the SDK is a wrapper around the BAPI endpoint `POST/invitations/{invitation_id}/revoke`. See the [BAPI reference](https://clerk.com/docs/reference/backend-api/tag/invitations/post/invitations/%7Binvitation_id%7D/revoke.md){{ target: '_blank' }} for more information.

Here's an example of making a request directly to the endpoint using cURL.

Replace the `<invitation_id>` with the ID of the invitation you want to revoke. Your Secret Key is already injected into the code snippet.

Replace the `<invitation_id>` with the ID of the invitation you want to revoke and replace `YOUR_SECRET_KEY` with your Clerk Secret Key.

```bash {{ filename: 'terminal' }}
curl https://api.clerk.com/v1/invitations/<invitation_id>/revoke -X POST -H "Authorization:Bearer {{secret}}" -H 'Content-Type:application/json'
```

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
