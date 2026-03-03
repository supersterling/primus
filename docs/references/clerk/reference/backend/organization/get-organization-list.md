# getOrganizationList()

Retrieves a list of Organizations. Returns a [`PaginatedResourceResponse`](https://clerk.com/docs/reference/backend/types/paginated-resource-response.md) object with a `data` property that contains an array of [`Organization`](https://clerk.com/docs/reference/backend/types/backend-organization.md) objects, and a `totalCount` property that indicates the total number of Organizations in the system.

```ts
function getOrganizationList(
  params: GetOrganizationListParams,
): Promise<PaginatedResourceResponse<Organization[]>>
```

## `GetOrganizationListParams`

| Name                 | Type                                        | Description                                                                                                                                                           |
| -------------------- | ------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| limit?               | number                                      | The number of results to return. Must be an integer greater than zero and less than 501. Can be used for paginating the results together with offset. Defaults to 10. |
| offset?              | number                                      | Skip the first offset results when paginating. Needs to be an integer greater or equal to zero. To be used in conjunction with limit. Defaults to 0.                  |
| includeMembersCount? | boolean                                     | Whether the member counts of each Organization should be included in the response or not.                                                                             |
| query?               | string                                      | Filters Organizations with ID, name, or slug that match the given query. Uses exact match for Organization ID and partial match for name and slug.                    |
| orderBy?             | 'name' | 'created\_at' | 'members\_count' | Return Organizations in a particular order. Prefix with a - to reverse the order. Prefix with a + to list in ascending order. Defaults to '-created\_at'.             |

## Examples

### Basic

> Using `clerkClient` varies based on your framework. Refer to the [`JS Backend SDK overview`](https://clerk.com/docs/js-backend/getting-started/quickstart.md) for usage details, including guidance on [`how to access the userId and other properties`](https://clerk.com/docs/js-backend/getting-started/quickstart.md#get-the-user-id-and-other-properties).

```tsx
const response = await clerkClient.organizations.getOrganizationList()
```

### Limit the number of results

Retrieves Organization list that is filtered by the number of results.

```tsx
const { data, totalCount } = await clerkClient.organizations.getOrganizationList({
  // returns the first 10 results
  limit: 10,
})
```

### Skip results

Retrieves Organization list that is filtered by the number of results to skip.

```tsx
const { data, totalCount } = await clerkClient.organizations.getOrganizationList({
  // skips the first 10 results
  offset: 10,
})
```

### Filter by query

Retrieves list of Organizations that match the query.

```tsx
// returns organizations that have 'test' in their name
const { data, totalCount } = await clerkClient.organizations.getOrganizationList({ query: 'test' })
```

## Backend API (BAPI) endpoint

This method in the SDK is a wrapper around the BAPI endpoint `GET/organizations`. See the [BAPI reference](https://clerk.com/docs/reference/backend-api/tag/organizations/get/organizations.md){{ target: '_blank' }} for more information.

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
