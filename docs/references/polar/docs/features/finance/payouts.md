> ## Documentation Index
> Fetch the complete documentation index at: https://polar.sh/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Payouts

> Easily withdraw money from your Polar account at any time

You can issue a withdrawal, i.e payout, at any time once your balance meets the minimum threshold for your account currency. We will then transfer the balance minus Stripe payout fees (see below) to your Stripe account & issue a payout on their side.

## Minimum Payout Thresholds

The minimum balance required to issue a payout varies based out the payout currency. Certain currencies having a higher limit due to Stripe requirements. These limits can change at a later point.

| Currency         | Minimum Balance (USD) |
| ---------------- | --------------------- |
| USD              | \$10.00               |
| EUR              | \$13.00               |
| GBP              | \$15.00               |
| CHF              | \$15.00               |
| AOA              | \$30.00               |
| ALL              | \$40.00               |
| AMD              | \$40.00               |
| AZN              | \$40.00               |
| BAM              | \$40.00               |
| BOB              | \$40.00               |
| BTN              | \$40.00               |
| CLP              | \$40.00               |
| GMD              | \$40.00               |
| GYD              | \$40.00               |
| KHR              | \$40.00               |
| KRW              | \$40.00               |
| LAK              | \$40.00               |
| MDL              | \$40.00               |
| MGA              | \$40.00               |
| MKD              | \$40.00               |
| MNT              | \$40.00               |
| MYR              | \$40.00               |
| MZN              | \$40.00               |
| NAD              | \$40.00               |
| PYG              | \$40.00               |
| RSD              | \$40.00               |
| THB              | \$40.00               |
| TWD              | \$40.00               |
| UZS              | \$40.00               |
| COP              | \$50.00               |
| Other currencies | \$10.00 (default)     |

## Manual Withdrawal

We require this to be done manually since:

1. Users have requested control for easier accounting vs. frequent & small payouts
2. Giving users control of Stripe payout fees

## **Stripe Payout Fees**

1. \$2 per month of active payout(s)
2. 0.25% + \$0.25 per payout
3. Cross border fees (currency conversion): 0.25% (EU) - 1% in other countries.

Given the fixed costs, we want to default to manual payouts so you can control when you want to incur them and do it once vs. per each individual transaction in order to reduce the overall fees.

## Reverse invoices

Since we're the Merchant of Record, your customers get an invoice from Polar. Thus, for your accounting, you need to issue an invoice to Polar for the amount we paid out to you. To ease this process, we can automatically generate a **reverse invoice** for you, detailing the sells we made on your behalf, minus our fees.

You can generate them from the **Payouts** page under **Finance** in your Polar dashboard. Click on the ellipsis next to the payout you want to generate a reverse invoice for, and select **Download invoice**.

<img className="block dark:hidden" src="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/finance/payouts/download.light.png?fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=40ec44b479a7df5eda411f5a78efb007" data-og-width="3120" width="3120" data-og-height="2352" height="2352" data-path="assets/features/finance/payouts/download.light.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/finance/payouts/download.light.png?w=280&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=cb7bb80dd439c561b090ebd235944f94 280w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/finance/payouts/download.light.png?w=560&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=cc6713f08cc15b4500cc3d35a2b3466b 560w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/finance/payouts/download.light.png?w=840&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=9aebb3d34f319d33e6e6322fa06031b9 840w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/finance/payouts/download.light.png?w=1100&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=81da6c8f5e4c7898575c24ef5664c87a 1100w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/finance/payouts/download.light.png?w=1650&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=ab50f3f8394580bf5aac81adc2296e88 1650w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/finance/payouts/download.light.png?w=2500&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=3b8a9f013ca990ef5c41f450916941fa 2500w" />

<img className="hidden dark:block" src="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/finance/payouts/download.dark.png?fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=05f61e1a55d50ab99578c60b38b2dba8" data-og-width="3120" width="3120" data-og-height="2352" height="2352" data-path="assets/features/finance/payouts/download.dark.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/finance/payouts/download.dark.png?w=280&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=2967273df8ce5f2d36e25deb8392bde5 280w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/finance/payouts/download.dark.png?w=560&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=3b8929a716ae3c360ec85220c24a126a 560w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/finance/payouts/download.dark.png?w=840&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=3eb07e86cd3e5e4a40851c44d248c613 840w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/finance/payouts/download.dark.png?w=1100&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=b6729b01b076fc738c600455761e428d 1100w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/finance/payouts/download.dark.png?w=1650&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=0a75de9a244d44f2d073f3228a035cc0 1650w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/finance/payouts/download.dark.png?w=2500&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=669c04eeca43efdb65bfa7851a485a94 2500w" />

A modal will open, allowing you to:

* Set your billing name and address.
* Add information shown below your billing address.
* Add notes shown at the bottom of the invoice.
* Customize the invoice number. By default, we generate one like `POLAR-0001`, but you can change it to your own format and sequence.

<img className="block dark:hidden" src="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/finance/payouts/generate.light.png?fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=14a707adf05125dd6ffa2adf110e8a85" data-og-width="1620" width="1620" data-og-height="2304" height="2304" data-path="assets/features/finance/payouts/generate.light.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/finance/payouts/generate.light.png?w=280&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=c73992012e6e856c17844654571dee7b 280w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/finance/payouts/generate.light.png?w=560&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=8752891d4a18f61c8d925b7a534125e9 560w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/finance/payouts/generate.light.png?w=840&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=2175eb00739053f72fcf606ddfebf073 840w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/finance/payouts/generate.light.png?w=1100&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=e8eb0e887e5b0afc11a4530f3094f74b 1100w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/finance/payouts/generate.light.png?w=1650&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=4f3ef364476cbc2b967b8f3fea3c8c78 1650w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/finance/payouts/generate.light.png?w=2500&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=b8c50729f9c429d12802feee26f43f0a 2500w" />

<img className="hidden dark:block" src="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/finance/payouts/generate.dark.png?fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=3a0cbb2660c294ef3042e4fdfe4eed7f" data-og-width="1620" width="1620" data-og-height="2304" height="2304" data-path="assets/features/finance/payouts/generate.dark.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/finance/payouts/generate.dark.png?w=280&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=fab78703b125a33119834aa4fbace888 280w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/finance/payouts/generate.dark.png?w=560&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=fcf1095d697c75c475b0184e0dd888d7 560w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/finance/payouts/generate.dark.png?w=840&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=d365af461cc432040b18de62e1d38cd1 840w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/finance/payouts/generate.dark.png?w=1100&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=4b0c2c94c8dbeab77159872c97b5a0f4 1100w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/finance/payouts/generate.dark.png?w=1650&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=9ca26a531f657dad53338aa4d7ffaabb 1650w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/finance/payouts/generate.dark.png?w=2500&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=3021598d1155465ab187dda0e8558345 2500w" />

<Warning>
  Once the reverse invoice is generated, it cannot be changed. Make sure to
  double-check the information before generating it.
</Warning>

### Sample Reverse Invoice

<iframe src="https://polar-public-assets.s3.us-east-2.amazonaws.com/sample-reverse-invoice.pdf" width="100%" height="600px" />

## Frequently Asked Questions

<AccordionGroup>
  <Accordion title="How long do payouts take?">
    Payouts typically take 4-7 business days.
  </Accordion>

  <Accordion title="When are payouts processed after I request them?">
    Payouts are processed in batches 24 hours after initiation.
  </Accordion>

  <Accordion title="Can I use my personal bank account to receive payouts?">
    For individual accounts, yes. For business accounts, you will need a business bank account.
  </Accordion>
</AccordionGroup>
