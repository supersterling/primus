# reject()

Rejects a waitlist entry by ID. Returns a [`WaitlistEntry`](https://clerk.com/docs/reference/backend/types/backend-waitlist-entry.md) representing the rejected entry.

```ts
function reject(id: string): Promise<WaitlistEntry>
```

## Parameters

| Name | Type   | Description                             |
| ---- | ------ | --------------------------------------- |
| id   | string | The ID of the waitlist entry to reject. |

## Example

> Using `clerkClient` varies based on your framework. Refer to the [`JS Backend SDK overview`](https://clerk.com/docs/js-backend/getting-started/quickstart.md) for usage details, including guidance on [`how to access the userId and other properties`](https://clerk.com/docs/js-backend/getting-started/quickstart.md#get-the-user-id-and-other-properties).

```tsx
const waitlistId = 'waitlist_123'

const response = await clerkClient.waitlistEntries.reject(waitlistId)
```

## Backend API (BAPI) endpoint

This method in the SDK is a wrapper around the BAPI endpoint `POST/waitlist_entries/{waitlist_entry_id}/reject`. See the [BAPI reference](https://clerk.com/docs/reference/backend-api/tag/waitlist_entries/post/waitlist_entries/%7Bwaitlist_entry_id%7D/reject.md){{ target: '_blank' }} for more information.

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
