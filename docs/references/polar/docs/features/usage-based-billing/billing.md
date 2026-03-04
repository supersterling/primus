> ## Documentation Index
> Fetch the complete documentation index at: https://polar.sh/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Billing

> How billing works with Usage Based

## Metered Pricing

Metered Pricing is a pricing model where you charge your customers based on the usage of your application.

There are a few different pricing models unique to Usage Based Billing:

* Unit Pricing
* Volume Pricing *(coming soon)*

### Unit Pricing

Unit pricing is a simple pricing model where you charge a fixed amount for each unit of usage.

For example:

| Product Meter       | Price per unit |
| ------------------- | -------------- |
| `prompt-tokens`     | \$0.10         |
| `completion-tokens` | \$0.18         |

This means that every unit of `prompt-tokens` consumed by a customer will be charged at \$0.10 and every unit of `completion-tokens` will be charged at \$0.18.

It's a linear pricing model, where the price per unit is fixed.

### Volume Pricing *(coming soon)*

Volume pricing is a pricing model where you charge a fixed amount for a certain volume of usage. Volume pricing is not yet available, but will be coming soon.

## Invoicing Customers for Usage

Our Usage Based Billing infrastructure is built to work with Subscription products out of the box.

### Add a metered price to your product

To charge your customers for usage, you need to add a metered price to your product. You'll need the select the **Meter** and the **amount per unit**.

<img className="block dark:hidden" src="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/cap.light.png?fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=b4ac7dd5bf3e6a6f1aa8ef8866bc81a3" data-og-width="1434" width="1434" data-og-height="752" height="752" data-path="assets/features/usage/cap.light.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/cap.light.png?w=280&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=822053ba1df3df18cbcbc561b192be2d 280w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/cap.light.png?w=560&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=bbb1d12e8d4747fdd517589e269ac0ea 560w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/cap.light.png?w=840&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=33795a10571507b63808224050dbdb44 840w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/cap.light.png?w=1100&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=d49bad6531fa37e3cf6971220f0ea173 1100w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/cap.light.png?w=1650&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=15e6a9f00e9cbccc1fc19543e5d6b2da 1650w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/cap.light.png?w=2500&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=5ded0738148af721334e6697c1faccf6 2500w" />

<img className="hidden dark:block" src="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/cap.dark.png?fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=d2fb533708a2a5a4f25ffaa9f248331b" data-og-width="1444" width="1444" data-og-height="748" height="748" data-path="assets/features/usage/cap.dark.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/cap.dark.png?w=280&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=7efa3c14ef16cc2d9d5b8d95f1807c0f 280w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/cap.dark.png?w=560&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=c5a7da3d6b825d49c0a3b703ea6c7348 560w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/cap.dark.png?w=840&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=5bfcb816299d5d0c1217e97deac61ca1 840w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/cap.dark.png?w=1100&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=06a4f592338b149cffa42701aa5076c2 1100w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/cap.dark.png?w=1650&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=560342eb952b8b4275a299861f894656 1650w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/cap.dark.png?w=2500&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=387130fbd30b5ad23b78b34f351b768a 2500w" />

Optionally, you can set a **cap**. The customer will be charged the cap amount if they exceed it, regardless of the usage.

### Monthly Invoicing

If a customer has a subscription with a monthly billing period, usage is aggregated monthly and invoiced at the end of the month with the rest of the subscription.

### Yearly Invoicing

If a customer has a subscription with a yearly billing period, usage is aggregated yearly and invoiced at the end of the year with the rest of the subscription.

### Usage Charges and Subscription Cancellation

When a subscription is canceled, it generally remains active until the end of the current billing period (known as the grace period). During this grace period, all accumulated usage-based charges continue to be tracked. A final invoice will be issued at the end of that period to cover the consumed usage, even if the subscription will not be renewed. This ensures no pending usage charges are lost.

<Warning>
  If a [discount](/features/discounts) is applied on the subscription, it'll be
  applied on the **whole invoice**, including metered usage.
</Warning>

## Customer Portal

Customers can view their estimated charges for each meter in the Customer Portal.

<img className="block dark:hidden" src="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/portal.light.png?fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=85bdb395f87e972ed50a7381ba3aad43" data-og-width="2358" width="2358" data-og-height="1218" height="1218" data-path="assets/features/usage/portal.light.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/portal.light.png?w=280&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=8972d5a0a8a6f872681d6f9868bcc880 280w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/portal.light.png?w=560&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=96aeab3c57e09af522465cc2d079c11b 560w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/portal.light.png?w=840&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=eb837824af9aaa0ed9ea55353c8375a0 840w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/portal.light.png?w=1100&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=1b4dda5c34f856b934d2b76fdfbade24 1100w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/portal.light.png?w=1650&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=553abd674a5c2fb50a15fe5aad61a54e 1650w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/portal.light.png?w=2500&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=e5a029265468a698405d6b5b85e8c4d2 2500w" />

<img className="hidden dark:block" src="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/portal.dark.png?fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=44f1b0e0f67aaa22b293a7dafaf3ab99" data-og-width="2364" width="2364" data-og-height="1214" height="1214" data-path="assets/features/usage/portal.dark.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/portal.dark.png?w=280&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=f5c9e22d99ee09640a9057f823bddfa2 280w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/portal.dark.png?w=560&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=1cfb93c49691551d3a0015f86ba582ec 560w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/portal.dark.png?w=840&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=30229e91a32620d8044e49045b02c465 840w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/portal.dark.png?w=1100&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=d7a5b71049e90623dbc912bc4040cdff 1100w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/portal.dark.png?w=1650&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=0d05475d6642dd222c07255936727b21 1650w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/portal.dark.png?w=2500&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=b541f2af5d8fb788af4089b07d7d395d 2500w" />
