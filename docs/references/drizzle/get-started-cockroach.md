# Drizzle \<\> PostgreSQL

> **Error:** This page explains concepts available on drizzle versions `1.0.0-beta.2` and higher.

<br/>

<Prerequisites>
- Database [connection basics](/docs/connect-overview) with Drizzle
- node-postgres [basics](https://node-postgres.com/)
</Prerequisites>

Drizzle has native support for PostgreSQL connections with the `node-postgres` driver.

#### Step 1 - Install packages
```bash
npm install drizzle-orm@beta pg
```
```bash
npm install -D drizzle-kit@beta @types/pg
```

#### Step 2 - Initialize the driver and make a query
```typescript
// Make sure to install the 'pg' package 
import { drizzle } from 'drizzle-orm/cockroach';

const db = drizzle(process.env.DATABASE_URL);
 
const result = await db.execute('select 1');
```
```typescript
// Make sure to install the 'pg' package 
import { drizzle } from 'drizzle-orm/cockroach';

// You can specify any property from the node-postgres connection options
const db = drizzle({ 
  connection: { 
    connectionString: process.env.DATABASE_URL,
    ssl: true
  }
});
 
const result = await db.execute('select 1');
```

If you need to provide your existing driver:

```typescript
// Make sure to install the 'pg' package 
import { drizzle } from "drizzle-orm/cockroach";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
const db = drizzle({ client: pool });
 
const result = await db.execute('select 1');
```

#### What's next?
