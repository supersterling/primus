# deleteOrganization()

Deletes an [`Organization`](https://clerk.com/docs/reference/backend/types/backend-organization.md). Returns a [`DeletedObjectResource`](https://clerk.com/docs/reference/javascript/types/deleted-object-resource.md) object.

```ts
function deleteOrganization(organizationId: string): Promise<DeletedObjectResource>
```

## Parameters

| Name           | Type   | Description                           |
| -------------- | ------ | ------------------------------------- |
| organizationId | string | The ID of the Organization to delete. |

## Example

> Using `clerkClient` varies based on your framework. Refer to the [`JS Backend SDK overview`](https://clerk.com/docs/js-backend/getting-started/quickstart.md) for usage details, including guidance on [`how to access the userId and other properties`](https://clerk.com/docs/js-backend/getting-started/quickstart.md#get-the-user-id-and-other-properties).

```tsx
const organizationId = 'org_123'

const response = await clerkClient.organizations.deleteOrganization(organizationId)
```

## Backend API (BAPI) endpoint

This method in the SDK is a wrapper around the BAPI endpoint `DELETE/organizations/{organization_id}`. See the [BAPI reference](https://clerk.com/docs/reference/backend-api/tag/organizations/delete/organizations/%7Borganization_id%7D.md){{ target: '_blank' }} for more information.

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
