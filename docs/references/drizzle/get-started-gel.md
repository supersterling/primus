# Drizzle \<\> Gel
<Prerequisites>
- Database [connection basics](/docs/connect-overview) with Drizzle
- gel-js [basics](https://github.com/geldata/gel-js)
</Prerequisites>

Drizzle has native support for Gel connections with the `gel-js` client.

#### Step 1 - Install packages
```bash
npm install drizzle-orm gel
```
```bash
npm install -D drizzle-kit
```

#### Step 2 - Initialize the driver and make a query
```typescript
// Make sure to install the 'gel' package 
import { drizzle } from 'drizzle-orm/gel';

const db = drizzle(process.env.DATABASE_URL);
 
const result = await db.execute('select 1');
```
```typescript
// Make sure to install the 'gel' package
import { drizzle } from "drizzle-orm/gel";

// You can specify any property from the gel connection options
const db = drizzle({
  connection: {
    dsn: process.env.DATABASE_URL,
    tlsSecurity: "default",
  },
});

const result = await db.execute("select 1");
```

If you need to provide your existing driver:

```typescript
// Make sure to install the 'gel' package 
import { drizzle } from "drizzle-orm/gel";
import { createClient } from "gel";

const gelClient = createClient();
const db = drizzle({ client: gelClient });

const result = await db.execute('select 1');
```

#### What's next?
