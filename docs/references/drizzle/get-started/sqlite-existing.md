# Get Started with Drizzle and SQLite in existing project

<Prerequisites>  
  - **dotenv** - package for managing environment variables - [read here](https://www.npmjs.com/package/dotenv)
  - **tsx** - package for running TypeScript files - [read here](https://tsx.is/)
  - **libsql** - a fork of SQLite optimized for low query latency, making it suitable for global applications - [read here](https://docs.turso.tech/libsql)
</Prerequisites>

#### Step 1 - Install required packages

#### Step 2 - Setup connection variables

```plaintext
DB_FILE_NAME=file:local.db
```
> **Info:** For example, if you want to create an SQLite database file in the root of your project for testing purposes, you need to use `file:` before the actual filename, as this is the format required by `LibSQL`, like this:
> You can check the **[LibSQL docs](https://docs.turso.tech/sdk/ts/reference#local-development)** for more info.

#### Step 3 - Setup Drizzle config file

#### Step 4 - Introspect your database

#### Step 5 - Transfer code to your actual schema file

#### Step 6 - Connect Drizzle ORM to the database

#### Step 7 - Query the database

#### Step 8 - Run index.ts file

#### Step 9 - Update your table schema (optional)

#### Step 9 - Applying changes to the database (optional)

#### Step 10 - Query the database with a new field (optional)
