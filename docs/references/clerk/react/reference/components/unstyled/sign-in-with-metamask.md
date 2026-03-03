# <SignInWithMetamaskButton>

The `<SignInWithMetamaskButton>` component is used to complete a one-click, cryptographically-secure sign-in flow using MetaMask.

## Usage

### Basic usage

```jsx {{ filename: 'src/App.tsx' }}
import { SignInWithMetamaskButton } from '@clerk/clerk-react'

function App() {
  return <SignInWithMetamaskButton />
}

export default App
```

### Custom usage

In some cases, you will want to use your own button, or button text. You can do that by wrapping your button in the `<SignInWithMetamaskButton>` component.

```jsx {{ filename: 'src/App.tsx' }}
import { SignInWithMetamaskButton } from '@clerk/clerk-react'

function App() {
  return (
    <SignInWithMetamaskButton mode="modal">
      <button>Custom sign in button</button>
    </SignInWithMetamaskButton>
  )
}

export default App
```

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
