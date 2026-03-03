This tutorial demonstrates how to use Drizzle ORM with [Xata](https://xata.io). Xata is a PostgreSQL database platform designed to help developers operate and scale databases with enhanced productivity and performance, featuring instant copy-on-write database branches, zero-downtime schema changes, data anonymization, and AI-powered performance monitoring.

<Prerequisites>
- You should have installed Drizzle ORM and [Drizzle kit](/docs/kit-overview). You can do this by running the following command:
```bash
npm install drizzle-orm
```
```bash
npm install -D drizzle-kit
```
- You should have installed `dotenv` package for managing environment variables. Read more about this package [here](https://www.npmjs.com/package/dotenv)
```bash
npm install dotenv
```

- You should have installed `postgres` package for connecting to the Postgres database. Read more about this package [here](https://www.npmjs.com/package/postgres)
```bash
npm install postgres
```

- You should have a Xata account and database set up. Follow the [Xata documentation](https://xata.io/documentation/getting-started) to create your account and database
</Prerequisites>

Check [Xata documentation](https://xata.io/documentation/quickstarts/drizzle) to learn more about using Drizzle ORM with Xata.

## Setup Xata and Drizzle ORM

#### Create a new Xata database

You can create a new Xata database by following these steps:

1. Sign up or log in to your [Xata account](https://xata.io/)
2. Create a new database from the dashboard
3. Choose your region and database name
4. Your database will be created with a PostgreSQL endpoint

#### Setup connection string variable

Navigate to the Xata dashboard and copy the PostgreSQL connection string. You can find this on the branch overview page.

Add `DATABASE_URL` variable to your `.env` or `.env.local` file:

```plaintext
DATABASE_URL=<YOUR_XATA_DATABASE_URL>
```

The connection string format will be:
```plaintext
postgresql://postgres:<password>@<branch-id>.<region>.xata.tech/<database>?sslmode=require
```

Example:
```plaintext
postgresql://postgres:password@t56hgfp7hd2sjfeiqcn66qpo8s.us-east-1.xata.tech/app?sslmode=require
```

> **Info:** Xata provides branch-based development, allowing you to create isolated database branches for development, staging, and production environments.

#### Connect Drizzle ORM to your database

Create a `index.ts` file in the `src/db` directory and set up your database configuration:

```typescript
import { config } from 'dotenv';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

config({ path: '.env' }); // or .env.local

const client = postgres(process.env.DATABASE_URL!);
export const db = drizzle({ client });
```

#### Create tables

Create a `schema.ts` file in the `src/db` directory and declare your tables:

```typescript
import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const usersTable = pgTable('users_table', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  age: integer('age').notNull(),
  email: text('email').notNull().unique(),
});

export const postsTable = pgTable('posts_table', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  userId: integer('user_id')
    .notNull()
    .references(() => usersTable.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date()),
});

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;

export type InsertPost = typeof postsTable.$inferInsert;
export type SelectPost = typeof postsTable.$inferSelect;
```

#### Setup Drizzle config file

**Drizzle config** - a configuration file that is used by [Drizzle Kit](/docs/kit-overview) and contains all the information about your database connection, migration folder and schema files.

Create a `drizzle.config.ts` file in the root of your project and add the following content:

```typescript
import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';

config({ path: '.env' });

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
```

#### Applying changes to the database

You can generate migrations using `drizzle-kit generate` command and then run them using the `drizzle-kit migrate` command.

Generate migrations:

```bash
npx drizzle-kit generate
```

These migrations are stored in the `migrations` directory, as specified in your `drizzle.config.ts`. This directory will contain the SQL files necessary to update your database schema and a `meta` folder for storing snapshots of the schema at different migration stages.

Example of a generated migration:

```sql
CREATE TABLE IF NOT EXISTS "posts_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"content" text NOT NULL,
	"user_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"age" integer NOT NULL,
	"email" text NOT NULL,
	CONSTRAINT "users_table_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "posts_table" ADD CONSTRAINT "posts_table_user_id_users_table_id_fk" FOREIGN KEY ("user_id") REFERENCES "users_table"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
```

Run migrations:

```bash
npx drizzle-kit migrate
```

Learn more about [migration process](/docs/migrations).

Alternatively, you can push changes directly to the database using [Drizzle kit push command](/docs/kit-overview#prototyping-with-db-push):

```bash
npx drizzle-kit push
```

> **Warning:** Push command is good for situations where you need to quickly test new schema designs or changes in a local development environment, allowing for fast iterations without the overhead of managing migration files.

> **Info:** **Xata Branch-Based Development**: Xata allows you to create database branches for different environments. You can use different connection strings for development, staging, and production branches, making it easy to test schema changes before deploying to production.

## Basic file structure

This is the basic file structure of the project. In the `src/db` directory, we have database-related files including connection in `index.ts` and schema definitions in `schema.ts`.

```plaintext
📦 <project root>
 ├ 📂 src
 │   ├ 📂 db
 │   │  ├ 📜 index.ts
 │   │  └ 📜 schema.ts
 ├ 📂 migrations
 │   ├ 📂 meta
 │   │  ├ 📜 _journal.json
 │   │  └ 📜 0000_snapshot.json
 │   └ 📜 0000_watery_spencer_smythe.sql
 ├ 📜 .env
 ├ 📜 drizzle.config.ts
 ├ 📜 package.json
 └ 📜 tsconfig.json
```

## Query examples

For instance, we create `src/db/queries` folder and separate files for each operation: insert, select, update, delete.

#### Insert data

Read more about insert query in the [documentation](/docs/insert).

```typescript
import { db } from '../index';
import { InsertPost, InsertUser, postsTable, usersTable } from '../schema';

export async function createUser(data: InsertUser) {
  await db.insert(usersTable).values(data);
}

export async function createPost(data: InsertPost) {
  await db.insert(postsTable).values(data);
}
```

#### Select data

Read more about select query in the [documentation](/docs/select).

> **Warning:** `getColumns` available starting from `drizzle-orm@1.0.0-beta.2`(read more [here](/docs/upgrade-v1))
> If you are on pre-1 version(like `0.45.1`) then use `getTableColumns`

```typescript
import { asc, between, count, eq, getColumns, sql } from 'drizzle-orm';
import { db } from '../index';
import { SelectUser, postsTable, usersTable } from '../schema';

export async function getUserById(id: SelectUser['id']): Promise<
  Array<{
    id: number;
    name: string;
    age: number;
    email: string;
  }>
> {
  return db.select().from(usersTable).where(eq(usersTable.id, id));
}

export async function getUsersWithPostsCount(
  page = 1,
  pageSize = 5,
): Promise<
  Array<{
    postsCount: number;
    id: number;
    name: string;
    age: number;
    email: string;
  }>
> {
  return db
    .select({
      ...getColumns(usersTable),
      postsCount: count(postsTable.id),
    })
    .from(usersTable)
    .leftJoin(postsTable, eq(usersTable.id, postsTable.userId))
    .groupBy(usersTable.id)
    .orderBy(asc(usersTable.id))
    .limit(pageSize)
    .offset((page - 1) * pageSize);
}

export async function getPostsForLast24Hours(
  page = 1,
  pageSize = 5,
): Promise<
  Array<{
    id: number;
    title: string;
  }>
> {
  return db
    .select({
      id: postsTable.id,
      title: postsTable.title,
    })
    .from(postsTable)
    .where(between(postsTable.createdAt, sql`now() - interval '1 day'`, sql`now()`))
    .orderBy(asc(postsTable.title), asc(postsTable.id))
    .limit(pageSize)
    .offset((page - 1) * pageSize);
}
```

Alternatively, you can use [relational query syntax](/docs/rqb).

#### Update data

Read more about update query in the [documentation](/docs/update).

```typescript
import { eq } from 'drizzle-orm';
import { db } from '../index';
import { SelectPost, postsTable } from '../schema';

export async function updatePost(id: SelectPost['id'], data: Partial<Omit<SelectPost, 'id'>>) {
  await db.update(postsTable).set(data).where(eq(postsTable.id, id));
}
```

#### Delete data

Read more about delete query in the [documentation](/docs/delete).

```typescript
import { eq } from 'drizzle-orm';
import { db } from '../index';
import { SelectUser, usersTable } from '../schema';

export async function deleteUser(id: SelectUser['id']) {
  await db.delete(usersTable).where(eq(usersTable.id, id));
}
```

## Next Steps

Now that you have successfully set up Drizzle ORM with Xata, you can explore more advanced features:

- Learn about [Drizzle relations](/docs/rqb) for complex queries
- Explore [Xata's documentation](https://xata.io/documentation/)
- Implement [database migrations](/docs/migrations) for production deployments
