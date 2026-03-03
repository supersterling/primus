# getOrganizationBillingSubscription()

> Billing is currently in Beta and its APIs are experimental and may undergo breaking changes. To mitigate potential disruptions, we recommend [pinning](https://clerk.com/docs/pinning.md) your SDK and `clerk-js` package versions.

Retrieves an Organization's Billing Subscription. Returns a [`CommerceSubscription`](https://clerk.com/docs/reference/backend/types/commerce-subscription.md).

```ts
function getOrganizationBillingSubscription(organizationId: string): Promise<CommerceSubscription>
```

## Example

> Using `clerkClient` varies based on your framework. Refer to the [`JS Backend SDK overview`](https://clerk.com/docs/js-backend/getting-started/quickstart.md) for usage details, including guidance on [`how to access the userId and other properties`](https://clerk.com/docs/js-backend/getting-started/quickstart.md#get-the-user-id-and-other-properties).

```tsx
const organizationId = 'org_123'

const subscription = await clerkClient.billing.getOrganizationBillingSubscription(organizationId)
```

## Backend API (BAPI) endpoint

This method in the SDK is a wrapper around the BAPI endpoint `GET /organizations/{organization_id}/billing/subscription`. See the [BAPI reference](https://clerk.com/docs/reference/backend-api/tag/billing/get/organizations/%7Borganization_id%7D/billing/subscription.md){{ target: '_blank' }} for more information.

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
