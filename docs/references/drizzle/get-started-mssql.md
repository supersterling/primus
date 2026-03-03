# Drizzle \<\> MSSQL

> **Error:** This page explains concepts available on drizzle versions `1.0.0-beta.2` and higher.

<br/>

<Prerequisites>
- Database [connection basics](/docs/connect-overview) with Drizzle
- node-mssql [basics](https://github.com/tediousjs/node-mssql)
</Prerequisites>

Drizzle has native support for MSSQL connections with the `mssql` driver.

#### Step 1 - Install packages
```bash
npm install drizzle-orm@beta mssql
```
```bash
npm install -D drizzle-kit@beta
```

#### Step 2 - Initialize the driver and make a query
```typescript
// Make sure to install the 'mssql' package 
import { drizzle } from 'drizzle-orm/node-mssql';

const db = drizzle(process.env.DATABASE_URL);
 
const result = await db.execute('select 1');
```
```typescript
// Make sure to install the 'pg' package 
import { drizzle } from 'drizzle-orm/node-mssql';

// You can specify any property from the mssql connection options
const db = drizzle({ 
  connection: { 
    connectionString: process.env.DATABASE_URL,
    ssl: true
  }
});
 
const result = await db.execute('select 1');
```

```ts
const awaitedClient = await db.$client;
const response = awaitedClient.query...
```
> **Warning:** As long as the `node-mssql` driver requires `await` on `Pool` initialization, we need to `await` it before each request - unless you are providing your own Pool instance to Drizzle. In that case, when you want to access `db.$client`, you first need to `await` it, and then use it

If you need to provide your existing driver:

```typescript
// Make sure to install the 'mssql' package 
import { drizzle } from "drizzle-orm/node-mssql";
import type { ConnectionPool } from 'mssql';

const pool = await mssql.connect(connectionString);
const db = drizzle({ client: pool });
 
const result = await db.execute('select 1');
```

#### What's next?
