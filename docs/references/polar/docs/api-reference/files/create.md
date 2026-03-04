> ## Documentation Index
> Fetch the complete documentation index at: https://polar.sh/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Create File

> Create a file.

**Scopes**: `files:write`



## OpenAPI

````yaml post /v1/files/
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
  /v1/files/:
    post:
      tags:
        - files
        - public
      summary: Create File
      description: |-
        Create a file.

        **Scopes**: `files:write`
      operationId: files:create
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/FileCreate'
      responses:
        '201':
          description: File created.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/FileUpload'
        '422':
          description: Validation Error
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/HTTPValidationError'
      x-codeSamples:
        - lang: go
          label: Go (SDK)
          source: "package main\n\nimport(\n\t\"context\"\n\t\"os\"\n\tpolargo \"github.com/polarsource/polar-go\"\n\t\"github.com/polarsource/polar-go/models/components\"\n\t\"log\"\n)\n\nfunc main() {\n    ctx := context.Background()\n\n    s := polargo.New(\n        polargo.WithSecurity(os.Getenv(\"POLAR_ACCESS_TOKEN\")),\n    )\n\n    res, err := s.Files.Create(ctx, components.CreateFileCreateDownloadable(\n        components.DownloadableFileCreate{\n            OrganizationID: polargo.Pointer(\"1dbfc517-0bbf-4301-9ba8-555ca42b9737\"),\n            Name: \"<value>\",\n            MimeType: \"<value>\",\n            Size: 612128,\n            Upload: components.S3FileCreateMultipart{\n                Parts: []components.S3FileCreatePart{},\n            },\n        },\n    ))\n    if err != nil {\n        log.Fatal(err)\n    }\n    if res.FileUpload != nil {\n        // handle response\n    }\n}"
        - lang: python
          label: Python (SDK)
          source: |-
            from polar_sdk import Polar


            with Polar(
                access_token="<YOUR_BEARER_TOKEN_HERE>",
            ) as polar:

                res = polar.files.create(request={
                    "name": "<value>",
                    "mime_type": "<value>",
                    "size": 612128,
                    "upload": {
                        "parts": [],
                    },
                    "service": "downloadable",
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
              const result = await polar.files.create({
                organizationId: "1dbfc517-0bbf-4301-9ba8-555ca42b9737",
                name: "<value>",
                mimeType: "<value>",
                size: 612128,
                upload: {
                  parts: [],
                },
                service: "downloadable",
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

            $request = new Components\DownloadableFileCreate(
                organizationId: '1dbfc517-0bbf-4301-9ba8-555ca42b9737',
                name: '<value>',
                mimeType: '<value>',
                size: 612128,
                upload: new Components\S3FileCreateMultipart(
                    parts: [],
                ),
            );

            $response = $sdk->files->create(
                request: $request
            );

            if ($response->fileUpload !== null) {
                // handle response
            }
components:
  schemas:
    FileCreate:
      oneOf:
        - $ref: '#/components/schemas/DownloadableFileCreate'
        - $ref: '#/components/schemas/ProductMediaFileCreate'
        - $ref: '#/components/schemas/OrganizationAvatarFileCreate'
      discriminator:
        propertyName: service
        mapping:
          downloadable:
            $ref: '#/components/schemas/DownloadableFileCreate'
          organization_avatar:
            $ref: '#/components/schemas/OrganizationAvatarFileCreate'
          product_media:
            $ref: '#/components/schemas/ProductMediaFileCreate'
    FileUpload:
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
        upload:
          $ref: '#/components/schemas/S3FileUploadMultipart'
        version:
          anyOf:
            - type: string
            - type: 'null'
          title: Version
        is_uploaded:
          type: boolean
          title: Is Uploaded
          default: false
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
        - upload
        - version
        - service
        - size_readable
      title: FileUpload
    HTTPValidationError:
      properties:
        detail:
          items:
            $ref: '#/components/schemas/ValidationError'
          type: array
          title: Detail
      type: object
      title: HTTPValidationError
    DownloadableFileCreate:
      properties:
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
        name:
          type: string
          title: Name
        mime_type:
          type: string
          title: Mime Type
        size:
          type: integer
          title: Size
        checksum_sha256_base64:
          anyOf:
            - type: string
            - type: 'null'
          title: Checksum Sha256 Base64
        upload:
          $ref: '#/components/schemas/S3FileCreateMultipart'
        service:
          type: string
          const: downloadable
          title: Service
        version:
          anyOf:
            - type: string
            - type: 'null'
          title: Version
      type: object
      required:
        - name
        - mime_type
        - size
        - upload
        - service
      title: DownloadableFileCreate
      description: Schema to create a file to be associated with the downloadables benefit.
    ProductMediaFileCreate:
      properties:
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
        name:
          type: string
          title: Name
        mime_type:
          type: string
          pattern: ^image\/(jpeg|png|gif|webp|svg\+xml)$
          title: Mime Type
          description: >-
            MIME type of the file. Only images are supported for this type of
            file.
        size:
          type: integer
          maximum: 10485760
          title: Size
          description: >-
            Size of the file. A maximum of 10 MB is allowed for this type of
            file.
        checksum_sha256_base64:
          anyOf:
            - type: string
            - type: 'null'
          title: Checksum Sha256 Base64
        upload:
          $ref: '#/components/schemas/S3FileCreateMultipart'
        service:
          type: string
          const: product_media
          title: Service
        version:
          anyOf:
            - type: string
            - type: 'null'
          title: Version
      type: object
      required:
        - name
        - mime_type
        - size
        - upload
        - service
      title: ProductMediaFileCreate
      description: Schema to create a file to be used as a product media file.
    OrganizationAvatarFileCreate:
      properties:
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
        name:
          type: string
          title: Name
        mime_type:
          type: string
          pattern: ^image\/(jpeg|png|gif|webp|svg\+xml)$
          title: Mime Type
          description: >-
            MIME type of the file. Only images are supported for this type of
            file.
        size:
          type: integer
          maximum: 1048576
          title: Size
          description: >-
            Size of the file. A maximum of 1 MB is allowed for this type of
            file.
        checksum_sha256_base64:
          anyOf:
            - type: string
            - type: 'null'
          title: Checksum Sha256 Base64
        upload:
          $ref: '#/components/schemas/S3FileCreateMultipart'
        service:
          type: string
          const: organization_avatar
          title: Service
        version:
          anyOf:
            - type: string
            - type: 'null'
          title: Version
      type: object
      required:
        - name
        - mime_type
        - size
        - upload
        - service
      title: OrganizationAvatarFileCreate
      description: Schema to create a file to be used as an organization avatar.
    S3FileUploadMultipart:
      properties:
        id:
          type: string
          title: Id
        path:
          type: string
          title: Path
        parts:
          items:
            $ref: '#/components/schemas/S3FileUploadPart'
          type: array
          title: Parts
      type: object
      required:
        - id
        - path
        - parts
      title: S3FileUploadMultipart
    FileServiceTypes:
      type: string
      enum:
        - downloadable
        - product_media
        - organization_avatar
      title: FileServiceTypes
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
    S3FileCreateMultipart:
      properties:
        parts:
          items:
            $ref: '#/components/schemas/S3FileCreatePart'
          type: array
          title: Parts
      type: object
      required:
        - parts
      title: S3FileCreateMultipart
    S3FileUploadPart:
      properties:
        number:
          type: integer
          title: Number
        chunk_start:
          type: integer
          title: Chunk Start
        chunk_end:
          type: integer
          title: Chunk End
        checksum_sha256_base64:
          anyOf:
            - type: string
            - type: 'null'
          title: Checksum Sha256 Base64
        url:
          type: string
          title: Url
        expires_at:
          type: string
          format: date-time
          title: Expires At
        headers:
          additionalProperties:
            type: string
          type: object
          title: Headers
          default: {}
      type: object
      required:
        - number
        - chunk_start
        - chunk_end
        - url
        - expires_at
      title: S3FileUploadPart
    S3FileCreatePart:
      properties:
        number:
          type: integer
          title: Number
        chunk_start:
          type: integer
          title: Chunk Start
        chunk_end:
          type: integer
          title: Chunk End
        checksum_sha256_base64:
          anyOf:
            - type: string
            - type: 'null'
          title: Checksum Sha256 Base64
      type: object
      required:
        - number
        - chunk_start
        - chunk_end
      title: S3FileCreatePart
  securitySchemes:
    access_token:
      type: http
      scheme: bearer
      description: >-
        You can generate an **Organization Access Token** from your
        organization's settings.

````