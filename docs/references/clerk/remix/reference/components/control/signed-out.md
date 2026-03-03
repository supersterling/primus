# <SignedOut>

The `<SignedOut>` component offers authentication checks as a cross-cutting concern. Any child nodes wrapped by a `<SignedOut>` component will be rendered only if there's no User signed in to your application.

## Example

```tsx {{ filename: 'app/routes/_index.tsx' }}
import { SignedOut } from '@clerk/remix'

export default function Index() {
  return (
    <div>
      <SignedOut>
        <p>You are signed out.</p>
      </SignedOut>
      <p>This content is always visible.</p>
    </div>
  )
}
```

## Properties

| Name                     | Type    | Description                                                                                 |
| ------------------------ | ------- | ------------------------------------------------------------------------------------------- |
| treatPendingAsSignedOut? | boolean | A boolean that indicates whether to treat pending sessions as signed out. Defaults to true. |

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
