# list()

Retrieves a list of OAuth applications for an instance. Returns a [`PaginatedResourceResponse`](https://clerk.com/docs/reference/backend/types/paginated-resource-response.md) object with a `data` property that contains an array of [`OAuthApplication`](https://clerk.com/docs/reference/backend/types/backend-oauth-application.md) objects, and a `totalCount` property that indicates the total number of OAuth applications for the instance.

```ts
function list(
  params: ClerkPaginationRequest = {},
): Promise<PaginatedResourceResponse<OAuthApplication[]>>
```

## Parameters

| Name       | Type                    | Description                                                                                                                                                           |
| ---------- | ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| limit?     | number                  | The number of results to return. Must be an integer greater than zero and less than 501. Can be used for paginating the results together with offset. Defaults to 10. |
| offset?    | number                  | Skip the first offset results when paginating. Needs to be an integer greater or equal to zero. To be used in conjunction with limit. Defaults to 0.                  |
| orderBy?   | 'name' | 'created\_at' | Return OAuth applications in a particular order. Prefix with a - to reverse the order. Prefix with a + to list in ascending order. Defaults to '+created\_at'.        |
| nameQuery? | string                  | Filters OAuth applications with names that match the given query, via case-insensitive partial match.                                                                 |

## Examples

> Using `clerkClient` varies based on your framework. Refer to the [`JS Backend SDK overview`](https://clerk.com/docs/js-backend/getting-started/quickstart.md) for usage details, including guidance on [`how to access the userId and other properties`](https://clerk.com/docs/js-backend/getting-started/quickstart.md#get-the-user-id-and-other-properties).

### Basic

```tsx
const response = await clerkClient.oauthApplications.list()
```

### Limit the number of results

Retrieves list of OAuth applications that is filtered by the number of results.

```tsx
const { data, totalCount } = await clerkClient.oauthApplications.list({
  // returns the first 10 results
  limit: 10,
})
```

### Skip results

Retrieves list of OAuth applications that is filtered by the number of results to skip.

```tsx
const { data, totalCount } = await clerkClient.oauthApplications.list({
  // skips the first 10 results
  offset: 10,
})
```

## Backend API (BAPI) endpoint

This method in the SDK is a wrapper around the BAPI endpoint `GET/oauth_applications`. See the [BAPI reference](https://clerk.com/docs/reference/backend-api/tag/oauth-applications/get/oauth_applications.md){{ target: '_blank' }} for more information.

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
