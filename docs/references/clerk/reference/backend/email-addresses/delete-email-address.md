# deleteEmailAddress()

Deletes an [`EmailAddress`](https://clerk.com/docs/reference/javascript/types/email-address.md).

```ts
function deleteEmailAddress(emailAddressId: string): Promise<EmailAddress>
```

## Parameters

| Name           | Type   | Description                            |
| -------------- | ------ | -------------------------------------- |
| emailAddressId | string | The ID of the email address to delete. |

## Example

> Using `clerkClient` varies based on your framework. Refer to the [`JS Backend SDK overview`](https://clerk.com/docs/js-backend/getting-started/quickstart.md) for usage details, including guidance on [`how to access the userId and other properties`](https://clerk.com/docs/js-backend/getting-started/quickstart.md#get-the-user-id-and-other-properties).

```tsx
const emailAddressId = 'idn_123'

const response = await clerkClient.emailAddresses.deleteEmailAddress(emailAddressId)
```

## Backend API (BAPI) endpoint

This method in the SDK is a wrapper around the BAPI endpoint `DELETE/email_addresses/{email_address_id}`. See the [BAPI reference](https://clerk.com/docs/reference/backend-api/tag/email-addresses/delete/email_addresses/%7Bemail_address_id%7D.md){{ target: '_blank' }} for more information.

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
