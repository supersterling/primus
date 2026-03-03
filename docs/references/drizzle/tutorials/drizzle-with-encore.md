This tutorial demonstrates how to use **Drizzle ORM** with **Encore**, an open source backend framework with built-in infrastructure automation and observability.

<Prerequisites>
  - You should have the Encore CLI installed. You can install it with:
```bash
  # macOS
  brew install encoredev/tap/encore

  # Linux
  curl -L https://encore.dev/install.sh | bash

  # Windows
  iwr https://encore.dev/install.ps1 | iex
```

  - You should have installed Drizzle ORM and [Drizzle kit](/docs/kit-overview). You can do this by running the following command:
```bash
npm install drizzle-orm
```
```bash
npm install -D drizzle-kit
```
</Prerequisites>

## Setup Encore and Drizzle ORM

#### Create a new Encore project

You can create a new Encore project with Drizzle already configured:

```bash
encore app create my-app --example=ts/drizzle
cd my-app
```

Or if you have an existing Encore project, install Drizzle:

```bash
npm install drizzle-orm
```
```bash
npm install -D drizzle-kit
```

#### Create the database

Define your database in a `database.ts` file. Encore automatically provisions a PostgreSQL database locally using Docker and in the cloud when you deploy:

```typescript
import { SQLDatabase } from "encore.dev/storage/sqldb";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";

const db = new SQLDatabase("mydb", {
  migrations: {
    path: "migrations",
    source: "drizzle",
  },
});

export const orm = drizzle(db.connectionString, { schema });
```

Setting `source: "drizzle"` tells Encore to use Drizzle's migration format.

#### Define your schema

Create a `schema.ts` file to define your tables:

```typescript
import * as p from "drizzle-orm/pg-core";

export const users = p.pgTable("users", {
  id: p.serial().primaryKey(),
  name: p.text().notNull(),
  email: p.text().unique().notNull(),
  createdAt: p.timestamp().defaultNow().notNull(),
});
```

#### Setup Drizzle config

Create a `drizzle.config.ts` file:

```typescript
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "migrations",
  schema: "schema.ts",
  dialect: "postgresql",
});
```

#### Generate migrations

Run Drizzle Kit to generate migrations from your schema:

```bash
drizzle-kit generate
```

This creates migration files in the `migrations` folder.

#### Create an API endpoint

Use Drizzle in your Encore endpoints:

```typescript
import { api } from "encore.dev/api";
import { orm } from "./database";
import { users } from "./schema";
import { eq } from "drizzle-orm";

interface User {
  id: number;
  name: string;
  email: string;
}

export const list = api(
  { expose: true, method: "GET", path: "/users" },
  async (): Promise<{ users: User[] }> => {
    const result = await orm.select().from(users);
    return { users: result };
  }
);

export const create = api(
  { expose: true, method: "POST", path: "/users" },
  async (req: { name: string; email: string }): Promise<User> => {
    const [user] = await orm
      .insert(users)
      .values({ name: req.name, email: req.email })
      .returning();
    return user;
  }
);
```

#### Run your application

Start your Encore app:

```bash
encore run
```

Encore automatically applies migrations when starting. Open [localhost:9400](http://localhost:9400) to see the local dashboard with API docs, database explorer, and tracing.

> **Info:** Migrations are automatically applied when you run your Encore application. You don't need to run `drizzle-kit migrate` manually.

## Learn more

- [Encore Documentation](https://encore.dev/docs)
- [Encore Drizzle Guide](https://encore.dev/docs/ts/develop/orms/drizzle)
- [Drizzle ORM Documentation](/docs/overview)
