# Drizzle \<\> SQLite

Drizzle has native support for SQLite connections with the `libsql` and `better-sqlite3` drivers.
  
There are a few differences between the `libsql` and `better-sqlite3` drivers that we discovered while using both and integrating them with the Drizzle ORM. For example:

At the driver level, there may not be many differences between the two, but the main one is that `libSQL` can connect to both SQLite files and `Turso` remote databases. LibSQL is a fork of SQLite that offers a bit more functionality compared to standard SQLite, such as:

- More ALTER statements are available with the `libSQL` driver, allowing you to manage your schema more easily than with just `better-sqlite3`.
- You can configure the encryption at rest feature natively.
- A large set of extensions supported by the SQLite database is also supported by `libSQL`.

## libsql
#### Step 1 - Install packages
```bash
npm install drizzle-orm @libsql/client
```
```bash
npm install -D drizzle-kit
```

#### Step 2 - Initialize the driver
Drizzle has native support for all @libsql/client driver variations:

<br/>

#### Step 3 - make a query
```typescript
import { drizzle } from 'drizzle-orm/libsql';

const db = drizzle(process.env.DATABASE_URL);
 
const result = await db.execute('select 1');
```
```typescript
import { drizzle } from 'drizzle-orm/libsql';

// You can specify any property from the libsql connection options
const db = drizzle({ connection: { url:'', authToken: '' }});
 
const result = await db.execute('select 1');
```

If you need a synchronous connection, you can use our additional connection API, 
where you specify a driver connection and pass it to the Drizzle instance.

```typescript
import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';

const client = createClient({ url: process.env.DATABASE_URL, authToken: process.env.DATABASE_AUTH_TOKEN });
const db = drizzle(client);

const result = await db.execute('select 1');
```

## better-sqlite3
#### Step 1 - Install packages
```bash
npm install drizzle-orm better-sqlite3
```
```bash
npm install -D drizzle-kit @types/better-sqlite3
```

#### Step 2 - Initialize the driver and make a query
```typescript
import { drizzle } from 'drizzle-orm/better-sqlite3';

const db = drizzle(process.env.DATABASE_URL);

const result = await db.execute('select 1');
```
```typescript
import { drizzle } from 'drizzle-orm/better-sqlite3';

// You can specify any property from the better-sqlite3 connection options
const db =  drizzle({ connection: { source: process.env.DATABASE_URL }});

const result = await db.execute('select 1');
```

If you need to provide your existing driver:
```typescript
import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';

const sqlite = new Database('sqlite.db');
const db = drizzle({ client: sqlite });

const result = await db.execute('select 1');
```

#### What's next?
