> ## Documentation Index
> Fetch the complete documentation index at: https://polar.sh/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Get Order Invoice

> Get an order's invoice data.

<Note>
  The invoice must be generated first before it can be retrieved. You should call the [`POST /v1/customer-portal/orders/{id}/invoice`](/api-reference/customer-portal/orders/post-invoice) endpoint to generate the invoice.

  If the invoice is not generated, you will receive a `404` error.
</Note>


## OpenAPI

````yaml get /v1/customer-portal/orders/{id}/invoice
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
  /v1/customer-portal/orders/{id}/invoice:
    get:
      tags:
        - customer_portal
        - orders
        - public
      summary: Get Order Invoice
      description: Get an order's invoice data.
      operationId: customer_portal:orders:invoice
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
            format: uuid4
            description: The order ID.
            title: Id
          description: The order ID.
      responses:
        '200':
          description: Successful Response
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/CustomerOrderInvoice'
        '404':
          description: Order not found.
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
      security:
        - customer_session:
            - customer_portal:read
            - customer_portal:write
        - member_session:
            - customer_portal:read
            - customer_portal:write
      x-codeSamples:
        - lang: go
          label: Go (SDK)
          source: "package main\n\nimport(\n\t\"context\"\n\tpolargo \"github.com/polarsource/polar-go\"\n\t\"os\"\n\t\"github.com/polarsource/polar-go/models/operations\"\n\t\"log\"\n)\n\nfunc main() {\n    ctx := context.Background()\n\n    s := polargo.New()\n\n    res, err := s.CustomerPortal.Orders.Invoice(ctx, operations.CustomerPortalOrdersInvoiceSecurity{\n        CustomerSession: polargo.Pointer(os.Getenv(\"POLAR_CUSTOMER_SESSION\")),\n    }, \"<value>\")\n    if err != nil {\n        log.Fatal(err)\n    }\n    if res.CustomerOrderInvoice != nil {\n        // handle response\n    }\n}"
        - lang: python
          label: Python (SDK)
          source: |-
            import polar_sdk
            from polar_sdk import Polar


            with Polar() as polar:

                res = polar.customer_portal.orders.invoice(security=polar_sdk.CustomerPortalOrdersInvoiceSecurity(
                    customer_session="<YOUR_BEARER_TOKEN_HERE>",
                ), id="<value>")

                # Handle response
                print(res)
        - lang: typescript
          label: Typescript (SDK)
          source: |-
            import { Polar } from "@polar-sh/sdk";

            const polar = new Polar();

            async function run() {
              const result = await polar.customerPortal.orders.invoice({
                customerSession: process.env["POLAR_CUSTOMER_SESSION"] ?? "",
              }, {
                id: "<value>",
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

            use Polar\Models\Operations;


            $sdk = Polar\Polar::builder()->build();



            $requestSecurity = new
            Operations\CustomerPortalOrdersInvoiceSecurity(
                customerSession: '<YOUR_BEARER_TOKEN_HERE>',
            );


            $response = $sdk->customerPortal->orders->invoice(
                security: $requestSecurity,
                id: '<value>'

            );


            if ($response->customerOrderInvoice !== null) {
                // handle response
            }
components:
  schemas:
    CustomerOrderInvoice:
      properties:
        url:
          type: string
          title: Url
          description: The URL to the invoice.
      type: object
      required:
        - url
      title: CustomerOrderInvoice
      description: Order's invoice data.
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
    customer_session:
      type: http
      description: >-
        Customer session tokens are specific tokens that are used to
        authenticate customers on your organization. You can create those
        sessions programmatically using the [Create Customer Session
        endpoint](/api-reference/customer-portal/sessions/create).
      scheme: bearer
    member_session:
      type: http
      description: >-
        Member session tokens are specific tokens that are used to authenticate
        members on your organization. You can create those sessions
        programmatically using the [Create Member Session
        endpoint](/api-reference/member-portal/sessions/create).
      scheme: bearer

````