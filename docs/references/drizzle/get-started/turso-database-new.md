# Get Started with Drizzle and Turso Database

<Prerequisites>
  - **dotenv** - package for managing environment variables - [read here](https://www.npmjs.com/package/dotenv)
  - **tsx** - package for running TypeScript files - [read here](https://tsx.is/)
  - Turso Database - [website](https://docs.turso.tech/introduction)
  - Turso Database driver - [website](https://docs.turso.tech/connect/javascript) & [GitHub](https://github.com/tursodatabase/turso/tree/main/bindings/javascript)
</Prerequisites>

#### Step 1 - Install required package
```bash
npm install drizzle-orm@beta @tursodatabase/database dotenv
```
```bash
npm install -D drizzle-kit@beta tsx
```

#### Step 2 - Setup connection variables

```plaintext
DB_FILE_NAME=mydb.sqlite
```
> **Info:** For example, if you want to create an SQLite database file in the root of your project for testing purposes, you can use this example:

#### Step 3 - Connect Drizzle ORM to the database

#### Step 4 - Create a table

#### Step 5 - Setup Drizzle config file

#### Step 6 - Applying changes to the database

#### Step 7 - Seed and Query the database

```typescript
import 'dotenv/config';
import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/tursodatabase/database';
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
