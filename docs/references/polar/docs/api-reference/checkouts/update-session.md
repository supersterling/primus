> ## Documentation Index
> Fetch the complete documentation index at: https://polar.sh/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Update Checkout Session

> Update a checkout session.

**Scopes**: `checkouts:write`



## OpenAPI

````yaml patch /v1/checkouts/{id}
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
  /v1/checkouts/{id}:
    patch:
      tags:
        - checkouts
        - public
      summary: Update Checkout Session
      description: |-
        Update a checkout session.

        **Scopes**: `checkouts:write`
      operationId: checkouts:update
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
            format: uuid4
            description: The checkout session ID.
            title: Id
          description: The checkout session ID.
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CheckoutUpdate'
      responses:
        '200':
          description: Checkout session updated.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Checkout'
        '403':
          description: >-
            The checkout is expired, the customer already has an active
            subscription, or the organization is not ready to accept payments.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/CheckoutForbiddenError'
        '404':
          description: Checkout session not found.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ResourceNotFound'
        '422':
          description: Validation Error
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/HTTPValidationError'
      x-codeSamples:
        - lang: go
          label: Go (SDK)
          source: "package main\n\nimport(\n\t\"context\"\n\t\"os\"\n\tpolargo \"github.com/polarsource/polar-go\"\n\t\"github.com/polarsource/polar-go/models/components\"\n\t\"log\"\n)\n\nfunc main() {\n    ctx := context.Background()\n\n    s := polargo.New(\n        polargo.WithSecurity(os.Getenv(\"POLAR_ACCESS_TOKEN\")),\n    )\n\n    res, err := s.Checkouts.Update(ctx, \"<value>\", components.CheckoutUpdate{\n        CustomerName: polargo.Pointer(\"John Doe\"),\n        CustomerBillingAddress: &components.AddressInput{\n            Country: components.CountryAlpha2InputUs,\n        },\n        Locale: polargo.Pointer(\"en\"),\n    })\n    if err != nil {\n        log.Fatal(err)\n    }\n    if res.Checkout != nil {\n        switch res.Checkout.Discount.Type {\n            case components.CheckoutDiscountTypeCheckoutDiscountFixedOnceForeverDuration:\n                // res.Checkout.Discount.CheckoutDiscountFixedOnceForeverDuration is populated\n            case components.CheckoutDiscountTypeCheckoutDiscountFixedRepeatDuration:\n                // res.Checkout.Discount.CheckoutDiscountFixedRepeatDuration is populated\n            case components.CheckoutDiscountTypeCheckoutDiscountPercentageOnceForeverDuration:\n                // res.Checkout.Discount.CheckoutDiscountPercentageOnceForeverDuration is populated\n            case components.CheckoutDiscountTypeCheckoutDiscountPercentageRepeatDuration:\n                // res.Checkout.Discount.CheckoutDiscountPercentageRepeatDuration is populated\n        }\n\n    }\n}"
        - lang: python
          label: Python (SDK)
          source: |-
            import polar_sdk
            from polar_sdk import Polar


            with Polar(
                access_token="<YOUR_BEARER_TOKEN_HERE>",
            ) as polar:

                res = polar.checkouts.update(id="<value>", checkout_update={
                    "customer_name": "John Doe",
                    "customer_billing_address": {
                        "country": polar_sdk.CountryAlpha2Input.US,
                    },
                    "locale": "en",
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
              const result = await polar.checkouts.update({
                id: "<value>",
                checkoutUpdate: {
                  customerName: "John Doe",
                  customerBillingAddress: {
                    country: "US",
                  },
                  locale: "en",
                },
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

            $checkoutUpdate = new Components\CheckoutUpdate(
                customerName: 'John Doe',
                customerBillingAddress: new Components\AddressInput(
                    country: Components\CountryAlpha2Input::Us,
                ),
                locale: 'en',
            );

            $response = $sdk->checkouts->update(
                id: '<value>',
                checkoutUpdate: $checkoutUpdate

            );

            if ($response->checkout !== null) {
                // handle response
            }
components:
  schemas:
    CheckoutUpdate:
      properties:
        custom_field_data:
          additionalProperties:
            anyOf:
              - type: string
              - type: integer
              - type: boolean
              - type: string
                format: date-time
              - type: 'null'
          type: object
          title: Custom Field Data
          description: Key-value object storing custom field values.
        product_id:
          anyOf:
            - type: string
              format: uuid4
            - type: 'null'
          title: Product Id
          description: >-
            ID of the product to checkout. Must be present in the checkout's
            product list.
        product_price_id:
          anyOf:
            - type: string
              format: uuid4
            - type: 'null'
          title: Product Price Id
          description: >-
            ID of the product price to checkout. Must correspond to a price
            present in the checkout's product list.
          deprecated: true
        amount:
          anyOf:
            - type: integer
              maximum: 99999999
              minimum: 0
              description: >-
                Amount in cents, before discounts and taxes. Only useful for
                custom prices, it'll be ignored for fixed and free prices. 
            - type: 'null'
          title: Amount
        seats:
          anyOf:
            - type: integer
              maximum: 1000
              minimum: 1
            - type: 'null'
          title: Seats
          description: Number of seats for seat-based pricing.
        is_business_customer:
          anyOf:
            - type: boolean
            - type: 'null'
          title: Is Business Customer
        customer_name:
          anyOf:
            - type: string
              maxLength: 256
              description: The name of the customer.
              examples:
                - John Doe
            - type: 'null'
          title: Customer Name
        customer_email:
          anyOf:
            - type: string
              format: email
              description: Email address of the customer.
            - type: 'null'
          title: Customer Email
        customer_billing_name:
          anyOf:
            - type: string
            - type: 'null'
          title: Customer Billing Name
        customer_billing_address:
          anyOf:
            - $ref: '#/components/schemas/AddressInput'
              description: Billing address of the customer.
            - type: 'null'
        customer_tax_id:
          anyOf:
            - type: string
            - type: 'null'
          title: Customer Tax Id
        locale:
          anyOf:
            - type: string
              pattern: ^[a-zA-Z]{2,3}(-[a-zA-Z]{2}|-[0-9]{3})?$
              description: >-
                Locale of the customer, given as an IETF BCP 47 language tag.
                Supported: language code (e.g. `en`) or language + region (e.g.
                `en-US`). If `null` or unsupported, the locale will default to
                `en-US`.
              examples:
                - en
                - en-US
                - fr
                - fr-CA
            - type: 'null'
          title: Locale
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
        currency:
          anyOf:
            - $ref: '#/components/schemas/PresentmentCurrency'
              maxLength: 3
              minLength: 3
            - type: 'null'
        discount_id:
          anyOf:
            - type: string
              format: uuid4
            - type: 'null'
          title: Discount Id
          description: ID of the discount to apply to the checkout.
        allow_discount_codes:
          anyOf:
            - type: boolean
            - type: 'null'
          title: Allow Discount Codes
          description: >-
            Whether to allow the customer to apply discount codes. If you apply
            a discount through `discount_id`, it'll still be applied, but the
            customer won't be able to change it.
        require_billing_address:
          anyOf:
            - type: boolean
            - type: 'null'
          title: Require Billing Address
          description: >-
            Whether to require the customer to fill their full billing address,
            instead of just the country. Customers in the US will always be
            required to fill their full address, regardless of this setting. If
            you preset the billing address, this setting will be automatically
            set to `true`.
        allow_trial:
          anyOf:
            - type: boolean
            - type: 'null'
          title: Allow Trial
          description: >-
            Whether to enable the trial period for the checkout session. If
            `false`, the trial period will be disabled, even if the selected
            product has a trial configured.
        customer_ip_address:
          anyOf:
            - type: string
              format: ipvanyaddress
            - type: 'null'
          title: Customer Ip Address
        customer_metadata:
          anyOf:
            - additionalProperties:
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
              description: >-
                Key-value object allowing you to store additional information.


                The key must be a string with a maximum length of **40
                characters**.

                The value must be either:


                * A string with a maximum length of **500 characters**

                * An integer

                * A floating-point number

                * A boolean


                You can store up to **50 key-value pairs**.
            - type: 'null'
          title: Customer Metadata
          description: >-
            Key-value object allowing you to store additional information
            that'll be copied to the created customer.


            The key must be a string with a maximum length of **40 characters**.

            The value must be either:


            * A string with a maximum length of **500 characters**

            * An integer

            * A floating-point number

            * A boolean


            You can store up to **50 key-value pairs**.
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
        embed_origin:
          anyOf:
            - type: string
            - type: 'null'
          title: Embed Origin
          description: >-
            If you plan to embed the checkout session, set this to the Origin of
            the embedding page. It'll allow the Polar iframe to communicate with
            the parent page.
      type: object
      title: CheckoutUpdate
      description: Update an existing checkout session using an access token.
    Checkout:
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
        custom_field_data:
          additionalProperties:
            anyOf:
              - type: string
              - type: integer
              - type: boolean
              - type: string
                format: date-time
              - type: 'null'
          type: object
          title: Custom Field Data
          description: Key-value object storing custom field values.
        payment_processor:
          $ref: '#/components/schemas/PaymentProcessor'
          description: Payment processor used.
        status:
          $ref: '#/components/schemas/CheckoutStatus'
          description: |2-

                    Status of the checkout session.

                    - Open: the checkout session was opened.
                    - Expired: the checkout session was expired and is no more accessible.
                    - Confirmed: the user on the checkout session clicked Pay. This is not indicative of the payment's success status.
                    - Failed: the checkout definitely failed for technical reasons and cannot be retried. In most cases, this state is never reached.
                    - Succeeded: the payment on the checkout was performed successfully.
                    
        client_secret:
          type: string
          title: Client Secret
          description: >-
            Client secret used to update and complete the checkout session from
            the client.
        url:
          type: string
          title: Url
          description: URL where the customer can access the checkout session.
        expires_at:
          type: string
          format: date-time
          title: Expires At
          description: Expiration date and time of the checkout session.
        success_url:
          type: string
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
        embed_origin:
          anyOf:
            - type: string
            - type: 'null'
          title: Embed Origin
          description: >-
            When checkout is embedded, represents the Origin of the page
            embedding the checkout. Used as a security measure to send messages
            only to the embedding page.
        amount:
          type: integer
          title: Amount
          description: Amount in cents, before discounts and taxes.
        seats:
          anyOf:
            - type: integer
            - type: 'null'
          title: Seats
          description: Predefined number of seats (works with seat-based pricing only)
        min_seats:
          anyOf:
            - type: integer
            - type: 'null'
          title: Min Seats
          description: Minimum number of seats (works with seat-based pricing only)
        max_seats:
          anyOf:
            - type: integer
            - type: 'null'
          title: Max Seats
          description: Maximum number of seats (works with seat-based pricing only)
        price_per_seat:
          anyOf:
            - type: integer
            - type: 'null'
          title: Price Per Seat
          description: >-
            Price per seat in cents for the current seat count, based on the
            applicable tier. Only relevant for seat-based pricing.
        discount_amount:
          type: integer
          title: Discount Amount
          description: Discount amount in cents.
        net_amount:
          type: integer
          title: Net Amount
          description: Amount in cents, after discounts but before taxes.
        tax_amount:
          anyOf:
            - type: integer
            - type: 'null'
          title: Tax Amount
          description: >-
            Sales tax amount in cents. If `null`, it means there is no enough
            information yet to calculate it.
        total_amount:
          type: integer
          title: Total Amount
          description: Amount in cents, after discounts and taxes.
        currency:
          type: string
          title: Currency
          description: Currency code of the checkout session.
        allow_trial:
          anyOf:
            - type: boolean
            - type: 'null'
          title: Allow Trial
          description: >-
            Whether to enable the trial period for the checkout session. If
            `false`, the trial period will be disabled, even if the selected
            product has a trial configured.
        active_trial_interval:
          anyOf:
            - $ref: '#/components/schemas/TrialInterval'
            - type: 'null'
          description: >-
            Interval unit of the trial period, if any. This value is either set
            from the checkout, if `trial_interval` is set, or from the selected
            product.
        active_trial_interval_count:
          anyOf:
            - type: integer
            - type: 'null'
          title: Active Trial Interval Count
          description: >-
            Number of interval units of the trial period, if any. This value is
            either set from the checkout, if `trial_interval_count` is set, or
            from the selected product.
        trial_end:
          anyOf:
            - type: string
              format: date-time
            - type: 'null'
          title: Trial End
          description: End date and time of the trial period, if any.
        organization_id:
          type: string
          format: uuid4
          title: Organization Id
          description: ID of the organization owning the checkout session.
        product_id:
          anyOf:
            - type: string
              format: uuid4
            - type: 'null'
          title: Product Id
          description: ID of the product to checkout.
        product_price_id:
          anyOf:
            - type: string
              format: uuid4
            - type: 'null'
          title: Product Price Id
          description: ID of the product price to checkout.
          deprecated: true
        discount_id:
          anyOf:
            - type: string
              format: uuid4
            - type: 'null'
          title: Discount Id
          description: ID of the discount applied to the checkout.
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
            required to fill their full address, regardless of this setting. If
            you preset the billing address, this setting will be automatically
            set to `true`.
        is_discount_applicable:
          type: boolean
          title: Is Discount Applicable
          description: >-
            Whether the discount is applicable to the checkout. Typically, free
            and custom prices are not discountable.
        is_free_product_price:
          type: boolean
          title: Is Free Product Price
          description: Whether the product price is free, regardless of discounts.
        is_payment_required:
          type: boolean
          title: Is Payment Required
          description: >-
            Whether the checkout requires payment, e.g. in case of free products
            or discounts that cover the total amount.
        is_payment_setup_required:
          type: boolean
          title: Is Payment Setup Required
          description: >-
            Whether the checkout requires setting up a payment method,
            regardless of the amount, e.g. subscriptions that have first free
            cycles.
        is_payment_form_required:
          type: boolean
          title: Is Payment Form Required
          description: >-
            Whether the checkout requires a payment form, whether because of a
            payment or payment method setup.
        customer_id:
          anyOf:
            - type: string
              format: uuid4
            - type: 'null'
          title: Customer Id
        is_business_customer:
          type: boolean
          title: Is Business Customer
          description: >-
            Whether the customer is a business or an individual. If `true`, the
            customer will be required to fill their full billing address and
            billing name.
        customer_name:
          anyOf:
            - type: string
            - type: 'null'
          title: Customer Name
          description: Name of the customer.
        customer_email:
          anyOf:
            - type: string
            - type: 'null'
          title: Customer Email
          description: Email address of the customer.
        customer_ip_address:
          anyOf:
            - type: string
              format: ipvanyaddress
            - type: 'null'
          title: Customer Ip Address
        customer_billing_name:
          anyOf:
            - type: string
            - type: 'null'
          title: Customer Billing Name
        customer_billing_address:
          anyOf:
            - $ref: '#/components/schemas/Address'
              description: Billing address of the customer.
            - type: 'null'
        customer_tax_id:
          anyOf:
            - type: string
            - type: 'null'
          title: Customer Tax Id
        locale:
          anyOf:
            - type: string
            - type: 'null'
          title: Locale
        payment_processor_metadata:
          additionalProperties:
            type: string
          type: object
          title: Payment Processor Metadata
        billing_address_fields:
          $ref: '#/components/schemas/CheckoutBillingAddressFields'
          description: >-
            Determine which billing address fields should be disabled, optional
            or required in the checkout form.
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
        external_customer_id:
          anyOf:
            - type: string
            - type: 'null'
          title: External Customer Id
          description: >-
            ID of the customer in your system. If a matching customer exists on
            Polar, the resulting order will be linked to this customer.
            Otherwise, a new customer will be created with this external ID set.
        products:
          items:
            $ref: '#/components/schemas/CheckoutProduct'
          type: array
          title: Products
          description: List of products available to select.
        product:
          anyOf:
            - $ref: '#/components/schemas/CheckoutProduct'
            - type: 'null'
          description: Product selected to checkout.
        product_price:
          anyOf:
            - oneOf:
                - $ref: '#/components/schemas/LegacyRecurringProductPrice'
                - $ref: '#/components/schemas/ProductPrice'
            - type: 'null'
          title: Product Price
          description: Price of the selected product.
          deprecated: true
        prices:
          anyOf:
            - additionalProperties:
                items:
                  oneOf:
                    - $ref: '#/components/schemas/LegacyRecurringProductPrice'
                    - $ref: '#/components/schemas/ProductPrice'
                type: array
                description: List of prices for this product.
              propertyNames:
                format: uuid4
              type: object
            - type: 'null'
          title: Prices
          description: Mapping of product IDs to their list of prices.
        discount:
          anyOf:
            - oneOf:
                - $ref: >-
                    #/components/schemas/CheckoutDiscountFixedOnceForeverDuration
                - $ref: '#/components/schemas/CheckoutDiscountFixedRepeatDuration'
                - $ref: >-
                    #/components/schemas/CheckoutDiscountPercentageOnceForeverDuration
                - $ref: >-
                    #/components/schemas/CheckoutDiscountPercentageRepeatDuration
            - type: 'null'
          title: Discount
        subscription_id:
          anyOf:
            - type: string
              format: uuid4
            - type: 'null'
          title: Subscription Id
        attached_custom_fields:
          anyOf:
            - items:
                $ref: '#/components/schemas/AttachedCustomField'
              type: array
            - type: 'null'
          title: Attached Custom Fields
        customer_metadata:
          additionalProperties:
            anyOf:
              - type: string
              - type: integer
              - type: boolean
          type: object
          title: Customer Metadata
      type: object
      required:
        - id
        - created_at
        - modified_at
        - payment_processor
        - status
        - client_secret
        - url
        - expires_at
        - success_url
        - return_url
        - embed_origin
        - amount
        - discount_amount
        - net_amount
        - tax_amount
        - total_amount
        - currency
        - allow_trial
        - active_trial_interval
        - active_trial_interval_count
        - trial_end
        - organization_id
        - product_id
        - product_price_id
        - discount_id
        - allow_discount_codes
        - require_billing_address
        - is_discount_applicable
        - is_free_product_price
        - is_payment_required
        - is_payment_setup_required
        - is_payment_form_required
        - customer_id
        - is_business_customer
        - customer_name
        - customer_email
        - customer_ip_address
        - customer_billing_name
        - customer_billing_address
        - customer_tax_id
        - payment_processor_metadata
        - billing_address_fields
        - trial_interval
        - trial_interval_count
        - metadata
        - external_customer_id
        - products
        - product
        - product_price
        - prices
        - discount
        - subscription_id
        - attached_custom_fields
        - customer_metadata
      title: Checkout
      description: Checkout session data retrieved using an access token.
    CheckoutForbiddenError:
      anyOf:
        - $ref: '#/components/schemas/AlreadyActiveSubscriptionError'
        - $ref: '#/components/schemas/NotOpenCheckout'
        - $ref: '#/components/schemas/PaymentNotReady'
        - $ref: '#/components/schemas/TrialAlreadyRedeemed'
    ResourceNotFound:
      properties:
        error:
          type: string
          const: ResourceNotFound
          title: Error
          examples:
            - ResourceNotFound
        detail:
          type: string
          title: Detail
      type: object
      required:
        - error
        - detail
      title: ResourceNotFound
    HTTPValidationError:
      properties:
        detail:
          items:
            $ref: '#/components/schemas/ValidationError'
          type: array
          title: Detail
      type: object
      title: HTTPValidationError
    AddressInput:
      properties:
        line1:
          anyOf:
            - type: string
            - type: 'null'
          title: Line1
        line2:
          anyOf:
            - type: string
            - type: 'null'
          title: Line2
        postal_code:
          anyOf:
            - type: string
            - type: 'null'
          title: Postal Code
        city:
          anyOf:
            - type: string
            - type: 'null'
          title: City
        state:
          anyOf:
            - type: string
            - type: 'null'
          title: State
        country:
          type: string
          enum:
            - AD
            - AE
            - AF
            - AG
            - AI
            - AL
            - AM
            - AO
            - AQ
            - AR
            - AS
            - AT
            - AU
            - AW
            - AX
            - AZ
            - BA
            - BB
            - BD
            - BE
            - BF
            - BG
            - BH
            - BI
            - BJ
            - BL
            - BM
            - BN
            - BO
            - BQ
            - BR
            - BS
            - BT
            - BV
            - BW
            - BY
            - BZ
            - CA
            - CC
            - CD
            - CF
            - CG
            - CH
            - CI
            - CK
            - CL
            - CM
            - CN
            - CO
            - CR
            - CV
            - CW
            - CX
            - CY
            - CZ
            - DE
            - DJ
            - DK
            - DM
            - DO
            - DZ
            - EC
            - EE
            - EG
            - EH
            - ER
            - ES
            - ET
            - FI
            - FJ
            - FK
            - FM
            - FO
            - FR
            - GA
            - GB
            - GD
            - GE
            - GF
            - GG
            - GH
            - GI
            - GL
            - GM
            - GN
            - GP
            - GQ
            - GR
            - GS
            - GT
            - GU
            - GW
            - GY
            - HK
            - HM
            - HN
            - HR
            - HT
            - HU
            - ID
            - IE
            - IL
            - IM
            - IN
            - IO
            - IQ
            - IS
            - IT
            - JE
            - JM
            - JO
            - JP
            - KE
            - KG
            - KH
            - KI
            - KM
            - KN
            - KR
            - KW
            - KY
            - KZ
            - LA
            - LB
            - LC
            - LI
            - LK
            - LR
            - LS
            - LT
            - LU
            - LV
            - LY
            - MA
            - MC
            - MD
            - ME
            - MF
            - MG
            - MH
            - MK
            - ML
            - MM
            - MN
            - MO
            - MP
            - MQ
            - MR
            - MS
            - MT
            - MU
            - MV
            - MW
            - MX
            - MY
            - MZ
            - NA
            - NC
            - NE
            - NF
            - NG
            - NI
            - NL
            - 'NO'
            - NP
            - NR
            - NU
            - NZ
            - OM
            - PA
            - PE
            - PF
            - PG
            - PH
            - PK
            - PL
            - PM
            - PN
            - PR
            - PS
            - PT
            - PW
            - PY
            - QA
            - RE
            - RO
            - RS
            - RW
            - SA
            - SB
            - SC
            - SD
            - SE
            - SG
            - SH
            - SI
            - SJ
            - SK
            - SL
            - SM
            - SN
            - SO
            - SR
            - SS
            - ST
            - SV
            - SX
            - SZ
            - TC
            - TD
            - TF
            - TG
            - TH
            - TJ
            - TK
            - TL
            - TM
            - TN
            - TO
            - TR
            - TT
            - TV
            - TW
            - TZ
            - UA
            - UG
            - UM
            - US
            - UY
            - UZ
            - VA
            - VC
            - VE
            - VG
            - VI
            - VN
            - VU
            - WF
            - WS
            - YE
            - YT
            - ZA
            - ZM
            - ZW
          title: CountryAlpha2Input
          examples:
            - US
            - SE
            - FR
          x-speakeasy-enums:
            - AD
            - AE
            - AF
            - AG
            - AI
            - AL
            - AM
            - AO
            - AQ
            - AR
            - AS
            - AT
            - AU
            - AW
            - AX
            - AZ
            - BA
            - BB
            - BD
            - BE
            - BF
            - BG
            - BH
            - BI
            - BJ
            - BL
            - BM
            - BN
            - BO
            - BQ
            - BR
            - BS
            - BT
            - BV
            - BW
            - BY
            - BZ
            - CA
            - CC
            - CD
            - CF
            - CG
            - CH
            - CI
            - CK
            - CL
            - CM
            - CN
            - CO
            - CR
            - CV
            - CW
            - CX
            - CY
            - CZ
            - DE
            - DJ
            - DK
            - DM
            - DO
            - DZ
            - EC
            - EE
            - EG
            - EH
            - ER
            - ES
            - ET
            - FI
            - FJ
            - FK
            - FM
            - FO
            - FR
            - GA
            - GB
            - GD
            - GE
            - GF
            - GG
            - GH
            - GI
            - GL
            - GM
            - GN
            - GP
            - GQ
            - GR
            - GS
            - GT
            - GU
            - GW
            - GY
            - HK
            - HM
            - HN
            - HR
            - HT
            - HU
            - ID
            - IE
            - IL
            - IM
            - IN
            - IO
            - IQ
            - IS
            - IT
            - JE
            - JM
            - JO
            - JP
            - KE
            - KG
            - KH
            - KI
            - KM
            - KN
            - KR
            - KW
            - KY
            - KZ
            - LA
            - LB
            - LC
            - LI
            - LK
            - LR
            - LS
            - LT
            - LU
            - LV
            - LY
            - MA
            - MC
            - MD
            - ME
            - MF
            - MG
            - MH
            - MK
            - ML
            - MM
            - MN
            - MO
            - MP
            - MQ
            - MR
            - MS
            - MT
            - MU
            - MV
            - MW
            - MX
            - MY
            - MZ
            - NA
            - NC
            - NE
            - NF
            - NG
            - NI
            - NL
            - 'NO'
            - NP
            - NR
            - NU
            - NZ
            - OM
            - PA
            - PE
            - PF
            - PG
            - PH
            - PK
            - PL
            - PM
            - PN
            - PR
            - PS
            - PT
            - PW
            - PY
            - QA
            - RE
            - RO
            - RS
            - RW
            - SA
            - SB
            - SC
            - SD
            - SE
            - SG
            - SH
            - SI
            - SJ
            - SK
            - SL
            - SM
            - SN
            - SO
            - SR
            - SS
            - ST
            - SV
            - SX
            - SZ
            - TC
            - TD
            - TF
            - TG
            - TH
            - TJ
            - TK
            - TL
            - TM
            - TN
            - TO
            - TR
            - TT
            - TV
            - TW
            - TZ
            - UA
            - UG
            - UM
            - US
            - UY
            - UZ
            - VA
            - VC
            - VE
            - VG
            - VI
            - VN
            - VU
            - WF
            - WS
            - YE
            - YT
            - ZA
            - ZM
            - ZW
      type: object
      required:
        - country
      title: AddressInput
    TrialInterval:
      type: string
      enum:
        - day
        - week
        - month
        - year
      title: TrialInterval
    PresentmentCurrency:
      type: string
      enum:
        - aud
        - brl
        - cad
        - chf
        - eur
        - inr
        - gbp
        - jpy
        - sek
        - usd
      title: PresentmentCurrency
    PaymentProcessor:
      type: string
      enum:
        - stripe
      title: PaymentProcessor
    CheckoutStatus:
      type: string
      enum:
        - open
        - expired
        - confirmed
        - succeeded
        - failed
      title: CheckoutStatus
    Address:
      properties:
        line1:
          anyOf:
            - type: string
            - type: 'null'
          title: Line1
        line2:
          anyOf:
            - type: string
            - type: 'null'
          title: Line2
        postal_code:
          anyOf:
            - type: string
            - type: 'null'
          title: Postal Code
        city:
          anyOf:
            - type: string
            - type: 'null'
          title: City
        state:
          anyOf:
            - type: string
            - type: 'null'
          title: State
        country:
          type: string
          enum:
            - AD
            - AE
            - AF
            - AG
            - AI
            - AL
            - AM
            - AO
            - AQ
            - AR
            - AS
            - AT
            - AU
            - AW
            - AX
            - AZ
            - BA
            - BB
            - BD
            - BE
            - BF
            - BG
            - BH
            - BI
            - BJ
            - BL
            - BM
            - BN
            - BO
            - BQ
            - BR
            - BS
            - BT
            - BV
            - BW
            - BY
            - BZ
            - CA
            - CC
            - CD
            - CF
            - CG
            - CH
            - CI
            - CK
            - CL
            - CM
            - CN
            - CO
            - CR
            - CU
            - CV
            - CW
            - CX
            - CY
            - CZ
            - DE
            - DJ
            - DK
            - DM
            - DO
            - DZ
            - EC
            - EE
            - EG
            - EH
            - ER
            - ES
            - ET
            - FI
            - FJ
            - FK
            - FM
            - FO
            - FR
            - GA
            - GB
            - GD
            - GE
            - GF
            - GG
            - GH
            - GI
            - GL
            - GM
            - GN
            - GP
            - GQ
            - GR
            - GS
            - GT
            - GU
            - GW
            - GY
            - HK
            - HM
            - HN
            - HR
            - HT
            - HU
            - ID
            - IE
            - IL
            - IM
            - IN
            - IO
            - IQ
            - IR
            - IS
            - IT
            - JE
            - JM
            - JO
            - JP
            - KE
            - KG
            - KH
            - KI
            - KM
            - KN
            - KP
            - KR
            - KW
            - KY
            - KZ
            - LA
            - LB
            - LC
            - LI
            - LK
            - LR
            - LS
            - LT
            - LU
            - LV
            - LY
            - MA
            - MC
            - MD
            - ME
            - MF
            - MG
            - MH
            - MK
            - ML
            - MM
            - MN
            - MO
            - MP
            - MQ
            - MR
            - MS
            - MT
            - MU
            - MV
            - MW
            - MX
            - MY
            - MZ
            - NA
            - NC
            - NE
            - NF
            - NG
            - NI
            - NL
            - 'NO'
            - NP
            - NR
            - NU
            - NZ
            - OM
            - PA
            - PE
            - PF
            - PG
            - PH
            - PK
            - PL
            - PM
            - PN
            - PR
            - PS
            - PT
            - PW
            - PY
            - QA
            - RE
            - RO
            - RS
            - RU
            - RW
            - SA
            - SB
            - SC
            - SD
            - SE
            - SG
            - SH
            - SI
            - SJ
            - SK
            - SL
            - SM
            - SN
            - SO
            - SR
            - SS
            - ST
            - SV
            - SX
            - SY
            - SZ
            - TC
            - TD
            - TF
            - TG
            - TH
            - TJ
            - TK
            - TL
            - TM
            - TN
            - TO
            - TR
            - TT
            - TV
            - TW
            - TZ
            - UA
            - UG
            - UM
            - US
            - UY
            - UZ
            - VA
            - VC
            - VE
            - VG
            - VI
            - VN
            - VU
            - WF
            - WS
            - YE
            - YT
            - ZA
            - ZM
            - ZW
          title: CountryAlpha2
          examples:
            - US
            - SE
            - FR
          x-speakeasy-enums:
            - AD
            - AE
            - AF
            - AG
            - AI
            - AL
            - AM
            - AO
            - AQ
            - AR
            - AS
            - AT
            - AU
            - AW
            - AX
            - AZ
            - BA
            - BB
            - BD
            - BE
            - BF
            - BG
            - BH
            - BI
            - BJ
            - BL
            - BM
            - BN
            - BO
            - BQ
            - BR
            - BS
            - BT
            - BV
            - BW
            - BY
            - BZ
            - CA
            - CC
            - CD
            - CF
            - CG
            - CH
            - CI
            - CK
            - CL
            - CM
            - CN
            - CO
            - CR
            - CU
            - CV
            - CW
            - CX
            - CY
            - CZ
            - DE
            - DJ
            - DK
            - DM
            - DO
            - DZ
            - EC
            - EE
            - EG
            - EH
            - ER
            - ES
            - ET
            - FI
            - FJ
            - FK
            - FM
            - FO
            - FR
            - GA
            - GB
            - GD
            - GE
            - GF
            - GG
            - GH
            - GI
            - GL
            - GM
            - GN
            - GP
            - GQ
            - GR
            - GS
            - GT
            - GU
            - GW
            - GY
            - HK
            - HM
            - HN
            - HR
            - HT
            - HU
            - ID
            - IE
            - IL
            - IM
            - IN
            - IO
            - IQ
            - IR
            - IS
            - IT
            - JE
            - JM
            - JO
            - JP
            - KE
            - KG
            - KH
            - KI
            - KM
            - KN
            - KP
            - KR
            - KW
            - KY
            - KZ
            - LA
            - LB
            - LC
            - LI
            - LK
            - LR
            - LS
            - LT
            - LU
            - LV
            - LY
            - MA
            - MC
            - MD
            - ME
            - MF
            - MG
            - MH
            - MK
            - ML
            - MM
            - MN
            - MO
            - MP
            - MQ
            - MR
            - MS
            - MT
            - MU
            - MV
            - MW
            - MX
            - MY
            - MZ
            - NA
            - NC
            - NE
            - NF
            - NG
            - NI
            - NL
            - 'NO'
            - NP
            - NR
            - NU
            - NZ
            - OM
            - PA
            - PE
            - PF
            - PG
            - PH
            - PK
            - PL
            - PM
            - PN
            - PR
            - PS
            - PT
            - PW
            - PY
            - QA
            - RE
            - RO
            - RS
            - RU
            - RW
            - SA
            - SB
            - SC
            - SD
            - SE
            - SG
            - SH
            - SI
            - SJ
            - SK
            - SL
            - SM
            - SN
            - SO
            - SR
            - SS
            - ST
            - SV
            - SX
            - SY
            - SZ
            - TC
            - TD
            - TF
            - TG
            - TH
            - TJ
            - TK
            - TL
            - TM
            - TN
            - TO
            - TR
            - TT
            - TV
            - TW
            - TZ
            - UA
            - UG
            - UM
            - US
            - UY
            - UZ
            - VA
            - VC
            - VE
            - VG
            - VI
            - VN
            - VU
            - WF
            - WS
            - YE
            - YT
            - ZA
            - ZM
            - ZW
      type: object
      required:
        - country
      title: Address
    CheckoutBillingAddressFields:
      properties:
        country:
          $ref: '#/components/schemas/BillingAddressFieldMode'
        state:
          $ref: '#/components/schemas/BillingAddressFieldMode'
        city:
          $ref: '#/components/schemas/BillingAddressFieldMode'
        postal_code:
          $ref: '#/components/schemas/BillingAddressFieldMode'
        line1:
          $ref: '#/components/schemas/BillingAddressFieldMode'
        line2:
          $ref: '#/components/schemas/BillingAddressFieldMode'
      type: object
      required:
        - country
        - state
        - city
        - postal_code
        - line1
        - line2
      title: CheckoutBillingAddressFields
    MetadataOutputType:
      additionalProperties:
        anyOf:
          - type: string
          - type: integer
          - type: number
          - type: boolean
      type: object
    CheckoutProduct:
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
      title: CheckoutProduct
      description: Product data for a checkout session.
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
    CheckoutDiscountFixedOnceForeverDuration:
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
        id:
          type: string
          format: uuid4
          title: Id
          description: The ID of the object.
        name:
          type: string
          title: Name
        code:
          anyOf:
            - type: string
            - type: 'null'
          title: Code
      type: object
      required:
        - duration
        - type
        - amount
        - currency
        - id
        - name
        - code
      title: CheckoutDiscountFixedOnceForeverDuration
      description: Schema for a fixed amount discount that is applied once or forever.
    CheckoutDiscountFixedRepeatDuration:
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
        id:
          type: string
          format: uuid4
          title: Id
          description: The ID of the object.
        name:
          type: string
          title: Name
        code:
          anyOf:
            - type: string
            - type: 'null'
          title: Code
      type: object
      required:
        - duration
        - duration_in_months
        - type
        - amount
        - currency
        - id
        - name
        - code
      title: CheckoutDiscountFixedRepeatDuration
      description: |-
        Schema for a fixed amount discount that is applied on every invoice
        for a certain number of months.
    CheckoutDiscountPercentageOnceForeverDuration:
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
        id:
          type: string
          format: uuid4
          title: Id
          description: The ID of the object.
        name:
          type: string
          title: Name
        code:
          anyOf:
            - type: string
            - type: 'null'
          title: Code
      type: object
      required:
        - duration
        - type
        - basis_points
        - id
        - name
        - code
      title: CheckoutDiscountPercentageOnceForeverDuration
      description: Schema for a percentage discount that is applied once or forever.
    CheckoutDiscountPercentageRepeatDuration:
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
        id:
          type: string
          format: uuid4
          title: Id
          description: The ID of the object.
        name:
          type: string
          title: Name
        code:
          anyOf:
            - type: string
            - type: 'null'
          title: Code
      type: object
      required:
        - duration
        - duration_in_months
        - type
        - basis_points
        - id
        - name
        - code
      title: CheckoutDiscountPercentageRepeatDuration
      description: |-
        Schema for a percentage discount that is applied on every invoice
        for a certain number of months.
    AttachedCustomField:
      properties:
        custom_field_id:
          type: string
          format: uuid4
          title: Custom Field Id
          description: ID of the custom field.
        custom_field:
          $ref: '#/components/schemas/CustomField'
          title: CustomField
        order:
          type: integer
          title: Order
          description: Order of the custom field in the resource.
        required:
          type: boolean
          title: Required
          description: Whether the value is required for this custom field.
      type: object
      required:
        - custom_field_id
        - custom_field
        - order
        - required
      title: AttachedCustomField
      description: Schema of a custom field attached to a resource.
    AlreadyActiveSubscriptionError:
      properties:
        error:
          type: string
          const: AlreadyActiveSubscriptionError
          title: Error
          examples:
            - AlreadyActiveSubscriptionError
        detail:
          type: string
          title: Detail
      type: object
      required:
        - error
        - detail
      title: AlreadyActiveSubscriptionError
    NotOpenCheckout:
      properties:
        error:
          type: string
          const: NotOpenCheckout
          title: Error
          examples:
            - NotOpenCheckout
        detail:
          type: string
          title: Detail
      type: object
      required:
        - error
        - detail
      title: NotOpenCheckout
    PaymentNotReady:
      properties:
        error:
          type: string
          const: PaymentNotReady
          title: Error
          examples:
            - PaymentNotReady
        detail:
          type: string
          title: Detail
      type: object
      required:
        - error
        - detail
      title: PaymentNotReady
    TrialAlreadyRedeemed:
      properties:
        error:
          type: string
          const: TrialAlreadyRedeemed
          title: Error
          examples:
            - TrialAlreadyRedeemed
        detail:
          type: string
          title: Detail
      type: object
      required:
        - error
        - detail
      title: TrialAlreadyRedeemed
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
    BillingAddressFieldMode:
      type: string
      enum:
        - required
        - optional
        - disabled
      title: BillingAddressFieldMode
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
    CustomField:
      oneOf:
        - $ref: '#/components/schemas/CustomFieldText'
        - $ref: '#/components/schemas/CustomFieldNumber'
        - $ref: '#/components/schemas/CustomFieldDate'
        - $ref: '#/components/schemas/CustomFieldCheckbox'
        - $ref: '#/components/schemas/CustomFieldSelect'
      discriminator:
        propertyName: type
        mapping:
          checkbox:
            $ref: '#/components/schemas/CustomFieldCheckbox'
          date:
            $ref: '#/components/schemas/CustomFieldDate'
          number:
            $ref: '#/components/schemas/CustomFieldNumber'
          select:
            $ref: '#/components/schemas/CustomFieldSelect'
          text:
            $ref: '#/components/schemas/CustomFieldText'
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
    CustomFieldText:
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
          description: The ID of the object.
        metadata:
          $ref: '#/components/schemas/MetadataOutputType'
        type:
          type: string
          const: text
          title: Type
        slug:
          type: string
          title: Slug
          description: >-
            Identifier of the custom field. It'll be used as key when storing
            the value.
        name:
          type: string
          title: Name
          description: Name of the custom field.
        organization_id:
          type: string
          format: uuid4
          title: Organization Id
          description: The ID of the organization owning the custom field.
          examples:
            - 1dbfc517-0bbf-4301-9ba8-555ca42b9737
          x-polar-selector-widget:
            displayProperty: name
            resourceName: Organization
            resourceRoot: /v1/organizations
        properties:
          $ref: '#/components/schemas/CustomFieldTextProperties'
      type: object
      required:
        - created_at
        - modified_at
        - id
        - metadata
        - type
        - slug
        - name
        - organization_id
        - properties
      title: CustomFieldText
      description: Schema for a custom field of type text.
    CustomFieldNumber:
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
          description: The ID of the object.
        metadata:
          $ref: '#/components/schemas/MetadataOutputType'
        type:
          type: string
          const: number
          title: Type
        slug:
          type: string
          title: Slug
          description: >-
            Identifier of the custom field. It'll be used as key when storing
            the value.
        name:
          type: string
          title: Name
          description: Name of the custom field.
        organization_id:
          type: string
          format: uuid4
          title: Organization Id
          description: The ID of the organization owning the custom field.
          examples:
            - 1dbfc517-0bbf-4301-9ba8-555ca42b9737
          x-polar-selector-widget:
            displayProperty: name
            resourceName: Organization
            resourceRoot: /v1/organizations
        properties:
          $ref: '#/components/schemas/CustomFieldNumberProperties'
      type: object
      required:
        - created_at
        - modified_at
        - id
        - metadata
        - type
        - slug
        - name
        - organization_id
        - properties
      title: CustomFieldNumber
      description: Schema for a custom field of type number.
    CustomFieldDate:
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
          description: The ID of the object.
        metadata:
          $ref: '#/components/schemas/MetadataOutputType'
        type:
          type: string
          const: date
          title: Type
        slug:
          type: string
          title: Slug
          description: >-
            Identifier of the custom field. It'll be used as key when storing
            the value.
        name:
          type: string
          title: Name
          description: Name of the custom field.
        organization_id:
          type: string
          format: uuid4
          title: Organization Id
          description: The ID of the organization owning the custom field.
          examples:
            - 1dbfc517-0bbf-4301-9ba8-555ca42b9737
          x-polar-selector-widget:
            displayProperty: name
            resourceName: Organization
            resourceRoot: /v1/organizations
        properties:
          $ref: '#/components/schemas/CustomFieldDateProperties'
      type: object
      required:
        - created_at
        - modified_at
        - id
        - metadata
        - type
        - slug
        - name
        - organization_id
        - properties
      title: CustomFieldDate
      description: Schema for a custom field of type date.
    CustomFieldCheckbox:
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
          description: The ID of the object.
        metadata:
          $ref: '#/components/schemas/MetadataOutputType'
        type:
          type: string
          const: checkbox
          title: Type
        slug:
          type: string
          title: Slug
          description: >-
            Identifier of the custom field. It'll be used as key when storing
            the value.
        name:
          type: string
          title: Name
          description: Name of the custom field.
        organization_id:
          type: string
          format: uuid4
          title: Organization Id
          description: The ID of the organization owning the custom field.
          examples:
            - 1dbfc517-0bbf-4301-9ba8-555ca42b9737
          x-polar-selector-widget:
            displayProperty: name
            resourceName: Organization
            resourceRoot: /v1/organizations
        properties:
          $ref: '#/components/schemas/CustomFieldCheckboxProperties'
      type: object
      required:
        - created_at
        - modified_at
        - id
        - metadata
        - type
        - slug
        - name
        - organization_id
        - properties
      title: CustomFieldCheckbox
      description: Schema for a custom field of type checkbox.
    CustomFieldSelect:
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
          description: The ID of the object.
        metadata:
          $ref: '#/components/schemas/MetadataOutputType'
        type:
          type: string
          const: select
          title: Type
        slug:
          type: string
          title: Slug
          description: >-
            Identifier of the custom field. It'll be used as key when storing
            the value.
        name:
          type: string
          title: Name
          description: Name of the custom field.
        organization_id:
          type: string
          format: uuid4
          title: Organization Id
          description: The ID of the organization owning the custom field.
          examples:
            - 1dbfc517-0bbf-4301-9ba8-555ca42b9737
          x-polar-selector-widget:
            displayProperty: name
            resourceName: Organization
            resourceRoot: /v1/organizations
        properties:
          $ref: '#/components/schemas/CustomFieldSelectProperties'
      type: object
      required:
        - created_at
        - modified_at
        - id
        - metadata
        - type
        - slug
        - name
        - organization_id
        - properties
      title: CustomFieldSelect
      description: Schema for a custom field of type select.
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
    CustomFieldTextProperties:
      properties:
        form_label:
          type: string
          minLength: 1
          title: Form Label
        form_help_text:
          type: string
          minLength: 1
          title: Form Help Text
        form_placeholder:
          type: string
          minLength: 1
          title: Form Placeholder
        textarea:
          type: boolean
          title: Textarea
        min_length:
          type: integer
          maximum: 2147483647
          minimum: 0
          title: Min Length
        max_length:
          type: integer
          maximum: 2147483647
          minimum: 0
          title: Max Length
      type: object
      title: CustomFieldTextProperties
    CustomFieldNumberProperties:
      properties:
        form_label:
          type: string
          minLength: 1
          title: Form Label
        form_help_text:
          type: string
          minLength: 1
          title: Form Help Text
        form_placeholder:
          type: string
          minLength: 1
          title: Form Placeholder
        ge:
          type: integer
          maximum: 2147483647
          minimum: -2147483648
          title: Ge
        le:
          type: integer
          maximum: 2147483647
          minimum: -2147483648
          title: Le
      type: object
      title: CustomFieldNumberProperties
    CustomFieldDateProperties:
      properties:
        form_label:
          type: string
          minLength: 1
          title: Form Label
        form_help_text:
          type: string
          minLength: 1
          title: Form Help Text
        form_placeholder:
          type: string
          minLength: 1
          title: Form Placeholder
        ge:
          type: integer
          maximum: 2147483647
          minimum: -2147483648
          title: Ge
        le:
          type: integer
          maximum: 2147483647
          minimum: -2147483648
          title: Le
      type: object
      title: CustomFieldDateProperties
    CustomFieldCheckboxProperties:
      properties:
        form_label:
          type: string
          minLength: 1
          title: Form Label
        form_help_text:
          type: string
          minLength: 1
          title: Form Help Text
        form_placeholder:
          type: string
          minLength: 1
          title: Form Placeholder
      type: object
      title: CustomFieldCheckboxProperties
    CustomFieldSelectProperties:
      properties:
        form_label:
          type: string
          minLength: 1
          title: Form Label
        form_help_text:
          type: string
          minLength: 1
          title: Form Help Text
        form_placeholder:
          type: string
          minLength: 1
          title: Form Placeholder
        options:
          items:
            $ref: '#/components/schemas/CustomFieldSelectOption'
          type: array
          minItems: 1
          title: Options
      type: object
      required:
        - options
      title: CustomFieldSelectProperties
    CustomFieldSelectOption:
      properties:
        value:
          type: string
          minLength: 1
          title: Value
        label:
          type: string
          minLength: 1
          title: Label
      type: object
      required:
        - value
        - label
      title: CustomFieldSelectOption
  securitySchemes:
    access_token:
      type: http
      scheme: bearer
      description: >-
        You can generate an **Organization Access Token** from your
        organization's settings.

````