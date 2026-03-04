> ## Documentation Index
> Fetch the complete documentation index at: https://polar.sh/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# How to Customize Products Order in Checkouts

> Learn how to customize the order in which products appear in checkouts.

<Info>
  Currently, customizing the products order in checkout is only supported via the APIs.
</Info>

## Create Organization Access Token and Product IDs

<Steps>
  <Step title="Create a New Token">
    Create a new organization token by following our [Organization Access Tokens](https://polar.sh/docs/integrate/oat) guide.
  </Step>

  <Step title="Save your Access Token">
    After creating your access token, you will be able to view it. Please copy and save your access token.

    <img height="200" src="https://mintcdn.com/polar/WdO7SaZ4QOb9_Uo-/assets/guides/customize-products-order-in-checkouts/access-token.png?fit=max&auto=format&n=WdO7SaZ4QOb9_Uo-&q=85&s=4d5b14416665214c4191b03aef3e7948" data-og-width="1812" data-og-height="888" data-path="assets/guides/customize-products-order-in-checkouts/access-token.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/polar/WdO7SaZ4QOb9_Uo-/assets/guides/customize-products-order-in-checkouts/access-token.png?w=280&fit=max&auto=format&n=WdO7SaZ4QOb9_Uo-&q=85&s=6a1d91421855bf48787256011085543c 280w, https://mintcdn.com/polar/WdO7SaZ4QOb9_Uo-/assets/guides/customize-products-order-in-checkouts/access-token.png?w=560&fit=max&auto=format&n=WdO7SaZ4QOb9_Uo-&q=85&s=962154d88f31d18e25c1a3fd2c259a1d 560w, https://mintcdn.com/polar/WdO7SaZ4QOb9_Uo-/assets/guides/customize-products-order-in-checkouts/access-token.png?w=840&fit=max&auto=format&n=WdO7SaZ4QOb9_Uo-&q=85&s=8817261c27016420555745c51e573a59 840w, https://mintcdn.com/polar/WdO7SaZ4QOb9_Uo-/assets/guides/customize-products-order-in-checkouts/access-token.png?w=1100&fit=max&auto=format&n=WdO7SaZ4QOb9_Uo-&q=85&s=00ee0ec52a7a4945abe9e33027174849 1100w, https://mintcdn.com/polar/WdO7SaZ4QOb9_Uo-/assets/guides/customize-products-order-in-checkouts/access-token.png?w=1650&fit=max&auto=format&n=WdO7SaZ4QOb9_Uo-&q=85&s=6ddd8520287a31508cfa9802a600cb64 1650w, https://mintcdn.com/polar/WdO7SaZ4QOb9_Uo-/assets/guides/customize-products-order-in-checkouts/access-token.png?w=2500&fit=max&auto=format&n=WdO7SaZ4QOb9_Uo-&q=85&s=8e0a71bca66648ce87dd007ee40a5d2d 2500w" />
  </Step>

  <Step title="Go to the Products Catalogue">
    In the Polar dashboard sidebar, navigate to **Products** > **Catalogue** for your organization.
    You can also go directly to `https://polar.sh/dashboard/${org_slug}/products`.

    <img height="200" src="https://mintcdn.com/polar/WdO7SaZ4QOb9_Uo-/assets/guides/customize-products-order-in-checkouts/products-catalogue.png?fit=max&auto=format&n=WdO7SaZ4QOb9_Uo-&q=85&s=1a593ae8c7c476b62f5cdde8730e3efe" data-og-width="1823" data-og-height="893" data-path="assets/guides/customize-products-order-in-checkouts/products-catalogue.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/polar/WdO7SaZ4QOb9_Uo-/assets/guides/customize-products-order-in-checkouts/products-catalogue.png?w=280&fit=max&auto=format&n=WdO7SaZ4QOb9_Uo-&q=85&s=d2750ba879c5a666e54efe2031730af2 280w, https://mintcdn.com/polar/WdO7SaZ4QOb9_Uo-/assets/guides/customize-products-order-in-checkouts/products-catalogue.png?w=560&fit=max&auto=format&n=WdO7SaZ4QOb9_Uo-&q=85&s=845f9dd7b5c263d7ca659d3caa35fe75 560w, https://mintcdn.com/polar/WdO7SaZ4QOb9_Uo-/assets/guides/customize-products-order-in-checkouts/products-catalogue.png?w=840&fit=max&auto=format&n=WdO7SaZ4QOb9_Uo-&q=85&s=c0721a52f061be734515cbb5180e02cf 840w, https://mintcdn.com/polar/WdO7SaZ4QOb9_Uo-/assets/guides/customize-products-order-in-checkouts/products-catalogue.png?w=1100&fit=max&auto=format&n=WdO7SaZ4QOb9_Uo-&q=85&s=0b6ad5e65fc24653f7b73d920ebdae86 1100w, https://mintcdn.com/polar/WdO7SaZ4QOb9_Uo-/assets/guides/customize-products-order-in-checkouts/products-catalogue.png?w=1650&fit=max&auto=format&n=WdO7SaZ4QOb9_Uo-&q=85&s=2da3b2b75643e33181bdcca7e3a0ffc1 1650w, https://mintcdn.com/polar/WdO7SaZ4QOb9_Uo-/assets/guides/customize-products-order-in-checkouts/products-catalogue.png?w=2500&fit=max&auto=format&n=WdO7SaZ4QOb9_Uo-&q=85&s=23e366428c00e9b9aaae91a9c7241d56 2500w" />
  </Step>

  <Step title="Access the product IDs for checkout">
    Retrieve the Product IDs for the items you wish to include in checkout by clicking on the **⋮ (More options) menu** next to chosen products and selecting **Copy Product ID**.\
    These IDs will be required in the next step to create a checkout.

    <img height="200" src="https://mintcdn.com/polar/WdO7SaZ4QOb9_Uo-/assets/guides/customize-products-order-in-checkouts/product-id.png?fit=max&auto=format&n=WdO7SaZ4QOb9_Uo-&q=85&s=9a39f0e5d6371a9fec7ed25d455db1f5" data-og-width="1812" data-og-height="888" data-path="assets/guides/customize-products-order-in-checkouts/product-id.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/polar/WdO7SaZ4QOb9_Uo-/assets/guides/customize-products-order-in-checkouts/product-id.png?w=280&fit=max&auto=format&n=WdO7SaZ4QOb9_Uo-&q=85&s=7f5b4302d631dbcd91bb92500ad6e291 280w, https://mintcdn.com/polar/WdO7SaZ4QOb9_Uo-/assets/guides/customize-products-order-in-checkouts/product-id.png?w=560&fit=max&auto=format&n=WdO7SaZ4QOb9_Uo-&q=85&s=9e2e7a3b50d1dddd659bc62588f1682b 560w, https://mintcdn.com/polar/WdO7SaZ4QOb9_Uo-/assets/guides/customize-products-order-in-checkouts/product-id.png?w=840&fit=max&auto=format&n=WdO7SaZ4QOb9_Uo-&q=85&s=99505b88028686328cfa8d7cff5c7fbb 840w, https://mintcdn.com/polar/WdO7SaZ4QOb9_Uo-/assets/guides/customize-products-order-in-checkouts/product-id.png?w=1100&fit=max&auto=format&n=WdO7SaZ4QOb9_Uo-&q=85&s=cde8b9cf816e0adf912747587d40c247 1100w, https://mintcdn.com/polar/WdO7SaZ4QOb9_Uo-/assets/guides/customize-products-order-in-checkouts/product-id.png?w=1650&fit=max&auto=format&n=WdO7SaZ4QOb9_Uo-&q=85&s=161e2c5bdb3ceb608d7df0560c83600d 1650w, https://mintcdn.com/polar/WdO7SaZ4QOb9_Uo-/assets/guides/customize-products-order-in-checkouts/product-id.png?w=2500&fit=max&auto=format&n=WdO7SaZ4QOb9_Uo-&q=85&s=4b1860690f22615e76ec61b4187754a9 2500w" />
  </Step>
</Steps>

## Reordering Products In Checkout Links API

<Steps>
  <Step title="Create a Checkout Link using the API">
    Open your terminal and paste the following curl command to make an API call for creating a checkout link.
    Be sure to replace:

    * \<YOUR\_ACCESS\_TOKEN> with your actual access token.

    <Note>
      Make sure your token has the **`checkout_links:write`** scope enabled to use [Create Checkout Link API](/api-reference/checkout-links/create).
    </Note>

    * \<PRODUCT\_ID\_1>, \<PRODUCT\_ID\_2>, etc., with the product IDs in the order you want them to appear in the checkout.

    ```bash Terminal theme={null}
    curl --request POST \
        --url https://api.polar.sh/v1/checkout-links/ \
        --header 'Authorization: Bearer <YOUR_ACCESS_TOKEN>' \
        --header 'Content-Type: application/json' \
        --data '{
        "products": [
            "<Product_ID_1>",
            "<Product_ID_2>"
        ]
    }'
    ```

    Find all the available parameters along with the description in the  [Create Checkout Link API](https://polar.sh/docs/api-reference/checkout-links/create).
  </Step>

  <Step title="Open the Checkout Link URL">
    The curl command returns a JSON. Access the checkout link URL from the <code>"url"</code> key of the JSON and open it.

    ```json  theme={null}
    {
        "...": "...",
        "...": "...",
        "url": "https://buy.polar.sh/polar_cl_..." // [!code ++]
    }
    ```

    It looks like below:

    <img height="200" src="https://mintcdn.com/polar/WdO7SaZ4QOb9_Uo-/assets/guides/customize-products-order-in-checkouts/p1-p2.png?fit=max&auto=format&n=WdO7SaZ4QOb9_Uo-&q=85&s=19f442e4c663437294322cbe56e64b42" data-og-width="1721" data-og-height="856" data-path="assets/guides/customize-products-order-in-checkouts/p1-p2.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/polar/WdO7SaZ4QOb9_Uo-/assets/guides/customize-products-order-in-checkouts/p1-p2.png?w=280&fit=max&auto=format&n=WdO7SaZ4QOb9_Uo-&q=85&s=e6ec7a88585185eeccbf6b1031ca972e 280w, https://mintcdn.com/polar/WdO7SaZ4QOb9_Uo-/assets/guides/customize-products-order-in-checkouts/p1-p2.png?w=560&fit=max&auto=format&n=WdO7SaZ4QOb9_Uo-&q=85&s=2b35b129862dd35af72f4b61d72c9462 560w, https://mintcdn.com/polar/WdO7SaZ4QOb9_Uo-/assets/guides/customize-products-order-in-checkouts/p1-p2.png?w=840&fit=max&auto=format&n=WdO7SaZ4QOb9_Uo-&q=85&s=429a6bc2f033f6d3af6f9472c1ee9176 840w, https://mintcdn.com/polar/WdO7SaZ4QOb9_Uo-/assets/guides/customize-products-order-in-checkouts/p1-p2.png?w=1100&fit=max&auto=format&n=WdO7SaZ4QOb9_Uo-&q=85&s=59e91b849d852f401c3e1bc0f28b3b99 1100w, https://mintcdn.com/polar/WdO7SaZ4QOb9_Uo-/assets/guides/customize-products-order-in-checkouts/p1-p2.png?w=1650&fit=max&auto=format&n=WdO7SaZ4QOb9_Uo-&q=85&s=907ffe2f96e3db609d570fba09d3fd29 1650w, https://mintcdn.com/polar/WdO7SaZ4QOb9_Uo-/assets/guides/customize-products-order-in-checkouts/p1-p2.png?w=2500&fit=max&auto=format&n=WdO7SaZ4QOb9_Uo-&q=85&s=24f504d9bd817330e92b86c84fe9168f 2500w" />
  </Step>

  <Step title="Change the order of products">
    If you want to change the order and make Product 2 appear before Product 1, place Product 2's ID first, followed by Product 1's ID in the API call.

    ```bash Terminal theme={null}
    curl --request POST \
        --url https://api.polar.sh/v1/checkouts/ \
        --header 'Authorization: Bearer <YOUR_ACCESS_TOKEN>' \
        --header 'Content-Type: application/json' \
        --data '{
        "products": [
            "<Product_ID_2>",
            "<Product_ID_1>"
        ]
    }'
    ```

    The checkout looks like below:

    <img height="200" src="https://mintcdn.com/polar/WdO7SaZ4QOb9_Uo-/assets/guides/customize-products-order-in-checkouts/p2-p1.png?fit=max&auto=format&n=WdO7SaZ4QOb9_Uo-&q=85&s=1fc8c36350cebf7ba2780291982255d5" data-og-width="1721" data-og-height="856" data-path="assets/guides/customize-products-order-in-checkouts/p2-p1.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/polar/WdO7SaZ4QOb9_Uo-/assets/guides/customize-products-order-in-checkouts/p2-p1.png?w=280&fit=max&auto=format&n=WdO7SaZ4QOb9_Uo-&q=85&s=914da9ee0d2ce06fd4c0bb67026e9b76 280w, https://mintcdn.com/polar/WdO7SaZ4QOb9_Uo-/assets/guides/customize-products-order-in-checkouts/p2-p1.png?w=560&fit=max&auto=format&n=WdO7SaZ4QOb9_Uo-&q=85&s=c34230677cf2697ba8ed32e045aad7b5 560w, https://mintcdn.com/polar/WdO7SaZ4QOb9_Uo-/assets/guides/customize-products-order-in-checkouts/p2-p1.png?w=840&fit=max&auto=format&n=WdO7SaZ4QOb9_Uo-&q=85&s=d822a66431a546649fefcc6b6460d96a 840w, https://mintcdn.com/polar/WdO7SaZ4QOb9_Uo-/assets/guides/customize-products-order-in-checkouts/p2-p1.png?w=1100&fit=max&auto=format&n=WdO7SaZ4QOb9_Uo-&q=85&s=634ec974b61615686c08c82de68b02eb 1100w, https://mintcdn.com/polar/WdO7SaZ4QOb9_Uo-/assets/guides/customize-products-order-in-checkouts/p2-p1.png?w=1650&fit=max&auto=format&n=WdO7SaZ4QOb9_Uo-&q=85&s=a75cbd9408cf4430b2a1e177d61387cc 1650w, https://mintcdn.com/polar/WdO7SaZ4QOb9_Uo-/assets/guides/customize-products-order-in-checkouts/p2-p1.png?w=2500&fit=max&auto=format&n=WdO7SaZ4QOb9_Uo-&q=85&s=9f0594d2e1b3ef979c64c6e5b1bf3af1 2500w" />
  </Step>
</Steps>

## Reordering Products In Checkout Session API

<Steps>
  <Step title="Create a Checkout Session using the API">
    Open your terminal and paste the following curl command to make an API call for creating a checkout session.
    Be sure to replace:

    * \<YOUR\_ACCESS\_TOKEN> with your actual access token.

    <Note>
      Make sure your token has the **`checkouts:write`** scope enabled to use [Create Checkout Session API](/api-reference/checkouts/create-session).
    </Note>

    * \<PRODUCT\_ID\_1>, \<PRODUCT\_ID\_2>, etc., with the product IDs in the order you want them to appear in the checkout.

    ```bash Terminal theme={null}
    curl --request POST \
        --url https://api.polar.sh/v1/checkouts/ \
        --header 'Authorization: Bearer <YOUR_ACCESS_TOKEN>' \
        --header 'Content-Type: application/json' \
        --data '{
        "products": [
            "<Product_ID_1>",
            "<Product_ID_2>"
        ]
    }'
    ```

    Find all the available parameters along with the description in the [Create Checkout Session API](https://polar.sh/docs/api-reference/checkouts/create-session).
  </Step>

  <Step title="Open the Checkout Session URL">
    The curl command returns a JSON. Access the checkout session URL from the <code>"url"</code> key of the JSON and open it.

    ```json  theme={null}
    {
        "...": "...",
        "url": "https://buy.polar.sh/polar_c_...", // [!code ++]
        "...": "..."
    }
    ```

    It looks like below:

    <img height="200" src="https://mintcdn.com/polar/WdO7SaZ4QOb9_Uo-/assets/guides/customize-products-order-in-checkouts/p1-p2.png?fit=max&auto=format&n=WdO7SaZ4QOb9_Uo-&q=85&s=19f442e4c663437294322cbe56e64b42" data-og-width="1721" data-og-height="856" data-path="assets/guides/customize-products-order-in-checkouts/p1-p2.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/polar/WdO7SaZ4QOb9_Uo-/assets/guides/customize-products-order-in-checkouts/p1-p2.png?w=280&fit=max&auto=format&n=WdO7SaZ4QOb9_Uo-&q=85&s=e6ec7a88585185eeccbf6b1031ca972e 280w, https://mintcdn.com/polar/WdO7SaZ4QOb9_Uo-/assets/guides/customize-products-order-in-checkouts/p1-p2.png?w=560&fit=max&auto=format&n=WdO7SaZ4QOb9_Uo-&q=85&s=2b35b129862dd35af72f4b61d72c9462 560w, https://mintcdn.com/polar/WdO7SaZ4QOb9_Uo-/assets/guides/customize-products-order-in-checkouts/p1-p2.png?w=840&fit=max&auto=format&n=WdO7SaZ4QOb9_Uo-&q=85&s=429a6bc2f033f6d3af6f9472c1ee9176 840w, https://mintcdn.com/polar/WdO7SaZ4QOb9_Uo-/assets/guides/customize-products-order-in-checkouts/p1-p2.png?w=1100&fit=max&auto=format&n=WdO7SaZ4QOb9_Uo-&q=85&s=59e91b849d852f401c3e1bc0f28b3b99 1100w, https://mintcdn.com/polar/WdO7SaZ4QOb9_Uo-/assets/guides/customize-products-order-in-checkouts/p1-p2.png?w=1650&fit=max&auto=format&n=WdO7SaZ4QOb9_Uo-&q=85&s=907ffe2f96e3db609d570fba09d3fd29 1650w, https://mintcdn.com/polar/WdO7SaZ4QOb9_Uo-/assets/guides/customize-products-order-in-checkouts/p1-p2.png?w=2500&fit=max&auto=format&n=WdO7SaZ4QOb9_Uo-&q=85&s=24f504d9bd817330e92b86c84fe9168f 2500w" />
  </Step>

  <Step title="Change the order of products">
    If you want to change the order and make Product 2 appear before Product 1, place Product 2's ID first, followed by Product 1's ID in the API call.

    ```bash Terminal theme={null}
    curl --request POST \
        --url https://api.polar.sh/v1/checkouts/ \
        --header 'Authorization: Bearer <YOUR_ACCESS_TOKEN>' \
        --header 'Content-Type: application/json' \
        --data '{
        "products": [
            "<Product_ID_2>",
            "<Product_ID_1>"
        ]
    }'
    ```

    The checkout looks like below:

    <img height="200" src="https://mintcdn.com/polar/WdO7SaZ4QOb9_Uo-/assets/guides/customize-products-order-in-checkouts/p2-p1.png?fit=max&auto=format&n=WdO7SaZ4QOb9_Uo-&q=85&s=1fc8c36350cebf7ba2780291982255d5" data-og-width="1721" data-og-height="856" data-path="assets/guides/customize-products-order-in-checkouts/p2-p1.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/polar/WdO7SaZ4QOb9_Uo-/assets/guides/customize-products-order-in-checkouts/p2-p1.png?w=280&fit=max&auto=format&n=WdO7SaZ4QOb9_Uo-&q=85&s=914da9ee0d2ce06fd4c0bb67026e9b76 280w, https://mintcdn.com/polar/WdO7SaZ4QOb9_Uo-/assets/guides/customize-products-order-in-checkouts/p2-p1.png?w=560&fit=max&auto=format&n=WdO7SaZ4QOb9_Uo-&q=85&s=c34230677cf2697ba8ed32e045aad7b5 560w, https://mintcdn.com/polar/WdO7SaZ4QOb9_Uo-/assets/guides/customize-products-order-in-checkouts/p2-p1.png?w=840&fit=max&auto=format&n=WdO7SaZ4QOb9_Uo-&q=85&s=d822a66431a546649fefcc6b6460d96a 840w, https://mintcdn.com/polar/WdO7SaZ4QOb9_Uo-/assets/guides/customize-products-order-in-checkouts/p2-p1.png?w=1100&fit=max&auto=format&n=WdO7SaZ4QOb9_Uo-&q=85&s=634ec974b61615686c08c82de68b02eb 1100w, https://mintcdn.com/polar/WdO7SaZ4QOb9_Uo-/assets/guides/customize-products-order-in-checkouts/p2-p1.png?w=1650&fit=max&auto=format&n=WdO7SaZ4QOb9_Uo-&q=85&s=a75cbd9408cf4430b2a1e177d61387cc 1650w, https://mintcdn.com/polar/WdO7SaZ4QOb9_Uo-/assets/guides/customize-products-order-in-checkouts/p2-p1.png?w=2500&fit=max&auto=format&n=WdO7SaZ4QOb9_Uo-&q=85&s=9f0594d2e1b3ef979c64c6e5b1bf3af1 2500w" />
  </Step>
</Steps>
