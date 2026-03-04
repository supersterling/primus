# Billing

Polar handles payments. Stripe is not used.

## Architecture

```
User browser
  → GET /api/polar/checkout?products=<id>   redirect to Polar hosted checkout
  → pays on Polar
Polar
  → POST /api/polar/webhook                 HMAC-verified, forwarded to Inngest
Inngest
  → polar/<type>                            event received by any registered function
```

The checkout and webhook routes live in `src/app/api/polar/`. The routes are opt-in — the app starts normally without env vars set. Routes return 503 with a clear message if the required var is missing.

## Checkout

Link users to `/api/polar/checkout?products=<polarProductId>`. Polar redirects them to a hosted checkout page. The product ID comes from your Polar dashboard — do not store it in env vars, it's business logic, not configuration.

Optional query params the Checkout handler accepts:

| Param | Description |
|---|---|
| `customerExternalId` | your internal user ID (e.g. Clerk user ID) — links the Polar customer to your user |
| `customerEmail` | pre-fills the email field |
| `customerName` | pre-fills the name field |

## Webhook pipeline

`POST /api/polar/webhook`:

1. Returns 503 if `POLAR_WEBHOOK_SECRET` is not set
2. Verifies the HMAC signature via `@polar-sh/nextjs` `Webhooks` — returns 403 on mismatch
3. Calls `inngest.send({ name: \`polar/${payload.type}\`, data: payload })` for every valid event
4. Returns 200 for unknown event types (e.g. `member.created`) — Polar sends events the SDK doesn't recognise yet; returning a non-2xx would trigger retries and eventually disable the endpoint

Verification is in-process (not delegated to Inngest transforms) to preserve the HMAC cryptographic proof before the payload leaves the route.

## Inngest events

Every Polar webhook becomes an Inngest event named `polar/<type>`. The `event.data` shape is the full Polar webhook payload:

```typescript
{
    type: "order.paid"        // the Polar event type
    timestamp: Date
    data: { /* resource */ }  // the Polar resource (Order, Subscription, etc.)
}
```

### Writing a handler

Import the Polar SDK type for the specific event, use `z.custom<T>()` for the schema:

```typescript
import type { WebhookOrderPaidPayload } from "@polar-sh/sdk/models/components/webhookorderpaidpayload"
import { z } from "zod"
import { eventType } from "@/inngest/core/events"
import { inngest } from "@/inngest/core/client"

const polarOrderPaid = eventType("polar/order.paid", {
    schema: z.custom<WebhookOrderPaidPayload>(),
})

export const onOrderPaid = inngest.createFunction(
    { id: "on-order-paid" },
    { event: polarOrderPaid },
    async ({ event, logger }) => {
        event.data.type          // "order.paid"
        event.data.data.id       // Order ID — fully typed
        event.data.data.amount
        event.data.data.customer
    },
)
```

Only define `eventType` entries for events you actually write functions for. The rest flow through as untyped.

There is no shared `src/inngest/billing/events.ts` pre-defining all Polar event types. Polar has 20+ event types and pre-defining all of them would require maintaining a parallel schema layer that mirrors the Polar SDK types. Instead, define event types locally in each function file, only for the events that function handles. The Polar SDK already ships fully typed payload types — `z.custom<WebhookOrderPaidPayload>()` gives full type safety with zero schema maintenance.

### Key event types

| Event | When it fires |
|---|---|
| `order.paid` | One-time purchase completed or first subscription payment |
| `order.created` | Order created (fires before payment clears) |
| `subscription.created` | New subscription started |
| `subscription.active` | Subscription became active |
| `subscription.canceled` | Subscription canceled (may still have time remaining) |
| `subscription.revoked` | Subscription access ended |
| `customer.created` | New customer record created in Polar |
| `customer.state_changed` | Customer's access state changed (single event covering all subscription state transitions — prefer this for access checks) |

Full list: `docs/references/polar/docs/integrate/webhooks/events.md`

## Environment variables

| Variable | Required | Default | Description |
|---|---|---|---|
| `POLAR_ACCESS_TOKEN` | For checkout | — | API token from your Polar org settings |
| `POLAR_WEBHOOK_SECRET` | For webhooks | — | Copy from `bun dev:polar` output in dev |
| `POLAR_SERVER` | No | `"sandbox"` | Set to `"production"` in prod |

## Dev workflow

```bash
# terminal 1
bun dev

# terminal 2
bun dev:inngest

# terminal 3
bun dev:polar          # tunnels webhooks to localhost, prints POLAR_WEBHOOK_SECRET
```

Copy the printed secret into `.env.local` as `POLAR_WEBHOOK_SECRET`. Trigger a test purchase at `/api/polar/checkout?products=<sandboxProductId>` with card `4242 4242 4242 4242`. Events appear in the Inngest dev UI at `http://localhost:8288`.

Sandbox account: `sandbox.polar.sh`. Production: `polar.sh`. The code doesn't change between environments — only the env vars.
