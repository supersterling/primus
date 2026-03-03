# updateOrganizationMembershipMetadata()

Update the metadata attributes of an [`OrganizationMembership`](https://clerk.com/docs/reference/backend/types/backend-organization-membership.md) by merging existing values with the provided parameters. Metadata values will be updated via a "deep" merge - "deep" means that any nested JSON objects will be merged as well. You can remove metadata keys at any level by setting their value to `null`.

```ts
function updateOrganizationMembershipMetadata(
  params: UpdateOrganizationMembershipMetadataParams,
): Promise<OrganizationMembership>
```

## `UpdateOrganizationMembershipMetadataParams`

| Name             | Type                                  | Description                                                                                                     |
| ---------------- | ------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| organizationId   | string                                | The ID of the Organization this membership belongs to.                                                          |
| userId           | string                                | The ID of the user that this membership belongs to.                                                             |
| publicMetadata?  | OrganizationMembershipPublicMetadata  | Metadata that can be read from both the Frontend API and Backend API, but can be set only from the Backend API. |
| privateMetadata? | OrganizationMembershipPrivateMetadata | Metadata that is only visible to your Backend API.                                                              |

## Example

> Using `clerkClient` varies based on your framework. Refer to the [`JS Backend SDK overview`](https://clerk.com/docs/js-backend/getting-started/quickstart.md) for usage details, including guidance on [`how to access the userId and other properties`](https://clerk.com/docs/js-backend/getting-started/quickstart.md#get-the-user-id-and-other-properties).

```tsx {{ mark: [[8, 10], 18] }}
const organizationId = 'org_123'

const userId = 'user_123'

const response = await clerkClient.organizations.updateOrganizationMembershipMetadata({
  organizationId,
  userId,
  publicMetadata: {
    example: 'this value is updated!',
  },
})
```

## Backend API (BAPI) endpoint

This method in the SDK is a wrapper around the BAPI endpoint `PATCH/organizations/{organization_id}/memberships/{user_id}/metadata`. See the [BAPI reference](https://clerk.com/docs/reference/backend-api/tag/organization-memberships/patch/organizations/%7Borganization_id%7D/memberships/%7Buser_id%7D/metadata.md){{ target: '_blank' }} for more information.

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
