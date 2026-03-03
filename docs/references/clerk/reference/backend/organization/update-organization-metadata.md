# updateOrganizationMetadata()

Updates the metadata attributes of an [`Organization`](https://clerk.com/docs/reference/backend/types/backend-organization.md) by merging existing values with the provided parameters. Metadata values will be updated via a "deep" merge - "deep" meaning that any nested JSON objects will be merged as well. You can remove metadata keys at any level by setting their value to `null`.

```ts
function updateOrganizationMetadata(
  organizationId: string,
  params: UpdateOrganizationMetadataParams,
): Promise<Organization>
```

## `UpdateOrganizationMetadataParams`

| Name             | Type                        | Description                                                                                                      |
| ---------------- | --------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| organizationId   | string                      | The ID of the Organization to update.                                                                            |
| publicMetadata?  | OrganizationPublicMetadata  | Metadata that can be read from both the Frontend API and Backend API, but can be set only from the Backend API . |
| privateMetadata? | OrganizationPrivateMetadata | Metadata that is only visible to your Backend API.                                                               |

## Example

> Using `clerkClient` varies based on your framework. Refer to the [`JS Backend SDK overview`](https://clerk.com/docs/js-backend/getting-started/quickstart.md) for usage details, including guidance on [`how to access the userId and other properties`](https://clerk.com/docs/js-backend/getting-started/quickstart.md#get-the-user-id-and-other-properties).

```tsx {{ mark: [[4, 6], 20] }}
const organizationId = 'org_123'

const response = await clerkClient.organizations.updateOrganizationMetadata(organizationId, {
  publicMetadata: {
    example: 'metadata',
  },
})
```

## Backend API (BAPI) endpoint

This method in the SDK is a wrapper around the BAPI endpoint `PATCH/organizations/{organization_id}/metadata`. See the [BAPI reference](https://clerk.com/docs/reference/backend-api/tag/organizations/patch/organizations/%7Borganization_id%7D/metadata.md){{ target: '_blank' }} for more information.

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
