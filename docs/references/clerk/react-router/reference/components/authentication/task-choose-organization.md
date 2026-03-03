# <TaskChooseOrganization /> component

The `<TaskChooseOrganization />` component renders a UI for resolving the `choose-organization` session task. You can further customize your `<TaskChooseOrganization />` component by passing additional [`properties`](https://clerk.com/docs/react-router/reference/components/authentication/task-choose-organization.md#properties) at the time of rendering.

> The `<TaskChooseOrganization/>` component cannot render when a user doesn't have current session tasks.

## When to use `<TaskChooseOrganization />`

Clerk's sign-in flows, such as the [Sign-in Account Portal page](https://clerk.com/docs/guides/account-portal/overview.md#sign-in), [`<SignInButton />`](https://clerk.com/docs/react-router/reference/components/unstyled/sign-in-button.md), and [`<SignIn />`](https://clerk.com/docs/react-router/reference/components/authentication/sign-in.md) component, automatically handle the `choose-organization` session task flow for you, including rendering the `<TaskChooseOrganization />` component when needed.

If you want to customize the route where the `<TaskChooseOrganization />` component is rendered or customize its appearance, you can host it yourself within your application.

## Example

The following example demonstrates how to host the `<TaskChooseOrganization />` component on a custom page. You first need to [set the `taskUrls` option on your Clerk integration](https://clerk.com/docs/guides/configure/session-tasks.md#using-the-task-urls-option) so that users are redirected to the page where you host the `<TaskChooseOrganization />` component when they have a pending `choose-organization` session task.

> To see the full `root.tsx` setup you need for Clerk with React Router, see the [`React Router quickstart`](https://clerk.com/docs/react-router/getting-started/quickstart.md).

```tsx {{ filename: 'app/root.tsx', mark: [6] }}
import { ClerkProvider } from '@clerk/react-router'
import { Outlet } from 'react-router'

export default function App() {
  return (
    <ClerkProvider taskUrls={{ 'choose-organization': '/session-tasks/choose-organization' }}>
      <Outlet />
    </ClerkProvider>
  )
}
```

```tsx {{ filename: 'app/routes/session-tasks/choose-organization.tsx' }}
import { TaskChooseOrganization } from '@clerk/react-router'

export default function ChooseOrganizationPage() {
  return <TaskChooseOrganization redirectUrlComplete="/dashboard" />
}
```

## Properties

| Name                | Type                    | Description                                                                                               |
| ------------------- | ----------------------- | --------------------------------------------------------------------------------------------------------- |
| redirectUrlComplete | string                  | The full URL or path to navigate to after successfully completing the task.                               |
| appearance?         | Appearance | undefined | Optional object to style your components. Will only affect Clerk components and not Account Portal pages. |

## Customization

To learn about how to customize Clerk components, see the [`customization documentation`](https://clerk.com/docs/react-router/guides/customizing-clerk/appearance-prop/overview.md).

If Clerk's prebuilt components don't meet your specific needs or if you require more control over the logic, you can rebuild the existing Clerk flows using the Clerk API. For more information, see the [custom flow guides](https://clerk.com/docs/guides/development/custom-flows/overview.md).

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
