# UserButton

![The UserButton is a circular button that displays the signed-in user's profile image.](https://clerk.com/docs/images/ui-components/ios-user-button.png)

The `UserButton` is a circular button that displays the user's profile image. When tapped, it presents a sheet with the [`UserProfileView`](https://clerk.com/docs/ios/reference/views/user/user-profile-view.md).

> When a user is signed out, the `UserButton` renders the `signedOutContent` you provide. If you don't provide any, it renders nothing.

## Parameters

| Name             | Type                                | Description                                                                                          |
| ---------------- | ----------------------------------- | ---------------------------------------------------------------------------------------------------- |
| signedOutContent | @ViewBuilder () -> SignedOutContent | A view builder that renders when no user is signed in. Defaults to EmptyView, which renders nothing. |

## Usage

The following examples show how to use the `UserButton` in your app.

### Basic usage

```swift
import SwiftUI
import ClerkKit
import ClerkKitUI

struct HomeView: View {
  @State private var authViewIsPresented = false

  var body: some View {
    VStack {
      UserButton(signedOutContent: {
        Button("Sign in") {
          authViewIsPresented = true
        }
      })
    }
    .prefetchClerkImages()
    .sheet(isPresented: $authViewIsPresented) {
      AuthView()
    }
  }
}
```

### In a navigation toolbar

```swift
import SwiftUI
import ClerkKit
import ClerkKitUI

struct ContentView: View {
  @State private var authViewIsPresented = false

  var body: some View {
    NavigationView {
      VStack {
        Text("Welcome!")
      }
      .toolbar {
        ToolbarItem(placement: .navigationBarTrailing) {
          UserButton(signedOutContent: {
            Button("Sign in") {
              authViewIsPresented = true
            }
          })
        }
      }
    }
    .prefetchClerkImages()
    .sheet(isPresented: $authViewIsPresented) {
      AuthView()
    }
  }
}
```

## Customization

To learn how to customize Clerk views, see the [`dedicated guide`](https://clerk.com/docs/ios/guides/customizing-clerk/clerk-theme.md).

If Clerk's prebuilt views don't meet your specific needs or if you require more control over the logic, you can rebuild the existing Clerk flows using the Clerk API. For more information, see the [custom flow guides](https://clerk.com/docs/guides/development/custom-flows/overview.md).

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
