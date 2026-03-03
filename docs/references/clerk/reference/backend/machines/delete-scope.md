# deleteScope()

Deletes a machine scope, removing access between two machines.

```ts
function deleteScope(machineId: string, otherMachineId: string): Promise<MachineScope>
```

## Parameters

| Name           | Type   | Description                                                                    |
| -------------- | ------ | ------------------------------------------------------------------------------ |
| machineId      | string | The ID of the machine that currently has access to the target machine.         |
| otherMachineId | string | The ID of the machine that will no longer be accessible by the source machine. |

## Example

> Using `clerkClient` varies based on your framework. Refer to the [`JS Backend SDK overview`](https://clerk.com/docs/js-backend/getting-started/quickstart.md) for usage details, including guidance on [`how to access the userId and other properties`](https://clerk.com/docs/js-backend/getting-started/quickstart.md#get-the-user-id-and-other-properties).

```ts
const machineId = 'mch_123'
const otherMachineId = 'mch_456'

const response = await clerkClient.machines.deleteScope(machineId, otherMachineId)
```

## Backend API (BAPI) endpoint

This method in the SDK is a wrapper around the BAPI endpoint `DELETE/machines/{machine_id}/scopes/{other_machine_id}`. See the [BAPI reference](https://clerk.com/docs/reference/backend-api/tag/machines/delete/machines/%7Bmachine_id%7D/scopes/%7Bother_machine_id%7D.md){{ target: '_blank' }} for more information.

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
