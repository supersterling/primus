> ## Documentation Index
> Fetch the complete documentation index at: https://polar.sh/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Introduction

> Usage based billing using ingested events

<Info>
  Usage Based Billing is a new feature. We have a lot in store and welcome
  feedback!
</Info>

## Overview

Polar has a powerful Usage Based Billing infrastructure that allows you to charge your customers based on the usage of your application.

This is done by ingesting events from your application, creating Meters to represent that usage, and then adding metered prices to Products to charge for it.

## Concepts

### Events

Events are the core of Usage Based Billing. They represent *some* usage done by a customer in your application. Typical examples of events are:

* A customer consumed AI LLM tokens
* A customer streamed minutes of video
* A customer uploaded a file to your application

Events are sent to Polar using the [Events Ingestion API](/api-reference/events/ingest) and are stored in our database. An event consists of the following fields:

* A `name`, which is a string that can be used to identify the type of event. For example, `ai_usage`, `video_streamed` or `file_uploaded`.
* A `customer_id` or `external_customer_id`, which is Polar's customer ID or your user's ID. This is used to identify the customer that triggered the event.
* A `metadata` object, which is a JSON object that can contain any additional information about the event. This is useful for storing information that can be used to filter the events or compute the actual usage. For example, you can store the duration of the video streamed or the size of the file uploaded.

Here is an example of an event:

```json  theme={null}
{
  "name": "ai_usage",
  "external_customer_id": "cus_123",
  "metadata": {
    "model": "gpt-4.1-nano",
    "requests": 1,
    "total_tokens": 77,
    "request_tokens": 58,
    "response_tokens": 19
  }
}
```

### Meters

Meters are there to filter and aggregate the events that are ingested. Said another way, this is how you define what usage you want to charge for, based on the events you send to Polar. For example:

* AI usage meter, which filters the events with the name `ai_usage` and sums the `total_tokens` field.
* Video streaming meter, which filters the events with the name `video_streamed` and sums the `duration` field.
* File upload meter, which filters the events with the name `file_uploaded` and sums the `size` field.

You can create and manage your meters from the dashboard. Polar is then able to compute the usage over time, both globally and per customer.

### Metered Price

A metered price is a price that is based on the usage of a meter, which is computed by filtering aggregating the events that are ingested. This is how you charge your customers for the usage of your application.

### Meter Credits benefit

You can give credits to your customers on a specific meter. This is done by creating a Meter Credits Benefit, which is a special type of benefit that allows you to give credits to your customers on a specific meter.

On a recurring product, the customer will be credited the amount of units specified in the benefit at the beginning of every subscription cycle period — monthly or yearly.

## Quickstart

Get up and running in 5 minutes

<Steps>
  <Step title="Create a Meter">
    Meters consist of filters and an aggregation function.
    The filter is used to filter the events that should be included in the meter and the aggregation function is used to compute the usage.

    <img className="block dark:hidden" src="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/create-meter.light.png?fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=0145ac51bc8100b038482d31612f3ea6" data-og-width="3598" width="3598" data-og-height="2070" height="2070" data-path="assets/features/usage/create-meter.light.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/create-meter.light.png?w=280&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=06564195b986ffcc5e117fe8d9811a5a 280w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/create-meter.light.png?w=560&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=68bed5ae2b654f960df4cfd9f89067df 560w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/create-meter.light.png?w=840&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=b4eae2ac77588c804de04f46f9bb0ea0 840w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/create-meter.light.png?w=1100&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=7a869fe027539a8cecb45c92c5781031 1100w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/create-meter.light.png?w=1650&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=e661f4bf96776191db89ceaf6f74c4bd 1650w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/create-meter.light.png?w=2500&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=ed97c0b4c66e04ccee501693c309a6bc 2500w" />

    <img className="hidden dark:block" src="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/create-meter.dark.png?fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=2293c25c2e2c014abcf6c8a761568f95" data-og-width="3590" width="3590" data-og-height="2066" height="2066" data-path="assets/features/usage/create-meter.dark.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/create-meter.dark.png?w=280&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=b5dfdb7fff99d88e7ab1e071dc3b1c49 280w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/create-meter.dark.png?w=560&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=cb463be35ab687fc710735ecc25115a7 560w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/create-meter.dark.png?w=840&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=81913de1ce93b114391ef2e3e47e7326 840w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/create-meter.dark.png?w=1100&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=3517924ffa89faf0a672ded7ebfce07b 1100w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/create-meter.dark.png?w=1650&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=121d7076d48d16cc60d6f8d01da93b83 1650w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/create-meter.dark.png?w=2500&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=3a90619357124a1d53198daeb6cac936 2500w" />
  </Step>

  <Step title="Add metered price to a Product">
    To enable usage based billing for a Product, you need to add a metered price to the Product. Metered prices are only applicable to Subscription Products.

    <img className="block dark:hidden" src="https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/features/usage/product-meter.light.png?fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=c1a9f0493fa6b73f0d4581b19e5d757c" data-og-width="2552" width="2552" data-og-height="1600" height="1600" data-path="assets/features/usage/product-meter.light.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/features/usage/product-meter.light.png?w=280&fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=3bd76b239eb542976ada85b10d77ac74 280w, https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/features/usage/product-meter.light.png?w=560&fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=77cc8b5ff8e3ece74597def4976e6e54 560w, https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/features/usage/product-meter.light.png?w=840&fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=000613bbe30c7d0ea01a68010df9057f 840w, https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/features/usage/product-meter.light.png?w=1100&fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=28a3944f3bd8883e7087e115df0eb0c8 1100w, https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/features/usage/product-meter.light.png?w=1650&fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=0767631d6e5b86e1619cc148ba1165f2 1650w, https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/features/usage/product-meter.light.png?w=2500&fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=09603dfff2709840a9d549daf1212edd 2500w" />

    <img className="hidden dark:block" src="https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/features/usage/product-meter.dark.png?fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=4a54e18d784e6c6312c73dd42b02c473" data-og-width="2548" width="2548" data-og-height="1596" height="1596" data-path="assets/features/usage/product-meter.dark.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/features/usage/product-meter.dark.png?w=280&fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=4220c9a8ec19f60bfeea859a6347a768 280w, https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/features/usage/product-meter.dark.png?w=560&fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=5d64369c39f00993c5c02c333b651e1f 560w, https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/features/usage/product-meter.dark.png?w=840&fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=1ea7e017198475c81a3fd3299ad7bded 840w, https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/features/usage/product-meter.dark.png?w=1100&fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=145f18199abc0b5374aa57645b37a01d 1100w, https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/features/usage/product-meter.dark.png?w=1650&fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=7e7e6a2f4a6e2caf87821fe0d2386ba2 1650w, https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/features/usage/product-meter.dark.png?w=2500&fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=e4dd36ce07c66dbcc6ccd39721148808 2500w" />
  </Step>

  <Step title="Ingest Events">
    Now you're ready to ingest events from your application. Sending events which match the meter's filter will increment the meter's usage for the customer.

    <img className="block dark:hidden" src="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/ingest.light.png?fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=6428f34bbf464c2e8248138ccbcea782" data-og-width="1572" width="1572" data-og-height="1104" height="1104" data-path="assets/features/usage/ingest.light.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/ingest.light.png?w=280&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=48ec9760e08b32f72af0eb64f6fdf229 280w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/ingest.light.png?w=560&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=203d82a019fad623818cb1bc97e6ee32 560w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/ingest.light.png?w=840&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=3a5c2fd9b97c3a34b3c9781751cae1f2 840w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/ingest.light.png?w=1100&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=d0cd0f66ddb26b8c21cad10cbf39ce31 1100w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/ingest.light.png?w=1650&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=b0b2666811cd8342645f91466cc66b07 1650w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/ingest.light.png?w=2500&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=ac827327a6bdc5ab6e808b10bb45dd6d 2500w" />

    <img className="hidden dark:block" src="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/ingest.dark.png?fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=f8b485ff1e386a0fa79c50d428c5b958" data-og-width="1566" width="1566" data-og-height="1102" height="1102" data-path="assets/features/usage/ingest.dark.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/ingest.dark.png?w=280&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=5bf03be85d4df401d958f91cf55b843c 280w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/ingest.dark.png?w=560&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=a36b6e326318b5348db5a266b1419932 560w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/ingest.dark.png?w=840&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=e98887dbff16f4595454edacb70abb13 840w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/ingest.dark.png?w=1100&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=b5e57c3e293ec3763c69d5b9f5aa79e0 1100w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/ingest.dark.png?w=1650&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=3bf6e392f7eb1c9a5566ae8d4dd3593d 1650w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/ingest.dark.png?w=2500&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=be5fb49f7b023b6d7d9696aaa1d4aa55 2500w" />
  </Step>

  <Step title="Customer Usage">
    Customers can view their estimated charges for each meter in the Customer Portal.

    <img className="block dark:hidden" src="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/portal.light.png?fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=85bdb395f87e972ed50a7381ba3aad43" data-og-width="2358" width="2358" data-og-height="1218" height="1218" data-path="assets/features/usage/portal.light.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/portal.light.png?w=280&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=8972d5a0a8a6f872681d6f9868bcc880 280w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/portal.light.png?w=560&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=96aeab3c57e09af522465cc2d079c11b 560w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/portal.light.png?w=840&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=eb837824af9aaa0ed9ea55353c8375a0 840w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/portal.light.png?w=1100&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=1b4dda5c34f856b934d2b76fdfbade24 1100w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/portal.light.png?w=1650&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=553abd674a5c2fb50a15fe5aad61a54e 1650w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/portal.light.png?w=2500&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=e5a029265468a698405d6b5b85e8c4d2 2500w" />

    <img className="hidden dark:block" src="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/portal.dark.png?fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=44f1b0e0f67aaa22b293a7dafaf3ab99" data-og-width="2364" width="2364" data-og-height="1214" height="1214" data-path="assets/features/usage/portal.dark.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/portal.dark.png?w=280&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=f5c9e22d99ee09640a9057f823bddfa2 280w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/portal.dark.png?w=560&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=1cfb93c49691551d3a0015f86ba582ec 560w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/portal.dark.png?w=840&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=30229e91a32620d8044e49045b02c465 840w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/portal.dark.png?w=1100&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=d7a5b71049e90623dbc912bc4040cdff 1100w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/portal.dark.png?w=1650&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=0d05475d6642dd222c07255936727b21 1650w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/portal.dark.png?w=2500&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=b541f2af5d8fb788af4089b07d7d395d 2500w" />
  </Step>
</Steps>
