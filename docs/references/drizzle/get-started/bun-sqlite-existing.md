# Get Started with Drizzle and Bun:SQLite in existing project

<Prerequisites>  
  - **dotenv** - package for managing environment variables - [read here](https://www.npmjs.com/package/dotenv)
  - **tsx** - package for running TypeScript files - [read here](https://tsx.is/)
  - **bun** - javaScript all-in-one toolkit - [read here](https://bun.sh/)
  - **bun:sqlite** - native implementation of a high-performance SQLite3 driver - [read here](https://bun.sh/docs/api/sqlite)
</Prerequisites>

#### Step 1 - Install required packages

```bash
npm install drizzle-orm dotenv
```
```bash
npm install -D drizzle-kit tsx @types/bun
```

#### Step 2 - Setup connection variables

```plaintext
DB_FILE_NAME=mydb.sqlite
```
> **Info:** For example, if you have an SQLite database file in the root of your project, you can use this example:

#### Step 3 - Setup Drizzle config file

#### Step 4 - Introspect your database

#### Step 5 - Transfer code to your actual schema file

#### Step 6 - Connect Drizzle ORM to the database

#### Step 7 - Query the database

#### Step 8 - Run index.ts file

To run a script with `bun`, use the following command:
```bash
bun src/index.ts
```

#### Step 9 - Update your table schema (optional)

#### Step 9 - Applying changes to the database (optional)

#### Step 10 - Query the database with a new field (optional)
