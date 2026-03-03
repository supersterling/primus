# UserProfileView

![The UserProfileView renders a comprehensive user profile interface that displays user information and provides account management options.](https://clerk.com/docs/images/ui-components/ios-user-profile-view.png){{ style: { maxWidth: '460px' } }}

The `UserProfileView` renders a comprehensive user profile interface that displays user information and provides account management options. It includes personal information, security settings, account switching, and sign-out functionality.

> The `UserProfileView` only appears when there is a current user.

## Parameters

| Name          | Type | Description                                                                                                                                                                                                                                                                   |
| ------------- | ---- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| isDismissable | Bool | Whether the view can be dismissed by the user. When true, a dismiss button appears in the navigation bar and the view can be used in sheets or other dismissable contexts. When false, no dismiss button is shown, making it suitable for fullscreen usage. Defaults to true. |

## Usage

The following examples show how to use the `UserProfileView` in your iOS app.

### Dismissible sheet presentation

Present `UserProfileView` as a dismissible sheet when you want users to be able to close the profile view and return to the previous screen.

```swift
import SwiftUI
import ClerkKit
import ClerkKitUI

struct MainView: View {
  @Environment(Clerk.self) private var clerk
  @State private var profileIsPresented = false

  var body: some View {
    VStack {
      if clerk.user != nil {
        Button("Show Profile") {
          profileIsPresented = true
        }
      }
    }
    .sheet(isPresented: $profileIsPresented) {
      UserProfileView()
    }
  }
}
```

### Fullscreen profile view

Use `UserProfileView` as a fullscreen view when you want to dedicate the entire screen to profile management.

```swift
import SwiftUI
import ClerkKit
import ClerkKitUI

struct ProfileView: View {
  @Environment(Clerk.self) private var clerk

  var body: some View {
    if clerk.user != nil {
      UserProfileView(isDismissable: false)
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
