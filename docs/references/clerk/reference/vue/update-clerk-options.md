# updateClerkOptions()

The `updateClerkOptions()` function is used to update Clerk's options at runtime. It can be called at any time after [`Clerk has been initialized`](https://clerk.com/docs/reference/vue/clerk-plugin.md).

## Usage

```vue
<script setup>
import { updateClerkOptions } from '@clerk/vue'
import { dark } from '@clerk/themes'

const isDark = ref(false)

function toggleTheme() {
  isDark.value = !isDark.value
  updateClerkOptions({
    appearance: {
      theme: isDark.value ? dark : undefined,
    },
  })
}
</script>

<template>
  <button @click="toggleTheme">Toggle Theme</button>
</template>
```

## Properties

| Name         | Type                      | Description                                                                                                  |
| ------------ | ------------------------- | ------------------------------------------------------------------------------------------------------------ |
| appearance   | Appearance | undefined   | Optional object to style your components. Will only affect Clerk components and not Account Portal pages.    |
| localization | Localization | undefined | Optional object to localize your components. Will only affect Clerk components and not Account Portal pages. |

[components-ref]: /docs/reference/components/overview

[ap-ref]: /docs/guides/account-portal/overview

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
