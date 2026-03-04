> ## Documentation Index
> Fetch the complete documentation index at: https://polar.sh/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Proration for Subscription Upgrades and Downgrades

> Learn how proration works in Polar, including available proration types, billing behavior during upgrades and downgrades, and how to configure proration using APIs and dashboard settings.

## What is Proration?

Proration is the adjustment of charges based on the unused portion of the current billing period when a subscription is upgraded or downgraded.

## Types of Proration

For both `prorate` and `invoice` proration types, the **subscription plan always changes immediately**, whether the change is an upgrade or a downgrade. The only difference between the two proration types is **when the price difference is charged or credited**.

### Invoice Immediately (`invoice`)

The prorated price difference is charged or credited immediately when the subscription is upgraded or downgraded.

### Next Invoice (`prorate`)

The prorated price difference is charged or credited on the next invoice on updgrading or downgrading a subscription.

## How to change the default proration setting using dashboard

<Steps>
  <Step title="Go to Organization Settings">
    In the Polar dashboard sidebar, click on **Settings**.
    You can also go directly to:\
    `https://polar.sh/dashboard/${org_slug}/settings`\
    Scroll down to **Subscriptions** section.

    <img height="200" src="https://mintcdn.com/polar/nGFfaNNJwGbM5-8q/assets/guides/proration/settings.png?fit=max&auto=format&n=nGFfaNNJwGbM5-8q&q=85&s=613d45a0922e1c3bbf6e7c56982b725c" data-og-width="1697" data-og-height="883" data-path="assets/guides/proration/settings.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/polar/nGFfaNNJwGbM5-8q/assets/guides/proration/settings.png?w=280&fit=max&auto=format&n=nGFfaNNJwGbM5-8q&q=85&s=811d6bd2b6ae4ea2cdae29d693173d2b 280w, https://mintcdn.com/polar/nGFfaNNJwGbM5-8q/assets/guides/proration/settings.png?w=560&fit=max&auto=format&n=nGFfaNNJwGbM5-8q&q=85&s=d1605d0d007b4aae12a675408ac6811e 560w, https://mintcdn.com/polar/nGFfaNNJwGbM5-8q/assets/guides/proration/settings.png?w=840&fit=max&auto=format&n=nGFfaNNJwGbM5-8q&q=85&s=cae44de1e742d63781f6d673c2c4b9f5 840w, https://mintcdn.com/polar/nGFfaNNJwGbM5-8q/assets/guides/proration/settings.png?w=1100&fit=max&auto=format&n=nGFfaNNJwGbM5-8q&q=85&s=e12570c8c1ccd593e9820411fd765a4c 1100w, https://mintcdn.com/polar/nGFfaNNJwGbM5-8q/assets/guides/proration/settings.png?w=1650&fit=max&auto=format&n=nGFfaNNJwGbM5-8q&q=85&s=348c685d7de5865972e9e653f540d678 1650w, https://mintcdn.com/polar/nGFfaNNJwGbM5-8q/assets/guides/proration/settings.png?w=2500&fit=max&auto=format&n=nGFfaNNJwGbM5-8q&q=85&s=502a8d43b46069dc48f6dbcc506f3565 2500w" />
  </Step>

  <Step title="Choose the Proration type">
    Choose the default proration behavior: **Invoice Immediately** or **Next invoice**.

    <img height="200" src="https://mintcdn.com/polar/nGFfaNNJwGbM5-8q/assets/guides/proration/proration.png?fit=max&auto=format&n=nGFfaNNJwGbM5-8q&q=85&s=0f8f2f035665b3ce0f0c7fbe5456e877" data-og-width="1697" data-og-height="883" data-path="assets/guides/proration/proration.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/polar/nGFfaNNJwGbM5-8q/assets/guides/proration/proration.png?w=280&fit=max&auto=format&n=nGFfaNNJwGbM5-8q&q=85&s=fed59fa3a01022b5d35445516f901dea 280w, https://mintcdn.com/polar/nGFfaNNJwGbM5-8q/assets/guides/proration/proration.png?w=560&fit=max&auto=format&n=nGFfaNNJwGbM5-8q&q=85&s=b396f369b8b5387943a5d387bbb5d839 560w, https://mintcdn.com/polar/nGFfaNNJwGbM5-8q/assets/guides/proration/proration.png?w=840&fit=max&auto=format&n=nGFfaNNJwGbM5-8q&q=85&s=940f27900dbb8b9d7e239dacc495b88f 840w, https://mintcdn.com/polar/nGFfaNNJwGbM5-8q/assets/guides/proration/proration.png?w=1100&fit=max&auto=format&n=nGFfaNNJwGbM5-8q&q=85&s=999a764be71db55369909424a8ace7ed 1100w, https://mintcdn.com/polar/nGFfaNNJwGbM5-8q/assets/guides/proration/proration.png?w=1650&fit=max&auto=format&n=nGFfaNNJwGbM5-8q&q=85&s=88f2690fe1b324a5e935ee0fe4cabd56 1650w, https://mintcdn.com/polar/nGFfaNNJwGbM5-8q/assets/guides/proration/proration.png?w=2500&fit=max&auto=format&n=nGFfaNNJwGbM5-8q&q=85&s=e9fdd78e0453737ed8e1afe74b09b242 2500w" />

    The default proration setting is changed successfully.
  </Step>
</Steps>

## How to change the default proration setting using the OAT API

You can change the default proration behavior using the [Update Organization API](https://polar.sh/docs/api-reference/organizations/update).

## How to prorate when updating subscription via API

<Steps>
  <Step title="Create an organization Token">
    Create a new organization token by following our [Organization Access Tokens](https://polar.sh/docs/integrate/oat) guide.
  </Step>

  <Step title="Save your Access Token">
    After creating your access token, you will be able to view it. Please copy and save your access token.

    <img height="200" src="https://mintcdn.com/polar/nGFfaNNJwGbM5-8q/assets/guides/proration/access-token.png?fit=max&auto=format&n=nGFfaNNJwGbM5-8q&q=85&s=c7e227e1a1ca13798216e83f153ee8b6" data-og-width="1812" data-og-height="888" data-path="assets/guides/proration/access-token.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/polar/nGFfaNNJwGbM5-8q/assets/guides/proration/access-token.png?w=280&fit=max&auto=format&n=nGFfaNNJwGbM5-8q&q=85&s=235341fd6ad09f6e46762312358aa3ff 280w, https://mintcdn.com/polar/nGFfaNNJwGbM5-8q/assets/guides/proration/access-token.png?w=560&fit=max&auto=format&n=nGFfaNNJwGbM5-8q&q=85&s=2aa4f042ac2f8d82b47cf53b6888f0ef 560w, https://mintcdn.com/polar/nGFfaNNJwGbM5-8q/assets/guides/proration/access-token.png?w=840&fit=max&auto=format&n=nGFfaNNJwGbM5-8q&q=85&s=65c65ddcae02c772015de98b66cb516e 840w, https://mintcdn.com/polar/nGFfaNNJwGbM5-8q/assets/guides/proration/access-token.png?w=1100&fit=max&auto=format&n=nGFfaNNJwGbM5-8q&q=85&s=119b212faeaf2504c9ce565b907ff717 1100w, https://mintcdn.com/polar/nGFfaNNJwGbM5-8q/assets/guides/proration/access-token.png?w=1650&fit=max&auto=format&n=nGFfaNNJwGbM5-8q&q=85&s=4a67a9dacf3b523ea4bd9442ba7601ef 1650w, https://mintcdn.com/polar/nGFfaNNJwGbM5-8q/assets/guides/proration/access-token.png?w=2500&fit=max&auto=format&n=nGFfaNNJwGbM5-8q&q=85&s=e1fdfecfc0e61e17b0ab510a3b6b9f4e 2500w" />
  </Step>

  <Step title="Copy the Subscription ID">
    * In the Polar dashboard sidebar, navigate to **Sales** > **Subscriptions** for your organization.
      You can also go directly to:\
      `https://polar.sh/dashboard/${org_slug}/sales/subscriptions`

    <img height="200" src="https://mintcdn.com/polar/nGFfaNNJwGbM5-8q/assets/guides/proration/subscription-list.png?fit=max&auto=format&n=nGFfaNNJwGbM5-8q&q=85&s=e59b15d7eb43cd22ff94b1ae12d7b7cc" data-og-width="1697" data-og-height="883" data-path="assets/guides/proration/subscription-list.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/polar/nGFfaNNJwGbM5-8q/assets/guides/proration/subscription-list.png?w=280&fit=max&auto=format&n=nGFfaNNJwGbM5-8q&q=85&s=474f12c197be8d97ee9b0bd0853eec85 280w, https://mintcdn.com/polar/nGFfaNNJwGbM5-8q/assets/guides/proration/subscription-list.png?w=560&fit=max&auto=format&n=nGFfaNNJwGbM5-8q&q=85&s=8092f601c1c57cb8100985cf4d9a1ef2 560w, https://mintcdn.com/polar/nGFfaNNJwGbM5-8q/assets/guides/proration/subscription-list.png?w=840&fit=max&auto=format&n=nGFfaNNJwGbM5-8q&q=85&s=d82d69aee91e19b2d734cb56fb88672b 840w, https://mintcdn.com/polar/nGFfaNNJwGbM5-8q/assets/guides/proration/subscription-list.png?w=1100&fit=max&auto=format&n=nGFfaNNJwGbM5-8q&q=85&s=c48405c45a09518a6081e6771ddcf315 1100w, https://mintcdn.com/polar/nGFfaNNJwGbM5-8q/assets/guides/proration/subscription-list.png?w=1650&fit=max&auto=format&n=nGFfaNNJwGbM5-8q&q=85&s=52998aeb301d86c695b99bc715ca5d02 1650w, https://mintcdn.com/polar/nGFfaNNJwGbM5-8q/assets/guides/proration/subscription-list.png?w=2500&fit=max&auto=format&n=nGFfaNNJwGbM5-8q&q=85&s=6468996378d976bd90c5e631aa393677 2500w" />

    * Click on the Subscription you want to upgrade/downgrade and copy its **Subscription ID**.

    <img height="200" src="https://mintcdn.com/polar/nGFfaNNJwGbM5-8q/assets/guides/proration/subscription-details.png?fit=max&auto=format&n=nGFfaNNJwGbM5-8q&q=85&s=042691a460ee11eaf8b009d1590e4c5d" data-og-width="1697" data-og-height="883" data-path="assets/guides/proration/subscription-details.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/polar/nGFfaNNJwGbM5-8q/assets/guides/proration/subscription-details.png?w=280&fit=max&auto=format&n=nGFfaNNJwGbM5-8q&q=85&s=cad78e25f4ec8e26173bb9e638126124 280w, https://mintcdn.com/polar/nGFfaNNJwGbM5-8q/assets/guides/proration/subscription-details.png?w=560&fit=max&auto=format&n=nGFfaNNJwGbM5-8q&q=85&s=f276ed520afabdc1741d98e9b40931e3 560w, https://mintcdn.com/polar/nGFfaNNJwGbM5-8q/assets/guides/proration/subscription-details.png?w=840&fit=max&auto=format&n=nGFfaNNJwGbM5-8q&q=85&s=3d376afa67b185598dbf41d0d916e706 840w, https://mintcdn.com/polar/nGFfaNNJwGbM5-8q/assets/guides/proration/subscription-details.png?w=1100&fit=max&auto=format&n=nGFfaNNJwGbM5-8q&q=85&s=d6dbcf0bd0c9e8b612010f826a06e4d3 1100w, https://mintcdn.com/polar/nGFfaNNJwGbM5-8q/assets/guides/proration/subscription-details.png?w=1650&fit=max&auto=format&n=nGFfaNNJwGbM5-8q&q=85&s=65882c324f820f73d47eef92814f0354 1650w, https://mintcdn.com/polar/nGFfaNNJwGbM5-8q/assets/guides/proration/subscription-details.png?w=2500&fit=max&auto=format&n=nGFfaNNJwGbM5-8q&q=85&s=279779a25cfc2a2851bace3ba7987dff 2500w" />
  </Step>

  <Step title="Copy the Product ID">
    * In the Polar dashboard sidebar, navigate to **Products** > **Catalogue** for your organization.
      You can also go directly to:\
      `https://polar.sh/dashboard/${org_slug}/products`

    <img height="200" src="https://mintcdn.com/polar/nGFfaNNJwGbM5-8q/assets/guides/proration/products-catalogue.png?fit=max&auto=format&n=nGFfaNNJwGbM5-8q&q=85&s=4b51a3a37346596f39789e99dae1e99a" data-og-width="1823" data-og-height="893" data-path="assets/guides/proration/products-catalogue.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/polar/nGFfaNNJwGbM5-8q/assets/guides/proration/products-catalogue.png?w=280&fit=max&auto=format&n=nGFfaNNJwGbM5-8q&q=85&s=09bedbaa32b8d9768903fcfd5ca5a185 280w, https://mintcdn.com/polar/nGFfaNNJwGbM5-8q/assets/guides/proration/products-catalogue.png?w=560&fit=max&auto=format&n=nGFfaNNJwGbM5-8q&q=85&s=82a4080ac46f1952bb7fe14d8e95137c 560w, https://mintcdn.com/polar/nGFfaNNJwGbM5-8q/assets/guides/proration/products-catalogue.png?w=840&fit=max&auto=format&n=nGFfaNNJwGbM5-8q&q=85&s=7ab03c89656dd0a0355327f5b52e340f 840w, https://mintcdn.com/polar/nGFfaNNJwGbM5-8q/assets/guides/proration/products-catalogue.png?w=1100&fit=max&auto=format&n=nGFfaNNJwGbM5-8q&q=85&s=5d7d017d32f8152b1701bfc4d2bbfdf8 1100w, https://mintcdn.com/polar/nGFfaNNJwGbM5-8q/assets/guides/proration/products-catalogue.png?w=1650&fit=max&auto=format&n=nGFfaNNJwGbM5-8q&q=85&s=26609da5b7946957385af82dd34c6690 1650w, https://mintcdn.com/polar/nGFfaNNJwGbM5-8q/assets/guides/proration/products-catalogue.png?w=2500&fit=max&auto=format&n=nGFfaNNJwGbM5-8q&q=85&s=73ad30ddc115314e2213e3880905db19 2500w" />

    * Retrieve the Product ID for the item you wish to upgrade the subscription to by clicking on the **⋮ (More options) menu** next to chosen products and selecting **Copy Product ID**.

    <img height="200" src="https://mintcdn.com/polar/nGFfaNNJwGbM5-8q/assets/guides/proration/product-id.png?fit=max&auto=format&n=nGFfaNNJwGbM5-8q&q=85&s=6367aa3ed130809543e0b60a6f6e747c" data-og-width="1812" data-og-height="888" data-path="assets/guides/proration/product-id.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/polar/nGFfaNNJwGbM5-8q/assets/guides/proration/product-id.png?w=280&fit=max&auto=format&n=nGFfaNNJwGbM5-8q&q=85&s=7747996444644ae8302b4a6007d8b0c0 280w, https://mintcdn.com/polar/nGFfaNNJwGbM5-8q/assets/guides/proration/product-id.png?w=560&fit=max&auto=format&n=nGFfaNNJwGbM5-8q&q=85&s=da7ff02184e3a25b89ffdde3764d9ece 560w, https://mintcdn.com/polar/nGFfaNNJwGbM5-8q/assets/guides/proration/product-id.png?w=840&fit=max&auto=format&n=nGFfaNNJwGbM5-8q&q=85&s=a3a5b418e9fd56c806adebec356dbd4c 840w, https://mintcdn.com/polar/nGFfaNNJwGbM5-8q/assets/guides/proration/product-id.png?w=1100&fit=max&auto=format&n=nGFfaNNJwGbM5-8q&q=85&s=3154f1493bf0cf73d2efd5a5f8d3334b 1100w, https://mintcdn.com/polar/nGFfaNNJwGbM5-8q/assets/guides/proration/product-id.png?w=1650&fit=max&auto=format&n=nGFfaNNJwGbM5-8q&q=85&s=b5dbb5ff678ba8d9c29fd371cb611b27 1650w, https://mintcdn.com/polar/nGFfaNNJwGbM5-8q/assets/guides/proration/product-id.png?w=2500&fit=max&auto=format&n=nGFfaNNJwGbM5-8q&q=85&s=f0bda3025d747dcc3978031eb643df19 2500w" />
  </Step>

  <Step title="Call the Update Subscription API">
    Call the **Update Subscription API** as follows.

    Make sure to replace:

    * **subscription\_id** with the ID of the subscription you want to update

    * **product\_id** with the new product ID

    * **type\_of\_proration** with the desired proration type:
      * `invoice`: to charge/credit the prorated price difference immediately
      * `prorate`: to charge/credit the prorated price difference on next invoice

    <CodeGroup>
      ```bash cURL theme={null}
      curl --request PATCH \
        --url https://api.polar.sh/v1/subscriptions/{<subscription_id>} \
        --header 'Authorization: Bearer <YOUR_BEARER_TOKEN_HERE>' \
        --header 'Content-Type: application/json' \
        --data '{
          "product_id": "<product_id>",
          "proration_behavior": "type_of_proration"
        }'
      ```

      ```py Python theme={null}
      from polar_sdk import Polar

      with Polar(
          access_token="<YOUR_BEARER_TOKEN_HERE>",
      ) as polar:

          res = polar.subscriptions.update(id="<subscription_id>", subscription_update={
              "product_id": "<product_id>",
              "proration_behavior": "<type_of_proration>"
          })

          # Handle response
          print(res)
      ```
    </CodeGroup>
  </Step>
</Steps>

## Some examples for proration amount calculation

You can create a subscription with two plan options, one for \$5 and other for \$20 by following [Create Product Variants](https://polar.sh/docs/guides/create-variants).

### Case 1: Upgrading the subscription

You can upgrade a subscription by following the steps outlined in [Subscription Upgrades](https://polar.sh/docs/guides/subscription-upgrades), which explains the process from both the merchant’s and the customer’s perspectives.

**Example 1: Proration type = `invoice`**

<img height="200" src="https://mintcdn.com/polar/nGFfaNNJwGbM5-8q/assets/guides/proration/upgrade_invoice.png?fit=max&auto=format&n=nGFfaNNJwGbM5-8q&q=85&s=6a7bf25a4b765c5b0e9260e8ecf1a9d0" data-og-width="1728" data-og-height="506" data-path="assets/guides/proration/upgrade_invoice.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/polar/nGFfaNNJwGbM5-8q/assets/guides/proration/upgrade_invoice.png?w=280&fit=max&auto=format&n=nGFfaNNJwGbM5-8q&q=85&s=8187d2c4d3e00639d062a680b2a18c43 280w, https://mintcdn.com/polar/nGFfaNNJwGbM5-8q/assets/guides/proration/upgrade_invoice.png?w=560&fit=max&auto=format&n=nGFfaNNJwGbM5-8q&q=85&s=bd3c8276da3083d06035cc731660f3c4 560w, https://mintcdn.com/polar/nGFfaNNJwGbM5-8q/assets/guides/proration/upgrade_invoice.png?w=840&fit=max&auto=format&n=nGFfaNNJwGbM5-8q&q=85&s=06d23abd038e12df8054e25ce964c9de 840w, https://mintcdn.com/polar/nGFfaNNJwGbM5-8q/assets/guides/proration/upgrade_invoice.png?w=1100&fit=max&auto=format&n=nGFfaNNJwGbM5-8q&q=85&s=cc6b18242c2fe6c6825ae41aeefa95fe 1100w, https://mintcdn.com/polar/nGFfaNNJwGbM5-8q/assets/guides/proration/upgrade_invoice.png?w=1650&fit=max&auto=format&n=nGFfaNNJwGbM5-8q&q=85&s=200d61668d7878ae4d0c1ba23df99c84 1650w, https://mintcdn.com/polar/nGFfaNNJwGbM5-8q/assets/guides/proration/upgrade_invoice.png?w=2500&fit=max&auto=format&n=nGFfaNNJwGbM5-8q&q=85&s=3a8dd6d552f36e6734c22d9dcba60139 2500w" />

Assuming that the month when the subscription was purchased has 30 days. In case of 31 days, instead of 30th + 1 day, it would be 31st + 1 day = 32nd day.

**Example 2: Proration type = `prorate`**

<img height="200" src="https://mintcdn.com/polar/nGFfaNNJwGbM5-8q/assets/guides/proration/upgrade_prorate.png?fit=max&auto=format&n=nGFfaNNJwGbM5-8q&q=85&s=102359758308d89fc409f0e6cfd9126f" data-og-width="1728" data-og-height="506" data-path="assets/guides/proration/upgrade_prorate.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/polar/nGFfaNNJwGbM5-8q/assets/guides/proration/upgrade_prorate.png?w=280&fit=max&auto=format&n=nGFfaNNJwGbM5-8q&q=85&s=186407a493adc896b10a71c4c35d4b08 280w, https://mintcdn.com/polar/nGFfaNNJwGbM5-8q/assets/guides/proration/upgrade_prorate.png?w=560&fit=max&auto=format&n=nGFfaNNJwGbM5-8q&q=85&s=634765f2f2dddfcd7069c6b533069158 560w, https://mintcdn.com/polar/nGFfaNNJwGbM5-8q/assets/guides/proration/upgrade_prorate.png?w=840&fit=max&auto=format&n=nGFfaNNJwGbM5-8q&q=85&s=1f92a8c7ddebdbb0105a1c1ca27205c7 840w, https://mintcdn.com/polar/nGFfaNNJwGbM5-8q/assets/guides/proration/upgrade_prorate.png?w=1100&fit=max&auto=format&n=nGFfaNNJwGbM5-8q&q=85&s=de1e2995be32effc46efb0e0339bfeef 1100w, https://mintcdn.com/polar/nGFfaNNJwGbM5-8q/assets/guides/proration/upgrade_prorate.png?w=1650&fit=max&auto=format&n=nGFfaNNJwGbM5-8q&q=85&s=74a65d2dfa4029bf7078f73ab1e3c054 1650w, https://mintcdn.com/polar/nGFfaNNJwGbM5-8q/assets/guides/proration/upgrade_prorate.png?w=2500&fit=max&auto=format&n=nGFfaNNJwGbM5-8q&q=85&s=5266ab3a03de012410593e0401c8a2c6 2500w" />

Assuming that the month when the subscription was purchased has 30 days. In case of 31 days, instead of 30th + 1 day, it would be 31st + 1 day = 32nd day.

<Note>
  If the billing interval changes, i.e. daily to monthly or monthly to yearly or vice versa, the proration is always applied as invoice (even if set to prorate).
</Note>

### Case 2: Downgrading the subscription

You can downgrade a subscription by following the steps outlined in [Subscription Downgrades](https://polar.sh/docs/guides/subscription-downgrades), which explains the process from both the merchant’s and the customer’s perspectives.

**Example 1: Proration type = `invoice`**

<img height="200" src="https://mintcdn.com/polar/nGFfaNNJwGbM5-8q/assets/guides/proration/downgrade_invoice.png?fit=max&auto=format&n=nGFfaNNJwGbM5-8q&q=85&s=d001c785979aeee2a1239b6d8c06a532" data-og-width="1728" data-og-height="506" data-path="assets/guides/proration/downgrade_invoice.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/polar/nGFfaNNJwGbM5-8q/assets/guides/proration/downgrade_invoice.png?w=280&fit=max&auto=format&n=nGFfaNNJwGbM5-8q&q=85&s=9e069b766cb7d383ae9ff4658c7a63a6 280w, https://mintcdn.com/polar/nGFfaNNJwGbM5-8q/assets/guides/proration/downgrade_invoice.png?w=560&fit=max&auto=format&n=nGFfaNNJwGbM5-8q&q=85&s=0f0c92dad8f4bdbff2878245f422d374 560w, https://mintcdn.com/polar/nGFfaNNJwGbM5-8q/assets/guides/proration/downgrade_invoice.png?w=840&fit=max&auto=format&n=nGFfaNNJwGbM5-8q&q=85&s=97454ef647957129fbeec58bf211c0f3 840w, https://mintcdn.com/polar/nGFfaNNJwGbM5-8q/assets/guides/proration/downgrade_invoice.png?w=1100&fit=max&auto=format&n=nGFfaNNJwGbM5-8q&q=85&s=dc4c9f27ef177a8f05a783a545bd7d81 1100w, https://mintcdn.com/polar/nGFfaNNJwGbM5-8q/assets/guides/proration/downgrade_invoice.png?w=1650&fit=max&auto=format&n=nGFfaNNJwGbM5-8q&q=85&s=96973b8bbbb90f198f8812c5d5503fd3 1650w, https://mintcdn.com/polar/nGFfaNNJwGbM5-8q/assets/guides/proration/downgrade_invoice.png?w=2500&fit=max&auto=format&n=nGFfaNNJwGbM5-8q&q=85&s=cc09a1de1f6823133417f59df822444c 2500w" />

Assuming that the month when the subscription was purchased has 30 days. In case of 31 days, instead of 30th + 1 day, it would be 31st + 1 day = 32nd day.

**Example 2: Proration type = `prorate`**

<img height="200" src="https://mintcdn.com/polar/nGFfaNNJwGbM5-8q/assets/guides/proration/downgrade_prorate.png?fit=max&auto=format&n=nGFfaNNJwGbM5-8q&q=85&s=d27724c0874ab9865ccff9d19d66d9f9" data-og-width="1728" data-og-height="506" data-path="assets/guides/proration/downgrade_prorate.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/polar/nGFfaNNJwGbM5-8q/assets/guides/proration/downgrade_prorate.png?w=280&fit=max&auto=format&n=nGFfaNNJwGbM5-8q&q=85&s=028e4bb16aa9e3a6a6e5f6fb4a49c6f1 280w, https://mintcdn.com/polar/nGFfaNNJwGbM5-8q/assets/guides/proration/downgrade_prorate.png?w=560&fit=max&auto=format&n=nGFfaNNJwGbM5-8q&q=85&s=ab2c48c605d187348ca2784fe4004d2f 560w, https://mintcdn.com/polar/nGFfaNNJwGbM5-8q/assets/guides/proration/downgrade_prorate.png?w=840&fit=max&auto=format&n=nGFfaNNJwGbM5-8q&q=85&s=a79ce856a02599532601891110e529d9 840w, https://mintcdn.com/polar/nGFfaNNJwGbM5-8q/assets/guides/proration/downgrade_prorate.png?w=1100&fit=max&auto=format&n=nGFfaNNJwGbM5-8q&q=85&s=04154dbf2612274dc1d439de3a5315b9 1100w, https://mintcdn.com/polar/nGFfaNNJwGbM5-8q/assets/guides/proration/downgrade_prorate.png?w=1650&fit=max&auto=format&n=nGFfaNNJwGbM5-8q&q=85&s=bf9c8d19d740bbc216ebafb439c8daa2 1650w, https://mintcdn.com/polar/nGFfaNNJwGbM5-8q/assets/guides/proration/downgrade_prorate.png?w=2500&fit=max&auto=format&n=nGFfaNNJwGbM5-8q&q=85&s=86f9d786b0ddfdaafaf2ee2d4d6295bf 2500w" />

Assuming that the month when the subscription was purchased has 30 days. In case of 31 days, instead of 30th + 1 day, it would be 31st + 1 day = 32nd day.

<Note>
  If the billing interval changes, i.e. daily to monthly or monthly to yearly or vice versa, the proration is always applied as invoice (even if set to prorate).
</Note>
