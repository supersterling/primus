# Get Started with Drizzle and Vercel Postgres in existing project

<Prerequisites>
  - **dotenv** - package for managing environment variables - [read here](https://www.npmjs.com/package/dotenv)
  - **tsx** - package for running TypeScript files - [read here](https://tsx.is/)
  - **Vercel Postgres database** - [read here](https://vercel.com/docs/storage/vercel-postgres)
  - **Vercel Postgres driver** - [read here](https://vercel.com/docs/storage/vercel-postgres/sdk) & [GitHub](https://github.com/vercel/storage/tree/main/packages/postgres)
</Prerequisites>

#### Step 1 - Install required package

#### Step 2 - Setup connection variables

> **Info:** It's important to name the variable `POSTGRES_URL` for Vercel Postgres.
> In the Vercel Postgres storage tab, you can find the `.env.local` tab and copy the `POSTGRES_URL` variable

#### Step 3 - Setup Drizzle config file

#### Step 4 - Introspect your database

#### Step 5 - Transfer code to your actual schema file

#### Step 6 - Connect Drizzle ORM to the database

#### Step 7 - Query the database

```typescript
import 'dotenv/config';
import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { usersTable } from './db/schema';

async function main() {
  const db = drizzle();

  const user: typeof usersTable.$inferInsert = {
    name: 'John',
    age: 30,
    email: 'john@example.com',
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

#### Step 8 - Run index.ts file

#### Step 9 - Update your table schema (optional)

#### Step 10 - Applying changes to the database (optional)

#### Step 11 - Query the database with a new field (optional)

```typescript
import 'dotenv/config';
import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { usersTable } from './db/schema';

async function main() {
  const db = drizzle();

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
