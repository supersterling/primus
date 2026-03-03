# deleteDomain()

Deletes a satellite domain for the instance. It is currently not possible to delete the instance's primary domain. Returns a [`DeletedObjectResource`](https://clerk.com/docs/reference/javascript/types/deleted-object-resource.md).

```ts
function deleteDomain(id: string): Promise<DeletedObjectResource>
```

## Parameters

| Name | Type   | Description                                                            |
| ---- | ------ | ---------------------------------------------------------------------- |
| id   | string | The ID of the domain that will be deleted. Must be a satellite domain. |

## Example

> Using `clerkClient` varies based on your framework. Refer to the [`JS Backend SDK overview`](https://clerk.com/docs/js-backend/getting-started/quickstart.md) for usage details, including guidance on [`how to access the userId and other properties`](https://clerk.com/docs/js-backend/getting-started/quickstart.md#get-the-user-id-and-other-properties).

```tsx
const id = 'test_123'

const response = await clerkClient.users.deleteDomain(id)
```

## Backend API (BAPI) endpoint

This method in the SDK is a wrapper around the BAPI endpoint `DELETE/domains/{domain_id}`. See the [BAPI reference](https://clerk.com/docs/reference/backend-api/tag/domains/delete/domains/%7Bdomain_id%7D.md){{ target: '_blank' }} for more information.

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
