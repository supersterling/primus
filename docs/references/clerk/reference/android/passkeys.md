# Configure passkeys for Android

[Passkeys](https://clerk.com/docs/guides/configure/auth-strategies/sign-up-sign-in-options.md#passkeys) are a secure, passwordless authentication method that use biometrics and a physical device to authenticate users. This guide shows you how to configure passkeys for your Android application.

> Android supports passkeys from version 9+. Passkeys will not work with Android emulators. You must use a physical device.

1. ## Enable passkeys

   To use passkeys, first enable the strategy in the [Clerk Dashboard](https://dashboard.clerk.com/~/user-authentication/user-and-authentication?user_auth_tab=passkeys).
2. ## Set up your Android app links in the Clerk Dashboard

   1. In the Clerk Dashboard, navigate to the [**Native applications**](https://dashboard.clerk.com/~/native-applications) page.
   2. Select the **Android** tab.
   3. Select **Add Android app**.
   4. Fill out the form with the following information:
      - The `namespace` (This guide uses the default value `android_app`)
      - Your Android app's package name. You can find this in your app-level `build.gradle` file, typically formatted like `com.example.myclerkapp`.
      - The `SHA256 certificate fingerprints`. If you don't know where to find the `SHA256 certificate fingerprints`, see the [Android docs](https://developers.google.com/android/guides/client-auth).
   5. After submitting the form, you can verify that your `assetlinks.json` file is properly associated with your app by using [Google's **Statement List Generator and Tester**](https://developers.google.com/digital-asset-links/tools/generator).

## Usage

To learn how to use passkeys in your Android application, such as creating, deleting, and authenticating users with passkeys, see the [custom flow guide](https://clerk.com/docs/guides/development/custom-flows/authentication/passkeys.md).

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
