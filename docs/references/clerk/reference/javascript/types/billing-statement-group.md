# BillingStatementGroup

> Billing is currently in Beta and its APIs are experimental and may undergo breaking changes. To mitigate potential disruptions, we recommend [pinning](https://clerk.com/docs/pinning.md) your SDK and `clerk-js` package versions.

The `BillingStatementGroup` type represents a group of payment items within a statement.

## Properties

| Property                           | Type                                                                                                                              | Description                                                                     |
| ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| <a id="items"></a> `items`         | <code><a href="https://clerk.com/docs/reference/javascript/types/billing-payment-resource.md">BillingPaymentResource</a>[]</code> | An array of payment resources that belong to this group.                        |
| <a id="timestamp"></a> `timestamp` | `Date`                                                                                                                            | The date and time when this group of payment items was created or last updated. |

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
