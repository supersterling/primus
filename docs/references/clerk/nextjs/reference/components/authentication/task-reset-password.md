# <TaskResetPassword /> component

![The <TaskResetPassword /> component renders a UI for resolving the reset-password session task.](https://clerk.com/docs/images/ui-components/task-reset-password.png){{ style: { maxWidth: '460px' } }}

The `<TaskResetPassword />` component renders a UI for resolving the `reset-password` session task. You can further customize your `<TaskResetPassword />` component by passing additional [`properties`](https://clerk.com/docs/nextjs/reference/components/authentication/task-reset-password.md#properties) at the time of rendering.

> The `<TaskResetPassword/>` component cannot render when a user doesn't have current session tasks.

## When to use `<TaskResetPassword />`

Clerk's sign-in flows, such as the [Sign-in Account Portal page](https://clerk.com/docs/guides/account-portal/overview.md#sign-in), [`<SignInButton />`](https://clerk.com/docs/nextjs/reference/components/unstyled/sign-in-button.md), and [`<SignIn />`](https://clerk.com/docs/nextjs/reference/components/authentication/sign-in.md) component, automatically handle the `reset-password` session task flow for you, including rendering the `<TaskResetPassword />` component when needed.

If you want to customize the route where the `<TaskResetPassword />` component is rendered or customize its appearance, you can host it yourself within your application.

## Example

The following example demonstrates how to host the `<TaskResetPassword />` component on a custom page. You first need to [set the `taskUrls` option on your Clerk integration](https://clerk.com/docs/guides/configure/session-tasks.md#using-the-task-urls-option) so that users are redirected to the page where you host the `<TaskResetPassword />` component when they have a pending `reset-password` session task.

```tsx {{ filename: 'app/layout.tsx', mark: [7] }}
import { ClerkProvider } from '@clerk/nextjs'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClerkProvider taskUrls={{ 'reset-password': '/session-tasks/reset-password' }}>
          {children}
        </ClerkProvider>
      </body>
    </html>
  )
}
```

```tsx {{ filename: 'app/session-tasks/reset-password/page.tsx' }}
import { TaskResetPassword } from '@clerk/nextjs'

export default function Page() {
  return <TaskResetPassword redirectUrlComplete="/dashboard" />
}
```

## Properties

| Name                | Type                    | Description                                                                                               |
| ------------------- | ----------------------- | --------------------------------------------------------------------------------------------------------- |
| redirectUrlComplete | string                  | The full URL or path to navigate to after successfully completing the task.                               |
| appearance?         | Appearance | undefined | Optional object to style your components. Will only affect Clerk components and not Account Portal pages. |

## Customization

To learn about how to customize Clerk components, see the [`customization documentation`](https://clerk.com/docs/nextjs/guides/customizing-clerk/appearance-prop/overview.md).

If Clerk's prebuilt components don't meet your specific needs or if you require more control over the logic, you can rebuild the existing Clerk flows using the Clerk API. For more information, see the [custom flow guides](https://clerk.com/docs/guides/development/custom-flows/overview.md).

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
