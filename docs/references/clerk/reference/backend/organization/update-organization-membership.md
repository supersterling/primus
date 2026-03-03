# updateOrganizationMembership()

Updates a user's [`OrganizationMembership`](https://clerk.com/docs/reference/backend/types/backend-organization-membership.md). Currently, only the role can be updated.

```ts
function updateOrganizationMembership(
  params: UpdateOrganizationMembershipParams,
): Promise<OrganizationMembership>
```

## `UpdateOrganizationMembershipParams`

| Name           | Type   | Description                                            |
| -------------- | ------ | ------------------------------------------------------ |
| organizationId | string | The ID of the Organization this membership belongs to. |
| userId         | string | The ID of the user that this membership belongs to.    |
| role           | string | The Role to assign the user.                           |

## Example

> Using `clerkClient` varies based on your framework. Refer to the [`JS Backend SDK overview`](https://clerk.com/docs/js-backend/getting-started/quickstart.md) for usage details, including guidance on [`how to access the userId and other properties`](https://clerk.com/docs/js-backend/getting-started/quickstart.md#get-the-user-id-and-other-properties).

```tsx {{ mark: [5, 17] }}
const organizationId = 'org_123'

const userId = 'user_123'

const role = 'org:admin'

const response = await clerkClient.organizations.updateOrganizationMembership({
  organizationId,
  userId,
  role,
})
```

## Backend API (BAPI) endpoint

This method in the SDK is a wrapper around the BAPI endpoint `PATCH/organizations/{organization_id}/memberships/{user_id}`. See the [BAPI reference](https://clerk.com/docs/reference/backend-api/tag/organization-memberships/patch/organizations/%7Borganization_id%7D/memberships/%7Buser_id%7D.md){{ target: '_blank' }} for more information.

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
