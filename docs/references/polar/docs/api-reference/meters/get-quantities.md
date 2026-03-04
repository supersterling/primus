> ## Documentation Index
> Fetch the complete documentation index at: https://polar.sh/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Get Meter Quantities

> Get quantities of a meter over a time period.

**Scopes**: `meters:read` `meters:write`



## OpenAPI

````yaml get /v1/meters/{id}/quantities
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
  /v1/meters/{id}/quantities:
    get:
      tags:
        - meters
        - public
      summary: Get Meter Quantities
      description: |-
        Get quantities of a meter over a time period.

        **Scopes**: `meters:read` `meters:write`
      operationId: meters:quantities
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
        - name: start_timestamp
          in: query
          required: true
          schema:
            type: string
            format: date-time
            description: Start timestamp.
            title: Start Timestamp
          description: Start timestamp.
        - name: end_timestamp
          in: query
          required: true
          schema:
            type: string
            format: date-time
            description: End timestamp.
            title: End Timestamp
          description: End timestamp.
        - name: interval
          in: query
          required: true
          schema:
            $ref: '#/components/schemas/TimeInterval'
            description: Interval between two timestamps.
          description: Interval between two timestamps.
        - name: timezone
          in: query
          required: false
          schema:
            type: string
            minLength: 1
            description: Timezone to use for the timestamps. Default is UTC.
            default: UTC
            title: Timezone
          description: Timezone to use for the timestamps. Default is UTC.
        - name: customer_id
          in: query
          required: false
          schema:
            anyOf:
              - type: string
                format: uuid4
                description: The customer ID.
              - type: array
                items:
                  type: string
                  format: uuid4
                  description: The customer ID.
              - type: 'null'
            title: CustomerID Filter
            description: Filter by customer ID.
          description: Filter by customer ID.
        - name: external_customer_id
          in: query
          required: false
          schema:
            anyOf:
              - type: string
              - items:
                  type: string
                type: array
              - type: 'null'
            title: ExternalCustomerID Filter
            description: Filter by external customer ID.
          description: Filter by external customer ID.
        - name: customer_aggregation_function
          in: query
          required: false
          schema:
            anyOf:
              - $ref: '#/components/schemas/AggregationFunction'
              - type: 'null'
            description: >-
              If set, will first compute the quantities per customer before
              aggregating them using the given function. If not set, the
              quantities will be aggregated across all events.
            title: Customer Aggregation Function
          description: >-
            If set, will first compute the quantities per customer before
            aggregating them using the given function. If not set, the
            quantities will be aggregated across all events.
        - name: metadata
          in: query
          required: false
          style: deepObject
          schema:
            $ref: '#/components/schemas/MetadataQuery'
          description: >-
            Filter by metadata key-value pairs. It uses the `deepObject` style,
            e.g. `?metadata[key]=value`.
      responses:
        '200':
          description: Successful Response
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/MeterQuantities'
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
          source: "package main\n\nimport(\n\t\"context\"\n\t\"os\"\n\tpolargo \"github.com/polarsource/polar-go\"\n\t\"github.com/polarsource/polar-go/types\"\n\t\"github.com/polarsource/polar-go/models/components\"\n\t\"github.com/polarsource/polar-go/models/operations\"\n\t\"log\"\n)\n\nfunc main() {\n    ctx := context.Background()\n\n    s := polargo.New(\n        polargo.WithSecurity(os.Getenv(\"POLAR_ACCESS_TOKEN\")),\n    )\n\n    res, err := s.Meters.Quantities(ctx, operations.MetersQuantitiesRequest{\n        ID: \"<value>\",\n        StartTimestamp: types.MustTimeFromString(\"2025-11-25T04:37:16.823Z\"),\n        EndTimestamp: types.MustTimeFromString(\"2025-11-26T17:06:00.727Z\"),\n        Interval: components.TimeIntervalDay,\n    })\n    if err != nil {\n        log.Fatal(err)\n    }\n    if res.MeterQuantities != nil {\n        // handle response\n    }\n}"
        - lang: python
          label: Python (SDK)
          source: |-
            import polar_sdk
            from polar_sdk import Polar
            from polar_sdk.utils import parse_datetime


            with Polar(
                access_token="<YOUR_BEARER_TOKEN_HERE>",
            ) as polar:

                res = polar.meters.quantities(id="<value>", start_timestamp=parse_datetime("2026-11-25T04:37:16.823Z"), end_timestamp=parse_datetime("2026-11-26T17:06:00.727Z"), interval=polar_sdk.TimeInterval.DAY, timezone="UTC")

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
              const result = await polar.meters.quantities({
                id: "<value>",
                startTimestamp: new Date("2025-11-25T04:37:16.823Z"),
                endTimestamp: new Date("2025-11-26T17:06:00.727Z"),
                interval: "day",
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
            use Polar\Models\Operations;
            use Polar\Utils;

            $sdk = Polar\Polar::builder()
                ->setSecurity(
                    '<YOUR_BEARER_TOKEN_HERE>'
                )
                ->build();

            $request = new Operations\MetersQuantitiesRequest(
                id: '<value>',
                startTimestamp: Utils\Utils::parseDateTime('2025-11-25T04:37:16.823Z'),
                endTimestamp: Utils\Utils::parseDateTime('2025-11-26T17:06:00.727Z'),
                interval: Components\TimeInterval::Day,
            );

            $response = $sdk->meters->quantities(
                request: $request
            );

            if ($response->meterQuantities !== null) {
                // handle response
            }
components:
  schemas:
    TimeInterval:
      type: string
      enum:
        - year
        - month
        - week
        - day
        - hour
      title: TimeInterval
    AggregationFunction:
      type: string
      enum:
        - count
        - sum
        - max
        - min
        - avg
        - unique
      title: AggregationFunction
    MetadataQuery:
      anyOf:
        - type: object
          additionalProperties:
            anyOf:
              - type: string
              - type: integer
              - type: boolean
              - items:
                  type: string
                type: array
              - type: array
                items:
                  type: integer
              - type: array
                items:
                  type: boolean
        - type: 'null'
      title: MetadataQuery
    MeterQuantities:
      properties:
        quantities:
          items:
            $ref: '#/components/schemas/MeterQuantity'
          type: array
          title: Quantities
        total:
          type: number
          title: Total
          description: The total quantity for the period.
          examples:
            - 100
      type: object
      required:
        - quantities
        - total
      title: MeterQuantities
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
    MeterQuantity:
      properties:
        timestamp:
          type: string
          format: date-time
          title: Timestamp
          description: The timestamp for the current period.
        quantity:
          type: number
          title: Quantity
          description: The quantity for the current period.
          examples:
            - 10
      type: object
      required:
        - timestamp
        - quantity
      title: MeterQuantity
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
  securitySchemes:
    access_token:
      type: http
      scheme: bearer
      description: >-
        You can generate an **Organization Access Token** from your
        organization's settings.

````