# Get Started with Drizzle and Neon

<Prerequisites>
  - **dotenv** - package for managing environment variables - [read here](https://www.npmjs.com/package/dotenv)
  - **tsx** - package for running TypeScript files - [read here](https://tsx.is/)
  - **Neon** - serverless Postgres platform - [read here](https://neon.tech/docs/introduction)
</Prerequisites>

Drizzle has native support for Neon connections with the `neon-http` and `neon-websockets` drivers. These use the **neon-serverless** driver under the hood.  
  
With the `neon-http` and `neon-websockets` drivers, you can access a Neon database from serverless environments over HTTP or WebSockets instead of TCP. Querying over HTTP is faster for single, non-interactive transactions.  
  
If you need session or interactive transaction support, or a fully compatible drop-in replacement for the `pg` driver, you can use the WebSocket-based `neon-serverless` driver. You can connect to a Neon database directly using [Postgres](/docs/get-started/postgresql-new)

#### Step 1 - Install **@neondatabase/serverless** package

#### Step 2 - Setup connection variables

#### Step 3 - Connect Drizzle ORM to the database

#### Step 4 - Create a table

#### Step 5 - Setup Drizzle config file

#### Step 6 - Applying changes to the database

#### Step 7 - Seed and Query the database

#### Step 8 - Run index.ts file
