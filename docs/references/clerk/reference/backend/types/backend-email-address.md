# The Backend EmailAddress object

The Backend `EmailAddress` object is a model around an email address.

Email addresses must be **verified** to ensure that they are assigned to their rightful owners. The `EmailAddress` object holds all necessary state around the verification process.

For implementation examples for adding and verifying email addresses, see the [email link custom flow](https://clerk.com/docs/guides/development/custom-flows/authentication/email-links.md) and [email code custom flow](https://clerk.com/docs/guides/development/custom-flows/account-updates/add-email.md) guides.

## Properties

| Property                                 | Type                                                                                                                          | Description                                                                                                     |
| ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| <a id="emailaddress"></a> `emailAddress` | `string`                                                                                                                      | The value of the email address.                                                                                 |
| <a id="id"></a> `id`                     | `string`                                                                                                                      | The unique identifier for the email address.                                                                    |
| <a id="linkedto"></a> `linkedTo`         | <code><a href="https://clerk.com/docs/reference/backend/types/backend-identification-link.md">IdentificationLink</a>[]</code> | An array of objects containing information about any identifications that might be linked to the email address. |
| <a id="verification"></a> `verification` | <code>null | <a href="https://clerk.com/docs/reference/backend/types/backend-verification.md">Verification</a></code>         | An object holding information on the verification of the email address.                                         |

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
