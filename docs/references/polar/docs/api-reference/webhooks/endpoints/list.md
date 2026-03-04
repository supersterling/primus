> ## Documentation Index
> Fetch the complete documentation index at: https://polar.sh/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# List Webhook Endpoints

> List webhook endpoints.

**Scopes**: `webhooks:read` `webhooks:write`



## OpenAPI

````yaml get /v1/webhooks/endpoints
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
  /v1/webhooks/endpoints:
    get:
      tags:
        - webhooks
        - public
      summary: List Webhook Endpoints
      description: |-
        List webhook endpoints.

        **Scopes**: `webhooks:read` `webhooks:write`
      operationId: webhooks:list_webhook_endpoints
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
            description: Filter by organization ID.
            title: Organization Id
          description: Filter by organization ID.
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
      responses:
        '200':
          description: Successful Response
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ListResource_WebhookEndpoint_'
        '422':
          description: Validation Error
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/HTTPValidationError'
      x-codeSamples:
        - lang: go
          label: Go (SDK)
          source: "package main\n\nimport(\n\t\"context\"\n\t\"os\"\n\tpolargo \"github.com/polarsource/polar-go\"\n\t\"github.com/polarsource/polar-go/models/operations\"\n\t\"log\"\n)\n\nfunc main() {\n    ctx := context.Background()\n\n    s := polargo.New(\n        polargo.WithSecurity(os.Getenv(\"POLAR_ACCESS_TOKEN\")),\n    )\n\n    res, err := s.Webhooks.ListWebhookEndpoints(ctx, polargo.Pointer(operations.CreateQueryParamOrganizationIDStr(\n        \"1dbfc517-0bbf-4301-9ba8-555ca42b9737\",\n    )), polargo.Pointer[int64](1), polargo.Pointer[int64](10))\n    if err != nil {\n        log.Fatal(err)\n    }\n    if res.ListResourceWebhookEndpoint != nil {\n        for {\n            // handle items\n\n            res, err = res.Next()\n\n            if err != nil {\n                // handle error\n            }\n\n            if res == nil {\n                break\n            }\n        }\n    }\n}"
        - lang: python
          label: Python (SDK)
          source: |-
            from polar_sdk import Polar


            with Polar(
                access_token="<YOUR_BEARER_TOKEN_HERE>",
            ) as polar:

                res = polar.webhooks.list_webhook_endpoints(organization_id="1dbfc517-0bbf-4301-9ba8-555ca42b9737", page=1, limit=10)

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
              const result = await polar.webhooks.listWebhookEndpoints({
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

            $sdk = Polar\Polar::builder()
                ->setSecurity(
                    '<YOUR_BEARER_TOKEN_HERE>'
                )
                ->build();



            $responses = $sdk->webhooks->listWebhookEndpoints(
                organizationId: '1dbfc517-0bbf-4301-9ba8-555ca42b9737',
                page: 1,
                limit: 10

            );


            foreach ($responses as $response) {
                if ($response->statusCode === 200) {
                    // handle response
                }
            }
components:
  schemas:
    ListResource_WebhookEndpoint_:
      properties:
        items:
          items:
            $ref: '#/components/schemas/WebhookEndpoint'
          type: array
          title: Items
        pagination:
          $ref: '#/components/schemas/Pagination'
      type: object
      required:
        - items
        - pagination
      title: ListResource[WebhookEndpoint]
    HTTPValidationError:
      properties:
        detail:
          items:
            $ref: '#/components/schemas/ValidationError'
          type: array
          title: Detail
      type: object
      title: HTTPValidationError
    WebhookEndpoint:
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
        url:
          type: string
          maxLength: 2083
          minLength: 1
          format: uri
          title: Url
          description: The URL where the webhook events will be sent.
          examples:
            - https://webhook.site/cb791d80-f26e-4f8c-be88-6e56054192b0
        name:
          anyOf:
            - type: string
            - type: 'null'
          title: Name
          description: >-
            An optional name for the webhook endpoint to help organize and
            identify it.
        format:
          $ref: '#/components/schemas/WebhookFormat'
          description: The format of the webhook payload.
        secret:
          type: string
          title: Secret
          description: The secret used to sign the webhook events.
          examples:
            - polar_whs_ovyN6cPrTv56AApvzCaJno08SSmGJmgbWilb33N2JuK
        organization_id:
          type: string
          format: uuid4
          title: Organization Id
          description: The organization ID associated with the webhook endpoint.
        events:
          items:
            $ref: '#/components/schemas/WebhookEventType'
          type: array
          title: Events
          description: The events that will trigger the webhook.
        enabled:
          type: boolean
          title: Enabled
          description: Whether the webhook endpoint is enabled and will receive events.
      type: object
      required:
        - created_at
        - modified_at
        - id
        - url
        - format
        - secret
        - organization_id
        - events
        - enabled
      title: WebhookEndpoint
      description: A webhook endpoint.
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
    WebhookFormat:
      type: string
      enum:
        - raw
        - discord
        - slack
      title: WebhookFormat
    WebhookEventType:
      type: string
      enum:
        - checkout.created
        - checkout.updated
        - checkout.expired
        - customer.created
        - customer.updated
        - customer.deleted
        - customer.state_changed
        - customer_seat.assigned
        - customer_seat.claimed
        - customer_seat.revoked
        - member.created
        - member.updated
        - member.deleted
        - order.created
        - order.updated
        - order.paid
        - order.refunded
        - subscription.created
        - subscription.updated
        - subscription.active
        - subscription.canceled
        - subscription.uncanceled
        - subscription.revoked
        - subscription.past_due
        - refund.created
        - refund.updated
        - product.created
        - product.updated
        - benefit.created
        - benefit.updated
        - benefit_grant.created
        - benefit_grant.cycled
        - benefit_grant.updated
        - benefit_grant.revoked
        - organization.updated
      title: WebhookEventType
  securitySchemes:
    access_token:
      type: http
      scheme: bearer
      description: >-
        You can generate an **Organization Access Token** from your
        organization's settings.

````