# <SignOutButton>

The `<SignOutButton>` component is a button that signs a user out. By default, it is a `<button>` tag that says **Sign Out**, but it is completely customizable by passing children.

## Usage

### Basic usage

```tsx {{ filename: 'app/routes/sign-out.tsx' }}
import { SignOutButton } from '@clerk/tanstack-react-start'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/sign-out')({
  component: SignOut,
})

function SignOut() {
  return <SignOutButton />
}
```

### Custom usage

You can create a custom button by wrapping your own button, or button text, in the `<SignOutButton>` component.

```tsx {{ filename: 'app/routes/index.tsx' }}
import { SignOutButton } from '@clerk/tanstack-react-start'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <SignOutButton>
      <button>Custom sign out button</button>
    </SignOutButton>
  )
}
```

### Multi-session usage

#### Sign out of all sessions

Clicking the `<SignOutButton>` component signs the user out of all sessions. This is the default behavior.

#### Sign out of a specific session

You can sign out of a specific session by passing in a `sessionId` to the `sessionId` prop. This is useful for signing a single account out of a [multi-session application](https://clerk.com/docs/guides/secure/session-options.md#multi-session-applications).

In the following example, the `sessionId` is retrieved from the [`useAuth()`](https://clerk.com/docs/tanstack-react-start/reference/hooks/use-auth.md) hook. If the user is not signed in, the `sessionId` will be `null`, and the user is shown the [`<SignInButton>`](https://clerk.com/docs/tanstack-react-start/reference/components/unstyled/sign-in-button.md) component. If the user is signed in, the user is shown the `<SignOutButton>` component, which when clicked, signs the user out of that specific session.

```tsx {{ filename: 'app/routes/index.tsx' }}
import { SignInButton, SignOutButton, useAuth } from '@clerk/tanstack-react-start'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  const { sessionId } = useAuth()

  if (!sessionId) {
    return <SignInButton />
  }

  return <SignOutButton sessionId={sessionId} />
}
```

## Properties

| Name         | Type            | Description                                                                         |
| ------------ | --------------- | ----------------------------------------------------------------------------------- |
| redirectUrl? | string          | The full URL or path to navigate after successful sign-out.                         |
| sessionId?   | string          | The ID of a specific session to sign out of. Useful for multi-session applications. |
| children?    | React.ReactNode | Children you want to wrap the <SignOutButton> in.                                  |

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
