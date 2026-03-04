> ## Documentation Index
> Fetch the complete documentation index at: https://polar.sh/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Create Discount

> Create a discount.

**Scopes**: `discounts:write`



## OpenAPI

````yaml post /v1/discounts/
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
  /v1/discounts/:
    post:
      tags:
        - discounts
        - public
      summary: Create Discount
      description: |-
        Create a discount.

        **Scopes**: `discounts:write`
      operationId: discounts:create
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/DiscountCreate'
      responses:
        '201':
          description: Discount created.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Discount'
                title: Discount
        '422':
          description: Validation Error
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/HTTPValidationError'
      x-codeSamples:
        - lang: go
          label: Go (SDK)
          source: "package main\n\nimport(\n\t\"context\"\n\t\"os\"\n\tpolargo \"github.com/polarsource/polar-go\"\n\t\"github.com/polarsource/polar-go/models/components\"\n\t\"log\"\n)\n\nfunc main() {\n    ctx := context.Background()\n\n    s := polargo.New(\n        polargo.WithSecurity(os.Getenv(\"POLAR_ACCESS_TOKEN\")),\n    )\n\n    res, err := s.Discounts.Create(ctx, components.CreateDiscountCreateDiscountPercentageOnceForeverDurationCreate(\n        components.DiscountPercentageOnceForeverDurationCreate{\n            Duration: components.DiscountDurationOnce,\n            Type: components.DiscountTypeFixed,\n            BasisPoints: 449604,\n            Name: \"<value>\",\n            OrganizationID: polargo.Pointer(\"1dbfc517-0bbf-4301-9ba8-555ca42b9737\"),\n        },\n    ))\n    if err != nil {\n        log.Fatal(err)\n    }\n    if res.Discount != nil {\n        switch res.Discount.Type {\n            case components.DiscountUnionTypeDiscountFixedOnceForeverDuration:\n                // res.Discount.DiscountFixedOnceForeverDuration is populated\n            case components.DiscountUnionTypeDiscountFixedRepeatDuration:\n                // res.Discount.DiscountFixedRepeatDuration is populated\n            case components.DiscountUnionTypeDiscountPercentageOnceForeverDuration:\n                // res.Discount.DiscountPercentageOnceForeverDuration is populated\n            case components.DiscountUnionTypeDiscountPercentageRepeatDuration:\n                // res.Discount.DiscountPercentageRepeatDuration is populated\n        }\n\n    }\n}"
        - lang: python
          label: Python (SDK)
          source: |-
            import polar_sdk
            from polar_sdk import Polar


            with Polar(
                access_token="<YOUR_BEARER_TOKEN_HERE>",
            ) as polar:

                res = polar.discounts.create(request={
                    "duration": polar_sdk.DiscountDuration.ONCE,
                    "type": polar_sdk.DiscountType.FIXED,
                    "basis_points": 449604,
                    "name": "<value>",
                    "organization_id": "1dbfc517-0bbf-4301-9ba8-555ca42b9737",
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
              const result = await polar.discounts.create({
                duration: "once",
                type: "fixed",
                basisPoints: 449604,
                name: "<value>",
                organizationId: "1dbfc517-0bbf-4301-9ba8-555ca42b9737",
              });

              console.log(result);
            }

            run();
        - lang: php
          label: PHP (SDK)
          source: >-
            declare(strict_types=1);


            require 'vendor/autoload.php';


            use Polar;

            use Polar\Models\Components;


            $sdk = Polar\Polar::builder()
                ->setSecurity(
                    '<YOUR_BEARER_TOKEN_HERE>'
                )
                ->build();

            $request = new
            Components\DiscountPercentageOnceForeverDurationCreate(
                duration: Components\DiscountDuration::Once,
                type: Components\DiscountType::Fixed,
                basisPoints: 449604,
                name: '<value>',
                organizationId: '1dbfc517-0bbf-4301-9ba8-555ca42b9737',
            );


            $response = $sdk->discounts->create(
                request: $request
            );


            if ($response->discount !== null) {
                // handle response
            }
components:
  schemas:
    DiscountCreate:
      oneOf:
        - $ref: '#/components/schemas/DiscountFixedOnceForeverDurationCreate'
        - $ref: '#/components/schemas/DiscountFixedRepeatDurationCreate'
        - $ref: '#/components/schemas/DiscountPercentageOnceForeverDurationCreate'
        - $ref: '#/components/schemas/DiscountPercentageRepeatDurationCreate'
    Discount:
      oneOf:
        - $ref: '#/components/schemas/DiscountFixedOnceForeverDuration'
        - $ref: '#/components/schemas/DiscountFixedRepeatDuration'
        - $ref: '#/components/schemas/DiscountPercentageOnceForeverDuration'
        - $ref: '#/components/schemas/DiscountPercentageRepeatDuration'
    HTTPValidationError:
      properties:
        detail:
          items:
            $ref: '#/components/schemas/ValidationError'
          type: array
          title: Detail
      type: object
      title: HTTPValidationError
    DiscountFixedOnceForeverDurationCreate:
      properties:
        duration:
          $ref: '#/components/schemas/DiscountDuration'
        type:
          $ref: '#/components/schemas/DiscountType'
          description: Type of the discount.
        amount:
          type: integer
          maximum: 999999999999
          minimum: 0
          title: Amount
          description: Fixed amount to discount from the invoice total.
        currency:
          $ref: '#/components/schemas/PresentmentCurrency'
          description: The currency of the fixed amount discount.
          default: usd
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
        name:
          type: string
          minLength: 1
          title: Name
          description: >-
            Name of the discount. Will be displayed to the customer when the
            discount is applied.
        code:
          anyOf:
            - type: string
            - type: 'null'
          title: Code
          description: >-
            Code customers can use to apply the discount during checkout. Must
            be between 3 and 256 characters long and contain only alphanumeric
            characters.If not provided, the discount can only be applied via the
            API.
        starts_at:
          anyOf:
            - type: string
              format: date-time
            - type: 'null'
          title: Starts At
          description: Optional timestamp after which the discount is redeemable.
        ends_at:
          anyOf:
            - type: string
              format: date-time
            - type: 'null'
          title: Ends At
          description: Optional timestamp after which the discount is no longer redeemable.
        max_redemptions:
          anyOf:
            - type: integer
              minimum: 1
            - type: 'null'
          title: Max Redemptions
          description: Optional maximum number of times the discount can be redeemed.
        products:
          anyOf:
            - items:
                type: string
                format: uuid4
              type: array
              description: List of product IDs the discount can be applied to.
            - type: 'null'
          title: Products
        organization_id:
          anyOf:
            - type: string
              format: uuid4
              description: The organization ID.
              examples:
                - 1dbfc517-0bbf-4301-9ba8-555ca42b9737
              x-polar-selector-widget:
                displayProperty: name
                resourceName: Organization
                resourceRoot: /v1/organizations
            - type: 'null'
          title: Organization Id
          description: >-
            The ID of the organization owning the discount. **Required unless
            you use an organization token.**
      type: object
      required:
        - duration
        - type
        - amount
        - name
      title: DiscountFixedOnceForeverDurationCreate
      description: >-
        Schema to create a fixed amount discount that is applied once or
        forever.
    DiscountFixedRepeatDurationCreate:
      properties:
        duration:
          $ref: '#/components/schemas/DiscountDuration'
        duration_in_months:
          type: integer
          maximum: 999
          minimum: 1
          title: Duration In Months
          description: |-
            Number of months the discount should be applied.

            For this to work on yearly pricing, you should multiply this by 12.
            For example, to apply the discount for 2 years, set this to 24.
        type:
          $ref: '#/components/schemas/DiscountType'
          description: Type of the discount.
        amount:
          type: integer
          maximum: 999999999999
          minimum: 0
          title: Amount
          description: Fixed amount to discount from the invoice total.
        currency:
          $ref: '#/components/schemas/PresentmentCurrency'
          description: The currency of the fixed amount discount.
          default: usd
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
        name:
          type: string
          minLength: 1
          title: Name
          description: >-
            Name of the discount. Will be displayed to the customer when the
            discount is applied.
        code:
          anyOf:
            - type: string
            - type: 'null'
          title: Code
          description: >-
            Code customers can use to apply the discount during checkout. Must
            be between 3 and 256 characters long and contain only alphanumeric
            characters.If not provided, the discount can only be applied via the
            API.
        starts_at:
          anyOf:
            - type: string
              format: date-time
            - type: 'null'
          title: Starts At
          description: Optional timestamp after which the discount is redeemable.
        ends_at:
          anyOf:
            - type: string
              format: date-time
            - type: 'null'
          title: Ends At
          description: Optional timestamp after which the discount is no longer redeemable.
        max_redemptions:
          anyOf:
            - type: integer
              minimum: 1
            - type: 'null'
          title: Max Redemptions
          description: Optional maximum number of times the discount can be redeemed.
        products:
          anyOf:
            - items:
                type: string
                format: uuid4
              type: array
              description: List of product IDs the discount can be applied to.
            - type: 'null'
          title: Products
        organization_id:
          anyOf:
            - type: string
              format: uuid4
              description: The organization ID.
              examples:
                - 1dbfc517-0bbf-4301-9ba8-555ca42b9737
              x-polar-selector-widget:
                displayProperty: name
                resourceName: Organization
                resourceRoot: /v1/organizations
            - type: 'null'
          title: Organization Id
          description: >-
            The ID of the organization owning the discount. **Required unless
            you use an organization token.**
      type: object
      required:
        - duration
        - duration_in_months
        - type
        - amount
        - name
      title: DiscountFixedRepeatDurationCreate
      description: >-
        Schema to create a fixed amount discount that is applied on every
        invoice

        for a certain number of months.
    DiscountPercentageOnceForeverDurationCreate:
      properties:
        duration:
          $ref: '#/components/schemas/DiscountDuration'
        type:
          $ref: '#/components/schemas/DiscountType'
          description: Type of the discount.
        basis_points:
          type: integer
          maximum: 10000
          minimum: 1
          title: Basis Points
          description: |-
            Discount percentage in basis points.

            A basis point is 1/100th of a percent.
            For example, to create a 25.5% discount, set this to 2550.
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
        name:
          type: string
          minLength: 1
          title: Name
          description: >-
            Name of the discount. Will be displayed to the customer when the
            discount is applied.
        code:
          anyOf:
            - type: string
            - type: 'null'
          title: Code
          description: >-
            Code customers can use to apply the discount during checkout. Must
            be between 3 and 256 characters long and contain only alphanumeric
            characters.If not provided, the discount can only be applied via the
            API.
        starts_at:
          anyOf:
            - type: string
              format: date-time
            - type: 'null'
          title: Starts At
          description: Optional timestamp after which the discount is redeemable.
        ends_at:
          anyOf:
            - type: string
              format: date-time
            - type: 'null'
          title: Ends At
          description: Optional timestamp after which the discount is no longer redeemable.
        max_redemptions:
          anyOf:
            - type: integer
              minimum: 1
            - type: 'null'
          title: Max Redemptions
          description: Optional maximum number of times the discount can be redeemed.
        products:
          anyOf:
            - items:
                type: string
                format: uuid4
              type: array
              description: List of product IDs the discount can be applied to.
            - type: 'null'
          title: Products
        organization_id:
          anyOf:
            - type: string
              format: uuid4
              description: The organization ID.
              examples:
                - 1dbfc517-0bbf-4301-9ba8-555ca42b9737
              x-polar-selector-widget:
                displayProperty: name
                resourceName: Organization
                resourceRoot: /v1/organizations
            - type: 'null'
          title: Organization Id
          description: >-
            The ID of the organization owning the discount. **Required unless
            you use an organization token.**
      type: object
      required:
        - duration
        - type
        - basis_points
        - name
      title: DiscountPercentageOnceForeverDurationCreate
      description: Schema to create a percentage discount that is applied once or forever.
    DiscountPercentageRepeatDurationCreate:
      properties:
        duration:
          $ref: '#/components/schemas/DiscountDuration'
        duration_in_months:
          type: integer
          maximum: 999
          minimum: 1
          title: Duration In Months
          description: |-
            Number of months the discount should be applied.

            For this to work on yearly pricing, you should multiply this by 12.
            For example, to apply the discount for 2 years, set this to 24.
        type:
          $ref: '#/components/schemas/DiscountType'
          description: Type of the discount.
        basis_points:
          type: integer
          maximum: 10000
          minimum: 1
          title: Basis Points
          description: |-
            Discount percentage in basis points.

            A basis point is 1/100th of a percent.
            For example, to create a 25.5% discount, set this to 2550.
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
        name:
          type: string
          minLength: 1
          title: Name
          description: >-
            Name of the discount. Will be displayed to the customer when the
            discount is applied.
        code:
          anyOf:
            - type: string
            - type: 'null'
          title: Code
          description: >-
            Code customers can use to apply the discount during checkout. Must
            be between 3 and 256 characters long and contain only alphanumeric
            characters.If not provided, the discount can only be applied via the
            API.
        starts_at:
          anyOf:
            - type: string
              format: date-time
            - type: 'null'
          title: Starts At
          description: Optional timestamp after which the discount is redeemable.
        ends_at:
          anyOf:
            - type: string
              format: date-time
            - type: 'null'
          title: Ends At
          description: Optional timestamp after which the discount is no longer redeemable.
        max_redemptions:
          anyOf:
            - type: integer
              minimum: 1
            - type: 'null'
          title: Max Redemptions
          description: Optional maximum number of times the discount can be redeemed.
        products:
          anyOf:
            - items:
                type: string
                format: uuid4
              type: array
              description: List of product IDs the discount can be applied to.
            - type: 'null'
          title: Products
        organization_id:
          anyOf:
            - type: string
              format: uuid4
              description: The organization ID.
              examples:
                - 1dbfc517-0bbf-4301-9ba8-555ca42b9737
              x-polar-selector-widget:
                displayProperty: name
                resourceName: Organization
                resourceRoot: /v1/organizations
            - type: 'null'
          title: Organization Id
          description: >-
            The ID of the organization owning the discount. **Required unless
            you use an organization token.**
      type: object
      required:
        - duration
        - duration_in_months
        - type
        - basis_points
        - name
      title: DiscountPercentageRepeatDurationCreate
      description: |-
        Schema to create a percentage discount that is applied on every invoice
        for a certain number of months.
    DiscountFixedOnceForeverDuration:
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
        products:
          items:
            $ref: '#/components/schemas/DiscountProduct'
          type: array
          title: Products
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
        - products
      title: DiscountFixedOnceForeverDuration
      description: Schema for a fixed amount discount that is applied once or forever.
    DiscountFixedRepeatDuration:
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
        products:
          items:
            $ref: '#/components/schemas/DiscountProduct'
          type: array
          title: Products
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
        - products
      title: DiscountFixedRepeatDuration
      description: |-
        Schema for a fixed amount discount that is applied on every invoice
        for a certain number of months.
    DiscountPercentageOnceForeverDuration:
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
        products:
          items:
            $ref: '#/components/schemas/DiscountProduct'
          type: array
          title: Products
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
        - products
      title: DiscountPercentageOnceForeverDuration
      description: Schema for a percentage discount that is applied once or forever.
    DiscountPercentageRepeatDuration:
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
        products:
          items:
            $ref: '#/components/schemas/DiscountProduct'
          type: array
          title: Products
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
        - products
      title: DiscountPercentageRepeatDuration
      description: |-
        Schema for a percentage discount that is applied on every invoice
        for a certain number of months.
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
    MetadataOutputType:
      additionalProperties:
        anyOf:
          - type: string
          - type: integer
          - type: number
          - type: boolean
      type: object
    DiscountProduct:
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
      title: DiscountProduct
      description: A product that a discount can be applied to.
    TrialInterval:
      type: string
      enum:
        - day
        - week
        - month
        - year
      title: TrialInterval
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
  securitySchemes:
    access_token:
      type: http
      scheme: bearer
      description: >-
        You can generate an **Organization Access Token** from your
        organization's settings.

````