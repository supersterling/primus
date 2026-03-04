> ## Documentation Index
> Fetch the complete documentation index at: https://polar.sh/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Create Meter

> Create a meter.

**Scopes**: `meters:write`



## OpenAPI

````yaml post /v1/meters/
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
  /v1/meters/:
    post:
      tags:
        - meters
        - public
      summary: Create Meter
      description: |-
        Create a meter.

        **Scopes**: `meters:write`
      operationId: meters:create
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/MeterCreate'
      responses:
        '201':
          description: Meter created.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Meter'
        '422':
          description: Validation Error
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/HTTPValidationError'
      x-codeSamples:
        - lang: go
          label: Go (SDK)
          source: "package main\n\nimport(\n\t\"context\"\n\t\"os\"\n\tpolargo \"github.com/polarsource/polar-go\"\n\t\"github.com/polarsource/polar-go/models/components\"\n\t\"log\"\n)\n\nfunc main() {\n    ctx := context.Background()\n\n    s := polargo.New(\n        polargo.WithSecurity(os.Getenv(\"POLAR_ACCESS_TOKEN\")),\n    )\n\n    res, err := s.Meters.Create(ctx, components.MeterCreate{\n        Name: \"<value>\",\n        Filter: components.Filter{\n            Conjunction: components.FilterConjunctionOr,\n            Clauses: []components.Clauses{\n                components.CreateClausesFilterClause(\n                    components.FilterClause{\n                        Property: \"<value>\",\n                        Operator: components.FilterOperatorNe,\n                        Value: components.CreateValueStr(\n                            \"<value>\",\n                        ),\n                    },\n                ),\n            },\n        },\n        Aggregation: components.CreateMeterCreateAggregationAvg(\n            components.PropertyAggregation{\n                Func: components.FuncMax,\n                Property: \"<value>\",\n            },\n        ),\n        OrganizationID: polargo.Pointer(\"1dbfc517-0bbf-4301-9ba8-555ca42b9737\"),\n    })\n    if err != nil {\n        log.Fatal(err)\n    }\n    if res.Meter != nil {\n        switch res.Meter.Aggregation.Type {\n            case components.MeterAggregationTypeAvg:\n                // res.Meter.Aggregation.PropertyAggregation is populated\n            case components.MeterAggregationTypeCount:\n                // res.Meter.Aggregation.CountAggregation is populated\n            case components.MeterAggregationTypeMax:\n                // res.Meter.Aggregation.PropertyAggregation is populated\n            case components.MeterAggregationTypeMin:\n                // res.Meter.Aggregation.PropertyAggregation is populated\n            case components.MeterAggregationTypeSum:\n                // res.Meter.Aggregation.PropertyAggregation is populated\n            case components.MeterAggregationTypeUnique:\n                // res.Meter.Aggregation.UniqueAggregation is populated\n        }\n\n    }\n}"
        - lang: python
          label: Python (SDK)
          source: |-
            import polar_sdk
            from polar_sdk import Polar


            with Polar(
                access_token="<YOUR_BEARER_TOKEN_HERE>",
            ) as polar:

                res = polar.meters.create(request={
                    "name": "<value>",
                    "filter_": {
                        "conjunction": polar_sdk.FilterConjunction.OR,
                        "clauses": [],
                    },
                    "aggregation": {
                        "func": "count",
                    },
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
              const result = await polar.meters.create({
                name: "<value>",
                filter: {
                  conjunction: "or",
                  clauses: [
                    {
                      property: "<value>",
                      operator: "ne",
                      value: "<value>",
                    },
                  ],
                },
                aggregation: {
                  func: "max",
                  property: "<value>",
                },
                organizationId: "1dbfc517-0bbf-4301-9ba8-555ca42b9737",
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

            $request = new Components\MeterCreate(
                name: '<value>',
                filter: new Components\Filter(
                    conjunction: Components\FilterConjunction::Or,
                    clauses: [
                        new Components\FilterClause(
                            property: '<value>',
                            operator: Components\FilterOperator::Ne,
                            value: '<value>',
                        ),
                    ],
                ),
                aggregation: new Components\PropertyAggregation(
                    func: Components\Func::Max,
                    property: '<value>',
                ),
                organizationId: '1dbfc517-0bbf-4301-9ba8-555ca42b9737',
            );

            $response = $sdk->meters->create(
                request: $request
            );

            if ($response->meter !== null) {
                // handle response
            }
components:
  schemas:
    MeterCreate:
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
        name:
          type: string
          minLength: 3
          title: Name
          description: >-
            The name of the meter. Will be shown on customer's invoices and
            usage.
        filter:
          $ref: '#/components/schemas/Filter'
          description: >-
            The filter to apply on events that'll be used to calculate the
            meter.
        aggregation:
          oneOf:
            - $ref: '#/components/schemas/CountAggregation'
            - $ref: '#/components/schemas/PropertyAggregation'
            - $ref: '#/components/schemas/UniqueAggregation'
          title: Aggregation
          description: >-
            The aggregation to apply on the filtered events to calculate the
            meter.
          discriminator:
            propertyName: func
            mapping:
              avg:
                $ref: '#/components/schemas/PropertyAggregation'
              count:
                $ref: '#/components/schemas/CountAggregation'
              max:
                $ref: '#/components/schemas/PropertyAggregation'
              min:
                $ref: '#/components/schemas/PropertyAggregation'
              sum:
                $ref: '#/components/schemas/PropertyAggregation'
              unique:
                $ref: '#/components/schemas/UniqueAggregation'
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
            The ID of the organization owning the meter. **Required unless you
            use an organization token.**
      type: object
      required:
        - name
        - filter
        - aggregation
      title: MeterCreate
    Meter:
      properties:
        metadata:
          $ref: '#/components/schemas/MetadataOutputType'
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
        name:
          type: string
          title: Name
          description: >-
            The name of the meter. Will be shown on customer's invoices and
            usage.
        filter:
          $ref: '#/components/schemas/Filter'
          description: >-
            The filter to apply on events that'll be used to calculate the
            meter.
        aggregation:
          oneOf:
            - $ref: '#/components/schemas/CountAggregation'
            - $ref: '#/components/schemas/PropertyAggregation'
            - $ref: '#/components/schemas/UniqueAggregation'
          title: Aggregation
          description: >-
            The aggregation to apply on the filtered events to calculate the
            meter.
          discriminator:
            propertyName: func
            mapping:
              avg:
                $ref: '#/components/schemas/PropertyAggregation'
              count:
                $ref: '#/components/schemas/CountAggregation'
              max:
                $ref: '#/components/schemas/PropertyAggregation'
              min:
                $ref: '#/components/schemas/PropertyAggregation'
              sum:
                $ref: '#/components/schemas/PropertyAggregation'
              unique:
                $ref: '#/components/schemas/UniqueAggregation'
        organization_id:
          type: string
          format: uuid4
          title: Organization Id
          description: The ID of the organization owning the meter.
        archived_at:
          anyOf:
            - type: string
              format: date-time
            - type: 'null'
          title: Archived At
          description: Whether the meter is archived and the time it was archived.
      type: object
      required:
        - metadata
        - created_at
        - modified_at
        - id
        - name
        - filter
        - aggregation
        - organization_id
      title: Meter
    HTTPValidationError:
      properties:
        detail:
          items:
            $ref: '#/components/schemas/ValidationError'
          type: array
          title: Detail
      type: object
      title: HTTPValidationError
    Filter:
      properties:
        conjunction:
          $ref: '#/components/schemas/FilterConjunction'
        clauses:
          items:
            anyOf:
              - $ref: '#/components/schemas/FilterClause'
              - $ref: '#/components/schemas/Filter'
          type: array
          title: Clauses
      type: object
      required:
        - conjunction
        - clauses
      title: Filter
    CountAggregation:
      properties:
        func:
          type: string
          const: count
          title: Func
          default: count
      type: object
      title: CountAggregation
    PropertyAggregation:
      properties:
        func:
          type: string
          enum:
            - sum
            - max
            - min
            - avg
          title: Func
        property:
          type: string
          title: Property
      type: object
      required:
        - func
        - property
      title: PropertyAggregation
    UniqueAggregation:
      properties:
        func:
          type: string
          const: unique
          title: Func
          default: unique
        property:
          type: string
          title: Property
      type: object
      required:
        - property
      title: UniqueAggregation
    MetadataOutputType:
      additionalProperties:
        anyOf:
          - type: string
          - type: integer
          - type: number
          - type: boolean
      type: object
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
    FilterConjunction:
      type: string
      enum:
        - and
        - or
      title: FilterConjunction
    FilterClause:
      properties:
        property:
          type: string
          title: Property
        operator:
          $ref: '#/components/schemas/FilterOperator'
        value:
          anyOf:
            - type: string
              maxLength: 1000
            - type: integer
              maximum: 2147483647
              minimum: -2147483648
            - type: boolean
          title: Value
      type: object
      required:
        - property
        - operator
        - value
      title: FilterClause
    FilterOperator:
      type: string
      enum:
        - eq
        - ne
        - gt
        - gte
        - lt
        - lte
        - like
        - not_like
      title: FilterOperator
  securitySchemes:
    access_token:
      type: http
      scheme: bearer
      description: >-
        You can generate an **Organization Access Token** from your
        organization's settings.

````