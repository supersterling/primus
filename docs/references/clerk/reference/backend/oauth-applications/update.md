# update()

Updates an [`OAuthApplication`](https://clerk.com/docs/reference/backend/types/backend-oauth-application.md) by its ID.

```ts
function update(params: UpdateOAuthApplicationParams): Promise<OAuthApplication>
```

## `UpdateOAuthApplicationParams`

| Name                  | Type                           | Description                                                                                                                                                                                           |
| --------------------- | ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| oauthApplicationId    | string                         | The ID of the OAuth application to update.                                                                                                                                                            |
| name                  | string                         | The name of the OAuth application.                                                                                                                                                                    |
| redirectUris?         | string[] | null | undefined | An array of redirect URIs for the OAuth application.                                                                                                                                                  |
| scopes?               | string[] | null | undefined | Scopes for the OAuth application. Available scopes are profile, email, public\_metadata, private\_metadata. Defaults to profile email. Provide the requested scopes as a string, separated by spaces. |
| consentScreenEnabled? | boolean | null | undefined   | Specifies whether the consent screen should be displayed in the authentication flow. Cannot be disabled for dynamically registered OAuth applications. Defaults to true.                              |
| public?               | boolean | null | undefined   | Indicates whether the client is public. If true, the Proof Key of Code Exchange (PKCE) flow can be used.                                                                                              |

## Example

> Using `clerkClient` varies based on your framework. Refer to the [`JS Backend SDK overview`](https://clerk.com/docs/js-backend/getting-started/quickstart.md) for usage details, including guidance on [`how to access the userId and other properties`](https://clerk.com/docs/js-backend/getting-started/quickstart.md#get-the-user-id-and-other-properties).

```tsx
const oauthApplicationId = 'oauthapp_123'

const response = await clerkClient.oauthApplications.update({
  oauthApplicationId: oauthApplicationId,
  name: 'test',
  redirectUris: [''],
  scopes: 'profile email public_metadata private_metadata',
  public: true,
})
```

## Backend API (BAPI) endpoint

This method in the SDK is a wrapper around the BAPI endpoint `PATCH/oauth_applications/{oauth_application_id}`. See the [BAPI reference](https://clerk.com/docs/reference/backend-api/tag/oauth-applications/patch/oauth_applications/%7Boauth_application_id%7D.md){{ target: '_blank' }} for more information.

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
