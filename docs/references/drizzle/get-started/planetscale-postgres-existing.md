# Get Started with Drizzle and PlanetScale Postgres in existing project

<Prerequisites>
  - **dotenv** - package for managing environment variables - [read here](https://www.npmjs.com/package/dotenv)
  - **tsx** - package for running TypeScript files - [read here](https://tsx.is/)
  - **PlanetScale Postgres** - PostgreSQL database platform - [read here](https://planetscale.com/docs/postgres)
  - **node-postgres** - package for querying your PostgreSQL database - [read here](https://node-postgres.com/)
</Prerequisites>

> **Info:** Looking for MySQL? Check out our [PlanetScale MySQL guide](/docs/get-started/planetscale-existing)

PlanetScale offers both MySQL (Vitess) and PostgreSQL databases. This guide covers connecting to PlanetScale Postgres using the standard `node-postgres` driver.

For detailed instructions on creating a PlanetScale Postgres database and obtaining credentials, see the [PlanetScale Postgres documentation](https://planetscale.com/docs/postgres/tutorials/planetscale-postgres-drizzle).

#### Step 1 - Install **node-postgres** package

#### Step 2 - Setup connection variables

Create a `.env` file in the root of your project and add your database connection variable:

```plaintext
DATABASE_URL=postgresql://{username}:{password}@{host}:{port}/postgres?sslmode=verify-full
```

> **Info:** You can obtain your connection credentials from the PlanetScale dashboard by navigating to your database, clicking **"Connect"**, and creating a **"Default role"**. See the [PlanetScale connection guide](https://planetscale.com/docs/postgres/tutorials/planetscale-postgres-drizzle#create-credentials-and-connect) for detailed steps.

#### Step 3 - Setup Drizzle config file

#### Step 4 - Introspect your database

#### Step 5 - Transfer code to your actual schema file

#### Step 6 - Connect Drizzle ORM to the database

#### Step 7 - Query the database

#### Step 8 - Run index.ts file

#### Step 9 - Update your table schema (optional)

#### Step 10 - Applying changes to the database (optional)

#### Step 11 - Query the database with a new field (optional)
