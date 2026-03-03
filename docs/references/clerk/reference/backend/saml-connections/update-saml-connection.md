# updateSamlConnection()

Updates a [`SamlConnection`](https://clerk.com/docs/reference/backend/types/backend-saml-connection.md) by its ID.

```ts
function updateSamlConnection(
  samlConnectionId: string,
  params: UpdateSamlConnectionParams = {},
): Promise<Organization>
```

## `UpdateSamlConnectionParams`

| Name                | Type                                                                               | Description                                                                                                                            |
| ------------------- | ---------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| name?               | string                                                                             | The name to use as a label for this SAML Connection.                                                                                   |
| provider?           | 'saml\_custom' | 'saml\_okta' | 'saml\_google' | 'saml\_microsoft'              | The IdP provider of the connection.                                                                                                    |
| domain?             | string                                                                             | The domain of your Organization. Sign in flows using an email with this domain will use this SAML Connection. For example: 'clerk.dev' |
| OId?                | string                                                                             | The ID of the Organization to which users of this SAML Connection will be added                                                        |
| idpEntityId?        | string                                                                             | The Entity ID as provided by the IdP.                                                                                                  |
| idpSsoUrl?          | string                                                                             | The Single-Sign On URL as provided by the IdP.                                                                                         |
| idpCertificate?     | string                                                                             | The X.509 certificate as provided by the IdP.                                                                                          |
| idpMetadataUrl?     | string                                                                             | The URL which serves the IdP metadata. If present, it takes priority over the corresponding individual properties.                     |
| idpMetadata?        | string                                                                             | The XML content of the IdP metadata file. If present, it takes priority over the corresponding individual properties.                  |
| attributeMapping?   | { emailAddress?: string, firstName?: string, lastName?: string, userId?: string } | The attribute mapping for the SAML connection.                                                                                         |
| active?             | boolean                                                                            | Indicates whether the connection is active or not.                                                                                     |
| syncUserAttributes? | boolean                                                                            | Indicates whether the connection syncs user attributes between the Service Provider (SP) and Identity Provider (IdP) or not.           |
| allowSubdomains?    | boolean                                                                            | Indicates whether users with an email address subdomain are allowed to use this connection in order to authenticate or not.            |
| allowIdpInitiated?  | boolean                                                                            | Indicates whether the connection allows Identity Provider (IdP) initiated flows or not.                                                |

## Example

> Using `clerkClient` varies based on your framework. Refer to the [`JS Backend SDK overview`](https://clerk.com/docs/js-backend/getting-started/quickstart.md) for usage details, including guidance on [`how to access the userId and other properties`](https://clerk.com/docs/js-backend/getting-started/quickstart.md#get-the-user-id-and-other-properties).

```tsx
const samlConnectionId = 'samlc_123'

const response = await clerkClient.samlConnections.updateSamlConnection(samlConnectionId, {
  name: 'Updated SAML Connection',
})
```

## Backend API (BAPI) endpoint

This method in the SDK is a wrapper around the BAPI endpoint `PATCH/saml_connections/{saml_connection_id}`. See the [BAPI reference](https://clerk.com/docs/reference/backend-api/tag/saml-connections/patch/saml_connections/%7Bsaml_connection_id%7D.md){{ target: '_blank' }} for more information.

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
