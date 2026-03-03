# <APIKeys /> component

> API keys is currently in beta. The API may change before general availability.

The `<APIKeys />` component is used to manage API keys for your application. It allows you to create, edit, and revoke API keys for your application.

The component manages API keys based on the user's current context. When the user has an Active Organization selected, all operations are scoped to that Organization. Otherwise, operations are user-scoped.

To utilize the `<APIKeys />` component, you must first enable API keys in the Clerk Dashboard. Refer to the [Using API keys](https://clerk.com/docs/guides/development/machine-auth/api-keys.md) guide for more information.

## Usage with JavaScript

The following methods available on an instance of the [`Clerk`](https://clerk.com/docs/reference/javascript/clerk.md) class are used to render and control the `<APIKeys />` component:

- [`mountAPIKeys()`](https://clerk.com/docs/js-frontend/reference/components/api-keys.md#mount-api-keys)
- [`unmountAPIKeys()`](https://clerk.com/docs/js-frontend/reference/components/api-keys.md#unmount-api-keys)

The following examples assume that you have followed the [`quickstart`](https://clerk.com/docs/js-frontend/getting-started/quickstart.md) in order to add Clerk to your JavaScript application.

### `mountAPIKeys()`

Render the `<APIKeys />` component to an HTML `<div>` element.

```typescript
function mountAPIKeys(node: HTMLDivElement, props?: APIKeysProps): void
```

#### `mountAPIKeys()` params

| Name   | Type           | Description                                                               |
| ------ | -------------- | ------------------------------------------------------------------------- |
| node   | HTMLDivElement | The container <div> element used to render in the <APIKeys /> component |
| props? | APIKeysProps   | The properties to pass to the <APIKeys /> component                      |

#### `mountAPIKeys()` usage

```js {{ filename: 'main.js', mark: [15] }}
import { Clerk } from '@clerk/clerk-js'

// Initialize Clerk with your Clerk Publishable Key
const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

const clerk = new Clerk(clerkPubKey)
await clerk.load()

document.getElementById('app').innerHTML = `
  <div id="api-keys"></div>
`

const apiKeysDiv = document.getElementById('api-keys')

clerk.mountAPIKeys(apiKeysDiv, {
  perPage: 10,
  showDescription: true,
})
```

### `unmountAPIKeys()`

Unmount and run cleanup on an existing `<APIKeys />` component instance.

```typescript
function unmountAPIKeys(node: HTMLDivElement): void
```

#### `unmountAPIKeys()` params

| Name | Type           | Description                                                                  |
| ---- | -------------- | ---------------------------------------------------------------------------- |
| node | HTMLDivElement | The container <div> element with a rendered <APIKeys /> component instance |

#### `unmountAPIKeys()` usage

```js {{ filename: 'main.js', mark: [19] }}
import { Clerk } from '@clerk/clerk-js'

// Initialize Clerk with your Clerk Publishable Key
const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

const clerk = new Clerk(clerkPubKey)
await clerk.load()

document.getElementById('app').innerHTML = `
  <div id="api-keys"></div>
`

const apiKeysDiv = document.getElementById('api-keys')

clerk.mountAPIKeys(apiKeysDiv)

// ...

clerk.unmountAPIKeys(apiKeysDiv)
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

To learn about how to customize Clerk components, see the [`customization documentation`](https://clerk.com/docs/js-frontend/guides/customizing-clerk/appearance-prop/overview.md).

If Clerk's prebuilt components don't meet your specific needs or if you require more control over the logic, you can rebuild the existing Clerk flows using the Clerk API. For more information, see the [custom flow guides](https://clerk.com/docs/guides/development/custom-flows/overview.md).

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
