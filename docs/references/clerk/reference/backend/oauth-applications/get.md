# get()

Retrieves an [`OAuthApplication`](https://clerk.com/docs/reference/backend/types/backend-oauth-application.md) by its ID.

```ts
function get(oauthApplicationId: string): Promise<OAuthApplication>
```

## Parameters

| Name               | Type   | Description                                  |
| ------------------ | ------ | -------------------------------------------- |
| oauthApplicationId | string | The ID of the OAuth application to retrieve. |

## Example

> Using `clerkClient` varies based on your framework. Refer to the [`JS Backend SDK overview`](https://clerk.com/docs/js-backend/getting-started/quickstart.md) for usage details, including guidance on [`how to access the userId and other properties`](https://clerk.com/docs/js-backend/getting-started/quickstart.md#get-the-user-id-and-other-properties).

```tsx
const oauthApplicationId = 'oauthapp_123'

const response = await clerkClient.oauthApplications.get(oauthApplicationId)
```

## Backend API (BAPI) endpoint

This method in the SDK is a wrapper around the BAPI endpoint `GET/oauth_applications/{oauth_application_id}`. See the [BAPI reference](https://clerk.com/docs/reference/backend-api/tag/oauth-applications/get/oauth_applications/%7Boauth_application_id%7D.md){{ target: '_blank' }} for more information.

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
