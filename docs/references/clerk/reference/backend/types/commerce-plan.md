# CommercePlan

> Billing is currently in Beta and its APIs are experimental and may undergo breaking changes. To mitigate potential disruptions, we recommend [pinning](https://clerk.com/docs/pinning.md) your SDK and `clerk-js` package versions.

The `CommercePlan` object is similar to the [`BillingPlanResource`](https://clerk.com/docs/reference/javascript/types/billing-plan-resource.md) object as it holds information about a Plan, as well as methods for managing it. However, the `CommercePlan` object is different in that it is used in the [Backend API](https://clerk.com/docs/reference/backend-api/model/commerceplan.md){{ target: '_blank' }} and is not directly accessible from the Frontend API.

## Properties

| Name             | Type                | Description                                                    |
| ---------------- | ------------------- | -------------------------------------------------------------- |
| id               | string              | The unique identifier for the Plan.                            |
| productId        | string              | The ID of the product the Plan belongs to.                     |
| name             | string              | The name of the Plan.                                          |
| slug             | string              | The URL-friendly identifier of the Plan.                       |
| description      | undefined | string | The description of the Plan.                                   |
| isDefault        | boolean             | Whether the Plan is the default Plan.                          |
| isRecurring      | boolean             | Whether the Plan is recurring.                                 |
| hasBaseFee       | boolean             | Whether the Plan has a base fee.                               |
| publiclyVisible  | boolean             | Whether the Plan is displayed in the <PriceTable/> component. |
| fee              | BillingMoneyAmount  | The monthly fee of the Plan.                                   |
| annualFee        | BillingMoneyAmount  | The annual fee of the Plan.                                    |
| annualMonthlyFee | BillingMoneyAmount  | The annual fee of the Plan on a monthly basis.                 |
| forPayerType     | 'user' | 'org'     | The type of payer for the Plan.                                |
| features         | Feature[]          | The Features the Plan offers.                                  |

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
