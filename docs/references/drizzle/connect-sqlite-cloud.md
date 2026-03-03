# Drizzle \<\> SQLite Cloud
<Prerequisites>
- Database [connection basics](/docs/connect-overview) with Drizzle
- **SQLite Cloud database** - [docs](https://docs.sqlitecloud.io/docs/overview)
- **SQLite Cloud driver** - [docs](https://docs.sqlitecloud.io/docs/sdk-js-introduction) & [GitHub](https://github.com/sqlitecloud/sqlitecloud-js)
</Prerequisites>

According to the **[official website](https://docs.sqlitecloud.io/docs/overview)**, SQLite Clouds is a managed, distributed relational database system built on top of the SQLite database engine. 

#### Step 1 - Install packages
```bash
npm install drizzle-orm@beta @sqlitecloud/drivers
```
```bash
npm install -D drizzle-kit@beta
```

#### Step 2 - Initialize the driver and make a query
```typescript
import { drizzle } from 'drizzle-orm/sqlite-cloud';

const db = drizzle(process.env.SQLITE_CLOUD_CONNECTION_STRING);

const result = await db.execute('select 1');
```

If you need to provide your existing drivers:

```typescript
import { Database } from '@sqlitecloud/drivers';
import { drizzle } from 'drizzle-orm/sqlite-cloud';

const client = new Database(process.env.SQLITE_CLOUD_CONNECTION_STRING!);
const db = drizzle({ client });

const result = await db.execute('select 1');
```

#### What's next?
