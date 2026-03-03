# The Backend APIKey object

The Backend `APIKey` object holds information about an API key.

## Properties

| Property                                         | Type                                    | Description                                                                                                                                                                            |
| ------------------------------------------------ | --------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="claims"></a> `claims`                     | <code>null | Record<string, any></code> | Custom claims associated with the API key.                                                                                                                                             |
| <a id="createdat"></a> `createdAt`               | `number`                                | The date when the API key was created.                                                                                                                                                 |
| <a id="createdby"></a> `createdBy`               | `null | string`              | The user ID for the user creating the API key.                                                                                                                                         |
| <a id="description"></a> `description`           | `null | string`              | An optional description for the API key.                                                                                                                                               |
| <a id="expiration"></a> `expiration`             | `null | number`              | The expiration date and time of the API key. `null` if the API key never expires.                                                                                                      |
| <a id="expired"></a> `expired`                   | `boolean`                               | A boolean indicating whether the API key has expired.                                                                                                                                  |
| <a id="id"></a> `id`                             | `string`                                | A unique ID for the API key.                                                                                                                                                           |
| <a id="lastusedat"></a> `lastUsedAt`             | `null | number`              | The date and time when the API key was last used to authenticate a request.                                                                                                            |
| <a id="name"></a> `name`                         | `string`                                | The API key's name.                                                                                                                                                                    |
| <a id="revocationreason"></a> `revocationReason` | `null | string`              | The reason for revoking the API key, if it has been revoked.                                                                                                                           |
| <a id="revoked"></a> `revoked`                   | `boolean`                               | A boolean indicating whether the API key has been revoked.                                                                                                                             |
| <a id="scopes"></a> `scopes`                     | `string[]`                   | An array of scopes that define what the API key can access.                                                                                                                            |
| <a id="secret"></a> `secret?`                    | `string`                                | The API key secret. **This property is only present in the response from [`create()`](https://clerk.com/docs/reference/javascript/api-keys.md#create) and cannot be retrieved later.** |
| <a id="subject"></a> `subject`                   | `string`                                | The user or organization ID that the API key is associated with.                                                                                                                       |
| <a id="type"></a> `type`                         | `string`                                | The type of the API key. Currently always `'api_key'`.                                                                                                                                 |
| <a id="updatedat"></a> `updatedAt`               | `number`                                | The date when the API key was last updated.                                                                                                                                            |

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
