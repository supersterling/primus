# createOrganization()

Creates an [`Organization`](https://clerk.com/docs/reference/backend/types/backend-organization.md).

```ts
function createOrganization(params: CreateParams): Promise<Organization>
```

## `CreateParams`

| Name                   | Type                        | Description                                                                                                                                            |
| ---------------------- | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| name                   | string                      | Name of the Organization.                                                                                                                              |
| createdBy              | string                      | The user ID for the user creating the Organization. The user will become an administrator for the Organization.                                        |
| slug?                  | string                      | Slug of the Organization.                                                                                                                              |
| publicMetadata?        | OrganizationPublicMetadata  | Metadata that can be read from both the Frontend API and Backend API, but can be set only from the Backend API.                                        |
| privateMetadata?       | OrganizationPrivateMetadata | Metadata that is only visible to your Backend API.                                                                                                     |
| maxAllowedMemberships? | number                      | The maximum number of memberships allowed in the Organization. Setting this value to 0 removes any limit, allowing an unlimited number of memberships. |

## Example

> Using `clerkClient` varies based on your framework. Refer to the [`JS Backend SDK overview`](https://clerk.com/docs/js-backend/getting-started/quickstart.md) for usage details, including guidance on [`how to access the userId and other properties`](https://clerk.com/docs/js-backend/getting-started/quickstart.md#get-the-user-id-and-other-properties).

```tsx
const name = 'test-org'

const createdBy = 'user_123'

const response = await clerkClient.organizations.createOrganization({ name, createdBy })
```

## Backend API (BAPI) endpoint

This method in the SDK is a wrapper around the BAPI endpoint `POST/organizations`. See the [BAPI reference](https://clerk.com/docs/reference/backend-api/tag/organizations/post/organizations.md){{ target: '_blank' }} for more information.

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
