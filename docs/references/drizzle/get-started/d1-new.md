# Get Started with Drizzle and D1

<Prerequisites>  
  - **dotenv** - package for managing environment variables - [read here](https://www.npmjs.com/package/dotenv)
  - **tsx** - package for running TypeScript files - [read here](https://tsx.is/)
  - **Cloudflare D1** - Serverless SQL database to query from your Workers and Pages projects - [read here](https://developers.cloudflare.com/d1/)
  - **wrangler** - Cloudflare Developer Platform command-line interface - [read here](https://developers.cloudflare.com/workers/wrangler)
</Prerequisites>

#### Step 1 - Install required packages

#### Step 2 - Setup wrangler.toml

You would need to have a `wrangler.toml` file for D1 database and will look something like this:
```toml
name = "YOUR PROJECT NAME"
main = "src/index.ts"
compatibility_date = "2022-11-07"
node_compat = true

[[ d1_databases ]]
binding = "DB"
database_name = "YOUR DB NAME"
database_id = "YOUR DB ID"
migrations_dir = "drizzle"
```

#### Step 3 - Connect Drizzle ORM to the database

```typescript
import { drizzle } from 'drizzle-orm/d1';

export interface Env {
  <BINDING_NAME>: D1Database;
}
export default {
  async fetch(request: Request, env: Env) {
    const db = drizzle(env.<BINDING_NAME>);
  },
};
```

#### Step 4 - Generate wrangler types 

<Npx>
wrangler types
</Npx>

> **Info:** The output of this command will be a `worker-configuration.d.ts` file.

#### Step 5 - Create a table

#### Step 6 - Setup Drizzle config file

**Drizzle config** - a configuration file that is used by [Drizzle Kit](/docs/kit-overview) and contains all the information about your database connection, migration folder and schema files.

Create a `drizzle.config.ts` file in the root of your project and add the following content:

```typescript
import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema.ts',
  dialect: 'sqlite',
  driver: 'd1-http',
  dbCredentials: {
    accountId: process.env.CLOUDFLARE_ACCOUNT_ID!,
    databaseId: process.env.CLOUDFLARE_DATABASE_ID!,
    token: process.env.CLOUDFLARE_D1_TOKEN!,
  },
});
```
> **Info:** You can check [our tutorial](/docs/guides/d1-http-with-drizzle-kit) on how to get env variables from CloudFlare

#### Step 7 - Applying changes to the database

#### Step 8 - Seed and Query the database

```typescript
import { drizzle } from 'drizzle-orm/d1';

export interface Env {
  <BINDING_NAME>: D1Database;
}
export default {
  async fetch(request: Request, env: Env) {
    const db = drizzle(env.<BINDING_NAME>);
    const result = await db.select().from(users).all()
    return Response.json(result);
  },
};
```

#### Step 9 - Run index.ts file
