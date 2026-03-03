# useOrganization()

The `useOrganization()` hook retrieves attributes of the currently Active Organization.

## Parameters

`useOrganization()` accepts a single object with the following optional properties:

| Property                                              | Type                                                                                                                                                                                                                 | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| ----------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="domains"></a> `domains?`                       | `true | { initialPage?: number; pageSize?: number; } & { enrollmentMode?: "manual_invitation" | "automatic_invitation" | "automatic_suggestion"; } & { infinite?: boolean; keepPreviousData?: boolean; }` | If set to `true`, all default properties will be used.<br /> Otherwise, accepts an object with the following optional properties: <ul> <li>`enrollmentMode`: A string that filters the domains by the provided <a href="https://clerk.com/docs/guides/organizations/add-members/verified-domains.md#enable-verified-domains">enrollment mode</a>.</li> <li>Any of the properties described in <a href="https://clerk.com/docs/react-router/reference/hooks/use-organization.md#shared-properties">`Shared properties`</a>.</li> </ul>                                                 |
| <a id="invitations"></a> `invitations?`               | `true | { initialPage?: number; pageSize?: number; } & { status?: ("expired" | "pending" | "accepted" | "revoked")[]; } & { infinite?: boolean; keepPreviousData?: boolean; }`                            | If set to `true`, all default properties will be used.<br /> Otherwise, accepts an object with the following optional properties: <ul> <li>`status`: A string that filters the invitations by the provided status.</li> <li>Any of the properties described in <a href="https://clerk.com/docs/react-router/reference/hooks/use-organization.md#shared-properties">`Shared properties`</a>.</li> </ul>                                                                                                                                                                                |
| <a id="membershiprequests"></a> `membershipRequests?` | `true | { initialPage?: number; pageSize?: number; } & { status?: "expired" | "pending" | "accepted" | "revoked"; } & { infinite?: boolean; keepPreviousData?: boolean; }`                                | If set to `true`, all default properties will be used.<br /> Otherwise, accepts an object with the following optional properties: <ul> <li>`status`: A string that filters the membership requests by the provided status.</li> <li>Any of the properties described in <a href="https://clerk.com/docs/react-router/reference/hooks/use-organization.md#shared-properties">`Shared properties`</a>.</li> </ul>                                                                                                                                                                        |
| <a id="memberships"></a> `memberships?`               | `true | { initialPage?: number; pageSize?: number; } & { query?: string; role?: string[]; } & { infinite?: boolean; keepPreviousData?: boolean; }`                                                        | If set to `true`, all default properties will be used.<br /> Otherwise, accepts an object with the following optional properties: <ul> <li>`role`: An array of <a href="https://clerk.com/docs/reference/javascript/types/organization-custom-role-key.md">`OrganizationCustomRoleKey`</a>.</li> <li>`query`: A string that filters the memberships by the provided string.</li> <li>Any of the properties described in <a href="https://clerk.com/docs/react-router/reference/hooks/use-organization.md#shared-properties">`Shared properties`</a>.</li> </ul> |

> By default, the `memberships`, `invitations`, `membershipRequests`, and `domains` attributes aren't populated. To fetch and paginate the data, you must pass `true` or an object with the desired properties.

### Shared properties

Optional properties that are shared across the `invitations`, `membershipRequests`, `memberships`, and `domains` properties.

| Property                                | Type     | Description                                                                                                                                                       |
| --------------------------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="initialpage"></a> `initialPage?` | `number` | A number that specifies which page to fetch. For example, if `initialPage` is set to 10, it will skip the first 9 pages and fetch the 10th page. Defaults to `1`. |
| <a id="pagesize"></a> `pageSize?`       | `number` | A number that specifies the maximum number of results to return per page. Defaults to `10`.                                                                       |

| Name                | Type      | Description                                                                                                                                                               |
| ------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `infinite?`         | `boolean` | If `true`, newly fetched data will be appended to the existing list rather than replacing it. Useful for implementing infinite scroll functionality. Defaults to `false`. |
| `keepPreviousData?` | `boolean` | If `true`, the previous data will be kept in the cache until new data is fetched. Defaults to `false`.                                                                    |

> These attributes are updating automatically and will re-render their respective components whenever you set a different Organization using the [`setActive({ organization })`](https://clerk.com/docs/reference/javascript/clerk.md#set-active) method or update any of the memberships or invitations. No need for you to manage updating anything manually.

## Returns

| Property                                             | Type                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Description                                                                                                              |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| <a id="domains"></a> `domains`                       | <code>null | PaginatedResourcesWithDefault<<a href="https://clerk.com/docs/reference/javascript/types/organization-domain.md">`OrganizationDomainResource`</a>> | <a href="https://clerk.com/docs/react-router/reference/hooks/use-organization.md#paginated-resources">`PaginatedResources`</a><<a href="https://clerk.com/docs/reference/javascript/types/organization-domain.md">`OrganizationDomainResource`</a>, T["membershipRequests"] extends { infinite: true; } ? true : false></code>                                               | Includes a paginated list of the Organization's domains.                                                                 |
| <a id="invitations"></a> `invitations`               | <code>null | PaginatedResourcesWithDefault<<a href="https://clerk.com/docs/reference/javascript/types/organization-invitation.md">`OrganizationInvitationResource`</a>> | <a href="https://clerk.com/docs/react-router/reference/hooks/use-organization.md#paginated-resources">`PaginatedResources`</a><<a href="https://clerk.com/docs/reference/javascript/types/organization-invitation.md">`OrganizationInvitationResource`</a>, T["invitations"] extends { infinite: true; } ? true : false></code>                                      | Includes a paginated list of the Organization's invitations.                                                             |
| <a id="isloaded"></a> `isLoaded`                     | `boolean`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | A boolean that indicates whether Clerk has completed initialization. Initially `false`, becomes `true` once Clerk loads. |
| <a id="membership"></a> `membership`                 | <code>undefined | null | <a href="https://clerk.com/docs/reference/javascript/types/organization-membership.md">`OrganizationMembershipResource`</a></code>                                                                                                                                                                                                                                                                                                                                                                                                          | The current Organization membership.                                                                                     |
| <a id="membershiprequests"></a> `membershipRequests` | <code>null | PaginatedResourcesWithDefault<<a href="https://clerk.com/docs/reference/javascript/types/organization-membership-request.md">`OrganizationMembershipRequestResource`</a>> | <a href="https://clerk.com/docs/react-router/reference/hooks/use-organization.md#paginated-resources">`PaginatedResources`</a><<a href="https://clerk.com/docs/reference/javascript/types/organization-membership-request.md">`OrganizationMembershipRequestResource`</a>, T["membershipRequests"] extends { infinite: true; } ? true : false></code> | Includes a paginated list of the Organization's membership requests.                                                     |
| <a id="memberships"></a> `memberships`               | <code>null | PaginatedResourcesWithDefault<<a href="https://clerk.com/docs/reference/javascript/types/organization-membership.md">`OrganizationMembershipResource`</a>> | <a href="https://clerk.com/docs/react-router/reference/hooks/use-organization.md#paginated-resources">`PaginatedResources`</a><<a href="https://clerk.com/docs/reference/javascript/types/organization-membership.md">`OrganizationMembershipResource`</a>, T["memberships"] extends { infinite: true; } ? true : false></code>                                      | Includes a paginated list of the Organization's memberships.                                                             |
| <a id="organization"></a> `organization`             | <code>undefined | null | <a href="https://clerk.com/docs/reference/javascript/organization.md">`OrganizationResource`</a></code>                                                                                                                                                                                                                                                                                                                                                                                                                                     | The currently Active Organization.                                                                                       |

### `PaginatedResources`

| Property                                       | Type                                                                                                                                                                                                                                                                                                                                                                                        | Description                                                                                                                                                                                                                       |
| ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="count"></a> `count`                     | `number`                                                                                                                                                                                                                                                                                                                                                                                    | The total count of data that exist remotely.                                                                                                                                                                                      |
| <a id="data"></a> `data`                       | `T[]`                                                                                                                                                                                                                                                                                                                                                                            | An array that contains the fetched data. For example, for the `memberships` attribute, data will be an array of [`OrganizationMembership`](https://clerk.com/docs/reference/javascript/types/organization-membership.md) objects. |
| <a id="error"></a> `error`                     | `null | ClerkAPIResponseError`                                                                                                                                                                                                                                                                                                                                                   | Clerk's API response error object.                                                                                                                                                                                                |
| <a id="fetchnext"></a> `fetchNext`             | `() => void`                                                                                                                                                                                                                                                                                                                                                                     | A function that triggers the next page to be loaded. This is the same as `fetchPage(page => Math.min(pageCount, page + 1))`.                                                                                                      |
| <a id="fetchpage"></a> `fetchPage`             | `ValueOrSetter`<`number`>                                                                                                                                                                                                                                                                                                                                                                  | A function that triggers a specific page to be loaded.                                                                                                                                                                            |
| <a id="fetchprevious"></a> `fetchPrevious`     | `() => void`                                                                                                                                                                                                                                                                                                                                                                     | A function that triggers the previous page to be loaded. This is the same as `fetchPage(page => Math.max(0, page - 1))`.                                                                                                          |
| <a id="hasnextpage"></a> `hasNextPage`         | `boolean`                                                                                                                                                                                                                                                                                                                                                                                   | A boolean that indicates if there are available pages to be fetched.                                                                                                                                                              |
| <a id="haspreviouspage"></a> `hasPreviousPage` | `boolean`                                                                                                                                                                                                                                                                                                                                                                                   | A boolean that indicates if there are available pages to be fetched.                                                                                                                                                              |
| <a id="iserror"></a> `isError`                 | `boolean`                                                                                                                                                                                                                                                                                                                                                                                   | A boolean that indicates the request failed.                                                                                                                                                                                      |
| <a id="isfetching"></a> `isFetching`           | `boolean`                                                                                                                                                                                                                                                                                                                                                                                   | A boolean that is `true` if there is an ongoing request or a revalidation.                                                                                                                                                        |
| <a id="isloading"></a> `isLoading`             | `boolean`                                                                                                                                                                                                                                                                                                                                                                                   | A boolean that is `true` if there is an ongoing request and there is no fetched data.                                                                                                                                             |
| <a id="page"></a> `page`                       | `number`                                                                                                                                                                                                                                                                                                                                                                                    | The current page.                                                                                                                                                                                                                 |
| <a id="pagecount"></a> `pageCount`             | `number`                                                                                                                                                                                                                                                                                                                                                                                    | The total amount of pages. It is calculated based on `count`, `initialPage`, and `pageSize`.                                                                                                                                      |
| <a id="revalidate"></a> `revalidate`           | <code>() => Promise<void></code>                                                                                                                                                                                                                                                                                                                                                            | A function that triggers a revalidation of the current page.                                                                                                                                                                      |
| <a id="setdata"></a> `setData`                 | `Infinite` _extends_ `true` ? `CacheSetter`<<code>(undefined | <a href="https://clerk.com/docs/reference/javascript/types/clerk-paginated-response.md">`ClerkPaginatedResponse`</a><T>)[]</code>> : `CacheSetter`<<code>undefined | <a href="https://clerk.com/docs/reference/javascript/types/clerk-paginated-response.md">`ClerkPaginatedResponse`</a><T></code>> | A function that allows you to set the data manually.                                                                                                                                                                              |

To see the different Organization features integrated into one application, take a look at our [Organizations demo repository](https://github.com/clerk/organizations-demo).

## Examples

### Expand and paginate attributes

To keep network usage to a minimum, developers are required to opt-in by specifying which resource they need to fetch and paginate through. By default, the `memberships`, `invitations`, `membershipRequests`, and `domains` attributes are not populated. You must pass `true` or an object with the desired [`properties`](https://clerk.com/docs/react-router/reference/hooks/use-organization.md#shared-properties) to fetch and paginate the data.

```jsx
// invitations.data will never be populated.
const { invitations } = useOrganization()

// Use default values to fetch invitations, such as initialPage = 1 and pageSize = 10
const { invitations } = useOrganization({
  invitations: true,
})

// Pass your own values to fetch invitations
const { invitations } = useOrganization({
  invitations: {
    pageSize: 20,
    initialPage: 2, // skips the first page
  },
})

// Aggregate pages in order to render an infinite list
const { invitations } = useOrganization({
  invitations: {
    infinite: true,
  },
})
```

### Infinite pagination

The following example demonstrates how to use the `infinite` property to fetch and append new data to the existing list. The `memberships` attribute will be populated with the first page of the Organization's memberships. When the "Load more" button is clicked, the `fetchNext` helper function will be called to append the next page of memberships to the list.

```tsx {{ filename: 'app/routes/members.tsx' }}
import { useOrganization } from '@clerk/react-router'

export default function MemberListPage() {
  const { memberships } = useOrganization({
    memberships: {
      infinite: true, // Append new data to the existing list
      keepPreviousData: true, // Persist the cached data until the new data has been fetched
    },
  })

  // Handle loading state
  if (!memberships) return <div>Loading...</div>

  return (
    <div>
      <h2>Organization members</h2>
      <ul>
        {memberships.data?.map((membership) => (
          <li key={membership.id}>
            {membership.publicUserData?.firstName} {membership.publicUserData?.lastName} &lt;
            {membership.publicUserData?.identifier}&gt; :: {membership.role}
          </li>
        ))}
      </ul>

      <button
        disabled={!memberships.hasNextPage} // Disable the button if there are no more available pages to be fetched
        onClick={memberships.fetchNext}
      >
        Load more
      </button>
    </div>
  )
}
```

### Simple pagination

The following example demonstrates how to use the `fetchPrevious` and `fetchNext` helper functions to paginate through the data. The `memberships` attribute will be populated with the first page of the Organization's memberships. When the "Previous page" or "Next page" button is clicked, the `fetchPrevious` or `fetchNext` helper function will be called to fetch the previous or next page of memberships.

Notice the difference between this example's pagination and the infinite pagination example above.

```tsx {{ filename: 'app/routes/members-paginated.tsx' }}
import { useOrganization } from '@clerk/react-router'

export default function MemberListPage() {
  const { memberships } = useOrganization({
    memberships: {
      keepPreviousData: true, // Persist the cached data until the new data has been fetched
    },
  })

  // Handle loading state
  if (!memberships) return <div>Loading...</div>

  return (
    <div>
      <h2>Organization members</h2>
      <ul>
        {memberships.data?.map((membership) => (
          <li key={membership.id}>
            {membership.publicUserData?.firstName} {membership.publicUserData?.lastName} &lt;
            {membership.publicUserData?.identifier}&gt; :: {membership.role}
          </li>
        ))}
      </ul>

      <button disabled={!memberships.hasPreviousPage} onClick={memberships.fetchPrevious}>
        Previous page
      </button>

      <button disabled={!memberships.hasNextPage} onClick={memberships.fetchNext}>
        Next page
      </button>
    </div>
  )
}
```

## Next steps

- [Update an Organization](https://clerk.com/docs/guides/development/custom-flows/organizations/update-organizations.md): Learn how to build a custom flow for updating an Organization.
- [Manage Roles in an Organization](https://clerk.com/docs/guides/development/custom-flows/organizations/manage-roles.md): Learn how to build a custom flow for managing Roles in an Organization.
- [Manage an Organization's membership requests](https://clerk.com/docs/guides/development/custom-flows/organizations/manage-membership-requests.md): Learn how to build a custom flow for managing an Organization's membership requests.
- [Manage a user's Organization invitations](https://clerk.com/docs/guides/development/custom-flows/organizations/manage-user-org-invitations.md): Learn how to build a custom flow for managing a user's Organization invitations.

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
