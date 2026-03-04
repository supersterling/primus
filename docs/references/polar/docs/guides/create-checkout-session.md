> ## Documentation Index
> Fetch the complete documentation index at: https://polar.sh/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# How to Create Checkout Session

> Learn how to create checkout sessions via API.

## Creating a checkout session using the API

<Steps>
  <Step title="Create a New Token">
    Create a new organization token by following our [Organization Access Tokens](https://polar.sh/docs/integrate/oat) guide.
  </Step>

  <Step title="Save your Access Token">
    After creating your access token, you will be able to view it. Please copy and save your access token.

    <img height="200" src="https://mintcdn.com/polar/C5Fvr5TyCIop5r-p/assets/guides/theme-switch-in-checkout/access-token.png?fit=max&auto=format&n=C5Fvr5TyCIop5r-p&q=85&s=05fafce5da35f0a91784fc4b20c3cdf3" data-og-width="1812" data-og-height="888" data-path="assets/guides/theme-switch-in-checkout/access-token.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/polar/C5Fvr5TyCIop5r-p/assets/guides/theme-switch-in-checkout/access-token.png?w=280&fit=max&auto=format&n=C5Fvr5TyCIop5r-p&q=85&s=fe6ff8fe2ee5c7f32d6f8a73b5bcb9f7 280w, https://mintcdn.com/polar/C5Fvr5TyCIop5r-p/assets/guides/theme-switch-in-checkout/access-token.png?w=560&fit=max&auto=format&n=C5Fvr5TyCIop5r-p&q=85&s=6d2cffbcbc5c3c948ca4ca29558b2e9f 560w, https://mintcdn.com/polar/C5Fvr5TyCIop5r-p/assets/guides/theme-switch-in-checkout/access-token.png?w=840&fit=max&auto=format&n=C5Fvr5TyCIop5r-p&q=85&s=980b12abb6421aa527792824921c9420 840w, https://mintcdn.com/polar/C5Fvr5TyCIop5r-p/assets/guides/theme-switch-in-checkout/access-token.png?w=1100&fit=max&auto=format&n=C5Fvr5TyCIop5r-p&q=85&s=f1b0b2522e1ac7655261e33d66d4741a 1100w, https://mintcdn.com/polar/C5Fvr5TyCIop5r-p/assets/guides/theme-switch-in-checkout/access-token.png?w=1650&fit=max&auto=format&n=C5Fvr5TyCIop5r-p&q=85&s=1d825d4b7afdd88a97df5eb84f26995c 1650w, https://mintcdn.com/polar/C5Fvr5TyCIop5r-p/assets/guides/theme-switch-in-checkout/access-token.png?w=2500&fit=max&auto=format&n=C5Fvr5TyCIop5r-p&q=85&s=07a92382e3a9d56eef45822e263874a4 2500w" />
  </Step>

  <Step title="Go to the Products Catalogue">
    In the Polar dashboard sidebar, navigate to **Products** > **Catalogue** for your organization.
    You can also go directly to:\
    `https://polar.sh/dashboard/${org_slug}/products`

    <img height="200" src="https://mintcdn.com/polar/C5Fvr5TyCIop5r-p/assets/guides/theme-switch-in-checkout/products-catalogue.png?fit=max&auto=format&n=C5Fvr5TyCIop5r-p&q=85&s=628d916b10c27aaecdb0565bf5230851" data-og-width="1823" data-og-height="893" data-path="assets/guides/theme-switch-in-checkout/products-catalogue.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/polar/C5Fvr5TyCIop5r-p/assets/guides/theme-switch-in-checkout/products-catalogue.png?w=280&fit=max&auto=format&n=C5Fvr5TyCIop5r-p&q=85&s=54d9d9ab47ae41bfa607f6ecb6993882 280w, https://mintcdn.com/polar/C5Fvr5TyCIop5r-p/assets/guides/theme-switch-in-checkout/products-catalogue.png?w=560&fit=max&auto=format&n=C5Fvr5TyCIop5r-p&q=85&s=7177a3856b4f4dae145f38ddd03c650c 560w, https://mintcdn.com/polar/C5Fvr5TyCIop5r-p/assets/guides/theme-switch-in-checkout/products-catalogue.png?w=840&fit=max&auto=format&n=C5Fvr5TyCIop5r-p&q=85&s=09011c2bdfe7eaad0183c4ff346d3e47 840w, https://mintcdn.com/polar/C5Fvr5TyCIop5r-p/assets/guides/theme-switch-in-checkout/products-catalogue.png?w=1100&fit=max&auto=format&n=C5Fvr5TyCIop5r-p&q=85&s=6807c4c9245314a0fcdb7b4d7ffc73fc 1100w, https://mintcdn.com/polar/C5Fvr5TyCIop5r-p/assets/guides/theme-switch-in-checkout/products-catalogue.png?w=1650&fit=max&auto=format&n=C5Fvr5TyCIop5r-p&q=85&s=a177149c115d1c2826faa3de00a02d8e 1650w, https://mintcdn.com/polar/C5Fvr5TyCIop5r-p/assets/guides/theme-switch-in-checkout/products-catalogue.png?w=2500&fit=max&auto=format&n=C5Fvr5TyCIop5r-p&q=85&s=8f92f10e45898edf624c1a9f291ea50a 2500w" />
  </Step>

  <Step title="Access the product IDs for checkout">
    Retrieve the Product IDs for the items you wish to include in checkout by clicking on the **⋮ (More options) menu** next to chosen products and selecting **Copy Product ID**.\
    These IDs will be required in the next step to create a checkout session.

    <img height="200" src="https://mintcdn.com/polar/C5Fvr5TyCIop5r-p/assets/guides/theme-switch-in-checkout/product-id.png?fit=max&auto=format&n=C5Fvr5TyCIop5r-p&q=85&s=f2ebcca1da24b5ca23a3082f6e60ba77" data-og-width="1812" data-og-height="888" data-path="assets/guides/theme-switch-in-checkout/product-id.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/polar/C5Fvr5TyCIop5r-p/assets/guides/theme-switch-in-checkout/product-id.png?w=280&fit=max&auto=format&n=C5Fvr5TyCIop5r-p&q=85&s=8b661d3ef050af5be34b451b9f3d61e6 280w, https://mintcdn.com/polar/C5Fvr5TyCIop5r-p/assets/guides/theme-switch-in-checkout/product-id.png?w=560&fit=max&auto=format&n=C5Fvr5TyCIop5r-p&q=85&s=90af62851b0b8a46ef1aa39293b17d68 560w, https://mintcdn.com/polar/C5Fvr5TyCIop5r-p/assets/guides/theme-switch-in-checkout/product-id.png?w=840&fit=max&auto=format&n=C5Fvr5TyCIop5r-p&q=85&s=e99a2fccd183695a7db4c242c11ebb61 840w, https://mintcdn.com/polar/C5Fvr5TyCIop5r-p/assets/guides/theme-switch-in-checkout/product-id.png?w=1100&fit=max&auto=format&n=C5Fvr5TyCIop5r-p&q=85&s=f166a54def5c40696f0581145effe46b 1100w, https://mintcdn.com/polar/C5Fvr5TyCIop5r-p/assets/guides/theme-switch-in-checkout/product-id.png?w=1650&fit=max&auto=format&n=C5Fvr5TyCIop5r-p&q=85&s=60657f0aa3514e1bc95db7416fd5b949 1650w, https://mintcdn.com/polar/C5Fvr5TyCIop5r-p/assets/guides/theme-switch-in-checkout/product-id.png?w=2500&fit=max&auto=format&n=C5Fvr5TyCIop5r-p&q=85&s=652420983cfaa2d96bd7117da8dd29b0 2500w" />
  </Step>

  <Step title="Create a Checkout Session using the API">
    Open your terminal and paste the following curl command to make an API call for creating a checkout session.
    Be sure to replace:

    * \<YOUR\_ACCESS\_TOKEN> with your actual access token
    * \<PRODUCT\_ID\_1>, \<PRODUCT\_ID\_2>, etc., with the product IDs you want to include in the session

    ```bash Terminal theme={null}
    curl --request POST \
        --url https://api.polar.sh/v1/checkouts/ \
        --header 'Authorization: Bearer <YOUR_ACCESS_TOKEN>' \
        --header 'Content-Type: application/json' \
        --data '{
        "products": [
            "<Product_ID_1>",
            "<Product_ID_2>",
            "<Product_ID_3>"
        ]
    }'
    ```

    Find the description of all the parameters in the [Create Checkout Session API](https://polar.sh/docs/api-reference/checkouts/create-session).
  </Step>

  <Step title="Access the Checkout Session URL">
    The curl command returns a JSON. Access the checkout URL from the <code>"url"</code> key of the JSON.

    ```json  theme={null}
    {
        "...": "...",
        "url": "https://buy.polar.sh/polar_c_...", // [!code ++]
        "...": "..."
    }
    ```
  </Step>
</Steps>
