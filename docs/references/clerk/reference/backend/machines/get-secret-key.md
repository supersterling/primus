# getSecretKey()

Retrieves a machine secret key by its ID.

```ts
function getSecretKey(machineId: string): Promise<MachineSecretKey>
```

## Parameters

| Name      | Type   | Description                                                 |
| --------- | ------ | ----------------------------------------------------------- |
| machineId | string | The ID of the machine for which to retrieve the secret key. |

## Example

> Using `clerkClient` varies based on your framework. Refer to the [`JS Backend SDK overview`](https://clerk.com/docs/js-backend/getting-started/quickstart.md) for usage details, including guidance on [`how to access the userId and other properties`](https://clerk.com/docs/js-backend/getting-started/quickstart.md#get-the-user-id-and-other-properties).

```ts
const machineId = 'mch_123'

const response = await clerkClient.machines.getSecretKey(machineId)
```

## Backend API (BAPI) endpoint

This method in the SDK is a wrapper around the BAPI endpoint `GET/machines/{machine_id}/secret_key`. See the [BAPI reference](https://clerk.com/docs/reference/backend-api/tag/machines/get/machines/%7Bmachine_id%7D/secret_key.md){{ target: '_blank' }} for more information.

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
