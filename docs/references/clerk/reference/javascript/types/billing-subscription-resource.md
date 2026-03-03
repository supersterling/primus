# BillingSubscriptionResource

> Billing is currently in Beta and its APIs are experimental and may undergo breaking changes. To mitigate potential disruptions, we recommend [pinning](https://clerk.com/docs/pinning.md) your SDK and `clerk-js` package versions.

The `BillingSubscriptionResource` type represents a subscription to a plan.

## Properties

| Property                                                 | Type                                                                                                                                                 | Description                                                                                                                                      |
| -------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| <a id="activeat"></a> `activeAt`                         | `Date`                                                                                                                                               | The date when the subscription became active.                                                                                                    |
| <a id="createdat"></a> `createdAt`                       | `Date`                                                                                                                                               | The date when the subscription was created.                                                                                                      |
| <a id="eligibleforfreetrial"></a> `eligibleForFreeTrial` | `boolean`                                                                                                                                            | Whether the payer is eligible for a free trial.                                                                                                  |
| <a id="id"></a> `id`                                     | `string`                                                                                                                                             | The unique identifier for the subscription.                                                                                                      |
| <a id="nextpayment"></a> `nextPayment?`                  | <code>{ amount: <a href="https://clerk.com/docs/reference/javascript/types/billing-money-amount.md">BillingMoneyAmount</a>; date: Date; }</code>     | Information about the next payment, including the amount and the date it's due. Returns null if there is no upcoming payment.                    |
| `nextPayment.amount`                                     | [`BillingMoneyAmount`](https://clerk.com/docs/reference/javascript/types/billing-money-amount.md)                                                    | The amount of the next payment.                                                                                                                  |
| `nextPayment.date`                                       | `Date`                                                                                                                                               | The date when the next payment is due.                                                                                                           |
| <a id="pastdueat"></a> `pastDueAt`                       | `null | Date`                                                                                                                             | The date when the subscription became past due, or `null` if the subscription is not past due.                                                   |
| <a id="pathroot"></a> `pathRoot`                         | `string`                                                                                                                                             | The root path of the resource.                                                                                                                   |
| <a id="status"></a> `status`                             | `"active" | "past_due"`                                                                                                                   | The current status of the subscription. Due to the free plan subscription item, the top level subscription can either be `active` or `past_due`. |
| <a id="subscriptionitems"></a> `subscriptionItems`       | <code><a href="https://clerk.com/docs/reference/javascript/types/billing-subscription-item-resource.md">BillingSubscriptionItemResource</a>[]</code> | The list of subscription items included in this subscription.                                                                                    |
| <a id="updatedat"></a> `updatedAt`                       | `null | Date`                                                                                                                             | The date when the subscription was last updated, or `null` if it hasn't been updated.                                                            |

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
