# Drizzle \<\> TiDB Serverless

<Prerequisites>
- Database [connection basics](/docs/connect-overview) with Drizzle
- TiDB database - [website](https://docs.pingcap.com/)
- TiDB HTTP Driver - [website](https://docs.pingcap.com/tidbcloud/serverless-driver)
- Drizzle MySQL drivers - [docs](/docs/get-started-mysql)
</Prerequisites>

According to the **[official website](https://www.pingcap.com/tidb-serverless/)**, 
TiDB Serverless is a fully-managed, autonomous DBaaS with split-second cluster provisioning and consumption-based pricing.

> **Info:** TiDB Serverless is compatible with MySQL, so you can use [MySQL connection guide](/docs/get-started-mysql) to connect to it.

TiDB Serverless provides an [HTTP driver](https://docs.pingcap.com/tidbcloud/serverless-driver) for edge environments. It is natively supported by Drizzle ORM via `drizzle-orm/tidb-serverless` package.

#### Step 1 - Install packages
```bash
npm install drizzle-orm @tidbcloud/serverless
```
```bash
npm install -D drizzle-kit
```

#### Step 2 - Initialize the driver and make a query
```typescript
import { drizzle } from 'drizzle-orm/tidb-serverless';

const db = drizzle({ connection: { url: process.env.TIDB_URL }});

const response = await db.select().from(...)
```

If you need to provide your existing driver:
```typescript
import { connect } from '@tidbcloud/serverless';
import { drizzle } from 'drizzle-orm/tidb-serverless';

const client = connect({ url: process.env.TIDB_URL });
const db = drizzle({ client });
```

#### What's next?
