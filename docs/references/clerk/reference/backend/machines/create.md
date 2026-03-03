# create()

Creates a new machine.

```ts
function create(params: CreateMachineParams): Promise<Machine>
```

## `CreateMachineParams`

| Name             | Type      | Description                                                                   |
| ---------------- | --------- | ----------------------------------------------------------------------------- |
| name             | string    | The name of the machine.                                                      |
| scopedMachines?  | string[] | Array of machine IDs that this machine will have access to.                   |
| defaultTokenTtl? | number    | The default time-to-live (TTL) in seconds for tokens created by this machine. |

## Example

> Using `clerkClient` varies based on your framework. Refer to the [`JS Backend SDK overview`](https://clerk.com/docs/js-backend/getting-started/quickstart.md) for usage details, including guidance on [`how to access the userId and other properties`](https://clerk.com/docs/js-backend/getting-started/quickstart.md#get-the-user-id-and-other-properties).

### Basic machine creation

```ts
const response = await clerkClient.machines.create({
  name: 'Email Server',
})
```

### Machine with scoped access

```ts
const response = await clerkClient.machines.create({
  name: 'API Gateway',
  scopedMachines: ['mch_123', 'mch_456'],
  defaultTokenTtl: 3600,
})
```

## Backend API (BAPI) endpoint

This method in the SDK is a wrapper around the BAPI endpoint `POST/machines`. See the [BAPI reference](https://clerk.com/docs/reference/backend-api/tag/machines/post/machines.md){{ target: '_blank' }} for more information.

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
