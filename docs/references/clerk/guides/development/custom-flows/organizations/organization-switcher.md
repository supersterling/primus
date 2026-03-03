# Build a custom flow for switching Organizations

> This guide is for users who want to build a custom flow. To use a _prebuilt_ UI, use the [Account Portal pages](https://clerk.com/docs/guides/account-portal/overview.md) or [`prebuilt components`](https://clerk.com/docs/nextjs/reference/components/overview.md).

This guide will demonstrate how to use the Clerk API to build a custom flow for switching between Organizations.

Two examples are provided: one for a paginated list and one for an infinite list.

The following examples:

1. Use the [`useOrganizationList()`](https://clerk.com/docs/nextjs/reference/hooks/use-organization-list.md) hook to get `memberships`, which is a list of the current user's Organization memberships. `memberships` returns `data`, which is an array of [`OrganizationMembership`](https://clerk.com/docs/reference/javascript/types/organization-membership.md) objects.
2. Map over the `data` array to display the user's Organization memberships in a table, providing a button that calls `setActive()` to set the selected Organization as the Active Organization.
   - If there are no Organizations, the [`<CreateOrganization />` component (custom-flow version, not the Clerk component)](https://clerk.com/docs/guides/development/custom-flows/organizations/create-organizations.md) is rendered to allow the user to create an Organization.

The difference between the two examples is the parameters passed to the `useOrganizationList()` hook in order to determine how the list is paginated.

- The "Paginated list" example provides a button to load more Organizations if there are more available. The `data` array is paginated and will only return the first 5 results, so the `fetchNext()` method is used to load more Organizations if they are available.
- The "Infinite list" example sets the `infinite` option to `true` to enable infinite results.

**This example is written for Next.js App Router but it can be adapted for any React-based framework, such as React Router or Tanstack React Start.**

**Paginated list**

```jsx {{ filename: 'app/components/CustomOrganizationSwitcher.tsx', collapsible: true }}
'use client'

import { useAuth, useOrganizationList } from '@clerk/nextjs'
import CreateOrganization from '../components/create-organization' // See https://clerk.com/docs/guides/development/custom-flows/organizations/create-organizations for this component

// List user's organization memberships
export default function JoinedOrganizations() {
  const { isLoaded, setActive, userMemberships } = useOrganizationList({
    userMemberships: {
      // Set pagination parameters
      pageSize: 5,
      keepPreviousData: true,
    },
  })
  const { orgId } = useAuth()

  if (!isLoaded) {
    return <p>Loading...</p>
  }

  return (
    <>
      <h1>Joined organizations</h1>
      {userMemberships?.data?.length > 0 && (
        <>
          <table>
            <thead>
              <tr>
                <th>Identifier</th>
                <th>Organization</th>
                <th>Joined</th>
                <th>Role</th>
                <th>Set as active org</th>
              </tr>
            </thead>
            <tbody>
              {userMemberships?.data?.map((mem) => (
                <tr key={mem.id}>
                  <td>{mem.publicUserData.identifier}</td>
                  <td>{mem.organization.name}</td>
                  <td>{mem.createdAt.toLocaleDateString()}</td>
                  <td>{mem.role}</td>
                  <td>
                    {orgId === mem.organization.id ? (
                      <button onClick={() => setActive({ organization: mem.organization.id })}>
                        Set as active
                      </button>
                    ) : (
                      <p>Currently active</p>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div>
            <button
              disabled={!userMemberships?.hasPreviousPage || userMemberships?.isFetching}
              onClick={() => userMemberships?.fetchPrevious?.()}
            >
              Previous
            </button>

            <button
              disabled={!userMemberships?.hasNextPage || userMemberships?.isFetching}
              onClick={() => userMemberships?.fetchNext?.()}
            >
              Next
            </button>
          </div>
        </>
      )}
      {userMemberships?.data?.length === 0 && (
        <div>
          <p>No organizations found</p>
          <CreateOrganization />
        </div>
      )}
    </>
  )
}
```

**Infinite list**

```jsx {{ filename: 'app/components/CustomOrganizationSwitcher.tsx', collapsible: true }}
'use client'

import { useAuth, useOrganizationList } from '@clerk/nextjs'
import CreateOrganization from '../components/create-organization' // See https://clerk.com/docs/guides/development/custom-flows/organizations/create-organizations for this component

// List user's organization memberships
export default function JoinedOrganizations() {
  const { isLoaded, setActive, userMemberships } = useOrganizationList({
    userMemberships: {
      // Set pagination parameters
      infinite: true,
    },
  })
  const { orgId } = useAuth()

  if (!isLoaded) {
    return <p>Loading...</p>
  }

  return (
    <>
      <h1>Joined organizations</h1>
      {userMemberships?.data?.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Identifier</th>
              <th>Organization</th>
              <th>Joined</th>
              <th>Role</th>
              <th>Set as active org</th>
            </tr>
          </thead>
          <tbody>
            {userMemberships?.data?.map((mem) => (
              <tr key={mem.id}>
                <td>{mem.publicUserData.identifier}</td>
                <td>{mem.organization.name}</td>
                <td>{mem.createdAt.toLocaleDateString()}</td>
                <td>{mem.role}</td>
                <td>
                  {orgId === mem.organization.id ? (
                    <button onClick={() => setActive({ organization: mem.organization.id })}>
                      Set as active
                    </button>
                  ) : (
                    <p>Currently active</p>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {userMemberships?.data?.length === 0 && (
        <div>
          <p>No organizations found</p>
          <CreateOrganization />
        </div>
      )}
    </>
  )
}
```

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
