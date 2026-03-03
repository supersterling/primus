# <SignIn /> component

The `<SignIn />` component renders a UI to allow users to sign in or sign up by default. The functionality of the `<SignIn />` component is controlled by the instance settings you specify in the [Clerk Dashboard](https://dashboard.clerk.com), such as [sign-in and sign-up options](https://clerk.com/docs/guides/configure/auth-strategies/sign-up-sign-in-options.md) and [social connections](https://clerk.com/docs/guides/configure/auth-strategies/social-connections/overview.md). You can further customize your `<SignIn />` component by passing additional [`properties`](https://clerk.com/docs/js-frontend/reference/components/authentication/sign-in.md#properties) at the time of rendering. The `<SignIn />` component also displays any session tasks that are required for the user to complete after signing in.

> The `<SignUp/>` and `<SignIn/>` components cannot render when a user is already signed in, unless the application allows multiple sessions. If a user is already signed in and the application only allows a single session, Clerk will redirect the user to the Home URL instead.

## Usage with JavaScript

The following methods available on an instance of the [`Clerk`](https://clerk.com/docs/reference/javascript/clerk.md) class are used to render and control the `<SignIn />` component:

- [`mountSignIn()`](https://clerk.com/docs/js-frontend/reference/components/authentication/sign-in.md#mount-sign-in)
- [`unmountSignIn()`](https://clerk.com/docs/js-frontend/reference/components/authentication/sign-in.md#unmount-sign-in)
- [`openSignIn()`](https://clerk.com/docs/js-frontend/reference/components/authentication/sign-in.md#open-sign-in)
- [`closeSignIn()`](https://clerk.com/docs/js-frontend/reference/components/authentication/sign-in.md#close-sign-in)

The following examples assume that you have followed the [`quickstart`](https://clerk.com/docs/js-frontend/getting-started/quickstart.md) in order to add Clerk to your JavaScript application.

### `mountSignIn()`

Render the `<SignIn />` component to an HTML `<div>` element.

```typescript
function mountSignIn(node: HTMLDivElement, props?: SignInProps): void
```

#### `mountSignIn()` params

| Name   | Type           | Description                                                              |
| ------ | -------------- | ------------------------------------------------------------------------ |
| node   | HTMLDivElement | The container <div> element used to render in the <SignIn /> component |
| props? | SignInProps    | The properties to pass to the <SignIn /> component                      |

#### `mountSignIn()` usage

```js {{ filename: 'main.js', mark: [15] }}
import { Clerk } from '@clerk/clerk-js'

// Initialize Clerk with your Clerk Publishable Key
const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

const clerk = new Clerk(clerkPubKey)
await clerk.load()

document.getElementById('app').innerHTML = `
  <div id="sign-in"></div>
`

const signInDiv = document.getElementById('sign-in')

clerk.mountSignIn(signInDiv)
```

### `unmountSignIn()`

Unmount and run cleanup on an existing `<SignIn />` component instance.

```typescript
function unmountSignIn(node: HTMLDivElement): void
```

#### `unmountSignIn()` params

| Name | Type           | Description                                                                 |
| ---- | -------------- | --------------------------------------------------------------------------- |
| node | HTMLDivElement | The container <div> element with a rendered <SignIn /> component instance |

#### `unmountSignIn()` usage

```js {{ filename: 'index.js', mark: [19] }}
import { Clerk } from '@clerk/clerk-js'

// Initialize Clerk with your Clerk Publishable Key
const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

const clerk = new Clerk(clerkPubKey)
await clerk.load()

document.getElementById('app').innerHTML = `
  <div id="sign-in"></div>
`

const signInDiv = document.getElementById('sign-in')

clerk.mountSignIn(signInDiv)

// ...

clerk.unmountSignIn(signInDiv)
```

### `openSignIn()`

Opens the `<SignIn />` component as an overlay at the root of your HTML `body` element.

```typescript
function openSignIn(props?: SignInProps): void
```

#### `openSignIn()` params

| Name   | Type        | Description                                          |
| ------ | ----------- | ---------------------------------------------------- |
| props? | SignInProps | The properties to pass to the <SignIn /> component. |

#### `openSignIn()` usage

```js {{ filename: 'main.js', mark: [9] }}
import { Clerk } from '@clerk/clerk-js'

// Initialize Clerk with your Clerk Publishable Key
const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

const clerk = new Clerk(clerkPubKey)
await clerk.load()

clerk.openSignIn()
```

### `closeSignIn()`

Closes the sign in overlay.

```typescript
function closeSignIn(): void
```

#### `closeSignIn()` usage

```js {{ filename: 'index.js', mark: [13] }}
import { Clerk } from '@clerk/clerk-js'

// Initialize Clerk with your Clerk Publishable Key
const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

const clerk = new Clerk(clerkPubKey)
await clerk.load()

clerk.openSignIn()

// ...

clerk.closeSignIn()
```

## Properties

All props are optional.

| Name                                                            | Type                          | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| --------------------------------------------------------------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| appearance                                                      | Appearance | undefined       | Optional object to style your components. Will only affect Clerk components and not Account Portal pages.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| fallback                                                        | ReactNode                     | An optional element to be rendered while the component is mounting.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| fallbackRedirectUrl                                             | string                        | The fallback URL to redirect to after the user signs in, if there's no redirect\_url in the path already. Defaults to /. It's recommended to use the environment variable instead.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| forceRedirectUrl                                                | string                        | If provided, this URL will always be redirected to after the user signs in. It's recommended to use the environment variable instead.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| initialValues                                                   | SignInInitialValues           | The values used to prefill the sign-in fields with.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| "redirect": Redirect to the OAuth provider on the current page. | "popup": Open a popup window. | Defaults to "auto".                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| path                                                            | string                        | The path where the component is mounted on when routing is set to path. It is ignored in hash-based routing. For example: /sign-in.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| routing                                                         | 'hash' | 'path'              | The routing strategy for your pages. Defaults to 'path' for frameworks that handle routing, such as Next.js and Remix. Defaults to hash for all other SDK's, such as React.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| signUpFallbackRedirectUrl                                       | string                        | The fallback URL to redirect to after the user signs up, if there's no redirect\_url in the path already. Used for the 'Don't have an account? Sign up' link that's rendered. Defaults to /. It's recommended to use the environment variable instead.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| signUpForceRedirectUrl                                          | string                        | If provided, this URL will always used as the redirect destination after the user signs up. Used for the 'Don't have an account? Sign up' link that's rendered. It's recommended to use the environment variable instead.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| signUpUrl                                                       | string                        | The full URL or path to the sign-up page. Used for the 'Don't have an account? Sign up' link that's rendered. It's recommended to use the environment variable instead.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| transferable                                                    | boolean                       | Indicates whether or not sign in attempts are transferable to the sign up flow. Defaults to true. When set to false, prevents opaque sign upsAn opaque sign up refers to a specific OAuth authentication flow where a user attempts to sign in via OAuth (like Google, GitHub, etc.) with an email address that doesn't exist in your application's user database. The term "opaque" here means that the sign-up process is transparent to the user - they think they're signing in, but Clerk is actually creating a new account behind the scenesA transfer flow allows a user to both sign in and sign up in the same process. If a user tries signing up, but already exists, the flow will transfer the user to the sign-in flow. If a user tries signing in, but doesn't exist, the flow will transfer the user to the sign-up flow\.. when a user attempts to sign in via OAuth with an email that doesn't exist. |
| waitlistUrl                                                     | string                        | Full URL or path to the waitlist page. Use this property to provide the target of the 'Waitlist' link that's rendered. If undefined, will redirect to the Account Portal waitlist page. If you've passed the waitlistUrl prop to the <ClerkProvider> component, it will infer from that, and you can omit this prop.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| withSignUp                                                      | boolean                       | Opt into sign-in-or-up flow by setting this prop to true. When true, if a user does not exist, they will be prompted to sign up. If a user exists, they will be prompted to sign in. Defaults to true if the CLERK\_SIGN\_IN\_URL environment variable is set. Otherwise, defaults to false.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |

## Customization

To learn about how to customize Clerk components, see the [`customization documentation`](https://clerk.com/docs/js-frontend/guides/customizing-clerk/appearance-prop/overview.md).

If Clerk's prebuilt components don't meet your specific needs or if you require more control over the logic, you can rebuild the existing Clerk flows using the Clerk API. For more information, see the [custom flow guides](https://clerk.com/docs/guides/development/custom-flows/overview.md).

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
