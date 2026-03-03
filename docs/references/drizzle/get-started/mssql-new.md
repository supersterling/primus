# Get Started with Drizzle and MSSQL

> **Error:** This page explains concepts available on drizzle versions `1.0.0-beta.2` and higher.

<br/>

<Prerequisites>
  - **dotenv** - package for managing environment variables - [read here](https://www.npmjs.com/package/dotenv)
  - **tsx** - package for running TypeScript files - [read here](https://tsx.is/)
  - **node-mssql** - package for querying your MSSQL database - [read here](https://github.com/tediousjs/node-mssql)
</Prerequisites>

Drizzle has native support for PostgreSQL connections with the `node-mssql` driver.

#### Step 1 - Install **mssql** package
```bash
npm install drizzle-orm@beta mssql dotenv
```
```bash
npm install -D drizzle-kit@beta tsx
```

#### Step 2 - Setup connection variables

If you don't have a PostgreSQL database yet and want to create one for testing, you can use our guide on how to set up PostgreSQL in Docker.

The PostgreSQL in Docker guide is available [here](/docs/guides/postgresql-local-setup). Go set it up, generate a database URL (explained in the guide), and come back for the next steps

#### Step 3 - Connect Drizzle ORM to the database

#### Step 4 - Create a table

#### Step 5 - Setup Drizzle config file

#### Step 6 - Applying changes to the database

#### Step 7 - Seed and Query the database

#### Step 8 - Run index.ts file
