# getPlanList()

> Billing is currently in Beta and its APIs are experimental and may undergo breaking changes. To mitigate potential disruptions, we recommend [pinning](https://clerk.com/docs/pinning.md) your SDK and `clerk-js` package versions.

Retrieves a list of Billing Plans. Returns a [`PaginatedResourceResponse`](https://clerk.com/docs/reference/backend/types/paginated-resource-response.md) object with a `data` property that contains an array of [`CommercePlan`](https://clerk.com/docs/reference/backend/types/commerce-plan.md) objects, and a `totalCount` property that indicates the total number of Billing Plans.

```ts
function getPlanList(
  params?: GetOrganizationListParams,
): Promise<PaginatedResourceResponse<CommercePlan[]>>
```

## `GetOrganizationListParams`

| Name       | Type            | Description                                                                                                    |
| ---------- | --------------- | -------------------------------------------------------------------------------------------------------------- |
| limit?     | number          | The number of results to return. Must be an integer greater than zero and less than 501. Defaults to 10.       |
| offset?    | number          | Skip the first offset results when paginating. Needs to be an integer greater or equal to zero. Defaults to 0. |
| payerType? | 'org' | 'user' | Filter Plans by payer type.                                                                                    |

## Example

> Using `clerkClient` varies based on your framework. Refer to the [`JS Backend SDK overview`](https://clerk.com/docs/js-backend/getting-started/quickstart.md) for usage details, including guidance on [`how to access the userId and other properties`](https://clerk.com/docs/js-backend/getting-started/quickstart.md#get-the-user-id-and-other-properties).

```tsx
const { data, totalCount } = await clerkClient.billing.getPlanList({ payerType: 'org' })
```

## Backend API (BAPI) endpoint

This method in the SDK is a wrapper around the BAPI endpoint `GET /commerce/plans`. See the [BAPI reference](https://clerk.com/docs/reference/backend-api/tag/commerce/get/commerce/plans.md){{ target: '_blank' }} for more information.

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
