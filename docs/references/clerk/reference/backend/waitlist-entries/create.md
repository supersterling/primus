# create()

Creates a [`WaitlistEntry`](https://clerk.com/docs/reference/backend/types/backend-waitlist-entry.md) for the given email address. If the email address is already on the waitlist, no new entry will be created and the existing waitlist entry will be returned.

```ts
function create(params: WaitlistEntryCreateParams): Promise<WaitlistEntry>
```

## `WaitlistEntryCreateParams`

| Name         | Type    | Description                                                           |
| ------------ | ------- | --------------------------------------------------------------------- |
| emailAddress | string  | The email address to add to the waitlist.                             |
| notify?      | boolean | Whether to send an email notification to the user. Defaults to false. |

## Example

> Using `clerkClient` varies based on your framework. Refer to the [`JS Backend SDK overview`](https://clerk.com/docs/js-backend/getting-started/quickstart.md) for usage details, including guidance on [`how to access the userId and other properties`](https://clerk.com/docs/js-backend/getting-started/quickstart.md#get-the-user-id-and-other-properties).

```tsx
const params = {
  emailAddress: 'user2@example.com',
  notify: true,
}

const response = await clerkClient.waitlistEntries.create(params)
```

## Backend API (BAPI) endpoint

This method in the SDK is a wrapper around the BAPI endpoint `POST/waitlist_entries`. See the [BAPI reference](https://clerk.com/docs/reference/backend-api/tag/waitlist-entries/post/waitlist_entries.md){{ target: '_blank' }} for more information.

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
