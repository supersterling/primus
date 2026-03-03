# rotateSecretKey()

Rotates the machine secret key for a given machine by its ID.

```ts
function rotateSecretKey(params: RotateMachineSecretKeyParams): Promise<MachineSecretKey>
```

## Parameters

| Name             | Type   | Description                                                                        |
| ---------------- | ------ | ---------------------------------------------------------------------------------- |
| machineId        | string | The ID of the machine for which to rotate the secret key.                          |
| previousTokenTtl | number | The time in seconds that the previous secret key will remain valid after rotation. |

## Example

> Using `clerkClient` varies based on your framework. Refer to the [`JS Backend SDK overview`](https://clerk.com/docs/js-backend/getting-started/quickstart.md) for usage details, including guidance on [`how to access the userId and other properties`](https://clerk.com/docs/js-backend/getting-started/quickstart.md#get-the-user-id-and-other-properties).

```ts
const machineId = 'mch_123'

const response = await clerkClient.machines.rotateSecretKey({
  machineId,
  previousTokenTtl: 3600,
})
```

## Backend API (BAPI) endpoint

This method in the SDK is a wrapper around the BAPI endpoint `POST/machines/{machine_id}/secret_key/rotate`. See the [BAPI reference](https://clerk.com/docs/reference/backend-api/tag/machines/post/machines/%7Bmachine_id%7D/secret_key/rotate.md){{ target: '_blank' }} for more information.

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
