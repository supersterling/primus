# Drizzle \<\> AWS Data API Postgres

<Prerequisites>
- Database [connection basics](/docs/connect-overview) with Drizzle
- AWS Data API - [website](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/data-api.html)
- AWS SDK - [website](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/Package/-aws-sdk-client-rds-data/)
</Prerequisites>

#### Step 1 - Install packages
```bash
npm install drizzle-orm @aws-sdk/client-rds-data
```
```bash
npm install -D drizzle-kit
```

#### Step 2 - Initialize the driver and make a query
```typescript
import { drizzle } from 'drizzle-orm/aws-data-api/pg';

// These three properties are required. You can also specify
// any property from the RDSDataClient type inside the connection object.
const db = drizzle({ connection: {
  database: process.env['DATABASE']!,
  secretArn: process.env['SECRET_ARN']!,
  resourceArn: process.env['RESOURCE_ARN']!,
}});

await db.select().from(...);
```

If you need to provide your existing driver:

```typescript
import { drizzle } from 'drizzle-orm/aws-data-api/pg';
import { RDSDataClient } from '@aws-sdk/client-rds-data';

const rdsClient = new RDSDataClient({ region: 'us-east-1' });

const db = drizzle(rdsClient, {
  database: process.env['DATABASE']!,
  secretArn: process.env['SECRET_ARN']!,
  resourceArn: process.env['RESOURCE_ARN']!,
});

await db.select().from(...);
```

#### What's next?
