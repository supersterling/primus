# <TaskSetupMFA /> component

![The <TaskSetupMFA /> component renders a UI for resolving the setup-mfa session task.](https://clerk.com/docs/images/ui-components/task-setup-mfa.png){{ style: { maxWidth: '460px' } }}

The `<TaskSetupMFA />` component renders a UI for resolving the `setup-mfa` session task. You can further customize your `<TaskSetupMFA />` component by passing additional [`properties`](https://clerk.com/docs/tanstack-react-start/reference/components/authentication/task-setup-mfa.md#properties) at the time of rendering.

> The `<TaskSetupMFA/>` is only available in the following SDKs versions:
>
> - Next.js (@clerk/nextjs) - **v6.38.0 or higher**
> - React (@clerk/clerk-react) - **v5.61.0 or higher**
> - React Router (@clerk/react-router) - **v2.4.6 or higher**
> - TanStack React Start (@clerk/tanstack-react-start) - **v0.29.4 or higher**
> - Clerk.js (@clerk/clerk-js) - **v5.124.0 or higher**

> The `<TaskSetupMFA/>` component cannot render when a user doesn't have current session tasks.

## When to use `<TaskSetupMFA />`

Clerk's sign-in flows, such as the [Sign-in Account Portal page](https://clerk.com/docs/guides/account-portal/overview.md#sign-in), [`<SignInButton />`](https://clerk.com/docs/tanstack-react-start/reference/components/unstyled/sign-in-button.md), and [`<SignIn />`](https://clerk.com/docs/tanstack-react-start/reference/components/authentication/sign-in.md) component, automatically handle the `setup-mfa` session task flow for you, including rendering the `<TaskSetupMFA />` component when needed.

If you want to customize the route where the `<TaskSetupMFA />` component is rendered or customize its appearance, you can host it yourself within your application.

## Example

The following example demonstrates how to host the `<TaskSetupMFA />` component on a custom page. You first need to [set the `taskUrls` option on your Clerk integration](https://clerk.com/docs/guides/configure/session-tasks.md#using-the-task-urls-option) so that users are redirected to the page where you host the `<TaskSetupMFA />` component when they have a pending `setup-mfa` session task.

> To see the full `__root.tsx` setup you need for Clerk with TanStack React Start, see the [`TanStack React Start quickstart`](https://clerk.com/docs/tanstack-react-start/getting-started/quickstart.md).

```tsx {{ filename: 'src/routes/__root.tsx', mark: [12] }}
import * as React from 'react'
import { HeadContent, Scripts } from '@tanstack/react-router'
import { ClerkProvider } from '@clerk/tanstack-react-start'

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        <ClerkProvider taskUrls={{ 'setup-mfa': '/session-tasks/setup-mfa' }}>
          {children}
        </ClerkProvider>
        <Scripts />
      </body>
    </html>
  )
}
```

```tsx {{ filename: 'src/routes/session-tasks/setup-mfa.tsx' }}
import { TaskSetupMFA } from '@clerk/tanstack-react-start'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/session-tasks/setup-mfa')({
  component: SetupMfaPage,
})

function SetupMfaPage() {
  return <TaskSetupMFA redirectUrlComplete="/dashboard" />
}
```

## Properties

| Name                | Type                    | Description                                                                                               |
| ------------------- | ----------------------- | --------------------------------------------------------------------------------------------------------- |
| redirectUrlComplete | string                  | The full URL or path to navigate to after successfully completing the task.                               |
| appearance?         | Appearance | undefined | Optional object to style your components. Will only affect Clerk components and not Account Portal pages. |

## Customization

To learn about how to customize Clerk components, see the [`customization documentation`](https://clerk.com/docs/tanstack-react-start/guides/customizing-clerk/appearance-prop/overview.md).

If Clerk's prebuilt components don't meet your specific needs or if you require more control over the logic, you can rebuild the existing Clerk flows using the Clerk API. For more information, see the [custom flow guides](https://clerk.com/docs/guides/development/custom-flows/overview.md).

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
