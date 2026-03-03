# getOrganizationInvitation()

Retrieves an [`OrganizationInvitation`](https://clerk.com/docs/reference/backend/types/backend-organization-invitation.md).

```ts
function getOrganizationInvitation(
  params: GetOrganizationInvitationParams,
): Promise<OrganizationInvitation>
```

## `GetOrganizationInvitationParams`

| Name           | Type   | Description                                            |
| -------------- | ------ | ------------------------------------------------------ |
| organizationId | string | The ID of the Organization that the invitation is for. |
| invitationId   | string | The ID of the invitation to retrieve.                  |

## Example

> Using `clerkClient` varies based on your framework. Refer to the [`JS Backend SDK overview`](https://clerk.com/docs/js-backend/getting-started/quickstart.md) for usage details, including guidance on [`how to access the userId and other properties`](https://clerk.com/docs/js-backend/getting-started/quickstart.md#get-the-user-id-and-other-properties).

```tsx
const organizationId = 'org_123'

const invitationId = 'orginv_123'

const response = await clerkClient.organizations.getOrganizationInvitation({
  organizationId,
  invitationId,
})
```

## Backend API (BAPI) endpoint

This method in the SDK is a wrapper around the BAPI endpoint `GET/organizations/{organization_id}/invitations/{invitation_id}`. See the [BAPI reference](https://clerk.com/docs/reference/backend-api/tag/organization-invitations/get/organizations/%7Borganization_id%7D/invitations/%7Binvitation_id%7D.md){{ target: '_blank' }} for more information.

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
