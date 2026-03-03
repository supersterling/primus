# Get Started with Drizzle and PlanetScale in existing project

<Prerequisites>  
  - **dotenv** - package for managing environment variables - [read here](https://www.npmjs.com/package/dotenv)
  - **tsx** - package for running TypeScript files - [read here](https://tsx.is)
  - **PlanetScale** - MySQL database platform - [read here](https://planetscale.com)
  - **database-js** - PlanetScale serverless driver - [read here](https://github.com/planetscale/database-js)
</Prerequisites>

> **Info:** Looking for PostgreSQL? Check out our [PlanetScale Postgres guide](/docs/get-started/planetscale-postgres-existing)

> **Info:** For this tutorial, we will use the `database-js` driver to make **HTTP** calls to the PlanetScale database. If you need to
> connect to PlanetScale through TCP, you can refer to our [MySQL Get Started](/docs/get-started/mysql-new) page

#### Step 1 - Install **@planetscale/database** package

#### Step 2 - Setup connection variables

#### Step 3 - Setup Drizzle config file

#### Step 4 - Introspect your database

#### Step 5 - Transfer code to your actual schema file

#### Step 6 - Connect Drizzle ORM to the database

#### Step 7 - Query the database

#### Step 8 - Run index.ts file

#### Step 9 - Update your table schema (optional)

#### Step 10 - Applying changes to the database (optional)

#### Step 11 - Query the database with a new field (optional)

```typescript
import 'dotenv/config';
import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/planetscale-serverless';
import { usersTable } from './db/schema';

async function main() {
  const db = drizzle({ connection: {
      host: process.env.DATABASE_HOST!,
      username: process.env.DATABASE_USERNAME!,
      password: process.env.DATABASE_PASSWORD!,
    }});

  const user: typeof usersTable.$inferInsert = {
    name: 'John',
    age: 30,
    email: 'john@example.com',
    phone: '123-456-7890',
  };

  await db.insert(usersTable).values(user);
  console.log('New user created!')

  const users = await db.select().from(usersTable);
  console.log('Getting all users from the database: ', users)
  /*
  const users: {
    id: number;
    name: string;
    age: number;
    email: string;
    phone: string | null;
  }[]
  */

  await db
    .update(usersTable)
    .set({
      age: 31,
    })
    .where(eq(usersTable.email, user.email));
  console.log('User info updated!')

  await db.delete(usersTable).where(eq(usersTable.email, user.email));
  console.log('User deleted!')
}

main();
```
