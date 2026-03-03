# Clerk

`Clerk` is the main entry point for the SDK. After you [`configure the SDK`](https://clerk.com/docs/ios/reference/native-mobile/configuration.md), you can access it in two ways:

## SwiftUI

After you inject `Clerk.shared` into the environment, you can access it with `@Environment(Clerk.self)`.

```swift
import ClerkKit
import SwiftUI

struct ContentView: View {
  @Environment(Clerk.self) private var clerk

  var body: some View {
    if clerk.user != nil {
      Text("Signed in")
    } else {
      Text("Signed out")
    }
  }
}
```

## Access the shared instance

If you're not using SwiftUI, you can always access Clerk through the shared instance.

```swift
let clerk = Clerk.shared
```

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
