/**
 * Injects a JSON-LD structured data script into the page.
 * Use in Server Components to add Schema.org markup for rich search results.
 * See: https://schema.org
 *
 * @example
 * <JsonLd schema={{ "@context": "https://schema.org", "@type": "FAQPage", ... }} />
 */

type JsonLdProps = {
    schema: Record<string, unknown>
}

export function JsonLd({ schema }: JsonLdProps) {
    return (
        <script
            type="application/ld+json"
            // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD requires script injection; content is server-generated, not user input
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    )
}
