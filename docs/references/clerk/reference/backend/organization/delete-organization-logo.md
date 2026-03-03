# deleteOrganizationLogo()

Deletes an Organization's logo.

```ts
function deleteOrganizationLogo(organizationId: string): Promise<Organization>
```

## Parameters

| Name           | Type   | Description                                                    |
| -------------- | ------ | -------------------------------------------------------------- |
| organizationId | string | The ID of the Organization for which the logo will be deleted. |

## Example

> Using `clerkClient` varies based on your framework. Refer to the [`JS Backend SDK overview`](https://clerk.com/docs/js-backend/getting-started/quickstart.md) for usage details, including guidance on [`how to access the userId and other properties`](https://clerk.com/docs/js-backend/getting-started/quickstart.md#get-the-user-id-and-other-properties).

```tsx
const organizationId = 'org_123'

const response = await clerkClient.organizations.deleteOrganizationLogo(organizationId)

console.log(response)
```

## Backend API (BAPI) endpoint

This method in the SDK is a wrapper around the BAPI endpoint `DELETE/organizations/{organization_id}/logo`. See the [BAPI reference](https://clerk.com/docs/reference/backend-api/tag/organizations/delete/organizations/%7Borganization_id%7D/logo.md){{ target: '_blank' }} for more information.

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
