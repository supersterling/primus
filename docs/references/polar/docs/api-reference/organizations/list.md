> ## Documentation Index
> Fetch the complete documentation index at: https://polar.sh/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# List Organizations

> List organizations.

**Scopes**: `organizations:read` `organizations:write`



## OpenAPI

````yaml get /v1/organizations/
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
  /v1/organizations/:
    get:
      tags:
        - organizations
        - public
      summary: List Organizations
      description: |-
        List organizations.

        **Scopes**: `organizations:read` `organizations:write`
      operationId: organizations:list
      parameters:
        - name: slug
          in: query
          required: false
          schema:
            anyOf:
              - type: string
              - type: 'null'
            description: Filter by slug.
            title: Slug
          description: Filter by slug.
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
                  $ref: '#/components/schemas/OrganizationSortProperty'
              - type: 'null'
            description: >-
              Sorting criterion. Several criteria can be used simultaneously and
              will be applied in order. Add a minus sign `-` before the criteria
              name to sort by descending order.
            default:
              - created_at
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
                $ref: '#/components/schemas/ListResource_Organization_'
        '422':
          description: Validation Error
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/HTTPValidationError'
      x-codeSamples:
        - lang: go
          label: Go (SDK)
          source: "package main\n\nimport(\n\t\"context\"\n\t\"os\"\n\tpolargo \"github.com/polarsource/polar-go\"\n\t\"log\"\n)\n\nfunc main() {\n    ctx := context.Background()\n\n    s := polargo.New(\n        polargo.WithSecurity(os.Getenv(\"POLAR_ACCESS_TOKEN\")),\n    )\n\n    res, err := s.Organizations.List(ctx, nil, polargo.Pointer[int64](1), polargo.Pointer[int64](10), nil)\n    if err != nil {\n        log.Fatal(err)\n    }\n    if res.ListResourceOrganization != nil {\n        for {\n            // handle items\n\n            res, err = res.Next()\n\n            if err != nil {\n                // handle error\n            }\n\n            if res == nil {\n                break\n            }\n        }\n    }\n}"
        - lang: python
          label: Python (SDK)
          source: |-
            from polar_sdk import Polar


            with Polar(
                access_token="<YOUR_BEARER_TOKEN_HERE>",
            ) as polar:

                res = polar.organizations.list(page=1, limit=10)

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
              const result = await polar.organizations.list({});

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



            $responses = $sdk->organizations->list(
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
    OrganizationSortProperty:
      type: string
      enum:
        - created_at
        - '-created_at'
        - slug
        - '-slug'
        - name
        - '-name'
        - next_review_threshold
        - '-next_review_threshold'
        - days_in_status
        - '-days_in_status'
      title: OrganizationSortProperty
    ListResource_Organization_:
      properties:
        items:
          items:
            $ref: '#/components/schemas/Organization'
          type: array
          title: Items
        pagination:
          $ref: '#/components/schemas/Pagination'
      type: object
      required:
        - items
        - pagination
      title: ListResource[Organization]
    HTTPValidationError:
      properties:
        detail:
          items:
            $ref: '#/components/schemas/ValidationError'
          type: array
          title: Detail
      type: object
      title: HTTPValidationError
    Organization:
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
        name:
          type: string
          title: Name
          description: Organization name shown in checkout, customer portal, emails etc.
        slug:
          type: string
          title: Slug
          description: >-
            Unique organization slug in checkout, customer portal and credit
            card statements.
        avatar_url:
          anyOf:
            - type: string
            - type: 'null'
          title: Avatar Url
          description: Avatar URL shown in checkout, customer portal, emails etc.
        proration_behavior:
          $ref: '#/components/schemas/SubscriptionProrationBehavior'
          description: >-
            Proration behavior applied when customer updates their subscription
            from the portal.
        allow_customer_updates:
          type: boolean
          title: Allow Customer Updates
          description: >-
            Whether customers can update their subscriptions from the customer
            portal.
        email:
          anyOf:
            - type: string
            - type: 'null'
          title: Email
          description: Public support email.
        website:
          anyOf:
            - type: string
            - type: 'null'
          title: Website
          description: Official website of the organization.
        socials:
          items:
            $ref: '#/components/schemas/OrganizationSocialLink'
          type: array
          title: Socials
          description: Links to social profiles.
        status:
          $ref: '#/components/schemas/OrganizationStatus'
          description: Current organization status
        details_submitted_at:
          anyOf:
            - type: string
              format: date-time
            - type: 'null'
          title: Details Submitted At
          description: When the business details were submitted.
        default_presentment_currency:
          type: string
          title: Default Presentment Currency
          description: >-
            Default presentment currency. Used as fallback in checkout and
            customer portal, if the customer's local currency is not available.
        feature_settings:
          anyOf:
            - $ref: '#/components/schemas/OrganizationFeatureSettings'
            - type: 'null'
          description: Organization feature settings
        subscription_settings:
          $ref: '#/components/schemas/OrganizationSubscriptionSettings'
          description: Settings related to subscriptions management
        notification_settings:
          $ref: '#/components/schemas/OrganizationNotificationSettings'
          description: Settings related to notifications
        customer_email_settings:
          $ref: '#/components/schemas/OrganizationCustomerEmailSettings'
          description: Settings related to customer emails
        customer_portal_settings:
          $ref: '#/components/schemas/OrganizationCustomerPortalSettings'
          description: Settings related to the customer portal
      type: object
      required:
        - created_at
        - modified_at
        - id
        - name
        - slug
        - avatar_url
        - proration_behavior
        - allow_customer_updates
        - email
        - website
        - socials
        - status
        - details_submitted_at
        - default_presentment_currency
        - feature_settings
        - subscription_settings
        - notification_settings
        - customer_email_settings
        - customer_portal_settings
      title: Organization
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
    SubscriptionProrationBehavior:
      type: string
      enum:
        - invoice
        - prorate
      title: SubscriptionProrationBehavior
    OrganizationSocialLink:
      properties:
        platform:
          $ref: '#/components/schemas/OrganizationSocialPlatforms'
          description: The social platform of the URL
        url:
          type: string
          maxLength: 2083
          minLength: 1
          format: uri
          title: Url
          description: The URL to the organization profile
      type: object
      required:
        - platform
        - url
      title: OrganizationSocialLink
    OrganizationStatus:
      type: string
      enum:
        - created
        - onboarding_started
        - initial_review
        - ongoing_review
        - denied
        - active
      title: OrganizationStatus
    OrganizationFeatureSettings:
      properties:
        issue_funding_enabled:
          type: boolean
          title: Issue Funding Enabled
          description: If this organization has issue funding enabled
          default: false
        seat_based_pricing_enabled:
          type: boolean
          title: Seat Based Pricing Enabled
          description: If this organization has seat-based pricing enabled
          default: false
        revops_enabled:
          type: boolean
          title: Revops Enabled
          description: If this organization has RevOps enabled
          default: false
        wallets_enabled:
          type: boolean
          title: Wallets Enabled
          description: If this organization has Wallets enabled
          default: false
        member_model_enabled:
          type: boolean
          title: Member Model Enabled
          description: If this organization has the Member model enabled
          default: false
        tinybird_read:
          type: boolean
          title: Tinybird Read
          description: If this organization reads from Tinybird
          default: false
        tinybird_compare:
          type: boolean
          title: Tinybird Compare
          description: If this organization compares Tinybird results with database
          default: false
        checkout_localization_enabled:
          type: boolean
          title: Checkout Localization Enabled
          description: If this organization has checkout localization enabled
          default: false
        overview_metrics:
          anyOf:
            - items:
                type: string
              type: array
            - type: 'null'
          title: Overview Metrics
          description: Ordered list of metric slugs shown on the dashboard overview.
      type: object
      title: OrganizationFeatureSettings
    OrganizationSubscriptionSettings:
      properties:
        allow_multiple_subscriptions:
          type: boolean
          title: Allow Multiple Subscriptions
        allow_customer_updates:
          type: boolean
          title: Allow Customer Updates
        proration_behavior:
          $ref: '#/components/schemas/SubscriptionProrationBehavior'
        benefit_revocation_grace_period:
          type: integer
          title: Benefit Revocation Grace Period
        prevent_trial_abuse:
          type: boolean
          title: Prevent Trial Abuse
      type: object
      required:
        - allow_multiple_subscriptions
        - allow_customer_updates
        - proration_behavior
        - benefit_revocation_grace_period
        - prevent_trial_abuse
      title: OrganizationSubscriptionSettings
    OrganizationNotificationSettings:
      properties:
        new_order:
          type: boolean
          title: New Order
        new_subscription:
          type: boolean
          title: New Subscription
      type: object
      required:
        - new_order
        - new_subscription
      title: OrganizationNotificationSettings
    OrganizationCustomerEmailSettings:
      properties:
        order_confirmation:
          type: boolean
          title: Order Confirmation
        subscription_cancellation:
          type: boolean
          title: Subscription Cancellation
        subscription_confirmation:
          type: boolean
          title: Subscription Confirmation
        subscription_cycled:
          type: boolean
          title: Subscription Cycled
        subscription_cycled_after_trial:
          type: boolean
          title: Subscription Cycled After Trial
        subscription_past_due:
          type: boolean
          title: Subscription Past Due
        subscription_revoked:
          type: boolean
          title: Subscription Revoked
        subscription_uncanceled:
          type: boolean
          title: Subscription Uncanceled
        subscription_updated:
          type: boolean
          title: Subscription Updated
      type: object
      required:
        - order_confirmation
        - subscription_cancellation
        - subscription_confirmation
        - subscription_cycled
        - subscription_cycled_after_trial
        - subscription_past_due
        - subscription_revoked
        - subscription_uncanceled
        - subscription_updated
      title: OrganizationCustomerEmailSettings
    OrganizationCustomerPortalSettings:
      properties:
        usage:
          $ref: '#/components/schemas/CustomerPortalUsageSettings'
        subscription:
          $ref: '#/components/schemas/CustomerPortalSubscriptionSettings'
      type: object
      required:
        - usage
        - subscription
      title: OrganizationCustomerPortalSettings
    OrganizationSocialPlatforms:
      type: string
      enum:
        - x
        - github
        - facebook
        - instagram
        - youtube
        - tiktok
        - linkedin
        - threads
        - discord
        - other
      title: OrganizationSocialPlatforms
    CustomerPortalUsageSettings:
      properties:
        show:
          type: boolean
          title: Show
      type: object
      required:
        - show
      title: CustomerPortalUsageSettings
    CustomerPortalSubscriptionSettings:
      properties:
        update_seats:
          type: boolean
          title: Update Seats
        update_plan:
          type: boolean
          title: Update Plan
      type: object
      required:
        - update_seats
        - update_plan
      title: CustomerPortalSubscriptionSettings
  securitySchemes:
    access_token:
      type: http
      scheme: bearer
      description: >-
        You can generate an **Organization Access Token** from your
        organization's settings.

````