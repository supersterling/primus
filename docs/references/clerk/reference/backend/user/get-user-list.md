# getUserList()

Retrieves a list of users. Returns a [`PaginatedResourceResponse`](https://clerk.com/docs/reference/backend/types/paginated-resource-response.md) object with a `data` property that contains an array of [`User`](https://clerk.com/docs/reference/backend/types/backend-user.md) objects, and a `totalCount` property that indicates the total number of users for the application.

```tsx
function getUserList(): (params: UserListParams) => Promise<PaginatedResourceResponse<User[]>>
```

## `UserListParams`

| Name                    | Type                                                                                                                                                                               | Description                                                                                                                                                                                                                                                                                           |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| limit?                  | number                                                                                                                                                                             | The number of results to return. Must be an integer greater than zero and less than 501. Can be used for paginating the results together with offset. Defaults to 10.                                                                                                                                 |
| offset?                 | number                                                                                                                                                                             | Skip the first offset results when paginating. Needs to be an integer greater or equal to zero. To be used in conjunction with limit. Defaults to 0.                                                                                                                                                  |
| orderBy?                | 'created\_at' | 'updated\_at' | 'email\_address' | 'web3wallet' | 'first\_name' | 'last\_name' | 'phone\_number' | 'username' | 'last\_active\_at' | 'last\_sign\_in\_at' | Return users in a particular order. Prefix with a - to reverse the order. Prefix with a + to list in ascending order. Defaults to '-created\_at'.                                                                                                                                                     |
| emailAddress?           | string[]                                                                                                                                                                          | Filters users with the specified email addresses. Accepts up to 100 email addresses. Any email addresses not found are ignored.                                                                                                                                                                       |
| phoneNumber?            | string[]                                                                                                                                                                          | Filters users with the specified phone numbers. Accepts up to 100 phone numbers. Any phone numbers not found are ignored.                                                                                                                                                                             |
| externalId?             | string[]                                                                                                                                                                          | Filters users with the specified external IDs. For each external ID, the + and - can be prepended to the ID, which denote whether the respective external ID should be included or excluded from the result set. Accepts up to 100 external IDs. Any external IDs not found are ignored.              |
| username?               | string[]                                                                                                                                                                          | Filters users with the specified usernames. Accepts up to 100 usernames. Any usernames not found are ignored.                                                                                                                                                                                         |
| web3Wallet?             | string[]                                                                                                                                                                          | Filters users with the specified Web3 wallet addresses. Accepts up to 100 Web3 wallet addresses. Any Web3 wallet addressed not found are ignored.                                                                                                                                                     |
| userId?                 | string[]                                                                                                                                                                          | Filters users with the user IDs specified. For each user ID, the + and - can be prepended to the ID, which denote whether the respective user ID should be included or excluded from the result set. Accepts up to 100 user IDs. Any user IDs not found are ignored.                                  |
| organizationId?         | string[]                                                                                                                                                                          | Filters users that have memberships to the given Organizations. For each Organization ID, the + and - can be prepended to the ID, which denote whether the respective Organization should be included or excluded from the result set. Accepts up to 100 Organization IDs.                            |
| query?                  | string                                                                                                                                                                             | Filters users that match the given query. For possible matches, we check the email addresses, phone numbers, usernames, Web3 wallet addresses, user IDs, first and last names. The query value doesn't need to match the exact value you are looking for, it is capable of partial matches as well.   |
| last\_active\_at\_since | number                                                                                                                                                                             | Filters users that had session activity since the given date, with day precision. Providing a value with higher precision than day will result in an error. Example: use 1700690400000 to retrieve users that had session activity from 2023-11-23 until the current day. For example: 1700690400000. |
| lastSignInAtAfter?      | number                                                                                                                                                                             | Filters users that signed in after the given Unix timestamp (in milliseconds).                                                                                                                                                                                                                        |
| lastSignInAtBefore?     | number                                                                                                                                                                             | Filters users that signed in before the given Unix timestamp (in milliseconds).                                                                                                                                                                                                                       |

## Examples

### Basic

> Using `clerkClient` varies based on your framework. Refer to the [`JS Backend SDK overview`](https://clerk.com/docs/js-backend/getting-started/quickstart.md) for usage details, including guidance on [`how to access the userId and other properties`](https://clerk.com/docs/js-backend/getting-started/quickstart.md#get-the-user-id-and-other-properties).

```tsx
const response = await clerkClient.users.getUserList()
```

### Limit the number of results

Retrieves user list that is ordered and filtered by the number of results.

```tsx
const { data, totalCount } = await clerkClient.users.getUserList({
  orderBy: '-created_at',
  limit: 10,
})
```

### Filter by email addresses and phone numbers

Retrieves user list that is filtered by the given email addresses and phone numbers.

```tsx
const emailAddress = ['email1@clerk.dev', 'email2@clerk.dev']

const phoneNumber = ['+12025550108']

// If these filters are included, the response will contain only users that own any of these emails and/or phone numbers.
const { data, totalCount } = await clerkClient.users.getUserList({ emailAddress, phoneNumber })
```

### Filter by query

To do a broader match through a list of fields, you can use the query parameter which partially matches the fields: `userId`, `emailAddress`, `phoneNumber`, `username`, `web3Wallet`, `firstName` and `lastName`.

```tsx
// Matches users with the string `test` matched in multiple user attributes.
const { data, totalCount } = await clerkClient.users.getUserList({
  query: 'test',
})
```

### Filter by last sign-in date

Retrieve users that signed in within a specific time range.

```tsx
// Matches users that signed in between the given Unix timestamps.
const { data, totalCount } = await clerkClient.users.getUserList({
  lastSignInAtAfter: 1700690400000,
  lastSignInAtBefore: 1700690400010,
})
```

## Backend API (BAPI) endpoint

This method in the SDK is a wrapper around the BAPI endpoint `GET/users`. See the [BAPI reference](https://clerk.com/docs/reference/backend-api/tag/users/get/users.md){{ target: '_blank' }} for more information.

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
