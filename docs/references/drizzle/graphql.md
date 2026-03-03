# drizzle-graphql

Create a GraphQL server from a Drizzle schema in one line, and easily enhance it with custom queries and mutations.

## Quick start

Make sure your `drizzle-orm` version is at least `0.30.9`, and update if needed:
```bash
npm install drizzle-orm@latest
```

### Apollo Server

```bash
npm install drizzle-graphql @apollo/server graphql
```

```ts
import { buildSchema } from 'drizzle-graphql';
import { drizzle } from 'drizzle-orm/...';
import client from './db';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import * as dbSchema from './schema';

const db = drizzle({ client, schema: dbSchema });

const { schema } = buildSchema(db);

const server = new ApolloServer({ schema });
const { url } = await startStandaloneServer(server);

console.log(`🚀 Server ready at ${url}`);
```
```typescript
import { integer, serial, text, pgTable } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts),
}));

export const posts = pgTable('posts', {
  id: serial('id').primaryKey(),
  content: text('content').notNull(),
  authorId: integer('author_id').notNull(),
});

export const postsRelations = relations(posts, ({ one }) => ({
  author: one(users, { fields: [posts.authorId], references: [users.id] }),
}));
```

### GraphQL Yoga

```bash
npm install drizzle-graphql graphql-yoga graphql
```

```ts
import { buildSchema } from 'drizzle-graphql';
import { drizzle } from 'drizzle-orm/...';
import { createYoga } from 'graphql-yoga';
import { createServer } from 'node:http';

import * as dbSchema from './schema';

const db = drizzle({ schema: dbSchema });

const { schema } = buildSchema(db);

const yoga = createYoga({ schema });
const server = createServer(yoga);

server.listen(4000, () => {
  console.info('Server is running on http://localhost:4000/graphql');
});
```
```typescript
import { integer, serial, text, pgTable } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts),
}));

export const posts = pgTable('posts', {
  id: serial('id').primaryKey(),
  content: text('content').notNull(),
  authorId: integer('author_id').notNull(),
});

export const postsRelations = relations(posts, ({ one }) => ({
  author: one(users, { fields: [posts.authorId], references: [users.id] }),
}));
```

## Customizing schema

> **Info:** `buildSchema()` produces schema and types using standard `graphql` SDK, so its output is compatible with any library that supports it.

If you want to customize your schema, you can use `entities` object to build your own new schema:

```ts
import { buildSchema } from 'drizzle-graphql';
import { drizzle } from 'drizzle-orm/...';
import { GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLSchema } from 'graphql';
import { createYoga } from 'graphql-yoga';
import { createServer } from 'node:http';

import * as dbSchema from './schema';

const db = drizzle({ schema: dbSchema });

const { entities } = buildSchema(db);

// You can customize which parts of queries or mutations you want
const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      // Select only wanted queries out of all generated
      users: entities.queries.users,
      customer: entities.queries.customersSingle,

      // Create a custom one
      customUsers: {
        // You can reuse and customize types from original schema
        type: new GraphQLList(new GraphQLNonNull(entities.types.UsersItem)),
        args: {
          // You can reuse inputs as well
          where: {
            type: entities.inputs.UsersFilters
          },
        },
        resolve: async (source, args, context, info) => {
          // Your custom logic goes here...
          const result = await db.select(schema.users).where()...

          return result;
        },
      },
    },
  }),
  // Same rules apply to mutations
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: entities.mutations,
  }),
  // In case you need types inside your schema
  types: [...Object.values(entities.types), ...Object.values(entities.inputs)],
});

const yoga = createYoga({
  schema,
});

const server = createServer(yoga);

server.listen(4000, () => {
  console.info('Server is running on http://localhost:4000/graphql');
})
```
```typescript
import { integer, serial, text, pgTable } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts),
}));

export const posts = pgTable('posts', {
  id: serial('id').primaryKey(),
  content: text('content').notNull(),
  authorId: integer('author_id').notNull(),
});

export const postsRelations = relations(posts, ({ one }) => ({
  author: one(users, { fields: [posts.authorId], references: [users.id] }),
}));
```
