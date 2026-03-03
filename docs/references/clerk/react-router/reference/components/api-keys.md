# <APIKeys /> component

> API keys is currently in beta. The API may change before general availability.

The `<APIKeys />` component is used to manage API keys for your application. It allows you to create, edit, and revoke API keys for your application.

The component manages API keys based on the user's current context. When the user has an Active Organization selected, all operations are scoped to that Organization. Otherwise, operations are user-scoped.

To utilize the `<APIKeys />` component, you must first enable API keys in the Clerk Dashboard. Refer to the [Using API keys](https://clerk.com/docs/guides/development/machine-auth/api-keys.md) guide for more information.

## Example

The following example includes a basic implementation of the `<APIKeys />` component. You can use this as a starting point for your own implementation.

```tsx {{ filename: 'app/routes/api-keys.tsx' }}
import { APIKeys } from '@clerk/react-router'

export default function Page() {
  return <APIKeys />
}
```

## Properties

All props are optional.

| Name             | Type                    | Description                                                                                               |
| ---------------- | ----------------------- | --------------------------------------------------------------------------------------------------------- |
| perPage?         | number                  | The number of API keys to show per page. Defaults to 10.                                                  |
| showDescription? | boolean                 | Whether to show the description field in the API key creation form. Defaults to false.                    |
| appearance?      | Appearance | undefined | Optional object to style your components. Will only affect Clerk components and not Account Portal pages. |
| fallback?        | ReactNode               | An optional element to be rendered while the component is mounting.                                       |

## Customization

To learn about how to customize Clerk components, see the [`customization documentation`](https://clerk.com/docs/react-router/guides/customizing-clerk/appearance-prop/overview.md).

If Clerk's prebuilt components don't meet your specific needs or if you require more control over the logic, you can rebuild the existing Clerk flows using the Clerk API. For more information, see the [custom flow guides](https://clerk.com/docs/guides/development/custom-flows/overview.md).

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
