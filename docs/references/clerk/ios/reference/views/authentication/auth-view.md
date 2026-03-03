# AuthView

![The AuthView renders a comprehensive authentication interface that handles both user sign-in and sign-up flows.](https://clerk.com/docs/images/ui-components/ios-auth-view.png){{ style: { maxWidth: '460px' } }}

The `AuthView` renders a comprehensive authentication interface with support for multiple sign-up flows and sign-in methods, multi-factor authentication, password reset, and account recovery. The functionality of the `AuthView` is controlled by the instance settings you specify in the [Clerk Dashboard](https://dashboard.clerk.com), such as [sign-in and sign-up options](https://clerk.com/docs/guides/configure/auth-strategies/sign-up-sign-in-options.md) and [social connections](https://clerk.com/docs/guides/configure/auth-strategies/social-connections/overview.md).

By default, the `AuthView` will automatically determine whether to sign users in or sign them up based on whether they already have an account. This is the default mode that provides seamless authentication without requiring users to choose between sign-in and sign-up.

## Parameters

| Name                                                                                                                                                                                                                                                        | Type                                                                                                        | Description                                                                                                                                                                                                     |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| .signInOrUp: Automatically determines whether to sign users in or sign them up based on whether they already have an account. This is the default mode that provides seamless authentication without requiring users to choose between sign-in and sign-up. | .signIn: Restricts the interface to sign-in flows only. Users can only authenticate with existing accounts. | Defaults to .signInOrUp.                                                                                                                                                                                        |
| isDismissable                                                                                                                                                                                                                                               | Bool                                                                                                        | Whether the view can be dismissed by the user. When true, a dismiss button appears and the view closes automatically after successful authentication. When false, no dismiss button is shown. Defaults to true. |

## Usage

The following examples show how to use the `AuthView` in your iOS app.

### Basic usage as a dismissable sheet

```swift
import SwiftUI
import ClerkKit
import ClerkKitUI

struct HomeView: View {
  @Environment(Clerk.self) private var clerk
  @State private var authIsPresented = false

  var body: some View {
    VStack {
      UserButton(signedOutContent: {
        Button("Sign in") {
          authIsPresented = true
        }
      })
    }
    .prefetchClerkImages()
    .sheet(isPresented: $authIsPresented) {
      AuthView()
    }
  }
}
```

### Fullscreen authentication (non-dismissable)

```swift
import SwiftUI
import ClerkKit
import ClerkKitUI

struct ProfileView: View {
  @Environment(Clerk.self) private var clerk

  var body: some View {
    if clerk.user != nil {
      UserProfileView(isDismissable: false)
    } else {
      AuthView(isDismissable: false)
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
