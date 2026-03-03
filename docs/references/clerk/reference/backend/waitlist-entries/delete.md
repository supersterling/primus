# delete()

Deletes a pending waitlist entry by ID. Returns a [`DeletedObjectResource`](https://clerk.com/docs/reference/javascript/types/deleted-object-resource.md).

```ts {{ prettier: false }}
function delete(
  id: string,
): Promise<DeletedObjectResource>
```

## Parameters

| Name | Type   | Description                             |
| ---- | ------ | --------------------------------------- |
| id   | string | The ID of the waitlist entry to delete. |

## Example

> Using `clerkClient` varies based on your framework. Refer to the [`JS Backend SDK overview`](https://clerk.com/docs/js-backend/getting-started/quickstart.md) for usage details, including guidance on [`how to access the userId and other properties`](https://clerk.com/docs/js-backend/getting-started/quickstart.md#get-the-user-id-and-other-properties).

```tsx
const waitlistId = 'waitlist_123'

const response = await clerkClient.waitlistEntries.delete(waitlistId)
```

## Backend API (BAPI) endpoint

This method in the SDK is a wrapper around the BAPI endpoint `DELETE/waitlist_entries/{waitlist_entry_id}`. See the [BAPI reference](https://clerk.com/docs/reference/backend-api/tag/waitlist_entries/delete/waitlist_entries/%7Bwaitlist_entry_id%7D.md){{ target: '_blank' }} for more information.

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
