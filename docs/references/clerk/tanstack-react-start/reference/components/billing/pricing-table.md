# <PricingTable />

The `<PricingTable />` component displays a table of Plans and Features that users can subscribe to.

## Example

The following example includes a basic implementation of the `<PricingTable />` component. You can use this as a starting point for your own implementation.

```tsx {{ filename: 'app/routes/pricing.tsx' }}
import { PricingTable } from '@clerk/tanstack-react-start'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/pricing')({
  component: PricingPage,
})

function PricingPage() {
  return <PricingTable />
}
```

## Properties

All props are optional.

| Name                                                                                                                 | Type                     | Description                                                                                                                                                                                                                                                                                                                  |
| -------------------------------------------------------------------------------------------------------------------- | ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| appearance                                                                                                           | Appearance | undefined  | Optional object to style your components. Will only affect Clerk components and not Account Portal pages.                                                                                                                                                                                                                    |
| appearance: an object used to style your components. Will only affect Clerk components and not Account Portal pages. |                          |                                                                                                                                                                                                                                                                                                                              |
| collapseFeatures                                                                                                     | boolean                  | A boolean that indicates whether the Features are collapsed. Requires layout to be set to 'default'. Defaults to false.                                                                                                                                                                                                      |
| ctaPosition                                                                                                          | 'top' | 'bottom'        | The placement of the CTA button. Requires layout to be set to 'default'. Defaults to 'bottom'.                                                                                                                                                                                                                               |
| fallback                                                                                                             | JSX                      | An optional UI to show when the pricing table is loading.                                                                                                                                                                                                                                                                    |
| for                                                                                                                  | 'user' | 'organization' | A string that indicates whether the pricing table is for users or Organizations. If 'user', the pricing table will display a list of Plans and Features that users can subscribe to. If 'organization', the pricing table will display a list of Plans and Features that Organizations can subscribe to. Defaults to 'user'. |
| newSubscriptionRedirectUrl                                                                                           | string                   | The URL to navigate to after the user completes the checkout and selects the "Continue" button.                                                                                                                                                                                                                              |

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
