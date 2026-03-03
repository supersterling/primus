# Invite users to your Organization

Organization invitations let you add new members to your Organization. When you send an invitation, Clerk sends an email to the invited user with a unique invitation link. When the user visits the Organization invitation link, Clerk redirects them to the [Account Portal sign-in page](https://clerk.com/docs/guides/account-portal/overview.md#sign-in). If the user is already signed in, Clerk redirects them to your application's homepage (`/`). If you want to redirect the user to a specific page in your application, you can [specify a redirect URL when creating the invitation](#redirect-url).

By default, only [admins](https://clerk.com/docs/guides/organizations/control-access/roles-and-permissions.md#default-roles) can invite users to an Organization.

This feature requires that [**Email** is enabled](https://clerk.com/docs/guides/configure/auth-strategies/sign-up-sign-in-options.md#email), as Clerk uses the user's email address to send the invitation. You can still disable **Email** as a sign-in option if you do not want users to be able to sign-in with their email address.

To configure your application's **Email** settings, navigate to the [**User & authentication**](https://dashboard.clerk.com/~/user-authentication/user-and-authentication) page in the Clerk Dashboard.

## When to use invitations

Invitations work well when you need precise control over who joins your Organization and which Role they receive. This approach fits scenarios where:

- Teams are small and members are known in advance.
- Onboarding requires manual approval or review.
- Specific Roles need to be assigned during the invitation.

If you want to streamline enrollment for users with company email addresses, consider [Verified Domains](https://clerk.com/docs/guides/organizations/add-members/verified-domains.md), which can automatically invite users based on their email domain. If customers require centralized authentication through their Identity Provider, use [Enterprise SSO](https://clerk.com/docs/guides/organizations/add-members/sso.md).

## Create an invitation

Clerk's [`prebuilt components`](https://clerk.com/docs/nextjs/reference/components/overview.md) and [Account Portal pages](https://clerk.com/docs/guides/account-portal/overview.md) manage all Organization invitation flows, including creating, managing, and accepting invitations.

However, if you want to build custom flows, see the following sections.

### Client-side

To create an Organization invitation on the client-side, see the [dedicated guide](https://clerk.com/docs/guides/development/custom-flows/organizations/manage-organization-invitations.md). Note that this uses the [`organizations.inviteMember()`](https://clerk.com/docs/reference/javascript/organization.md#invite-member) method, which does not let you specify a redirect URL; it will always redirect to the Account Portal sign-in page. If you want to specify a redirect URL, you must create the invitation on the server-side.

### Server-side

To create Organization invitations on the server-side, use the [Backend API](https://clerk.com/docs/reference/backend-api/tag/organization-invitations/post/organizations/%7Borganization_id%7D/invitations.md){{ target: '_blank' }} either by using a cURL command or the [`JS Backend SDK`](https://clerk.com/docs/js-backend/getting-started/quickstart.md). The JS Backend SDK is a wrapper around the Backend API that makes it easier to interact with the API.

Use the following tabs to see examples for each method.

**cURL**

The following example demonstrates how to create an Organization invitation using cURL.

- Your Secret Key is already injected into the code snippet.
- Replace the `org_123` with the ID of the Organization you want to invite the user to.
- Replace the `user_123` with the ID of the user who is inviting the other user.
- Replace the email address with the email address you want to invite.
- Replace the `role` with the role you want to assign to the invited user.

* Replace `YOUR_SECRET_KEY` with your Clerk Secret Key.
* Replace the `org_123` with the ID of the Organization you want to invite the user to.
* Replace the `user_123` with the ID of the user who is inviting the other user.
* Replace the email address with the email address you want to invite.
* Replace the `role` with the Role you want to assign to the invited user.

```bash {{ filename: 'terminal' }}
curl 'https://api.clerk.com/v1/organizations/{org_123}/invitations' \
-X POST \
-H 'Authorization: Bearer {{secret}}' \
-H 'Content-Type: application/json' \
-d '{ "inviter_user_id": "user_123", "email_address": "email@example.com", "role": "org:member" }'
```

**JS Backend SDK**

To use the JS Backend SDK to create an invitation, see the [`createOrganizationInvitation()`](https://clerk.com/docs/reference/backend/organization/create-organization-invitation.md) reference documentation.

For an example of the response, see the [Backend API reference](https://clerk.com/docs/reference/backend-api/tag/organization-invitations/post/organizations/%7Borganization_id%7D/invitations.md){{ target: '_blank' }}.

### Redirect URL

When you create an invitation, you can specify a `redirect_url` parameter. This parameter tells Clerk where to redirect the user when they visit the invitation link.

The following example demonstrates how to use cURL to create an invitation with the `redirect_url` set to `https://www.example.com/accept-invitation`.

```bash
curl 'https://api.clerk.com/v1/organizations/{org_123}/invitations' \
  -X POST \
  -H 'Authorization: Bearer {{secret}}' \
  -H 'Content-Type: application/json' \
  -d '{ "inviter_user_id": "user_123", "email_address": "email@example.com", "role": "org:member", "redirect_url": "https://www.example.com/accept-invitation" }'
```

Once the user visits the invitation link, they will be redirected to the page you specified. On that page, you must handle the authentication flow in your code. You can either embed the [`<SignIn />`](https://clerk.com/docs/nextjs/reference/components/authentication/sign-in.md) component or, if the prebuilt component doesn't meet your needs or you require more control over the logic, you can build a [custom flow](https://clerk.com/docs/guides/development/custom-flows/organizations/accept-organization-invitations.md).

> To test redirect URLs in your development environment, pass your port. For example, `http://localhost:3000/accept-invitation`.

### Invitation metadata

You can also add metadata to an invitation when creating the invitation through the Backend API. Once the invited user signs up using the invitation link, Clerk stores the **invitation** metadata (`OrganizationInvitation.publicMetadata`) in the Organization **membership's** metadata (`OrganizationMembership.publicMetadata`). For more details on Organization membership metadata, see the [OrganizationMembership](https://clerk.com/docs/reference/javascript/types/organization-membership.md) reference.

To add metadata to an invitation, add the `public_metadata` parameter when creating the invitation.

The following example demonstrates how to use cURL to create an invitation with metadata.

```bash
curl 'https://api.clerk.com/v1/organizations/{org_123}/invitations' \
  -X POST \
  -H 'Authorization: Bearer {{secret}}' \
  -H 'Content-Type: application/json' \
  -d '{ "inviter_user_id": "user_123", "email_address": "email@example.com", "role": "org:member", "public_metadata": {"department": "marketing"} }'
```

## Revoke an invitation

Revoking an invitation prevents the user from using the invitation link that was sent to them.

### Client-side

To revoke an invitation client-side, see the [dedicated guide](https://clerk.com/docs/guides/development/custom-flows/organizations/manage-organization-invitations.md).

### Server-side

To revoke an invitation server-side, use the [Backend API](https://clerk.com/docs/reference/backend-api/tag/organization-invitations/post/organizations/%7Borganization_id%7D/invitations/%7Binvitation_id%7D/revoke.md){{ target: '_blank' }}. either by using a cURL command or the [`JS Backend SDK`](https://clerk.com/docs/js-backend/getting-started/quickstart.md). The JS Backend SDK is a wrapper around the Backend API that makes it easier to interact with the API.

Use the following tabs to see examples for each method.

**cURL**

The following example demonstrates how to revoke an invitation using cURL.

- Your Secret Key is already injected into the code snippet.
- Replace the `inv_123` with the ID of the invitation you want to revoke.
- Replace the `user_123` with the ID of the user who is revoking the invitation.

* Replace `YOUR_SECRET_KEY` with your Clerk Secret Key.
* Replace the `inv_123` with the ID of the invitation you want to revoke.
* Replace the `user_123` with the ID of the user who is revoking the invitation.

```bash {{ filename: 'terminal' }}
curl 'https://api.clerk.com/v1/organizations/{org_123}/invitations/{inv_123}/revoke' \
  -X POST \
  -H 'Authorization: Bearer {{secret}}' \
  -H 'Content-Type: application/json' \
  -d '{ "requesting_user_id": "user_123" }'
```

**JS Backend SDK**

To use the JS Backend SDK to revoke an Organization invitation, see the [`revokeOrganizationInvitation()`](https://clerk.com/docs/reference/backend/organization/revoke-organization-invitation.md) reference documentation.

## Next steps

Now that you understand how to invite users to your Organization, you can:

- [Configure Verified Domains](https://clerk.com/docs/guides/organizations/configure.md): Learn how to configure Verified Domains to automatically invite users based on their email domain.
- [Set up Enterprise SSO Connections](https://clerk.com/docs/guides/organizations/add-members/sso.md): Learn how to set up Enterprise SSO Connections for centralized authentication through an Identity Provider.
- [Set up Roles and Permissions](https://clerk.com/docs/guides/organizations/control-access/roles-and-permissions.md): Learn how to set up Roles and Permissions to control what invited users can access.
- [Add metadata to invitations](https://clerk.com/docs/guides/organizations/metadata.md): Learn how to add metadata to invitations for tracking or custom workflows.

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
