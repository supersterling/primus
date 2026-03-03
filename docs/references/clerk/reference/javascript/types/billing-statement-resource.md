# BillingStatementResource

> Billing is currently in Beta and its APIs are experimental and may undergo breaking changes. To mitigate potential disruptions, we recommend [pinning](https://clerk.com/docs/pinning.md) your SDK and `clerk-js` package versions.

The `BillingStatementResource` type represents a billing statement for a user or Organization.

## Properties

| Property                           | Type                                                                                                                            | Description                                                                                                                            |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="groups"></a> `groups`       | <code><a href="https://clerk.com/docs/reference/javascript/types/billing-statement-group.md">BillingStatementGroup</a>[]</code> | An array of statement groups, where each group contains payment items organized by timestamp.                                          |
| <a id="id"></a> `id`               | `string`                                                                                                                        | The unique identifier for the statement.                                                                                               |
| <a id="pathroot"></a> `pathRoot`   | `string`                                                                                                                        | The root path of the resource.                                                                                                         |
| <a id="status"></a> `status`       | `"open" | "closed"`                                                                                                  | The current status of the statement. Statements can be either `'open'` (still accumulating charges) or `'closed'` (finalized).         |
| <a id="timestamp"></a> `timestamp` | `Date`                                                                                                                          | The date and time when the statement was created or last updated.                                                                      |
| <a id="totals"></a> `totals`       | [`BillingStatementTotals`](https://clerk.com/docs/reference/javascript/types/billing-statement-totals.md)                       | An object containing the financial totals for the statement, including subtotal, grand total, tax total, credit, and past due amounts. |

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
