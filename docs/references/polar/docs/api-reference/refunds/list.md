> ## Documentation Index
> Fetch the complete documentation index at: https://polar.sh/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# List Refunds

> List refunds.

**Scopes**: `refunds:read` `refunds:write`



## OpenAPI

````yaml get /v1/refunds/
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
  /v1/refunds/:
    get:
      tags:
        - refunds
        - public
      summary: List Refunds
      description: |-
        List refunds.

        **Scopes**: `refunds:read` `refunds:write`
      operationId: refunds:list
      parameters:
        - name: id
          in: query
          required: false
          schema:
            anyOf:
              - type: string
                format: uuid4
                description: The refund ID.
              - type: array
                items:
                  type: string
                  format: uuid4
                  description: The refund ID.
              - type: 'null'
            title: RefundID Filter
            description: Filter by refund ID.
          description: Filter by refund ID.
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
        - name: order_id
          in: query
          required: false
          schema:
            anyOf:
              - type: string
                format: uuid4
                description: The order ID.
              - type: array
                items:
                  type: string
                  format: uuid4
                  description: The order ID.
              - type: 'null'
            title: OrderID Filter
            description: Filter by order ID.
          description: Filter by order ID.
        - name: subscription_id
          in: query
          required: false
          schema:
            anyOf:
              - type: string
                format: uuid4
                description: The subscription ID.
              - type: array
                items:
                  type: string
                  format: uuid4
                  description: The subscription ID.
              - type: 'null'
            title: SubscriptionID Filter
            description: Filter by subscription ID.
          description: Filter by subscription ID.
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
                description: The customer external ID.
              - type: array
                items:
                  type: string
                  description: The customer external ID.
              - type: 'null'
            title: ExternalCustomerID Filter
            description: Filter by customer external ID.
          description: Filter by customer external ID.
        - name: succeeded
          in: query
          required: false
          schema:
            anyOf:
              - type: boolean
              - type: 'null'
            title: RefundStatus Filter
            description: Filter by `succeeded`.
          description: Filter by `succeeded`.
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
                  $ref: '#/components/schemas/RefundSortProperty'
              - type: 'null'
            description: >-
              Sorting criterion. Several criteria can be used simultaneously and
              will be applied in order. Add a minus sign `-` before the criteria
              name to sort by descending order.
            default:
              - '-created_at'
            title: Sorting
          description: >-
            Sorting criterion. Several criteria can be used simultaneously and
            will be applied in order. Add a minus sign `-` before the criteria
            name to sort by descending order.
      responses:
        '200':
          description: Successful Response
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ListResource_Refund_'
        '422':
          description: Validation Error
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/HTTPValidationError'
      x-codeSamples:
        - lang: go
          label: Go (SDK)
          source: "package main\n\nimport(\n\t\"context\"\n\t\"os\"\n\tpolargo \"github.com/polarsource/polar-go\"\n\t\"github.com/polarsource/polar-go/models/operations\"\n\t\"log\"\n)\n\nfunc main() {\n    ctx := context.Background()\n\n    s := polargo.New(\n        polargo.WithSecurity(os.Getenv(\"POLAR_ACCESS_TOKEN\")),\n    )\n\n    res, err := s.Refunds.List(ctx, operations.RefundsListRequest{\n        OrganizationID: polargo.Pointer(operations.CreateRefundsListQueryParamOrganizationIDFilterStr(\n            \"1dbfc517-0bbf-4301-9ba8-555ca42b9737\",\n        )),\n    })\n    if err != nil {\n        log.Fatal(err)\n    }\n    if res.ListResourceRefund != nil {\n        for {\n            // handle items\n\n            res, err = res.Next()\n\n            if err != nil {\n                // handle error\n            }\n\n            if res == nil {\n                break\n            }\n        }\n    }\n}"
        - lang: python
          label: Python (SDK)
          source: |-
            from polar_sdk import Polar


            with Polar(
                access_token="<YOUR_BEARER_TOKEN_HERE>",
            ) as polar:

                res = polar.refunds.list(organization_id="1dbfc517-0bbf-4301-9ba8-555ca42b9737", page=1, limit=10)

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
              const result = await polar.refunds.list({
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

            $request = new Operations\RefundsListRequest(
                organizationId: '1dbfc517-0bbf-4301-9ba8-555ca42b9737',
            );

            $responses = $sdk->refunds->list(
                request: $request
            );


            foreach ($responses as $response) {
                if ($response->statusCode === 200) {
                    // handle response
                }
            }
components:
  schemas:
    RefundSortProperty:
      type: string
      enum:
        - created_at
        - '-created_at'
        - amount
        - '-amount'
      title: RefundSortProperty
    ListResource_Refund_:
      properties:
        items:
          items:
            $ref: '#/components/schemas/Refund'
          type: array
          title: Items
        pagination:
          $ref: '#/components/schemas/Pagination'
      type: object
      required:
        - items
        - pagination
      title: ListResource[Refund]
    HTTPValidationError:
      properties:
        detail:
          items:
            $ref: '#/components/schemas/ValidationError'
          type: array
          title: Detail
      type: object
      title: HTTPValidationError
    Refund:
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
        status:
          $ref: '#/components/schemas/RefundStatus'
        reason:
          $ref: '#/components/schemas/RefundReason'
        amount:
          type: integer
          title: Amount
        tax_amount:
          type: integer
          title: Tax Amount
        currency:
          type: string
          title: Currency
        organization_id:
          type: string
          format: uuid4
          title: Organization Id
        order_id:
          type: string
          format: uuid4
          title: Order Id
        subscription_id:
          anyOf:
            - type: string
              format: uuid4
            - type: 'null'
          title: Subscription Id
        customer_id:
          type: string
          format: uuid4
          title: Customer Id
        revoke_benefits:
          type: boolean
          title: Revoke Benefits
        dispute:
          anyOf:
            - $ref: '#/components/schemas/RefundDispute'
            - type: 'null'
      type: object
      required:
        - created_at
        - modified_at
        - id
        - metadata
        - status
        - reason
        - amount
        - tax_amount
        - currency
        - organization_id
        - order_id
        - subscription_id
        - customer_id
        - revoke_benefits
        - dispute
      title: Refund
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
    RefundStatus:
      type: string
      enum:
        - pending
        - succeeded
        - failed
        - canceled
      title: RefundStatus
    RefundReason:
      type: string
      enum:
        - duplicate
        - fraudulent
        - customer_request
        - service_disruption
        - satisfaction_guarantee
        - dispute_prevention
        - other
      title: RefundReason
    RefundDispute:
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
        status:
          $ref: '#/components/schemas/DisputeStatus'
          description: >-
            Status of the dispute. `prevented` means we issued a refund before
            the dispute was escalated, avoiding any fees.
          examples:
            - needs_response
            - prevented
        resolved:
          type: boolean
          title: Resolved
          description: Whether the dispute has been resolved (won or lost).
          examples:
            - false
        closed:
          type: boolean
          title: Closed
          description: Whether the dispute is closed (prevented, won, or lost).
          examples:
            - false
        amount:
          type: integer
          title: Amount
          description: Amount in cents disputed.
          examples:
            - 1000
        tax_amount:
          type: integer
          title: Tax Amount
          description: Tax amount in cents disputed.
          examples:
            - 200
        currency:
          type: string
          title: Currency
          description: Currency code of the dispute.
          examples:
            - usd
        order_id:
          type: string
          format: uuid4
          title: Order Id
          description: The ID of the order associated with the dispute.
          examples:
            - 57107b74-8400-4d80-a2fc-54c2b4239cb3
        payment_id:
          type: string
          format: uuid4
          title: Payment Id
          description: The ID of the payment associated with the dispute.
          examples:
            - 42b94870-36b9-4573-96b6-b90b1c99a353
      type: object
      required:
        - created_at
        - modified_at
        - id
        - status
        - resolved
        - closed
        - amount
        - tax_amount
        - currency
        - order_id
        - payment_id
      title: RefundDispute
      description: |-
        Dispute associated with a refund,
        in case we prevented a dispute by issuing a refund.
    DisputeStatus:
      type: string
      enum:
        - prevented
        - early_warning
        - needs_response
        - under_review
        - lost
        - won
      title: DisputeStatus
  securitySchemes:
    access_token:
      type: http
      scheme: bearer
      description: >-
        You can generate an **Organization Access Token** from your
        organization's settings.

````