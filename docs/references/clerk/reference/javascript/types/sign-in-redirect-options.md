# SignInRedirectOptions

An interface that provides options for sign-in redirect methods.

## Properties

| Name                       | Type   | Description                                                                                                                                                                        |
| -------------------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| signInForceRedirectUrl?    | string | If provided, this URL will always be redirected to after the user signs in. It's recommended to use the environment variable instead.                                              |
| signUpForceRedirectUrl?    | string | If provided, this URL will always be redirected to after the user signs up. It's recommended to use the environment variable instead.                                              |
| signInFallbackRedirectUrl? | string | The fallback URL to redirect to after the user signs in, if there's no redirect\_url in the path already. Defaults to /. It's recommended to use the environment variable instead. |
| signUpFallbackRedirectUrl? | string | The fallback URL to redirect to after the user signs up, if there's no redirect\_url in the path already. Defaults to /. It's recommended to use the environment variable instead. |

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
