# deleteUserExternalAccount()

Deletes a user's external account by ID. Returns a [`DeletedObjectResource`](https://clerk.com/docs/reference/javascript/types/deleted-object-resource.md).

```ts
function deleteUserExternalAccount(
  params: DeleteUserExternalAccountParams,
): Promise<DeletedObjectResource>
```

## `DeleteUserExternalAccountParams`

| Name              | Type   | Description                                            |
| ----------------- | ------ | ------------------------------------------------------ |
| userId            | string | The ID of the user to delete the external account for. |
| externalAccountId | string | The ID of the external account to delete.              |

## Example

> Using `clerkClient` varies based on your framework. Refer to the [`JS Backend SDK overview`](https://clerk.com/docs/js-backend/getting-started/quickstart.md) for usage details, including guidance on [`how to access the userId and other properties`](https://clerk.com/docs/js-backend/getting-started/quickstart.md#get-the-user-id-and-other-properties).

```tsx
const userId = 'user_123'
const externalAccountId = 'external_account_123'

const response = await clerkClient.users.deleteUserExternalAccount({
  userId,
  externalAccountId,
})
```

## Backend API (BAPI) endpoint

This method in the SDK is a wrapper around the BAPI endpoint `DELETE/users/{user_id}/external_accounts/{external_account_id}`. See the [BAPI reference](https://clerk.com/docs/reference/backend-api/tag/users/delete/users/%7Buser_id%7D/external_accounts/%7Bexternal_account_id%7D.md){{ target: '_blank' }} for more information.

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
