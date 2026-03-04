> ## Documentation Index
> Fetch the complete documentation index at: https://polar.sh/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Create Checkout Link

> Create a checkout link.

**Scopes**: `checkout_links:write`

<Warning>
  Looking to create a single use checkout session? Checkout Links are probably **not** what you're looking for.

  Checkout Links are shareable links that generate checkout sessions when opened. They are very handy to start a purchase from your website or social media.

  However, if you want to start a checkout for one of your user **inside** your product, you should use the [Checkout Sessions API](/api-reference/checkouts/create-session).
</Warning>


## OpenAPI

````yaml post /v1/checkout-links/
openapi: 3.1.0
info:
  title: Polar API
  summary: Polar HTTP and Webhooks API
  description: Read the docs at https://polar.sh/docs/api-reference
  version: 0.1.0
servers:
  - url: https://api.polar.sh
    description: Production environment
    x-speakeasy-server-id: production
  - url: https://sandbox-api.polar.sh
    description: Sandbox environment
    x-speakeasy-server-id: sandbox
security:
  - access_token: []
tags:
  - name: public
    description: >-
      Endpoints shown and documented in the Polar API documentation and
      available in our SDKs.
  - name: private
    description: >-
      Endpoints that should appear in the schema only in development to generate
      our internal JS SDK.
  - name: mcp
    description: Endpoints enabled in the MCP server.
paths:
  /v1/checkout-links/:
    post:
      tags:
        - checkout-links
        - public
      summary: Create Checkout Link
      description: |-
        Create a checkout link.

        **Scopes**: `checkout_links:write`
      operationId: checkout-links:create
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CheckoutLinkCreate'
      responses:
        '201':
          description: Checkout link created.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/CheckoutLink'
        '422':
          description: Validation Error
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/HTTPValidationError'
      x-codeSamples:
        - lang: go
          label: Go (SDK)
          source: "package main\n\nimport(\n\t\"context\"\n\t\"os\"\n\tpolargo \"github.com/polarsource/polar-go\"\n\t\"github.com/polarsource/polar-go/models/components\"\n\t\"log\"\n)\n\nfunc main() {\n    ctx := context.Background()\n\n    s := polargo.New(\n        polargo.WithSecurity(os.Getenv(\"POLAR_ACCESS_TOKEN\")),\n    )\n\n    res, err := s.CheckoutLinks.Create(ctx, components.CreateCheckoutLinkCreateCheckoutLinkCreateProductPrice(\n        components.CheckoutLinkCreateProductPrice{\n            ProductPriceID: \"<value>\",\n        },\n    ))\n    if err != nil {\n        log.Fatal(err)\n    }\n    if res.CheckoutLink != nil {\n        switch res.CheckoutLink.Discount.Type {\n            case components.CheckoutLinkDiscountTypeDiscountFixedOnceForeverDurationBase:\n                // res.CheckoutLink.Discount.DiscountFixedOnceForeverDurationBase is populated\n            case components.CheckoutLinkDiscountTypeDiscountFixedRepeatDurationBase:\n                // res.CheckoutLink.Discount.DiscountFixedRepeatDurationBase is populated\n            case components.CheckoutLinkDiscountTypeDiscountPercentageOnceForeverDurationBase:\n                // res.CheckoutLink.Discount.DiscountPercentageOnceForeverDurationBase is populated\n            case components.CheckoutLinkDiscountTypeDiscountPercentageRepeatDurationBase:\n                // res.CheckoutLink.Discount.DiscountPercentageRepeatDurationBase is populated\n        }\n\n    }\n}"
        - lang: python
          label: Python (SDK)
          source: |-
            from polar_sdk import Polar


            with Polar(
                access_token="<YOUR_BEARER_TOKEN_HERE>",
            ) as polar:

                res = polar.checkout_links.create(request={
                    "payment_processor": "stripe",
                    "allow_discount_codes": True,
                    "require_billing_address": False,
                    "product_price_id": "<value>",
                })

                # Handle response
                print(res)
        - lang: typescript
          label: Typescript (SDK)
          source: |-
            import { Polar } from "@polar-sh/sdk";

            const polar = new Polar({
              accessToken: process.env["POLAR_ACCESS_TOKEN"] ?? "",
            });

            async function run() {
              const result = await polar.checkoutLinks.create({
                paymentProcessor: "stripe",
                allowDiscountCodes: true,
                requireBillingAddress: false,
                productPriceId: "<value>",
              });

              console.log(result);
            }

            run();
        - lang: php
          label: PHP (SDK)
          source: |-
            declare(strict_types=1);

            require 'vendor/autoload.php';

            use Polar;
            use Polar\Models\Components;

            $sdk = Polar\Polar::builder()
                ->setSecurity(
                    '<YOUR_BEARER_TOKEN_HERE>'
                )
                ->build();

            $request = new Components\CheckoutLinkCreateProductPrice(
                productPriceId: '<value>',
            );

            $response = $sdk->checkoutLinks->create(
                request: $request
            );

            if ($response->checkoutLink !== null) {
                // handle response
            }
components:
  schemas:
    CheckoutLinkCreate:
      anyOf:
        - $ref: '#/components/schemas/CheckoutLinkCreateProductPrice'
        - $ref: '#/components/schemas/CheckoutLinkCreateProduct'
        - $ref: '#/components/schemas/CheckoutLinkCreateProducts'
    CheckoutLink:
      properties:
        id:
          type: string
          format: uuid4
          title: Id
          description: The ID of the object.
        created_at:
          type: string
          format: date-time
          title: Created At
          description: Creation timestamp of the object.
        modified_at:
          anyOf:
            - type: string
              format: date-time
            - type: 'null'
          title: Modified At
          description: Last modification timestamp of the object.
        trial_interval:
          anyOf:
            - $ref: '#/components/schemas/TrialInterval'
            - type: 'null'
          description: The interval unit for the trial period.
        trial_interval_count:
          anyOf:
            - type: integer
            - type: 'null'
          title: Trial Interval Count
          description: The number of interval units for the trial period.
        metadata:
          $ref: '#/components/schemas/MetadataOutputType'
        payment_processor:
          $ref: '#/components/schemas/PaymentProcessor'
          description: Payment processor used.
        client_secret:
          type: string
          title: Client Secret
          description: Client secret used to access the checkout link.
        success_url:
          anyOf:
            - type: string
            - type: 'null'
          title: Success Url
          description: >-
            URL where the customer will be redirected after a successful
            payment.
        return_url:
          anyOf:
            - type: string
            - type: 'null'
          title: Return Url
          description: >-
            When set, a back button will be shown in the checkout to return to
            this URL.
        label:
          anyOf:
            - type: string
            - type: 'null'
          title: Label
          description: Optional label to distinguish links internally
        allow_discount_codes:
          type: boolean
          title: Allow Discount Codes
          description: >-
            Whether to allow the customer to apply discount codes. If you apply
            a discount through `discount_id`, it'll still be applied, but the
            customer won't be able to change it.
        require_billing_address:
          type: boolean
          title: Require Billing Address
          description: >-
            Whether to require the customer to fill their full billing address,
            instead of just the country. Customers in the US will always be
            required to fill their full address, regardless of this setting.
        discount_id:
          anyOf:
            - type: string
              format: uuid4
            - type: 'null'
          title: Discount Id
          description: >-
            ID of the discount to apply to the checkout. If the discount is not
            applicable anymore when opening the checkout link, it'll be ignored.
        organization_id:
          type: string
          format: uuid4
          title: Organization Id
          description: The organization ID.
          examples:
            - 1dbfc517-0bbf-4301-9ba8-555ca42b9737
          x-polar-selector-widget:
            displayProperty: name
            resourceName: Organization
            resourceRoot: /v1/organizations
        products:
          items:
            $ref: '#/components/schemas/CheckoutLinkProduct'
          type: array
          title: Products
        discount:
          anyOf:
            - oneOf:
                - $ref: '#/components/schemas/DiscountFixedOnceForeverDurationBase'
                - $ref: '#/components/schemas/DiscountFixedRepeatDurationBase'
                - $ref: >-
                    #/components/schemas/DiscountPercentageOnceForeverDurationBase
                - $ref: '#/components/schemas/DiscountPercentageRepeatDurationBase'
              title: CheckoutLinkDiscount
            - type: 'null'
          title: Discount
        url:
          type: string
          title: Url
      type: object
      required:
        - id
        - created_at
        - modified_at
        - trial_interval
        - trial_interval_count
        - metadata
        - payment_processor
        - client_secret
        - success_url
        - return_url
        - label
        - allow_discount_codes
        - require_billing_address
        - discount_id
        - organization_id
        - products
        - discount
        - url
      title: CheckoutLink
      description: Checkout link data.
    HTTPValidationError:
      properties:
        detail:
          items:
            $ref: '#/components/schemas/ValidationError'
          type: array
          title: Detail
      type: object
      title: HTTPValidationError
    CheckoutLinkCreateProductPrice:
      properties:
        metadata:
          additionalProperties:
            anyOf:
              - type: string
                maxLength: 500
                minLength: 1
              - type: integer
              - type: number
              - type: boolean
          propertyNames:
            maxLength: 40
            minLength: 1
          type: object
          maxProperties: 50
          title: Metadata
          description: |-
            Key-value object allowing you to store additional information.

            The key must be a string with a maximum length of **40 characters**.
            The value must be either:

            * A string with a maximum length of **500 characters**
            * An integer
            * A floating-point number
            * A boolean

            You can store up to **50 key-value pairs**.
        trial_interval:
          anyOf:
            - $ref: '#/components/schemas/TrialInterval'
            - type: 'null'
          description: The interval unit for the trial period.
        trial_interval_count:
          anyOf:
            - type: integer
              maximum: 1000
              minimum: 1
            - type: 'null'
          title: Trial Interval Count
          description: The number of interval units for the trial period.
        payment_processor:
          type: string
          const: stripe
          title: Payment Processor
          description: Payment processor to use. Currently only Stripe is supported.
        label:
          anyOf:
            - type: string
            - type: 'null'
          title: Label
          description: Optional label to distinguish links internally
        allow_discount_codes:
          type: boolean
          title: Allow Discount Codes
          description: >-
            Whether to allow the customer to apply discount codes. If you apply
            a discount through `discount_id`, it'll still be applied, but the
            customer won't be able to change it.
          default: true
        require_billing_address:
          type: boolean
          title: Require Billing Address
          description: >-
            Whether to require the customer to fill their full billing address,
            instead of just the country. Customers in the US will always be
            required to fill their full address, regardless of this setting.
          default: false
        discount_id:
          anyOf:
            - type: string
              format: uuid4
            - type: 'null'
          title: Discount Id
          description: >-
            ID of the discount to apply to the checkout. If the discount is not
            applicable anymore when opening the checkout link, it'll be ignored.
        success_url:
          anyOf:
            - type: string
              maxLength: 2083
              minLength: 1
              format: uri
            - type: 'null'
          title: Success Url
          description: >-
            URL where the customer will be redirected after a successful
            payment.You can add the `checkout_id={CHECKOUT_ID}` query parameter
            to retrieve the checkout session id.
        return_url:
          anyOf:
            - type: string
              maxLength: 2083
              minLength: 1
              format: uri
            - type: 'null'
          title: Return Url
          description: >-
            When set, a back button will be shown in the checkout to return to
            this URL.
        product_price_id:
          type: string
          format: uuid4
          title: Product Price Id
      type: object
      required:
        - payment_processor
        - product_price_id
      title: CheckoutLinkCreateProductPrice
      description: |-
        Schema to create a new checkout link from a a single product price.

        **Deprecated**: Use `CheckoutLinkCreateProducts` instead.
    CheckoutLinkCreateProduct:
      properties:
        metadata:
          additionalProperties:
            anyOf:
              - type: string
                maxLength: 500
                minLength: 1
              - type: integer
              - type: number
              - type: boolean
          propertyNames:
            maxLength: 40
            minLength: 1
          type: object
          maxProperties: 50
          title: Metadata
          description: |-
            Key-value object allowing you to store additional information.

            The key must be a string with a maximum length of **40 characters**.
            The value must be either:

            * A string with a maximum length of **500 characters**
            * An integer
            * A floating-point number
            * A boolean

            You can store up to **50 key-value pairs**.
        trial_interval:
          anyOf:
            - $ref: '#/components/schemas/TrialInterval'
            - type: 'null'
          description: The interval unit for the trial period.
        trial_interval_count:
          anyOf:
            - type: integer
              maximum: 1000
              minimum: 1
            - type: 'null'
          title: Trial Interval Count
          description: The number of interval units for the trial period.
        payment_processor:
          type: string
          const: stripe
          title: Payment Processor
          description: Payment processor to use. Currently only Stripe is supported.
        label:
          anyOf:
            - type: string
            - type: 'null'
          title: Label
          description: Optional label to distinguish links internally
        allow_discount_codes:
          type: boolean
          title: Allow Discount Codes
          description: >-
            Whether to allow the customer to apply discount codes. If you apply
            a discount through `discount_id`, it'll still be applied, but the
            customer won't be able to change it.
          default: true
        require_billing_address:
          type: boolean
          title: Require Billing Address
          description: >-
            Whether to require the customer to fill their full billing address,
            instead of just the country. Customers in the US will always be
            required to fill their full address, regardless of this setting.
          default: false
        discount_id:
          anyOf:
            - type: string
              format: uuid4
            - type: 'null'
          title: Discount Id
          description: >-
            ID of the discount to apply to the checkout. If the discount is not
            applicable anymore when opening the checkout link, it'll be ignored.
        success_url:
          anyOf:
            - type: string
              maxLength: 2083
              minLength: 1
              format: uri
            - type: 'null'
          title: Success Url
          description: >-
            URL where the customer will be redirected after a successful
            payment.You can add the `checkout_id={CHECKOUT_ID}` query parameter
            to retrieve the checkout session id.
        return_url:
          anyOf:
            - type: string
              maxLength: 2083
              minLength: 1
              format: uri
            - type: 'null'
          title: Return Url
          description: >-
            When set, a back button will be shown in the checkout to return to
            this URL.
        product_id:
          type: string
          format: uuid4
          title: Product Id
      type: object
      required:
        - payment_processor
        - product_id
      title: CheckoutLinkCreateProduct
      description: |-
        Schema to create a new checkout link from a a single product.

        **Deprecated**: Use `CheckoutLinkCreateProducts` instead.
    CheckoutLinkCreateProducts:
      properties:
        metadata:
          additionalProperties:
            anyOf:
              - type: string
                maxLength: 500
                minLength: 1
              - type: integer
              - type: number
              - type: boolean
          propertyNames:
            maxLength: 40
            minLength: 1
          type: object
          maxProperties: 50
          title: Metadata
          description: |-
            Key-value object allowing you to store additional information.

            The key must be a string with a maximum length of **40 characters**.
            The value must be either:

            * A string with a maximum length of **500 characters**
            * An integer
            * A floating-point number
            * A boolean

            You can store up to **50 key-value pairs**.
        trial_interval:
          anyOf:
            - $ref: '#/components/schemas/TrialInterval'
            - type: 'null'
          description: The interval unit for the trial period.
        trial_interval_count:
          anyOf:
            - type: integer
              maximum: 1000
              minimum: 1
            - type: 'null'
          title: Trial Interval Count
          description: The number of interval units for the trial period.
        payment_processor:
          type: string
          const: stripe
          title: Payment Processor
          description: Payment processor to use. Currently only Stripe is supported.
        label:
          anyOf:
            - type: string
            - type: 'null'
          title: Label
          description: Optional label to distinguish links internally
        allow_discount_codes:
          type: boolean
          title: Allow Discount Codes
          description: >-
            Whether to allow the customer to apply discount codes. If you apply
            a discount through `discount_id`, it'll still be applied, but the
            customer won't be able to change it.
          default: true
        require_billing_address:
          type: boolean
          title: Require Billing Address
          description: >-
            Whether to require the customer to fill their full billing address,
            instead of just the country. Customers in the US will always be
            required to fill their full address, regardless of this setting.
          default: false
        discount_id:
          anyOf:
            - type: string
              format: uuid4
            - type: 'null'
          title: Discount Id
          description: >-
            ID of the discount to apply to the checkout. If the discount is not
            applicable anymore when opening the checkout link, it'll be ignored.
        success_url:
          anyOf:
            - type: string
              maxLength: 2083
              minLength: 1
              format: uri
            - type: 'null'
          title: Success Url
          description: >-
            URL where the customer will be redirected after a successful
            payment.You can add the `checkout_id={CHECKOUT_ID}` query parameter
            to retrieve the checkout session id.
        return_url:
          anyOf:
            - type: string
              maxLength: 2083
              minLength: 1
              format: uri
            - type: 'null'
          title: Return Url
          description: >-
            When set, a back button will be shown in the checkout to return to
            this URL.
        products:
          items:
            type: string
            format: uuid4
          type: array
          minItems: 1
          title: Products
          description: List of products that will be available to select at checkout.
      type: object
      required:
        - payment_processor
        - products
      title: CheckoutLinkCreateProducts
      description: Schema to create a new checkout link.
    TrialInterval:
      type: string
      enum:
        - day
        - week
        - month
        - year
      title: TrialInterval
    MetadataOutputType:
      additionalProperties:
        anyOf:
          - type: string
          - type: integer
          - type: number
          - type: boolean
      type: object
    PaymentProcessor:
      type: string
      enum:
        - stripe
      title: PaymentProcessor
    CheckoutLinkProduct:
      properties:
        metadata:
          $ref: '#/components/schemas/MetadataOutputType'
        id:
          type: string
          format: uuid4
          title: Id
          description: The ID of the object.
        created_at:
          type: string
          format: date-time
          title: Created At
          description: Creation timestamp of the object.
        modified_at:
          anyOf:
            - type: string
              format: date-time
            - type: 'null'
          title: Modified At
          description: Last modification timestamp of the object.
        trial_interval:
          anyOf:
            - $ref: '#/components/schemas/TrialInterval'
            - type: 'null'
          description: The interval unit for the trial period.
        trial_interval_count:
          anyOf:
            - type: integer
            - type: 'null'
          title: Trial Interval Count
          description: The number of interval units for the trial period.
        name:
          type: string
          title: Name
          description: The name of the product.
        description:
          anyOf:
            - type: string
            - type: 'null'
          title: Description
          description: The description of the product.
        visibility:
          $ref: '#/components/schemas/ProductVisibility'
          description: The visibility of the product.
        recurring_interval:
          anyOf:
            - $ref: '#/components/schemas/SubscriptionRecurringInterval'
            - type: 'null'
          description: >-
            The recurring interval of the product. If `None`, the product is a
            one-time purchase.
        recurring_interval_count:
          anyOf:
            - type: integer
            - type: 'null'
          title: Recurring Interval Count
          description: >-
            Number of interval units of the subscription. If this is set to 1
            the charge will happen every interval (e.g. every month), if set to
            2 it will be every other month, and so on. None for one-time
            products.
        is_recurring:
          type: boolean
          title: Is Recurring
          description: Whether the product is a subscription.
        is_archived:
          type: boolean
          title: Is Archived
          description: Whether the product is archived and no longer available.
        organization_id:
          type: string
          format: uuid4
          title: Organization Id
          description: The ID of the organization owning the product.
        prices:
          items:
            oneOf:
              - $ref: '#/components/schemas/LegacyRecurringProductPrice'
              - $ref: '#/components/schemas/ProductPrice'
          type: array
          title: Prices
          description: List of prices for this product.
        benefits:
          items:
            $ref: '#/components/schemas/BenefitPublic'
          type: array
          title: BenefitPublic
          description: List of benefits granted by the product.
        medias:
          items:
            $ref: '#/components/schemas/ProductMediaFileRead'
          type: array
          title: Medias
          description: List of medias associated to the product.
      type: object
      required:
        - metadata
        - id
        - created_at
        - modified_at
        - trial_interval
        - trial_interval_count
        - name
        - description
        - visibility
        - recurring_interval
        - recurring_interval_count
        - is_recurring
        - is_archived
        - organization_id
        - prices
        - benefits
        - medias
      title: CheckoutLinkProduct
      description: Product data for a checkout link.
    DiscountFixedOnceForeverDurationBase:
      properties:
        duration:
          $ref: '#/components/schemas/DiscountDuration'
        type:
          $ref: '#/components/schemas/DiscountType'
        amount:
          type: integer
          title: Amount
          examples:
            - 1000
        currency:
          type: string
          title: Currency
          examples:
            - usd
        created_at:
          type: string
          format: date-time
          title: Created At
          description: Creation timestamp of the object.
        modified_at:
          anyOf:
            - type: string
              format: date-time
            - type: 'null'
          title: Modified At
          description: Last modification timestamp of the object.
        id:
          type: string
          format: uuid4
          title: Id
          description: The ID of the object.
        metadata:
          $ref: '#/components/schemas/MetadataOutputType'
        name:
          type: string
          title: Name
          description: >-
            Name of the discount. Will be displayed to the customer when the
            discount is applied.
        code:
          anyOf:
            - type: string
            - type: 'null'
          title: Code
          description: Code customers can use to apply the discount during checkout.
        starts_at:
          anyOf:
            - type: string
              format: date-time
            - type: 'null'
          title: Starts At
          description: Timestamp after which the discount is redeemable.
        ends_at:
          anyOf:
            - type: string
              format: date-time
            - type: 'null'
          title: Ends At
          description: Timestamp after which the discount is no longer redeemable.
        max_redemptions:
          anyOf:
            - type: integer
            - type: 'null'
          title: Max Redemptions
          description: Maximum number of times the discount can be redeemed.
        redemptions_count:
          type: integer
          title: Redemptions Count
          description: Number of times the discount has been redeemed.
        organization_id:
          type: string
          format: uuid4
          title: Organization Id
          description: The organization ID.
          examples:
            - 1dbfc517-0bbf-4301-9ba8-555ca42b9737
          x-polar-selector-widget:
            displayProperty: name
            resourceName: Organization
            resourceRoot: /v1/organizations
      type: object
      required:
        - duration
        - type
        - amount
        - currency
        - created_at
        - modified_at
        - id
        - metadata
        - name
        - code
        - starts_at
        - ends_at
        - max_redemptions
        - redemptions_count
        - organization_id
      title: DiscountFixedOnceForeverDurationBase
    DiscountFixedRepeatDurationBase:
      properties:
        duration:
          $ref: '#/components/schemas/DiscountDuration'
        duration_in_months:
          type: integer
          title: Duration In Months
        type:
          $ref: '#/components/schemas/DiscountType'
        amount:
          type: integer
          title: Amount
          examples:
            - 1000
        currency:
          type: string
          title: Currency
          examples:
            - usd
        created_at:
          type: string
          format: date-time
          title: Created At
          description: Creation timestamp of the object.
        modified_at:
          anyOf:
            - type: string
              format: date-time
            - type: 'null'
          title: Modified At
          description: Last modification timestamp of the object.
        id:
          type: string
          format: uuid4
          title: Id
          description: The ID of the object.
        metadata:
          $ref: '#/components/schemas/MetadataOutputType'
        name:
          type: string
          title: Name
          description: >-
            Name of the discount. Will be displayed to the customer when the
            discount is applied.
        code:
          anyOf:
            - type: string
            - type: 'null'
          title: Code
          description: Code customers can use to apply the discount during checkout.
        starts_at:
          anyOf:
            - type: string
              format: date-time
            - type: 'null'
          title: Starts At
          description: Timestamp after which the discount is redeemable.
        ends_at:
          anyOf:
            - type: string
              format: date-time
            - type: 'null'
          title: Ends At
          description: Timestamp after which the discount is no longer redeemable.
        max_redemptions:
          anyOf:
            - type: integer
            - type: 'null'
          title: Max Redemptions
          description: Maximum number of times the discount can be redeemed.
        redemptions_count:
          type: integer
          title: Redemptions Count
          description: Number of times the discount has been redeemed.
        organization_id:
          type: string
          format: uuid4
          title: Organization Id
          description: The organization ID.
          examples:
            - 1dbfc517-0bbf-4301-9ba8-555ca42b9737
          x-polar-selector-widget:
            displayProperty: name
            resourceName: Organization
            resourceRoot: /v1/organizations
      type: object
      required:
        - duration
        - duration_in_months
        - type
        - amount
        - currency
        - created_at
        - modified_at
        - id
        - metadata
        - name
        - code
        - starts_at
        - ends_at
        - max_redemptions
        - redemptions_count
        - organization_id
      title: DiscountFixedRepeatDurationBase
    DiscountPercentageOnceForeverDurationBase:
      properties:
        duration:
          $ref: '#/components/schemas/DiscountDuration'
        type:
          $ref: '#/components/schemas/DiscountType'
        basis_points:
          type: integer
          title: Basis Points
          description: >-
            Discount percentage in basis points. A basis point is 1/100th of a
            percent. For example, 1000 basis points equals a 10% discount.
          examples:
            - 1000
        created_at:
          type: string
          format: date-time
          title: Created At
          description: Creation timestamp of the object.
        modified_at:
          anyOf:
            - type: string
              format: date-time
            - type: 'null'
          title: Modified At
          description: Last modification timestamp of the object.
        id:
          type: string
          format: uuid4
          title: Id
          description: The ID of the object.
        metadata:
          $ref: '#/components/schemas/MetadataOutputType'
        name:
          type: string
          title: Name
          description: >-
            Name of the discount. Will be displayed to the customer when the
            discount is applied.
        code:
          anyOf:
            - type: string
            - type: 'null'
          title: Code
          description: Code customers can use to apply the discount during checkout.
        starts_at:
          anyOf:
            - type: string
              format: date-time
            - type: 'null'
          title: Starts At
          description: Timestamp after which the discount is redeemable.
        ends_at:
          anyOf:
            - type: string
              format: date-time
            - type: 'null'
          title: Ends At
          description: Timestamp after which the discount is no longer redeemable.
        max_redemptions:
          anyOf:
            - type: integer
            - type: 'null'
          title: Max Redemptions
          description: Maximum number of times the discount can be redeemed.
        redemptions_count:
          type: integer
          title: Redemptions Count
          description: Number of times the discount has been redeemed.
        organization_id:
          type: string
          format: uuid4
          title: Organization Id
          description: The organization ID.
          examples:
            - 1dbfc517-0bbf-4301-9ba8-555ca42b9737
          x-polar-selector-widget:
            displayProperty: name
            resourceName: Organization
            resourceRoot: /v1/organizations
      type: object
      required:
        - duration
        - type
        - basis_points
        - created_at
        - modified_at
        - id
        - metadata
        - name
        - code
        - starts_at
        - ends_at
        - max_redemptions
        - redemptions_count
        - organization_id
      title: DiscountPercentageOnceForeverDurationBase
    DiscountPercentageRepeatDurationBase:
      properties:
        duration:
          $ref: '#/components/schemas/DiscountDuration'
        duration_in_months:
          type: integer
          title: Duration In Months
        type:
          $ref: '#/components/schemas/DiscountType'
        basis_points:
          type: integer
          title: Basis Points
          description: >-
            Discount percentage in basis points. A basis point is 1/100th of a
            percent. For example, 1000 basis points equals a 10% discount.
          examples:
            - 1000
        created_at:
          type: string
          format: date-time
          title: Created At
          description: Creation timestamp of the object.
        modified_at:
          anyOf:
            - type: string
              format: date-time
            - type: 'null'
          title: Modified At
          description: Last modification timestamp of the object.
        id:
          type: string
          format: uuid4
          title: Id
          description: The ID of the object.
        metadata:
          $ref: '#/components/schemas/MetadataOutputType'
        name:
          type: string
          title: Name
          description: >-
            Name of the discount. Will be displayed to the customer when the
            discount is applied.
        code:
          anyOf:
            - type: string
            - type: 'null'
          title: Code
          description: Code customers can use to apply the discount during checkout.
        starts_at:
          anyOf:
            - type: string
              format: date-time
            - type: 'null'
          title: Starts At
          description: Timestamp after which the discount is redeemable.
        ends_at:
          anyOf:
            - type: string
              format: date-time
            - type: 'null'
          title: Ends At
          description: Timestamp after which the discount is no longer redeemable.
        max_redemptions:
          anyOf:
            - type: integer
            - type: 'null'
          title: Max Redemptions
          description: Maximum number of times the discount can be redeemed.
        redemptions_count:
          type: integer
          title: Redemptions Count
          description: Number of times the discount has been redeemed.
        organization_id:
          type: string
          format: uuid4
          title: Organization Id
          description: The organization ID.
          examples:
            - 1dbfc517-0bbf-4301-9ba8-555ca42b9737
          x-polar-selector-widget:
            displayProperty: name
            resourceName: Organization
            resourceRoot: /v1/organizations
      type: object
      required:
        - duration
        - duration_in_months
        - type
        - basis_points
        - created_at
        - modified_at
        - id
        - metadata
        - name
        - code
        - starts_at
        - ends_at
        - max_redemptions
        - redemptions_count
        - organization_id
      title: DiscountPercentageRepeatDurationBase
    ValidationError:
      properties:
        loc:
          items:
            anyOf:
              - type: string
              - type: integer
          type: array
          title: Location
        msg:
          type: string
          title: Message
        type:
          type: string
          title: Error Type
        input:
          title: Input
        ctx:
          type: object
          title: Context
      type: object
      required:
        - loc
        - msg
        - type
      title: ValidationError
    ProductVisibility:
      type: string
      enum:
        - draft
        - private
        - public
      title: ProductVisibility
    SubscriptionRecurringInterval:
      type: string
      enum:
        - day
        - week
        - month
        - year
      title: SubscriptionRecurringInterval
    LegacyRecurringProductPrice:
      oneOf:
        - $ref: '#/components/schemas/LegacyRecurringProductPriceFixed'
        - $ref: '#/components/schemas/LegacyRecurringProductPriceCustom'
        - $ref: '#/components/schemas/LegacyRecurringProductPriceFree'
      discriminator:
        propertyName: amount_type
        mapping:
          custom:
            $ref: '#/components/schemas/LegacyRecurringProductPriceCustom'
          fixed:
            $ref: '#/components/schemas/LegacyRecurringProductPriceFixed'
          free:
            $ref: '#/components/schemas/LegacyRecurringProductPriceFree'
    ProductPrice:
      oneOf:
        - $ref: '#/components/schemas/ProductPriceFixed'
        - $ref: '#/components/schemas/ProductPriceCustom'
        - $ref: '#/components/schemas/ProductPriceFree'
        - $ref: '#/components/schemas/ProductPriceSeatBased'
        - $ref: '#/components/schemas/ProductPriceMeteredUnit'
      discriminator:
        propertyName: amount_type
        mapping:
          custom:
            $ref: '#/components/schemas/ProductPriceCustom'
          fixed:
            $ref: '#/components/schemas/ProductPriceFixed'
          free:
            $ref: '#/components/schemas/ProductPriceFree'
          metered_unit:
            $ref: '#/components/schemas/ProductPriceMeteredUnit'
          seat_based:
            $ref: '#/components/schemas/ProductPriceSeatBased'
    BenefitPublic:
      properties:
        id:
          type: string
          format: uuid4
          title: Id
          description: The ID of the benefit.
        created_at:
          type: string
          format: date-time
          title: Created At
          description: Creation timestamp of the object.
        modified_at:
          anyOf:
            - type: string
              format: date-time
            - type: 'null'
          title: Modified At
          description: Last modification timestamp of the object.
        type:
          $ref: '#/components/schemas/BenefitType'
          description: The type of the benefit.
        description:
          type: string
          title: Description
          description: The description of the benefit.
        selectable:
          type: boolean
          title: Selectable
          description: Whether the benefit is selectable when creating a product.
        deletable:
          type: boolean
          title: Deletable
          description: Whether the benefit is deletable.
        organization_id:
          type: string
          format: uuid4
          title: Organization Id
          description: The ID of the organization owning the benefit.
      type: object
      required:
        - id
        - created_at
        - modified_at
        - type
        - description
        - selectable
        - deletable
        - organization_id
      title: BenefitPublic
    ProductMediaFileRead:
      properties:
        id:
          type: string
          format: uuid4
          title: Id
          description: The ID of the object.
        organization_id:
          type: string
          format: uuid4
          title: Organization Id
        name:
          type: string
          title: Name
        path:
          type: string
          title: Path
        mime_type:
          type: string
          title: Mime Type
        size:
          type: integer
          title: Size
        storage_version:
          anyOf:
            - type: string
            - type: 'null'
          title: Storage Version
        checksum_etag:
          anyOf:
            - type: string
            - type: 'null'
          title: Checksum Etag
        checksum_sha256_base64:
          anyOf:
            - type: string
            - type: 'null'
          title: Checksum Sha256 Base64
        checksum_sha256_hex:
          anyOf:
            - type: string
            - type: 'null'
          title: Checksum Sha256 Hex
        last_modified_at:
          anyOf:
            - type: string
              format: date-time
            - type: 'null'
          title: Last Modified At
        version:
          anyOf:
            - type: string
            - type: 'null'
          title: Version
        service:
          type: string
          const: product_media
          title: Service
        is_uploaded:
          type: boolean
          title: Is Uploaded
        created_at:
          type: string
          format: date-time
          title: Created At
        size_readable:
          type: string
          title: Size Readable
        public_url:
          type: string
          title: Public Url
      type: object
      required:
        - id
        - organization_id
        - name
        - path
        - mime_type
        - size
        - storage_version
        - checksum_etag
        - checksum_sha256_base64
        - checksum_sha256_hex
        - last_modified_at
        - version
        - service
        - is_uploaded
        - created_at
        - size_readable
        - public_url
      title: ProductMediaFileRead
      description: File to be used as a product media file.
    DiscountDuration:
      type: string
      enum:
        - once
        - forever
        - repeating
      title: DiscountDuration
    DiscountType:
      type: string
      enum:
        - fixed
        - percentage
      title: DiscountType
    LegacyRecurringProductPriceFixed:
      properties:
        created_at:
          type: string
          format: date-time
          title: Created At
          description: Creation timestamp of the object.
        modified_at:
          anyOf:
            - type: string
              format: date-time
            - type: 'null'
          title: Modified At
          description: Last modification timestamp of the object.
        id:
          type: string
          format: uuid4
          title: Id
          description: The ID of the price.
        source:
          $ref: '#/components/schemas/ProductPriceSource'
          description: >-
            The source of the price . `catalog` is a predefined price, while
            `ad_hoc` is a price created dynamically on a Checkout session.
        amount_type:
          type: string
          const: fixed
          title: Amount Type
        price_currency:
          type: string
          title: Price Currency
          description: The currency in which the customer will be charged.
        is_archived:
          type: boolean
          title: Is Archived
          description: Whether the price is archived and no longer available.
        product_id:
          type: string
          format: uuid4
          title: Product Id
          description: The ID of the product owning the price.
        type:
          type: string
          const: recurring
          title: Type
          description: The type of the price.
        recurring_interval:
          $ref: '#/components/schemas/SubscriptionRecurringInterval'
          description: The recurring interval of the price.
        price_amount:
          type: integer
          title: Price Amount
          description: The price in cents.
        legacy:
          type: boolean
          const: true
          title: Legacy
      type: object
      required:
        - created_at
        - modified_at
        - id
        - source
        - amount_type
        - price_currency
        - is_archived
        - product_id
        - type
        - recurring_interval
        - price_amount
        - legacy
      title: LegacyRecurringProductPriceFixed
      description: >-
        A recurring price for a product, i.e. a subscription.


        **Deprecated**: The recurring interval should be set on the product
        itself.
    LegacyRecurringProductPriceCustom:
      properties:
        created_at:
          type: string
          format: date-time
          title: Created At
          description: Creation timestamp of the object.
        modified_at:
          anyOf:
            - type: string
              format: date-time
            - type: 'null'
          title: Modified At
          description: Last modification timestamp of the object.
        id:
          type: string
          format: uuid4
          title: Id
          description: The ID of the price.
        source:
          $ref: '#/components/schemas/ProductPriceSource'
          description: >-
            The source of the price . `catalog` is a predefined price, while
            `ad_hoc` is a price created dynamically on a Checkout session.
        amount_type:
          type: string
          const: custom
          title: Amount Type
        price_currency:
          type: string
          title: Price Currency
          description: The currency in which the customer will be charged.
        is_archived:
          type: boolean
          title: Is Archived
          description: Whether the price is archived and no longer available.
        product_id:
          type: string
          format: uuid4
          title: Product Id
          description: The ID of the product owning the price.
        type:
          type: string
          const: recurring
          title: Type
          description: The type of the price.
        recurring_interval:
          $ref: '#/components/schemas/SubscriptionRecurringInterval'
          description: The recurring interval of the price.
        minimum_amount:
          type: integer
          title: Minimum Amount
          description: >-
            The minimum amount the customer can pay. If 0, the price is 'free or
            pay what you want'. Defaults to 50 cents.
        maximum_amount:
          anyOf:
            - type: integer
            - type: 'null'
          title: Maximum Amount
          description: The maximum amount the customer can pay.
        preset_amount:
          anyOf:
            - type: integer
            - type: 'null'
          title: Preset Amount
          description: The initial amount shown to the customer.
        legacy:
          type: boolean
          const: true
          title: Legacy
      type: object
      required:
        - created_at
        - modified_at
        - id
        - source
        - amount_type
        - price_currency
        - is_archived
        - product_id
        - type
        - recurring_interval
        - minimum_amount
        - maximum_amount
        - preset_amount
        - legacy
      title: LegacyRecurringProductPriceCustom
      description: >-
        A pay-what-you-want recurring price for a product, i.e. a subscription.


        **Deprecated**: The recurring interval should be set on the product
        itself.
    LegacyRecurringProductPriceFree:
      properties:
        created_at:
          type: string
          format: date-time
          title: Created At
          description: Creation timestamp of the object.
        modified_at:
          anyOf:
            - type: string
              format: date-time
            - type: 'null'
          title: Modified At
          description: Last modification timestamp of the object.
        id:
          type: string
          format: uuid4
          title: Id
          description: The ID of the price.
        source:
          $ref: '#/components/schemas/ProductPriceSource'
          description: >-
            The source of the price . `catalog` is a predefined price, while
            `ad_hoc` is a price created dynamically on a Checkout session.
        amount_type:
          type: string
          const: free
          title: Amount Type
        price_currency:
          type: string
          title: Price Currency
          description: The currency in which the customer will be charged.
        is_archived:
          type: boolean
          title: Is Archived
          description: Whether the price is archived and no longer available.
        product_id:
          type: string
          format: uuid4
          title: Product Id
          description: The ID of the product owning the price.
        type:
          type: string
          const: recurring
          title: Type
          description: The type of the price.
        recurring_interval:
          $ref: '#/components/schemas/SubscriptionRecurringInterval'
          description: The recurring interval of the price.
        legacy:
          type: boolean
          const: true
          title: Legacy
      type: object
      required:
        - created_at
        - modified_at
        - id
        - source
        - amount_type
        - price_currency
        - is_archived
        - product_id
        - type
        - recurring_interval
        - legacy
      title: LegacyRecurringProductPriceFree
      description: >-
        A free recurring price for a product, i.e. a subscription.


        **Deprecated**: The recurring interval should be set on the product
        itself.
    ProductPriceFixed:
      properties:
        created_at:
          type: string
          format: date-time
          title: Created At
          description: Creation timestamp of the object.
        modified_at:
          anyOf:
            - type: string
              format: date-time
            - type: 'null'
          title: Modified At
          description: Last modification timestamp of the object.
        id:
          type: string
          format: uuid4
          title: Id
          description: The ID of the price.
        source:
          $ref: '#/components/schemas/ProductPriceSource'
          description: >-
            The source of the price . `catalog` is a predefined price, while
            `ad_hoc` is a price created dynamically on a Checkout session.
        amount_type:
          type: string
          const: fixed
          title: Amount Type
        price_currency:
          type: string
          title: Price Currency
          description: The currency in which the customer will be charged.
        is_archived:
          type: boolean
          title: Is Archived
          description: Whether the price is archived and no longer available.
        product_id:
          type: string
          format: uuid4
          title: Product Id
          description: The ID of the product owning the price.
        price_amount:
          type: integer
          title: Price Amount
          description: The price in cents.
      type: object
      required:
        - created_at
        - modified_at
        - id
        - source
        - amount_type
        - price_currency
        - is_archived
        - product_id
        - price_amount
      title: ProductPriceFixed
      description: A fixed price for a product.
    ProductPriceCustom:
      properties:
        created_at:
          type: string
          format: date-time
          title: Created At
          description: Creation timestamp of the object.
        modified_at:
          anyOf:
            - type: string
              format: date-time
            - type: 'null'
          title: Modified At
          description: Last modification timestamp of the object.
        id:
          type: string
          format: uuid4
          title: Id
          description: The ID of the price.
        source:
          $ref: '#/components/schemas/ProductPriceSource'
          description: >-
            The source of the price . `catalog` is a predefined price, while
            `ad_hoc` is a price created dynamically on a Checkout session.
        amount_type:
          type: string
          const: custom
          title: Amount Type
        price_currency:
          type: string
          title: Price Currency
          description: The currency in which the customer will be charged.
        is_archived:
          type: boolean
          title: Is Archived
          description: Whether the price is archived and no longer available.
        product_id:
          type: string
          format: uuid4
          title: Product Id
          description: The ID of the product owning the price.
        minimum_amount:
          type: integer
          title: Minimum Amount
          description: >-
            The minimum amount the customer can pay. If 0, the price is 'free or
            pay what you want'. Defaults to 50 cents.
        maximum_amount:
          anyOf:
            - type: integer
            - type: 'null'
          title: Maximum Amount
          description: The maximum amount the customer can pay.
        preset_amount:
          anyOf:
            - type: integer
            - type: 'null'
          title: Preset Amount
          description: The initial amount shown to the customer.
      type: object
      required:
        - created_at
        - modified_at
        - id
        - source
        - amount_type
        - price_currency
        - is_archived
        - product_id
        - minimum_amount
        - maximum_amount
        - preset_amount
      title: ProductPriceCustom
      description: A pay-what-you-want price for a product.
    ProductPriceFree:
      properties:
        created_at:
          type: string
          format: date-time
          title: Created At
          description: Creation timestamp of the object.
        modified_at:
          anyOf:
            - type: string
              format: date-time
            - type: 'null'
          title: Modified At
          description: Last modification timestamp of the object.
        id:
          type: string
          format: uuid4
          title: Id
          description: The ID of the price.
        source:
          $ref: '#/components/schemas/ProductPriceSource'
          description: >-
            The source of the price . `catalog` is a predefined price, while
            `ad_hoc` is a price created dynamically on a Checkout session.
        amount_type:
          type: string
          const: free
          title: Amount Type
        price_currency:
          type: string
          title: Price Currency
          description: The currency in which the customer will be charged.
        is_archived:
          type: boolean
          title: Is Archived
          description: Whether the price is archived and no longer available.
        product_id:
          type: string
          format: uuid4
          title: Product Id
          description: The ID of the product owning the price.
      type: object
      required:
        - created_at
        - modified_at
        - id
        - source
        - amount_type
        - price_currency
        - is_archived
        - product_id
      title: ProductPriceFree
      description: A free price for a product.
    ProductPriceSeatBased:
      properties:
        created_at:
          type: string
          format: date-time
          title: Created At
          description: Creation timestamp of the object.
        modified_at:
          anyOf:
            - type: string
              format: date-time
            - type: 'null'
          title: Modified At
          description: Last modification timestamp of the object.
        id:
          type: string
          format: uuid4
          title: Id
          description: The ID of the price.
        source:
          $ref: '#/components/schemas/ProductPriceSource'
          description: >-
            The source of the price . `catalog` is a predefined price, while
            `ad_hoc` is a price created dynamically on a Checkout session.
        amount_type:
          type: string
          const: seat_based
          title: Amount Type
        price_currency:
          type: string
          title: Price Currency
          description: The currency in which the customer will be charged.
        is_archived:
          type: boolean
          title: Is Archived
          description: Whether the price is archived and no longer available.
        product_id:
          type: string
          format: uuid4
          title: Product Id
          description: The ID of the product owning the price.
        seat_tiers:
          $ref: '#/components/schemas/ProductPriceSeatTiers-Output'
          description: Tiered pricing based on seat quantity
      type: object
      required:
        - created_at
        - modified_at
        - id
        - source
        - amount_type
        - price_currency
        - is_archived
        - product_id
        - seat_tiers
      title: ProductPriceSeatBased
      description: A seat-based price for a product.
    ProductPriceMeteredUnit:
      properties:
        created_at:
          type: string
          format: date-time
          title: Created At
          description: Creation timestamp of the object.
        modified_at:
          anyOf:
            - type: string
              format: date-time
            - type: 'null'
          title: Modified At
          description: Last modification timestamp of the object.
        id:
          type: string
          format: uuid4
          title: Id
          description: The ID of the price.
        source:
          $ref: '#/components/schemas/ProductPriceSource'
          description: >-
            The source of the price . `catalog` is a predefined price, while
            `ad_hoc` is a price created dynamically on a Checkout session.
        amount_type:
          type: string
          const: metered_unit
          title: Amount Type
        price_currency:
          type: string
          title: Price Currency
          description: The currency in which the customer will be charged.
        is_archived:
          type: boolean
          title: Is Archived
          description: Whether the price is archived and no longer available.
        product_id:
          type: string
          format: uuid4
          title: Product Id
          description: The ID of the product owning the price.
        unit_amount:
          type: string
          pattern: ^(?!^[-+.]*$)[+-]?0*\d*\.?\d*$
          title: Unit Amount
          description: The price per unit in cents.
        cap_amount:
          anyOf:
            - type: integer
            - type: 'null'
          title: Cap Amount
          description: >-
            The maximum amount in cents that can be charged, regardless of the
            number of units consumed.
        meter_id:
          type: string
          format: uuid4
          title: Meter Id
          description: The ID of the meter associated to the price.
        meter:
          $ref: '#/components/schemas/ProductPriceMeter'
          description: The meter associated to the price.
      type: object
      required:
        - created_at
        - modified_at
        - id
        - source
        - amount_type
        - price_currency
        - is_archived
        - product_id
        - unit_amount
        - cap_amount
        - meter_id
        - meter
      title: ProductPriceMeteredUnit
      description: A metered, usage-based, price for a product, with a fixed unit price.
    BenefitType:
      type: string
      enum:
        - custom
        - discord
        - github_repository
        - downloadables
        - license_keys
        - meter_credit
        - feature_flag
      title: BenefitType
    ProductPriceSource:
      type: string
      enum:
        - catalog
        - ad_hoc
      title: ProductPriceSource
    ProductPriceSeatTiers-Output:
      properties:
        tiers:
          items:
            $ref: '#/components/schemas/ProductPriceSeatTier'
          type: array
          minItems: 1
          title: Tiers
          description: List of pricing tiers
        minimum_seats:
          type: integer
          title: Minimum Seats
          description: >-
            Minimum number of seats required for purchase, derived from first
            tier.
        maximum_seats:
          anyOf:
            - type: integer
            - type: 'null'
          title: Maximum Seats
          description: >-
            Maximum number of seats allowed for purchase, derived from last
            tier. None for unlimited.
      type: object
      required:
        - tiers
        - minimum_seats
        - maximum_seats
      title: ProductPriceSeatTiers
      description: |-
        List of pricing tiers for seat-based pricing.

        The minimum and maximum seat limits are derived from the tiers:
        - minimum_seats = first tier's min_seats
        - maximum_seats = last tier's max_seats (None for unlimited)
    ProductPriceMeter:
      properties:
        id:
          type: string
          format: uuid4
          title: Id
          description: The ID of the object.
        name:
          type: string
          title: Name
          description: The name of the meter.
      type: object
      required:
        - id
        - name
      title: ProductPriceMeter
      description: A meter associated to a metered price.
    ProductPriceSeatTier:
      properties:
        min_seats:
          type: integer
          minimum: 1
          title: Min Seats
          description: Minimum number of seats (inclusive)
        max_seats:
          anyOf:
            - type: integer
              minimum: 1
            - type: 'null'
          title: Max Seats
          description: Maximum number of seats (inclusive). None for unlimited.
        price_per_seat:
          type: integer
          maximum: 99999999
          minimum: 0
          title: Price Per Seat
          description: Price per seat in cents for this tier
      type: object
      required:
        - min_seats
        - price_per_seat
      title: ProductPriceSeatTier
      description: A pricing tier for seat-based pricing.
  securitySchemes:
    access_token:
      type: http
      scheme: bearer
      description: >-
        You can generate an **Organization Access Token** from your
        organization's settings.

````