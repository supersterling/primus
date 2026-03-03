# <SignInWithMetamaskButton>

The `<SignInWithMetamaskButton>` component is used to complete a one-click, cryptographically-secure sign-in flow using MetaMask.

## Usage

### Basic usage

```tsx {{ filename: 'app/routes/_index.tsx' }}
import { SignInWithMetamaskButton } from '@clerk/remix'

export default function Home() {
  return <SignInWithMetamaskButton />
}
```

### Custom usage

In some cases, you will want to use your own button, or button text. You can do that by wrapping your button in the `<SignInWithMetamaskButton>` component.

```tsx {{ filename: 'app/routes/_index.tsx' }}
import { SignInWithMetamaskButton } from '@clerk/remix'

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
