> ## Documentation Index
> Fetch the complete documentation index at: https://polar.sh/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Update Organization

> Update an organization.

**Scopes**: `organizations:write`



## OpenAPI

````yaml patch /v1/organizations/{id}
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
  /v1/organizations/{id}:
    patch:
      tags:
        - organizations
        - public
      summary: Update Organization
      description: |-
        Update an organization.

        **Scopes**: `organizations:write`
      operationId: organizations:update
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
            format: uuid4
            examples:
              - 1dbfc517-0bbf-4301-9ba8-555ca42b9737
            description: The organization ID.
            x-polar-selector-widget:
              resourceRoot: /v1/organizations
              resourceName: Organization
              displayProperty: name
            title: Id
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/OrganizationUpdate'
      responses:
        '200':
          description: Organization updated.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Organization'
        '403':
          description: You don't have the permission to update this organization.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/NotPermitted'
        '404':
          description: Organization not found.
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
          source: "package main\n\nimport(\n\t\"context\"\n\t\"os\"\n\tpolargo \"github.com/polarsource/polar-go\"\n\t\"github.com/polarsource/polar-go/models/components\"\n\t\"log\"\n)\n\nfunc main() {\n    ctx := context.Background()\n\n    s := polargo.New(\n        polargo.WithSecurity(os.Getenv(\"POLAR_ACCESS_TOKEN\")),\n    )\n\n    res, err := s.Organizations.Update(ctx, \"1dbfc517-0bbf-4301-9ba8-555ca42b9737\", components.OrganizationUpdate{})\n    if err != nil {\n        log.Fatal(err)\n    }\n    if res.Organization != nil {\n        // handle response\n    }\n}"
        - lang: python
          label: Python (SDK)
          source: |-
            from polar_sdk import Polar


            with Polar(
                access_token="<YOUR_BEARER_TOKEN_HERE>",
            ) as polar:

                res = polar.organizations.update(id="1dbfc517-0bbf-4301-9ba8-555ca42b9737", organization_update={})

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
              const result = await polar.organizations.update({
                id: "1dbfc517-0bbf-4301-9ba8-555ca42b9737",
                organizationUpdate: {},
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

            $organizationUpdate = new Components\OrganizationUpdate();

            $response = $sdk->organizations->update(
                id: '1dbfc517-0bbf-4301-9ba8-555ca42b9737',
                organizationUpdate: $organizationUpdate

            );

            if ($response->organization !== null) {
                // handle response
            }
components:
  schemas:
    OrganizationUpdate:
      properties:
        name:
          anyOf:
            - type: string
              minLength: 3
            - type: 'null'
          title: Name
        avatar_url:
          anyOf:
            - type: string
              maxLength: 2083
              minLength: 1
              format: uri
            - type: 'null'
          title: Avatar Url
        email:
          anyOf:
            - type: string
              format: email
            - type: 'null'
          title: Email
          description: Public support email.
        website:
          anyOf:
            - type: string
              maxLength: 2083
              minLength: 1
              format: uri
            - type: 'null'
          title: Website
          description: Official website of the organization.
        socials:
          anyOf:
            - items:
                $ref: '#/components/schemas/OrganizationSocialLink'
              type: array
            - type: 'null'
          title: Socials
          description: Links to social profiles.
        details:
          anyOf:
            - $ref: '#/components/schemas/OrganizationDetails'
            - type: 'null'
          description: >-
            Additional, private, business details Polar needs about active
            organizations for compliance (KYC).
        feature_settings:
          anyOf:
            - $ref: '#/components/schemas/OrganizationFeatureSettings'
            - type: 'null'
        subscription_settings:
          anyOf:
            - $ref: '#/components/schemas/OrganizationSubscriptionSettings'
            - type: 'null'
        notification_settings:
          anyOf:
            - $ref: '#/components/schemas/OrganizationNotificationSettings'
            - type: 'null'
        customer_email_settings:
          anyOf:
            - $ref: '#/components/schemas/OrganizationCustomerEmailSettings'
            - type: 'null'
        customer_portal_settings:
          anyOf:
            - $ref: '#/components/schemas/OrganizationCustomerPortalSettings'
            - type: 'null'
        default_presentment_currency:
          anyOf:
            - $ref: '#/components/schemas/PresentmentCurrency'
            - type: 'null'
          description: Default presentment currency for the organization
      type: object
      title: OrganizationUpdate
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
    NotPermitted:
      properties:
        error:
          type: string
          const: NotPermitted
          title: Error
          examples:
            - NotPermitted
        detail:
          type: string
          title: Detail
      type: object
      required:
        - error
        - detail
      title: NotPermitted
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
    OrganizationDetails:
      properties:
        about:
          type: string
          title: About
          description: Brief information about you and your business.
        product_description:
          type: string
          title: Product Description
          description: Description of digital products being sold.
        intended_use:
          type: string
          title: Intended Use
          description: How the organization will integrate and use Polar.
        customer_acquisition:
          items:
            type: string
          type: array
          title: Customer Acquisition
          description: Main customer acquisition channels.
        future_annual_revenue:
          type: integer
          minimum: 0
          title: Future Annual Revenue
          description: Estimated revenue in the next 12 months
        switching:
          type: boolean
          title: Switching
          description: Switching from another platform?
          default: true
        switching_from:
          anyOf:
            - type: string
              enum:
                - paddle
                - lemon_squeezy
                - gumroad
                - stripe
                - other
            - type: 'null'
          title: Switching From
          description: Which platform the organization is migrating from.
        previous_annual_revenue:
          type: integer
          minimum: 0
          title: Previous Annual Revenue
          description: Revenue from last year if applicable.
          default: 0
      type: object
      required:
        - about
        - product_description
        - intended_use
        - customer_acquisition
        - future_annual_revenue
      title: OrganizationDetails
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
    PresentmentCurrency:
      type: string
      enum:
        - aud
        - brl
        - cad
        - chf
        - eur
        - inr
        - gbp
        - jpy
        - sek
        - usd
      title: PresentmentCurrency
    SubscriptionProrationBehavior:
      type: string
      enum:
        - invoice
        - prorate
      title: SubscriptionProrationBehavior
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