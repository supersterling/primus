import { attachDatabasePool } from "@vercel/functions"
import { drizzle } from "drizzle-orm/node-postgres"
import { Pool } from "pg"
import * as core from "@/lib/db/schemas/core"
import { env } from "@/lib/env"

const schema = { ...core }

const pool = new Pool({
    connectionString: env.DATABASE_URL,
    max: 50,
})
attachDatabasePool(pool)

const db = drizzle({ client: pool, schema })

export { db }
