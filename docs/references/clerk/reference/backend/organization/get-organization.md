# getOrganization()

Retrieves a single [`Organization`](https://clerk.com/docs/reference/backend/types/backend-organization.md).

```ts
function getOrganization(params: GetOrganizationParams): Promise<Organization>
```

## `GetOrganizationParams`

| Name                   | Type   | Description                                                                          |
| ---------------------- | ------ | ------------------------------------------------------------------------------------ |
| organizationId | slug | string | The ID of the Organization to retrieve, or the slug of the Organization to retrieve. |

## Usage

> Using `clerkClient` varies based on your framework. Refer to the [`JS Backend SDK overview`](https://clerk.com/docs/js-backend/getting-started/quickstart.md) for usage details, including guidance on [`how to access the userId and other properties`](https://clerk.com/docs/js-backend/getting-started/quickstart.md#get-the-user-id-and-other-properties).

### Retrieve by ID

```tsx
const organizationId = 'org_123'

const response = await clerkClient.organizations.getOrganization({ organizationId })
```

### Retrieve by slug

Retrieve an Organization by its slug instead of its ID.

```tsx
const slug = 'my-organization-slug'

const response = await clerkClient.organizations.getOrganization({ slug })
```

## Example

To use the `getOrganization()` method, you first need to initialize the [`clerkClient()`](https://clerk.com/docs/js-backend/getting-started/quickstart.md) helper. Then, you need to get the Active Organization's ID which you can access from the [`Auth`](https://clerk.com/docs/reference/backend/types/auth-object.md) object. Finally, you can pass the Organization ID to the `getOrganization()` method to get the [`Organization`](https://clerk.com/docs/reference/backend/types/backend-organization.md) object.

**If your SDK isn't listed, use the comments in the example to help you adapt it to your SDK.**

**Next.js**

```tsx {{ filename: 'app/page.tsx' }}
import { useOrganization, useOrganizationList } from '@clerk/nextjs'
import { auth, clerkClient } from '@clerk/nextjs/server'

export default async function Home() {
  // Accessing the `Auth` object differs depending on the SDK you're using
  // https://clerk.com/docs/reference/backend/types/auth-object#how-to-access-the-auth-object
  const { isAuthenticated, orgId, orgRole } = await auth()

  // Check if user is authenticated
  if (!isAuthenticated) return <p>You must be signed in to access this page.</p>

  // Check if there is an Active Organization
  if (!orgId) return <p>Set an Active Organization to access this page.</p>

  // Initialize the JS Backend SDK
  // This varies depending on the SDK you're using
  // https://clerk.com/docs/js-backend/getting-started/quickstart
  const client = await clerkClient()

  // Use the `getOrganization()` method to get the Backend `Organization` object
  const organization = await client.organizations.getOrganization({ organizationId: orgId })

  return (
    <div>
      <h1>Welcome to the {organization.name} organization</h1>
      <p>Your role in this organization: {orgRole}</p>
    </div>
  )
}
```

## Backend API (BAPI) endpoint

This method in the SDK is a wrapper around the BAPI endpoint `GET/organizations/{organization_id}`. See the [BAPI reference](https://clerk.com/docs/reference/backend-api/tag/organizations/get/organizations/%7Borganization_id%7D.md){{ target: '_blank' }} for more information.

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
