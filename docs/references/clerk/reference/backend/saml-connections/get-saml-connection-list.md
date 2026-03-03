# getSamlConnectionList()

Retrieves the list of SAML connections for an instance. Returns a [`PaginatedResourceResponse`](https://clerk.com/docs/reference/backend/types/paginated-resource-response.md) object with a `data` property that contains an array of [`SamlConnection`](https://clerk.com/docs/reference/backend/types/backend-saml-connection.md) objects, and a `totalCount` property that indicates the total number of SAML connections for the instance.

```ts
function getSamlConnectionList(params: SamlConnectionListParams = {}): Promise<SamlConnection[]>
```

## `SamlConnectionListParams`

| Name    | Type   | Description                                                                                          |
| ------- | ------ | ---------------------------------------------------------------------------------------------------- |
| limit?  | number | The number of results to return. Must be an integer greater than zero and less than 501. Default: 10 |
| offset? | number | The number of results to skip. Default: 0                                                            |

## Examples

### Basic

> Using `clerkClient` varies based on your framework. Refer to the [`JS Backend SDK overview`](https://clerk.com/docs/js-backend/getting-started/quickstart.md) for usage details, including guidance on [`how to access the userId and other properties`](https://clerk.com/docs/js-backend/getting-started/quickstart.md#get-the-user-id-and-other-properties).

```tsx
const response = await clerkClient.samlConnections.getSamlConnectionList()
```

### Limit the number of results

Retrieves Organization list that is filtered by the number of results.

```tsx
const { data, totalCount } = await clerkClient.samlConnections.getSamlConnectionList({
  // returns the first 10 results
  limit: 10,
})
```

### Skip results

Retrieves Organization list that is filtered by the number of results to skip.

```tsx
const { data, totalCount } = await clerkClient.samlConnections.getSamlConnectionList({
  // skips the first 10 results
  offset: 10,
})
```

## Backend API (BAPI) endpoint

This method in the SDK is a wrapper around the BAPI endpoint `GET/saml_connections`. See the [BAPI reference](https://clerk.com/docs/reference/backend-api/tag/saml-connections/get/saml_connections.md){{ target: '_blank' }} for more information.

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
