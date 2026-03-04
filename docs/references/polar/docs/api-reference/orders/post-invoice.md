> ## Documentation Index
> Fetch the complete documentation index at: https://polar.sh/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Generate Order Invoice

> Trigger generation of an order's invoice.

**Scopes**: `orders:read`

<Warning>
  Once the invoice is generated, it's permanent and cannot be modified.

  Make sure the billing details (name and address) are correct before generating the invoice. You can update them before generating the invoice by calling the [`PATCH /v1/orders/{id}`](/api-reference/orders/patch) endpoint.
</Warning>

<Note>
  After successfully calling this endpoint, you get a `202` response, meaning
  the generation of the invoice has been scheduled. It usually only takes a few
  seconds before you can retrieve the invoice using the [`GET /v1/orders/{id}
    /invoice`](/api-reference/orders/get-invoice) endpoint.

  If you want a reliable notification when the invoice is ready, you can listen to the
  [`order.updated`](/api-reference/webhooks/order.updated) webhook and check the [`is_invoice_generated` field](/api-reference/webhooks/order.updated#schema-data-is-invoice-generated).
</Note>


## OpenAPI

````yaml post /v1/orders/{id}/invoice
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
  /v1/orders/{id}/invoice:
    post:
      tags:
        - orders
        - public
        - mcp
      summary: Generate Order Invoice
      description: |-
        Trigger generation of an order's invoice.

        **Scopes**: `orders:read`
      operationId: orders:generate_invoice
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
        '202':
          description: Successful Response
          content:
            application/json:
              schema: {}
        '422':
          description: Order is not paid or is missing billing name or address.
          content:
            application/json:
              schema:
                anyOf:
                  - $ref: '#/components/schemas/MissingInvoiceBillingDetails'
                  - $ref: '#/components/schemas/NotPaidOrder'
                title: Response 422 Orders:Generate Invoice
      x-codeSamples:
        - lang: go
          label: Go (SDK)
          source: "package main\n\nimport(\n\t\"context\"\n\t\"os\"\n\tpolargo \"github.com/polarsource/polar-go\"\n\t\"log\"\n)\n\nfunc main() {\n    ctx := context.Background()\n\n    s := polargo.New(\n        polargo.WithSecurity(os.Getenv(\"POLAR_ACCESS_TOKEN\")),\n    )\n\n    res, err := s.Orders.GenerateInvoice(ctx, \"<value>\")\n    if err != nil {\n        log.Fatal(err)\n    }\n    if res.Any != nil {\n        // handle response\n    }\n}"
        - lang: python
          label: Python (SDK)
          source: |-
            from polar_sdk import Polar


            with Polar(
                access_token="<YOUR_BEARER_TOKEN_HERE>",
            ) as polar:

                res = polar.orders.generate_invoice(id="<value>")

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
              const result = await polar.orders.generateInvoice({
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



            $response = $sdk->orders->generateInvoice(
                id: '<value>'
            );

            if ($response->any !== null) {
                // handle response
            }
components:
  schemas:
    MissingInvoiceBillingDetails:
      properties:
        error:
          type: string
          const: MissingInvoiceBillingDetails
          title: Error
          examples:
            - MissingInvoiceBillingDetails
        detail:
          type: string
          title: Detail
      type: object
      required:
        - error
        - detail
      title: MissingInvoiceBillingDetails
    NotPaidOrder:
      properties:
        error:
          type: string
          const: NotPaidOrder
          title: Error
          examples:
            - NotPaidOrder
        detail:
          type: string
          title: Detail
      type: object
      required:
        - error
        - detail
      title: NotPaidOrder
  securitySchemes:
    access_token:
      type: http
      scheme: bearer
      description: >-
        You can generate an **Organization Access Token** from your
        organization's settings.

````