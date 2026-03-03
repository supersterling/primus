# <CreateOrganization /> component

The `<CreateOrganization />` component is used to render an Organization creation UI that allows users to create brand new Organizations in your application.

## Example

The following example includes a basic implementation of the `<CreateOrganization />` component. You can use this as a starting point for your own implementation.

```jsx {{ filename: 'src/routes/create-organization.tsx' }}
import { CreateOrganization } from '@clerk/chrome-extension'

export default function Home() {
  return <CreateOrganization />
}
```

## Properties

All props are optional.

| Name                       | Type                    | Description                                                                                                                                                                                 |
| -------------------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| appearance                 | Appearance | undefined | Optional object to style your components. Will only affect Clerk components and not Account Portal pages.                                                                                   |
| afterCreateOrganizationUrl | string                  | Full URL or path to navigate to after creating a new organization.                                                                                                                          |
| routing                    | 'hash' | 'path'        | The routing strategy for your pages. Defaults to 'path' for frameworks that handle routing, such as Next.js and Remix. Defaults to hash for all other SDK's, such as React.                 |
| path                       | string                  | The path where the component is mounted on when routing is set to path. It is ignored in hash-based routing. For example: /create-organization.                                             |
| skipInvitationScreen       | boolean                 | Hides the screen for sending invitations after an Organization is created. When left undefined, Clerk will automatically hide the screen if the number of max allowed members is equal to 1 |
| hideSlug                   | boolean                 | Hides the optional slug field in the Organization creation screen.                                                                                                                          |
| fallback?                  | ReactNode               | An optional element to be rendered while the component is mounting.                                                                                                                         |

## Customization

To learn about how to customize Clerk components, see the [`customization documentation`](https://clerk.com/docs/chrome-extension/guides/customizing-clerk/appearance-prop/overview.md).

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
