> ## Documentation Index
> Fetch the complete documentation index at: https://polar.sh/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Checkout API

> Create checkout sessions programmatically for complete control

If you want to integrate more deeply the checkout process with your website or application, you can use our dedicated API.

The first step is to [create a Checkout session](/api-reference/checkouts/create-session). For this you'll need at least your **Product ID**.

You can retrieve your Product ID from Products in your dashboard, click on "context-menu" button in front of your product and click on Copy Product ID.

The API will return you an object containing all the information about the session, including **an URL where you should redirect your customer** so they can complete their order.

## Multiple products

You can create a checkout session with multiple products. This is useful if you want to allow your customers to choose between different products before they checkout.

<img className="block dark:hidden" src="https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/checkout/session/checkout_multiple_products.light.png?fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=36f88ae4e5e70735484c068f3605b713" data-og-width="3840" width="3840" data-og-height="2500" height="2500" data-path="assets/features/checkout/session/checkout_multiple_products.light.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/checkout/session/checkout_multiple_products.light.png?w=280&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=04994e58aef6964bcbad83136d7a623b 280w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/checkout/session/checkout_multiple_products.light.png?w=560&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=97436039cd7d08c4ca762d81dada1a73 560w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/checkout/session/checkout_multiple_products.light.png?w=840&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=3bf82c3989003e71f22a230a25db119f 840w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/checkout/session/checkout_multiple_products.light.png?w=1100&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=10505f70deec13a9097af4daa1d04b86 1100w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/checkout/session/checkout_multiple_products.light.png?w=1650&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=47784df3a7278ec4df21c13c3ff81b5c 1650w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/checkout/session/checkout_multiple_products.light.png?w=2500&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=f91a412a12601270ac3bfadd82832e7e 2500w" />

<img className="hidden dark:block" src="https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/checkout/session/checkout_multiple_products.dark.png?fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=82f61a0c8e8108b64d214c223d9a0f67" data-og-width="3840" width="3840" data-og-height="2500" height="2500" data-path="assets/features/checkout/session/checkout_multiple_products.dark.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/checkout/session/checkout_multiple_products.dark.png?w=280&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=06d12edfe721f4ed1686a09110f935be 280w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/checkout/session/checkout_multiple_products.dark.png?w=560&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=7bfedd743a9e5a2e2924f072218a6d73 560w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/checkout/session/checkout_multiple_products.dark.png?w=840&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=d931de8df011738cedb1988f3c7adaee 840w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/checkout/session/checkout_multiple_products.dark.png?w=1100&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=bd13134692851f71dd9228f52558b8a6 1100w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/checkout/session/checkout_multiple_products.dark.png?w=1650&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=5396835651699c364b553bcc5ea9f34d 1650w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/checkout/session/checkout_multiple_products.dark.png?w=2500&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=8b2984d955958ad755028e2760028fcd 2500w" />

## Ad-hoc prices

For advanced use cases where you need complete control over pricing, you can create ad-hoc prices directly when creating a checkout session. Ad-hoc prices are temporary prices that exist only for that specific checkout session and don't appear in your product's catalog.

This is useful when you need to:

* Apply dynamic pricing based on user-specific factors
* Create custom pricing tiers for specific customers
* Implement usage-based or calculated pricing that varies per checkout
* Test pricing variations without modifying your product catalog

When creating a checkout session, you can pass a `prices` parameter that maps product IDs to an array of price definitions. These prices will be created on-the-fly and associated with the checkout session.

<Note>
  Ad-hoc prices are marked with `source: "ad_hoc"` in the API response, while catalog prices have `source: "catalog"`. Ad-hoc prices are temporary and specific to the checkout session.
</Note>

### Example

<CodeGroup>
  ```ts TypeScript theme={null}
  import { Polar } from "@polar-sh/sdk";

  const polar = new Polar({
    accessToken: process.env["POLAR_ACCESS_TOKEN"] ?? "",
  });

  async function run() {
    const checkout = await polar.checkouts.create({
      products: ["productId"],
      prices: {
        "productId": [
          {
            amountType: "fixed",
            priceAmount: 10000, // $100.00
            priceCurrency: "usd",
          }
        ]
      }
    });

    console.log(checkout.url);
  }

  run();
  ```

  ```py Python theme={null}
  from polar_sdk import Polar

  with Polar(
      access_token="<YOUR_BEARER_TOKEN_HERE>",
  ) as polar:
      checkout = polar.checkouts.create(request={
          "products": ["<product_id>"],
          "prices": {
              "<product_id>": [
                  {
                      "amount_type": "fixed",
                      "price_amount": 10000,  # $100.00
                      "price_currency": "usd",
                  }
              ]
          }
      })

      print(checkout.url)
  ```
</CodeGroup>

### Price types

Ad-hoc prices support all the same price types as catalog prices:

* **Fixed**: A fixed amount price
* **Custom**: Pay-what-you-want pricing
* **Free**: No charge
* **Seat-based**: Pricing based on number of seats
* **Metered**: Usage-based pricing tied to a meter

For the complete schema of each price type, refer to the [Checkout API reference](/api-reference/checkouts/create-session).

## External Customer ID

Quite often, you'll have your own users management system in your application, where your customer already have an ID. To ease reconciliation between Polar and your system, you can inform us about your customer ID when creating a checkout session through the [`external_customer_id`](/api-reference/checkouts/create-session/) field.

After a successful checkout, we'll create a Customer on Polar with the external ID you provided. It'll be provided through the `customer.external_id` property in webhooks you may have configured.

## SDK examples

Using our SDK, creating a checkout session is quite straightforward.

<CodeGroup>
  ```ts TypeScript theme={null}
  import { Polar } from "@polar-sh/sdk";

  const polar = new Polar({
    accessToken: process.env["POLAR_ACCESS_TOKEN"] ?? "",
  });

  async function run() {
    const checkout = await polar.checkouts.create({
      products: ["productId"]
    });

    console.log(checkout.url)
  }

  run();
  ```

  ```py Python theme={null}
  from polar_sdk import Polar

  with Polar(
      access_token="<YOUR_BEARER_TOKEN_HERE>",
  ) as polar:

      checkout = polar.checkouts.create(request={
          "allow_discount_codes": True,
          "product_id": "<value>",
      })

      print(checkout.url)
  ```
</CodeGroup>
