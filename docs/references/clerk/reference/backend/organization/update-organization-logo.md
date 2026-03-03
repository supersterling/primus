# updateOrganizationLogo()

Updates the Organization's logo. Returns an [`Organization`](https://clerk.com/docs/reference/backend/types/backend-organization.md) object.

```ts
function updateOrganizationLogo(
  organizationId: string,
  params: UpdateLogoParams,
): Promise<Organization>
```

## `UpdateLogoParams`

| Name            | Type         | Description                                    |
| --------------- | ------------ | ---------------------------------------------- |
| file            | Blob | File | The file to upload as the Organization's logo. |
| uploaderUserId? | string       | The ID of the user uploading the logo.         |

## Example

> Using `clerkClient` varies based on your framework. Refer to the [`JS Backend SDK overview`](https://clerk.com/docs/js-backend/getting-started/quickstart.md) for usage details, including guidance on [`how to access the userId and other properties`](https://clerk.com/docs/js-backend/getting-started/quickstart.md#get-the-user-id-and-other-properties).

> Using JS Backend SDK methods can contribute towards rate limiting. To set an Organization's logo, it's recommended to use the frontend [`organization.setLogo()`](https://clerk.com/docs/reference/javascript/organization.md#set-logo) method instead.

```tsx
const organizationId = 'org_123'
const uploaderUserId = 'user_123'

const fileBits = ['logo-pic-content']
const fileName = 'logo.png'
const file = new File(fileBits, fileName, { type: 'image/png' })

const params = {
  file,
  uploaderUserId,
}

const response = await clerkClient.organizations.updateOrganizationLogo(organizationId, params)
```

## Backend API (BAPI) endpoint

This method in the SDK is a wrapper around the BAPI endpoint `PUT/organizations/{organization_id}/logo`. See the [BAPI reference](https://clerk.com/docs/reference/backend-api/tag/organizations/put/organizations/%7Borganization_id%7D/logo.md){{ target: '_blank' }} for more information.

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
