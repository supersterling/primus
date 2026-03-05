import { CodeBlockContent } from "@/components/kibo-ui/code-block/server"
import { cn } from "@/lib/utils"

const CODE = `import { eq } from "drizzle-orm"

import { db } from "@/lib/db"
import { user } from "@/lib/db/schemas/core"
import { result } from "@/lib/either"
import { logger } from "@/lib/logger"

export async function getActiveUsers() {
    const query = await result.trycatch(
        () => db
            .select({
                id: user.id,
                name: user.name,
                email: user.email,
                createdAt: user.createdAt,
            })
            .from(user)
            .where(eq(user.active, true))
    )

    if (!query.ok) {
        logger.error({ err: query.error }, "Failed to fetch users")
        return result.fail(
            new Error("QUERY_FAILED", { cause: query.error })
        )
    }

    logger.info({ count: query.value.length }, "Fetched users")
    return result.pass(query.value)
}`

const codeBlockStyles = cn(
    "text-sm [&_pre]:py-4 [&_.shiki]:!bg-transparent",
    "[&_code]:grid [&_code]:overflow-x-auto [&_code]:bg-transparent",
    "[&_.line]:px-4",
    "dark:[&_.shiki]:!text-[var(--shiki-dark)]",
    "dark:[&_.shiki_span]:!text-[var(--shiki-dark)]",
)

export function TypeSafetyCode() {
    return (
        <div className={cn("overflow-hidden rounded-md", codeBlockStyles)}>
            <CodeBlockContent language="typescript">{CODE}</CodeBlockContent>
        </div>
    )
}
