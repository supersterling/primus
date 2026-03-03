# The Backend SamlAccount object

The Backend `SamlAccount` object describes a SAML account.

## Properties

| Property                                                     | Type                                                                                                                  | Description                                                            |
| ------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| <a id="active"></a> `active`                                 | `boolean`                                                                                                             | A boolean that indicates whether the SAML account is active.           |
| <a id="emailaddress"></a> `emailAddress`                     | `string`                                                                                                              | The email address of the SAML account.                                 |
| <a id="enterpriseconnectionid"></a> `enterpriseConnectionId` | `null | string`                                                                                            | The ID of the enterprise connection associated with this SAML account. |
| <a id="firstname"></a> `firstName`                           | `string`                                                                                                              | The first name of the SAML account.                                    |
| <a id="id"></a> `id`                                         | `string`                                                                                                              | The unique identifier for the SAML account.                            |
| <a id="lastauthenticatedat"></a> `lastAuthenticatedAt`       | `null | number`                                                                                            | The date when the SAML account was last authenticated.                 |
| <a id="lastname"></a> `lastName`                             | `string`                                                                                                              | The last name of the SAML account.                                     |
| <a id="provider"></a> `provider`                             | `string`                                                                                                              | The provider of the SAML account.                                      |
| <a id="provideruserid"></a> `providerUserId`                 | `null | string`                                                                                            | The user's ID as used in the provider.                                 |
| <a id="samlconnection"></a> `samlConnection`                 | `null | SamlAccountConnection`                                                                             | The SAML connection of the SAML account.                               |
| <a id="verification"></a> `verification`                     | <code>null | <a href="https://clerk.com/docs/reference/backend/types/backend-verification.md">Verification</a></code> | The verification of the SAML account.                                  |

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
