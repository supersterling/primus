> ## Documentation Index
> Fetch the complete documentation index at: https://polar.sh/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Get Metrics Limits

> Get the interval limits for the metrics endpoint.

**Scopes**: `metrics:read`



## OpenAPI

````yaml get /v1/metrics/limits
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
  /v1/metrics/limits:
    get:
      tags:
        - metrics
        - public
        - mcp
      summary: Get Metrics Limits
      description: |-
        Get the interval limits for the metrics endpoint.

        **Scopes**: `metrics:read`
      operationId: metrics:limits
      responses:
        '200':
          description: Successful Response
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/MetricsLimits'
      x-codeSamples:
        - lang: go
          label: Go (SDK)
          source: "package main\n\nimport(\n\t\"context\"\n\t\"os\"\n\tpolargo \"github.com/polarsource/polar-go\"\n\t\"log\"\n)\n\nfunc main() {\n    ctx := context.Background()\n\n    s := polargo.New(\n        polargo.WithSecurity(os.Getenv(\"POLAR_ACCESS_TOKEN\")),\n    )\n\n    res, err := s.Metrics.Limits(ctx)\n    if err != nil {\n        log.Fatal(err)\n    }\n    if res.MetricsLimits != nil {\n        // handle response\n    }\n}"
        - lang: python
          label: Python (SDK)
          source: |-
            from polar_sdk import Polar


            with Polar(
                access_token="<YOUR_BEARER_TOKEN_HERE>",
            ) as polar:

                res = polar.metrics.limits()

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
              const result = await polar.metrics.limits();

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



            $response = $sdk->metrics->limits(

            );

            if ($response->metricsLimits !== null) {
                // handle response
            }
components:
  schemas:
    MetricsLimits:
      properties:
        min_date:
          type: string
          format: date
          title: Min Date
          description: Minimum date to get metrics.
        intervals:
          $ref: '#/components/schemas/MetricsIntervalsLimits'
          description: Limits for each interval.
      type: object
      required:
        - min_date
        - intervals
      title: MetricsLimits
      description: Date limits to get metrics.
    MetricsIntervalsLimits:
      properties:
        hour:
          $ref: '#/components/schemas/MetricsIntervalLimit'
          description: Limits for the hour interval.
        day:
          $ref: '#/components/schemas/MetricsIntervalLimit'
          description: Limits for the day interval.
        week:
          $ref: '#/components/schemas/MetricsIntervalLimit'
          description: Limits for the week interval.
        month:
          $ref: '#/components/schemas/MetricsIntervalLimit'
          description: Limits for the month interval.
        year:
          $ref: '#/components/schemas/MetricsIntervalLimit'
          description: Limits for the year interval.
      type: object
      required:
        - hour
        - day
        - week
        - month
        - year
      title: MetricsIntervalsLimits
      description: Date interval limits to get metrics for each interval.
    MetricsIntervalLimit:
      properties:
        min_days:
          type: integer
          title: Min Days
          description: Minimum number of days for this interval.
        max_days:
          type: integer
          title: Max Days
          description: Maximum number of days for this interval.
      type: object
      required:
        - min_days
        - max_days
      title: MetricsIntervalLimit
      description: Date interval limit to get metrics for a given interval.
  securitySchemes:
    access_token:
      type: http
      scheme: bearer
      description: >-
        You can generate an **Organization Access Token** from your
        organization's settings.

````