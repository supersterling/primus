# Install the SDK

Use Swift Package Manager to add `ClerkKit` (core API) and `ClerkKitUI` (prebuilt SwiftUI views) to your app target.

## Install via Xcode

1. In Xcode, open the **Package Dependencies** tab and click the **+** button.
2. Search for `https://github.com/clerk/clerk-ios`.
3. Select the `Clerk` package in the results list.
4. Set the dependency rule to **Up to Next Major Version**.
5. Make sure your app target is selected in **Add to Project**, then select **Add Package**.
6. In **Choose Package Products**, select `ClerkKit` and `ClerkKitUI`, then select **Add Package**.

> If you don't want to use Clerk's [`prebuilt views`](https://clerk.com/docs/ios/reference/views/overview.md), you can just add `ClerkKit`.

## Install via Package.swift

```swift
dependencies: [
  .package(url: "https://github.com/clerk/clerk-ios", from: "1.0.0")
]

targets: [
  .target(
    name: "YourApp",
    dependencies: [
      .product(name: "ClerkKit", package: "clerk-ios"),
      .product(name: "ClerkKitUI", package: "clerk-ios")
    ]
  )
]
```

## Next steps

- [Configure the SDK](https://clerk.com/docs/ios/reference/native-mobile/configuration.md): Configure the SDK with your publishable key and Clerk options.
- [iOS Quickstart](https://clerk.com/docs/ios/getting-started/quickstart.md): Follow the end-to-end setup guide for a Clerk-powered iOS app.

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
