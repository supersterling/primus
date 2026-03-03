# deleteOrganizationMembership()

Removes a user from the specified Organization. Returns a [`OrganizationMembership`](https://clerk.com/docs/reference/backend/types/backend-organization-membership.md) object.

```ts
function deleteOrganizationMembership(
  params: DeleteOrganizationMembershipParams,
): Promise<OrganizationMembership>
```

## `DeleteOrganizationMembershipParams`

| Name           | Type   | Description                                               |
| -------------- | ------ | --------------------------------------------------------- |
| organizationId | string | The ID of the Organization the user will be removed from. |
| userId         | string | The ID of the user to be removed from the Organization.   |

## Example

> Using `clerkClient` varies based on your framework. Refer to the [`JS Backend SDK overview`](https://clerk.com/docs/js-backend/getting-started/quickstart.md) for usage details, including guidance on [`how to access the userId and other properties`](https://clerk.com/docs/js-backend/getting-started/quickstart.md#get-the-user-id-and-other-properties).

```tsx
const organizationId = 'org_123'

const userId = 'user_123'

const response = await clerkClient.organizations.deleteOrganizationMembership({
  organizationId,
  userId,
})
```

## Backend API (BAPI) endpoint

This method in the SDK is a wrapper around the BAPI endpoint `DELETE/organizations/{organization_id}/memberships/{user_id}`. See the [BAPI reference](https://clerk.com/docs/reference/backend-api/tag/organization-memberships/delete/organizations/%7Borganization_id%7D/memberships/%7Buser_id%7D.md){{ target: '_blank' }} for more information.

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
