# <UserAvatar /> component

The `<UserAvatar />` component renders the authenticated user's avatar on its own, a common UI element found across many websites and applications.

## Example

The following example includes a basic implementation of the `<UserAvatar />` component mounted in a header. When the user is signed in, they will see their avatar. You can use this as a starting point for your own implementation.

**App Router**

```tsx {{ filename: 'layout.tsx' }}
import { ClerkProvider, SignedIn, SignedOut, SignInButton, UserAvatar } from '@clerk/nextjs'

function Header() {
  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', padding: 20 }}>
      <h1>My App</h1>
      <SignedIn>
        <UserAvatar />
      </SignedIn>
      <SignedOut>
        <SignInButton />
      </SignedOut>
    </header>
  )
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <ClerkProvider>
        <Header />
        {children}
      </ClerkProvider>
    </html>
  )
}
```

**Pages Router**

```tsx {{ filename: 'pages/_app.tsx' }}
import { ClerkProvider, SignedIn, SignedOut, SignInButton, UserAvatar } from '@clerk/nextjs'
import type { AppProps } from 'next/app'

function Header() {
  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', padding: 20 }}>
      <h1>My App</h1>
      <SignedIn>
        <UserAvatar />
      </SignedIn>
      <SignedOut>
        <SignInButton />
      </SignedOut>
    </header>
  )
}

function MyApp({ pageProps, Component }: AppProps) {
  return (
    <ClerkProvider {...pageProps}>
      <Header />
      <Component {...pageProps} />
    </ClerkProvider>
  )
}

export default MyApp
```

## Properties

The `<UserAvatar />` component accepts the following properties, all of which are **optional**:

| Name        | Type                    | Description                                                                                               |
| ----------- | ----------------------- | --------------------------------------------------------------------------------------------------------- |
| rounded?    | boolean                 | Determines whether the user avatar is displayed with rounded corners.                                     |
| appearance? | Appearance | undefined | Optional object to style your components. Will only affect Clerk components and not Account Portal pages. |
| fallback?   | ReactNode               | Optional element to be rendered while the component is mounting.                                          |

## Customization

To learn about how to customize Clerk components, see the [`customization documentation`](https://clerk.com/docs/nextjs/guides/customizing-clerk/appearance-prop/overview.md).

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
