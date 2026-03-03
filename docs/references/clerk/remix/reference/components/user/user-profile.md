# <UserProfile /> component

The `<UserProfile />` component is used to render a beautiful, full-featured account management UI that allows users to manage their profile, security, and billing settings.

## Example

The following example includes a basic implementation of the `<UserProfile />` component. You can use this as a starting point for your own implementation.

The `<UserProfile />` component must be embedded using the [Remix optional route](https://reactrouter.com/en/main/route/route#optional-segments) in order for the routing to work.

```tsx {{ filename: 'app/routes/user.$.tsx' }}
import { UserProfile } from '@clerk/remix'

export default function UserProfilePage() {
  return <UserProfile />
}
```

## Properties

All props are optional.

| Name                  | Type                    | Description                                                                                                                                                                 |
| --------------------- | ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| appearance            | Appearance | undefined | Optional object to style your components. Will only affect Clerk components and not Account Portal pages.                                                                   |
| routing               | 'hash' | 'path'        | The routing strategy for your pages. Defaults to 'path' for frameworks that handle routing, such as Next.js and Remix. Defaults to hash for all other SDK's, such as React. |
| path                  | string                  | The path where the component is mounted on when routing is set to path. It is ignored in hash-based routing. For example: /user-profile.                                    |
| additionalOAuthScopes | object                  | Specify additional scopes per OAuth provider that your users would like to provide if not already approved. For example: {google: ['foo', 'bar'], github: ['qux']}.      |
| customPages           | CustomPage[]           | An array of custom pages to add to the user profile. Only available for the JavaScript SDK. To add custom pages with React-based SDK's, see the dedicated guide.            |
| fallback?             | ReactNode               | An optional element to be rendered while the component is mounting.                                                                                                         |

## Customization

To learn about how to customize Clerk components, see the [`customization documentation`](https://clerk.com/docs/remix/guides/customizing-clerk/appearance-prop/overview.md).

In addition, you also can add custom pages and links to the `<UserProfile />` navigation sidenav. For more information, refer to the [`Custom Pages documentation`](https://clerk.com/docs/remix/guides/customizing-clerk/adding-items/user-profile.md).

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
