# Get Started with Drizzle and Bun:SQLite

<Prerequisites>  
  - **bun** - javaScript all-in-one toolkit - [read here](https://bun.sh/)
  - **Bun SQL** - native bindings for working with PostgreSQL databases - [read here](https://bun.sh/docs/api/sql)
</Prerequisites>

> **Error:** In version `1.2.0`, Bun has issues with executing concurrent statements, which may lead to errors if you try to run several queries simultaneously.
> We've created a [github issue](https://github.com/oven-sh/bun/issues/16774) that you can track. Once it's fixed, you should no longer encounter any such errors on Bun's SQL side

#### Step 1 - Install required packages
```bash
npm install drizzle-orm
```
```bash
npm install -D drizzle-kit @types/bun
```

#### Step 2 - Setup connection variables

#### Step 3 - Connect Drizzle ORM to the database

#### Step 4 - Create a table

#### Step 5 - Setup Drizzle config file

#### Step 6 - Applying changes to the database

#### Step 7 - Seed and Query the database

#### Step 8 - Run index.ts file

To run a script with `bun`, use the following command:
```bash
bun src/index.ts
```
