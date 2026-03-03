# <OrganizationSwitcher /> component

The `<OrganizationSwitcher />` component allows a user to switch between their joined Organizations. If Personal Accounts are enabled, users can also switch to their Personal Account. This component is useful for applications that have a multi-tenant architecture, where users can be part of multiple Organizations. It handles all Organization-related flows, including full Organization management for admins. Learn more about [Organizations](https://clerk.com/docs/guides/organizations/overview.md).

## Example

The following example includes a basic implementation of the `<OrganizationSwitcher />` component. You can use this as a starting point for your own implementation.

```jsx {{ filename: 'src/App.tsx' }}
import { OrganizationSwitcher } from '@clerk/clerk-react'

function App() {
  return <OrganizationSwitcher />
}

export default App
```

## Properties

The `<OrganizationSwitcher />` component accepts the following properties, all of which are **optional**:

| Name                       | Type                    | Description                                                                                                                                                                                                                                                                                                                                                                                                                             |
| -------------------------- | ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| afterCreateOrganizationUrl | string                  | The full URL or path to navigate to after creating a new Organization.                                                                                                                                                                                                                                                                                                                                                                  |
| afterLeaveOrganizationUrl  | string                  | The full URL or path to navigate to after the user leaves the currently Active OrganizationA user can be a member of multiple Organizations, but only one can be active at a time. The Active Organization determines which Organization-specific data the user can access and which Role and related Permissions they have within the Organization..                                                                                   |
| afterSelectOrganizationUrl | string                  | The full URL or path to navigate to after a successful Organization switch.                                                                                                                                                                                                                                                                                                                                                             |
| afterSelectPersonalUrl     | string                  | The full URL or path to navigate to after selecting the Personal AccountPersonal Accounts are individual workspaces that allow users to operate independently without belonging to an Organization. Learn more about Personal Accounts.. Defaults to undefined.                                                                                                                                                                         |
| appearance                 | Appearance | undefined | Optional object to style your components. Will only affect Clerk components and not Account Portal pages.                                                                                                                                                                                                                                                                                                                               |
| createOrganizationMode     | 'modal' | 'navigation' | A boolean that controls whether clicking the "Create organization" button will cause the <CreateOrganization /> component to open as a modal, or if the browser will navigate to the createOrganizationUrl where <CreateOrganization /> is mounted as a page. Defaults to: 'modal'.                                                                                                                                                   |
| createOrganizationUrl      | string                  | The full URL or path where the <CreateOrganization />]createorg-ref component is mounted.                                                                                                                                                                                                                                                                                                                                              |
| defaultOpen                | boolean                 | A boolean that controls the default state of the <OrganizationSwitcher /> component.                                                                                                                                                                                                                                                                                                                                                   |
| fallback?                  | ReactNode               | An optional element to be rendered while the component is mounting.                                                                                                                                                                                                                                                                                                                                                                     |
| hidePersonal               | boolean                 | A boolean that controls whether <OrganizationSwitcher /> will include the user's Personal AccountPersonal Accounts are individual workspaces that allow users to operate independently without belonging to an Organization. Learn more about Personal Accounts. in the Organization list. Setting this to true will hide the Personal Account option, and users will only be able to switch between Organizations. Defaults to false. |
| hideSlug                   | boolean                 | A boolean that controls whether the optional slug field in the Organization creation screen is hidden.                                                                                                                                                                                                                                                                                                                                  |
| organizationProfileMode    | 'modal' | 'navigation' | A boolean that controls whether clicking the Manage organization button will cause the <OrganizationProfile /> component to open as a modal, or if the browser will navigate to the organizationProfileUrl where <OrganizationProfile /> is mounted as a page. Defaults to: 'modal'.                                                                                                                                                  |
| organizationProfileProps   | object                  | Specify options for the underlying <OrganizationProfile /> component. For example: {appearance: {...}}                                                                                                                                                                                                                                                                                                                               |
| organizationProfileUrl     | string                  | The full URL or path where the <OrganizationProfile /> component is mounted.                                                                                                                                                                                                                                                                                                                                                           |

## Customization

To learn about how to customize Clerk components, see the [`customization documentation`](https://clerk.com/docs/react/guides/customizing-clerk/appearance-prop/overview.md).

[createorg-ref]: /docs/reference/components/organization/create-organization

[orgprofile-ref]: /docs/reference/components/organization/organization-profile

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
