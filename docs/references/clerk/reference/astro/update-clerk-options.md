# updateClerkOptions()

The `updateClerkOptions()` function is used to update Clerk's options at runtime. It can be called at any time after [`Clerk has been initialized`](https://clerk.com/docs/reference/astro/integration.md).

## Usage

```tsx
import { useState } from 'react'
import { updateClerkOptions } from '@clerk/astro/client'
import { dark } from '@clerk/themes'

export function ThemeToggler() {
  const [isDark, setIsDark] = useState(false)
  const { setActive } = useClerk()

  const toggleTheme = () => {
    const theme = !isDark
    setIsDark(theme)

    updateClerkOptions({
      appearance: {
        theme: theme ? dark : undefined,
      },
    })
  }

  return <button onClick={toggleTheme}>Toggle Theme</button>
}
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
