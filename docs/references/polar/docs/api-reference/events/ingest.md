> ## Documentation Index
> Fetch the complete documentation index at: https://polar.sh/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Ingest Events

> Ingest batch of events.

**Scopes**: `events:write`



## OpenAPI

````yaml post /v1/events/ingest
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
  /v1/events/ingest:
    post:
      tags:
        - events
        - public
      summary: Ingest Events
      description: |-
        Ingest batch of events.

        **Scopes**: `events:write`
      operationId: events:ingest
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/EventsIngest'
        required: true
      responses:
        '200':
          description: Successful Response
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/EventsIngestResponse'
        '422':
          description: Validation Error
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/HTTPValidationError'
      x-codeSamples:
        - lang: go
          label: Go (SDK)
          source: "package main\n\nimport(\n\t\"context\"\n\t\"os\"\n\tpolargo \"github.com/polarsource/polar-go\"\n\t\"github.com/polarsource/polar-go/models/components\"\n\t\"log\"\n)\n\nfunc main() {\n    ctx := context.Background()\n\n    s := polargo.New(\n        polargo.WithSecurity(os.Getenv(\"POLAR_ACCESS_TOKEN\")),\n    )\n\n    res, err := s.Events.Ingest(ctx, components.EventsIngest{\n        Events: []components.Events{},\n    })\n    if err != nil {\n        log.Fatal(err)\n    }\n    if res.EventsIngestResponse != nil {\n        // handle response\n    }\n}"
        - lang: python
          label: Python (SDK)
          source: |-
            from polar_sdk import Polar


            with Polar(
                access_token="<YOUR_BEARER_TOKEN_HERE>",
            ) as polar:

                res = polar.events.ingest(request={
                    "events": [],
                })

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
              const result = await polar.events.ingest({
                events: [],
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

            $sdk = Polar\Polar::builder()
                ->setSecurity(
                    '<YOUR_BEARER_TOKEN_HERE>'
                )
                ->build();

            $request = new Components\EventsIngest(
                events: [],
            );

            $response = $sdk->events->ingest(
                request: $request
            );

            if ($response->eventsIngestResponse !== null) {
                // handle response
            }
components:
  schemas:
    EventsIngest:
      properties:
        events:
          items:
            anyOf:
              - $ref: '#/components/schemas/EventCreateCustomer'
              - $ref: '#/components/schemas/EventCreateExternalCustomer'
          type: array
          title: Events
          description: List of events to ingest.
      type: object
      required:
        - events
      title: EventsIngest
    EventsIngestResponse:
      properties:
        inserted:
          type: integer
          title: Inserted
          description: Number of events inserted.
        duplicates:
          type: integer
          title: Duplicates
          description: Number of duplicate events skipped.
          default: 0
      type: object
      required:
        - inserted
      title: EventsIngestResponse
    HTTPValidationError:
      properties:
        detail:
          items:
            $ref: '#/components/schemas/ValidationError'
          type: array
          title: Detail
      type: object
      title: HTTPValidationError
    EventCreateCustomer:
      properties:
        timestamp:
          type: string
          format: date-time
          title: Timestamp
          description: The timestamp of the event.
        name:
          type: string
          title: Name
          description: The name of the event.
        organization_id:
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
            - type: 'null'
          title: Organization Id
          description: >-
            The ID of the organization owning the event. **Required unless you
            use an organization token.**
        external_id:
          anyOf:
            - type: string
            - type: 'null'
          title: External Id
          description: >-
            Your unique identifier for this event. Useful for deduplication and
            parent-child relationships.
        parent_id:
          anyOf:
            - type: string
            - type: 'null'
          title: Parent Id
          description: >-
            The ID of the parent event. Can be either a Polar event ID (UUID) or
            an external event ID.
        metadata:
          $ref: '#/components/schemas/EventMetadataInput'
          description: >-
            Key-value object allowing you to store additional information about
            the event. Some keys like `_llm` are structured data that are
            handled specially by Polar.


            The key must be a string with a maximum length of **40 characters**.

            The value must be either:


            * A string with a maximum length of **500 characters**

            * An integer

            * A floating-point number

            * A boolean


            You can store up to **50 key-value pairs**.
        customer_id:
          type: string
          format: uuid4
          title: Customer Id
          description: >-
            ID of the customer in your Polar organization associated with the
            event.
        member_id:
          anyOf:
            - type: string
              format: uuid4
            - type: 'null'
          title: Member Id
          description: >-
            ID of the member within the customer's organization who performed
            the action. Used for member-level attribution in B2B.
      type: object
      required:
        - name
        - customer_id
      title: EventCreateCustomer
    EventCreateExternalCustomer:
      properties:
        timestamp:
          type: string
          format: date-time
          title: Timestamp
          description: The timestamp of the event.
        name:
          type: string
          title: Name
          description: The name of the event.
        organization_id:
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
            - type: 'null'
          title: Organization Id
          description: >-
            The ID of the organization owning the event. **Required unless you
            use an organization token.**
        external_id:
          anyOf:
            - type: string
            - type: 'null'
          title: External Id
          description: >-
            Your unique identifier for this event. Useful for deduplication and
            parent-child relationships.
        parent_id:
          anyOf:
            - type: string
            - type: 'null'
          title: Parent Id
          description: >-
            The ID of the parent event. Can be either a Polar event ID (UUID) or
            an external event ID.
        metadata:
          $ref: '#/components/schemas/EventMetadataInput'
          description: >-
            Key-value object allowing you to store additional information about
            the event. Some keys like `_llm` are structured data that are
            handled specially by Polar.


            The key must be a string with a maximum length of **40 characters**.

            The value must be either:


            * A string with a maximum length of **500 characters**

            * An integer

            * A floating-point number

            * A boolean


            You can store up to **50 key-value pairs**.
        external_customer_id:
          type: string
          title: External Customer Id
          description: ID of the customer in your system associated with the event.
        external_member_id:
          anyOf:
            - type: string
            - type: 'null'
          title: External Member Id
          description: >-
            ID of the member in your system within the customer's organization
            who performed the action. Used for member-level attribution in B2B.
      type: object
      required:
        - name
        - external_customer_id
      title: EventCreateExternalCustomer
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
    EventMetadataInput:
      additionalProperties:
        anyOf:
          - type: string
            maxLength: 500
            minLength: 1
          - type: integer
          - type: number
          - type: boolean
          - $ref: '#/components/schemas/CostMetadata-Input'
          - $ref: '#/components/schemas/LLMMetadata'
      type: object
      title: EventMetadataInput
    CostMetadata-Input:
      properties:
        amount:
          anyOf:
            - type: number
            - type: string
              pattern: >-
                ^(?!^[-+.]*$)[+-]?0*(?:\d{0,5}|(?=[\d.]{1,18}0*$)\d{0,5}\.\d{0,12}0*$)
          title: Amount
          description: The amount in cents.
        currency:
          type: string
          pattern: usd
          title: Currency
          description: The currency. Currently, only `usd` is supported.
      type: object
      required:
        - amount
        - currency
      title: CostMetadata
    LLMMetadata:
      properties:
        vendor:
          type: string
          title: Vendor
          description: The vendor of the event.
        model:
          type: string
          title: Model
          description: The model used for the event.
        prompt:
          anyOf:
            - type: string
            - type: 'null'
          title: Prompt
          description: The LLM prompt used for the event.
        response:
          anyOf:
            - type: string
            - type: 'null'
          title: Response
          description: The LLM response used for the event.
        input_tokens:
          type: integer
          title: Input Tokens
          description: The number of LLM input tokens used for the event.
        cached_input_tokens:
          type: integer
          title: Cached Input Tokens
          description: The number of LLM cached tokens that were used for the event.
        output_tokens:
          type: integer
          title: Output Tokens
          description: The number of LLM output tokens used for the event.
        total_tokens:
          type: integer
          title: Total Tokens
          description: The total number of LLM tokens used for the event.
      type: object
      required:
        - vendor
        - model
        - input_tokens
        - output_tokens
        - total_tokens
      title: LLMMetadata
  securitySchemes:
    access_token:
      type: http
      scheme: bearer
      description: >-
        You can generate an **Organization Access Token** from your
        organization's settings.

````