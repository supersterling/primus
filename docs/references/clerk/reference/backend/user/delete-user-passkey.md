# deleteUserPasskey()

Deletes the passkey identification for a given user and notifies them through email. Returns a [`DeletedObjectResource`](https://clerk.com/docs/reference/javascript/types/deleted-object-resource.md).

```ts
function deleteUserPasskey(params: DeleteUserPasskeyParams): Promise<DeletedObjectResource>
```

## `DeleteUserPasskeyParams`

| Name                    | Type   | Description                                        |
| ----------------------- | ------ | -------------------------------------------------- |
| userId                  | string | The ID of the user that owns the passkey identity. |
| passkeyIdentificationId | string | The ID of the passkey identity to be deleted.      |

## Example

> Using `clerkClient` varies based on your framework. Refer to the [`JS Backend SDK overview`](https://clerk.com/docs/js-backend/getting-started/quickstart.md) for usage details, including guidance on [`how to access the userId and other properties`](https://clerk.com/docs/js-backend/getting-started/quickstart.md#get-the-user-id-and-other-properties).

```tsx
const userId = 'user_123'
const passkeyIdentificationId = 'passkey_identification_123'

const response = await clerkClient.users.deleteUserPasskey({
  userId,
  passkeyIdentificationId,
})
```

## Backend API (BAPI) endpoint

This method in the SDK is a wrapper around the BAPI endpoint `DELETE/users/{user_id}/passkeys/{passkey_identification_id}`. See the [BAPI reference](https://clerk.com/docs/reference/backend-api/tag/users/delete/users/%7Buser_id%7D/passkeys/%7Bpasskey_identification_id%7D.md){{ target: '_blank' }} for more information.

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
