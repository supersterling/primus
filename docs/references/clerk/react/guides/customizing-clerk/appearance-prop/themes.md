# Themes

Clerk currently offers [`six prebuilt themes`](https://clerk.com/docs/react/guides/customizing-clerk/appearance-prop/themes.md#available-themes) for you to customize the overall appearance of your Clerk application.

## Installation

1. To get started, install the `@clerk/themes` package.

   ```npm
   npm install @clerk/themes
   ```
2. To use a theme, import it from `@clerk/themes` and apply it using the [`appearance prop`](https://clerk.com/docs/react/guides/customizing-clerk/appearance-prop/overview.md).

## Usage

You can apply themes at **different levels** depending on your needs:

- Across all Clerk components
- All instances of a Clerk component
- A single Clerk component

For more customization options, refer to the [`Advanced usage`](https://clerk.com/docs/react/guides/customizing-clerk/appearance-prop/themes.md#advanced-usage) section.

### Apply a theme to all Clerk components

To apply a theme to all Clerk components, pass the `appearance` prop to the [`<ClerkProvider>`](https://clerk.com/docs/react/reference/components/clerk-provider.md) component. The `appearance` prop accepts the property `theme`, which can be set to a theme.

In the following example, the "Dark" theme is applied to all Clerk components.

```tsx {{ prettier: false, mark: [1, [4, 6]] }}
 import { dark } from '@clerk/themes'

 <ClerkProvider
  appearance={{
     theme: dark,
   }}
 >
   {/* ... */}
 </ClerkProvider>
```

### Apply a theme to all instances of a Clerk component

To apply a theme to all instances of a Clerk component, you can pass the name of the Clerk component itself to the `appearance` prop.

In the following example, the "Neobrutalism" theme is applied to all instances of the [`<SignIn />`](https://clerk.com/docs/react/reference/components/authentication/sign-in.md) component.

```tsx {{ prettier: false, mark: [1, [4, 7]] }}
import { dark, neobrutalism } from '@clerk/themes'

<ClerkProvider
  appearance={{
    theme: dark,
    signIn: { theme: neobrutalism },
  }}
>
  {/* ... */}
</ClerkProvider>
```

### Apply a theme to a single Clerk component

To apply a theme to a single Clerk component, pass the `theme` property to the `appearance` prop of the Clerk component.

In the following example, the "Dark" theme is applied to the [`<SignIn />`](https://clerk.com/docs/react/reference/components/authentication/sign-in.md) component.

```tsx {{ mark: [[2, 4]] }}
<SignIn
  appearance={{
    theme: dark,
  }}
/>
```

## Advanced usage

### Apply multiple themes

You can also stack themes by passing an array of themes to the `theme` property of the `appearance` prop. The themes will be applied in the order they are listed. If styles overlap, the last defined theme will take precedence.

In the following example, the "Dark" theme is applied first, then the "Neobrutalism" theme is applied on top of it.

```tsx {{ prettier: false, mark: [1, [4, 6]] }}
 import { dark, neobrutalism } from '@clerk/themes'

 <ClerkProvider
   appearance={{
     theme: [dark, neobrutalism],
   }}
 >
   {/* ... */}
 </ClerkProvider>
```

### Customize a theme using variables

You can customize a theme by passing an object of variables to the `variables` property of the `appearance` prop. The `variables` property is used to adjust the general styles of the component's base theme, like colors, backgrounds, typography.

> For a list of all of the variables you can customize, and for more examples on how to use the `variables` property, see the [`Variables`](https://clerk.com/docs/react/guides/customizing-clerk/appearance-prop/variables.md) docs.

In the following example, the primary color of the themes are customized.

```tsx {{ prettier: false, mark: [1, [4, 11]] }}
import { dark, neobrutalism, shadesOfPurple } from '@clerk/themes'

<ClerkProvider
  appearance={{
    theme: [dark, neobrutalism],
    variables: { colorPrimary: 'blue' },
    signIn: {
      theme: [shadesOfPurple],
      variables: { colorPrimary: 'green' },
    },
  }}
>
  {/* ... */}
</ClerkProvider>
```

## Available themes

Clerk provides six prebuilt themes:

- [`The default theme`](https://clerk.com/docs/react/guides/customizing-clerk/appearance-prop/themes.md#default-theme)
- [`The "Simple" theme`](https://clerk.com/docs/react/guides/customizing-clerk/appearance-prop/themes.md#simple-theme)
- [`The "shadcn" theme`](https://clerk.com/docs/react/guides/customizing-clerk/appearance-prop/themes.md#shadcn-theme)
- [`The "Dark" theme`](https://clerk.com/docs/react/guides/customizing-clerk/appearance-prop/themes.md#dark-theme)
- [`The "Shades of Purple" theme`](https://clerk.com/docs/react/guides/customizing-clerk/appearance-prop/themes.md#shades-of-purple-theme)
- [`The "Neobrutalism" theme`](https://clerk.com/docs/react/guides/customizing-clerk/appearance-prop/themes.md#neobrutalism-theme)

To explore how each theme looks before integrating it into your application, use the [Clerk's theme editor](https://clerk.com/components/theme-editor), which lets you preview and experiment with themes in real time.

### Default theme

Applied by default when no other theme is provided.

<div style="{padding: "1rem 0", filter: "drop-shadow(rgba(0, 0, 0, 0.16) 0px 12px 24px)"}"></div>

### "Simple" theme

This theme is a stripped down "Default" theme that removes some more advanced styling techniques, making it easier to apply your own custom styles.

To use the simple theme, set `theme` to `simple`:

```tsx {{ prettier: false, mark: ['simple'] }}
<ClerkProvider
  appearance={{
    theme: 'simple',
  }}
/>
```

<div style="{padding: "1rem 0"}"></div>

### "shadcn" theme

To use the shadcn theme, set `theme` to `shadcn`:

```tsx {{ prettier: false, mark: ['shadcn'] }}
import { shadcn } from '@clerk/themes'

<ClerkProvider
  appearance={{
    theme: shadcn,
  }}
/>
```

> This theme is compatible with Tailwind CSS v4 usage. If you need support for Tailwind CSS v3, pass the shadcn variables manually to your `<ClerkProvider />`'s [`variables`](https://clerk.com/docs/react/guides/customizing-clerk/appearance-prop/variables.md) object.

When using the [shadcn/ui](https://ui.shadcn.com/) library, you can use the `shadcn` theme to apply the shadcn/ui styles to your Clerk components. This will adapt to both light and dark mode automatically.

> It's recommended to also import the `shadcn.css` file within your `global.css` file. Tailwind scans source files as plain text to detect which classes to generate - classes that only exist in external configurations won't be included in the final CSS.
>
> ```css
> @import 'tailwindcss';
> @import '@clerk/themes/shadcn.css';
> ```

### "Dark" theme

To use the dark theme, set `theme` to `dark`:

```tsx {{ prettier: false, mark: ['dark'] }}
import { dark } from '@clerk/themes'

<ClerkProvider
  appearance={{
    theme: dark,
  }}
/>
```

<div style="{padding: "1rem 0", filter: "drop-shadow(rgba(0, 0, 0, 0.16) 0px 12px 24px)"}"></div>

### "Shades of purple" theme

To use the shades of purple theme, set `theme` to `shadesOfPurple`:

```tsx {{ prettier: false, mark: ['shadesOfPurple'] }}
import { shadesOfPurple } from '@clerk/themes'

<ClerkProvider
  appearance={{
    theme: shadesOfPurple,
  }}
/>
```

<div style="{padding: "1rem 0", filter: "drop-shadow(rgba(0, 0, 0, 0.16) 0px 12px 24px)"}"></div>

### "Neobrutalism" theme

To use the neobrutalism theme, set `theme` to `neobrutalism`:

```tsx {{ prettier: false, mark: ['neobrutalism'] }}
import { neobrutalism } from '@clerk/themes'

<ClerkProvider
  appearance={{
    theme: neobrutalism,
  }}
/>
```

<div style="{padding: "1rem 0", filter: "drop-shadow(rgba(0, 0, 0, 0.16) 0px 12px 24px)"}"></div>

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
