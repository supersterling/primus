> ## Documentation Index
> Fetch the complete documentation index at: https://polar.sh/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Delete Customer by External ID

> Delete a customer by external ID.

Immediately cancels any active subscriptions and revokes any active benefits.

Set `anonymize=true` to also anonymize PII for GDPR compliance.

**Scopes**: `customers:write`



## OpenAPI

````yaml delete /v1/customers/external/{external_id}
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
  /v1/customers/external/{external_id}:
    delete:
      tags:
        - customers
        - public
        - mcp
      summary: Delete Customer by External ID
      description: >-
        Delete a customer by external ID.


        Immediately cancels any active subscriptions and revokes any active
        benefits.


        Set `anonymize=true` to also anonymize PII for GDPR compliance.


        **Scopes**: `customers:write`
      operationId: customers:delete_external
      parameters:
        - name: external_id
          in: path
          required: true
          schema:
            type: string
            description: The customer external ID.
            title: External Id
          description: The customer external ID.
        - name: anonymize
          in: query
          required: false
          schema:
            type: boolean
            description: >-
              If true, also anonymize the customer's personal data for GDPR
              compliance.
            default: false
            title: Anonymize
          description: >-
            If true, also anonymize the customer's personal data for GDPR
            compliance.
      responses:
        '204':
          description: Customer deleted.
        '404':
          description: Customer not found.
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
          source: "package main\n\nimport(\n\t\"context\"\n\t\"os\"\n\tpolargo \"github.com/polarsource/polar-go\"\n\t\"log\"\n)\n\nfunc main() {\n    ctx := context.Background()\n\n    s := polargo.New(\n        polargo.WithSecurity(os.Getenv(\"POLAR_ACCESS_TOKEN\")),\n    )\n\n    res, err := s.Customers.DeleteExternal(ctx, \"<id>\", polargo.Pointer(false))\n    if err != nil {\n        log.Fatal(err)\n    }\n    if res != nil {\n        // handle response\n    }\n}"
        - lang: python
          label: Python (SDK)
          source: |-
            from polar_sdk import Polar


            with Polar(
                access_token="<YOUR_BEARER_TOKEN_HERE>",
            ) as polar:

                polar.customers.delete_external(external_id="<id>", anonymize=False)

                # Use the SDK ...
        - lang: typescript
          label: Typescript (SDK)
          source: |-
            import { Polar } from "@polar-sh/sdk";

            const polar = new Polar({
              accessToken: process.env["POLAR_ACCESS_TOKEN"] ?? "",
            });

            async function run() {
              await polar.customers.deleteExternal({
                externalId: "<id>",
              });


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



            $response = $sdk->customers->deleteExternal(
                externalId: '<id>',
                anonymize: false

            );

            if ($response->statusCode === 200) {
                // handle response
            }
components:
  schemas:
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

````