# BillingPaymentResource

> Billing is currently in Beta and its APIs are experimental and may undergo breaking changes. To mitigate potential disruptions, we recommend [pinning](https://clerk.com/docs/pinning.md) your SDK and `clerk-js` package versions.

The `BillingPaymentResource` type represents a payment attempt for a user or Organization.

## Properties

| Property                                         | Type                                                                                                                                                | Description                                                                                                                       |
| ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| <a id="amount"></a> `amount`                     | [`BillingMoneyAmount`](https://clerk.com/docs/reference/javascript/types/billing-money-amount.md)                                                   | The amount of the payment.                                                                                                        |
| <a id="chargetype"></a> `chargeType`             | `"checkout" | "recurring"`                                                                                                               | The type of charge this payment represents. Can be `'checkout'` for one-time payments or `'recurring'` for subscription payments. |
| <a id="failedat"></a> `failedAt`                 | `null | Date`                                                                                                                            | The date and time when the payment failed.                                                                                        |
| <a id="id"></a> `id`                             | `string`                                                                                                                                            | The unique identifier for the payment.                                                                                            |
| <a id="paidat"></a> `paidAt`                     | `null | Date`                                                                                                                            | The date and time when the payment was successfully completed.                                                                    |
| <a id="pathroot"></a> `pathRoot`                 | `string`                                                                                                                                            | The root path of the resource.                                                                                                    |
| <a id="paymentmethod"></a> `paymentMethod`       | <code>null | <a href="https://clerk.com/docs/reference/javascript/types/billing-payment-method-resource.md">BillingPaymentMethodResource</a></code> | The payment method being used for the payment, such as credit card or bank account.                                               |
| <a id="status"></a> `status`                     | `"pending" | "paid" | "failed"`                                                                                                          | The current status of the payment.                                                                                                |
| <a id="subscriptionitem"></a> `subscriptionItem` | [`BillingSubscriptionItemResource`](https://clerk.com/docs/reference/javascript/types/billing-subscription-item-resource.md)                        | The subscription item being paid for.                                                                                             |
| <a id="updatedat"></a> `updatedAt`               | `Date`                                                                                                                                              | The date and time when the payment was last updated.                                                                              |

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
