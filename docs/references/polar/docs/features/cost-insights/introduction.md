> ## Documentation Index
> Fetch the complete documentation index at: https://polar.sh/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Introduction to Cost Insights

> Track costs, profits, and customer lifetime value with event-based cost tracking

<img className="block dark:hidden" src="https://mintcdn.com/polar/lA614ZvRwurqvmze/assets/features/cost/ingestion.light.png?fit=max&auto=format&n=lA614ZvRwurqvmze&q=85&s=92ccae14e7ee0573454e268f316764f2" data-og-width="1306" width="1306" data-og-height="372" height="372" data-path="assets/features/cost/ingestion.light.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/polar/lA614ZvRwurqvmze/assets/features/cost/ingestion.light.png?w=280&fit=max&auto=format&n=lA614ZvRwurqvmze&q=85&s=45ce5db8c37ac44662e76c4cc2cc73a0 280w, https://mintcdn.com/polar/lA614ZvRwurqvmze/assets/features/cost/ingestion.light.png?w=560&fit=max&auto=format&n=lA614ZvRwurqvmze&q=85&s=2ea03f25659454141515d53e516a7dd8 560w, https://mintcdn.com/polar/lA614ZvRwurqvmze/assets/features/cost/ingestion.light.png?w=840&fit=max&auto=format&n=lA614ZvRwurqvmze&q=85&s=951cffe443ae1426186a2af1db0da702 840w, https://mintcdn.com/polar/lA614ZvRwurqvmze/assets/features/cost/ingestion.light.png?w=1100&fit=max&auto=format&n=lA614ZvRwurqvmze&q=85&s=010145f34f19f7d91723020befc4b28d 1100w, https://mintcdn.com/polar/lA614ZvRwurqvmze/assets/features/cost/ingestion.light.png?w=1650&fit=max&auto=format&n=lA614ZvRwurqvmze&q=85&s=50600d7e5a306f2d50579cf4e4d4359f 1650w, https://mintcdn.com/polar/lA614ZvRwurqvmze/assets/features/cost/ingestion.light.png?w=2500&fit=max&auto=format&n=lA614ZvRwurqvmze&q=85&s=4f727791de9b720f22e5facf54ce2aa1 2500w" />

<img className="hidden dark:block" src="https://mintcdn.com/polar/lA614ZvRwurqvmze/assets/features/cost/ingestion.dark.png?fit=max&auto=format&n=lA614ZvRwurqvmze&q=85&s=76714c2c92a4ddc8959ab178e3e352e3" data-og-width="1306" width="1306" data-og-height="368" height="368" data-path="assets/features/cost/ingestion.dark.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/polar/lA614ZvRwurqvmze/assets/features/cost/ingestion.dark.png?w=280&fit=max&auto=format&n=lA614ZvRwurqvmze&q=85&s=698b9e1eadddb8384b6888abc740730e 280w, https://mintcdn.com/polar/lA614ZvRwurqvmze/assets/features/cost/ingestion.dark.png?w=560&fit=max&auto=format&n=lA614ZvRwurqvmze&q=85&s=6e6255bba857238f0824d4f067e0970d 560w, https://mintcdn.com/polar/lA614ZvRwurqvmze/assets/features/cost/ingestion.dark.png?w=840&fit=max&auto=format&n=lA614ZvRwurqvmze&q=85&s=4ce6690eb8fcbb897e3c40b41132afdd 840w, https://mintcdn.com/polar/lA614ZvRwurqvmze/assets/features/cost/ingestion.dark.png?w=1100&fit=max&auto=format&n=lA614ZvRwurqvmze&q=85&s=7f29ec5d3c5bd304055a22380a8db943 1100w, https://mintcdn.com/polar/lA614ZvRwurqvmze/assets/features/cost/ingestion.dark.png?w=1650&fit=max&auto=format&n=lA614ZvRwurqvmze&q=85&s=807d07a01136e8bb4a92668f6563ef3d 1650w, https://mintcdn.com/polar/lA614ZvRwurqvmze/assets/features/cost/ingestion.dark.png?w=2500&fit=max&auto=format&n=lA614ZvRwurqvmze&q=85&s=0274d6bb9273d61a2a460b2d640aee4c 2500w" />

Cost Insights is a powerful feature that enables you to calculate business-centric metrics like Costs, Profits, and Customer Lifetime Value (LTV) by annotating your events with cost data.

<Note>
  Cost Insights is currently in beta. You may enable it in your organization
  settings.
</Note>

## Overview

While Polar automatically tracks revenue from orders and subscriptions, Cost Insights allows you to track the costs associated with delivering your product or service. By combining revenue and cost data, you can gain deep insights into profitability on a per-customer basis.

## How It Works

Cost Insights works in three simple steps:

1. **Ingest events with cost data**: Add a `_cost` property to events metadata when ingesting them through Polar's Event Ingestion API
2. **Automatic aggregation**: Polar automatically aggregates costs alongside your revenue data
3. **Query and analyze**: Use the Metrics API, or the Polar Dashboard to retrieve costs, profits, and customer LTV

### Quick Example

```json  theme={null}
{
  "events": [
    {
      "name": "llm.inference",
      "external_customer_id": "user_123",
      "metadata": {
        "_cost": {
          "amount": 0.025, // $0.00025 in cents
          "currency": "usd"
        }
      }
    }
  ]
}
```

## Common Use Cases

* **AI/LLM Applications**: Track the cost of API calls to OpenAI, Anthropic, or other LLM providers
* **Infrastructure Costs**: Monitor compute, storage, or bandwidth costs per customer
* **Third-Party Services**: Track costs from email providers, SMS gateways, or other external services
* **Customer Profitability**: Calculate profit margins and LTV for each customer

## Documentation

<CardGroup cols={2}>
  <Card title="Cost Events" icon="chart-line" href="/features/cost-insights/cost-events">
    Learn how to track costs by adding the `_cost` property to your events
    metadata
  </Card>

  <Card title="Cost Metrics" icon="chart-bar" href="/features/analytics">
    Query and analyze costs, profits, and customer lifetime value
  </Card>
</CardGroup>
