# createOrganizationInvitationBulk()

Creates multiple [`OrganizationInvitation`](https://clerk.com/docs/reference/backend/types/backend-organization-invitation.md)s in bulk for new users to join an Organization.

```ts
function createOrganizationInvitationBulk(
  organizationId: string,
  params: CreateBulkOrganizationInvitationParams,
): Promise<OrganizationInvitation>
```

## Parameters

`createOrganizationInvitationBulk()` accepts the following parameters:

| Name           | Type                                      | Description                                                          |
| -------------- | ----------------------------------------- | -------------------------------------------------------------------- |
| organizationId | string                                    | The Organization ID of the Organization you want to invite users to. |
| params         | CreateBulkOrganizationInvitationParams[] | An array of objects, each representing a single invitation.          |

### `CreateBulkOrganizationInvitationParams`

| Name            | Type                                 | Description                                                                                                     |
| --------------- | ------------------------------------ | --------------------------------------------------------------------------------------------------------------- |
| inviterUserId   | string | null                       | The user ID of the user creating the invitation.                                                                |
| emailAddress    | string                               | The email address to send the invitation to.                                                                    |
| role            | OrganizationCustomRoleKey            | The Role to assign the invited user within the Organization.                                                    |
| redirectUrl?    | string                               | The full URL or path where users will land once the Organization invitation has been accepted.                  |
| publicMetadata? | OrganizationInvitationPublicMetadata | Metadata that can be read from both the Frontend API and Backend API, but can be set only from the Backend API. |

## Example

> Using `clerkClient` varies based on your framework. Refer to the [`JS Backend SDK overview`](https://clerk.com/docs/js-backend/getting-started/quickstart.md) for usage details, including guidance on [`how to access the userId and other properties`](https://clerk.com/docs/js-backend/getting-started/quickstart.md#get-the-user-id-and-other-properties).

```tsx
const organizationId = 'org_123'
// Each object in the array represents a single invitation
const params = [
  {
    inviterUserId: 'user_1',
    emailAddress: 'testclerk1@clerk.dev',
    role: 'org:admin',
  },
  {
    inviterUserId: 'user_2',
    emailAddress: 'testclerk2@clerk.dev',
    role: 'org:member',
  },
]

const response = await clerkClient.organizations.createOrganizationInvitationBulk(
  organizationId,
  params,
)
```

## Backend API (BAPI) endpoint

This method in the SDK is a wrapper around the BAPI endpoint `POST/organizations/{organization_id}/invitations/bulk`. See the [BAPI reference](https://clerk.com/docs/reference/backend-api/tag/organization-invitations/post/organizations/%7Borganization_id%7D/invitations/bulk.md){{ target: '_blank' }} for more information.

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
