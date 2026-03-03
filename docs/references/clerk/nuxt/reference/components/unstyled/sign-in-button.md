# <SignInButton>

The `<SignInButton>` component is a button that, by default, links to your app's sign-in page. Your sign-in page will be hosted by Clerk using the [Account Portal](https://clerk.com/docs/guides/account-portal/overview.md) unless you have set up a [`dedicated sign-in page`](https://clerk.com/docs/guides/development/custom-sign-in-or-up-page.md).

## Usage

### Basic usage

```vue {{ filename: 'pages/sign-in.vue' }}
<script setup>
// Components are automatically imported
</script>

<template>
  <SignInButton />
</template>
```

### Custom usage

You can create a custom button by wrapping your own button, or button text, in the `<SignInButton>` component.

```vue {{ filename: 'pages/index.vue' }}
<script setup>
// Components are automatically imported
</script>

<template>
  <SignInButton>
    <button>Custom sign in button</button>
  </SignInButton>
</template>
```

## Properties

| Name                                                            | Type                          | Description                                                                                                                                                                                                                        |
| --------------------------------------------------------------- | ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| forceRedirectUrl?                                               | string                        | If provided, this URL will always be redirected to after the user signs in. It's recommended to use the environment variable instead.                                                                                              |
| fallbackRedirectUrl?                                            | string                        | The fallback URL to redirect to after the user signs in, if there's no redirect\_url in the path already. Defaults to /. It's recommended to use the environment variable instead.                                                 |
| "redirect": Redirect to the OAuth provider on the current page. | "popup": Open a popup window. | Defaults to "auto".                                                                                                                                                                                                                |
| signUpForceRedirectUrl?                                         | string                        | If provided, this URL will always be redirected to after the user signs up. It's recommended to use the environment variable instead.                                                                                              |
| signUpFallbackRedirectUrl?                                      | string                        | The fallback URL to redirect to after the user signs up, if there's no redirect\_url in the path already. Defaults to /. It's recommended to use the environment variable instead.                                                 |
| mode?                                                           | 'redirect' | 'modal'         | Determines what happens when a user clicks on the <SignInButton>. Setting this to 'redirect' will redirect the user to the sign-in route. Setting this to 'modal' will open a modal on the current route. Defaults to 'redirect'. |
| children?                                                       | React.ReactNode               | Children you want to wrap the <SignInButton> in.                                                                                                                                                                                  |
| initialValues                                                   | SignInInitialValues           | The values used to prefill the sign-in fields with.                                                                                                                                                                                |

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
