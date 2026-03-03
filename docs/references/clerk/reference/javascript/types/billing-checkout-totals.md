# BillingCheckoutTotals

> Billing is currently in Beta and its APIs are experimental and may undergo breaking changes. To mitigate potential disruptions, we recommend [pinning](https://clerk.com/docs/pinning.md) your SDK and `clerk-js` package versions.

The `BillingCheckoutTotals` type represents the total costs, taxes, and other pricing details for a checkout session.

## Properties

| Property                                                     | Type                                                                                                                           | Description                                                                                                               |
| ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------- |
| <a id="credit"></a> `credit`                                 | <code>null | <a href="https://clerk.com/docs/reference/javascript/types/billing-money-amount.md">BillingMoneyAmount</a></code> | Any credits (like account balance or promo credits) that are being applied to the checkout.                               |
| <a id="grandtotal"></a> `grandTotal`                         | [`BillingMoneyAmount`](https://clerk.com/docs/reference/javascript/types/billing-money-amount.md)                              | The total amount for the checkout, including taxes and after credits/discounts are applied. This is the final amount due. |
| <a id="pastdue"></a> `pastDue`                               | <code>null | <a href="https://clerk.com/docs/reference/javascript/types/billing-money-amount.md">BillingMoneyAmount</a></code> | Any outstanding amount from previous unpaid invoices that is being collected as part of the checkout.                     |
| <a id="subtotal"></a> `subtotal`                             | [`BillingMoneyAmount`](https://clerk.com/docs/reference/javascript/types/billing-money-amount.md)                              | The price of the items or Plan before taxes, credits, or discounts are applied.                                           |
| <a id="taxtotal"></a> `taxTotal`                             | [`BillingMoneyAmount`](https://clerk.com/docs/reference/javascript/types/billing-money-amount.md)                              | The amount of tax included in the checkout.                                                                               |
| <a id="totaldueafterfreetrial"></a> `totalDueAfterFreeTrial` | <code>null | <a href="https://clerk.com/docs/reference/javascript/types/billing-money-amount.md">BillingMoneyAmount</a></code> | The amount that becomes due after a free trial ends.                                                                      |
| <a id="totalduenow"></a> `totalDueNow`                       | [`BillingMoneyAmount`](https://clerk.com/docs/reference/javascript/types/billing-money-amount.md)                              | The amount that needs to be immediately paid to complete the checkout.                                                    |

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
