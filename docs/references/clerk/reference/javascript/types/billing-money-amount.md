# BillingMoneyAmount

> Billing is currently in Beta and its APIs are experimental and may undergo breaking changes. To mitigate potential disruptions, we recommend [pinning](https://clerk.com/docs/pinning.md) your SDK and `clerk-js` package versions.

The `BillingMoneyAmount` type represents a monetary value with currency information.

## Properties

| Property                                       | Type     | Description                                                                                                                    |
| ---------------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------ |
| <a id="amount"></a> `amount`                   | `number` | The raw amount as a number, usually in the smallest unit of the currency (like cents for USD). For example, `1000` for $10.00. |
| <a id="amountformatted"></a> `amountFormatted` | `string` | The amount as a formatted string. For example, `10.00` for $10.00.                                                             |
| <a id="currency"></a> `currency`               | `string` | The ISO currency code for this amount. For example, `USD`.                                                                     |
| <a id="currencysymbol"></a> `currencySymbol`   | `string` | The symbol for the currency. For example, `$`.                                                                                 |

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
