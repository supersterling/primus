> ## Documentation Index
> Fetch the complete documentation index at: https://polar.sh/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Get Metrics

> Get metrics about your orders and subscriptions.

Currency values are output in cents.

**Scopes**: `metrics:read`



## OpenAPI

````yaml get /v1/metrics/
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
  /v1/metrics/:
    get:
      tags:
        - metrics
        - public
        - mcp
      summary: Get Metrics
      description: |-
        Get metrics about your orders and subscriptions.

        Currency values are output in cents.

        **Scopes**: `metrics:read`
      operationId: metrics:get
      parameters:
        - name: start_date
          in: query
          required: true
          schema:
            type: string
            format: date
            description: Start date.
            title: Start Date
          description: Start date.
        - name: end_date
          in: query
          required: true
          schema:
            type: string
            format: date
            description: End date.
            title: End Date
          description: End date.
        - name: timezone
          in: query
          required: false
          schema:
            type: string
            minLength: 1
            description: Timezone to use for the timestamps. Default is UTC.
            default: UTC
            title: Timezone
          description: Timezone to use for the timestamps. Default is UTC.
        - name: interval
          in: query
          required: true
          schema:
            $ref: '#/components/schemas/TimeInterval'
            description: Interval between two timestamps.
          description: Interval between two timestamps.
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
            title: OrganizationID Filter
            description: Filter by organization ID.
          description: Filter by organization ID.
        - name: product_id
          in: query
          required: false
          schema:
            anyOf:
              - type: string
                format: uuid4
                description: The product ID.
                x-polar-selector-widget:
                  resourceRoot: /v1/products
                  resourceName: Product
                  displayProperty: name
              - type: array
                items:
                  type: string
                  format: uuid4
                  description: The product ID.
                  x-polar-selector-widget:
                    resourceRoot: /v1/products
                    resourceName: Product
                    displayProperty: name
              - type: 'null'
            title: ProductID Filter
            description: Filter by product ID.
          description: Filter by product ID.
        - name: billing_type
          in: query
          required: false
          schema:
            anyOf:
              - $ref: '#/components/schemas/ProductBillingType'
              - type: array
                items:
                  $ref: '#/components/schemas/ProductBillingType'
              - type: 'null'
            title: ProductBillingType Filter
            description: >-
              Filter by billing type. `recurring` will filter data corresponding
              to subscriptions creations or renewals. `one_time` will filter
              data corresponding to one-time purchases.
          description: >-
            Filter by billing type. `recurring` will filter data corresponding
            to subscriptions creations or renewals. `one_time` will filter data
            corresponding to one-time purchases.
        - name: customer_id
          in: query
          required: false
          schema:
            anyOf:
              - type: string
                format: uuid4
                description: The customer ID.
              - type: array
                items:
                  type: string
                  format: uuid4
                  description: The customer ID.
              - type: 'null'
            title: CustomerID Filter
            description: Filter by customer ID.
          description: Filter by customer ID.
        - name: metrics
          in: query
          required: false
          schema:
            anyOf:
              - items:
                  type: string
                type: array
              - type: 'null'
            title: Metrics
            description: >-
              List of metric slugs to focus on. When provided, only the queries
              needed for these metrics will be executed, improving performance.
              If not provided, all metrics are returned.
          description: >-
            List of metric slugs to focus on. When provided, only the queries
            needed for these metrics will be executed, improving performance. If
            not provided, all metrics are returned.
      responses:
        '200':
          description: Successful Response
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/MetricsResponse'
        '422':
          description: Validation Error
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/HTTPValidationError'
      x-codeSamples:
        - lang: go
          label: Go (SDK)
          source: "package main\n\nimport(\n\t\"context\"\n\t\"os\"\n\tpolargo \"github.com/polarsource/polar-go\"\n\t\"github.com/polarsource/polar-go/types\"\n\t\"github.com/polarsource/polar-go/models/components\"\n\t\"github.com/polarsource/polar-go/models/operations\"\n\t\"log\"\n)\n\nfunc main() {\n    ctx := context.Background()\n\n    s := polargo.New(\n        polargo.WithSecurity(os.Getenv(\"POLAR_ACCESS_TOKEN\")),\n    )\n\n    res, err := s.Metrics.Get(ctx, operations.MetricsGetRequest{\n        StartDate: types.MustDateFromString(\"2025-03-14\"),\n        EndDate: types.MustDateFromString(\"2025-03-18\"),\n        Interval: components.TimeIntervalHour,\n        OrganizationID: polargo.Pointer(operations.CreateMetricsGetQueryParamOrganizationIDFilterStr(\n            \"1dbfc517-0bbf-4301-9ba8-555ca42b9737\",\n        )),\n    })\n    if err != nil {\n        log.Fatal(err)\n    }\n    if res.MetricsResponse != nil {\n        // handle response\n    }\n}"
        - lang: python
          label: Python (SDK)
          source: |-
            from datetime import date
            import polar_sdk
            from polar_sdk import Polar


            with Polar(
                access_token="<YOUR_BEARER_TOKEN_HERE>",
            ) as polar:

                res = polar.metrics.get(start_date=date.fromisoformat("2026-03-14"), end_date=date.fromisoformat("2026-03-18"), interval=polar_sdk.TimeInterval.HOUR, timezone="UTC", organization_id=None)

                # Handle response
                print(res)
        - lang: typescript
          label: Typescript (SDK)
          source: |-
            import { Polar } from "@polar-sh/sdk";
            import { RFCDate } from "@polar-sh/sdk/types/rfcdate.js";

            const polar = new Polar({
              accessToken: process.env["POLAR_ACCESS_TOKEN"] ?? "",
            });

            async function run() {
              const result = await polar.metrics.get({
                startDate: new RFCDate("2025-03-14"),
                endDate: new RFCDate("2025-03-18"),
                interval: "hour",
                organizationId: "1dbfc517-0bbf-4301-9ba8-555ca42b9737",
              });

              console.log(result);
            }

            run();
        - lang: php
          label: PHP (SDK)
          source: |-
            declare(strict_types=1);

            require 'vendor/autoload.php';

            use Brick\DateTime\LocalDate;
            use Polar;
            use Polar\Models\Components;
            use Polar\Models\Operations;

            $sdk = Polar\Polar::builder()
                ->setSecurity(
                    '<YOUR_BEARER_TOKEN_HERE>'
                )
                ->build();

            $request = new Operations\MetricsGetRequest(
                startDate: LocalDate::parse('2025-03-14'),
                endDate: LocalDate::parse('2025-03-18'),
                interval: Components\TimeInterval::Hour,
                organizationId: '1dbfc517-0bbf-4301-9ba8-555ca42b9737',
            );

            $response = $sdk->metrics->get(
                request: $request
            );

            if ($response->metricsResponse !== null) {
                // handle response
            }
components:
  schemas:
    TimeInterval:
      type: string
      enum:
        - year
        - month
        - week
        - day
        - hour
      title: TimeInterval
    ProductBillingType:
      type: string
      enum:
        - one_time
        - recurring
      title: ProductBillingType
    MetricsResponse:
      properties:
        periods:
          items:
            $ref: '#/components/schemas/MetricPeriod'
          type: array
          title: Periods
          description: List of data for each timestamp.
        totals:
          $ref: '#/components/schemas/MetricsTotals'
          description: Totals for the whole selected period.
        metrics:
          $ref: '#/components/schemas/Metrics'
          description: Information about the returned metrics.
      type: object
      required:
        - periods
        - totals
        - metrics
      title: MetricsResponse
      description: Metrics response schema.
    HTTPValidationError:
      properties:
        detail:
          items:
            $ref: '#/components/schemas/ValidationError'
          type: array
          title: Detail
      type: object
      title: HTTPValidationError
    MetricPeriod:
      properties:
        timestamp:
          type: string
          format: date-time
          title: Timestamp
          description: Timestamp of this period data.
        orders:
          anyOf:
            - type: integer
            - type: number
            - type: 'null'
          title: Orders
        revenue:
          anyOf:
            - type: integer
            - type: number
            - type: 'null'
          title: Revenue
        net_revenue:
          anyOf:
            - type: integer
            - type: number
            - type: 'null'
          title: Net Revenue
        cumulative_revenue:
          anyOf:
            - type: integer
            - type: number
            - type: 'null'
          title: Cumulative Revenue
        net_cumulative_revenue:
          anyOf:
            - type: integer
            - type: number
            - type: 'null'
          title: Net Cumulative Revenue
        costs:
          anyOf:
            - type: integer
            - type: number
            - type: 'null'
          title: Costs
        cumulative_costs:
          anyOf:
            - type: integer
            - type: number
            - type: 'null'
          title: Cumulative Costs
        average_order_value:
          anyOf:
            - type: integer
            - type: number
            - type: 'null'
          title: Average Order Value
        net_average_order_value:
          anyOf:
            - type: integer
            - type: number
            - type: 'null'
          title: Net Average Order Value
        average_revenue_per_user:
          anyOf:
            - type: integer
            - type: number
            - type: 'null'
          title: Average Revenue Per User
        cost_per_user:
          anyOf:
            - type: integer
            - type: number
            - type: 'null'
          title: Cost Per User
        active_user_by_event:
          anyOf:
            - type: integer
            - type: number
            - type: 'null'
          title: Active User By Event
        one_time_products:
          anyOf:
            - type: integer
            - type: number
            - type: 'null'
          title: One Time Products
        one_time_products_revenue:
          anyOf:
            - type: integer
            - type: number
            - type: 'null'
          title: One Time Products Revenue
        one_time_products_net_revenue:
          anyOf:
            - type: integer
            - type: number
            - type: 'null'
          title: One Time Products Net Revenue
        new_subscriptions:
          anyOf:
            - type: integer
            - type: number
            - type: 'null'
          title: New Subscriptions
        new_subscriptions_revenue:
          anyOf:
            - type: integer
            - type: number
            - type: 'null'
          title: New Subscriptions Revenue
        new_subscriptions_net_revenue:
          anyOf:
            - type: integer
            - type: number
            - type: 'null'
          title: New Subscriptions Net Revenue
        renewed_subscriptions:
          anyOf:
            - type: integer
            - type: number
            - type: 'null'
          title: Renewed Subscriptions
        renewed_subscriptions_revenue:
          anyOf:
            - type: integer
            - type: number
            - type: 'null'
          title: Renewed Subscriptions Revenue
        renewed_subscriptions_net_revenue:
          anyOf:
            - type: integer
            - type: number
            - type: 'null'
          title: Renewed Subscriptions Net Revenue
        active_subscriptions:
          anyOf:
            - type: integer
            - type: number
            - type: 'null'
          title: Active Subscriptions
        committed_subscriptions:
          anyOf:
            - type: integer
            - type: number
            - type: 'null'
          title: Committed Subscriptions
        monthly_recurring_revenue:
          anyOf:
            - type: integer
            - type: number
            - type: 'null'
          title: Monthly Recurring Revenue
        committed_monthly_recurring_revenue:
          anyOf:
            - type: integer
            - type: number
            - type: 'null'
          title: Committed Monthly Recurring Revenue
        checkouts:
          anyOf:
            - type: integer
            - type: number
            - type: 'null'
          title: Checkouts
        succeeded_checkouts:
          anyOf:
            - type: integer
            - type: number
            - type: 'null'
          title: Succeeded Checkouts
        checkouts_conversion:
          anyOf:
            - type: integer
            - type: number
            - type: 'null'
          title: Checkouts Conversion
        canceled_subscriptions:
          anyOf:
            - type: integer
            - type: number
            - type: 'null'
          title: Canceled Subscriptions
        canceled_subscriptions_customer_service:
          anyOf:
            - type: integer
            - type: number
            - type: 'null'
          title: Canceled Subscriptions Customer Service
        canceled_subscriptions_low_quality:
          anyOf:
            - type: integer
            - type: number
            - type: 'null'
          title: Canceled Subscriptions Low Quality
        canceled_subscriptions_missing_features:
          anyOf:
            - type: integer
            - type: number
            - type: 'null'
          title: Canceled Subscriptions Missing Features
        canceled_subscriptions_switched_service:
          anyOf:
            - type: integer
            - type: number
            - type: 'null'
          title: Canceled Subscriptions Switched Service
        canceled_subscriptions_too_complex:
          anyOf:
            - type: integer
            - type: number
            - type: 'null'
          title: Canceled Subscriptions Too Complex
        canceled_subscriptions_too_expensive:
          anyOf:
            - type: integer
            - type: number
            - type: 'null'
          title: Canceled Subscriptions Too Expensive
        canceled_subscriptions_unused:
          anyOf:
            - type: integer
            - type: number
            - type: 'null'
          title: Canceled Subscriptions Unused
        canceled_subscriptions_other:
          anyOf:
            - type: integer
            - type: number
            - type: 'null'
          title: Canceled Subscriptions Other
        churned_subscriptions:
          anyOf:
            - type: integer
            - type: number
            - type: 'null'
          title: Churned Subscriptions
        churn_rate:
          anyOf:
            - type: integer
            - type: number
            - type: 'null'
          title: Churn Rate
        ltv:
          anyOf:
            - type: integer
            - type: number
            - type: 'null'
          title: Ltv
        gross_margin:
          anyOf:
            - type: integer
            - type: number
            - type: 'null'
          title: Gross Margin
        gross_margin_percentage:
          anyOf:
            - type: integer
            - type: number
            - type: 'null'
          title: Gross Margin Percentage
        cashflow:
          anyOf:
            - type: integer
            - type: number
            - type: 'null'
          title: Cashflow
      type: object
      required:
        - timestamp
      title: MetricPeriod
    MetricsTotals:
      properties:
        orders:
          anyOf:
            - type: integer
            - type: number
            - type: 'null'
          title: Orders
        revenue:
          anyOf:
            - type: integer
            - type: number
            - type: 'null'
          title: Revenue
        net_revenue:
          anyOf:
            - type: integer
            - type: number
            - type: 'null'
          title: Net Revenue
        cumulative_revenue:
          anyOf:
            - type: integer
            - type: number
            - type: 'null'
          title: Cumulative Revenue
        net_cumulative_revenue:
          anyOf:
            - type: integer
            - type: number
            - type: 'null'
          title: Net Cumulative Revenue
        costs:
          anyOf:
            - type: integer
            - type: number
            - type: 'null'
          title: Costs
        cumulative_costs:
          anyOf:
            - type: integer
            - type: number
            - type: 'null'
          title: Cumulative Costs
        average_order_value:
          anyOf:
            - type: integer
            - type: number
            - type: 'null'
          title: Average Order Value
        net_average_order_value:
          anyOf:
            - type: integer
            - type: number
            - type: 'null'
          title: Net Average Order Value
        average_revenue_per_user:
          anyOf:
            - type: integer
            - type: number
            - type: 'null'
          title: Average Revenue Per User
        cost_per_user:
          anyOf:
            - type: integer
            - type: number
            - type: 'null'
          title: Cost Per User
        active_user_by_event:
          anyOf:
            - type: integer
            - type: number
            - type: 'null'
          title: Active User By Event
        one_time_products:
          anyOf:
            - type: integer
            - type: number
            - type: 'null'
          title: One Time Products
        one_time_products_revenue:
          anyOf:
            - type: integer
            - type: number
            - type: 'null'
          title: One Time Products Revenue
        one_time_products_net_revenue:
          anyOf:
            - type: integer
            - type: number
            - type: 'null'
          title: One Time Products Net Revenue
        new_subscriptions:
          anyOf:
            - type: integer
            - type: number
            - type: 'null'
          title: New Subscriptions
        new_subscriptions_revenue:
          anyOf:
            - type: integer
            - type: number
            - type: 'null'
          title: New Subscriptions Revenue
        new_subscriptions_net_revenue:
          anyOf:
            - type: integer
            - type: number
            - type: 'null'
          title: New Subscriptions Net Revenue
        renewed_subscriptions:
          anyOf:
            - type: integer
            - type: number
            - type: 'null'
          title: Renewed Subscriptions
        renewed_subscriptions_revenue:
          anyOf:
            - type: integer
            - type: number
            - type: 'null'
          title: Renewed Subscriptions Revenue
        renewed_subscriptions_net_revenue:
          anyOf:
            - type: integer
            - type: number
            - type: 'null'
          title: Renewed Subscriptions Net Revenue
        active_subscriptions:
          anyOf:
            - type: integer
            - type: number
            - type: 'null'
          title: Active Subscriptions
        committed_subscriptions:
          anyOf:
            - type: integer
            - type: number
            - type: 'null'
          title: Committed Subscriptions
        monthly_recurring_revenue:
          anyOf:
            - type: integer
            - type: number
            - type: 'null'
          title: Monthly Recurring Revenue
        committed_monthly_recurring_revenue:
          anyOf:
            - type: integer
            - type: number
            - type: 'null'
          title: Committed Monthly Recurring Revenue
        checkouts:
          anyOf:
            - type: integer
            - type: number
            - type: 'null'
          title: Checkouts
        succeeded_checkouts:
          anyOf:
            - type: integer
            - type: number
            - type: 'null'
          title: Succeeded Checkouts
        checkouts_conversion:
          anyOf:
            - type: integer
            - type: number
            - type: 'null'
          title: Checkouts Conversion
        canceled_subscriptions:
          anyOf:
            - type: integer
            - type: number
            - type: 'null'
          title: Canceled Subscriptions
        canceled_subscriptions_customer_service:
          anyOf:
            - type: integer
            - type: number
            - type: 'null'
          title: Canceled Subscriptions Customer Service
        canceled_subscriptions_low_quality:
          anyOf:
            - type: integer
            - type: number
            - type: 'null'
          title: Canceled Subscriptions Low Quality
        canceled_subscriptions_missing_features:
          anyOf:
            - type: integer
            - type: number
            - type: 'null'
          title: Canceled Subscriptions Missing Features
        canceled_subscriptions_switched_service:
          anyOf:
            - type: integer
            - type: number
            - type: 'null'
          title: Canceled Subscriptions Switched Service
        canceled_subscriptions_too_complex:
          anyOf:
            - type: integer
            - type: number
            - type: 'null'
          title: Canceled Subscriptions Too Complex
        canceled_subscriptions_too_expensive:
          anyOf:
            - type: integer
            - type: number
            - type: 'null'
          title: Canceled Subscriptions Too Expensive
        canceled_subscriptions_unused:
          anyOf:
            - type: integer
            - type: number
            - type: 'null'
          title: Canceled Subscriptions Unused
        canceled_subscriptions_other:
          anyOf:
            - type: integer
            - type: number
            - type: 'null'
          title: Canceled Subscriptions Other
        churned_subscriptions:
          anyOf:
            - type: integer
            - type: number
            - type: 'null'
          title: Churned Subscriptions
        churn_rate:
          anyOf:
            - type: integer
            - type: number
            - type: 'null'
          title: Churn Rate
        ltv:
          anyOf:
            - type: integer
            - type: number
            - type: 'null'
          title: Ltv
        gross_margin:
          anyOf:
            - type: integer
            - type: number
            - type: 'null'
          title: Gross Margin
        gross_margin_percentage:
          anyOf:
            - type: integer
            - type: number
            - type: 'null'
          title: Gross Margin Percentage
        cashflow:
          anyOf:
            - type: integer
            - type: number
            - type: 'null'
          title: Cashflow
      type: object
      title: MetricsTotals
    Metrics:
      properties:
        orders:
          anyOf:
            - $ref: '#/components/schemas/Metric'
            - type: 'null'
        revenue:
          anyOf:
            - $ref: '#/components/schemas/Metric'
            - type: 'null'
        net_revenue:
          anyOf:
            - $ref: '#/components/schemas/Metric'
            - type: 'null'
        cumulative_revenue:
          anyOf:
            - $ref: '#/components/schemas/Metric'
            - type: 'null'
        net_cumulative_revenue:
          anyOf:
            - $ref: '#/components/schemas/Metric'
            - type: 'null'
        costs:
          anyOf:
            - $ref: '#/components/schemas/Metric'
            - type: 'null'
        cumulative_costs:
          anyOf:
            - $ref: '#/components/schemas/Metric'
            - type: 'null'
        average_order_value:
          anyOf:
            - $ref: '#/components/schemas/Metric'
            - type: 'null'
        net_average_order_value:
          anyOf:
            - $ref: '#/components/schemas/Metric'
            - type: 'null'
        average_revenue_per_user:
          anyOf:
            - $ref: '#/components/schemas/Metric'
            - type: 'null'
        cost_per_user:
          anyOf:
            - $ref: '#/components/schemas/Metric'
            - type: 'null'
        active_user_by_event:
          anyOf:
            - $ref: '#/components/schemas/Metric'
            - type: 'null'
        one_time_products:
          anyOf:
            - $ref: '#/components/schemas/Metric'
            - type: 'null'
        one_time_products_revenue:
          anyOf:
            - $ref: '#/components/schemas/Metric'
            - type: 'null'
        one_time_products_net_revenue:
          anyOf:
            - $ref: '#/components/schemas/Metric'
            - type: 'null'
        new_subscriptions:
          anyOf:
            - $ref: '#/components/schemas/Metric'
            - type: 'null'
        new_subscriptions_revenue:
          anyOf:
            - $ref: '#/components/schemas/Metric'
            - type: 'null'
        new_subscriptions_net_revenue:
          anyOf:
            - $ref: '#/components/schemas/Metric'
            - type: 'null'
        renewed_subscriptions:
          anyOf:
            - $ref: '#/components/schemas/Metric'
            - type: 'null'
        renewed_subscriptions_revenue:
          anyOf:
            - $ref: '#/components/schemas/Metric'
            - type: 'null'
        renewed_subscriptions_net_revenue:
          anyOf:
            - $ref: '#/components/schemas/Metric'
            - type: 'null'
        active_subscriptions:
          anyOf:
            - $ref: '#/components/schemas/Metric'
            - type: 'null'
        committed_subscriptions:
          anyOf:
            - $ref: '#/components/schemas/Metric'
            - type: 'null'
        monthly_recurring_revenue:
          anyOf:
            - $ref: '#/components/schemas/Metric'
            - type: 'null'
        committed_monthly_recurring_revenue:
          anyOf:
            - $ref: '#/components/schemas/Metric'
            - type: 'null'
        checkouts:
          anyOf:
            - $ref: '#/components/schemas/Metric'
            - type: 'null'
        succeeded_checkouts:
          anyOf:
            - $ref: '#/components/schemas/Metric'
            - type: 'null'
        checkouts_conversion:
          anyOf:
            - $ref: '#/components/schemas/Metric'
            - type: 'null'
        canceled_subscriptions:
          anyOf:
            - $ref: '#/components/schemas/Metric'
            - type: 'null'
        canceled_subscriptions_customer_service:
          anyOf:
            - $ref: '#/components/schemas/Metric'
            - type: 'null'
        canceled_subscriptions_low_quality:
          anyOf:
            - $ref: '#/components/schemas/Metric'
            - type: 'null'
        canceled_subscriptions_missing_features:
          anyOf:
            - $ref: '#/components/schemas/Metric'
            - type: 'null'
        canceled_subscriptions_switched_service:
          anyOf:
            - $ref: '#/components/schemas/Metric'
            - type: 'null'
        canceled_subscriptions_too_complex:
          anyOf:
            - $ref: '#/components/schemas/Metric'
            - type: 'null'
        canceled_subscriptions_too_expensive:
          anyOf:
            - $ref: '#/components/schemas/Metric'
            - type: 'null'
        canceled_subscriptions_unused:
          anyOf:
            - $ref: '#/components/schemas/Metric'
            - type: 'null'
        canceled_subscriptions_other:
          anyOf:
            - $ref: '#/components/schemas/Metric'
            - type: 'null'
        churned_subscriptions:
          anyOf:
            - $ref: '#/components/schemas/Metric'
            - type: 'null'
        churn_rate:
          anyOf:
            - $ref: '#/components/schemas/Metric'
            - type: 'null'
        ltv:
          anyOf:
            - $ref: '#/components/schemas/Metric'
            - type: 'null'
        gross_margin:
          anyOf:
            - $ref: '#/components/schemas/Metric'
            - type: 'null'
        gross_margin_percentage:
          anyOf:
            - $ref: '#/components/schemas/Metric'
            - type: 'null'
        cashflow:
          anyOf:
            - $ref: '#/components/schemas/Metric'
            - type: 'null'
      type: object
      title: Metrics
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
    Metric:
      properties:
        slug:
          type: string
          title: Slug
          description: Unique identifier for the metric.
        display_name:
          type: string
          title: Display Name
          description: Human-readable name for the metric.
        type:
          $ref: '#/components/schemas/MetricType'
          description: Type of the metric, useful to know the unit or format of the value.
      type: object
      required:
        - slug
        - display_name
        - type
      title: Metric
      description: Information about a metric.
    MetricType:
      type: string
      enum:
        - scalar
        - currency
        - currency_sub_cent
        - percentage
      title: MetricType
  securitySchemes:
    access_token:
      type: http
      scheme: bearer
      description: >-
        You can generate an **Organization Access Token** from your
        organization's settings.

````