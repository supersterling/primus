# useSSO()

The `useSSO()` hook is used to create a new SSO flow. It can be used in both web and native apps.

## Returns

The `useSSO()` hook returns the `startSSOFlow()` method, which you can use to initiate the SSO flow.

### `startSSOFlow()`

`startSSOFlow()` has the following function signature:

```ts
function startSSOFlow(startSSOFlowParams: StartSSOFlowParams): Promise<StartSSOFlowReturnType>
```

#### Parameters

`startSSOFlow()` accepts the following parameters (`StartSSOFlowParams`):

| Name                                                                                                                                       | Type                                                                                                                                                  | Description                                                                                                                                                                                                                                                                                                                                                                                               |
| ------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 'oauth\_<provider>': The user will be authenticated with their social connection account. See a list of supported values for <provider>. | 'enterprise\_sso': The user will be authenticated either through SAML, EASIE, or OIDC depending on the configuration of their enterprise SSO account. |                                                                                                                                                                                                                                                                                                                                                                                                           |
| identifier?                                                                                                                                | string                                                                                                                                                | Required if strategy is set to 'enterprise\_sso'. The identifier of the user.                                                                                                                                                                                                                                                                                                                             |
| redirectUrl?                                                                                                                               | string                                                                                                                                                | The full URL or path to redirect to after the SSO flow is complete. If not specified, defaults to sso-callback path.                                                                                                                                                                                                                                                                                      |
| unsafeMetadata?                                                                                                                            | SignUpUnsafeMetadata                                                                                                                                  | Metadata that can be read and set from the frontend and the backend. Once the authentication process is complete, the value of this field will be automatically copied to the created user's unsafe metadata (User.unsafeMetadata). One common use case is to collect custom information about the user during the authentication process and store it in this property. Read more about unsafe metadata. |

#### Returns

`startSSOFlow()` returns the following:

| Name               | Type                                                | Description                                                                                                                                                |
| ------------------ | --------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| createdSessionId   | string | null                                      | The ID of the session that was created.                                                                                                                    |
| authSessionResult? | WebBrowser.WebBrowserAuthSessionResult | undefined | The result of the web browser session. See the Expo WebBrowser documentation for more details.                                                             |
| setActive?         | (params: SetActiveParams) => Promise<void>         | A method used to set the active session and/or Organization. Accepts a SetActiveParams object.                                                             |
| signIn?            | SignIn | undefined                                 | The SignIn object that was created, which holds the state of the current sign-in and provides helper methods to navigate and complete the sign-in process. |
| signUp?            | SignUp | undefined                                 | The SignUp object that was created, which holds the state of the current sign-up and provides helper methods to navigate and complete the sign-up process. |

## How to use the `useSSO()` hook

For detailed examples of how to use the `useSSO()` hook, see the following guides:

- [OAuth custom flow](https://clerk.com/docs/guides/development/custom-flows/authentication/oauth-connections.md)
- [Enterprise SSO custom flow](https://clerk.com/docs/guides/development/custom-flows/authentication/enterprise-connections.md)

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
