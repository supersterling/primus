# list()

Retrieves a list of waitlist entries. Returns a [`PaginatedResourceResponse`](https://clerk.com/docs/reference/backend/types/paginated-resource-response.md) object with a `data` property that contains an array of [`WaitlistEntry`](https://clerk.com/docs/reference/backend/types/backend-waitlist-entry.md) objects, and a `totalCount` property that indicates the total number of waitlist entries for the application.

```tsx
function list(): (
  params: WaitlistEntryListParams,
) => Promise<PaginatedResourceResponse<WaitlistEntry[]>>
```

## `WaitlistEntryListParams`

| Name     | Type                                                | Description                                                                                                                                                           |
| -------- | --------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| limit?   | number                                              | The number of results to return. Must be an integer greater than zero and less than 501. Can be used for paginating the results together with offset. Defaults to 10. |
| offset?  | number                                              | Skip the first offset results when paginating. Needs to be an integer greater or equal to zero. To be used in conjunction with limit. Defaults to 0.                  |
| query?   | string                                              | Filter waitlist entries by email\_address or id.                                                                                                                      |
| status?  | 'pending' | 'invited' | 'completed' | 'rejected' | Filter waitlist entries by their status.                                                                                                                              |
| orderBy? | 'created\_at' | 'updated\_at' | 'email\_address'  | Return waitlist entries in a particular order. Prefix with a - to reverse the order. Prefix with a + to list in ascending order. Defaults to '-created\_at'.          |

## Examples

> Using `clerkClient` varies based on your framework. Refer to the [`JS Backend SDK overview`](https://clerk.com/docs/js-backend/getting-started/quickstart.md) for usage details, including guidance on [`how to access the userId and other properties`](https://clerk.com/docs/js-backend/getting-started/quickstart.md#get-the-user-id-and-other-properties).

### Filter by email address

Retrieves a list of a wailist entries that is filtered by their email address using the `query` parameter.

```tsx
const response = await clerkClient.waitlistEntries.list({
  // returns a list of waitlist entries for a given email address
  query: 'user1@example.com',
})
```

### Filter by status

Retrieves a list of a wailist entries that is filtered by their status.

```tsx
const { data, totalCount } = await clerkClient.waitlistEntries.list({
  // returns a list of waitlist entries that have not yet been accepted
  status: 'pending',
})
```

### Limit the number of results

Retrieves a list of a waitlist entries that is filtered by the number of results.

```tsx
const { data, totalCount } = await clerkClient.waitlistEntries.list({
  // returns the first 10 waitlist entries
  limit: 10,
})
```

### Skip results

Retrieves a list of a waitlist entries that is filtered by the number of results to skip.

```tsx
const { data, totalCount } = await clerkClient.waitlistEntries.list({
  // skips the first 10 waitlist entries
  offset: 10,
})
```

## Backend API (BAPI) endpoint

This method in the SDK is a wrapper around the BAPI endpoint `GET/waitlist_entries`. See the [BAPI reference](https://clerk.com/docs/reference/backend-api/tag/waitlist_entries/get/waitlist_entries.md){{ target: '_blank' }} for more information.

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
