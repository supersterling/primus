# updateOrganization()

Updates an [`Organization`](https://clerk.com/docs/reference/backend/types/backend-organization.md).

```ts
function updateOrganization(params: UpdateOrganizationParams): Promise<Organization>
```

## `UpdateOrganizationParams`

| Name                   | Type                        | Description                                                                                                                                                                                                                      |
| ---------------------- | --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| organizationId         | string                      | The Organization ID of the Organization being updated.                                                                                                                                                                           |
| name?                  | string                      | The updated name of the Organization.                                                                                                                                                                                            |
| slug?                  | string                      | The updated slug of the Organization.                                                                                                                                                                                            |
| publicMetadata?        | OrganizationPublicMetadata  | Metadata that can be read from both the Frontend API and Backend API, but can be set only from the Backend API. Updating this property will override the existing metadata. To merge metadata, use updateOrganizationMetadata(). |
| privateMetadata?       | OrganizationPrivateMetadata | Metadata that is only visible to your Backend API. Updating this property will override the existing metadata. To merge metadata, use updateOrganizationMetadata().                                                              |
| maxAllowedMemberships? | number                      | The maximum number of memberships allowed in the Organization. Setting this value to 0 removes any limit, allowing an unlimited number of memberships.                                                                           |

## Example

> Using `clerkClient` varies based on your framework. Refer to the [`JS Backend SDK overview`](https://clerk.com/docs/js-backend/getting-started/quickstart.md) for usage details, including guidance on [`how to access the userId and other properties`](https://clerk.com/docs/js-backend/getting-started/quickstart.md#get-the-user-id-and-other-properties).

```tsx {{ mark: [3, 11] }}
const organizationId = 'org_123'

const name = 'Test Updated'

const response = await clerkClient.organizations.updateOrganization(organizationId, { name })
```

## Backend API (BAPI) endpoint

This method in the SDK is a wrapper around the BAPI endpoint `PATCH/organizations/{organization_id}`. See the [BAPI reference](https://clerk.com/docs/reference/backend-api/tag/organizations/patch/organizations/%7Borganization_id%7D.md){{ target: '_blank' }} for more information.

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
