# Build a custom flow for managing a user's Organization invitations

> This guide is for users who want to build a custom flow. To use a _prebuilt_ UI, use the [Account Portal pages](https://clerk.com/docs/guides/account-portal/overview.md) or [`prebuilt components`](https://clerk.com/docs/nextjs/reference/components/overview.md).

This guide will demonstrate how to use the Clerk API to build a custom flow for managing a user's [Organization invitations](https://clerk.com/docs/guides/organizations/add-members/invitations.md).

The following example:

1. Uses the [`useOrganizationList()`](https://clerk.com/docs/nextjs/reference/hooks/use-organization.md) hook to get `userInvitations`, which is a list of the user's Organization invitations.
   - `userInvitations` is an object with `data` that contains an array of [`UserOrganizationInvitation`](https://clerk.com/docs/reference/javascript/types/user-organization-invitation.md) objects.
   - Each `UserOrganizationInvitation` object has an [`accept()`](https://clerk.com/docs/reference/javascript/types/organization-membership-request.md#accept) method that accepts the invitation to the Organization.
2. Maps over the `data` array to display the invitations in a table, providing an "Accept" button for each invitation that calls the `accept()` method.

**This example is written for Next.js App Router but it can be adapted for any React-based framework, such as React Router or Tanstack Start.**

```jsx {{ filename: 'app/components/UserInvitationsList.tsx', collapsible: true }}
'use client'

import { useOrganizationList } from '@clerk/nextjs'
import React from 'react'

export default function UserInvitationsList() {
  const { isLoaded, userInvitations } = useOrganizationList({
    userInvitations: {
      infinite: true,
      keepPreviousData: true,
    },
  })

  if (!isLoaded || userInvitations.isLoading) {
    return <>Loading</>
  }

  return (
    <>
      <h1>Organization invitations</h1>
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Organization name</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {userInvitations.data?.map((invitation) => (
            <tr key={invitation.id}>
              <td>{invitation.emailAddress}</td>
              <td>{invitation.publicOrganizationData.name}</td>
              <td>{invitation.role}</td>
              <td>
                <button onClick={() => invitation.accept()}>Accept</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button disabled={!userInvitations.hasNextPage} onClick={userInvitations.fetchNext}>
        Load more
      </button>
    </>
  )
}
```

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
