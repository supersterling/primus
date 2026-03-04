> ## Documentation Index
> Fetch the complete documentation index at: https://polar.sh/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Get Meter

> Get a meter by ID.

**Scopes**: `meters:read` `meters:write`



## OpenAPI

````yaml get /v1/meters/{id}
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
  /v1/meters/{id}:
    get:
      tags:
        - meters
        - public
      summary: Get Meter
      description: |-
        Get a meter by ID.

        **Scopes**: `meters:read` `meters:write`
      operationId: meters:get
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
            format: uuid4
            description: The meter ID.
            title: Id
          description: The meter ID.
      responses:
        '200':
          description: Successful Response
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Meter'
        '404':
          description: Meter not found.
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
          source: "package main\n\nimport(\n\t\"context\"\n\t\"os\"\n\tpolargo \"github.com/polarsource/polar-go\"\n\t\"log\"\n\t\"github.com/polarsource/polar-go/models/components\"\n)\n\nfunc main() {\n    ctx := context.Background()\n\n    s := polargo.New(\n        polargo.WithSecurity(os.Getenv(\"POLAR_ACCESS_TOKEN\")),\n    )\n\n    res, err := s.Meters.Get(ctx, \"<value>\")\n    if err != nil {\n        log.Fatal(err)\n    }\n    if res.Meter != nil {\n        switch res.Meter.Aggregation.Type {\n            case components.MeterAggregationTypeAvg:\n                // res.Meter.Aggregation.PropertyAggregation is populated\n            case components.MeterAggregationTypeCount:\n                // res.Meter.Aggregation.CountAggregation is populated\n            case components.MeterAggregationTypeMax:\n                // res.Meter.Aggregation.PropertyAggregation is populated\n            case components.MeterAggregationTypeMin:\n                // res.Meter.Aggregation.PropertyAggregation is populated\n            case components.MeterAggregationTypeSum:\n                // res.Meter.Aggregation.PropertyAggregation is populated\n            case components.MeterAggregationTypeUnique:\n                // res.Meter.Aggregation.UniqueAggregation is populated\n        }\n\n    }\n}"
        - lang: python
          label: Python (SDK)
          source: |-
            from polar_sdk import Polar


            with Polar(
                access_token="<YOUR_BEARER_TOKEN_HERE>",
            ) as polar:

                res = polar.meters.get(id="<value>")

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
              const result = await polar.meters.get({
                id: "<value>",
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

            $sdk = Polar\Polar::builder()
                ->setSecurity(
                    '<YOUR_BEARER_TOKEN_HERE>'
                )
                ->build();



            $response = $sdk->meters->get(
                id: '<value>'
            );

            if ($response->meter !== null) {
                // handle response
            }
components:
  schemas:
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
    MetadataOutputType:
      additionalProperties:
        anyOf:
          - type: string
          - type: integer
          - type: number
          - type: boolean
      type: object
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