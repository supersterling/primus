# <TaskChooseOrganization /> component

The `<TaskChooseOrganization />` component renders a UI for resolving the `choose-organization` session task. You can further customize your `<TaskChooseOrganization />` component by passing additional [`properties`](https://clerk.com/docs/js-frontend/reference/components/authentication/task-choose-organization.md#properties) at the time of rendering.

> The `<TaskChooseOrganization/>` component cannot render when a user doesn't have current session tasks.

## When to use `<TaskChooseOrganization />`

Clerk's sign-in flows, such as the [Sign-in Account Portal page](https://clerk.com/docs/guides/account-portal/overview.md#sign-in), [`<SignInButton />`](https://clerk.com/docs/reference/components/unstyled/sign-in-button.md), and [`<SignIn />`](https://clerk.com/docs/js-frontend/reference/components/authentication/sign-in.md) component, automatically handle the `choose-organization` session task flow for you, including rendering the `<TaskChooseOrganization />` component when needed.

If you want to customize the route where the `<TaskChooseOrganization />` component is rendered or customize its appearance, you can host it yourself within your application.

## Usage with JavaScript

You first need to set the `taskUrls` option on the [`clerk.load()`](https://clerk.com/docs/reference/javascript/clerk.md#load) method so that users are redirected to the page where you host the `<TaskChooseOrganization />` component when they have a pending `choose-organization` session task.

```js {{ filename: 'main.ts', collapsible: true }}
import { Clerk } from '@clerk/clerk-js'

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

const clerk = new Clerk(clerkPubKey)
await clerk.load({
  taskUrls: {
    'choose-organization': '/session-tasks/choose-organization',
  },
})
```

The following methods available on an instance of the [`Clerk`](https://clerk.com/docs/reference/javascript/clerk.md) class are used to render and control the `<TaskChooseOrganization />` component:

- [`mountTaskChooseOrganization()`](https://clerk.com/docs/js-frontend/reference/components/authentication/task-choose-organization.md#mount-task-choose-organization)
- [`unmountTaskChooseOrganization()`](https://clerk.com/docs/js-frontend/reference/components/authentication/task-choose-organization.md#unmount-task-choose-organization)

The following examples assume that you have followed the [`quickstart`](https://clerk.com/docs/js-frontend/getting-started/quickstart.md) in order to add Clerk to your JavaScript application.

### `mountTaskChooseOrganization()`

Render the `<TaskChooseOrganization />` component to an HTML `<div>` element.

```typescript
function mountTaskChooseOrganization(
  node: HTMLDivElement,
  props?: TaskChooseOrganizationProps,
): void
```

#### `mountTaskChooseOrganization()` params

| Name   | Type                        | Description                                                                    |
| ------ | --------------------------- | ------------------------------------------------------------------------------ |
| node   | HTMLDivElement              | The <div> element used to render in the <TaskChooseOrganization /> component |
| props? | TaskChooseOrganizationProps | The properties to pass to the <TaskChooseOrganization /> component.           |

#### `mountTaskChooseOrganization()` usage

```typescript {{ filename: 'main.ts', mark: [26] }}
import { Clerk } from '@clerk/clerk-js'

const pubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

const clerk = new Clerk(pubKey)
await clerk.load()

if (clerk.isSignedIn) {
  // Mount user button component
  document.getElementById('signed-in').innerHTML = `
          <div id="user-button"></div>
        `

  const userbuttonDiv = document.getElementById('user-button')

  clerk.mountUserButton(userbuttonDiv)
} else if (clerk.session?.currentTask) {
  switch (clerk.session.currentTask.key) {
    case 'choose-organization': {
      document.getElementById('app').innerHTML = `
              <div id="task-choose-organization"></div>
            `

      const taskChooseOrganizationDiv = document.getElementById('task-choose-organization')

      clerk.mountTaskChooseOrganization(taskChooseOrganizationDiv)
    }
  }
}
```

### `unmountTaskChooseOrganization()`

Unmount and run cleanup on an existing `<TaskChooseOrganization />` component instance.

```typescript
function unmountTaskChooseOrganization(node: HTMLDivElement): void
```

#### `unmountTaskChooseOrganization()` params

| Name | Type           | Description                                                                 |
| ---- | -------------- | --------------------------------------------------------------------------- |
| node | HTMLDivElement | The container <div> element with a rendered <SignUp /> component instance |

#### `unmountTaskChooseOrganization()` usage

```typescript {{ filename: 'main.ts', mark: [30] }}
import { Clerk } from '@clerk/clerk-js'

const pubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

const clerk = new Clerk(pubKey)
await clerk.load()

if (clerk.isSignedIn) {
  // Mount user button component
  document.getElementById('signed-in').innerHTML = `
          <div id="user-button"></div>
        `

  const userbuttonDiv = document.getElementById('user-button')

  clerk.mountUserButton(userbuttonDiv)
} else if (clerk.session?.currentTask) {
  switch (clerk.session.currentTask.key) {
    case 'choose-organization': {
      document.getElementById('app').innerHTML = `
              <div id="task-choose-organization"></div>
            `

      const taskChooseOrganizationDiv = document.getElementById('task-choose-organization')

      clerk.mountTaskChooseOrganization(taskChooseOrganizationDiv)

      // ...

      clerk.unmountTaskChooseOrganization(taskChooseOrganizationDiv)
    }
  }
}
```

## Properties

| Name                | Type                    | Description                                                                                               |
| ------------------- | ----------------------- | --------------------------------------------------------------------------------------------------------- |
| redirectUrlComplete | string                  | The full URL or path to navigate to after successfully completing the task.                               |
| appearance?         | Appearance | undefined | Optional object to style your components. Will only affect Clerk components and not Account Portal pages. |

## Customization

To learn about how to customize Clerk components, see the [`customization documentation`](https://clerk.com/docs/js-frontend/guides/customizing-clerk/appearance-prop/overview.md).

If Clerk's prebuilt components don't meet your specific needs or if you require more control over the logic, you can rebuild the existing Clerk flows using the Clerk API. For more information, see the [custom flow guides](https://clerk.com/docs/guides/development/custom-flows/overview.md).

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
