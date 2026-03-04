> ## Documentation Index
> Fetch the complete documentation index at: https://polar.sh/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Account Balance & Transparent Fees

> Monitor your Polar balance without hidden fees

You can see your available balance for payout at any time under your `Finance` page.

<img className="block dark:hidden" src="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/finance/balance/overview.light.jpeg?fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=603040c0ac9331aa9f71061ce20401fe" data-og-width="2700" width="2700" data-og-height="1655" height="1655" data-path="assets/features/finance/balance/overview.light.jpeg" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/finance/balance/overview.light.jpeg?w=280&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=6529976df66cd742e20c10ebb55e0ae4 280w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/finance/balance/overview.light.jpeg?w=560&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=69d38a80ec87b8570ac2de258c2aca5a 560w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/finance/balance/overview.light.jpeg?w=840&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=eee05402a367e6b6ff852a6bd1affc73 840w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/finance/balance/overview.light.jpeg?w=1100&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=478a2087cc991fe8e1ee79c7df3b4c15 1100w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/finance/balance/overview.light.jpeg?w=1650&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=86fa56a53c17368478745b16eca9bcc6 1650w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/finance/balance/overview.light.jpeg?w=2500&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=1c0f49ccecfa3816949bf667aef241d7 2500w" />

<img className="hidden dark:block" src="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/finance/balance/overview.dark.jpeg?fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=b4ac9458eabafcf793d75e6f3ed1fba5" data-og-width="2700" width="2700" data-og-height="1655" height="1655" data-path="assets/features/finance/balance/overview.dark.jpeg" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/finance/balance/overview.dark.jpeg?w=280&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=6856965e705e0a7780a314efd51323e9 280w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/finance/balance/overview.dark.jpeg?w=560&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=f961a0dc4422622252b8bcb1e14807d5 560w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/finance/balance/overview.dark.jpeg?w=840&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=ba183428c854b03b7298925de3a8ea71 840w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/finance/balance/overview.dark.jpeg?w=1100&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=632b277632ce76ca121f02f03bf887e4 1100w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/finance/balance/overview.dark.jpeg?w=1650&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=6829eb56c20281d715f0f157a5fcc640 1650w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/finance/balance/overview.dark.jpeg?w=2500&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=9b705aa285731285b606a34dc6aa3c51 2500w" />

Your balance is all the earnings minus:

1. Any VAT we've captured for remittance, i.e balance is excluding VAT
2. Our revenue share (4% + 40¢)

All historic transactions are available in chronological order along with their associated fees that have been deducted.

Note: Upon [payout (withdrawal)](/features/finance/payouts), Stripe incurs additional fees that will be deducted before the final payout of the balance.

## Multiple payment currencies orders and settlement

When customers purchase your products in currencies other than USD, Polar automatically converts these amounts to USD (the settlement currency) for your account balance. This conversion ensures that all transactions are consolidated into a single currency for easier financial management and payout processing.

The conversion process uses current exchange rates at the time of the transaction, and the converted USD amount is what appears in your account balance and is available for payout.

## Payouts in ISK, HUF, TWD, or UGX

For accounts using Icelandic króna (ISK), Hungarian forint (HUF), New Taiwan dollar (TWD), or Ugandan shilling (UGX), Stripe requires payout amounts to be in whole currency units. This means any fractional amount (less than 1 ISK/HUF/TWD/UGX) will remain in your balance and be included in your next payout.
