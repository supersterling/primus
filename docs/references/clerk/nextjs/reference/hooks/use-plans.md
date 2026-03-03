# usePlans()

> Billing is currently in Beta and its APIs are experimental and may undergo breaking changes. To mitigate potential disruptions, we recommend [pinning](https://clerk.com/docs/pinning.md) your SDK and `clerk-js` package versions.

The `usePlans()` hook provides access to the Subscription Plans available in your application. It returns a paginated list of Plans and includes methods for managing them.

## Parameters

`usePlans()` accepts a single optional object with the following properties:

| Property                                          | Type                                 | Description                                                                                                                                                               |
| ------------------------------------------------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="enabled"></a> `enabled?`                   | `boolean`                            | If `true`, a request will be triggered when the hook is mounted. Defaults to `true`.                                                                                      |
| <a id="for"></a> `for?`                           | `"user" | "organization"` | Specifies whether to fetch for the current user or Organization. Defaults to `'user'`.                                                                                    |
| <a id="infinite"></a> `infinite?`                 | `boolean`                            | If `true`, newly fetched data will be appended to the existing list rather than replacing it. Useful for implementing infinite scroll functionality. Defaults to `false`. |
| <a id="initialpage"></a> `initialPage?`           | `number`                             | A number that specifies which page to fetch. For example, if `initialPage` is set to 10, it will skip the first 9 pages and fetch the 10th page. Defaults to `1`.         |
| <a id="keeppreviousdata"></a> `keepPreviousData?` | `boolean`                            | If `true`, the previous data will be kept in the cache until new data is fetched. Defaults to `false`.                                                                    |
| <a id="pagesize"></a> `pageSize?`                 | `number`                             | A number that specifies the maximum number of results to return per page. Defaults to `10`.                                                                               |

## Returns

`usePlans()` returns an object with the following properties:

| Property                                       | Type                                                                                                                                                                                                                                                                                                | Description                                                                                                                                                                                                                       |
| ---------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="count"></a> `count`                     | `number`                                                                                                                                                                                                                                                                                            | The total count of data that exist remotely.                                                                                                                                                                                      |
| <a id="data"></a> `data`                       | <code><a href="https://clerk.com/docs/reference/javascript/types/billing-plan-resource.md">`BillingPlanResource`</a>[]</code>                                                                                                                                                            | An array that contains the fetched data. For example, for the `memberships` attribute, data will be an array of [`OrganizationMembership`](https://clerk.com/docs/reference/javascript/types/organization-membership.md) objects. |
| <a id="error"></a> `error`                     | `null | ClerkAPIResponseError`                                                                                                                                                                                                                                                           | Clerk's API response error object.                                                                                                                                                                                                |
| <a id="fetchnext"></a> `fetchNext`             | `() => void`                                                                                                                                                                                                                                                                             | A function that triggers the next page to be loaded. This is the same as `fetchPage(page => Math.min(pageCount, page + 1))`.                                                                                                      |
| <a id="fetchpage"></a> `fetchPage`             | `ValueOrSetter`<`number`>                                                                                                                                                                                                                                                                          | A function that triggers a specific page to be loaded.                                                                                                                                                                            |
| <a id="fetchprevious"></a> `fetchPrevious`     | `() => void`                                                                                                                                                                                                                                                                             | A function that triggers the previous page to be loaded. This is the same as `fetchPage(page => Math.max(0, page - 1))`.                                                                                                          |
| <a id="hasnextpage"></a> `hasNextPage`         | `boolean`                                                                                                                                                                                                                                                                                           | A boolean that indicates if there are available pages to be fetched.                                                                                                                                                              |
| <a id="haspreviouspage"></a> `hasPreviousPage` | `boolean`                                                                                                                                                                                                                                                                                           | A boolean that indicates if there are available pages to be fetched.                                                                                                                                                              |
| <a id="iserror"></a> `isError`                 | `boolean`                                                                                                                                                                                                                                                                                           | A boolean that indicates the request failed.                                                                                                                                                                                      |
| <a id="isfetching"></a> `isFetching`           | `boolean`                                                                                                                                                                                                                                                                                           | A boolean that is `true` if there is an ongoing request or a revalidation.                                                                                                                                                        |
| <a id="isloading"></a> `isLoading`             | `boolean`                                                                                                                                                                                                                                                                                           | A boolean that is `true` if there is an ongoing request and there is no fetched data.                                                                                                                                             |
| <a id="page"></a> `page`                       | `number`                                                                                                                                                                                                                                                                                            | The current page.                                                                                                                                                                                                                 |
| <a id="pagecount"></a> `pageCount`             | `number`                                                                                                                                                                                                                                                                                            | The total amount of pages. It is calculated based on `count`, `initialPage`, and `pageSize`.                                                                                                                                      |
| <a id="revalidate"></a> `revalidate`           | <code>() => Promise<void></code>                                                                                                                                                                                                                                                                    | A function that triggers a revalidation of the current page.                                                                                                                                                                      |
| <a id="setdata"></a> `setData`                 | `CacheSetter`<<code>undefined | <a href="https://clerk.com/docs/reference/javascript/types/clerk-paginated-response.md">`ClerkPaginatedResponse`</a><<a href="https://clerk.com/docs/reference/javascript/types/billing-plan-resource.md">`BillingPlanResource`</a>></code>> | A function that allows you to set the data manually.                                                                                                                                                                              |

## Examples

### Basic usage

The following example shows how to fetch and display available Plans.

```tsx {{ filename: 'app/billing/plans/page.tsx' }}
'use client'

import { usePlans } from '@clerk/nextjs/experimental'

export default function PlansList() {
  const { data, isLoading, hasNextPage, fetchNext, hasPreviousPage, fetchPrevious } = usePlans({
    for: 'user',
    pageSize: 10,
  })

  if (isLoading) {
    return <div>Loading plans...</div>
  }

  return (
    <ul>
      {data?.map((plan) => (
        <li key={plan.id}>
          <h3>{plan.name}</h3>
          <p>{plan.description}</p>
          <p>Is free plan: {!plan.hasBaseFee ? 'Yes' : 'No'}</p>
          <p>
            Price per month: {plan.currency} {plan.amountFormatted}
          </p>
          <p>
            Price per year: {plan.currency} {plan.annualAmountFormatted} equivalent to{' '}
            {plan.currency} {plan.annualMonthlyAmountFormatted} per month
          </p>
          <h4>Features:</h4>
          <ul>
            {plan.features.map((feature) => (
              <li key={feature.id}>{feature.name}</li>
            ))}
          </ul>
        </li>
      ))}

      {hasNextPage && <button onClick={() => fetchNext()}>Next</button>}
      {hasPreviousPage && <button onClick={() => fetchPrevious()}>Previous</button>}
    </ul>
  )
}
```

### Infinite pagination

The following example demonstrates how to implement infinite scrolling with Plans.

```tsx {{ filename: 'app/billing/plans/page.tsx' }}
'use client'

import { usePlans } from '@clerk/nextjs/experimental'

export default function InfinitePlansList() {
  const { data, isLoading, hasNextPage, fetchNext } = usePlans({
    for: 'user',
    infinite: true,
    pageSize: 2,
  })

  if (isLoading) {
    return <div>Loading plans...</div>
  }

  return (
    <div>
      <ul>
        {data?.map((plan) => (
          <li key={plan.id}>
            <h3>{plan.name}</h3>
            <p>{plan.description}</p>
            <p>Is free plan: {!plan.hasBaseFee ? 'Yes' : 'No'}</p>
            <p>
              Price per month: {plan.currency} {plan.amountFormatted}
            </p>
            <p>
              Price per year: {plan.currency} {plan.annualAmountFormatted} equivalent to{' '}
              {plan.currency} {plan.annualMonthlyAmountFormatted} per month
            </p>
            <h4>Features:</h4>
            <ul>
              {plan.features.map((feature) => (
                <li key={feature.id}>{feature.name}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

      {hasNextPage && <button onClick={() => fetchNext()}>Load more plans</button>}
    </div>
  )
}
```

## Next steps

- [Checkout flow with a new payment method](https://clerk.com/docs/guides/development/custom-flows/billing/checkout-new-payment-method.md): Build a custom checkout flow that allows users to add a new payment method during checkout.
- [Checkout flow for returning users](https://clerk.com/docs/guides/development/custom-flows/billing/checkout-existing-payment-method.md): Build a custom checkout flow that allows users to select an existing payment method during checkout.

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
