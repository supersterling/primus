<Prerequisites>
- Get started with [PostgreSQL](/docs/get-started-postgresql), [MySQL](/docs/get-started-mysql) or [SQLite](/docs/get-started-sqlite)
- Get familiar with [One-to-many Relation](/docs/relations#one-to-many)
- Get familiar with [Drizzle Seed](/docs/seed-overview)
</Prerequisites>

```ts
users: {
    count: 2,
    with: {
        posts: 3,
    },
},
```
> **Info:** Using `with` implies tables to have a one-to-many relationship.
> Therefore, if `one` user has `many` posts, you can use `with` as follows:

## Example 1
```ts
import { users, posts } from './schema.ts';

async function main() {
    const db = drizzle(...);
    await seed(db, { users, posts }).refine(() => ({
        users: {
            count: 2,
            with: {
                posts: 3,
            },
        },
    }));
}
main();

```

```ts
import { serial, pgTable, integer, text } from "drizzle-orm/pg-core";

export const users = pgTable('users', {
	id: serial('id').primaryKey(),
	name: text('name'),
});

export const posts = pgTable('posts', {
	id: serial('id').primaryKey(),
	content: text('content'),
	authorId: integer('author_id').notNull(),
});
```

Running the seeding script above will cause an error.

```
Error: "posts" table doesn't have a reference to "users" table or
you didn't include your one-to-many relation in the seed function schema.
You can't specify "posts" as parameter in users.with object.
```

You will have several options to resolve an error:
- You can add reference to the `authorId` column in `posts` table in your schema
```ts
import { users, posts } from './schema.ts';

async function main() {
    const db = drizzle(...);
    await seed(db, { users, posts }).refine(() => ({
        users: {
            count: 2,
            with: {
                posts: 3,
            },
        },
    }));
}
main();

// Running the seeding script above will fill you database with values shown below
```

```mdx
`users`

| id |   name   |   
| -- | -------- |
|  1 | 'Melanny' | 
|  2 | 'Elvera' |

`posts`

| id |        content        | author_id |   
| -- | --------------------- | --------- |
|  1 | 'tf02gUXb0LZIdEg6SL'  |     2     |
|  2 | 'j15YdT7Sma'          |     2     |
|  3 | 'LwwvWtLLAZzIpk'      |     1     |
|  4 | 'mgyUnBKSrQw'         |     1     |
|  5 | 'CjAJByKIqilHcPjkvEw' |     2     |
|  6 | 'S5g0NzXs'            |     1     |
```
```ts
import { serial, pgTable, integer, text } from "drizzle-orm/pg-core";

export const users = pgTable('users', {
	id: serial('id').primaryKey(),
	name: text('name'),
});

export const posts = pgTable('posts', {
	id: serial('id').primaryKey(),
	content: text('content'),
	authorId: integer('author_id').notNull().references(() => users.id),
});
```

- You can add one-to-many relation to your schema and include it in the seed function schema
```ts
import { users, posts, postsRelations } from './schema.ts';

async function main() {
    const db = drizzle(...);
    await seed(db, { users, posts, postsRelations }).refine(() => ({
        users: {
            count: 2,
            with: {
                posts: 3,
            },
        },
    }));
}
main();

// Running the seeding script above will fill you database with values shown below
```

```mdx
`users`

| id |   name   |   
| -- | -------- |
|  1 | 'Melanny' | 
|  2 | 'Elvera' |

`posts`

| id |        content        | author_id |   
| -- | --------------------- | --------- |
|  1 | 'tf02gUXb0LZIdEg6SL'  |     2     |
|  2 | 'j15YdT7Sma'          |     2     |
|  3 | 'LwwvWtLLAZzIpk'      |     1     |
|  4 | 'mgyUnBKSrQw'         |     1     |
|  5 | 'CjAJByKIqilHcPjkvEw' |     2     |
|  6 | 'S5g0NzXs'            |     1     |
```

```ts
import { serial, pgTable, integer, text } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const users = pgTable('users', {
	id: serial('id').primaryKey(),
	name: text('name'),
});

export const posts = pgTable('posts', {
	id: serial('id').primaryKey(),
	content: text('content'),
	authorId: integer('author_id').notNull(),
});

export const postsRelations = relations(posts, ({ one }) => ({
	author: one(users, {
		fields: [posts.authorId],
		references: [users.id],
	}),
}));
```

## Example 2
```ts
import { users, posts } from './schema.ts';

async function main() {
    const db = drizzle(...);
    await seed(db, { users, posts }).refine(() => ({
        posts: {
            count: 2,
            with: {
                users: 3,
            },
        },
    }));
}
main();

```

```ts
import { serial, pgTable, integer, text } from "drizzle-orm/pg-core";

export const users = pgTable('users', {
	id: serial('id').primaryKey(),
	name: text('name'),
});

export const posts = pgTable('posts', {
	id: serial('id').primaryKey(),
	content: text('content'),
	authorId: integer('author_id').notNull().references(() => users.id),
});
```

Running the seeding script above will cause an error.

```
Error: "posts" table doesn't have a reference to "users" table or
you didn't include your one-to-many relation in the seed function schema.
You can't specify "posts" as parameter in users.with object.
```

```ts
.
.
.
export const posts = pgTable('posts', {
	id: serial('id').primaryKey(),
	content: text('content'),
	authorId: integer('author_id').notNull().references(() => users.id),
});
```
```ts
posts: {
    count: 2,
    with: {
        users: 3,
    },
},
```
> **Info:** You have a `posts` table referencing a `users` table in your schema,
> or in other words, you have one-to-many relation where `one` user can have `many` posts.
> However, in your seeding script, you're attempting to generate 3 (`many`) users for `one` post.

To resolve the error, you can modify your seeding script as follows:
```ts
import { users, posts, postsRelations } from './schema.ts';

async function main() {
    const db = drizzle(...);
    await seed(db, { users, posts, postsRelations }).refine(() => ({
        users: {
            count: 2,
            with: {
                posts: 3,
            },
        },
    }));
}
main();

// Running the seeding script above will fill you database with values shown below
```

```mdx
`users`

| id |   name   |   
| -- | -------- |
|  1 | 'Melanny' | 
|  2 | 'Elvera' |

`posts`

| id |        content        | author_id |   
| -- | --------------------- | --------- |
|  1 | 'tf02gUXb0LZIdEg6SL'  |     2     |
|  2 | 'j15YdT7Sma'          |     2     |
|  3 | 'LwwvWtLLAZzIpk'      |     1     |
|  4 | 'mgyUnBKSrQw'         |     1     |
|  5 | 'CjAJByKIqilHcPjkvEw' |     2     |
|  6 | 'S5g0NzXs'            |     1     |
```

## Example 3

```ts
import { users } from './schema.ts';

async function main() {
    const db = drizzle(...);
    await seed(db, { users }).refine(() => ({
        users: {
            count: 2,
            with: {
                users: 3,
            },
        },
    }));
}
main();

```

```ts
import { serial, pgTable, integer, text } from "drizzle-orm/pg-core";
import type { AnyPgColumn } from "drizzle-orm/pg-core";

export const users = pgTable('users', {
	id: serial('id').primaryKey(),
	name: text('name'),
    reportsTo: integer('reports_to').references((): AnyPgColumn => users.id),
});
```

Running the seeding script above will cause an error.

```
Error: "users" table has self reference.
You can't specify "users" as parameter in users.with object.
```

```ts
.
.
.
export const users = pgTable('users', {
	id: serial('id').primaryKey(),
	name: text('name'),
    reportsTo: integer('reports_to').references((): AnyPgColumn => users.id),
});
```
```ts
users: {
    count: 2,
    with: {
        users: 3,
    },
},
```
> **Info:** You have a `users` table referencing a `users` table in your schema,
> or in other words, you have one-to-one relation where `one` user can have only `one` user.
> However, in your seeding script, you're attempting to generate 3 (`many`) users for `one` user, which is impossible.
