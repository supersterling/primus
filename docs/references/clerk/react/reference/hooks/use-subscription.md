# useSubscription()

> Billing is currently in Beta and its APIs are experimental and may undergo breaking changes. To mitigate potential disruptions, we recommend [pinning](https://clerk.com/docs/pinning.md) your SDK and `clerk-js` package versions.

The `useSubscription()` hook provides access to Subscription information for users or Organizations in your application. It returns the current Subscription data and includes methods for managing it.

> The `useSubscription()` hook should only be used for accessing and displaying Subscription information. For authorization purposes (i.e., controlling access to Features or content), use the [`has()`](https://clerk.com/docs/guides/secure/authorization-checks.md#use-has-for-authorization-checks) helper or the [`<Protect>`](https://clerk.com/docs/react/reference/components/control/protect.md) component instead.

## Parameters

`useSubscription()` accepts a single optional object with the following properties:

| Property                                          | Type                                 | Description                                                                                          |
| ------------------------------------------------- | ------------------------------------ | ---------------------------------------------------------------------------------------------------- |
| <a id="enabled"></a> `enabled?`                   | `boolean`                            | If `true`, a request will be triggered when the hook is mounted. Defaults to `true`.                 |
| <a id="for"></a> `for?`                           | `"user" | "organization"` | Specifies whether to fetch the Subscription for an Organization or a user. Defaults to `'user'`.     |
| <a id="keeppreviousdata"></a> `keepPreviousData?` | `boolean`                            | If true, the previous data will be kept in the cache until new data is fetched. Defaults to `false`. |

## Returns

`useSubscription()` returns an object with the following properties:

| Property                             | Type                                                                                                                                                                      | Description                                                                                       |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| <a id="data"></a> `data`             | <code>undefined | null | <a href="https://clerk.com/docs/reference/javascript/types/billing-subscription-resource.md">`BillingSubscriptionResource`</a></code> | The subscription object, `undefined` before the first fetch, or `null` if no subscription exists. |
| <a id="error"></a> `error`           | `undefined | Error`                                                                                                                                            | Any error that occurred during the data fetch, or `undefined` if no error occurred.               |
| <a id="isfetching"></a> `isFetching` | `boolean`                                                                                                                                                                 | A boolean that indicates whether any request is still in flight, including background updates.    |
| <a id="isloading"></a> `isLoading`   | `boolean`                                                                                                                                                                 | A boolean that indicates whether the initial data is still being fetched.                         |
| <a id="revalidate"></a> `revalidate` | <code>() => void | Promise<void></code>                                                                                                                                   | Function to manually revalidate or refresh the subscription data.                                 |

## Examples

### Basic usage

The following example shows how to fetch and display Subscription information.

```tsx {{ filename: 'src/pages/pricing/SubscriptionDetails.tsx' }}
import { useSubscription } from '@clerk/clerk-react/experimental'

export default function SubscriptionInfo() {
  const { data, isLoading, error } = useSubscription()

  if (isLoading) {
    return <div>Loading Subscription...</div>
  }

  if (error) {
    return <div>Error loading Subscription: {error.message}</div>
  }

  if (!data) {
    return <div>No Subscription found</div>
  }

  return (
    <div>
      <h2>Your Subscription</h2>
      {/* Display Subscription details */}
    </div>
  )
}
```

### Organization subscription

The following example shows how to fetch an Organization's subscription.

```tsx {{ filename: 'src/pages/pricing/OrganizationSubscription.tsx' }}
import { useSubscription } from '@clerk/clerk-react/experimental'

export default function OrganizationSubscription() {
  const { data, isLoading, revalidate } = useSubscription({
    for: 'organization',
    keepPreviousData: true,
  })

  const handleSubscriptionUpdate = async () => {
    // After making changes to the Subscription
    await revalidate()
  }

  if (isLoading) {
    return <div>Loading Organization Subscription...</div>
  }

  return (
    <div>
      <h2>Organization Subscription</h2>
      {/* Display Organization Subscription details */}
      <button onClick={handleSubscriptionUpdate}>Refresh Subscription</button>
    </div>
  )
}
```

### With error handling

The following example shows how to handle Subscription data with proper error states.

```tsx {{ filename: 'src/pages/pricing/SubscriptionDetails.tsx', collapsible: true }}
import { useSubscription } from '@clerk/clerk-react/experimental'

export function SubscriptionDetails() {
  const { data: subscription, isLoading } = useSubscription()

  if (isLoading) {
    return <div>Loading Subscription...</div>
  }

  if (!subscription) {
    return <div>No Subscription</div>
  }

  return (
    <div className="subscription-details">
      <h2>Subscription Details</h2>
      <div className="status">
        Status: <span className={`status-${subscription.status}`}>{subscription.status}</span>
      </div>

      <div className="dates">
        <p>Active since: {subscription.activeAt.toLocaleDateString()}</p>
        {subscription.pastDueAt && (
          <p className="warning">Past due since: {subscription.pastDueAt.toLocaleDateString()}</p>
        )}
      </div>

      {subscription.nextPayment && (
        <div className="next-payment">
          <h3>Next Payment</h3>
          <p>Amount: {subscription.nextPayment.amount.amountFormatted}</p>
          <p>Due: {subscription.nextPayment.date.toLocaleDateString()}</p>
        </div>
      )}

      <div className="subscription-items">
        <h3>Subscription Items</h3>
        <ul>
          {subscription.subscriptionItems.map((item) => (
            <li key={item.id}>{/* Display Subscription Item details */}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default function Page() {
  const { data, isLoading, error, isFetching, revalidate } = useSubscription()

  if (error) {
    return (
      <div className="error-state">
        <h3>Failed to load Subscription</h3>
        <p>{error.message}</p>
        <button onClick={revalidate}>Try Again</button>
      </div>
    )
  }

  return (
    <div className="subscription-status">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="status-indicator">{isFetching && <span>Refreshing...</span>}</div>
          {data ? <SubscriptionDetails /> : <div>No active Subscription</div>}
        </>
      )}
    </div>
  )
}
```

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
