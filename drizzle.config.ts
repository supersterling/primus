import type { Config } from "drizzle-kit"
import { env } from "@/lib/env"

export default {
	dialect: "postgresql",
	schema: "./src/lib/db/schemas/core.ts",
	dbCredentials: {
		url: env.DATABASE_URL,
	},
	schemaFilter: ["core"],
	migrations: {
		table: "__drizzle_migrations",
		schema: "core",
	},
} satisfies Config
