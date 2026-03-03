# Billing object

> Billing is currently in Beta and its APIs are experimental and may undergo breaking changes. To mitigate potential disruptions, we recommend [pinning](https://clerk.com/docs/pinning.md) your SDK and `clerk-js` package versions.

The `Billing` object provides methods for managing billing for a user or organization.

> If an `orgId` parameter is not provided, the methods will automatically use the current user's ID.

## Methods

### `getPaymentAttempt()`

Returns details of a specific payment attempt for the current user or supplied Organization. Returns a [`BillingPaymentResource`](https://clerk.com/docs/reference/javascript/types/billing-payment-resource.md) object.

```ts
function getPaymentAttempt(params: GetPaymentAttemptParams): Promise<BillingPaymentResource>
```

#### `GetPaymentAttemptParams`

| Name   | Type   | Description                                    |
| ------ | ------ | ---------------------------------------------- |
| id     | string | The ID of the payment attempt to fetch.        |
| orgId? | string | The Organization ID to perform the request on. |

#### Example

```js
await clerk.billing.getPaymentAttempt({
  id: 'payment_attempt_123',
})
```

### `getPaymentAttempts()`

Returns a list of payment attempts for the current user or supplied Organization. Returns a [`ClerkPaginatedResponse`](https://clerk.com/docs/reference/javascript/types/clerk-paginated-response.md) of [`BillingPaymentResource`](https://clerk.com/docs/reference/javascript/types/billing-payment-resource.md) objects.

```ts
function getPaymentAttempts(
  params: GetPaymentAttemptsParams,
): Promise<ClerkPaginatedResponse<BillingPaymentResource>>
```

#### `GetPaymentAttemptsParams`

| Name         | Type   | Description                                                                                                                                    |
| ------------ | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| initialPage? | number | A number that specifies which page to fetch. For example, if initialPage is set to 10, it will skip the first 9 pages and fetch the 10th page. |
| pageSize?    | number | A number that specifies the maximum number of results to return per page.                                                                      |
| orgId?       | string | The Organization ID to perform the request on.                                                                                                 |

#### Example

```js
await clerk.billing.getPaymentAttempts()
```

### `getPlan()`

Returns a Billing Plan by ID. Returns a [`BillingPlanResource`](https://clerk.com/docs/reference/javascript/types/billing-plan-resource.md) object.

```ts
function getPlan(params: GetPlanParams): Promise<BillingPlanResource>
```

#### `GetPlanParams`

| Name | Type   | Description                  |
| ---- | ------ | ---------------------------- |
| id   | string | The ID of the Plan to fetch. |

#### Example

```js
await clerk.billing.getPlan({
  id: 'plan_123',
})
```

### `getPlans()`

Returns a list of all publically visible Billing Plans. Returns a [`ClerkPaginatedResponse`](https://clerk.com/docs/reference/javascript/types/clerk-paginated-response.md) of [`BillingPlanResource`](https://clerk.com/docs/reference/javascript/types/billing-plan-resource.md) objects.

```ts
function getPlans(params?: GetPlansParams): Promise<ClerkPaginatedResponse<BillingPlanResource>>
```

#### `GetPlansParams`

| Name         | Type                     | Description                                                                                                                                    |
| ------------ | ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| for?         | "user" | "organization" | The type of payer for the Plans.                                                                                                               |
| initialPage? | number                   | A number that specifies which page to fetch. For example, if initialPage is set to 10, it will skip the first 9 pages and fetch the 10th page. |
| pageSize?    | number                   | A number that specifies the maximum number of results to return per page.                                                                      |

#### Example

```js
await clerk.billing.getPlans()
```

### `getStatement()`

Returns a billing statement by ID. Returns a [`BillingStatementResource`](https://clerk.com/docs/reference/javascript/types/billing-statement-resource.md) object.

```ts
function getStatement(params: GetStatementParams): Promise<BillingStatementResource>
```

#### `GetStatementParams`

| Name   | Type   | Description                                    |
| ------ | ------ | ---------------------------------------------- |
| id     | string | The ID of the statement to fetch.              |
| orgId? | string | The Organization ID to perform the request on. |

#### Example

```js
await clerk.billing.getStatement({
  id: 'statement_123',
})
```

### `getStatements()`

Returns a list of billing statements for the current user or supplied Organization. Returns a [`ClerkPaginatedResponse`](https://clerk.com/docs/reference/javascript/types/clerk-paginated-response.md) of [`BillingStatementResource`](https://clerk.com/docs/reference/javascript/types/billing-statement-resource.md) objects.

```ts
function getStatements(
  params: GetStatementsParams,
): Promise<ClerkPaginatedResponse<BillingStatementResource>>
```

#### `GetStatementsParams`

| Name         | Type   | Description                                                                                                                                    |
| ------------ | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| initialPage? | number | A number that specifies which page to fetch. For example, if initialPage is set to 10, it will skip the first 9 pages and fetch the 10th page. |
| pageSize?    | number | A number that specifies the maximum number of results to return per page.                                                                      |
| orgId?       | string | The Organization ID to perform the request on.                                                                                                 |

#### Example

```js
await clerk.billing.getStatements()
```

### `getSubscription()`

Returns the main Billing Subscription for the current user or supplied Organization. Returns a [`BillingSubscriptionResource`](https://clerk.com/docs/reference/javascript/types/billing-subscription-resource.md) object.

```ts
function getSubscription(params: GetSubscriptionParams): Promise<BillingSubscriptionResource>
```

#### `GetSubscriptionParams`

| Name   | Type   | Description                                    |
| ------ | ------ | ---------------------------------------------- |
| orgId? | string | The Organization ID to perform the request on. |

#### Example

```js
await clerk.billing.getSubscription({
  orgId: 'org_123',
})
```

### `startCheckout()`

Creates a new billing checkout for the current user or supplied Organization. Returns a [`BillingCheckoutResource`](https://clerk.com/docs/reference/javascript/types/billing-checkout-resource.md) object.

```ts
function startCheckout(params: CreateCheckoutParams): Promise<BillingCheckoutResource>
```

#### `CreateCheckoutParams`

| Name       | Type                | Description                                    |
| ---------- | ------------------- | ---------------------------------------------- |
| planId     | string              | The unique identifier for the Plan.            |
| planPeriod | "month" | "annual" | The billing period for the Plan.               |
| orgId?     | string              | The Organization ID to perform the request on. |

#### Example

```js
await clerk.billing.startCheckout({
  planId: 'plan_123',
  planPeriod: 'month',
})
```

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
