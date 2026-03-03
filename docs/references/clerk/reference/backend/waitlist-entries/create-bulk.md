# createBulk()

Creates multiple [`WaitlistEntry`](https://clerk.com/docs/reference/backend/types/backend-waitlist-entry.md)s in bulk for the given email addresses.

If an email address is already on the waitlist, no new entry will be created and the existing waitlist entry will be returned.

```ts
function createBulk(params: WaitlistEntryBulkCreateParams): Promise<WaitlistEntry[]>
```

## Parameters

`createBulk()` accepts the following parameters:

| Name   | Type                             | Description                                                     |
| ------ | -------------------------------- | --------------------------------------------------------------- |
| params | WaitlistEntryBulkCreateParams[] | An array of objects, each representing a single waitlist entry. |

### `WaitlistEntryBulkCreateParams`

| Name         | Type    | Description                                                           |
| ------------ | ------- | --------------------------------------------------------------------- |
| emailAddress | string  | The email address to add to the waitlist.                             |
| notify?      | boolean | Whether to send an email notification to the user. Defaults to false. |

## Example

> Using `clerkClient` varies based on your framework. Refer to the [`JS Backend SDK overview`](https://clerk.com/docs/js-backend/getting-started/quickstart.md) for usage details, including guidance on [`how to access the userId and other properties`](https://clerk.com/docs/js-backend/getting-started/quickstart.md#get-the-user-id-and-other-properties).

```tsx
// Each object in the array represents a single waitlist entry
const params = [
  {
    emailAddress: 'user1@example.com',
  },
  {
    emailAddress: 'user2@example.com',
    notify: true,
  },
]

const response = await clerkClient.waitlistEntries.createBulk(params)
```

## Backend API (BAPI) endpoint

This method in the SDK is a wrapper around the BAPI endpoint `POST/waitlist_entries/bulk`. See the [BAPI reference](https://clerk.com/docs/reference/backend-api/tag/waitlist-entries/post/waitlist_entries/bulk.md){{ target: '_blank' }} for more information.

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
