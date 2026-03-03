# CommerceSubscription

> Billing is currently in Beta and its APIs are experimental and may undergo breaking changes. To mitigate potential disruptions, we recommend [pinning](https://clerk.com/docs/pinning.md) your SDK and `clerk-js` package versions.

The `CommerceSubscription` object is similar to the [`BillingSubscriptionResource`](https://clerk.com/docs/reference/javascript/types/billing-subscription-resource.md) object as it holds information about a Subscription, as well as methods for managing it. However, the `CommerceSubscription` object is different in that it is used in the [Backend API](https://clerk.com/docs/reference/backend-api/tag/billing/get/organizations/%7Borganization_id%7D/billing/subscription.md){{ target: '_blank' }} and is not directly accessible from the Frontend API.

## Properties

| Name                 | Type                                                                            | Description                                                              |
| -------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| id                   | string                                                                          | The unique identifier for the Subscription.                              |
| status               | "abandoned" | "active" | "ended" | "canceled" | "incomplete" | "past\_due" | The current status of the Subscription.                                  |
| payerId              | string                                                                          | The ID of the payer for this Subscription.                               |
| createdAt            | number                                                                          | Unix timestamp (milliseconds) of when the Subscription was created.      |
| updatedAt            | number                                                                          | Unix timestamp (milliseconds) of when the Subscription was last updated. |
| activeAt             | number | null                                                                  | Unix timestamp (milliseconds) of when the Subscription became active.    |
| pastDueAt            | number | null                                                                  | Unix timestamp (milliseconds) of when the Subscription became past due.  |
| subscriptionItems    | CommerceSubscriptionItem[]                                                     | Array of Subscription Items in this Subscription.                        |
| nextPayment          | null | { amount: BillingMoneyAmount; date: number; }                          | Information about the next scheduled payment.                            |
| eligibleForFreeTrial | boolean                                                                         | Whether the payer is eligible for a free trial.                          |

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
