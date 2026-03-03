# getRedirectUrlList()

Retrieves a list of all white-listed redirect URLs. Returns a [`PaginatedResourceResponse`](https://clerk.com/docs/reference/backend/types/paginated-resource-response.md) object with a `data` property that contains an array of [`RedirectUrl`](https://clerk.com/docs/reference/backend/types/backend-redirect-url.md) objects, and a `totalCount` property that indicates the total number of redirect URLs for the application.

```tsx
function getRedirectUrlList(): () => Promise<PaginatedResourceResponse<RedirectUrl[]>>
```

## Example

> Using `clerkClient` varies based on your framework. Refer to the [`JS Backend SDK overview`](https://clerk.com/docs/js-backend/getting-started/quickstart.md) for usage details, including guidance on [`how to access the userId and other properties`](https://clerk.com/docs/js-backend/getting-started/quickstart.md#get-the-user-id-and-other-properties).

```tsx
const response = await clerkClient.redirectUrls.getRedirectUrlList()
```

## Backend API (BAPI) endpoint

This method in the SDK is a wrapper around the BAPI endpoint `GET/redirect_urls/{id}`. See the [BAPI reference](https://clerk.com/docs/reference/backend-api/tag/redirect-urls/get/redirect_urls.md){{ target: '_blank' }} for more information.

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
