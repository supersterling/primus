# usePaymentAttempts()

> Billing is currently in Beta and its APIs are experimental and may undergo breaking changes. To mitigate potential disruptions, we recommend [pinning](https://clerk.com/docs/pinning.md) your SDK and `clerk-js` package versions.

The `usePaymentAttempts()` hook provides access to the payment attempts associated with a user or Organization. It returns a paginated list of payment attempts and includes methods for managing them.

## Parameters

`usePaymentAttempts()` accepts a single optional object with the following properties:

| Property                                          | Type                                 | Description                                                                                                                                                               |
| ------------------------------------------------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="enabled"></a> `enabled?`                   | `boolean`                            | If `true`, a request will be triggered when the hook is mounted. Defaults to `true`.                                                                                      |
| <a id="for"></a> `for?`                           | `"user" | "organization"` | Specifies whether to fetch for the current user or Organization. Defaults to `'user'`.                                                                                    |
| <a id="infinite"></a> `infinite?`                 | `boolean`                            | If `true`, newly fetched data will be appended to the existing list rather than replacing it. Useful for implementing infinite scroll functionality. Defaults to `false`. |
| <a id="initialpage"></a> `initialPage?`           | `number`                             | A number that specifies which page to fetch. For example, if `initialPage` is set to 10, it will skip the first 9 pages and fetch the 10th page. Defaults to `1`.         |
| <a id="keeppreviousdata"></a> `keepPreviousData?` | `boolean`                            | If `true`, the previous data will be kept in the cache until new data is fetched. Defaults to `false`.                                                                    |
| <a id="pagesize"></a> `pageSize?`                 | `number`                             | A number that specifies the maximum number of results to return per page. Defaults to `10`.                                                                               |

## Returns

`usePaymentAttempts()` returns an object with the following properties:

| Property                                       | Type                                                                                                                                                                                                                                                                                                      | Description                                                                                                                                                                                                                       |
| ---------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="count"></a> `count`                     | `number`                                                                                                                                                                                                                                                                                                  | The total count of data that exist remotely.                                                                                                                                                                                      |
| <a id="data"></a> `data`                       | <code><a href="https://clerk.com/docs/reference/javascript/types/billing-payment-resource.md">`BillingPaymentResource`</a>[]</code>                                                                                                                                                            | An array that contains the fetched data. For example, for the `memberships` attribute, data will be an array of [`OrganizationMembership`](https://clerk.com/docs/reference/javascript/types/organization-membership.md) objects. |
| <a id="error"></a> `error`                     | `null | ClerkAPIResponseError`                                                                                                                                                                                                                                                                 | Clerk's API response error object.                                                                                                                                                                                                |
| <a id="fetchnext"></a> `fetchNext`             | `() => void`                                                                                                                                                                                                                                                                                   | A function that triggers the next page to be loaded. This is the same as `fetchPage(page => Math.min(pageCount, page + 1))`.                                                                                                      |
| <a id="fetchpage"></a> `fetchPage`             | `ValueOrSetter`<`number`>                                                                                                                                                                                                                                                                                | A function that triggers a specific page to be loaded.                                                                                                                                                                            |
| <a id="fetchprevious"></a> `fetchPrevious`     | `() => void`                                                                                                                                                                                                                                                                                   | A function that triggers the previous page to be loaded. This is the same as `fetchPage(page => Math.max(0, page - 1))`.                                                                                                          |
| <a id="hasnextpage"></a> `hasNextPage`         | `boolean`                                                                                                                                                                                                                                                                                                 | A boolean that indicates if there are available pages to be fetched.                                                                                                                                                              |
| <a id="haspreviouspage"></a> `hasPreviousPage` | `boolean`                                                                                                                                                                                                                                                                                                 | A boolean that indicates if there are available pages to be fetched.                                                                                                                                                              |
| <a id="iserror"></a> `isError`                 | `boolean`                                                                                                                                                                                                                                                                                                 | A boolean that indicates the request failed.                                                                                                                                                                                      |
| <a id="isfetching"></a> `isFetching`           | `boolean`                                                                                                                                                                                                                                                                                                 | A boolean that is `true` if there is an ongoing request or a revalidation.                                                                                                                                                        |
| <a id="isloading"></a> `isLoading`             | `boolean`                                                                                                                                                                                                                                                                                                 | A boolean that is `true` if there is an ongoing request and there is no fetched data.                                                                                                                                             |
| <a id="page"></a> `page`                       | `number`                                                                                                                                                                                                                                                                                                  | The current page.                                                                                                                                                                                                                 |
| <a id="pagecount"></a> `pageCount`             | `number`                                                                                                                                                                                                                                                                                                  | The total amount of pages. It is calculated based on `count`, `initialPage`, and `pageSize`.                                                                                                                                      |
| <a id="revalidate"></a> `revalidate`           | <code>() => Promise<void></code>                                                                                                                                                                                                                                                                          | A function that triggers a revalidation of the current page.                                                                                                                                                                      |
| <a id="setdata"></a> `setData`                 | `CacheSetter`<<code>undefined | <a href="https://clerk.com/docs/reference/javascript/types/clerk-paginated-response.md">`ClerkPaginatedResponse`</a><<a href="https://clerk.com/docs/reference/javascript/types/billing-payment-resource.md">`BillingPaymentResource`</a>></code>> | A function that allows you to set the data manually.                                                                                                                                                                              |

## Examples

### Basic usage

The following example demonstrates how to fetch and display a user's payment attempts.

```tsx {{ filename: 'src/pages/billing/PaymentAttemptsList.tsx' }}
import { usePaymentAttempts } from '@clerk/clerk-react/experimental'

export default function PaymentAttemptsList() {
  const { data, isLoading } = usePaymentAttempts({
    for: 'user',
    pageSize: 10,
  })

  if (isLoading) {
    return <div>Loading payment attempts...</div>
  }

  if (!data || data.length === 0) {
    return <div>No payment attempts found.</div>
  }

  return (
    <ul>
      {data?.map((attempt) => (
        <li key={attempt.id}>
          Payment #{attempt.id} - {attempt.status}
          <br />
          Amount: {attempt.amount.amountFormatted} on {new Date(attempt.updatedAt).toLocaleString()}
        </li>
      ))}
    </ul>
  )
}
```

### Infinite pagination

The following example demonstrates how to implement infinite scrolling with payment attempts.

```tsx {{ filename: 'src/pages/billing/PaymentAttemptsList.tsx' }}
import { usePaymentAttempts } from '@clerk/clerk-react/experimental'

export default function InfinitePaymentAttempts() {
  const { data, isLoading, hasNextPage, fetchNext } = usePaymentAttempts({
    for: 'user',
    infinite: true,
    pageSize: 20,
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!data || data.length === 0) {
    return <div>No payment attempts found.</div>
  }

  return (
    <div>
      <ul>
        {data?.map((attempt) => (
          <li key={attempt.id}>
            Payment attempt for {attempt.amount.amountFormatted}
            <br />
            Status: {attempt.status}
            <br />
            {attempt.status === 'failed' && attempt.failedAt && (
              <span>Failed At: {new Date(attempt.failedAt).toLocaleString()}</span>
            )}
          </li>
        ))}
      </ul>

      {hasNextPage && <button onClick={() => fetchNext()}>Load more payment attempts</button>}
    </div>
  )
}
```

### Payment attempts history table

The following example demonstrates how to use `usePaymentAttempts()` to display a detailed payment history table.

```tsx {{ filename: 'src/pages/billing/PaymentAttemptsHistory.tsx', collapsible: true }}
import { usePaymentAttempts } from '@clerk/clerk-react/experimental'

export default function PaymentAttemptsHistory() {
  const { data, isLoading } = usePaymentAttempts({ for: 'user' })

  if (isLoading) {
    return <div>Loading payment attempts...</div>
  }

  if (!data || data.length === 0) {
    return <div>No payment attempts found.</div>
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'green'
      case 'failed':
        return 'red'
      case 'pending':
        return 'orange'
      default:
        return 'gray'
    }
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Payment ID</th>
          <th>Amount</th>
          <th>Status</th>
          <th>Date</th>
          <th>Payment Method</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((attempt) => (
          <tr key={attempt.id}>
            <td>{attempt.id}</td>
            <td>{attempt.amount.amountFormatted}</td>
            <td style={{ color: getStatusColor(attempt.status) }}>{attempt.status}</td>
            <td>{attempt.paidAt ? new Date(attempt.paidAt).toLocaleDateString() : '-'}</td>
            <td>
              {attempt.paymentSource.cardType} ****{attempt.paymentSource.last4}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
```

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
