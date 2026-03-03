# Drizzle \<\> Turso Database

<Prerequisites>
- Database [connection basics](/docs/connect-overview) with Drizzle
- Turso Database - [website](https://docs.turso.tech/introduction)
- Turso Database driver - [website](https://docs.turso.tech/connect/javascript) & [GitHub](https://github.com/tursodatabase/turso/tree/main/bindings/javascript)
</Prerequisites>

According to the **[official website](https://docs.turso.tech/introduction)**, 
Turso is the small database to power your big dreams in the age of AI.

#### Step 1 - Install packages
```bash
npm install drizzle-orm@beta @tursodatabase/database
```
```bash
npm install -D drizzle-kit@beta
```

#### Step 2 - Initialize the driver and make a query
```typescript
import { drizzle } from 'drizzle-orm/tursodatabase/database';

const db = drizzle('sqlite.db');

const result = await db.execute('select 1');
```

If you need to provide your existing drivers:

```typescript
import { Database } from '@tursodatabase/drivers';
import { drizzle } from 'drizzle-orm/tursodatabase/database';

const client = new Database('sqlite.db');
const db = drizzle({ client });

const result = await db.execute('select 1');
```

#### What's next?
