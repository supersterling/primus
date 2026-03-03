# Get Started with Drizzle and SQLite

<Prerequisites>  
  - **dotenv** - package for managing environment variables - [read here](https://www.npmjs.com/package/dotenv)
  - **tsx** - package for running TypeScript files - [read here](https://tsx.is/)
  - **libsql** - a fork of SQLite optimized for low query latency, making it suitable for global applications - [read here](https://docs.turso.tech/libsql)
</Prerequisites>

Drizzle has native support for SQLite connections with the `libsql` and `better-sqlite3` drivers.

We will use `libsql` for this get started example. But if you want to find more ways to connect to SQLite check
our [SQLite Connection](/docs/get-started-sqlite) page 

#### Step 1 - Install required packages

#### Step 2 - Setup connection variables

```plaintext
DB_FILE_NAME=file:local.db
```
> **Info:** For example, if you want to create an SQLite database file in the root of your project for testing purposes, you need to use `file:` before the actual filename, as this is the format required by `LibSQL`, like this:
> You can check the **[LibSQL docs](https://docs.turso.tech/sdk/ts/reference#local-development)** for more info.

#### Step 3 - Connect Drizzle ORM to the database

#### Step 4 - Create a table

#### Step 5 - Setup Drizzle config file

#### Step 6 - Applying changes to the database

#### Step 7 - Seed and Query the database

#### Step 8 - Run index.ts file
