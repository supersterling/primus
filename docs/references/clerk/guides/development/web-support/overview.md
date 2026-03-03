# Web support

Expo provides a way to [develop web applications](https://docs.expo.dev/workflow/web/) using the same codebase as your iOS and Android apps. Though Clerk prebuilt components cannot be used in native apps, they can be used in web applications built with Expo.

## Create a new project with web support

If you're starting from scratch, you can follow the [`Expo quickstart`](https://clerk.com/docs/expo/getting-started/quickstart.md), which showcases how to create a sign-in and sign-up page with the same code for all platforms Expo supports.

## Add web support to an existing project

If you already have an Expo project and want to add web support, you must first ensure that your existing Clerk [custom flows](https://clerk.com/docs/guides/development/custom-flows/overview.md) do not have any native-specific code. If you have any native-specific code you will have to either adjust your custom flows to also work on web by leveraging [platform-specific code](https://reactnative.dev/docs/platform-specific-code#platform-specific-extensions), if you are using Expo Router you can also take a look at the [platform-specific modules](https://docs.expo.dev/router/advanced/platform-specific-modules/) guide.

> Clerk prebuilt components are only available on the web platform. If you're using Expo for iOS or Android, you'll need to build components using [custom flows](https://clerk.com/docs/guides/development/custom-flows/overview.md).

## Next steps

Learn more about Clerk components, how to build custom flows for your native apps, and how to use Clerk's client-side helpers using the following guides.

- [Create a custom sign-up page](https://clerk.com/docs/guides/development/web-support/custom-sign-up-page.md): Learn how to add a custom sign-up page to your app with Clerk's components.
- [Prebuilt components](https://clerk.com/docs/reference/components/overview.md): Learn how to quickly add authentication to your app using Clerk's suite of components.
- [Customization & localization](https://clerk.com/docs/guides/customizing-clerk/appearance-prop/overview.md): Learn how to customize and localize Clerk components.
- [Custom flows](https://clerk.com/docs/guides/development/custom-flows/overview.md): Expo native apps require custom flows in place of prebuilt components.
- [Client-side helpers](https://clerk.com/docs/reference/expo/overview.md#hooks): Learn more about Clerk's client-side helpers and how to use them.

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
