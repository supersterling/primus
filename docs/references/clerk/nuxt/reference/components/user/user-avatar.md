# <UserAvatar /> component

The `<UserAvatar />` component renders the authenticated user's avatar on its own, a common UI element found across many websites and applications.

## Example

The following example includes a basic implementation of the `<UserAvatar />` component mounted in a header. When the user is signed in, they will see their avatar. You can use this as a starting point for your own implementation.

```vue {{ filename: 'components/AppHeader.vue' }}
<script setup>
// Components are automatically imported
</script>

<template>
  <header style="display: flex; justify-content: space-between; padding: 20px">
    <h1>My App</h1>
    <SignedIn>
      <UserAvatar />
    </SignedIn>
    <SignedOut>
      <SignInButton />
    </SignedOut>
  </header>
</template>
```

## Properties

The `<UserAvatar />` component accepts the following properties, all of which are **optional**:

| Name        | Type                    | Description                                                                                               |
| ----------- | ----------------------- | --------------------------------------------------------------------------------------------------------- |
| rounded?    | boolean                 | Determines whether the user avatar is displayed with rounded corners.                                     |
| appearance? | Appearance | undefined | Optional object to style your components. Will only affect Clerk components and not Account Portal pages. |
| fallback?   | ReactNode               | Optional element to be rendered while the component is mounting.                                          |

## Customization

To learn about how to customize Clerk components, see the [`customization documentation`](https://clerk.com/docs/nuxt/guides/customizing-clerk/appearance-prop/overview.md).

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
