# SamlAccount

An interface that represents a SAML account.

| Name               | Type                                                                  | Description                                                  |
| ------------------ | --------------------------------------------------------------------- | ------------------------------------------------------------ |
| active             | boolean                                                               | A boolean that indicates whether the SAML account is active. |
| email\_address     | string                                                                | The email address of the SAML account.                       |
| first\_name        | string                                                                | The first name of the SAML account.                          |
| last\_name         | string                                                                | The last name of the SAML account.                           |
| saml\_connection   | SamlAccountConnection | null                                         | The SAML connection of the SAML account.                     |
| provider           | 'saml\_okta' | 'saml\_google' | 'saml\_microsoft' | 'saml\_custom' | The provider of the SAML account.                            |
| provider\_user\_id | string | null                                                        | The user's ID as used in the provider.                       |
| verification       | Verification | null                                                  | The verification of the SAML account.                        |

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
