> ## Documentation Index
> Fetch the complete documentation index at: https://polar.sh/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Credits

> Crediting customers for Usage Based Billing

Credits is the way to pre-pay for usage in Polar. It allows you to give your customers the ability to pre-pay for usage instead of risk getting a hefty bill at the end of the month.

## How Credits Work

When you ingest events into a Usage Meter, customers will be charged for the usage based on the product's pricing model.

However, sometimes you may want to give your customers the ability to pre-pay for usage instead of risk getting a hefty bill at the end of the month.

When you issue Credits to a customer, we first deduct the Credits from their Usage Meter balance. If the Usage Meter balance reaches 0, the customer will be charged for the overage.

### Credits-only spending

To avoid any overage charges, don't create any Metered price on your product. This way, billing won't be triggered at all for the meter

## Issuing Credits with the Credits Benefit

<img className="block dark:hidden" src="https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/benefits/credits/credits.light.png?fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=95a964aa562069bd58a551e44c757459" data-og-width="1620" width="1620" data-og-height="2304" height="2304" data-path="assets/features/benefits/credits/credits.light.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/benefits/credits/credits.light.png?w=280&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=b760d24e9a3986942f85f837906349fa 280w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/benefits/credits/credits.light.png?w=560&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=83df523fa528bf405607cfffc437ef16 560w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/benefits/credits/credits.light.png?w=840&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=05e2f5f37fc1f0f66a2269a07f188ed1 840w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/benefits/credits/credits.light.png?w=1100&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=ed026417db037e5e4248776054fd6033 1100w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/benefits/credits/credits.light.png?w=1650&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=b547ce3907051f816340a08b145fa910 1650w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/benefits/credits/credits.light.png?w=2500&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=deda471c9661f21c57aebfcd23057040 2500w" />

<img className="hidden dark:block" src="https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/benefits/credits/credits.dark.png?fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=a545e217dd64f288b127ec76eb3527ef" data-og-width="1620" width="1620" data-og-height="2304" height="2304" data-path="assets/features/benefits/credits/credits.dark.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/benefits/credits/credits.dark.png?w=280&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=f53dd50244006f52fe28389ccd32dc11 280w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/benefits/credits/credits.dark.png?w=560&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=ed51c6ecd5c605c90933ff9a8036c01f 560w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/benefits/credits/credits.dark.png?w=840&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=c1604014eb9f4556687cb2dae0cd4730 840w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/benefits/credits/credits.dark.png?w=1100&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=8d6c8f2f81c2fbe10de06d045cae5488 1100w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/benefits/credits/credits.dark.png?w=1650&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=08efb35cd818b5c25f0011415eb7da5e 1650w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/benefits/credits/credits.dark.png?w=2500&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=6ce168ea0a513884b7be0e7989633a84 2500w" />

The Credits benefit will credit a customer's Usage Meter balance at different points in time depending on the type of product the benefit is attached to.

### Subscription Products

The customer will be credited the amount of units specified in the benefit at the beginning of every subscription cycle period — monthly or yearly.

### One-Time Products

The customer will be credited the amount of units specified in the benefit once at the time of purchase.

## Tracking customer's balance

In your application, you'll likely need to track the customer's balance for a given meter. The easiest way to do this is to use the [Customer State](/integrate/customer-state), which will give you the overview of the customer, including the balance for each of their active meters.

You can also specifically query the meters balance using the [Customer Meters API](/api-reference/customer-meters/list).

<Warning>
  Polar doesn't block usage if the customer exceeds their balance. You're
  responsible for implementing the logic you need to prevent usage if they
  exceed it.
</Warning>
