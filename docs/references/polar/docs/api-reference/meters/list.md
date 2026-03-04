> ## Documentation Index
> Fetch the complete documentation index at: https://polar.sh/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# List Meters

> List meters.

**Scopes**: `meters:read` `meters:write`



## OpenAPI

````yaml get /v1/meters/
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
    get:
      tags:
        - meters
        - public
      summary: List Meters
      description: |-
        List meters.

        **Scopes**: `meters:read` `meters:write`
      operationId: meters:list
      parameters:
        - name: organization_id
          in: query
          required: false
          schema:
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
              - type: array
                items:
                  type: string
                  format: uuid4
                  description: The organization ID.
                  examples:
                    - 1dbfc517-0bbf-4301-9ba8-555ca42b9737
                  x-polar-selector-widget:
                    displayProperty: name
                    resourceName: Organization
                    resourceRoot: /v1/organizations
              - type: 'null'
            title: OrganizationID Filter
            description: Filter by organization ID.
          description: Filter by organization ID.
        - name: query
          in: query
          required: false
          schema:
            anyOf:
              - type: string
              - type: 'null'
            description: Filter by name.
            title: Query
          description: Filter by name.
        - name: is_archived
          in: query
          required: false
          schema:
            anyOf:
              - type: boolean
              - type: 'null'
            description: Filter on archived meters.
            title: Is Archived
          description: Filter on archived meters.
        - name: page
          in: query
          required: false
          schema:
            type: integer
            exclusiveMinimum: 0
            description: Page number, defaults to 1.
            default: 1
            title: Page
          description: Page number, defaults to 1.
        - name: limit
          in: query
          required: false
          schema:
            type: integer
            exclusiveMinimum: 0
            description: Size of a page, defaults to 10. Maximum is 100.
            default: 10
            title: Limit
          description: Size of a page, defaults to 10. Maximum is 100.
        - name: sorting
          in: query
          required: false
          schema:
            anyOf:
              - type: array
                items:
                  $ref: '#/components/schemas/MeterSortProperty'
              - type: 'null'
            description: >-
              Sorting criterion. Several criteria can be used simultaneously and
              will be applied in order. Add a minus sign `-` before the criteria
              name to sort by descending order.
            default:
              - name
            title: Sorting
          description: >-
            Sorting criterion. Several criteria can be used simultaneously and
            will be applied in order. Add a minus sign `-` before the criteria
            name to sort by descending order.
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
                $ref: '#/components/schemas/ListResource_Meter_'
        '422':
          description: Validation Error
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/HTTPValidationError'
      x-codeSamples:
        - lang: go
          label: Go (SDK)
          source: "package main\n\nimport(\n\t\"context\"\n\t\"os\"\n\tpolargo \"github.com/polarsource/polar-go\"\n\t\"github.com/polarsource/polar-go/models/operations\"\n\t\"log\"\n)\n\nfunc main() {\n    ctx := context.Background()\n\n    s := polargo.New(\n        polargo.WithSecurity(os.Getenv(\"POLAR_ACCESS_TOKEN\")),\n    )\n\n    res, err := s.Meters.List(ctx, operations.MetersListRequest{\n        OrganizationID: polargo.Pointer(operations.CreateMetersListQueryParamOrganizationIDFilterStr(\n            \"1dbfc517-0bbf-4301-9ba8-555ca42b9737\",\n        )),\n    })\n    if err != nil {\n        log.Fatal(err)\n    }\n    if res.ListResourceMeter != nil {\n        for {\n            // handle items\n\n            res, err = res.Next()\n\n            if err != nil {\n                // handle error\n            }\n\n            if res == nil {\n                break\n            }\n        }\n    }\n}"
        - lang: python
          label: Python (SDK)
          source: |-
            from polar_sdk import Polar


            with Polar(
                access_token="<YOUR_BEARER_TOKEN_HERE>",
            ) as polar:

                res = polar.meters.list(organization_id="1dbfc517-0bbf-4301-9ba8-555ca42b9737", page=1, limit=10)

                while res is not None:
                    # Handle items

                    res = res.next()
        - lang: typescript
          label: Typescript (SDK)
          source: |-
            import { Polar } from "@polar-sh/sdk";

            const polar = new Polar({
              accessToken: process.env["POLAR_ACCESS_TOKEN"] ?? "",
            });

            async function run() {
              const result = await polar.meters.list({
                organizationId: "1dbfc517-0bbf-4301-9ba8-555ca42b9737",
              });

              for await (const page of result) {
                console.log(page);
              }
            }

            run();
        - lang: php
          label: PHP (SDK)
          source: |-
            declare(strict_types=1);

            require 'vendor/autoload.php';

            use Polar;
            use Polar\Models\Operations;

            $sdk = Polar\Polar::builder()
                ->setSecurity(
                    '<YOUR_BEARER_TOKEN_HERE>'
                )
                ->build();

            $request = new Operations\MetersListRequest(
                organizationId: '1dbfc517-0bbf-4301-9ba8-555ca42b9737',
            );

            $responses = $sdk->meters->list(
                request: $request
            );


            foreach ($responses as $response) {
                if ($response->statusCode === 200) {
                    // handle response
                }
            }
components:
  schemas:
    MeterSortProperty:
      type: string
      enum:
        - created_at
        - '-created_at'
        - name
        - '-name'
      title: MeterSortProperty
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
    ListResource_Meter_:
      properties:
        items:
          items:
            $ref: '#/components/schemas/Meter'
          type: array
          title: Items
        pagination:
          $ref: '#/components/schemas/Pagination'
      type: object
      required:
        - items
        - pagination
      title: ListResource[Meter]
    HTTPValidationError:
      properties:
        detail:
          items:
            $ref: '#/components/schemas/ValidationError'
          type: array
          title: Detail
      type: object
      title: HTTPValidationError
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
    Pagination:
      properties:
        total_count:
          type: integer
          title: Total Count
        max_page:
          type: integer
          title: Max Page
      type: object
      required:
        - total_count
        - max_page
      title: Pagination
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