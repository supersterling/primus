> ## Documentation Index
> Fetch the complete documentation index at: https://polar.sh/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Deactivate License Key

> Deactivate a license key instance.

**Scopes**: `license_keys:write`



## OpenAPI

````yaml post /v1/license-keys/deactivate
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
  /v1/license-keys/deactivate:
    post:
      tags:
        - license_keys
        - public
      summary: Deactivate License Key
      description: |-
        Deactivate a license key instance.

        **Scopes**: `license_keys:write`
      operationId: license_keys:deactivate
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/LicenseKeyDeactivate'
        required: true
      responses:
        '204':
          description: License key activation deactivated.
        '404':
          description: License key not found.
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
          source: "package main\n\nimport(\n\t\"context\"\n\t\"os\"\n\tpolargo \"github.com/polarsource/polar-go\"\n\t\"github.com/polarsource/polar-go/models/components\"\n\t\"log\"\n)\n\nfunc main() {\n    ctx := context.Background()\n\n    s := polargo.New(\n        polargo.WithSecurity(os.Getenv(\"POLAR_ACCESS_TOKEN\")),\n    )\n\n    res, err := s.LicenseKeys.Deactivate(ctx, components.LicenseKeyDeactivate{\n        Key: \"<key>\",\n        OrganizationID: \"<value>\",\n        ActivationID: \"<value>\",\n    })\n    if err != nil {\n        log.Fatal(err)\n    }\n    if res != nil {\n        // handle response\n    }\n}"
        - lang: python
          label: Python (SDK)
          source: |-
            from polar_sdk import Polar


            with Polar(
                access_token="<YOUR_BEARER_TOKEN_HERE>",
            ) as polar:

                polar.license_keys.deactivate(request={
                    "key": "<key>",
                    "organization_id": "<value>",
                    "activation_id": "<value>",
                })

                # Use the SDK ...
        - lang: typescript
          label: Typescript (SDK)
          source: |-
            import { Polar } from "@polar-sh/sdk";

            const polar = new Polar({
              accessToken: process.env["POLAR_ACCESS_TOKEN"] ?? "",
            });

            async function run() {
              await polar.licenseKeys.deactivate({
                key: "<key>",
                organizationId: "<value>",
                activationId: "<value>",
              });


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

            $request = new Components\LicenseKeyDeactivate(
                key: '<key>',
                organizationId: '<value>',
                activationId: '<value>',
            );

            $response = $sdk->licenseKeys->deactivate(
                request: $request
            );

            if ($response->statusCode === 200) {
                // handle response
            }
components:
  schemas:
    LicenseKeyDeactivate:
      properties:
        key:
          type: string
          title: Key
        organization_id:
          type: string
          format: uuid4
          title: Organization Id
        activation_id:
          type: string
          format: uuid4
          title: Activation Id
      type: object
      required:
        - key
        - organization_id
        - activation_id
      title: LicenseKeyDeactivate
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