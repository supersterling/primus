# BillingCheckoutResource

> Billing is currently in Beta and its APIs are experimental and may undergo breaking changes. To mitigate potential disruptions, we recommend [pinning](https://clerk.com/docs/pinning.md) your SDK and `clerk-js` package versions.

The `BillingCheckoutResource` type represents information about a checkout session.

## Properties

| Property                                                   | Type                                                                                                                                                                                     | Description                                                                                                                                         |
| ---------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="confirm"></a> `confirm`                             | <code>(params: <a href="https://clerk.com/docs/reference/javascript/types/billing-checkout-resource.md#parameters">ConfirmCheckoutParams</a>) => Promise<BillingCheckoutResource></code> | A function to confirm and finalize the checkout process, usually after payment information has been provided and validated. [Learn more.](#confirm) |
| <a id="externalclientsecret"></a> `externalClientSecret`   | `string`                                                                                                                                                                                 | A client secret from an external payment provider (such as Stripe) used to complete the payment on the client-side.                                 |
| <a id="externalgatewayid"></a> `externalGatewayId`         | `string`                                                                                                                                                                                 | The identifier for the external payment gateway used for this checkout session.                                                                     |
| <a id="freetrialendsat"></a> `freeTrialEndsAt?`            | `Date`                                                                                                                                                                                   | Unix timestamp (milliseconds) of when the free trial ends.                                                                                          |
| <a id="id"></a> `id`                                       | `string`                                                                                                                                                                                 | The unique identifier for the checkout session.                                                                                                     |
| <a id="isimmediateplanchange"></a> `isImmediatePlanChange` | `boolean`                                                                                                                                                                                | Whether the Plan change will take effect immediately after checkout.                                                                                |
| <a id="needspaymentmethod"></a> `needsPaymentMethod`       | `boolean`                                                                                                                                                                                | Whether a payment method is required for this checkout.                                                                                             |
| <a id="pathroot"></a> `pathRoot`                           | `string`                                                                                                                                                                                 | The root path of the resource.                                                                                                                      |
| <a id="payer"></a> `payer`                                 | [`BillingPayerResource`](https://clerk.com/docs/reference/javascript/types/billing-payer-resource.md)                                                                                    | The payer associated with the checkout.                                                                                                             |
| <a id="paymentmethod"></a> `paymentMethod?`                | [`BillingPaymentMethodResource`](https://clerk.com/docs/reference/javascript/types/billing-payment-method-resource.md)                                                                   | The payment method being used for the checkout, such as a credit card or bank account.                                                              |
| <a id="plan"></a> `plan`                                   | [`BillingPlanResource`](https://clerk.com/docs/reference/javascript/types/billing-plan-resource.md)                                                                                      | The Subscription Plan details for the checkout.                                                                                                     |
| <a id="planperiod"></a> `planPeriod`                       | `"month" | "annual"`                                                                                                                                                          | The billing period for the Plan.                                                                                                                    |
| <a id="planperiodstart"></a> `planPeriodStart?`            | `number`                                                                                                                                                                                 | The start date of the Plan period, represented as a Unix timestamp.                                                                                 |
| <a id="status"></a> `status`                               | `"needs_confirmation" | "completed"`                                                                                                                                          | The current status of the checkout session.                                                                                                         |
| <a id="totals"></a> `totals`                               | [`BillingCheckoutTotals`](https://clerk.com/docs/reference/javascript/types/billing-checkout-totals.md)                                                                                  | The total costs, taxes, and other pricing details for the checkout.                                                                                 |

### `confirm()`

The `confirm()` function is used to confirm and finalize the checkout process, usually after payment information has been provided and validated.

#### Parameters

The `confirm()` method accepts the following parameters. **Only one of `paymentMethodId`, `paymentToken`, or `useTestCard` should be provided.**

There are multiple variants of this type available which you can select by clicking on one of the tabs.

**paymentMethodId**

| Name               | Type     | Description                                                |
| ------------------ | -------- | ---------------------------------------------------------- |
| `paymentMethodId?` | `string` | The ID of a saved payment method to use for this checkout. |

**paymentToken**

| Name            | Type       | Description                                                                                               |
| --------------- | ---------- | --------------------------------------------------------------------------------------------------------- |
| `gateway?`      | `"stripe"` | The payment gateway to use. **Required** if `paymentToken` or `useTestCard` is provided.                  |
| `paymentToken?` | `string`   | A token representing payment details, usually from a payment form. **Requires** `gateway` to be provided. |

**useTestCard**

| Name           | Type       | Description                                                                              |
| -------------- | ---------- | ---------------------------------------------------------------------------------------- |
| `gateway?`     | `"stripe"` | The payment gateway to use. **Required** if `paymentToken` or `useTestCard` is provided. |
| `useTestCard?` | `boolean`  | If true, uses a test card for the checkout. **Requires** `gateway` to be provided.       |

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
