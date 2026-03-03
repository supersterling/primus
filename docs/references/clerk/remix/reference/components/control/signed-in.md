# <SignedIn>

## Overview

The `<SignedIn>` component offers authentication checks as a cross-cutting concern. Any children components wrapped by a `<SignedIn>` component will be rendered only if there's a user with an active session signed in your application.

> This component only **visually hides** its children when the current user is not authenticated. The contents of its children remain accessible via the browser's source code even if the user fails the authentication check. Do not use this component to hide sensitive information that should be completely inaccessible to unauthorized users. For truly sensitive data, perform authorization checks on the server before sending the data to the client.

## Example

```tsx {{ filename: 'app/routes/_index.tsx' }}
import { SignedIn } from '@clerk/remix'

export default function Index() {
  return (
    <div>
      <SignedIn>
        <p>You are signed in.</p>
      </SignedIn>
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
