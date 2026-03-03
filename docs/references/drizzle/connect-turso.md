# Drizzle \<\> Turso Cloud

<Prerequisites>
- Database [connection basics](/docs/connect-overview) with Drizzle
- Turso Cloud - [website](https://docs.turso.tech/turso-cloud)
- Turso Cloud driver - [website](https://docs.turso.tech/sdk/ts/reference) & [GitHub](https://github.com/tursodatabase/libsql-client-ts)
</Prerequisites>

According to the **[official website](https://turso.tech/drizzle)**, 
Turso is a **[libSQL](https://github.com/libsql/libsql)** powered edge SQLite database as a service.
  
Drizzle ORM natively supports libSQL driver.
We embrace SQL dialects and dialect specific drivers and syntax and mirror most popular 
SQLite-like `all`, `get`, `values` and `run` query methods syntax. 

#### Step 1 - Install packages
```bash
npm install drizzle-orm @libsql/client
```
```bash
npm install -D drizzle-kit
```

#### Step 2 - Initialize the driver
Drizzle has native support for all `@libsql/client` driver variations:

<br />

If you need to provide your existing driver:

```typescript
import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';

const client = createClient({ 
  url: process.env.DATABASE_URL,
  authToken: process.env.DATABASE_AUTH_TOKEN
});

const db = drizzle({ client });

const result = await db.select().from(users).all()
```
```typescript
import { drizzle } from 'drizzle-orm/libsql/web';
import { createClient } from '@libsql/client/web';

const client = createClient({ 
  url: process.env.DATABASE_URL,
  authToken: process.env.DATABASE_AUTH_TOKEN
});

const db = drizzle({ client });

const result = await db.select().from(users).all()
```

#### Step 3 - make a query

```ts
import { drizzle } from 'drizzle-orm/libsql';
import * as s from 'drizzle-orm/sqlite-core';

const db = drizzle({ connection: {
  url: process.env.DATABASE_URL, 
  authToken: process.env.DATABASE_AUTH_TOKEN 
}});

const users = s.sqliteTable("users", {
  id: s.integer(),
  name: s.text(),
})

const result = await db.select().from(users);
```

#### What's next?
