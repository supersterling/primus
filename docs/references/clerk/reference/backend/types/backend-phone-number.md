# The Backend PhoneNumber object

The Backend `PhoneNumber` object describes a phone number. Phone numbers can be used as a proof of identification for users, or simply as a means of contacting users.

Phone numbers must be **verified** to ensure that they can be assigned to their rightful owners. The `PhoneNumber` object holds all the necessary state around the verification process.

Finally, phone numbers can be used as part of [multi-factor authentication](https://clerk.com/docs/guides/configure/auth-strategies/sign-up-sign-in-options.md#multi-factor-authentication). During sign in, users can opt in to an extra verification step where they will receive an SMS message with a one-time code. This code must be entered to complete the sign in process.

## Properties

| Property                                                       | Type                                                                                                                          | Description                                                                                                                                                                                     |
| -------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="defaultsecondfactor"></a> `defaultSecondFactor`         | `boolean`                                                                                                                     | Set to `true` if this phone number is the default second factor. Set to `false` otherwise. A user must have exactly one default second factor, if multi-factor authentication (2FA) is enabled. |
| <a id="id"></a> `id`                                           | `string`                                                                                                                      | The unique identifier for this phone number.                                                                                                                                                    |
| <a id="linkedto"></a> `linkedTo`                               | <code><a href="https://clerk.com/docs/reference/backend/types/backend-identification-link.md">IdentificationLink</a>[]</code> | An object containing information about any other identification that might be linked to this phone number.                                                                                      |
| <a id="phonenumber"></a> `phoneNumber`                         | `string`                                                                                                                      | The value of this phone number, in [E.164 format](https://en.wikipedia.org/wiki/E.164).                                                                                                         |
| <a id="reservedforsecondfactor"></a> `reservedForSecondFactor` | `boolean`                                                                                                                     | Set to `true` if this phone number is reserved for multi-factor authentication (2FA). Set to `false` otherwise.                                                                                 |
| <a id="verification"></a> `verification`                       | <code>null | <a href="https://clerk.com/docs/reference/backend/types/backend-verification.md">Verification</a></code>         | An object holding information on the verification of this phone number.                                                                                                                         |

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
