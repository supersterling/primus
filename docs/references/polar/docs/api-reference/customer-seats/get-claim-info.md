> ## Documentation Index
> Fetch the complete documentation index at: https://polar.sh/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Get Claim Info



## OpenAPI

````yaml get /v1/customer-seats/claim/{invitation_token}
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
  /v1/customer-seats/claim/{invitation_token}:
    get:
      tags:
        - customer-seats
        - public
      summary: Get Claim Info
      operationId: customer-seats:get_claim_info
      parameters:
        - name: invitation_token
          in: path
          required: true
          schema:
            type: string
            title: Invitation Token
      responses:
        '200':
          description: Successful Response
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/SeatClaimInfo'
        '400':
          description: Invalid or expired invitation token
        '403':
          description: Seat-based pricing not enabled for organization
        '404':
          description: Seat not found
        '422':
          description: Validation Error
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/HTTPValidationError'
      security:
        - {}
      x-codeSamples:
        - lang: go
          label: Go (SDK)
          source: "package main\n\nimport(\n\t\"context\"\n\tpolargo \"github.com/polarsource/polar-go\"\n\t\"log\"\n)\n\nfunc main() {\n    ctx := context.Background()\n\n    s := polargo.New()\n\n    res, err := s.CustomerSeats.GetClaimInfo(ctx, \"<value>\")\n    if err != nil {\n        log.Fatal(err)\n    }\n    if res.SeatClaimInfo != nil {\n        // handle response\n    }\n}"
        - lang: python
          label: Python (SDK)
          source: |-
            from polar_sdk import Polar


            with Polar() as polar:

                res = polar.customer_seats.get_claim_info(invitation_token="<value>")

                # Handle response
                print(res)
        - lang: typescript
          label: Typescript (SDK)
          source: |-
            import { Polar } from "@polar-sh/sdk";

            const polar = new Polar();

            async function run() {
              const result = await polar.customerSeats.getClaimInfo({
                invitationToken: "<value>",
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

            $sdk = Polar\Polar::builder()->build();



            $response = $sdk->customerSeats->getClaimInfo(
                invitationToken: '<value>'
            );

            if ($response->seatClaimInfo !== null) {
                // handle response
            }
components:
  schemas:
    SeatClaimInfo:
      properties:
        product_name:
          type: string
          title: Product Name
          description: Name of the product
        product_id:
          type: string
          format: uuid
          title: Product Id
          description: ID of the product
        organization_name:
          type: string
          title: Organization Name
          description: Name of the organization
        organization_slug:
          type: string
          title: Organization Slug
          description: Slug of the organization
        customer_email:
          type: string
          title: Customer Email
          description: Email of the customer assigned to this seat
        can_claim:
          type: boolean
          title: Can Claim
          description: Whether the seat can be claimed
      type: object
      required:
        - product_name
        - product_id
        - organization_name
        - organization_slug
        - customer_email
        - can_claim
      title: SeatClaimInfo
      description: |-
        Read-only information about a seat claim invitation.
        Safe for email scanners - no side effects when fetched.
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