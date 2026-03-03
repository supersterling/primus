# Drizzle \<\> PGlite

<Prerequisites>
- Database [connection basics](/docs/connect-overview) with Drizzle
- ElectricSQL - [website](https://electric-sql.com/)
- PgLite driver - [docs](https://pglite.dev/) & [GitHub](https://github.com/electric-sql/pglite)
</Prerequisites>

According to the **[official repo](https://github.com/electric-sql/pglite)**, PGlite is a WASM Postgres build packaged into a TypeScript client library that enables you to run Postgres in the browser, Node.js and Bun, with no need to install any other dependencies. It is only 2.6mb gzipped.

It can be used as an ephemeral in-memory database, or with persistence either to the file system (Node/Bun) or indexedDB (Browser).

Unlike previous "Postgres in the browser" projects, PGlite does not use a Linux virtual machine - it is simply Postgres in WASM.

#### Step 1 - Install packages

```bash
npm install drizzle-orm @electric-sql/pglite
```
```bash
npm install -D drizzle-kit
```

#### Step 2 - Initialize the driver and make a query
```typescript
import { drizzle } from 'drizzle-orm/pglite';

const db = drizzle();

await db.select().from(...);
```
```typescript
import { drizzle } from 'drizzle-orm/pglite';

const db = drizzle('path-to-dir');

await db.select().from(...);
```
```typescript
import { drizzle } from 'drizzle-orm/pglite';

// connection is a native PGLite configuration
const db = drizzle({ connection: { dataDir: 'path-to-dir' }});

await db.select().from(...);
```

If you need to provide your existing driver:

```typescript
import { PGlite } from '@electric-sql/pglite';
import { drizzle } from 'drizzle-orm/pglite';

// In-memory Postgres
const client = new PGlite();
const db = drizzle({ client });

await db.select().from(users);
```

#### What's next?
