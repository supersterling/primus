> ## Documentation Index
> Fetch the complete documentation index at: https://polar.sh/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Complete File Upload

> Complete a file upload.

**Scopes**: `files:write`



## OpenAPI

````yaml post /v1/files/{id}/uploaded
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
  /v1/files/{id}/uploaded:
    post:
      tags:
        - files
        - public
      summary: Complete File Upload
      description: |-
        Complete a file upload.

        **Scopes**: `files:write`
      operationId: files:uploaded
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
            format: uuid4
            description: The file ID.
            title: Id
          description: The file ID.
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/FileUploadCompleted'
      responses:
        '200':
          description: File upload completed.
          content:
            application/json:
              schema:
                oneOf:
                  - $ref: '#/components/schemas/DownloadableFileRead'
                  - $ref: '#/components/schemas/ProductMediaFileRead'
                  - $ref: '#/components/schemas/OrganizationAvatarFileRead'
                discriminator:
                  propertyName: service
                  mapping:
                    downloadable:
                      $ref: '#/components/schemas/DownloadableFileRead'
                    product_media:
                      $ref: '#/components/schemas/ProductMediaFileRead'
                    organization_avatar:
                      $ref: '#/components/schemas/OrganizationAvatarFileRead'
                title: Response Files:Uploaded
        '403':
          description: You don't have the permission to update this file.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/NotPermitted'
        '404':
          description: File not found.
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
          source: "package main\n\nimport(\n\t\"context\"\n\t\"os\"\n\tpolargo \"github.com/polarsource/polar-go\"\n\t\"github.com/polarsource/polar-go/models/components\"\n\t\"log\"\n\t\"github.com/polarsource/polar-go/models/operations\"\n)\n\nfunc main() {\n    ctx := context.Background()\n\n    s := polargo.New(\n        polargo.WithSecurity(os.Getenv(\"POLAR_ACCESS_TOKEN\")),\n    )\n\n    res, err := s.Files.Uploaded(ctx, \"<value>\", components.FileUploadCompleted{\n        ID: \"<id>\",\n        Path: \"/boot\",\n        Parts: []components.S3FileUploadCompletedPart{\n            components.S3FileUploadCompletedPart{\n                Number: 979613,\n                ChecksumEtag: \"<value>\",\n                ChecksumSha256Base64: polargo.Pointer(\"<value>\"),\n            },\n            components.S3FileUploadCompletedPart{\n                Number: 979613,\n                ChecksumEtag: \"<value>\",\n                ChecksumSha256Base64: polargo.Pointer(\"<value>\"),\n            },\n            components.S3FileUploadCompletedPart{\n                Number: 979613,\n                ChecksumEtag: \"<value>\",\n                ChecksumSha256Base64: polargo.Pointer(\"<value>\"),\n            },\n        },\n    })\n    if err != nil {\n        log.Fatal(err)\n    }\n    if res.ResponseFilesUploaded != nil {\n        switch res.ResponseFilesUploaded.Type {\n            case operations.FilesUploadedResponseFilesUploadedTypeDownloadable:\n                // res.ResponseFilesUploaded.DownloadableFileRead is populated\n            case operations.FilesUploadedResponseFilesUploadedTypeProductMedia:\n                // res.ResponseFilesUploaded.ProductMediaFileRead is populated\n            case operations.FilesUploadedResponseFilesUploadedTypeOrganizationAvatar:\n                // res.ResponseFilesUploaded.OrganizationAvatarFileRead is populated\n        }\n\n    }\n}"
        - lang: python
          label: Python (SDK)
          source: |-
            from polar_sdk import Polar


            with Polar(
                access_token="<YOUR_BEARER_TOKEN_HERE>",
            ) as polar:

                res = polar.files.uploaded(id="<value>", file_upload_completed={
                    "id": "<id>",
                    "path": "/boot",
                    "parts": [
                        {
                            "number": 979613,
                            "checksum_etag": "<value>",
                            "checksum_sha256_base64": "<value>",
                        },
                    ],
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
              const result = await polar.files.uploaded({
                id: "<value>",
                fileUploadCompleted: {
                  id: "<id>",
                  path: "/boot",
                  parts: [
                    {
                      number: 979613,
                      checksumEtag: "<value>",
                      checksumSha256Base64: "<value>",
                    },
                    {
                      number: 979613,
                      checksumEtag: "<value>",
                      checksumSha256Base64: "<value>",
                    },
                    {
                      number: 979613,
                      checksumEtag: "<value>",
                      checksumSha256Base64: "<value>",
                    },
                  ],
                },
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

            $fileUploadCompleted = new Components\FileUploadCompleted(
                id: '<id>',
                path: '/boot',
                parts: [
                    new Components\S3FileUploadCompletedPart(
                        number: 979613,
                        checksumEtag: '<value>',
                        checksumSha256Base64: '<value>',
                    ),
                    new Components\S3FileUploadCompletedPart(
                        number: 979613,
                        checksumEtag: '<value>',
                        checksumSha256Base64: '<value>',
                    ),
                    new Components\S3FileUploadCompletedPart(
                        number: 979613,
                        checksumEtag: '<value>',
                        checksumSha256Base64: '<value>',
                    ),
                ],
            );

            $response = $sdk->files->uploaded(
                id: '<value>',
                fileUploadCompleted: $fileUploadCompleted

            );

            if ($response->responseFilesUploaded !== null) {
                // handle response
            }
components:
  schemas:
    FileUploadCompleted:
      properties:
        id:
          type: string
          title: Id
        path:
          type: string
          title: Path
        parts:
          items:
            $ref: '#/components/schemas/S3FileUploadCompletedPart'
          type: array
          title: Parts
      type: object
      required:
        - id
        - path
        - parts
      title: FileUploadCompleted
    DownloadableFileRead:
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
        version:
          anyOf:
            - type: string
            - type: 'null'
          title: Version
        service:
          type: string
          const: downloadable
          title: Service
        is_uploaded:
          type: boolean
          title: Is Uploaded
        created_at:
          type: string
          format: date-time
          title: Created At
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
        - version
        - service
        - is_uploaded
        - created_at
        - size_readable
      title: DownloadableFileRead
      description: File to be associated with the downloadables benefit.
    ProductMediaFileRead:
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
        version:
          anyOf:
            - type: string
            - type: 'null'
          title: Version
        service:
          type: string
          const: product_media
          title: Service
        is_uploaded:
          type: boolean
          title: Is Uploaded
        created_at:
          type: string
          format: date-time
          title: Created At
        size_readable:
          type: string
          title: Size Readable
        public_url:
          type: string
          title: Public Url
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
        - version
        - service
        - is_uploaded
        - created_at
        - size_readable
        - public_url
      title: ProductMediaFileRead
      description: File to be used as a product media file.
    OrganizationAvatarFileRead:
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
        version:
          anyOf:
            - type: string
            - type: 'null'
          title: Version
        service:
          type: string
          const: organization_avatar
          title: Service
        is_uploaded:
          type: boolean
          title: Is Uploaded
        created_at:
          type: string
          format: date-time
          title: Created At
        size_readable:
          type: string
          title: Size Readable
        public_url:
          type: string
          title: Public Url
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
        - version
        - service
        - is_uploaded
        - created_at
        - size_readable
        - public_url
      title: OrganizationAvatarFileRead
      description: File to be used as an organization avatar.
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
    S3FileUploadCompletedPart:
      properties:
        number:
          type: integer
          title: Number
        checksum_etag:
          type: string
          title: Checksum Etag
        checksum_sha256_base64:
          anyOf:
            - type: string
            - type: 'null'
          title: Checksum Sha256 Base64
      type: object
      required:
        - number
        - checksum_etag
        - checksum_sha256_base64
      title: S3FileUploadCompletedPart
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