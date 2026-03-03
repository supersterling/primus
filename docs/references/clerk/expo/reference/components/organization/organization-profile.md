# <OrganizationProfile /> component

The `<OrganizationProfile />` component allows users to manage their Organization membership, security, and billing settings.

This component's **General** tab displays the Organization's information and the **Leave organization** button. Admins will be able to see the **Update profile** button, **Verified domains** section, and **Delete organization** button.

The **Members** tab shows the Organization's members along with their join dates and Roles. Admins will have the ability to invite a member, change a member's Role, or remove them from the Organization. Admins will have tabs within the **Members** tab to view the Organization's [invitations](https://clerk.com/docs/guides/organizations/add-members/invitations.md) and [requests](https://clerk.com/docs/guides/organizations/add-members/verified-domains.md#membership-requests).

The **Billing** tab displays the Plans and Features that are available to the Organization, as well as the user's billing information, such as their invoices and payment methods.

## Example

The following example includes a basic implementation of the `<OrganizationProfile />` component. You can use this as a starting point for your own implementation.

> This component can be used in Expo Web projects, but it isn't available in native environments (iOS or Android). For native apps, build a custom UI using Clerk hooks. See [custom flows guides](https://clerk.com/docs/guides/development/custom-flows/overview.md) for details.

```jsx {{ filename: '/app/organization-profile.web.tsx' }}
import { OrganizationProfile } from '@clerk/clerk-expo/web'

export default function OrganizationProfilePage() {
  return <OrganizationProfile />
}
```

## Properties

The `<OrganizationProfile />` component accepts the following properties, all of which are **optional**:

| Name                      | Type                    | Description                                                                                                                                                                 |
| ------------------------- | ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| appearance                | Appearance | undefined | Optional object to style your components. Will only affect Clerk components and not Account Portal pages.                                                                   |
| afterLeaveOrganizationUrl | string                  | The full URL or path to navigate to after leaving an Organization.                                                                                                          |
| customPages               | CustomPages[]          | An array of custom pages to add to the Organization profile. Only available for the JavaScript SDK. To add custom pages with React-based SDK's, see the dedicated guide.    |
| fallback?                 | ReactNode               | An optional element to be rendered while the component is mounting.                                                                                                         |
| path                      | string                  | The path where the component is mounted on when routing is set to path. It is ignored in hash- and virtual-based routing.For example: /organization-profile.                |
| routing                   | 'hash' | 'path'        | The routing strategy for your pages. Defaults to 'path' for frameworks that handle routing, such as Next.js and Remix. Defaults to hash for all other SDK's, such as React. |

## Customization

To learn about how to customize Clerk components, see the [`customization documentation`](https://clerk.com/docs/expo/guides/customizing-clerk/appearance-prop/overview.md).

In addition, you also can add custom pages and links to the `<OrganizationProfile />` navigation sidenav. For more information, refer to the [`Custom Pages`](https://clerk.com/docs/expo/guides/customizing-clerk/adding-items/organization-profile.md) documentation.

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
