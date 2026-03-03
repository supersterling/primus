# updateEmailAddress()

Updates an [`EmailAddress`](https://clerk.com/docs/reference/javascript/types/email-address.md).

```ts
function updateEmailAddress(
  emailAddressId: string,
  params: UpdateEmailAddressParams,
): Promise<EmailAddress>
```

## `UpdateEmailAddressParams`

| Name      | Type    | Description                                                                  |
| --------- | ------- | ---------------------------------------------------------------------------- |
| primary?  | boolean | Whether or not to set the email address as the user's primary email address. |
| verified? | boolean | Whether or not the email address is verified.                                |

## Example

> Using `clerkClient` varies based on your framework. Refer to the [`JS Backend SDK overview`](https://clerk.com/docs/js-backend/getting-started/quickstart.md) for usage details, including guidance on [`how to access the userId and other properties`](https://clerk.com/docs/js-backend/getting-started/quickstart.md#get-the-user-id-and-other-properties).

```tsx {{ mark: [[12, 13]] }}
const emailAddressId = 'idn_123'

const params = { verified: false }

const response = await clerkClient.emailAddresses.updateEmailAddress(emailAddressId, params)
```

## Backend API (BAPI) endpoint

This method in the SDK is a wrapper around the BAPI endpoint `PATCH/email_addresses/{email_address_id}`. See the [BAPI reference](https://clerk.com/docs/reference/backend-api/tag/email-addresses/patch/email_addresses/%7Bemail_address_id%7D.md){{ target: '_blank' }} for more information.

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
