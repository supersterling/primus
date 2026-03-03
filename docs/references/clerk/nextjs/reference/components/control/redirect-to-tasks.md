# <RedirectToTasks />

The `<RedirectToTasks />` component will redirect users to Clerk's prebuilt session task flow when they have pending session tasks. This behavior is similar to a server-side (3xx) redirect, and will override the current location in the history stack.

The prebuilt session task flow is hosted through Clerk's [Account Portal](https://clerk.com/docs/guides/account-portal/overview.md#sign-in). For example, if the user has a pending `choose-organization` task, they will be redirected to the `/tasks/choose-organization` Account Portal page. If you don't want to use the prebuilt components or Account Portal, you can build a [custom flow](https://clerk.com/docs/guides/development/custom-flows/authentication/session-tasks.md).

## Example

Your sign-up/sign-in flow should handle session tasks, but if a user's authentication flow is interrupted and they aren't able to complete the tasks, you can use the `<RedirectToTasks />` component to redirect them to the appropriate task page.

By default, the `<RedirectToTasks />` component will redirect to the `/sign-in/tasks/<task-key>` URL path, expecting [`the <SignIn /> component to be hosted on the /sign-in route`](https://clerk.com/docs/nextjs/guides/development/custom-sign-in-or-up-page.md). If it is, then the `<SignIn />` component will handle the session task flows. However, if you want to customize the paths where specific tasks are redirected, you can use the [`taskUrls` option on your Clerk integration](https://clerk.com/docs/guides/configure/session-tasks.md#using-the-task-urls-option).

In the following example, the `<RedirectToTasks />` component is used in the app's layout file so that users can't access **any** of the app until they complete their pending session tasks. However, you can also use the `<RedirectToTasks />` component to protect a single page or route group.

```tsx {{ filename: 'app/layout.tsx' }}
import { RedirectToTasks } from '@clerk/nextjs'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <RedirectToTasks />
      {children}
    </>
  )
}
```

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
