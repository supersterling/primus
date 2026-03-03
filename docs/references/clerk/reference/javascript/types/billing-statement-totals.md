# BillingStatementTotals

> Billing is currently in Beta and its APIs are experimental and may undergo breaking changes. To mitigate potential disruptions, we recommend [pinning](https://clerk.com/docs/pinning.md) your SDK and `clerk-js` package versions.

The `BillingStatementTotals` type represents the total costs, taxes, and other pricing details for a statement.

## Properties

| Property                             | Type                                                                                              | Description                                                                                                               |
| ------------------------------------ | ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| <a id="grandtotal"></a> `grandTotal` | [`BillingMoneyAmount`](https://clerk.com/docs/reference/javascript/types/billing-money-amount.md) | The total amount for the checkout, including taxes and after credits/discounts are applied. This is the final amount due. |
| <a id="subtotal"></a> `subtotal`     | [`BillingMoneyAmount`](https://clerk.com/docs/reference/javascript/types/billing-money-amount.md) | The price of the items or Plan before taxes, credits, or discounts are applied.                                           |
| <a id="taxtotal"></a> `taxTotal`     | [`BillingMoneyAmount`](https://clerk.com/docs/reference/javascript/types/billing-money-amount.md) | The amount of tax included in the checkout.                                                                               |

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
