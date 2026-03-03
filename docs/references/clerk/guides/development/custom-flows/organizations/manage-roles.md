# Build a custom flow for managing member Roles in an Organization

> This guide is for users who want to build a custom flow. To use a _prebuilt_ UI, use the [Account Portal pages](https://clerk.com/docs/guides/account-portal/overview.md) or [`prebuilt components`](https://clerk.com/docs/nextjs/reference/components/overview.md).

Organization members with appropriate [Permissions](https://clerk.com/docs/guides/organizations/control-access/roles-and-permissions.md#permissions) can manage a member's [Roles](https://clerk.com/docs/guides/organizations/control-access/roles-and-permissions.md#roles) and remove members within an Organization.

This guide will demonstrate how to use the Clerk API to build a custom flow for managing member Roles in an Organization.

The following example:

1. Uses the [`useOrganization()`](https://clerk.com/docs/nextjs/reference/hooks/use-organization.md) hook to get `memberships`, which is a list of the Active Organization's memberships.
   - `memberships` is an object with `data` that contains an array of [`OrganizationMembership`](https://clerk.com/docs/reference/javascript/types/organization-membership.md) objects.
   - Each `OrganizationMembership` object has an [`update()`](https://clerk.com/docs/reference/javascript/types/organization-membership.md#update) and [`destroy()`](https://clerk.com/docs/reference/javascript/types/organization-membership.md#destroy) method to update the member's Role and remove the member from the Organization, respectively.
2. Maps over the `data` array to display the memberships in a table, providing an "Update Role" and "Remove Member" button for each membership that calls the `update()` and `destroy()` methods, respectively.

**This example is written for Next.js App Router but it can be adapted for any React-based framework, such as React Router or Tanstack React Start.**

```tsx {{ filename: 'app/components/ManageRoles.tsx', collapsible: true }}
'use client'

import { useState, useEffect, ChangeEventHandler, useRef } from 'react'
import { useOrganization, useUser } from '@clerk/nextjs'
import type { OrganizationCustomRoleKey } from '@clerk/types'

export const OrgMembersParams = {
  memberships: {
    pageSize: 5,
    keepPreviousData: true,
  },
}

// List of organization memberships. Administrators can
// change member Roles or remove members from the Organization.
export const ManageRoles = () => {
  const { user } = useUser()
  const { isLoaded, memberships } = useOrganization(OrgMembersParams)

  if (!isLoaded) {
    return <>Loading</>
  }

  return (
    <>
      <h1>Memberships List</h1>
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Joined</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {memberships?.data?.map((mem) => (
            <tr key={mem.id}>
              <td>
                {mem.publicUserData.identifier} {mem.publicUserData.userId === user?.id && '(You)'}
              </td>
              <td>{mem.createdAt.toLocaleDateString()}</td>
              <td>
                <SelectRole
                  defaultRole={mem.role}
                  onChange={async (e) => {
                    await mem.update({
                      role: e.target.value as OrganizationCustomRoleKey,
                    })
                    await memberships?.revalidate()
                  }}
                />
              </td>
              <td>
                <button
                  onClick={async () => {
                    await mem.destroy()
                    await memberships?.revalidate()
                  }}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <button
          disabled={!memberships?.hasPreviousPage || memberships?.isFetching}
          onClick={() => memberships?.fetchPrevious?.()}
        >
          Previous
        </button>

        <button
          disabled={!memberships?.hasNextPage || memberships?.isFetching}
          onClick={() => memberships?.fetchNext?.()}
        >
          Next
        </button>
      </div>
    </>
  )
}

type SelectRoleProps = {
  fieldName?: string
  onChange?: ChangeEventHandler<HTMLSelectElement>
  defaultRole?: string
}

const SelectRole = (props: SelectRoleProps) => {
  const { fieldName, onChange, defaultRole } = props
  const { organization } = useOrganization()
  const [rolesResponse, setRolesResponse] =
    useState < ReturnType < NonNullable < typeof organization > ['getRoles'] >> [0] > []
  const isPopulated = useRef(false)

  useEffect(() => {
    if (isPopulated.current) return
    setIsLoading(true)
    organization
      ?.getRoles({
        pageSize: 20,
        initialPage: 1,
      })
      .then((res) => {
        isPopulated.current = true
        setRolesResponse(res)
      })
  }, [organization?.id])

  if (rolesResponse.data?.length === 0) return null

  // When `has_role_set_migration` is `true`, updating organization membership roles is not allowed.
  const isDisabled = !!rolesResponse.has_role_set_migration

  const roleKeys = rolesResponse.data.map((role) => role.key)

  return (
    <select
      name={fieldName}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      onChange={onChange}
      defaultValue={defaultRole}
    >
      {roleKeys?.map((roleKey) => (
        <option key={roleKey} value={roleKey}>
          {roleKey}
        </option>
      ))}
    </select>
  )
}
```

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
