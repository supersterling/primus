# Invite users to your application

Inviting users to your Clerk application allows you to onboard new users seamlessly by sending them a unique invitation link.

Once you create an invitation, Clerk sends an email to the invited user with a unique invitation link. When the user visits the invitation link, they will be redirected to the [Account Portal sign-up page](https://clerk.com/docs/guides/account-portal/overview.md#sign-up) and **their email address will be automatically verified.** If you want to redirect the user to a specific page in your application, you can [specify a redirect URL when creating the invitation](#with-a-redirect-url).

Invitations expire after a month. If the user clicks on an expired invitation, they will get redirected to the application's sign-up page and will have to go through the normal sign-up flow. Their email address will not be auto-verified.

> Invitations are only used to invite users to your application. The application will still be available to everyone even without an invitation. If you're looking to restrict access to invited users only, refer to the [**Restricted** sign-up mode](https://clerk.com/docs/guides/secure/restricting-access.md#sign-up-modes).

## Create an invitation

You can create an invitation either in the [Clerk Dashboard](#in-the-clerk-dashboard) or [programmatically](#programmatically). When making this decision, keep in mind that if you create an invitation through the Clerk Dashboard, you can only set an invitation expiration date. If you create an invitation programatically, you are able to set more options, such as the URL you want the user to be redirected to after they accept the invitation, metadata to add to the invitation, or whether an invitation should be created if there is already an existing invitation for the given email address.

### In the Clerk Dashboard

To create an invitation in the Clerk Dashboard, navigate to the [**Invitations**](https://dashboard.clerk.com/~/users/invitations) page.

### Programmatically

To create an invitation programmatically, you can either [make a request directly to Clerk's Backend API](https://clerk.com/docs/reference/backend/invitations/create-invitation.md#backend-api-bapi-endpoint) or use the [`createInvitation()`](https://clerk.com/docs/reference/backend/invitations/create-invitation.md) method as shown in the following example.

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

See the [Backend API reference](https://clerk.com/docs/reference/backend-api/tag/invitations/post/invitations.md){{ target: '_blank' }} for an example of the response.

### With a redirect URL

> You currently cannot specify a redirect URL when creating an invitation in the Clerk Dashboard; if you need to specify a redirect URL, you need to create the invitation programmatically.

When you create an invitation programmatically, you can specify a `redirectUrl` parameter. This parameter tells Clerk where to redirect the user when they visit the invitation link.

Once the user visits the invitation link, they will be redirected to the page you specified, which means **you must handle the sign-up flow in your code for that page**. You can either embed the [`<SignUp />`](https://clerk.com/docs/nextjs/reference/components/authentication/sign-up.md) component on that page, or if the prebuilt component doesn't meet your specific needs or if you require more control over the logic, you can build a [custom flow](https://clerk.com/docs/guides/development/custom-flows/authentication/application-invitations.md).

> - To test redirect URLs in your development environment, pass your port (e.g. `http://localhost:3000`).
> - To use the Account Portal, pass the URL provided by Clerk on the [**Account Portal**](https://dashboard.clerk.com/~/account-portal) page in the Clerk Dashboard. For example, `https://prepared-phoenix-98.accounts.dev/sign-up` redirects the user to the Account Portal sign-up page.

### With invitation metadata

When you create an invitation programmatically, you can specify a `publicMetadata` parameter to add metadata to an invitation. Once the invited user signs up using the invitation link, the invitation metadata will end up in the user's public metadata. [Learn more about user metadata](https://clerk.com/docs/guides/users/extending.md).

## Revoke an invitation

You can revoke an invitation at any time. Revoking an invitation prevents the user from using the invitation link that was sent to them. You can revoke an invitation in the [Clerk Dashboard](#in-the-clerk-dashboard-2) or [programmatically](#programmatically-2).

> Revoking an invitation does **not** prevent the user from signing up on their own. If you're looking to restrict access to invited users only, refer to the [**Restricted** sign-up mode](https://clerk.com/docs/guides/secure/restricting-access.md#sign-up-modes).

### In the Clerk Dashboard

To revoke an invitation in the Clerk Dashboard, navigate to the [**Invitations**](https://dashboard.clerk.com/~/users/invitations) page.

### Programmatically

To revoke an invitation programmatically, you can either [make a request directly to Clerk's Backend API](https://clerk.com/docs/reference/backend/invitations/revoke-invitation.md#backend-api-bapi-endpoint) or use the [`revokeInvitation()`](https://clerk.com/docs/reference/backend/invitations/revoke-invitation.md) method as shown in the following example.

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

See the [Backend API reference](https://clerk.com/docs/reference/backend-api/tag/invitations/post/invitations/%7Binvitation_id%7D/revoke.md){{ target: '_blank' }} for an example of the response.

## Custom flow

Clerk's [`prebuilt components`](https://clerk.com/docs/nextjs/reference/components/overview.md) and [Account Portal pages](https://clerk.com/docs/guides/account-portal/overview.md) handle the sign-up flow for you, including the invitation flow. If Clerk's prebuilt components don't meet your specific needs or if you require more control over the logic, you can rebuild the existing Clerk flows using the Clerk API. For more information, see the [custom flow for application invitations](https://clerk.com/docs/guides/development/custom-flows/authentication/application-invitations.md).

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
