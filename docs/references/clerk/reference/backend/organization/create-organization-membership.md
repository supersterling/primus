# createOrganizationMembership()

Creates a membership to an Organization for a user directly (circumventing the need for an invitation). Returns a [`OrganizationMembership`](https://clerk.com/docs/reference/backend/types/backend-organization-membership.md) object.

```ts
function createOrganizationMembership(
  params: CreateOrganizationMembershipParams,
): Promise<OrganizationMembership>
```

## `CreateOrganizationMembershipParams`

| Name           | Type   | Description                                                |
| -------------- | ------ | ---------------------------------------------------------- |
| organizationId | string | The ID of the Organization the user is being added to.     |
| userId         | string | The ID of the user to be added to the Organization.        |
| role           | string | The Role to assign the added user within the Organization. |

## Example

> Using `clerkClient` varies based on your framework. Refer to the [`JS Backend SDK overview`](https://clerk.com/docs/js-backend/getting-started/quickstart.md) for usage details, including guidance on [`how to access the userId and other properties`](https://clerk.com/docs/js-backend/getting-started/quickstart.md#get-the-user-id-and-other-properties).

In the following example, an [`OrganizationMembership`](https://clerk.com/docs/reference/backend/types/backend-organization-membership.md) is created for a user with the Role `org:member`.

```tsx
const organizationId = 'org_123'

const userId = 'user_123'

const role = 'org:member'

const response = await clerkClient.organizations.createOrganizationMembership({
  organizationId,
  userId,
  role,
})
```

## Backend API (BAPI) endpoint

This method in the SDK is a wrapper around the BAPI endpoint `POST/organizations/{organization_id}/memberships`. See the [BAPI reference](https://clerk.com/docs/reference/backend-api/tag/organization-memberships/post/organizations/%7Borganization_id%7D/memberships.md){{ target: '_blank' }} for more information.

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
