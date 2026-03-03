# deletePhoneNumber()

Deletes a [`PhoneNumber`](https://clerk.com/docs/reference/javascript/types/phone-number.md).

```ts
function deletePhoneNumber(phoneNumberId: string): Promise<PhoneNumber>
```

## Parameters

| Name          | Type   | Description                           |
| ------------- | ------ | ------------------------------------- |
| phoneNumberId | string | The ID of the phone number to delete. |

## Example

> Using `clerkClient` varies based on your framework. Refer to the [`JS Backend SDK overview`](https://clerk.com/docs/js-backend/getting-started/quickstart.md) for usage details, including guidance on [`how to access the userId and other properties`](https://clerk.com/docs/js-backend/getting-started/quickstart.md#get-the-user-id-and-other-properties).

```tsx
const phoneNumberId = 'idn_123'

const response = await clerkClient.phoneNumbers.deletePhoneNumber(phoneNumberId)
```

## Backend API (BAPI) endpoint

This method in the SDK is a wrapper around the BAPI endpoint `DELETE/phone_numbers/{phone_number_id}`. See the [BAPI reference](https://clerk.com/docs/reference/backend-api/tag/phone-numbers/delete/phone_numbers/%7Bphone_number_id%7D.md){{ target: '_blank' }} for more information.

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
