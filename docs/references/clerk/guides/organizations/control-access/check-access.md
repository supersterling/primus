# Check Roles and Permissions with Authorization Checks

Authorization checks are checks you perform in your code to determine the access rights and privileges of a user, ensuring they have the necessary Permissions to perform specific actions or access certain content. These checks are essential for protecting sensitive data, gating premium features, and ensuring users stay within their allowed scope of access.

Within Organizations, authorization checks can be performed by checking a user's Roles or Custom Permissions. Roles like `org:admin` determine a user's level of access within an Organization, while Custom Permissions like `org:invoices:create` provide fine-grained control over specific features and actions.

## Examples

For examples on how to perform authorization checks, see the [guide on authorization checks](https://clerk.com/docs/guides/secure/authorization-checks.md).

**Client-side**

You can protect content and even entire routes based on Organization membership, Roles, and Permissions by performing authorization checks.

In the following example, the page is restricted to authenticated users, users who have the `org:admin` Role, and users who belong to the `Acme Corp` Organization.

- The [`Auth`](https://clerk.com/docs/reference/backend/types/auth-object.md) object is used to access the `isSignedIn` property and `has()` method.
- The `isSignedIn` property is used to check if the user is signed in.
- The `has()` method is used to check if the user has the `org:admin` Role.
- The [`useOrganization()`](https://clerk.com/docs/nextjs/reference/hooks/use-organization.md) hook is used to access the organization data.
- The Organization name is checked to ensure it matches the required Organization name. If a user is not in the required Organization, the page will display a message and the [`<OrganizationSwitcher />`](https://clerk.com/docs/nextjs/reference/components/organization/organization-switcher.md) component will be rendered to allow the user to switch to the required Organization.

```tsx {{ filename: 'app/protected/page.tsx' }}
'use client'
import { OrganizationSwitcher, useAuth, useOrganization } from '@clerk/nextjs'

export default function Page() {
  // The `useAuth()` hook gives you access to properties like `isSignedIn` and `has()`
  const { isSignedIn, has } = useAuth()
  const { organization } = useOrganization()

  // Check if the user is authenticated
  if (!isSignedIn) {
    return <p>You must be signed in to access this page.</p>
  }

  // Check if there is an Active Organization
  if (!organization) {
    return (
      <>
        <p>Set an Active Organization to access this page.</p>
        <OrganizationSwitcher />
      </>
    )
  }

  // Check if the user has the `org:admin` Role
  if (!has({ role: 'org:admin' })) {
    return <p>You must be an admin to access this page.</p>
  }

  // Check if Organization name matches (e.g., "Acme Corp")
  const requiredOrgName = 'Acme Corp'
  if (organization.name !== requiredOrgName) {
    return (
      <>
        <p>
          This page is only accessible in the <strong>{requiredOrgName}</strong> Organization.
          Switch to the <strong>{requiredOrgName}</strong> Organization to access this page.
        </p>
        <OrganizationSwitcher />
      </>
    )
  }

  return (
    <p>
      You are currently signed in as an <strong>admin</strong> in the{' '}
      <strong>{organization.name}</strong> Organization.
    </p>
  )
}
```

For more examples on how to perform authorization checks, see the [dedicated guide](https://clerk.com/docs/guides/secure/authorization-checks.md).

**Server-side**

You can protect content and even entire routes based on Organization membership, Roles, and Permissions by performing authorization checks.

In the following example, the page is restricted to authenticated users, users who have the `org:admin` Role, and users who belong to the `Acme Corp` Organization.

- The [`Auth`](https://clerk.com/docs/reference/backend/types/auth-object.md) object is used to access the `isAuthenticated` and `orgId` properties, as well as the `has()` method.
- The `isAuthenticated` property is used to check if the user is authenticated.
- The `orgId` property is used to check if there is an Active Organization.
- The `has()` method is used to check if the user has the `org:admin` Role.
- To fetch the Organization server-side, the [`clerkClient()`](https://clerk.com/docs/reference/nextjs/overview.md#clerk-client) helper is used to access the [`getOrganization()`](https://clerk.com/docs/reference/backend/organization/get-organization.md) method.
- The Organization name is checked to ensure it matches the required Organization name. If a user is not in the required Organization, the page will display a message and the [`<OrganizationSwitcher />`](https://clerk.com/docs/nextjs/reference/components/organization/organization-switcher.md) component will be rendered to allow the user to switch to the required Organization.

This example is written for Next.js App Router, but can be adapted to other frameworks by using the appropriate method for accessing the [`Auth` object](https://clerk.com/docs/reference/backend/types/auth-object.md), and the appropriate initialization for `clerkClient()`.

```tsx {{ filename: 'app/protected/page.tsx' }}
import { auth, clerkClient } from '@clerk/nextjs/server'
import { OrganizationSwitcher } from '@clerk/nextjs'

export default async function Page() {
  // The `Auth` object gives you access to properties like `isAuthenticated` and `userId`
  // Accessing the `Auth` object differs depending on the SDK you're using
  // https://clerk.com/docs/reference/backend/types/auth-object#how-to-access-the-auth-object
  const { isAuthenticated, orgId, has } = await auth()

  // Check if the user is authenticated
  if (!isAuthenticated) {
    return <p>You must be signed in to access this page.</p>
  }

  // Check if there is an Active Organization
  if (!orgId) {
    return (
      <>
        <p>Set an Active Organization to access this page.</p>
        <OrganizationSwitcher />
      </>
    )
  }

  // Check if the user has the `org:admin` Role
  if (!has({ role: 'org:admin' })) {
    return <p>You must be an admin to access this page.</p>
  }

  // To fetch the Active Organization server-side,
  // first initialize the JS Backend SDK.
  // This varies depending on the SDK you're using
  // https://clerk.com/docs/js-backend/getting-started/quickstart
  // Then use the `clerkClient()` to access the `getOrganization()` method
  const client = await clerkClient()
  const organization = await client.organizations.getOrganization({ organizationId: orgId })

  // Check if Organization name matches (e.g., "Acme Corp")
  const requiredOrgName = 'Acme Corp'
  if (organization.name !== requiredOrgName) {
    return (
      <>
        <p>
          This page is only accessible in the <strong>{requiredOrgName}</strong> Organization.
          Switch to the <strong>{requiredOrgName}</strong> Organization to access this page.
        </p>
        <OrganizationSwitcher />
      </>
    )
  }

  return (
    <p>
      You are currently signed in as an <strong>admin</strong> in the{' '}
      <strong>{organization.name}</strong> Organization.
    </p>
  )
}
```

For more examples on how to perform authorization checks, see the [dedicated guide](https://clerk.com/docs/guides/secure/authorization-checks.md).

## Next steps

Now that you know how to check Roles and Permissions, you can:

- [Perform authorization checks](https://clerk.com/docs/guides/secure/authorization-checks.md): Learn how to perform authorization checks to limit access to content or entire routes based on a user's Role or Permissions.
- [Features and Plans](https://clerk.com/docs/guides/billing/for-b2b.md#control-access-with-features-plans-and-permissions): Learn how to check Features and Plans for Subscription-based applications.
- [Set up Roles and Permissions](https://clerk.com/docs/guides/organizations/control-access/roles-and-permissions.md): Learn how to set up Roles and Permissions to control what invited users can access.
- [Configure default Roles](https://clerk.com/docs/guides/organizations/configure.md#default-roles): Learn how to configure default Roles for new Organization members.

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
