# <SignInWithMetamaskButton>

The `<SignInWithMetamaskButton>` component is used to complete a one-click, cryptographically-secure sign-in flow using MetaMask.

## Usage

### Basic usage

> This component can be used in Expo Web projects, but it isn't available in native environments (iOS or Android). For native apps, build a custom UI using Clerk hooks. See [custom flows guides](https://clerk.com/docs/guides/development/custom-flows/overview.md) for details.

```jsx {{ filename: '/app/page.web.tsx' }}
import { SignInWithMetamaskButton } from '@clerk/clerk-expo/web'

export default function Home() {
  return <SignInWithMetamaskButton />
}
```

### Custom usage

In some cases, you will want to use your own button, or button text. You can do that by wrapping your button in the `<SignInWithMetamaskButton>` component.

> This component can be used in Expo Web projects, but it isn't available in native environments (iOS or Android). For native apps, build a custom UI using Clerk hooks. See [custom flows guides](https://clerk.com/docs/guides/development/custom-flows/overview.md) for details.

```jsx {{ filename: '/app/page.web.tsx' }}
import { SignInWithMetamaskButton } from '@clerk/clerk-expo/web'

export default function Home() {
  return (
    <SignInWithMetamaskButton mode="modal">
      <button>Custom sign in button</button>
    </SignInWithMetamaskButton>
  )
}
```

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
