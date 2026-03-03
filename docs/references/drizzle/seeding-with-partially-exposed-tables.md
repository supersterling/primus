<Prerequisites>
- Get started with [PostgreSQL](/docs/get-started-postgresql), [MySQL](/docs/get-started-mysql) or [SQLite](/docs/get-started-sqlite)
- Get familiar with [Drizzle Seed](/docs/seed-overview)
</Prerequisites>

## Example 1
Let's assume you are trying to seed your database using the seeding script and schema shown below.
```ts
import { bloodPressure } from './schema.ts';

async function main() {
  const db = drizzle(...);
  await seed(db, { bloodPressure });
}
main();

```

```ts
import { serial, pgTable, integer, doublePrecision } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    id: serial("id").primaryKey(),
});

export const bloodPressure = pgTable("bloodPressure", {
	bloodPressureId: serial().primaryKey(),
	pressure: doublePrecision(),
	userId: integer().references(() => users.id).notNull(),
})
```
If the `bloodPressure` table has a not-null constraint on the `userId` column, running the seeding script will cause an error.

```
Error: Column 'userId' has not null constraint, 
and you didn't specify a table for foreign key on column 'userId' in 'bloodPressure' table.
```

> **Info:** This means we can't fill the `userId` column with Null values due to the not-null constraint on that column.
> Additionally, you didn't expose the `users` table to the `seed` function schema, so we can't generate `users.id` to populate the `userId` column with these values.

At this point, you have several options to resolve the error:
- You can remove the not-null constraint from the `userId` column;
- You can expose `users` table to `seed` function schema
```ts
await seed(db, { bloodPressure, users });
```
- You can [refine](/docs/guides/seeding-with-partially-exposed-tables#refining-the-userid-column-generator) the `userId` column generator;

## Example 2

```ts
import { bloodPressure } from './schema.ts';

async function main() {
  const db = drizzle(...);
  await seed(db, { bloodPressure });
}
main();

```

```ts
import { serial, pgTable, integer, doublePrecision } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    id: serial("id").primaryKey(),
});

export const bloodPressure = pgTable("bloodPressure", {
	bloodPressureId: serial().primaryKey(),
	pressure: doublePrecision(),
	userId: integer().references(() => users.id),
})
```

By running the seeding script above you will see a warning
```
Column 'userId' in 'bloodPressure' table will be filled with Null values
because you specified neither a table for foreign key on column 'userId' 
nor a function for 'userId' column in refinements.
```
> **Info:** This means you neither provided the `users` table to the `seed` function schema nor refined the `userId` column generator.
> As a result, the `userId` column will be filled with Null values.
Then you will have two choices:
- If you're okay with filling the `userId` column with Null values, you can ignore the warning;

- Otherwise, you can [refine](/docs/guides/seeding-with-partially-exposed-tables#refining-the-userid-column-generator) the `userId` column generator. 

## Refining the `userId` column generator
Doing so requires the `users` table to already have IDs such as 1 and 2 in the database.
```ts
import { bloodPressure } from './schema.ts';

async function main() {
  const db = drizzle(...);
  await seed(db, { bloodPressure }).refine((funcs) => ({
    bloodPressure: {
      columns: {
        userId: funcs.valuesFromArray({ values: [1, 2] })
      }
    }
  }));
}
main();

```
