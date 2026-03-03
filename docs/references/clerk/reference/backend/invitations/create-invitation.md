# createInvitation()

Creates a new [`Invitation`](https://clerk.com/docs/reference/backend/types/backend-invitation.md) for the given email address and sends the invitation email.

If an email address has already been invited or already exists in your application, trying to create a new invitation will return an error. To bypass this error and create a new invitation anyways, set `ignoreExisting` to `true`.

```ts
function createInvitation(params: CreateParams): Promise<Invitation>
```

## `CreateParams`

| Name            | Type                                   | Description                                                                                                                                                                                                                  |
| --------------- | -------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| emailAddress    | string                                 | The email address of the user to invite.                                                                                                                                                                                     |
| redirectUrl?    | string                                 | The full URL or path where the user is redirected upon visiting the invitation link, where they can accept the invitation. Required if you have implemented a custom flow for handling application invitations.              |
| publicMetadata? | UserPublicMetadata                     | Metadata that can be read from both the Frontend API and Backend API, but can be set only from the Backend API. Once the user accepts the invitation and signs up, these metadata will end up in the user's public metadata. |
| notify?         | boolean                                | Whether an email invitation should be sent to the given email address. Defaults to true.                                                                                                                                     |
| ignoreExisting? | boolean                                | Whether an invitation should be created if there is already an existing invitation for this email address, or if the email address already exists in the application. Defaults to false.                                     |
| expiresInDays?  | number                                 | The number of days the invitation will be valid for. By default, the invitation expires after 30 days.                                                                                                                       |
| templateSlug?   | 'invitation' | 'waitlist\_invitation' | The slug of the email template to use for the invitation email. Defaults to invitation.                                                                                                                                      |

## Usage

> Using `clerkClient` varies based on your framework. Refer to the [`JS Backend SDK overview`](https://clerk.com/docs/js-backend/getting-started/quickstart.md) for usage details, including guidance on [`how to access the userId and other properties`](https://clerk.com/docs/js-backend/getting-started/quickstart.md#get-the-user-id-and-other-properties).

```tsx
const response = await clerkClient.invitations.createInvitation({
  emailAddress: 'invite@example.com',
  redirectUrl: 'https://www.example.com/my-sign-up',
  publicMetadata: {
    example: 'metadata',
    example_nested: {
      nested: 'metadata',
    },
  },
})
```

## Example

**Next.js**

```ts {{ filename: 'app/api/example/route.ts' }}
import { clerkClient } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export async function POST() {
  const client = await clerkClient()
  const invitation = await client.invitations.createInvitation({
    emailAddress: 'invite@example.com',
    redirectUrl: 'https://www.example.com/my-sign-up',
    publicMetadata: {
      example: 'metadata',
      example_nested: {
        nested: 'metadata',
      },
    },
  })

  return NextResponse.json({ message: 'Invitation created', invitation })
}
```

## Backend API (BAPI) endpoint

This method in the SDK is a wrapper around the BAPI endpoint `POST/invitations`. See the [BAPI reference](https://clerk.com/docs/reference/backend-api/tag/invitations/post/invitations.md){{ target: '_blank' }} for more information.

Here's an example of making a request directly to the endpoint using cURL.

Replace the email address with the email address you want to invite. Your Clerk Secret Key is already injected into the code snippet.

Replace the email address with the email address you want to invite. Update `YOUR_SECRET_KEY` with your Clerk Secret Key.

```bash {{ filename: 'terminal' }}
curl https://api.clerk.com/v1/invitations -X POST -d '{"email_address": "email@example.com"}' -H "Authorization:Bearer {{secret}}" -H 'Content-Type:application/json'
```

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
