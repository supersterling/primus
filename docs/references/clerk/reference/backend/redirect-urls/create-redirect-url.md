# createRedirectUrl()

Creates a [`RedirectUrl`](https://clerk.com/docs/reference/backend/types/backend-redirect-url.md).

```ts
function createRedirectUrl(params: CreateRedirectUrlParams): Promise<RedirectUrl>
```

## `CreateRedirectUrlParams`

| Name | Type   | Description                                                                                                                                |
| ---- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
| url  | string | The full url value prefixed with https\:// or a custom scheme. For example, https\://my-app.com/oauth-callback or my-app\://oauth-callback |

## Example

> Using `clerkClient` varies based on your framework. Refer to the [`JS Backend SDK overview`](https://clerk.com/docs/js-backend/getting-started/quickstart.md) for usage details, including guidance on [`how to access the userId and other properties`](https://clerk.com/docs/js-backend/getting-started/quickstart.md#get-the-user-id-and-other-properties).

```tsx
const response = await clerkClient.redirectUrls.createRedirectUrl({
  url: 'https://example.com',
})
```

## Backend API (BAPI) endpoint

This method in the SDK is a wrapper around the BAPI endpoint `POST/redirect_urls`. See the [BAPI reference](https://clerk.com/docs/reference/backend-api/tag/redirect-urls/post/redirect_urls.md){{ target: '_blank' }} for more information.

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
