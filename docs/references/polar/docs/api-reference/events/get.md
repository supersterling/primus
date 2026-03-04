> ## Documentation Index
> Fetch the complete documentation index at: https://polar.sh/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Get Event

> Get an event by ID.

**Scopes**: `events:read` `events:write`



## OpenAPI

````yaml get /v1/events/{id}
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
  /v1/events/{id}:
    get:
      tags:
        - events
        - public
      summary: Get Event
      description: |-
        Get an event by ID.

        **Scopes**: `events:read` `events:write`
      operationId: events:get
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
            format: uuid4
            description: The event ID.
            title: Id
          description: The event ID.
      responses:
        '200':
          description: Successful Response
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Event'
        '404':
          description: Event not found.
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
          source: "package main\n\nimport(\n\t\"context\"\n\t\"os\"\n\tpolargo \"github.com/polarsource/polar-go\"\n\t\"log\"\n\t\"github.com/polarsource/polar-go/models/components\"\n)\n\nfunc main() {\n    ctx := context.Background()\n\n    s := polargo.New(\n        polargo.WithSecurity(os.Getenv(\"POLAR_ACCESS_TOKEN\")),\n    )\n\n    res, err := s.Events.Get(ctx, \"<value>\")\n    if err != nil {\n        log.Fatal(err)\n    }\n    if res.Event != nil {\n        switch res.Event.Type {\n            case components.EventUnionTypeSystemEvent:\n                // res.Event.SystemEvent is populated\n            case components.EventUnionTypeUserEvent:\n                // res.Event.UserEvent is populated\n        }\n\n    }\n}"
        - lang: python
          label: Python (SDK)
          source: |-
            from polar_sdk import Polar


            with Polar(
                access_token="<YOUR_BEARER_TOKEN_HERE>",
            ) as polar:

                res = polar.events.get(id="<value>")

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
              const result = await polar.events.get({
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



            $response = $sdk->events->get(
                id: '<value>'
            );

            if ($response->event !== null) {
                // handle response
            }
components:
  schemas:
    Event:
      oneOf:
        - $ref: '#/components/schemas/SystemEvent'
        - $ref: '#/components/schemas/UserEvent'
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
    SystemEvent:
      oneOf:
        - $ref: '#/components/schemas/MeterCreditEvent'
        - $ref: '#/components/schemas/MeterResetEvent'
        - $ref: '#/components/schemas/BenefitGrantedEvent'
        - $ref: '#/components/schemas/BenefitCycledEvent'
        - $ref: '#/components/schemas/BenefitUpdatedEvent'
        - $ref: '#/components/schemas/BenefitRevokedEvent'
        - $ref: '#/components/schemas/SubscriptionCreatedEvent'
        - $ref: '#/components/schemas/SubscriptionCycledEvent'
        - $ref: '#/components/schemas/SubscriptionCanceledEvent'
        - $ref: '#/components/schemas/SubscriptionRevokedEvent'
        - $ref: '#/components/schemas/SubscriptionUncanceledEvent'
        - $ref: '#/components/schemas/SubscriptionProductUpdatedEvent'
        - $ref: '#/components/schemas/SubscriptionSeatsUpdatedEvent'
        - $ref: '#/components/schemas/SubscriptionBillingPeriodUpdatedEvent'
        - $ref: '#/components/schemas/OrderPaidEvent'
        - $ref: '#/components/schemas/OrderRefundedEvent'
        - $ref: '#/components/schemas/CheckoutCreatedEvent'
        - $ref: '#/components/schemas/CustomerCreatedEvent'
        - $ref: '#/components/schemas/CustomerUpdatedEvent'
        - $ref: '#/components/schemas/CustomerDeletedEvent'
        - $ref: '#/components/schemas/BalanceOrderEvent'
        - $ref: '#/components/schemas/BalanceCreditOrderEvent'
        - $ref: '#/components/schemas/BalanceRefundEvent'
        - $ref: '#/components/schemas/BalanceRefundReversalEvent'
        - $ref: '#/components/schemas/BalanceDisputeEvent'
        - $ref: '#/components/schemas/BalanceDisputeReversalEvent'
      discriminator:
        propertyName: name
        mapping:
          balance.credit_order:
            $ref: '#/components/schemas/BalanceCreditOrderEvent'
          balance.dispute:
            $ref: '#/components/schemas/BalanceDisputeEvent'
          balance.dispute_reversal:
            $ref: '#/components/schemas/BalanceDisputeReversalEvent'
          balance.order:
            $ref: '#/components/schemas/BalanceOrderEvent'
          balance.refund:
            $ref: '#/components/schemas/BalanceRefundEvent'
          balance.refund_reversal:
            $ref: '#/components/schemas/BalanceRefundReversalEvent'
          benefit.cycled:
            $ref: '#/components/schemas/BenefitCycledEvent'
          benefit.granted:
            $ref: '#/components/schemas/BenefitGrantedEvent'
          benefit.revoked:
            $ref: '#/components/schemas/BenefitRevokedEvent'
          benefit.updated:
            $ref: '#/components/schemas/BenefitUpdatedEvent'
          checkout.created:
            $ref: '#/components/schemas/CheckoutCreatedEvent'
          customer.created:
            $ref: '#/components/schemas/CustomerCreatedEvent'
          customer.deleted:
            $ref: '#/components/schemas/CustomerDeletedEvent'
          customer.updated:
            $ref: '#/components/schemas/CustomerUpdatedEvent'
          meter.credited:
            $ref: '#/components/schemas/MeterCreditEvent'
          meter.reset:
            $ref: '#/components/schemas/MeterResetEvent'
          order.paid:
            $ref: '#/components/schemas/OrderPaidEvent'
          order.refunded:
            $ref: '#/components/schemas/OrderRefundedEvent'
          subscription.billing_period_updated:
            $ref: '#/components/schemas/SubscriptionBillingPeriodUpdatedEvent'
          subscription.canceled:
            $ref: '#/components/schemas/SubscriptionCanceledEvent'
          subscription.created:
            $ref: '#/components/schemas/SubscriptionCreatedEvent'
          subscription.cycled:
            $ref: '#/components/schemas/SubscriptionCycledEvent'
          subscription.product_updated:
            $ref: '#/components/schemas/SubscriptionProductUpdatedEvent'
          subscription.revoked:
            $ref: '#/components/schemas/SubscriptionRevokedEvent'
          subscription.seats_updated:
            $ref: '#/components/schemas/SubscriptionSeatsUpdatedEvent'
          subscription.uncanceled:
            $ref: '#/components/schemas/SubscriptionUncanceledEvent'
    UserEvent:
      properties:
        id:
          type: string
          format: uuid4
          title: Id
          description: The ID of the object.
        timestamp:
          type: string
          format: date-time
          title: Timestamp
          description: The timestamp of the event.
        organization_id:
          type: string
          format: uuid4
          title: Organization Id
          description: The ID of the organization owning the event.
          examples:
            - 1dbfc517-0bbf-4301-9ba8-555ca42b9737
          x-polar-selector-widget:
            displayProperty: name
            resourceName: Organization
            resourceRoot: /v1/organizations
        customer_id:
          anyOf:
            - type: string
              format: uuid4
            - type: 'null'
          title: Customer Id
          description: >-
            ID of the customer in your Polar organization associated with the
            event.
        customer:
          anyOf:
            - $ref: '#/components/schemas/Customer'
            - type: 'null'
          description: The customer associated with the event.
        external_customer_id:
          anyOf:
            - type: string
            - type: 'null'
          title: External Customer Id
          description: ID of the customer in your system associated with the event.
        member_id:
          anyOf:
            - type: string
              format: uuid4
            - type: 'null'
          title: Member Id
          description: >-
            ID of the member within the customer's organization who performed
            the action inside B2B.
        external_member_id:
          anyOf:
            - type: string
            - type: 'null'
          title: External Member Id
          description: >-
            ID of the member in your system within the customer's organization
            who performed the action inside B2B.
        child_count:
          type: integer
          title: Child Count
          description: Number of direct child events linked to this event.
          default: 0
        parent_id:
          anyOf:
            - type: string
              format: uuid4
            - type: 'null'
          title: Parent Id
          description: The ID of the parent event.
        label:
          type: string
          title: Label
          description: Human readable label of the event type.
        name:
          type: string
          title: Name
          description: The name of the event.
        source:
          type: string
          const: user
          title: Source
          description: >-
            The source of the event. `system` events are created by Polar.
            `user` events are the one you create through our ingestion API.
        metadata:
          $ref: '#/components/schemas/EventMetadataOutput'
      type: object
      required:
        - id
        - timestamp
        - organization_id
        - customer_id
        - customer
        - external_customer_id
        - label
        - name
        - source
        - metadata
      title: UserEvent
      description: An event you created through the ingestion API.
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
    MeterCreditEvent:
      properties:
        id:
          type: string
          format: uuid4
          title: Id
          description: The ID of the object.
        timestamp:
          type: string
          format: date-time
          title: Timestamp
          description: The timestamp of the event.
        organization_id:
          type: string
          format: uuid4
          title: Organization Id
          description: The ID of the organization owning the event.
          examples:
            - 1dbfc517-0bbf-4301-9ba8-555ca42b9737
          x-polar-selector-widget:
            displayProperty: name
            resourceName: Organization
            resourceRoot: /v1/organizations
        customer_id:
          anyOf:
            - type: string
              format: uuid4
            - type: 'null'
          title: Customer Id
          description: >-
            ID of the customer in your Polar organization associated with the
            event.
        customer:
          anyOf:
            - $ref: '#/components/schemas/Customer'
            - type: 'null'
          description: The customer associated with the event.
        external_customer_id:
          anyOf:
            - type: string
            - type: 'null'
          title: External Customer Id
          description: ID of the customer in your system associated with the event.
        member_id:
          anyOf:
            - type: string
              format: uuid4
            - type: 'null'
          title: Member Id
          description: >-
            ID of the member within the customer's organization who performed
            the action inside B2B.
        external_member_id:
          anyOf:
            - type: string
            - type: 'null'
          title: External Member Id
          description: >-
            ID of the member in your system within the customer's organization
            who performed the action inside B2B.
        child_count:
          type: integer
          title: Child Count
          description: Number of direct child events linked to this event.
          default: 0
        parent_id:
          anyOf:
            - type: string
              format: uuid4
            - type: 'null'
          title: Parent Id
          description: The ID of the parent event.
        label:
          type: string
          title: Label
          description: Human readable label of the event type.
        source:
          type: string
          const: system
          title: Source
          description: >-
            The source of the event. `system` events are created by Polar.
            `user` events are the one you create through our ingestion API.
        name:
          type: string
          const: meter.credited
          title: Name
          description: The name of the event.
        metadata:
          $ref: '#/components/schemas/MeterCreditedMetadata'
      type: object
      required:
        - id
        - timestamp
        - organization_id
        - customer_id
        - customer
        - external_customer_id
        - label
        - source
        - name
        - metadata
      title: MeterCreditEvent
      description: An event created by Polar when credits are added to a customer meter.
    MeterResetEvent:
      properties:
        id:
          type: string
          format: uuid4
          title: Id
          description: The ID of the object.
        timestamp:
          type: string
          format: date-time
          title: Timestamp
          description: The timestamp of the event.
        organization_id:
          type: string
          format: uuid4
          title: Organization Id
          description: The ID of the organization owning the event.
          examples:
            - 1dbfc517-0bbf-4301-9ba8-555ca42b9737
          x-polar-selector-widget:
            displayProperty: name
            resourceName: Organization
            resourceRoot: /v1/organizations
        customer_id:
          anyOf:
            - type: string
              format: uuid4
            - type: 'null'
          title: Customer Id
          description: >-
            ID of the customer in your Polar organization associated with the
            event.
        customer:
          anyOf:
            - $ref: '#/components/schemas/Customer'
            - type: 'null'
          description: The customer associated with the event.
        external_customer_id:
          anyOf:
            - type: string
            - type: 'null'
          title: External Customer Id
          description: ID of the customer in your system associated with the event.
        member_id:
          anyOf:
            - type: string
              format: uuid4
            - type: 'null'
          title: Member Id
          description: >-
            ID of the member within the customer's organization who performed
            the action inside B2B.
        external_member_id:
          anyOf:
            - type: string
            - type: 'null'
          title: External Member Id
          description: >-
            ID of the member in your system within the customer's organization
            who performed the action inside B2B.
        child_count:
          type: integer
          title: Child Count
          description: Number of direct child events linked to this event.
          default: 0
        parent_id:
          anyOf:
            - type: string
              format: uuid4
            - type: 'null'
          title: Parent Id
          description: The ID of the parent event.
        label:
          type: string
          title: Label
          description: Human readable label of the event type.
        source:
          type: string
          const: system
          title: Source
          description: >-
            The source of the event. `system` events are created by Polar.
            `user` events are the one you create through our ingestion API.
        name:
          type: string
          const: meter.reset
          title: Name
          description: The name of the event.
        metadata:
          $ref: '#/components/schemas/MeterResetMetadata'
      type: object
      required:
        - id
        - timestamp
        - organization_id
        - customer_id
        - customer
        - external_customer_id
        - label
        - source
        - name
        - metadata
      title: MeterResetEvent
      description: An event created by Polar when a customer meter is reset.
    BenefitGrantedEvent:
      properties:
        id:
          type: string
          format: uuid4
          title: Id
          description: The ID of the object.
        timestamp:
          type: string
          format: date-time
          title: Timestamp
          description: The timestamp of the event.
        organization_id:
          type: string
          format: uuid4
          title: Organization Id
          description: The ID of the organization owning the event.
          examples:
            - 1dbfc517-0bbf-4301-9ba8-555ca42b9737
          x-polar-selector-widget:
            displayProperty: name
            resourceName: Organization
            resourceRoot: /v1/organizations
        customer_id:
          anyOf:
            - type: string
              format: uuid4
            - type: 'null'
          title: Customer Id
          description: >-
            ID of the customer in your Polar organization associated with the
            event.
        customer:
          anyOf:
            - $ref: '#/components/schemas/Customer'
            - type: 'null'
          description: The customer associated with the event.
        external_customer_id:
          anyOf:
            - type: string
            - type: 'null'
          title: External Customer Id
          description: ID of the customer in your system associated with the event.
        member_id:
          anyOf:
            - type: string
              format: uuid4
            - type: 'null'
          title: Member Id
          description: >-
            ID of the member within the customer's organization who performed
            the action inside B2B.
        external_member_id:
          anyOf:
            - type: string
            - type: 'null'
          title: External Member Id
          description: >-
            ID of the member in your system within the customer's organization
            who performed the action inside B2B.
        child_count:
          type: integer
          title: Child Count
          description: Number of direct child events linked to this event.
          default: 0
        parent_id:
          anyOf:
            - type: string
              format: uuid4
            - type: 'null'
          title: Parent Id
          description: The ID of the parent event.
        label:
          type: string
          title: Label
          description: Human readable label of the event type.
        source:
          type: string
          const: system
          title: Source
          description: >-
            The source of the event. `system` events are created by Polar.
            `user` events are the one you create through our ingestion API.
        name:
          type: string
          const: benefit.granted
          title: Name
          description: The name of the event.
        metadata:
          $ref: '#/components/schemas/BenefitGrantMetadata'
      type: object
      required:
        - id
        - timestamp
        - organization_id
        - customer_id
        - customer
        - external_customer_id
        - label
        - source
        - name
        - metadata
      title: BenefitGrantedEvent
      description: An event created by Polar when a benefit is granted to a customer.
    BenefitCycledEvent:
      properties:
        id:
          type: string
          format: uuid4
          title: Id
          description: The ID of the object.
        timestamp:
          type: string
          format: date-time
          title: Timestamp
          description: The timestamp of the event.
        organization_id:
          type: string
          format: uuid4
          title: Organization Id
          description: The ID of the organization owning the event.
          examples:
            - 1dbfc517-0bbf-4301-9ba8-555ca42b9737
          x-polar-selector-widget:
            displayProperty: name
            resourceName: Organization
            resourceRoot: /v1/organizations
        customer_id:
          anyOf:
            - type: string
              format: uuid4
            - type: 'null'
          title: Customer Id
          description: >-
            ID of the customer in your Polar organization associated with the
            event.
        customer:
          anyOf:
            - $ref: '#/components/schemas/Customer'
            - type: 'null'
          description: The customer associated with the event.
        external_customer_id:
          anyOf:
            - type: string
            - type: 'null'
          title: External Customer Id
          description: ID of the customer in your system associated with the event.
        member_id:
          anyOf:
            - type: string
              format: uuid4
            - type: 'null'
          title: Member Id
          description: >-
            ID of the member within the customer's organization who performed
            the action inside B2B.
        external_member_id:
          anyOf:
            - type: string
            - type: 'null'
          title: External Member Id
          description: >-
            ID of the member in your system within the customer's organization
            who performed the action inside B2B.
        child_count:
          type: integer
          title: Child Count
          description: Number of direct child events linked to this event.
          default: 0
        parent_id:
          anyOf:
            - type: string
              format: uuid4
            - type: 'null'
          title: Parent Id
          description: The ID of the parent event.
        label:
          type: string
          title: Label
          description: Human readable label of the event type.
        source:
          type: string
          const: system
          title: Source
          description: >-
            The source of the event. `system` events are created by Polar.
            `user` events are the one you create through our ingestion API.
        name:
          type: string
          const: benefit.cycled
          title: Name
          description: The name of the event.
        metadata:
          $ref: '#/components/schemas/BenefitGrantMetadata'
      type: object
      required:
        - id
        - timestamp
        - organization_id
        - customer_id
        - customer
        - external_customer_id
        - label
        - source
        - name
        - metadata
      title: BenefitCycledEvent
      description: An event created by Polar when a benefit is cycled.
    BenefitUpdatedEvent:
      properties:
        id:
          type: string
          format: uuid4
          title: Id
          description: The ID of the object.
        timestamp:
          type: string
          format: date-time
          title: Timestamp
          description: The timestamp of the event.
        organization_id:
          type: string
          format: uuid4
          title: Organization Id
          description: The ID of the organization owning the event.
          examples:
            - 1dbfc517-0bbf-4301-9ba8-555ca42b9737
          x-polar-selector-widget:
            displayProperty: name
            resourceName: Organization
            resourceRoot: /v1/organizations
        customer_id:
          anyOf:
            - type: string
              format: uuid4
            - type: 'null'
          title: Customer Id
          description: >-
            ID of the customer in your Polar organization associated with the
            event.
        customer:
          anyOf:
            - $ref: '#/components/schemas/Customer'
            - type: 'null'
          description: The customer associated with the event.
        external_customer_id:
          anyOf:
            - type: string
            - type: 'null'
          title: External Customer Id
          description: ID of the customer in your system associated with the event.
        member_id:
          anyOf:
            - type: string
              format: uuid4
            - type: 'null'
          title: Member Id
          description: >-
            ID of the member within the customer's organization who performed
            the action inside B2B.
        external_member_id:
          anyOf:
            - type: string
            - type: 'null'
          title: External Member Id
          description: >-
            ID of the member in your system within the customer's organization
            who performed the action inside B2B.
        child_count:
          type: integer
          title: Child Count
          description: Number of direct child events linked to this event.
          default: 0
        parent_id:
          anyOf:
            - type: string
              format: uuid4
            - type: 'null'
          title: Parent Id
          description: The ID of the parent event.
        label:
          type: string
          title: Label
          description: Human readable label of the event type.
        source:
          type: string
          const: system
          title: Source
          description: >-
            The source of the event. `system` events are created by Polar.
            `user` events are the one you create through our ingestion API.
        name:
          type: string
          const: benefit.updated
          title: Name
          description: The name of the event.
        metadata:
          $ref: '#/components/schemas/BenefitGrantMetadata'
      type: object
      required:
        - id
        - timestamp
        - organization_id
        - customer_id
        - customer
        - external_customer_id
        - label
        - source
        - name
        - metadata
      title: BenefitUpdatedEvent
      description: An event created by Polar when a benefit is updated.
    BenefitRevokedEvent:
      properties:
        id:
          type: string
          format: uuid4
          title: Id
          description: The ID of the object.
        timestamp:
          type: string
          format: date-time
          title: Timestamp
          description: The timestamp of the event.
        organization_id:
          type: string
          format: uuid4
          title: Organization Id
          description: The ID of the organization owning the event.
          examples:
            - 1dbfc517-0bbf-4301-9ba8-555ca42b9737
          x-polar-selector-widget:
            displayProperty: name
            resourceName: Organization
            resourceRoot: /v1/organizations
        customer_id:
          anyOf:
            - type: string
              format: uuid4
            - type: 'null'
          title: Customer Id
          description: >-
            ID of the customer in your Polar organization associated with the
            event.
        customer:
          anyOf:
            - $ref: '#/components/schemas/Customer'
            - type: 'null'
          description: The customer associated with the event.
        external_customer_id:
          anyOf:
            - type: string
            - type: 'null'
          title: External Customer Id
          description: ID of the customer in your system associated with the event.
        member_id:
          anyOf:
            - type: string
              format: uuid4
            - type: 'null'
          title: Member Id
          description: >-
            ID of the member within the customer's organization who performed
            the action inside B2B.
        external_member_id:
          anyOf:
            - type: string
            - type: 'null'
          title: External Member Id
          description: >-
            ID of the member in your system within the customer's organization
            who performed the action inside B2B.
        child_count:
          type: integer
          title: Child Count
          description: Number of direct child events linked to this event.
          default: 0
        parent_id:
          anyOf:
            - type: string
              format: uuid4
            - type: 'null'
          title: Parent Id
          description: The ID of the parent event.
        label:
          type: string
          title: Label
          description: Human readable label of the event type.
        source:
          type: string
          const: system
          title: Source
          description: >-
            The source of the event. `system` events are created by Polar.
            `user` events are the one you create through our ingestion API.
        name:
          type: string
          const: benefit.revoked
          title: Name
          description: The name of the event.
        metadata:
          $ref: '#/components/schemas/BenefitGrantMetadata'
      type: object
      required:
        - id
        - timestamp
        - organization_id
        - customer_id
        - customer
        - external_customer_id
        - label
        - source
        - name
        - metadata
      title: BenefitRevokedEvent
      description: An event created by Polar when a benefit is revoked from a customer.
    SubscriptionCreatedEvent:
      properties:
        id:
          type: string
          format: uuid4
          title: Id
          description: The ID of the object.
        timestamp:
          type: string
          format: date-time
          title: Timestamp
          description: The timestamp of the event.
        organization_id:
          type: string
          format: uuid4
          title: Organization Id
          description: The ID of the organization owning the event.
          examples:
            - 1dbfc517-0bbf-4301-9ba8-555ca42b9737
          x-polar-selector-widget:
            displayProperty: name
            resourceName: Organization
            resourceRoot: /v1/organizations
        customer_id:
          anyOf:
            - type: string
              format: uuid4
            - type: 'null'
          title: Customer Id
          description: >-
            ID of the customer in your Polar organization associated with the
            event.
        customer:
          anyOf:
            - $ref: '#/components/schemas/Customer'
            - type: 'null'
          description: The customer associated with the event.
        external_customer_id:
          anyOf:
            - type: string
            - type: 'null'
          title: External Customer Id
          description: ID of the customer in your system associated with the event.
        member_id:
          anyOf:
            - type: string
              format: uuid4
            - type: 'null'
          title: Member Id
          description: >-
            ID of the member within the customer's organization who performed
            the action inside B2B.
        external_member_id:
          anyOf:
            - type: string
            - type: 'null'
          title: External Member Id
          description: >-
            ID of the member in your system within the customer's organization
            who performed the action inside B2B.
        child_count:
          type: integer
          title: Child Count
          description: Number of direct child events linked to this event.
          default: 0
        parent_id:
          anyOf:
            - type: string
              format: uuid4
            - type: 'null'
          title: Parent Id
          description: The ID of the parent event.
        label:
          type: string
          title: Label
          description: Human readable label of the event type.
        source:
          type: string
          const: system
          title: Source
          description: >-
            The source of the event. `system` events are created by Polar.
            `user` events are the one you create through our ingestion API.
        name:
          type: string
          const: subscription.created
          title: Name
          description: The name of the event.
        metadata:
          $ref: '#/components/schemas/SubscriptionCreatedMetadata'
      type: object
      required:
        - id
        - timestamp
        - organization_id
        - customer_id
        - customer
        - external_customer_id
        - label
        - source
        - name
        - metadata
      title: SubscriptionCreatedEvent
      description: An event created by Polar when a subscription is created.
    SubscriptionCycledEvent:
      properties:
        id:
          type: string
          format: uuid4
          title: Id
          description: The ID of the object.
        timestamp:
          type: string
          format: date-time
          title: Timestamp
          description: The timestamp of the event.
        organization_id:
          type: string
          format: uuid4
          title: Organization Id
          description: The ID of the organization owning the event.
          examples:
            - 1dbfc517-0bbf-4301-9ba8-555ca42b9737
          x-polar-selector-widget:
            displayProperty: name
            resourceName: Organization
            resourceRoot: /v1/organizations
        customer_id:
          anyOf:
            - type: string
              format: uuid4
            - type: 'null'
          title: Customer Id
          description: >-
            ID of the customer in your Polar organization associated with the
            event.
        customer:
          anyOf:
            - $ref: '#/components/schemas/Customer'
            - type: 'null'
          description: The customer associated with the event.
        external_customer_id:
          anyOf:
            - type: string
            - type: 'null'
          title: External Customer Id
          description: ID of the customer in your system associated with the event.
        member_id:
          anyOf:
            - type: string
              format: uuid4
            - type: 'null'
          title: Member Id
          description: >-
            ID of the member within the customer's organization who performed
            the action inside B2B.
        external_member_id:
          anyOf:
            - type: string
            - type: 'null'
          title: External Member Id
          description: >-
            ID of the member in your system within the customer's organization
            who performed the action inside B2B.
        child_count:
          type: integer
          title: Child Count
          description: Number of direct child events linked to this event.
          default: 0
        parent_id:
          anyOf:
            - type: string
              format: uuid4
            - type: 'null'
          title: Parent Id
          description: The ID of the parent event.
        label:
          type: string
          title: Label
          description: Human readable label of the event type.
        source:
          type: string
          const: system
          title: Source
          description: >-
            The source of the event. `system` events are created by Polar.
            `user` events are the one you create through our ingestion API.
        name:
          type: string
          const: subscription.cycled
          title: Name
          description: The name of the event.
        metadata:
          $ref: '#/components/schemas/SubscriptionCycledMetadata'
      type: object
      required:
        - id
        - timestamp
        - organization_id
        - customer_id
        - customer
        - external_customer_id
        - label
        - source
        - name
        - metadata
      title: SubscriptionCycledEvent
      description: An event created by Polar when a subscription is cycled.
    SubscriptionCanceledEvent:
      properties:
        id:
          type: string
          format: uuid4
          title: Id
          description: The ID of the object.
        timestamp:
          type: string
          format: date-time
          title: Timestamp
          description: The timestamp of the event.
        organization_id:
          type: string
          format: uuid4
          title: Organization Id
          description: The ID of the organization owning the event.
          examples:
            - 1dbfc517-0bbf-4301-9ba8-555ca42b9737
          x-polar-selector-widget:
            displayProperty: name
            resourceName: Organization
            resourceRoot: /v1/organizations
        customer_id:
          anyOf:
            - type: string
              format: uuid4
            - type: 'null'
          title: Customer Id
          description: >-
            ID of the customer in your Polar organization associated with the
            event.
        customer:
          anyOf:
            - $ref: '#/components/schemas/Customer'
            - type: 'null'
          description: The customer associated with the event.
        external_customer_id:
          anyOf:
            - type: string
            - type: 'null'
          title: External Customer Id
          description: ID of the customer in your system associated with the event.
        member_id:
          anyOf:
            - type: string
              format: uuid4
            - type: 'null'
          title: Member Id
          description: >-
            ID of the member within the customer's organization who performed
            the action inside B2B.
        external_member_id:
          anyOf:
            - type: string
            - type: 'null'
          title: External Member Id
          description: >-
            ID of the member in your system within the customer's organization
            who performed the action inside B2B.
        child_count:
          type: integer
          title: Child Count
          description: Number of direct child events linked to this event.
          default: 0
        parent_id:
          anyOf:
            - type: string
              format: uuid4
            - type: 'null'
          title: Parent Id
          description: The ID of the parent event.
        label:
          type: string
          title: Label
          description: Human readable label of the event type.
        source:
          type: string
          const: system
          title: Source
          description: >-
            The source of the event. `system` events are created by Polar.
            `user` events are the one you create through our ingestion API.
        name:
          type: string
          const: subscription.canceled
          title: Name
          description: The name of the event.
        metadata:
          $ref: '#/components/schemas/SubscriptionCanceledMetadata'
      type: object
      required:
        - id
        - timestamp
        - organization_id
        - customer_id
        - customer
        - external_customer_id
        - label
        - source
        - name
        - metadata
      title: SubscriptionCanceledEvent
      description: An event created by Polar when a subscription is canceled.
    SubscriptionRevokedEvent:
      properties:
        id:
          type: string
          format: uuid4
          title: Id
          description: The ID of the object.
        timestamp:
          type: string
          format: date-time
          title: Timestamp
          description: The timestamp of the event.
        organization_id:
          type: string
          format: uuid4
          title: Organization Id
          description: The ID of the organization owning the event.
          examples:
            - 1dbfc517-0bbf-4301-9ba8-555ca42b9737
          x-polar-selector-widget:
            displayProperty: name
            resourceName: Organization
            resourceRoot: /v1/organizations
        customer_id:
          anyOf:
            - type: string
              format: uuid4
            - type: 'null'
          title: Customer Id
          description: >-
            ID of the customer in your Polar organization associated with the
            event.
        customer:
          anyOf:
            - $ref: '#/components/schemas/Customer'
            - type: 'null'
          description: The customer associated with the event.
        external_customer_id:
          anyOf:
            - type: string
            - type: 'null'
          title: External Customer Id
          description: ID of the customer in your system associated with the event.
        member_id:
          anyOf:
            - type: string
              format: uuid4
            - type: 'null'
          title: Member Id
          description: >-
            ID of the member within the customer's organization who performed
            the action inside B2B.
        external_member_id:
          anyOf:
            - type: string
            - type: 'null'
          title: External Member Id
          description: >-
            ID of the member in your system within the customer's organization
            who performed the action inside B2B.
        child_count:
          type: integer
          title: Child Count
          description: Number of direct child events linked to this event.
          default: 0
        parent_id:
          anyOf:
            - type: string
              format: uuid4
            - type: 'null'
          title: Parent Id
          description: The ID of the parent event.
        label:
          type: string
          title: Label
          description: Human readable label of the event type.
        source:
          type: string
          const: system
          title: Source
          description: >-
            The source of the event. `system` events are created by Polar.
            `user` events are the one you create through our ingestion API.
        name:
          type: string
          const: subscription.revoked
          title: Name
          description: The name of the event.
        metadata:
          $ref: '#/components/schemas/SubscriptionRevokedMetadata'
      type: object
      required:
        - id
        - timestamp
        - organization_id
        - customer_id
        - customer
        - external_customer_id
        - label
        - source
        - name
        - metadata
      title: SubscriptionRevokedEvent
      description: >-
        An event created by Polar when a subscription is revoked from a
        customer.
    SubscriptionUncanceledEvent:
      properties:
        id:
          type: string
          format: uuid4
          title: Id
          description: The ID of the object.
        timestamp:
          type: string
          format: date-time
          title: Timestamp
          description: The timestamp of the event.
        organization_id:
          type: string
          format: uuid4
          title: Organization Id
          description: The ID of the organization owning the event.
          examples:
            - 1dbfc517-0bbf-4301-9ba8-555ca42b9737
          x-polar-selector-widget:
            displayProperty: name
            resourceName: Organization
            resourceRoot: /v1/organizations
        customer_id:
          anyOf:
            - type: string
              format: uuid4
            - type: 'null'
          title: Customer Id
          description: >-
            ID of the customer in your Polar organization associated with the
            event.
        customer:
          anyOf:
            - $ref: '#/components/schemas/Customer'
            - type: 'null'
          description: The customer associated with the event.
        external_customer_id:
          anyOf:
            - type: string
            - type: 'null'
          title: External Customer Id
          description: ID of the customer in your system associated with the event.
        member_id:
          anyOf:
            - type: string
              format: uuid4
            - type: 'null'
          title: Member Id
          description: >-
            ID of the member within the customer's organization who performed
            the action inside B2B.
        external_member_id:
          anyOf:
            - type: string
            - type: 'null'
          title: External Member Id
          description: >-
            ID of the member in your system within the customer's organization
            who performed the action inside B2B.
        child_count:
          type: integer
          title: Child Count
          description: Number of direct child events linked to this event.
          default: 0
        parent_id:
          anyOf:
            - type: string
              format: uuid4
            - type: 'null'
          title: Parent Id
          description: The ID of the parent event.
        label:
          type: string
          title: Label
          description: Human readable label of the event type.
        source:
          type: string
          const: system
          title: Source
          description: >-
            The source of the event. `system` events are created by Polar.
            `user` events are the one you create through our ingestion API.
        name:
          type: string
          const: subscription.uncanceled
          title: Name
          description: The name of the event.
        metadata:
          $ref: '#/components/schemas/SubscriptionUncanceledMetadata'
      type: object
      required:
        - id
        - timestamp
        - organization_id
        - customer_id
        - customer
        - external_customer_id
        - label
        - source
        - name
        - metadata
      title: SubscriptionUncanceledEvent
      description: An event created by Polar when a subscription cancellation is reversed.
    SubscriptionProductUpdatedEvent:
      properties:
        id:
          type: string
          format: uuid4
          title: Id
          description: The ID of the object.
        timestamp:
          type: string
          format: date-time
          title: Timestamp
          description: The timestamp of the event.
        organization_id:
          type: string
          format: uuid4
          title: Organization Id
          description: The ID of the organization owning the event.
          examples:
            - 1dbfc517-0bbf-4301-9ba8-555ca42b9737
          x-polar-selector-widget:
            displayProperty: name
            resourceName: Organization
            resourceRoot: /v1/organizations
        customer_id:
          anyOf:
            - type: string
              format: uuid4
            - type: 'null'
          title: Customer Id
          description: >-
            ID of the customer in your Polar organization associated with the
            event.
        customer:
          anyOf:
            - $ref: '#/components/schemas/Customer'
            - type: 'null'
          description: The customer associated with the event.
        external_customer_id:
          anyOf:
            - type: string
            - type: 'null'
          title: External Customer Id
          description: ID of the customer in your system associated with the event.
        member_id:
          anyOf:
            - type: string
              format: uuid4
            - type: 'null'
          title: Member Id
          description: >-
            ID of the member within the customer's organization who performed
            the action inside B2B.
        external_member_id:
          anyOf:
            - type: string
            - type: 'null'
          title: External Member Id
          description: >-
            ID of the member in your system within the customer's organization
            who performed the action inside B2B.
        child_count:
          type: integer
          title: Child Count
          description: Number of direct child events linked to this event.
          default: 0
        parent_id:
          anyOf:
            - type: string
              format: uuid4
            - type: 'null'
          title: Parent Id
          description: The ID of the parent event.
        label:
          type: string
          title: Label
          description: Human readable label of the event type.
        source:
          type: string
          const: system
          title: Source
          description: >-
            The source of the event. `system` events are created by Polar.
            `user` events are the one you create through our ingestion API.
        name:
          type: string
          const: subscription.product_updated
          title: Name
          description: The name of the event.
        metadata:
          $ref: '#/components/schemas/SubscriptionProductUpdatedMetadata'
      type: object
      required:
        - id
        - timestamp
        - organization_id
        - customer_id
        - customer
        - external_customer_id
        - label
        - source
        - name
        - metadata
      title: SubscriptionProductUpdatedEvent
      description: An event created by Polar when a subscription changes the product.
    SubscriptionSeatsUpdatedEvent:
      properties:
        id:
          type: string
          format: uuid4
          title: Id
          description: The ID of the object.
        timestamp:
          type: string
          format: date-time
          title: Timestamp
          description: The timestamp of the event.
        organization_id:
          type: string
          format: uuid4
          title: Organization Id
          description: The ID of the organization owning the event.
          examples:
            - 1dbfc517-0bbf-4301-9ba8-555ca42b9737
          x-polar-selector-widget:
            displayProperty: name
            resourceName: Organization
            resourceRoot: /v1/organizations
        customer_id:
          anyOf:
            - type: string
              format: uuid4
            - type: 'null'
          title: Customer Id
          description: >-
            ID of the customer in your Polar organization associated with the
            event.
        customer:
          anyOf:
            - $ref: '#/components/schemas/Customer'
            - type: 'null'
          description: The customer associated with the event.
        external_customer_id:
          anyOf:
            - type: string
            - type: 'null'
          title: External Customer Id
          description: ID of the customer in your system associated with the event.
        member_id:
          anyOf:
            - type: string
              format: uuid4
            - type: 'null'
          title: Member Id
          description: >-
            ID of the member within the customer's organization who performed
            the action inside B2B.
        external_member_id:
          anyOf:
            - type: string
            - type: 'null'
          title: External Member Id
          description: >-
            ID of the member in your system within the customer's organization
            who performed the action inside B2B.
        child_count:
          type: integer
          title: Child Count
          description: Number of direct child events linked to this event.
          default: 0
        parent_id:
          anyOf:
            - type: string
              format: uuid4
            - type: 'null'
          title: Parent Id
          description: The ID of the parent event.
        label:
          type: string
          title: Label
          description: Human readable label of the event type.
        source:
          type: string
          const: system
          title: Source
          description: >-
            The source of the event. `system` events are created by Polar.
            `user` events are the one you create through our ingestion API.
        name:
          type: string
          const: subscription.seats_updated
          title: Name
          description: The name of the event.
        metadata:
          $ref: '#/components/schemas/SubscriptionSeatsUpdatedMetadata'
      type: object
      required:
        - id
        - timestamp
        - organization_id
        - customer_id
        - customer
        - external_customer_id
        - label
        - source
        - name
        - metadata
      title: SubscriptionSeatsUpdatedEvent
      description: An event created by Polar when a the seats on a subscription is changed.
    SubscriptionBillingPeriodUpdatedEvent:
      properties:
        id:
          type: string
          format: uuid4
          title: Id
          description: The ID of the object.
        timestamp:
          type: string
          format: date-time
          title: Timestamp
          description: The timestamp of the event.
        organization_id:
          type: string
          format: uuid4
          title: Organization Id
          description: The ID of the organization owning the event.
          examples:
            - 1dbfc517-0bbf-4301-9ba8-555ca42b9737
          x-polar-selector-widget:
            displayProperty: name
            resourceName: Organization
            resourceRoot: /v1/organizations
        customer_id:
          anyOf:
            - type: string
              format: uuid4
            - type: 'null'
          title: Customer Id
          description: >-
            ID of the customer in your Polar organization associated with the
            event.
        customer:
          anyOf:
            - $ref: '#/components/schemas/Customer'
            - type: 'null'
          description: The customer associated with the event.
        external_customer_id:
          anyOf:
            - type: string
            - type: 'null'
          title: External Customer Id
          description: ID of the customer in your system associated with the event.
        member_id:
          anyOf:
            - type: string
              format: uuid4
            - type: 'null'
          title: Member Id
          description: >-
            ID of the member within the customer's organization who performed
            the action inside B2B.
        external_member_id:
          anyOf:
            - type: string
            - type: 'null'
          title: External Member Id
          description: >-
            ID of the member in your system within the customer's organization
            who performed the action inside B2B.
        child_count:
          type: integer
          title: Child Count
          description: Number of direct child events linked to this event.
          default: 0
        parent_id:
          anyOf:
            - type: string
              format: uuid4
            - type: 'null'
          title: Parent Id
          description: The ID of the parent event.
        label:
          type: string
          title: Label
          description: Human readable label of the event type.
        source:
          type: string
          const: system
          title: Source
          description: >-
            The source of the event. `system` events are created by Polar.
            `user` events are the one you create through our ingestion API.
        name:
          type: string
          const: subscription.billing_period_updated
          title: Name
          description: The name of the event.
        metadata:
          $ref: '#/components/schemas/SubscriptionBillingPeriodUpdatedMetadata'
      type: object
      required:
        - id
        - timestamp
        - organization_id
        - customer_id
        - customer
        - external_customer_id
        - label
        - source
        - name
        - metadata
      title: SubscriptionBillingPeriodUpdatedEvent
      description: An event created by Polar when a subscription billing period is updated.
    OrderPaidEvent:
      properties:
        id:
          type: string
          format: uuid4
          title: Id
          description: The ID of the object.
        timestamp:
          type: string
          format: date-time
          title: Timestamp
          description: The timestamp of the event.
        organization_id:
          type: string
          format: uuid4
          title: Organization Id
          description: The ID of the organization owning the event.
          examples:
            - 1dbfc517-0bbf-4301-9ba8-555ca42b9737
          x-polar-selector-widget:
            displayProperty: name
            resourceName: Organization
            resourceRoot: /v1/organizations
        customer_id:
          anyOf:
            - type: string
              format: uuid4
            - type: 'null'
          title: Customer Id
          description: >-
            ID of the customer in your Polar organization associated with the
            event.
        customer:
          anyOf:
            - $ref: '#/components/schemas/Customer'
            - type: 'null'
          description: The customer associated with the event.
        external_customer_id:
          anyOf:
            - type: string
            - type: 'null'
          title: External Customer Id
          description: ID of the customer in your system associated with the event.
        member_id:
          anyOf:
            - type: string
              format: uuid4
            - type: 'null'
          title: Member Id
          description: >-
            ID of the member within the customer's organization who performed
            the action inside B2B.
        external_member_id:
          anyOf:
            - type: string
            - type: 'null'
          title: External Member Id
          description: >-
            ID of the member in your system within the customer's organization
            who performed the action inside B2B.
        child_count:
          type: integer
          title: Child Count
          description: Number of direct child events linked to this event.
          default: 0
        parent_id:
          anyOf:
            - type: string
              format: uuid4
            - type: 'null'
          title: Parent Id
          description: The ID of the parent event.
        label:
          type: string
          title: Label
          description: Human readable label of the event type.
        source:
          type: string
          const: system
          title: Source
          description: >-
            The source of the event. `system` events are created by Polar.
            `user` events are the one you create through our ingestion API.
        name:
          type: string
          const: order.paid
          title: Name
          description: The name of the event.
        metadata:
          $ref: '#/components/schemas/OrderPaidMetadata'
      type: object
      required:
        - id
        - timestamp
        - organization_id
        - customer_id
        - customer
        - external_customer_id
        - label
        - source
        - name
        - metadata
      title: OrderPaidEvent
      description: An event created by Polar when an order is paid.
    OrderRefundedEvent:
      properties:
        id:
          type: string
          format: uuid4
          title: Id
          description: The ID of the object.
        timestamp:
          type: string
          format: date-time
          title: Timestamp
          description: The timestamp of the event.
        organization_id:
          type: string
          format: uuid4
          title: Organization Id
          description: The ID of the organization owning the event.
          examples:
            - 1dbfc517-0bbf-4301-9ba8-555ca42b9737
          x-polar-selector-widget:
            displayProperty: name
            resourceName: Organization
            resourceRoot: /v1/organizations
        customer_id:
          anyOf:
            - type: string
              format: uuid4
            - type: 'null'
          title: Customer Id
          description: >-
            ID of the customer in your Polar organization associated with the
            event.
        customer:
          anyOf:
            - $ref: '#/components/schemas/Customer'
            - type: 'null'
          description: The customer associated with the event.
        external_customer_id:
          anyOf:
            - type: string
            - type: 'null'
          title: External Customer Id
          description: ID of the customer in your system associated with the event.
        member_id:
          anyOf:
            - type: string
              format: uuid4
            - type: 'null'
          title: Member Id
          description: >-
            ID of the member within the customer's organization who performed
            the action inside B2B.
        external_member_id:
          anyOf:
            - type: string
            - type: 'null'
          title: External Member Id
          description: >-
            ID of the member in your system within the customer's organization
            who performed the action inside B2B.
        child_count:
          type: integer
          title: Child Count
          description: Number of direct child events linked to this event.
          default: 0
        parent_id:
          anyOf:
            - type: string
              format: uuid4
            - type: 'null'
          title: Parent Id
          description: The ID of the parent event.
        label:
          type: string
          title: Label
          description: Human readable label of the event type.
        source:
          type: string
          const: system
          title: Source
          description: >-
            The source of the event. `system` events are created by Polar.
            `user` events are the one you create through our ingestion API.
        name:
          type: string
          const: order.refunded
          title: Name
          description: The name of the event.
        metadata:
          $ref: '#/components/schemas/OrderRefundedMetadata'
      type: object
      required:
        - id
        - timestamp
        - organization_id
        - customer_id
        - customer
        - external_customer_id
        - label
        - source
        - name
        - metadata
      title: OrderRefundedEvent
      description: An event created by Polar when an order is refunded.
    CheckoutCreatedEvent:
      properties:
        id:
          type: string
          format: uuid4
          title: Id
          description: The ID of the object.
        timestamp:
          type: string
          format: date-time
          title: Timestamp
          description: The timestamp of the event.
        organization_id:
          type: string
          format: uuid4
          title: Organization Id
          description: The ID of the organization owning the event.
          examples:
            - 1dbfc517-0bbf-4301-9ba8-555ca42b9737
          x-polar-selector-widget:
            displayProperty: name
            resourceName: Organization
            resourceRoot: /v1/organizations
        customer_id:
          anyOf:
            - type: string
              format: uuid4
            - type: 'null'
          title: Customer Id
          description: >-
            ID of the customer in your Polar organization associated with the
            event.
        customer:
          anyOf:
            - $ref: '#/components/schemas/Customer'
            - type: 'null'
          description: The customer associated with the event.
        external_customer_id:
          anyOf:
            - type: string
            - type: 'null'
          title: External Customer Id
          description: ID of the customer in your system associated with the event.
        member_id:
          anyOf:
            - type: string
              format: uuid4
            - type: 'null'
          title: Member Id
          description: >-
            ID of the member within the customer's organization who performed
            the action inside B2B.
        external_member_id:
          anyOf:
            - type: string
            - type: 'null'
          title: External Member Id
          description: >-
            ID of the member in your system within the customer's organization
            who performed the action inside B2B.
        child_count:
          type: integer
          title: Child Count
          description: Number of direct child events linked to this event.
          default: 0
        parent_id:
          anyOf:
            - type: string
              format: uuid4
            - type: 'null'
          title: Parent Id
          description: The ID of the parent event.
        label:
          type: string
          title: Label
          description: Human readable label of the event type.
        source:
          type: string
          const: system
          title: Source
          description: >-
            The source of the event. `system` events are created by Polar.
            `user` events are the one you create through our ingestion API.
        name:
          type: string
          const: checkout.created
          title: Name
          description: The name of the event.
        metadata:
          $ref: '#/components/schemas/CheckoutCreatedMetadata'
      type: object
      required:
        - id
        - timestamp
        - organization_id
        - customer_id
        - customer
        - external_customer_id
        - label
        - source
        - name
        - metadata
      title: CheckoutCreatedEvent
      description: An event created by Polar when a checkout is created.
    CustomerCreatedEvent:
      properties:
        id:
          type: string
          format: uuid4
          title: Id
          description: The ID of the object.
        timestamp:
          type: string
          format: date-time
          title: Timestamp
          description: The timestamp of the event.
        organization_id:
          type: string
          format: uuid4
          title: Organization Id
          description: The ID of the organization owning the event.
          examples:
            - 1dbfc517-0bbf-4301-9ba8-555ca42b9737
          x-polar-selector-widget:
            displayProperty: name
            resourceName: Organization
            resourceRoot: /v1/organizations
        customer_id:
          anyOf:
            - type: string
              format: uuid4
            - type: 'null'
          title: Customer Id
          description: >-
            ID of the customer in your Polar organization associated with the
            event.
        customer:
          anyOf:
            - $ref: '#/components/schemas/Customer'
            - type: 'null'
          description: The customer associated with the event.
        external_customer_id:
          anyOf:
            - type: string
            - type: 'null'
          title: External Customer Id
          description: ID of the customer in your system associated with the event.
        member_id:
          anyOf:
            - type: string
              format: uuid4
            - type: 'null'
          title: Member Id
          description: >-
            ID of the member within the customer's organization who performed
            the action inside B2B.
        external_member_id:
          anyOf:
            - type: string
            - type: 'null'
          title: External Member Id
          description: >-
            ID of the member in your system within the customer's organization
            who performed the action inside B2B.
        child_count:
          type: integer
          title: Child Count
          description: Number of direct child events linked to this event.
          default: 0
        parent_id:
          anyOf:
            - type: string
              format: uuid4
            - type: 'null'
          title: Parent Id
          description: The ID of the parent event.
        label:
          type: string
          title: Label
          description: Human readable label of the event type.
        source:
          type: string
          const: system
          title: Source
          description: >-
            The source of the event. `system` events are created by Polar.
            `user` events are the one you create through our ingestion API.
        name:
          type: string
          const: customer.created
          title: Name
          description: The name of the event.
        metadata:
          $ref: '#/components/schemas/CustomerCreatedMetadata'
      type: object
      required:
        - id
        - timestamp
        - organization_id
        - customer_id
        - customer
        - external_customer_id
        - label
        - source
        - name
        - metadata
      title: CustomerCreatedEvent
      description: An event created by Polar when a customer is created.
    CustomerUpdatedEvent:
      properties:
        id:
          type: string
          format: uuid4
          title: Id
          description: The ID of the object.
        timestamp:
          type: string
          format: date-time
          title: Timestamp
          description: The timestamp of the event.
        organization_id:
          type: string
          format: uuid4
          title: Organization Id
          description: The ID of the organization owning the event.
          examples:
            - 1dbfc517-0bbf-4301-9ba8-555ca42b9737
          x-polar-selector-widget:
            displayProperty: name
            resourceName: Organization
            resourceRoot: /v1/organizations
        customer_id:
          anyOf:
            - type: string
              format: uuid4
            - type: 'null'
          title: Customer Id
          description: >-
            ID of the customer in your Polar organization associated with the
            event.
        customer:
          anyOf:
            - $ref: '#/components/schemas/Customer'
            - type: 'null'
          description: The customer associated with the event.
        external_customer_id:
          anyOf:
            - type: string
            - type: 'null'
          title: External Customer Id
          description: ID of the customer in your system associated with the event.
        member_id:
          anyOf:
            - type: string
              format: uuid4
            - type: 'null'
          title: Member Id
          description: >-
            ID of the member within the customer's organization who performed
            the action inside B2B.
        external_member_id:
          anyOf:
            - type: string
            - type: 'null'
          title: External Member Id
          description: >-
            ID of the member in your system within the customer's organization
            who performed the action inside B2B.
        child_count:
          type: integer
          title: Child Count
          description: Number of direct child events linked to this event.
          default: 0
        parent_id:
          anyOf:
            - type: string
              format: uuid4
            - type: 'null'
          title: Parent Id
          description: The ID of the parent event.
        label:
          type: string
          title: Label
          description: Human readable label of the event type.
        source:
          type: string
          const: system
          title: Source
          description: >-
            The source of the event. `system` events are created by Polar.
            `user` events are the one you create through our ingestion API.
        name:
          type: string
          const: customer.updated
          title: Name
          description: The name of the event.
        metadata:
          $ref: '#/components/schemas/CustomerUpdatedMetadata'
      type: object
      required:
        - id
        - timestamp
        - organization_id
        - customer_id
        - customer
        - external_customer_id
        - label
        - source
        - name
        - metadata
      title: CustomerUpdatedEvent
      description: An event created by Polar when a customer is updated.
    CustomerDeletedEvent:
      properties:
        id:
          type: string
          format: uuid4
          title: Id
          description: The ID of the object.
        timestamp:
          type: string
          format: date-time
          title: Timestamp
          description: The timestamp of the event.
        organization_id:
          type: string
          format: uuid4
          title: Organization Id
          description: The ID of the organization owning the event.
          examples:
            - 1dbfc517-0bbf-4301-9ba8-555ca42b9737
          x-polar-selector-widget:
            displayProperty: name
            resourceName: Organization
            resourceRoot: /v1/organizations
        customer_id:
          anyOf:
            - type: string
              format: uuid4
            - type: 'null'
          title: Customer Id
          description: >-
            ID of the customer in your Polar organization associated with the
            event.
        customer:
          anyOf:
            - $ref: '#/components/schemas/Customer'
            - type: 'null'
          description: The customer associated with the event.
        external_customer_id:
          anyOf:
            - type: string
            - type: 'null'
          title: External Customer Id
          description: ID of the customer in your system associated with the event.
        member_id:
          anyOf:
            - type: string
              format: uuid4
            - type: 'null'
          title: Member Id
          description: >-
            ID of the member within the customer's organization who performed
            the action inside B2B.
        external_member_id:
          anyOf:
            - type: string
            - type: 'null'
          title: External Member Id
          description: >-
            ID of the member in your system within the customer's organization
            who performed the action inside B2B.
        child_count:
          type: integer
          title: Child Count
          description: Number of direct child events linked to this event.
          default: 0
        parent_id:
          anyOf:
            - type: string
              format: uuid4
            - type: 'null'
          title: Parent Id
          description: The ID of the parent event.
        label:
          type: string
          title: Label
          description: Human readable label of the event type.
        source:
          type: string
          const: system
          title: Source
          description: >-
            The source of the event. `system` events are created by Polar.
            `user` events are the one you create through our ingestion API.
        name:
          type: string
          const: customer.deleted
          title: Name
          description: The name of the event.
        metadata:
          $ref: '#/components/schemas/CustomerDeletedMetadata'
      type: object
      required:
        - id
        - timestamp
        - organization_id
        - customer_id
        - customer
        - external_customer_id
        - label
        - source
        - name
        - metadata
      title: CustomerDeletedEvent
      description: An event created by Polar when a customer is deleted.
    BalanceOrderEvent:
      properties:
        id:
          type: string
          format: uuid4
          title: Id
          description: The ID of the object.
        timestamp:
          type: string
          format: date-time
          title: Timestamp
          description: The timestamp of the event.
        organization_id:
          type: string
          format: uuid4
          title: Organization Id
          description: The ID of the organization owning the event.
          examples:
            - 1dbfc517-0bbf-4301-9ba8-555ca42b9737
          x-polar-selector-widget:
            displayProperty: name
            resourceName: Organization
            resourceRoot: /v1/organizations
        customer_id:
          anyOf:
            - type: string
              format: uuid4
            - type: 'null'
          title: Customer Id
          description: >-
            ID of the customer in your Polar organization associated with the
            event.
        customer:
          anyOf:
            - $ref: '#/components/schemas/Customer'
            - type: 'null'
          description: The customer associated with the event.
        external_customer_id:
          anyOf:
            - type: string
            - type: 'null'
          title: External Customer Id
          description: ID of the customer in your system associated with the event.
        member_id:
          anyOf:
            - type: string
              format: uuid4
            - type: 'null'
          title: Member Id
          description: >-
            ID of the member within the customer's organization who performed
            the action inside B2B.
        external_member_id:
          anyOf:
            - type: string
            - type: 'null'
          title: External Member Id
          description: >-
            ID of the member in your system within the customer's organization
            who performed the action inside B2B.
        child_count:
          type: integer
          title: Child Count
          description: Number of direct child events linked to this event.
          default: 0
        parent_id:
          anyOf:
            - type: string
              format: uuid4
            - type: 'null'
          title: Parent Id
          description: The ID of the parent event.
        label:
          type: string
          title: Label
          description: Human readable label of the event type.
        source:
          type: string
          const: system
          title: Source
          description: >-
            The source of the event. `system` events are created by Polar.
            `user` events are the one you create through our ingestion API.
        name:
          type: string
          const: balance.order
          title: Name
          description: The name of the event.
        metadata:
          $ref: '#/components/schemas/BalanceOrderMetadata'
      type: object
      required:
        - id
        - timestamp
        - organization_id
        - customer_id
        - customer
        - external_customer_id
        - label
        - source
        - name
        - metadata
      title: BalanceOrderEvent
      description: An event created by Polar when an order is paid.
    BalanceCreditOrderEvent:
      properties:
        id:
          type: string
          format: uuid4
          title: Id
          description: The ID of the object.
        timestamp:
          type: string
          format: date-time
          title: Timestamp
          description: The timestamp of the event.
        organization_id:
          type: string
          format: uuid4
          title: Organization Id
          description: The ID of the organization owning the event.
          examples:
            - 1dbfc517-0bbf-4301-9ba8-555ca42b9737
          x-polar-selector-widget:
            displayProperty: name
            resourceName: Organization
            resourceRoot: /v1/organizations
        customer_id:
          anyOf:
            - type: string
              format: uuid4
            - type: 'null'
          title: Customer Id
          description: >-
            ID of the customer in your Polar organization associated with the
            event.
        customer:
          anyOf:
            - $ref: '#/components/schemas/Customer'
            - type: 'null'
          description: The customer associated with the event.
        external_customer_id:
          anyOf:
            - type: string
            - type: 'null'
          title: External Customer Id
          description: ID of the customer in your system associated with the event.
        member_id:
          anyOf:
            - type: string
              format: uuid4
            - type: 'null'
          title: Member Id
          description: >-
            ID of the member within the customer's organization who performed
            the action inside B2B.
        external_member_id:
          anyOf:
            - type: string
            - type: 'null'
          title: External Member Id
          description: >-
            ID of the member in your system within the customer's organization
            who performed the action inside B2B.
        child_count:
          type: integer
          title: Child Count
          description: Number of direct child events linked to this event.
          default: 0
        parent_id:
          anyOf:
            - type: string
              format: uuid4
            - type: 'null'
          title: Parent Id
          description: The ID of the parent event.
        label:
          type: string
          title: Label
          description: Human readable label of the event type.
        source:
          type: string
          const: system
          title: Source
          description: >-
            The source of the event. `system` events are created by Polar.
            `user` events are the one you create through our ingestion API.
        name:
          type: string
          const: balance.credit_order
          title: Name
          description: The name of the event.
        metadata:
          $ref: '#/components/schemas/BalanceCreditOrderMetadata'
      type: object
      required:
        - id
        - timestamp
        - organization_id
        - customer_id
        - customer
        - external_customer_id
        - label
        - source
        - name
        - metadata
      title: BalanceCreditOrderEvent
      description: An event created by Polar when an order is paid via customer balance.
    BalanceRefundEvent:
      properties:
        id:
          type: string
          format: uuid4
          title: Id
          description: The ID of the object.
        timestamp:
          type: string
          format: date-time
          title: Timestamp
          description: The timestamp of the event.
        organization_id:
          type: string
          format: uuid4
          title: Organization Id
          description: The ID of the organization owning the event.
          examples:
            - 1dbfc517-0bbf-4301-9ba8-555ca42b9737
          x-polar-selector-widget:
            displayProperty: name
            resourceName: Organization
            resourceRoot: /v1/organizations
        customer_id:
          anyOf:
            - type: string
              format: uuid4
            - type: 'null'
          title: Customer Id
          description: >-
            ID of the customer in your Polar organization associated with the
            event.
        customer:
          anyOf:
            - $ref: '#/components/schemas/Customer'
            - type: 'null'
          description: The customer associated with the event.
        external_customer_id:
          anyOf:
            - type: string
            - type: 'null'
          title: External Customer Id
          description: ID of the customer in your system associated with the event.
        member_id:
          anyOf:
            - type: string
              format: uuid4
            - type: 'null'
          title: Member Id
          description: >-
            ID of the member within the customer's organization who performed
            the action inside B2B.
        external_member_id:
          anyOf:
            - type: string
            - type: 'null'
          title: External Member Id
          description: >-
            ID of the member in your system within the customer's organization
            who performed the action inside B2B.
        child_count:
          type: integer
          title: Child Count
          description: Number of direct child events linked to this event.
          default: 0
        parent_id:
          anyOf:
            - type: string
              format: uuid4
            - type: 'null'
          title: Parent Id
          description: The ID of the parent event.
        label:
          type: string
          title: Label
          description: Human readable label of the event type.
        source:
          type: string
          const: system
          title: Source
          description: >-
            The source of the event. `system` events are created by Polar.
            `user` events are the one you create through our ingestion API.
        name:
          type: string
          const: balance.refund
          title: Name
          description: The name of the event.
        metadata:
          $ref: '#/components/schemas/BalanceRefundMetadata'
      type: object
      required:
        - id
        - timestamp
        - organization_id
        - customer_id
        - customer
        - external_customer_id
        - label
        - source
        - name
        - metadata
      title: BalanceRefundEvent
      description: An event created by Polar when an order is refunded.
    BalanceRefundReversalEvent:
      properties:
        id:
          type: string
          format: uuid4
          title: Id
          description: The ID of the object.
        timestamp:
          type: string
          format: date-time
          title: Timestamp
          description: The timestamp of the event.
        organization_id:
          type: string
          format: uuid4
          title: Organization Id
          description: The ID of the organization owning the event.
          examples:
            - 1dbfc517-0bbf-4301-9ba8-555ca42b9737
          x-polar-selector-widget:
            displayProperty: name
            resourceName: Organization
            resourceRoot: /v1/organizations
        customer_id:
          anyOf:
            - type: string
              format: uuid4
            - type: 'null'
          title: Customer Id
          description: >-
            ID of the customer in your Polar organization associated with the
            event.
        customer:
          anyOf:
            - $ref: '#/components/schemas/Customer'
            - type: 'null'
          description: The customer associated with the event.
        external_customer_id:
          anyOf:
            - type: string
            - type: 'null'
          title: External Customer Id
          description: ID of the customer in your system associated with the event.
        member_id:
          anyOf:
            - type: string
              format: uuid4
            - type: 'null'
          title: Member Id
          description: >-
            ID of the member within the customer's organization who performed
            the action inside B2B.
        external_member_id:
          anyOf:
            - type: string
            - type: 'null'
          title: External Member Id
          description: >-
            ID of the member in your system within the customer's organization
            who performed the action inside B2B.
        child_count:
          type: integer
          title: Child Count
          description: Number of direct child events linked to this event.
          default: 0
        parent_id:
          anyOf:
            - type: string
              format: uuid4
            - type: 'null'
          title: Parent Id
          description: The ID of the parent event.
        label:
          type: string
          title: Label
          description: Human readable label of the event type.
        source:
          type: string
          const: system
          title: Source
          description: >-
            The source of the event. `system` events are created by Polar.
            `user` events are the one you create through our ingestion API.
        name:
          type: string
          const: balance.refund_reversal
          title: Name
          description: The name of the event.
        metadata:
          $ref: '#/components/schemas/BalanceRefundMetadata'
      type: object
      required:
        - id
        - timestamp
        - organization_id
        - customer_id
        - customer
        - external_customer_id
        - label
        - source
        - name
        - metadata
      title: BalanceRefundReversalEvent
      description: An event created by Polar when a refund is reverted.
    BalanceDisputeEvent:
      properties:
        id:
          type: string
          format: uuid4
          title: Id
          description: The ID of the object.
        timestamp:
          type: string
          format: date-time
          title: Timestamp
          description: The timestamp of the event.
        organization_id:
          type: string
          format: uuid4
          title: Organization Id
          description: The ID of the organization owning the event.
          examples:
            - 1dbfc517-0bbf-4301-9ba8-555ca42b9737
          x-polar-selector-widget:
            displayProperty: name
            resourceName: Organization
            resourceRoot: /v1/organizations
        customer_id:
          anyOf:
            - type: string
              format: uuid4
            - type: 'null'
          title: Customer Id
          description: >-
            ID of the customer in your Polar organization associated with the
            event.
        customer:
          anyOf:
            - $ref: '#/components/schemas/Customer'
            - type: 'null'
          description: The customer associated with the event.
        external_customer_id:
          anyOf:
            - type: string
            - type: 'null'
          title: External Customer Id
          description: ID of the customer in your system associated with the event.
        member_id:
          anyOf:
            - type: string
              format: uuid4
            - type: 'null'
          title: Member Id
          description: >-
            ID of the member within the customer's organization who performed
            the action inside B2B.
        external_member_id:
          anyOf:
            - type: string
            - type: 'null'
          title: External Member Id
          description: >-
            ID of the member in your system within the customer's organization
            who performed the action inside B2B.
        child_count:
          type: integer
          title: Child Count
          description: Number of direct child events linked to this event.
          default: 0
        parent_id:
          anyOf:
            - type: string
              format: uuid4
            - type: 'null'
          title: Parent Id
          description: The ID of the parent event.
        label:
          type: string
          title: Label
          description: Human readable label of the event type.
        source:
          type: string
          const: system
          title: Source
          description: >-
            The source of the event. `system` events are created by Polar.
            `user` events are the one you create through our ingestion API.
        name:
          type: string
          const: balance.dispute
          title: Name
          description: The name of the event.
        metadata:
          $ref: '#/components/schemas/BalanceDisputeMetadata'
      type: object
      required:
        - id
        - timestamp
        - organization_id
        - customer_id
        - customer
        - external_customer_id
        - label
        - source
        - name
        - metadata
      title: BalanceDisputeEvent
      description: An event created by Polar when an order is disputed.
    BalanceDisputeReversalEvent:
      properties:
        id:
          type: string
          format: uuid4
          title: Id
          description: The ID of the object.
        timestamp:
          type: string
          format: date-time
          title: Timestamp
          description: The timestamp of the event.
        organization_id:
          type: string
          format: uuid4
          title: Organization Id
          description: The ID of the organization owning the event.
          examples:
            - 1dbfc517-0bbf-4301-9ba8-555ca42b9737
          x-polar-selector-widget:
            displayProperty: name
            resourceName: Organization
            resourceRoot: /v1/organizations
        customer_id:
          anyOf:
            - type: string
              format: uuid4
            - type: 'null'
          title: Customer Id
          description: >-
            ID of the customer in your Polar organization associated with the
            event.
        customer:
          anyOf:
            - $ref: '#/components/schemas/Customer'
            - type: 'null'
          description: The customer associated with the event.
        external_customer_id:
          anyOf:
            - type: string
            - type: 'null'
          title: External Customer Id
          description: ID of the customer in your system associated with the event.
        member_id:
          anyOf:
            - type: string
              format: uuid4
            - type: 'null'
          title: Member Id
          description: >-
            ID of the member within the customer's organization who performed
            the action inside B2B.
        external_member_id:
          anyOf:
            - type: string
            - type: 'null'
          title: External Member Id
          description: >-
            ID of the member in your system within the customer's organization
            who performed the action inside B2B.
        child_count:
          type: integer
          title: Child Count
          description: Number of direct child events linked to this event.
          default: 0
        parent_id:
          anyOf:
            - type: string
              format: uuid4
            - type: 'null'
          title: Parent Id
          description: The ID of the parent event.
        label:
          type: string
          title: Label
          description: Human readable label of the event type.
        source:
          type: string
          const: system
          title: Source
          description: >-
            The source of the event. `system` events are created by Polar.
            `user` events are the one you create through our ingestion API.
        name:
          type: string
          const: balance.dispute_reversal
          title: Name
          description: The name of the event.
        metadata:
          $ref: '#/components/schemas/BalanceDisputeMetadata'
      type: object
      required:
        - id
        - timestamp
        - organization_id
        - customer_id
        - customer
        - external_customer_id
        - label
        - source
        - name
        - metadata
      title: BalanceDisputeReversalEvent
      description: >-
        An event created by Polar when a dispute is won and funds are
        reinstated.
    Customer:
      properties:
        id:
          type: string
          format: uuid4
          title: Id
          description: The ID of the customer.
          examples:
            - 992fae2a-2a17-4b7a-8d9e-e287cf90131b
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
        metadata:
          $ref: '#/components/schemas/MetadataOutputType'
        external_id:
          anyOf:
            - type: string
            - type: 'null'
          title: External Id
          description: >-
            The ID of the customer in your system. This must be unique within
            the organization. Once set, it can't be updated.
          examples:
            - usr_1337
        email:
          type: string
          title: Email
          description: >-
            The email address of the customer. This must be unique within the
            organization.
          examples:
            - customer@example.com
        email_verified:
          type: boolean
          title: Email Verified
          description: >-
            Whether the customer email address is verified. The address is
            automatically verified when the customer accesses the customer
            portal using their email address.
          examples:
            - true
        type:
          anyOf:
            - $ref: '#/components/schemas/CustomerType'
            - type: 'null'
          description: >-
            The type of customer: 'individual' for single users, 'team' for
            customers with multiple members. Legacy customers may have NULL type
            which is treated as 'individual'.
          examples:
            - individual
        name:
          anyOf:
            - type: string
            - type: 'null'
          title: Name
          description: The name of the customer.
          examples:
            - John Doe
        billing_address:
          anyOf:
            - $ref: '#/components/schemas/Address'
            - type: 'null'
        tax_id:
          anyOf:
            - prefixItems:
                - type: string
                - $ref: '#/components/schemas/TaxIDFormat'
              type: array
              maxItems: 2
              minItems: 2
              examples:
                - - '911144442'
                  - us_ein
                - - FR61954506077
                  - eu_vat
            - type: 'null'
          title: Tax Id
        locale:
          anyOf:
            - type: string
            - type: 'null'
          title: Locale
        organization_id:
          type: string
          format: uuid4
          title: Organization Id
          description: The ID of the organization owning the customer.
          examples:
            - 1dbfc517-0bbf-4301-9ba8-555ca42b9737
        deleted_at:
          anyOf:
            - type: string
              format: date-time
            - type: 'null'
          title: Deleted At
          description: Timestamp for when the customer was soft deleted.
        avatar_url:
          type: string
          title: Avatar Url
          examples:
            - https://www.gravatar.com/avatar/xxx?d=404
      type: object
      required:
        - id
        - created_at
        - modified_at
        - metadata
        - email
        - email_verified
        - name
        - billing_address
        - tax_id
        - organization_id
        - deleted_at
        - avatar_url
      title: Customer
      description: A customer in an organization.
    EventMetadataOutput:
      additionalProperties:
        anyOf:
          - type: string
          - type: integer
          - type: number
          - type: boolean
          - $ref: '#/components/schemas/CostMetadata-Output'
          - $ref: '#/components/schemas/LLMMetadata'
      type: object
      title: EventMetadataOutput
    MeterCreditedMetadata:
      properties:
        meter_id:
          type: string
          title: Meter Id
        units:
          type: integer
          title: Units
        rollover:
          type: boolean
          title: Rollover
      type: object
      required:
        - meter_id
        - units
        - rollover
      title: MeterCreditedMetadata
    MeterResetMetadata:
      properties:
        meter_id:
          type: string
          title: Meter Id
      type: object
      required:
        - meter_id
      title: MeterResetMetadata
    BenefitGrantMetadata:
      properties:
        benefit_id:
          type: string
          title: Benefit Id
        benefit_grant_id:
          type: string
          title: Benefit Grant Id
        benefit_type:
          $ref: '#/components/schemas/BenefitType'
        member_id:
          type: string
          title: Member Id
      type: object
      required:
        - benefit_id
        - benefit_grant_id
        - benefit_type
      title: BenefitGrantMetadata
    SubscriptionCreatedMetadata:
      properties:
        subscription_id:
          type: string
          title: Subscription Id
        product_id:
          type: string
          title: Product Id
        amount:
          type: integer
          title: Amount
        currency:
          type: string
          title: Currency
        recurring_interval:
          type: string
          title: Recurring Interval
        recurring_interval_count:
          type: integer
          title: Recurring Interval Count
        started_at:
          type: string
          title: Started At
      type: object
      required:
        - subscription_id
        - product_id
        - amount
        - currency
        - recurring_interval
        - recurring_interval_count
        - started_at
      title: SubscriptionCreatedMetadata
    SubscriptionCycledMetadata:
      properties:
        subscription_id:
          type: string
          title: Subscription Id
        product_id:
          type: string
          title: Product Id
        amount:
          type: integer
          title: Amount
        currency:
          type: string
          title: Currency
        recurring_interval:
          type: string
          title: Recurring Interval
        recurring_interval_count:
          type: integer
          title: Recurring Interval Count
      type: object
      required:
        - subscription_id
      title: SubscriptionCycledMetadata
    SubscriptionCanceledMetadata:
      properties:
        subscription_id:
          type: string
          title: Subscription Id
        product_id:
          type: string
          title: Product Id
        amount:
          type: integer
          title: Amount
        currency:
          type: string
          title: Currency
        recurring_interval:
          type: string
          title: Recurring Interval
        recurring_interval_count:
          type: integer
          title: Recurring Interval Count
        customer_cancellation_reason:
          type: string
          title: Customer Cancellation Reason
        customer_cancellation_comment:
          type: string
          title: Customer Cancellation Comment
        canceled_at:
          type: string
          title: Canceled At
        ends_at:
          type: string
          title: Ends At
        cancel_at_period_end:
          type: boolean
          title: Cancel At Period End
      type: object
      required:
        - subscription_id
        - amount
        - currency
        - recurring_interval
        - recurring_interval_count
        - canceled_at
      title: SubscriptionCanceledMetadata
    SubscriptionRevokedMetadata:
      properties:
        subscription_id:
          type: string
          title: Subscription Id
        product_id:
          type: string
          title: Product Id
        amount:
          type: integer
          title: Amount
        currency:
          type: string
          title: Currency
        recurring_interval:
          type: string
          title: Recurring Interval
        recurring_interval_count:
          type: integer
          title: Recurring Interval Count
      type: object
      required:
        - subscription_id
      title: SubscriptionRevokedMetadata
    SubscriptionUncanceledMetadata:
      properties:
        subscription_id:
          type: string
          title: Subscription Id
        product_id:
          type: string
          title: Product Id
        amount:
          type: integer
          title: Amount
        currency:
          type: string
          title: Currency
        recurring_interval:
          type: string
          title: Recurring Interval
        recurring_interval_count:
          type: integer
          title: Recurring Interval Count
      type: object
      required:
        - subscription_id
        - product_id
        - amount
        - currency
        - recurring_interval
        - recurring_interval_count
      title: SubscriptionUncanceledMetadata
    SubscriptionProductUpdatedMetadata:
      properties:
        subscription_id:
          type: string
          title: Subscription Id
        old_product_id:
          type: string
          title: Old Product Id
        new_product_id:
          type: string
          title: New Product Id
      type: object
      required:
        - subscription_id
        - old_product_id
        - new_product_id
      title: SubscriptionProductUpdatedMetadata
    SubscriptionSeatsUpdatedMetadata:
      properties:
        subscription_id:
          type: string
          title: Subscription Id
        old_seats:
          type: integer
          title: Old Seats
        new_seats:
          type: integer
          title: New Seats
        proration_behavior:
          type: string
          title: Proration Behavior
      type: object
      required:
        - subscription_id
        - old_seats
        - new_seats
        - proration_behavior
      title: SubscriptionSeatsUpdatedMetadata
    SubscriptionBillingPeriodUpdatedMetadata:
      properties:
        subscription_id:
          type: string
          title: Subscription Id
        old_period_end:
          type: string
          title: Old Period End
        new_period_end:
          type: string
          title: New Period End
      type: object
      required:
        - subscription_id
        - old_period_end
        - new_period_end
      title: SubscriptionBillingPeriodUpdatedMetadata
    OrderPaidMetadata:
      properties:
        order_id:
          type: string
          title: Order Id
        product_id:
          type: string
          title: Product Id
        billing_type:
          type: string
          title: Billing Type
        amount:
          type: integer
          title: Amount
        currency:
          type: string
          title: Currency
        net_amount:
          type: integer
          title: Net Amount
        tax_amount:
          type: integer
          title: Tax Amount
        applied_balance_amount:
          type: integer
          title: Applied Balance Amount
        discount_amount:
          type: integer
          title: Discount Amount
        discount_id:
          type: string
          title: Discount Id
        platform_fee:
          type: integer
          title: Platform Fee
        subscription_id:
          type: string
          title: Subscription Id
        recurring_interval:
          type: string
          title: Recurring Interval
        recurring_interval_count:
          type: integer
          title: Recurring Interval Count
      type: object
      required:
        - order_id
        - amount
      title: OrderPaidMetadata
    OrderRefundedMetadata:
      properties:
        order_id:
          type: string
          title: Order Id
        refunded_amount:
          type: integer
          title: Refunded Amount
        currency:
          type: string
          title: Currency
      type: object
      required:
        - order_id
        - refunded_amount
        - currency
      title: OrderRefundedMetadata
    CheckoutCreatedMetadata:
      properties:
        checkout_id:
          type: string
          title: Checkout Id
        checkout_status:
          type: string
          title: Checkout Status
        product_id:
          type: string
          title: Product Id
      type: object
      required:
        - checkout_id
        - checkout_status
      title: CheckoutCreatedMetadata
    CustomerCreatedMetadata:
      properties:
        customer_id:
          type: string
          title: Customer Id
        customer_email:
          type: string
          title: Customer Email
        customer_name:
          anyOf:
            - type: string
            - type: 'null'
          title: Customer Name
        customer_external_id:
          anyOf:
            - type: string
            - type: 'null'
          title: Customer External Id
      type: object
      required:
        - customer_id
        - customer_email
        - customer_name
        - customer_external_id
      title: CustomerCreatedMetadata
    CustomerUpdatedMetadata:
      properties:
        customer_id:
          type: string
          title: Customer Id
        customer_email:
          type: string
          title: Customer Email
        customer_name:
          anyOf:
            - type: string
            - type: 'null'
          title: Customer Name
        customer_external_id:
          anyOf:
            - type: string
            - type: 'null'
          title: Customer External Id
        updated_fields:
          $ref: '#/components/schemas/CustomerUpdatedFields'
      type: object
      required:
        - customer_id
        - customer_email
        - customer_name
        - customer_external_id
        - updated_fields
      title: CustomerUpdatedMetadata
    CustomerDeletedMetadata:
      properties:
        customer_id:
          type: string
          title: Customer Id
        customer_email:
          type: string
          title: Customer Email
        customer_name:
          anyOf:
            - type: string
            - type: 'null'
          title: Customer Name
        customer_external_id:
          anyOf:
            - type: string
            - type: 'null'
          title: Customer External Id
      type: object
      required:
        - customer_id
        - customer_email
        - customer_name
        - customer_external_id
      title: CustomerDeletedMetadata
    BalanceOrderMetadata:
      properties:
        transaction_id:
          type: string
          title: Transaction Id
        order_id:
          type: string
          title: Order Id
        product_id:
          type: string
          title: Product Id
        subscription_id:
          type: string
          title: Subscription Id
        amount:
          type: integer
          title: Amount
        net_amount:
          type: integer
          title: Net Amount
        currency:
          type: string
          title: Currency
        presentment_amount:
          type: integer
          title: Presentment Amount
        presentment_currency:
          type: string
          title: Presentment Currency
        tax_amount:
          type: integer
          title: Tax Amount
        tax_state:
          anyOf:
            - type: string
            - type: 'null'
          title: Tax State
        tax_country:
          anyOf:
            - type: string
            - type: 'null'
          title: Tax Country
        fee:
          type: integer
          title: Fee
        exchange_rate:
          type: number
          title: Exchange Rate
      type: object
      required:
        - transaction_id
        - order_id
        - amount
        - currency
        - presentment_amount
        - presentment_currency
        - tax_amount
        - fee
      title: BalanceOrderMetadata
    BalanceCreditOrderMetadata:
      properties:
        order_id:
          type: string
          title: Order Id
        product_id:
          type: string
          title: Product Id
        subscription_id:
          type: string
          title: Subscription Id
        amount:
          type: integer
          title: Amount
        currency:
          type: string
          title: Currency
        tax_amount:
          type: integer
          title: Tax Amount
        tax_state:
          anyOf:
            - type: string
            - type: 'null'
          title: Tax State
        tax_country:
          anyOf:
            - type: string
            - type: 'null'
          title: Tax Country
        fee:
          type: integer
          title: Fee
      type: object
      required:
        - order_id
        - amount
        - currency
        - tax_amount
        - fee
      title: BalanceCreditOrderMetadata
    BalanceRefundMetadata:
      properties:
        transaction_id:
          type: string
          title: Transaction Id
        refund_id:
          type: string
          title: Refund Id
        order_id:
          type: string
          title: Order Id
        order_created_at:
          type: string
          title: Order Created At
        product_id:
          type: string
          title: Product Id
        subscription_id:
          type: string
          title: Subscription Id
        amount:
          type: integer
          title: Amount
        currency:
          type: string
          title: Currency
        presentment_amount:
          type: integer
          title: Presentment Amount
        presentment_currency:
          type: string
          title: Presentment Currency
        refundable_amount:
          type: integer
          title: Refundable Amount
        tax_amount:
          type: integer
          title: Tax Amount
        tax_state:
          anyOf:
            - type: string
            - type: 'null'
          title: Tax State
        tax_country:
          anyOf:
            - type: string
            - type: 'null'
          title: Tax Country
        fee:
          type: integer
          title: Fee
        exchange_rate:
          type: number
          title: Exchange Rate
      type: object
      required:
        - transaction_id
        - refund_id
        - amount
        - currency
        - presentment_amount
        - presentment_currency
        - tax_amount
        - fee
      title: BalanceRefundMetadata
    BalanceDisputeMetadata:
      properties:
        transaction_id:
          type: string
          title: Transaction Id
        dispute_id:
          type: string
          title: Dispute Id
        order_id:
          type: string
          title: Order Id
        order_created_at:
          type: string
          title: Order Created At
        product_id:
          type: string
          title: Product Id
        subscription_id:
          type: string
          title: Subscription Id
        amount:
          type: integer
          title: Amount
        currency:
          type: string
          title: Currency
        presentment_amount:
          type: integer
          title: Presentment Amount
        presentment_currency:
          type: string
          title: Presentment Currency
        tax_amount:
          type: integer
          title: Tax Amount
        tax_state:
          anyOf:
            - type: string
            - type: 'null'
          title: Tax State
        tax_country:
          anyOf:
            - type: string
            - type: 'null'
          title: Tax Country
        fee:
          type: integer
          title: Fee
        exchange_rate:
          type: number
          title: Exchange Rate
      type: object
      required:
        - transaction_id
        - dispute_id
        - amount
        - currency
        - presentment_amount
        - presentment_currency
        - tax_amount
        - fee
      title: BalanceDisputeMetadata
    MetadataOutputType:
      additionalProperties:
        anyOf:
          - type: string
          - type: integer
          - type: number
          - type: boolean
      type: object
    CustomerType:
      type: string
      enum:
        - individual
        - team
      title: CustomerType
    Address:
      properties:
        line1:
          anyOf:
            - type: string
            - type: 'null'
          title: Line1
        line2:
          anyOf:
            - type: string
            - type: 'null'
          title: Line2
        postal_code:
          anyOf:
            - type: string
            - type: 'null'
          title: Postal Code
        city:
          anyOf:
            - type: string
            - type: 'null'
          title: City
        state:
          anyOf:
            - type: string
            - type: 'null'
          title: State
        country:
          type: string
          enum:
            - AD
            - AE
            - AF
            - AG
            - AI
            - AL
            - AM
            - AO
            - AQ
            - AR
            - AS
            - AT
            - AU
            - AW
            - AX
            - AZ
            - BA
            - BB
            - BD
            - BE
            - BF
            - BG
            - BH
            - BI
            - BJ
            - BL
            - BM
            - BN
            - BO
            - BQ
            - BR
            - BS
            - BT
            - BV
            - BW
            - BY
            - BZ
            - CA
            - CC
            - CD
            - CF
            - CG
            - CH
            - CI
            - CK
            - CL
            - CM
            - CN
            - CO
            - CR
            - CU
            - CV
            - CW
            - CX
            - CY
            - CZ
            - DE
            - DJ
            - DK
            - DM
            - DO
            - DZ
            - EC
            - EE
            - EG
            - EH
            - ER
            - ES
            - ET
            - FI
            - FJ
            - FK
            - FM
            - FO
            - FR
            - GA
            - GB
            - GD
            - GE
            - GF
            - GG
            - GH
            - GI
            - GL
            - GM
            - GN
            - GP
            - GQ
            - GR
            - GS
            - GT
            - GU
            - GW
            - GY
            - HK
            - HM
            - HN
            - HR
            - HT
            - HU
            - ID
            - IE
            - IL
            - IM
            - IN
            - IO
            - IQ
            - IR
            - IS
            - IT
            - JE
            - JM
            - JO
            - JP
            - KE
            - KG
            - KH
            - KI
            - KM
            - KN
            - KP
            - KR
            - KW
            - KY
            - KZ
            - LA
            - LB
            - LC
            - LI
            - LK
            - LR
            - LS
            - LT
            - LU
            - LV
            - LY
            - MA
            - MC
            - MD
            - ME
            - MF
            - MG
            - MH
            - MK
            - ML
            - MM
            - MN
            - MO
            - MP
            - MQ
            - MR
            - MS
            - MT
            - MU
            - MV
            - MW
            - MX
            - MY
            - MZ
            - NA
            - NC
            - NE
            - NF
            - NG
            - NI
            - NL
            - 'NO'
            - NP
            - NR
            - NU
            - NZ
            - OM
            - PA
            - PE
            - PF
            - PG
            - PH
            - PK
            - PL
            - PM
            - PN
            - PR
            - PS
            - PT
            - PW
            - PY
            - QA
            - RE
            - RO
            - RS
            - RU
            - RW
            - SA
            - SB
            - SC
            - SD
            - SE
            - SG
            - SH
            - SI
            - SJ
            - SK
            - SL
            - SM
            - SN
            - SO
            - SR
            - SS
            - ST
            - SV
            - SX
            - SY
            - SZ
            - TC
            - TD
            - TF
            - TG
            - TH
            - TJ
            - TK
            - TL
            - TM
            - TN
            - TO
            - TR
            - TT
            - TV
            - TW
            - TZ
            - UA
            - UG
            - UM
            - US
            - UY
            - UZ
            - VA
            - VC
            - VE
            - VG
            - VI
            - VN
            - VU
            - WF
            - WS
            - YE
            - YT
            - ZA
            - ZM
            - ZW
          title: CountryAlpha2
          examples:
            - US
            - SE
            - FR
          x-speakeasy-enums:
            - AD
            - AE
            - AF
            - AG
            - AI
            - AL
            - AM
            - AO
            - AQ
            - AR
            - AS
            - AT
            - AU
            - AW
            - AX
            - AZ
            - BA
            - BB
            - BD
            - BE
            - BF
            - BG
            - BH
            - BI
            - BJ
            - BL
            - BM
            - BN
            - BO
            - BQ
            - BR
            - BS
            - BT
            - BV
            - BW
            - BY
            - BZ
            - CA
            - CC
            - CD
            - CF
            - CG
            - CH
            - CI
            - CK
            - CL
            - CM
            - CN
            - CO
            - CR
            - CU
            - CV
            - CW
            - CX
            - CY
            - CZ
            - DE
            - DJ
            - DK
            - DM
            - DO
            - DZ
            - EC
            - EE
            - EG
            - EH
            - ER
            - ES
            - ET
            - FI
            - FJ
            - FK
            - FM
            - FO
            - FR
            - GA
            - GB
            - GD
            - GE
            - GF
            - GG
            - GH
            - GI
            - GL
            - GM
            - GN
            - GP
            - GQ
            - GR
            - GS
            - GT
            - GU
            - GW
            - GY
            - HK
            - HM
            - HN
            - HR
            - HT
            - HU
            - ID
            - IE
            - IL
            - IM
            - IN
            - IO
            - IQ
            - IR
            - IS
            - IT
            - JE
            - JM
            - JO
            - JP
            - KE
            - KG
            - KH
            - KI
            - KM
            - KN
            - KP
            - KR
            - KW
            - KY
            - KZ
            - LA
            - LB
            - LC
            - LI
            - LK
            - LR
            - LS
            - LT
            - LU
            - LV
            - LY
            - MA
            - MC
            - MD
            - ME
            - MF
            - MG
            - MH
            - MK
            - ML
            - MM
            - MN
            - MO
            - MP
            - MQ
            - MR
            - MS
            - MT
            - MU
            - MV
            - MW
            - MX
            - MY
            - MZ
            - NA
            - NC
            - NE
            - NF
            - NG
            - NI
            - NL
            - 'NO'
            - NP
            - NR
            - NU
            - NZ
            - OM
            - PA
            - PE
            - PF
            - PG
            - PH
            - PK
            - PL
            - PM
            - PN
            - PR
            - PS
            - PT
            - PW
            - PY
            - QA
            - RE
            - RO
            - RS
            - RU
            - RW
            - SA
            - SB
            - SC
            - SD
            - SE
            - SG
            - SH
            - SI
            - SJ
            - SK
            - SL
            - SM
            - SN
            - SO
            - SR
            - SS
            - ST
            - SV
            - SX
            - SY
            - SZ
            - TC
            - TD
            - TF
            - TG
            - TH
            - TJ
            - TK
            - TL
            - TM
            - TN
            - TO
            - TR
            - TT
            - TV
            - TW
            - TZ
            - UA
            - UG
            - UM
            - US
            - UY
            - UZ
            - VA
            - VC
            - VE
            - VG
            - VI
            - VN
            - VU
            - WF
            - WS
            - YE
            - YT
            - ZA
            - ZM
            - ZW
      type: object
      required:
        - country
      title: Address
    CostMetadata-Output:
      properties:
        amount:
          type: string
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
    BenefitType:
      type: string
      enum:
        - custom
        - discord
        - github_repository
        - downloadables
        - license_keys
        - meter_credit
        - feature_flag
      title: BenefitType
    CustomerUpdatedFields:
      properties:
        name:
          anyOf:
            - type: string
            - type: 'null'
          title: Name
        email:
          anyOf:
            - type: string
            - type: 'null'
          title: Email
        billing_address:
          anyOf:
            - $ref: '#/components/schemas/AddressDict'
            - type: 'null'
        tax_id:
          anyOf:
            - type: string
            - type: 'null'
          title: Tax Id
        metadata:
          anyOf:
            - additionalProperties:
                anyOf:
                  - type: string
                  - type: integer
                  - type: boolean
              type: object
            - type: 'null'
          title: Metadata
      type: object
      title: CustomerUpdatedFields
    AddressDict:
      properties:
        line1:
          type: string
          title: Line1
        line2:
          type: string
          title: Line2
        postal_code:
          type: string
          title: Postal Code
        city:
          type: string
          title: City
        state:
          type: string
          title: State
        country:
          type: string
          title: Country
      type: object
      required:
        - country
      title: AddressDict
  securitySchemes:
    access_token:
      type: http
      scheme: bearer
      description: >-
        You can generate an **Organization Access Token** from your
        organization's settings.

````