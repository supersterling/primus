# cancelSubscriptionItem()

> Billing is currently in Beta and its APIs are experimental and may undergo breaking changes. To mitigate potential disruptions, we recommend [pinning](https://clerk.com/docs/pinning.md) your SDK and `clerk-js` package versions.

Cancels a Subscription Item. Returns the updated [`CommerceSubscriptionItem`](https://clerk.com/docs/reference/backend/types/commerce-subscription-item.md).

```ts
function cancelSubscriptionItem(
  subscriptionItemId: string,
  params?: CancelSubscriptionItemParams,
): Promise<CommerceSubscriptionItem>
```

## `CancelSubscriptionItemParams`

| Name    | Type    | Description                                                                                                                                     |
| ------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| endNow? | boolean | If true, the Subscription Item will be canceled immediately. If false or omitted, it will be canceled at the end of the current billing period. |

## Example

> Using `clerkClient` varies based on your framework. Refer to the [`JS Backend SDK overview`](https://clerk.com/docs/js-backend/getting-started/quickstart.md) for usage details, including guidance on [`how to access the userId and other properties`](https://clerk.com/docs/js-backend/getting-started/quickstart.md#get-the-user-id-and-other-properties).

```tsx
const response = await clerkClient.billing.cancelSubscriptionItem('subi_123', { endNow: true })
```

## Backend API (BAPI) endpoint

This method in the SDK is a wrapper around the BAPI endpoint `DELETE /commerce/subscription_items/{id}`. See the [BAPI reference](https://clerk.com/docs/reference/backend-api/tag/commerce/delete/commerce/subscription_items/%7Bsubscription_item_id%7D.md){{ target: '_blank' }} for more information.

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
