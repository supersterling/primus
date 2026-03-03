# <TaskChooseOrganization /> component

The `<TaskChooseOrganization />` component renders a UI for resolving the `choose-organization` session task. You can further customize your `<TaskChooseOrganization />` component by passing additional [`properties`](https://clerk.com/docs/react/reference/components/authentication/task-choose-organization.md#properties) at the time of rendering.

> The `<TaskChooseOrganization/>` component cannot render when a user doesn't have current session tasks.

## When to use `<TaskChooseOrganization />`

Clerk's sign-in flows, such as the [Sign-in Account Portal page](https://clerk.com/docs/guides/account-portal/overview.md#sign-in), [`<SignInButton />`](https://clerk.com/docs/react/reference/components/unstyled/sign-in-button.md), and [`<SignIn />`](https://clerk.com/docs/react/reference/components/authentication/sign-in.md) component, automatically handle the `choose-organization` session task flow for you, including rendering the `<TaskChooseOrganization />` component when needed.

If you want to customize the route where the `<TaskChooseOrganization />` component is rendered or customize its appearance, you can host it yourself within your application.

## Example

The following example demonstrates how to host the `<TaskChooseOrganization />` component on a custom page. You first need to [set the `taskUrls` option on your Clerk integration](https://clerk.com/docs/guides/configure/session-tasks.md#using-the-task-urls-option) so that users are redirected to the page where you host the `<TaskChooseOrganization />` component when they have a pending `choose-organization` session task.

```tsx {{ filename: 'index.tsx', mark: [17] }}
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ClerkProvider } from '@clerk/clerk-react'

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Add your Clerk Publishable Key to the .env file')
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      taskUrls={{ 'choose-organization': '/session-tasks/choose-organization' }}
    >
      <App />
    </ClerkProvider>
  </React.StrictMode>,
)
```

```jsx {{ filename: 'src/session-tasks/choose-organization.tsx' }}
import { TaskChooseOrganization } from '@clerk/clerk-react'

const ChooseOrganizationPage = () => <TaskChooseOrganization redirectUrlComplete="/dashboard" />

export default ChooseOrganizationPage
```

## Properties

| Name                | Type                    | Description                                                                                               |
| ------------------- | ----------------------- | --------------------------------------------------------------------------------------------------------- |
| redirectUrlComplete | string                  | The full URL or path to navigate to after successfully completing the task.                               |
| appearance?         | Appearance | undefined | Optional object to style your components. Will only affect Clerk components and not Account Portal pages. |

## Customization

To learn about how to customize Clerk components, see the [`customization documentation`](https://clerk.com/docs/react/guides/customizing-clerk/appearance-prop/overview.md).

If Clerk's prebuilt components don't meet your specific needs or if you require more control over the logic, you can rebuild the existing Clerk flows using the Clerk API. For more information, see the [custom flow guides](https://clerk.com/docs/guides/development/custom-flows/overview.md).

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
