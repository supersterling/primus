# <PricingTable />

The `<PricingTable />` component displays a table of Plans and Features that users can subscribe to.

## Example

The following example includes a basic implementation of the `<PricingTable />` component. You can use this as a starting point for your own implementation.

> This component can be used in Expo Web projects, but it isn't available in native environments (iOS or Android). For native apps, build a custom UI using Clerk hooks. See [custom flows guides](https://clerk.com/docs/guides/development/custom-flows/overview.md) for details.

```jsx {{ filename: '/app/pricing.web.tsx' }}
import { PricingTable } from '@clerk/clerk-expo/web'

export default function PricingPage() {
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
