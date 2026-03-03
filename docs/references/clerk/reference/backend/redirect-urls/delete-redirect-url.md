# deleteRedirectUrl()

Deletes a [`RedirectUrl`](https://clerk.com/docs/reference/backend/types/backend-redirect-url.md).

```ts
function deleteRedirectUrl(redirectUrlId: string): Promise<RedirectUrl>
```

## Parameters

| Name          | Type   | Description                           |
| ------------- | ------ | ------------------------------------- |
| redirectUrlId | string | The ID of the redirect URL to delete. |

## Example

> Using `clerkClient` varies based on your framework. Refer to the [`JS Backend SDK overview`](https://clerk.com/docs/js-backend/getting-started/quickstart.md) for usage details, including guidance on [`how to access the userId and other properties`](https://clerk.com/docs/js-backend/getting-started/quickstart.md#get-the-user-id-and-other-properties).

```tsx
const redirectUrlId = 'ru_123'

const response = await clerkClient.redirectUrls.deleteRedirectUrl(redirectUrlId)
```

## Backend API (BAPI) endpoint

This method in the SDK is a wrapper around the BAPI endpoint `DELETE/redirect_urls/{id}`. See the [BAPI reference](https://clerk.com/docs/reference/backend-api/tag/redirect-urls/delete/redirect_urls/%7Bid%7D.md){{ target: '_blank' }} for more information.

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
