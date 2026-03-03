# update()

Updates a machine by its ID.

```ts
function update(params: UpdateMachineParams): Promise<Machine>
```

## `UpdateMachineParams`

| Name             | Type   | Description                                                                   |
| ---------------- | ------ | ----------------------------------------------------------------------------- |
| machineId        | string | The ID of the machine to update.                                              |
| name?            | string | The name of the machine.                                                      |
| defaultTokenTtl? | number | The default time-to-live (TTL) in seconds for tokens created by this machine. |

## Example

> Using `clerkClient` varies based on your framework. Refer to the [`JS Backend SDK overview`](https://clerk.com/docs/js-backend/getting-started/quickstart.md) for usage details, including guidance on [`how to access the userId and other properties`](https://clerk.com/docs/js-backend/getting-started/quickstart.md#get-the-user-id-and-other-properties).

```ts
const machineId = 'mch_123'

const response = await clerkClient.machines.update({
  machineId,
  name: 'New Machine Name',
  defaultTokenTtl: 3600,
})
```

## Backend API (BAPI) endpoint

This method in the SDK is a wrapper around the BAPI endpoint `PATCH/machines/{machine_id}`. See the [BAPI reference](https://clerk.com/docs/reference/backend-api/tag/machines/patch/machines/%7Bmachine_id%7D.md){{ target: '_blank' }} for more information.

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
