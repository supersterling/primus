> ## Documentation Index
> Fetch the complete documentation index at: https://polar.sh/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# List Downloadables

> **Scopes**: `customer_portal:read` `customer_portal:write`



## OpenAPI

````yaml get /v1/customer-portal/downloadables/
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
  /v1/customer-portal/downloadables/:
    get:
      tags:
        - customer_portal
        - downloadables
        - public
      summary: List Downloadables
      description: '**Scopes**: `customer_portal:read` `customer_portal:write`'
      operationId: customer_portal:downloadables:list
      parameters:
        - name: benefit_id
          in: query
          required: false
          schema:
            anyOf:
              - type: string
                format: uuid4
                description: The benefit ID.
                x-polar-selector-widget:
                  displayProperty: description
                  resourceName: Benefit
                  resourceRoot: /v1/benefits
              - type: array
                items:
                  type: string
                  format: uuid4
                  description: The benefit ID.
                  x-polar-selector-widget:
                    displayProperty: description
                    resourceName: Benefit
                    resourceRoot: /v1/benefits
              - type: 'null'
            title: BenefitID Filter
            description: Filter by benefit ID.
          description: Filter by benefit ID.
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
      responses:
        '200':
          description: Successful Response
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ListResource_DownloadableRead_'
        '422':
          description: Validation Error
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/HTTPValidationError'
      security:
        - customer_session:
            - customer_portal:read
            - customer_portal:write
        - member_session:
            - customer_portal:read
            - customer_portal:write
      x-codeSamples:
        - lang: go
          label: Go (SDK)
          source: "package main\n\nimport(\n\t\"context\"\n\tpolargo \"github.com/polarsource/polar-go\"\n\t\"os\"\n\t\"github.com/polarsource/polar-go/models/operations\"\n\t\"log\"\n)\n\nfunc main() {\n    ctx := context.Background()\n\n    s := polargo.New()\n\n    res, err := s.CustomerPortal.Downloadables.List(ctx, operations.CustomerPortalDownloadablesListSecurity{\n        CustomerSession: polargo.Pointer(os.Getenv(\"POLAR_CUSTOMER_SESSION\")),\n    }, nil, polargo.Pointer[int64](1), polargo.Pointer[int64](10))\n    if err != nil {\n        log.Fatal(err)\n    }\n    if res.ListResourceDownloadableRead != nil {\n        for {\n            // handle items\n\n            res, err = res.Next()\n\n            if err != nil {\n                // handle error\n            }\n\n            if res == nil {\n                break\n            }\n        }\n    }\n}"
        - lang: python
          label: Python (SDK)
          source: |-
            import polar_sdk
            from polar_sdk import Polar


            with Polar() as polar:

                res = polar.customer_portal.downloadables.list(security=polar_sdk.CustomerPortalDownloadablesListSecurity(
                    customer_session="<YOUR_BEARER_TOKEN_HERE>",
                ), page=1, limit=10)

                while res is not None:
                    # Handle items

                    res = res.next()
        - lang: typescript
          label: Typescript (SDK)
          source: |-
            import { Polar } from "@polar-sh/sdk";

            const polar = new Polar();

            async function run() {
              const result = await polar.customerPortal.downloadables.list({
                customerSession: process.env["POLAR_CUSTOMER_SESSION"] ?? "",
              }, {});

              for await (const page of result) {
                console.log(page);
              }
            }

            run();
        - lang: php
          label: PHP (SDK)
          source: >-
            declare(strict_types=1);


            require 'vendor/autoload.php';


            use Polar;

            use Polar\Models\Operations;


            $sdk = Polar\Polar::builder()->build();



            $requestSecurity = new
            Operations\CustomerPortalDownloadablesListSecurity(
                customerSession: '<YOUR_BEARER_TOKEN_HERE>',
            );


            $responses = $sdk->customerPortal->downloadables->list(
                security: $requestSecurity,
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
    ListResource_DownloadableRead_:
      properties:
        items:
          items:
            $ref: '#/components/schemas/DownloadableRead'
          type: array
          title: Items
        pagination:
          $ref: '#/components/schemas/Pagination'
      type: object
      required:
        - items
        - pagination
      title: ListResource[DownloadableRead]
    HTTPValidationError:
      properties:
        detail:
          items:
            $ref: '#/components/schemas/ValidationError'
          type: array
          title: Detail
      type: object
      title: HTTPValidationError
    DownloadableRead:
      properties:
        id:
          type: string
          format: uuid4
          title: Id
        benefit_id:
          type: string
          format: uuid4
          title: Benefit Id
        file:
          $ref: '#/components/schemas/FileDownload'
      type: object
      required:
        - id
        - benefit_id
        - file
      title: DownloadableRead
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
    FileDownload:
      properties:
        id:
          type: string
          format: uuid4
          title: Id
          description: The ID of the object.
        organization_id:
          type: string
          format: uuid4
          title: Organization Id
        name:
          type: string
          title: Name
        path:
          type: string
          title: Path
        mime_type:
          type: string
          title: Mime Type
        size:
          type: integer
          title: Size
        storage_version:
          anyOf:
            - type: string
            - type: 'null'
          title: Storage Version
        checksum_etag:
          anyOf:
            - type: string
            - type: 'null'
          title: Checksum Etag
        checksum_sha256_base64:
          anyOf:
            - type: string
            - type: 'null'
          title: Checksum Sha256 Base64
        checksum_sha256_hex:
          anyOf:
            - type: string
            - type: 'null'
          title: Checksum Sha256 Hex
        last_modified_at:
          anyOf:
            - type: string
              format: date-time
            - type: 'null'
          title: Last Modified At
        download:
          $ref: '#/components/schemas/S3DownloadURL'
        version:
          anyOf:
            - type: string
            - type: 'null'
          title: Version
        is_uploaded:
          type: boolean
          title: Is Uploaded
        service:
          $ref: '#/components/schemas/FileServiceTypes'
        size_readable:
          type: string
          title: Size Readable
      type: object
      required:
        - id
        - organization_id
        - name
        - path
        - mime_type
        - size
        - storage_version
        - checksum_etag
        - checksum_sha256_base64
        - checksum_sha256_hex
        - last_modified_at
        - download
        - version
        - is_uploaded
        - service
        - size_readable
      title: FileDownload
    S3DownloadURL:
      properties:
        url:
          type: string
          title: Url
        headers:
          additionalProperties:
            type: string
          type: object
          title: Headers
          default: {}
        expires_at:
          type: string
          format: date-time
          title: Expires At
      type: object
      required:
        - url
        - expires_at
      title: S3DownloadURL
    FileServiceTypes:
      type: string
      enum:
        - downloadable
        - product_media
        - organization_avatar
      title: FileServiceTypes
  securitySchemes:
    access_token:
      type: http
      scheme: bearer
      description: >-
        You can generate an **Organization Access Token** from your
        organization's settings.
    customer_session:
      type: http
      description: >-
        Customer session tokens are specific tokens that are used to
        authenticate customers on your organization. You can create those
        sessions programmatically using the [Create Customer Session
        endpoint](/api-reference/customer-portal/sessions/create).
      scheme: bearer
    member_session:
      type: http
      description: >-
        Member session tokens are specific tokens that are used to authenticate
        members on your organization. You can create those sessions
        programmatically using the [Create Member Session
        endpoint](/api-reference/member-portal/sessions/create).
      scheme: bearer

````