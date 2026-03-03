# createOrganizationInvitation()

Creates an [`OrganizationInvitation`](https://clerk.com/docs/reference/backend/types/backend-organization-invitation.md) for new users to join an Organization.

```ts
function createOrganizationInvitation(
  params: CreateOrganizationInvitationParams,
): Promise<OrganizationInvitation>
```

## `CreateOrganizationInvitationParams`

| Name            | Type                                 | Description                                                                                                     |
| --------------- | ------------------------------------ | --------------------------------------------------------------------------------------------------------------- |
| organizationId  | string                               | The Organization ID of the Organization a user is being invited to.                                             |
| inviterUserId   | string | null                       | The user ID of the user creating the invitation.                                                                |
| emailAddress    | string                               | The email address to send the invitation to.                                                                    |
| role            | string                               | The Role to assign the invited user within the Organization.                                                    |
| redirectUrl?    | string                               | The full URL or path where users will land once the Organization invitation has been accepted.                  |
| publicMetadata? | OrganizationInvitationPublicMetadata | Metadata that can be read from both the Frontend API and Backend API, but can be set only from the Backend API. |

## Example

> Using `clerkClient` varies based on your framework. Refer to the [`JS Backend SDK overview`](https://clerk.com/docs/js-backend/getting-started/quickstart.md) for usage details, including guidance on [`how to access the userId and other properties`](https://clerk.com/docs/js-backend/getting-started/quickstart.md#get-the-user-id-and-other-properties).

```tsx
const organizationId = 'org_123'

const inviterUserId = 'user_123'

const emailAddress = 'testclerk123@clerk.dev'

const role = 'org:member'

const response = await clerkClient.organizations.createOrganizationInvitation({
  organizationId,
  inviterUserId,
  emailAddress,
  role,
})
```

## Backend API (BAPI) endpoint

This method in the SDK is a wrapper around the BAPI endpoint `POST/organizations/{organization_id}/invitations`. See the [BAPI reference](https://clerk.com/docs/reference/backend-api/tag/organization-invitations/post/organizations/%7Borganization_id%7D/invitations.md){{ target: '_blank' }} for more information.

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
