# verifyWebhook()

Verifies the authenticity of a webhook request using Standard Webhooks. Returns a promise that resolves to the verified webhook event data.

```ts
function verifyWebhook(
  request: Request,
  options: { signingSecret?: string },
): Promise<WebhookEvent>;
```

## Parameters

| Parameter                | Type                                     | Description                                                                                                                                                                                                       |
| ------------------------ | ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `request`                | `Request`                                | The request object.                                                                                                                                                                                               |
| `options`                | `{ signingSecret?: string; }` | Optional configuration object.                                                                                                                                                                                    |
| `options.signingSecret?` | `string`                                 | The signing secret for the webhook. It's recommended to use the [`CLERK_WEBHOOK_SIGNING_SECRET` environment variable](https://clerk.com/docs/guides/development/clerk-environment-variables.md#webhooks) instead. |

## Example

See the [guide on syncing data](https://clerk.com/docs/guides/development/webhooks/syncing.md) for more comprehensive and framework-specific examples that you can copy and paste into your app.

```ts
import { verifyWebhook } from "@clerk/backend/webhooks";

export async function POST(request: Request) {
  try {
    const evt = await verifyWebhook(request);

    // Access the event data
    const { id } = evt.data;
    const eventType = evt.type;

    // Handle specific event types
    if (evt.type === "user.created") {
      console.log("New user created:", evt.data.id);
      // Handle user creation
    }

    return new Response("Success", { status: 200 });
  } catch (err) {
    console.error("Webhook verification failed:", err);
    return new Response("Webhook verification failed", { status: 400 });
  }
}
```

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
