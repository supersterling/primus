## Type API
To retrieve a type from your table schema for `select` and `insert` queries, you can make use of our type helpers.

```ts
import { serial, text, pgTable } from 'drizzle-orm/pg-core';
import { type InferSelectModel, type InferInsertModel } from 'drizzle-orm'

const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
});

type SelectUser = typeof users.$inferSelect;
type InsertUser = typeof users.$inferInsert;
// or
type SelectUser = typeof users._.$inferSelect;
type InsertUser = typeof users._.$inferInsert;
// or
type SelectUser = InferSelectModel<typeof users>;
type InsertUser = InferInsertModel<typeof users>;
```
```ts
import { int, text, mysqlTable } from 'drizzle-orm/mysql-core';
import { type InferSelectModel, type InferInsertModel } from 'drizzle-orm'

const users = mysqlTable('users', {
  id: int('id').primaryKey(),
  name: text('name').notNull(),
});

type SelectUser = typeof users.$inferSelect;
type InsertUser = typeof users.$inferInsert;
// or
type SelectUser = typeof users._.$inferSelect;
type InsertUser = typeof users._.$inferInsert;
// or
type SelectUser = InferSelectModel<typeof users>;
type InsertUser = InferInsertModel<typeof users>;
```
```ts
import { int, text, sqliteTable } from 'drizzle-orm/sqlite-core';
import { type InferSelectModel, type InferInsertModel } from 'drizzle-orm'

const users = sqliteTable('users', {
  id: int('id').primaryKey(),
  name: text('name').notNull(),
});

type SelectUser = typeof users.$inferSelect;
type InsertUser = typeof users.$inferInsert;
// or
type SelectUser = typeof users._.$inferSelect;
type InsertUser = typeof users._.$inferInsert;
// or
type SelectUser = InferSelectModel<typeof users>;
type InsertUser = InferInsertModel<typeof users>;
```
```ts
import { int, text, singlestoreTable } from 'drizzle-orm/singlestore-core';
import { type InferSelectModel, type InferInsertModel } from 'drizzle-orm'

const users = singlestoreTable('users', {
  id: int('id').primaryKey(),
  name: text('name').notNull(),
});

type SelectUser = typeof users.$inferSelect;
type InsertUser = typeof users.$inferInsert;
// or
type SelectUser = typeof users._.$inferSelect;
type InsertUser = typeof users._.$inferInsert;
// or
type SelectUser = InferSelectModel<typeof users>;
type InsertUser = InferInsertModel<typeof users>;
```
```ts
import { int, text, mssqlTable } from 'drizzle-orm/mssql-core';
import { type InferSelectModel, type InferInsertModel } from 'drizzle-orm'

const users = mssqlTable('users', {
  id: int().primaryKey(),
  name: text().notNull(),
});

type SelectUser = typeof users.$inferSelect;
type InsertUser = typeof users.$inferInsert;
// or
type SelectUser = typeof users._.$inferSelect;
type InsertUser = typeof users._.$inferInsert;
// or
type SelectUser = InferSelectModel<typeof users>;
type InsertUser = InferInsertModel<typeof users>;
```
```ts
import { int4, text, cockroachTable } from 'drizzle-orm/cockroach-core';
import { type InferSelectModel, type InferInsertModel } from 'drizzle-orm'

const users = cockroachTable('users', {
  id: int4().primaryKey(),
  name: text().notNull(),
});

type SelectUser = typeof users.$inferSelect;
type InsertUser = typeof users.$inferInsert;
// or
type SelectUser = typeof users._.$inferSelect;
type InsertUser = typeof users._.$inferInsert;
// or
type SelectUser = InferSelectModel<typeof users>;
type InsertUser = InferInsertModel<typeof users>;
```

## Logging
To enable default query logging, just pass `{ logger: true }` to the `drizzle` initialization function:
```typescript
import { drizzle } from 'drizzle-orm/...'; // driver specific

const db = drizzle({ logger: true });
```

You can change the logs destination by creating a `DefaultLogger` instance and providing a custom `writer` to it:
```typescript
import { DefaultLogger, LogWriter } from 'drizzle-orm/logger';
import { drizzle } from 'drizzle-orm/...'; // driver specific

class MyLogWriter implements LogWriter {
  write(message: string) {
    // Write to file, stdout, etc.
  }
}

const logger = new DefaultLogger({ writer: new MyLogWriter() });
const db = drizzle({ logger });
```

You can also create a custom logger:
```typescript
import { Logger } from 'drizzle-orm/logger';
import { drizzle } from 'drizzle-orm/...'; // driver specific

class MyLogger implements Logger {
  logQuery(query: string, params: unknown[]): void {
    console.log({ query, params });
  }
}

const db = drizzle({ logger: new MyLogger() });
```

## Multi-project schema
**Table creator** API lets you define customize table names.  
It's very useful when you need to keep schemas of different projects in one database.

```ts
import { serial, text, pgTableCreator } from 'drizzle-orm/pg-core';

const pgTable = pgTableCreator((name) => `project1_${name}`);

const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
});
```
```ts
import { int, text, mysqlTableCreator } from 'drizzle-orm/mysql-core';

const mysqlTable = mysqlTableCreator((name) => `project1_${name}`);

const users = mysqlTable('users', {
  id: int('id').primaryKey(),
  name: text('name').notNull(),
});
```
```ts
import { int, text, sqliteTableCreator } from 'drizzle-orm/sqlite-core';

const sqliteTable = sqliteTableCreator((name) => `project1_${name}`);

const users = sqliteTable('users', {
  id: int('id').primaryKey(),
  name: text('name').notNull(),
});
```
```ts
import { int, text, singlestoreTableCreator } from 'drizzle-orm/singlestore-core';

const singlestoreTable = singlestoreTableCreator((name) => `project1_${name}`);

const users = singlestoreTable('users', {
  id: int('id').primaryKey(),
  name: text('name').notNull(),
});
```
```ts
import { int, text, mssqlTableCreator } from 'drizzle-orm/mssql-core';

const mssqlTable = mssqlTableCreator((name) => `project1_${name}`);

const users = mssqlTable('users', {
  id: int().primaryKey(),
  name: text().notNull(),
});
```
```ts
import { int4, text, cockroachTableCreator } from 'drizzle-orm/cockroach-core';

const pgTable = cockroachTableCreator((name) => `project1_${name}`);

const users = pgTable('users', {
  id: int4().primaryKey(),
  name: text().notNull(),
});
```
```ts
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/schema/*",
  out: "./drizzle",
  dialect: "mysql", 
  dbCredentials: {
    url: process.env.DATABASE_URL,
  }
  tablesFilter: ["project1_*"],
});
```

You can apply multiple `or` filters:
```ts
tablesFilter: ["project1_*", "project2_*"]
```

## Printing SQL query
You can print SQL queries with `db` instance or by using **[`standalone query builder`](#standalone-query-builder)**.
```typescript
const query = db
  .select({ id: users.id, name: users.name })
  .from(users)
  .groupBy(users.id)
  .toSQL();
// query:
{
  sql: 'select 'id', 'name' from 'users' group by 'users'.'id'',
  params: [],
}
```

## Raw SQL queries execution
If you have some complex queries to execute and `drizzle-orm` can't handle them yet,
you can use the `db.execute` method to execute raw `parametrized` queries.

```ts
    const statement = sql`select * from ${users} where ${users.id} = ${userId}`;
    const res: postgres.RowList<Record<string, unknown>[]> = await db.execute(statement)
```
```typescript
    import { ..., MySqlQueryResult } from "drizzle-orm/mysql2";

    const statement = sql`select * from ${users} where ${users.id} = ${userId}`;
    const res: MySqlRawQueryResult = await db.execute(statement);
```
```ts
    const statement = sql`select * from ${users} where ${users.id} = ${userId}`;

    const res: unknown[] = db.all(statement)
    const res: unknown = db.get(statement)
    const res: unknown[][] = db.values(statement)
    const res: Database.RunResult = db.run(statement)
```
```typescript
    import { ..., SingleStoreQueryResult } from "drizzle-orm/singlestore";

    const statement = sql`select * from ${users} where ${users.id} = ${userId}`;
    const res: SingleStoreRawQueryResult = await db.execute(statement);
```
```typescript
    import { sql } from "drizzle-orm";

    const statement = sql`select * from ${users} where ${users.id} = ${userId}`;
    const res = await db.execute(statement);
```
```ts
    const statement = sql`select * from ${users} where ${users.id} = ${userId}`;
    const res = await db.execute(statement)
```

## Standalone query builder
Drizzle ORM provides a standalone query builder that allows you to build queries
without creating a database instance and get generated SQL.
```typescript
        import { QueryBuilder } from 'drizzle-orm/pg-core';

        const qb = new QueryBuilder();

        const query = qb.select().from(users).where(eq(users.name, 'Dan'));
        const { sql, params } = query.toSQL();
```
```typescript
        import { QueryBuilder } from 'drizzle-orm/mysql-core';

        const qb = new QueryBuilder();

        const query = qb.select().from(users).where(eq(users.name, 'Dan'));
        const { sql, params } = query.toSQL();
```
```typescript
        import { QueryBuilder } from 'drizzle-orm/sqlite-core';

        const qb = new QueryBuilder();

        const query = qb.select().from(users).where(eq(users.name, 'Dan'));
        const { sql, params } = query.toSQL();
```
```typescript
        import { QueryBuilder } from 'drizzle-orm/singlestore-core';

        const qb = new QueryBuilder();

        const query = qb.select().from(users).where(eq(users.name, 'Dan'));
        const { sql, params } = query.toSQL();
```
```typescript
        import { QueryBuilder } from 'drizzle-orm/mssql-core';

        const qb = new QueryBuilder();

        const query = qb.select().from(users).where(eq(users.name, 'Dan'));
        const { sql, params } = query.toSQL();
```
```typescript
        import { QueryBuilder } from 'drizzle-orm/cockroach-core';

        const qb = new QueryBuilder();

        const query = qb.select().from(users).where(eq(users.name, 'Dan'));
        const { sql, params } = query.toSQL();
```

## Get typed columns
You can get a typed columns map,
very useful when you need to omit certain columns upon selection.

> **Warning:** `getColumns` available starting from `drizzle-orm@1.0.0-beta.2`(read more [here](/docs/upgrade-v1))
> If you are on pre-1 version(like `0.45.1`) then use `getTableColumns`

<br/>

```ts
        import { getColumns } from "drizzle-orm";
        import { user } from "./schema";

        const { password, role, ...rest } = getColumns(user);

        await db.select({ ...rest }).from(users);
```
```ts
        import { serial, text, pgTable } from "drizzle-orm/pg-core";

        export const user = pgTable("user", {
          id: serial("id").primaryKey(),
          name: text("name"),
          email: text("email"),
          password: text("password"),
          role: text("role").$type<"admin" | "customer">(),
        });
```
```ts
        import { getColumns } from "drizzle-orm";
        import { user } from "./schema";

        const { password, role, ...rest } = getColumns(user);

        await db.select({ ...rest }).from(users);
```
```ts
        import { int, text, mysqlTable } from "drizzle-orm/mysql-core";

        export const user = mysqlTable("user", {
          id: int("id").primaryKey().autoincrement(),
          name: text("name"),
          email: text("email"),
          password: text("password"),
          role: text("role").$type<"admin" | "customer">(),
        });
```
```ts
        import { getColumns } from "drizzle-orm";
        import { user } from "./schema";

        const { password, role, ...rest } = getColumns(user);

        await db.select({ ...rest }).from(users);
```
```ts
        import { integer, text, sqliteTable } from "drizzle-orm/sqlite-core";

        export const user = sqliteTable("user", {
          id: integer("id").primaryKey({ autoIncrement: true }),
          name: text("name"),
          email: text("email"),
          password: text("password"),
          role: text("role").$type<"admin" | "customer">(),
        });
```
```ts
        import { getColumns } from "drizzle-orm";
        import { user } from "./schema";

        const { password, role, ...rest } = getColumns(user);

        await db.select({ ...rest }).from(users);
```
```ts
        import { int, text, singlestoreTable } from "drizzle-orm/singlestore-core";

        export const user = singlestoreTable("user", {
          id: int("id").primaryKey().autoincrement(),
          name: text("name"),
          email: text("email"),
          password: text("password"),
          role: text("role").$type<"admin" | "customer">(),
        });
```
```ts
        import { getColumns } from "drizzle-orm";
        import { user } from "./schema";

        const { password, role, ...rest } = getColumns(user);

        await db.select({ ...rest }).from(users);
```
```ts
        import { int, text, mssqlTable } from "drizzle-orm/mssql-core";

        export const user = mssqlTable("user", {
          id: int().primaryKey(),
          name: text(),
          email: text(),
          password: text(),
          role: text().$type<"admin" | "customer">(),
        });
```
```ts
        import { getColumns } from "drizzle-orm";
        import { user } from "./schema";

        const { password, role, ...rest } = getColumns(user);

        await db.select({ ...rest }).from(users);
```
```ts
        import { int4, text, pgTable } from "drizzle-orm/cockroach-core";

        export const user = pgTable("user", {
          id: int4().primaryKey(),
          name: text(),
          email: text(),
          password: text(),
          role: text().$type<"admin" | "customer">(),
        });
```

## Get table information
```ts
    import { getTableConfig, pgTable } from 'drizzle-orm/pg-core';

    export const table = pgTable(...);

    const {
      columns,
      indexes,
      foreignKeys,
      checks,
      primaryKeys,
      name,
      schema,
    } = getTableConfig(table);
```
```ts
  import { getTableConfig, mysqlTable } from 'drizzle-orm/mysql-core';

  export const table = mysqlTable(...);

  const {
    columns,
    indexes,
    foreignKeys,
    checks,
    primaryKeys,
    name,
    schema,
  } = getTableConfig(table);
```
```ts
  import { getTableConfig, sqliteTable } from 'drizzle-orm/sqlite-core';

  export const table = sqliteTable(...);

  const {
    columns,
    indexes,
    foreignKeys,
    checks,
    primaryKeys,
    name,
    schema,
  } = getTableConfig(table);
```
```ts
  import { getTableConfig, mysqlTable } from 'drizzle-orm/singlestore-core';

  export const table = singlestoreTable(...);

  const {
    columns,
    indexes,
    checks,
    primaryKeys,
    name,
    schema,
  } = getTableConfig(table);
```
```ts
  import { getTableConfig, mssqlTable } from 'drizzle-orm/mssql-core';

  export const table = mssqlTable(...);

  const {
    columns,
    indexes,
    checks,
    primaryKeys,
    name,
    schema,
  } = getTableConfig(table);
```
```ts
    import { getTableConfig, cockroachTable } from 'drizzle-orm/cockroach-core';

    export const table = cockroachTable(...);

    const {
      columns,
      indexes,
      foreignKeys,
      checks,
      primaryKeys,
      name,
      schema,
    } = getTableConfig(table);
```

## Compare objects types (instanceof alternative)

You can check if an object is of a specific Drizzle type using the `is()` function. 
You can use it with any available type in Drizzle.

> **Warning:** You should always use `is()` instead of `instanceof`

**Few examples**
```ts
import { Column, is } from 'drizzle-orm';

if (is(value, Column)) {
  // value's type is narrowed to Column
}
```

### Mock Driver
This API is a successor to an undefined `drizzle({} as any)` API which we've used internally in Drizzle tests and rarely recommended to external developers. 

We decided to build and expose a proper API, every `drizzle` driver now has `drizzle.mock()`:
```ts
import { drizzle } from "drizzle-orm/...";

const db = drizzle.mock();
```

you can provide schema if necessary for types
```ts
import { drizzle } from "drizzle-orm/...";
import * as schema from "./schema"

const db = drizzle.mock({ schema });
```
