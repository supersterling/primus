# useOrganizationList()

The `useOrganizationList()` hook provides access to the current user's Organization memberships, invitations, and suggestions. It also includes methods for creating new Organizations and managing the Active Organization.

## Parameters

`useOrganizationList()` accepts a single object with the following properties:

| Property                                        | Type                                                                                                                                                                                       | Description                                                                                                                                                                                                                                                                                                                                                                                                                       |
| ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="userinvitations"></a> `userInvitations?` | `true | { initialPage?: number; pageSize?: number; } & { status?: "expired" | "pending" | "accepted" | "revoked"; } & { infinite?: boolean; keepPreviousData?: boolean; }`      | If set to `true`, all default properties will be used.<br /> Otherwise, accepts an object with the following optional properties: <ul> <li>`status`: A string that filters the invitations by the provided status.</li> <li>Any of the properties described in <a href="https://clerk.com/docs/react-router/reference/hooks/use-organization-list.md#shared-properties">`Shared properties`</a>.</li> </ul> |
| <a id="usermemberships"></a> `userMemberships?` | `true | { initialPage?: number; pageSize?: number; } & object & { infinite?: boolean; keepPreviousData?: boolean; }`                                                            | If set to `true`, all default properties will be used.<br /> Otherwise, accepts an object with the following optional properties: <ul> <li>Any of the properties described in <a href="https://clerk.com/docs/react-router/reference/hooks/use-organization-list.md#shared-properties">`Shared properties`</a>.</li> </ul>                                                                                             |
| <a id="usersuggestions"></a> `userSuggestions?` | `true | { initialPage?: number; pageSize?: number; } & { status?: "pending" | "accepted" | ("pending" | "accepted")[]; } & { infinite?: boolean; keepPreviousData?: boolean; }` | If set to `true`, all default properties will be used.<br /> Otherwise, accepts an object with the following optional properties: <ul> <li>`status`: A string that filters the suggestions by the provided status.</li> <li>Any of the properties described in <a href="https://clerk.com/docs/react-router/reference/hooks/use-organization-list.md#shared-properties">`Shared properties`</a>.</li> </ul> |

> By default, the `userMemberships`, `userInvitations`, and `userSuggestions` attributes are not populated. To fetch and paginate the data, you must pass `true` or an object with the desired properties.

### Shared properties

Optional properties that are shared across the `userMemberships`, `userInvitations`, and `userSuggestions` properties.

| Property                                | Type     | Description                                                                                                                                                       |
| --------------------------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="initialpage"></a> `initialPage?` | `number` | A number that specifies which page to fetch. For example, if `initialPage` is set to 10, it will skip the first 9 pages and fetch the 10th page. Defaults to `1`. |
| <a id="pagesize"></a> `pageSize?`       | `number` | A number that specifies the maximum number of results to return per page. Defaults to `10`.                                                                       |

| Name                | Type      | Description                                                                                                                                                               |
| ------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `infinite?`         | `boolean` | If `true`, newly fetched data will be appended to the existing list rather than replacing it. Useful for implementing infinite scroll functionality. Defaults to `false`. |
| `keepPreviousData?` | `boolean` | If `true`, the previous data will be kept in the cache until new data is fetched. Defaults to `false`.                                                                    |

## Returns

| Property                                             | Type                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Description                                                                                                                                                             |
| ---------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="createorganization"></a> `createOrganization` | <code>undefined | (CreateOrganizationParams: <a href="https://clerk.com/docs/react-router/reference/hooks/use-organization-list.md#create-organization-params">`CreateOrganizationParams`</a>) => Promise<<a href="https://clerk.com/docs/reference/javascript/organization.md">`OrganizationResource`</a>></code>                                                                                                                                                                                                                       | A function that returns a `Promise` which resolves to the newly created `Organization`.                                                                                 |
| <a id="isloaded"></a> `isLoaded`                     | `boolean`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | A boolean that indicates whether Clerk has completed initialization and there is an authenticated user. Initially `false`, becomes `true` once Clerk loads with a user. |
| <a id="setactive"></a> `setActive`                   | <code>undefined | (setActiveParams: <a href="https://clerk.com/docs/reference/javascript/types/set-active-params.md">`SetActiveParams`</a>) => Promise<void></code>                                                                                                                                                                                                                                                                                                                                                                                 | A function that sets the active session and/or Organization.                                                                                                            |
| <a id="userinvitations"></a> `userInvitations`       | <code>PaginatedResourcesWithDefault<<a href="https://clerk.com/docs/reference/javascript/types/user-organization-invitation.md">`UserOrganizationInvitationResource`</a>> | <a href="https://clerk.com/docs/react-router/reference/hooks/use-organization-list.md#paginated-resources">`PaginatedResources`</a><<a href="https://clerk.com/docs/reference/javascript/types/user-organization-invitation.md">`UserOrganizationInvitationResource`</a>, T["userInvitations"] extends { infinite: true; } ? true : false></code> | Returns `PaginatedResources` which includes a list of the user's Organization invitations.                                                                              |
| <a id="usermemberships"></a> `userMemberships`       | <code>PaginatedResourcesWithDefault<<a href="https://clerk.com/docs/reference/javascript/types/organization-membership.md">`OrganizationMembershipResource`</a>> | <a href="https://clerk.com/docs/react-router/reference/hooks/use-organization-list.md#paginated-resources">`PaginatedResources`</a><<a href="https://clerk.com/docs/reference/javascript/types/organization-membership.md">`OrganizationMembershipResource`</a>, T["userMemberships"] extends { infinite: true; } ? true : false></code>                   | Returns `PaginatedResources` which includes a list of the user's Organization memberships.                                                                              |
| <a id="usersuggestions"></a> `userSuggestions`       | <code>PaginatedResourcesWithDefault<<a href="https://clerk.com/docs/reference/javascript/types/organization-suggestion.md">`OrganizationSuggestionResource`</a>> | <a href="https://clerk.com/docs/react-router/reference/hooks/use-organization-list.md#paginated-resources">`PaginatedResources`</a><<a href="https://clerk.com/docs/reference/javascript/types/organization-suggestion.md">`OrganizationSuggestionResource`</a>, T["userSuggestions"] extends { infinite: true; } ? true : false></code>                   | Returns `PaginatedResources` which includes a list of suggestions for Organizations that the user can join.                                                             |

### `CreateOrganizationParams`

| Property                  | Type     | Description                   |
| ------------------------- | -------- | ----------------------------- |
| <a id="name"></a> `name`  | `string` | The name of the Organization. |
| <a id="slug"></a> `slug?` | `string` | The slug of the Organization. |

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

### Expanding and paginating attributes

To keep network usage to a minimum, developers are required to opt-in by specifying which resource they need to fetch and paginate through. So by default, the `userMemberships`, `userInvitations`, and `userSuggestions` attributes are not populated. You must pass `true` or an object with the desired [`properties`](https://clerk.com/docs/react-router/reference/hooks/use-organization-list.md#shared-properties) to fetch and paginate the data.

```jsx
// userMemberships.data will never be populated
const { userMemberships } = useOrganizationList()

// Use default values to fetch userMemberships, such as initialPage = 1 and pageSize = 10
const { userMemberships } = useOrganizationList({
  userMemberships: true,
})

// Pass your own values to fetch userMemberships
const { userMemberships } = useOrganizationList({
  userMemberships: {
    pageSize: 20,
    initialPage: 2, // skips the first page
  },
})

// Aggregate pages in order to render an infinite list
const { userMemberships } = useOrganizationList({
  userMemberships: {
    infinite: true,
  },
})
```

### Infinite pagination

The following example demonstrates how to use the `infinite` property to fetch and append new data to the existing list. The `userMemberships` attribute will be populated with the first page of the user's Organization memberships. When the "Load more" button is clicked, the `fetchNext` helper function will be called to append the next page of memberships to the list.

```tsx {{ filename: 'components/JoinedOrganizations.tsx' }}
import { useOrganizationList } from '@clerk/react-router'

export function JoinedOrganizations() {
  const { isLoaded, setActive, userMemberships } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  })

  // Handle loading state
  if (!isLoaded) return <div>Loading...</div>

  return (
    <>
      <ul>
        {userMemberships.data?.map((mem) => (
          <li key={mem.id}>
            <span>{mem.organization.name}</span>
            <button onClick={() => setActive({ organization: mem.organization.id })}>Select</button>
          </li>
        ))}
      </ul>

      <button disabled={!userMemberships.hasNextPage} onClick={() => userMemberships.fetchNext()}>
        Load more
      </button>
    </>
  )
}
```

### Simple pagination

The following example demonstrates how to use the `fetchPrevious` and `fetchNext` helper functions to paginate through the data. The `userInvitations` attribute will be populated with the first page of invitations. When the "Previous page" or "Next page" button is clicked, the `fetchPrevious` or `fetchNext` helper function will be called to fetch the previous or next page of invitations.

Notice the difference between this example's pagination and the infinite pagination example above.

```tsx {{ filename: 'components/UserInvitationsTable.tsx' }}
import { useOrganizationList } from '@clerk/react-router'

export function UserInvitationsTable() {
  const { isLoaded, userInvitations } = useOrganizationList({
    userInvitations: {
      infinite: true,
      keepPreviousData: true,
    },
  })

  // Handle loading state
  if (!isLoaded || userInvitations.isLoading) return <div>Loading...</div>

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Org name</th>
          </tr>
        </thead>

        <tbody>
          {userInvitations.data?.map((inv) => (
            <tr key={inv.id}>
              <th>{inv.emailAddress}</th>
              <th>{inv.publicOrganizationData.name}</th>
            </tr>
          ))}
        </tbody>
      </table>

      <button disabled={!userInvitations.hasPreviousPage} onClick={userInvitations.fetchPrevious}>
        Prev
      </button>
      <button disabled={!userInvitations.hasNextPage} onClick={userInvitations.fetchNext}>
        Next
      </button>
    </>
  )
}
```

## Next steps

- [Build a custom Organization switcher](https://clerk.com/docs/guides/development/custom-flows/organizations/organization-switcher.md): Learn how to build a custom flow for switching between Organizations.
- [Create Organizations](https://clerk.com/docs/guides/development/custom-flows/organizations/create-organizations.md): Learn how to build a custom flow for creating Organizations.
- [Manage a user's Organization invitations](https://clerk.com/docs/guides/development/custom-flows/organizations/manage-user-org-invitations.md): Learn how to build a custom flow for managing a user's Organization invitations.

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
