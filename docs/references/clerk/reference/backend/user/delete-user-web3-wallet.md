# deleteUserWeb3Wallet()

Deletes the Web3 wallet identification for a given user. Returns a [`DeletedObjectResource`](https://clerk.com/docs/reference/javascript/types/deleted-object-resource.md).

```ts
function deleteUserWeb3Wallet(params: DeleteWeb3WalletParams): Promise<DeletedObjectResource>
```

## `DeleteWeb3WalletParams`

| Name                       | Type   | Description                                            |
| -------------------------- | ------ | ------------------------------------------------------ |
| userId                     | string | The ID of the user that owns the Web3 wallet identity. |
| web3WalletIdentificationId | string | The ID of the Web3 wallet identity to be deleted.      |

## Example

> Using `clerkClient` varies based on your framework. Refer to the [`JS Backend SDK overview`](https://clerk.com/docs/js-backend/getting-started/quickstart.md) for usage details, including guidance on [`how to access the userId and other properties`](https://clerk.com/docs/js-backend/getting-started/quickstart.md#get-the-user-id-and-other-properties).

```tsx
const userId = 'user_123'
const web3WalletIdentificationId = 'web3_wallet_identification_123'

const response = await clerkClient.users.deleteUserWeb3Wallet({
  userId,
  web3WalletIdentificationId,
})
```

## Backend API (BAPI) endpoint

This method in the SDK is a wrapper around the BAPI endpoint `DELETE/users/{user_id}/web3_wallets/{web3_wallet_identification_id}`. See the [BAPI reference](https://clerk.com/docs/reference/backend-api/tag/users/delete/users/%7Buser_id%7D/web3_wallets/%7Bweb3_wallet_identification_id%7D.md){{ target: '_blank' }} for more information.

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
