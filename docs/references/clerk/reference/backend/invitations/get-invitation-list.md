# getInvitationList()

Retrieves a list of non-revoked invitations for your application, sorted by descending creation date. Returns a [`PaginatedResourceResponse`](https://clerk.com/docs/reference/backend/types/paginated-resource-response.md) object with a `data` property that contains an array of [`Invitation`](https://clerk.com/docs/reference/backend/types/backend-invitation.md) objects, and a `totalCount` property that indicates the total number of invitations in the system.

```ts
function getInvitationList(
  params: GetInvitationListParams,
): Promise<PaginatedResourceResponse<Invitation[]>>
```

## `GetInvitationListParams`

| Name    | Type                           | Description                                                                                                                                                           |
| ------- | ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| status? | accepted | pending | revoked | Filter by invitation status.                                                                                                                                          |
| limit?  | number                         | The number of results to return. Must be an integer greater than zero and less than 501. Can be used for paginating the results together with offset. Defaults to 10. |
| offset? | number                         | Skip the first offset results when paginating. Needs to be an integer greater or equal to zero. To be used in conjunction with limit. Defaults to 0.                  |

## Examples

### Basic

> Using `clerkClient` varies based on your framework. Refer to the [`JS Backend SDK overview`](https://clerk.com/docs/js-backend/getting-started/quickstart.md) for usage details, including guidance on [`how to access the userId and other properties`](https://clerk.com/docs/js-backend/getting-started/quickstart.md#get-the-user-id-and-other-properties).

```tsx
const response = await clerkClient.invitations.getInvitationList()
```

### Filter by invitation status

Retrieves list of invitations that have been revoked.

```tsx
// get all revoked invitations
const response = await clerkClient.invitations.getInvitationList({ status: 'revoked' })
```

### Limit the number of results

Retrieves list of invitations that have been revoked that is filtered by the number of results.

```tsx
const { data, totalCount } = await clerkClient.invitations.getInvitationList({
  status: 'revoked',
  // returns the first 10 results
  limit: 10,
})
```

### Skip results

Retrieves list of invitations that have been revoked that is filtered by the number of results to skip.

```tsx
const { data, totalCount } = await clerkClient.invitations.getInvitationList({
  status: 'revoked',
  // skips the first 10 results
  offset: 10,
})
```

## Backend API (BAPI) endpoint

This method in the SDK is a wrapper around the BAPI endpoint `GET/invitations`. See the [BAPI reference](https://clerk.com/docs/reference/backend-api/tag/invitations/get/invitations.md){{ target: '_blank' }} for more information.

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
