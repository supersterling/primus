# Get Started with Drizzle and Turso Cloud

<Prerequisites>  
  - **dotenv** - package for managing environment variables - [read here](https://www.npmjs.com/package/dotenv)
  - **tsx** - package for running TypeScript files - [read here](https://tsx.is/)
  - **turso** - SQLite for Production - [read here](https://turso.tech/)
  - **libsql** - a fork of SQLite optimized for low query latency, making it suitable for global applications - [read here](https://docs.turso.tech/libsql)
</Prerequisites>

#### Step 1 - Install required packages

#### Step 2 - Setup connection variables

Create a `.env` file in the root of your project and add you Turso database url and auth token:

```plaintext
TURSO_DATABASE_URL=
TURSO_AUTH_TOKEN=
```

> **Info:** If you don't know your `TURSO_DATABASE_URL` and `TURSO_AUTH_TOKEN` values, you can refer to the LibSQL Driver SDK tutorial.
> Check it out [here](https://docs.turso.tech/sdk/ts/quickstart), then return with all the values generated and added to the `.env` file

#### Step 3 - Connect Drizzle ORM to the database
Drizzle has native support for all @libsql/client driver variations:

<br/>

Create a `index.ts` file in the `src` directory and initialize the connection:

```typescript
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/libsql';

// You can specify any property from the libsql connection options
const db = drizzle({ 
  connection: { 
    url: process.env.TURSO_DATABASE_URL!, 
    authToken: process.env.TURSO_AUTH_TOKEN!
  }
});
```

If you need to provide your existing driver:
```typescript
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';

const client = createClient({ 
  url: process.env.TURSO_DATABASE_URL!, 
  authToken: process.env.TURSO_AUTH_TOKEN!
});
const db = drizzle({ client });
```

#### Step 4 - Create a table

#### Step 5 - Setup Drizzle config file

**Drizzle config** - a configuration file that is used by [Drizzle Kit](/docs/kit-overview) and contains all the information about your database connection, migration folder and schema files.

Create a `drizzle.config.ts` file in the root of your project and add the following content:

```typescript
import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema.ts',
  dialect: 'turso',
  dbCredentials: {
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
  },
});
```

#### Step 6 - Applying changes to the database

#### Step 7 - Seed and Query the database

#### Step 8 - Run index.ts file
