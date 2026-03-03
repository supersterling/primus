# Install the SDK

Use Gradle to add `clerk-android-api` (core API) and `clerk-android-ui` (prebuilt Compose UI) to your app module.

## Install via `build.gradle.kts`

Add the Clerk Android SDK dependency to your app's `build.gradle.kts`:

```kotlin
dependencies {
    // For prebuilt UI components (includes API)
    implementation("com.clerk:clerk-android-ui:<latest-version>")

    // Or for API only (no UI)
    implementation("com.clerk:clerk-android-api:<latest-version>")
}
```

> If you don't want to use Clerk's [`prebuilt views`](https://clerk.com/docs/android/reference/views/overview.md), you can just add `clerk-android-api`.

## Install via `build.gradle` (Groovy)

If you're using Groovy syntax:

```groovy
dependencies {
    // For prebuilt UI components (includes API)
    implementation 'com.clerk:clerk-android-ui:<latest-version>'

    // Or for API only (no UI)
    implementation 'com.clerk:clerk-android-api:<latest-version>'
}
```

## Next steps

- [Configure the SDK](https://clerk.com/docs/android/reference/native-mobile/configuration.md): Configure the SDK with your publishable key.
- [Android Quickstart](https://clerk.com/docs/android/getting-started/quickstart.md): Follow the end-to-end setup guide for a Clerk-powered Android app.

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
