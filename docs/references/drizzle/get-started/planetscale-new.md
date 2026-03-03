# Get Started with Drizzle and PlanetScale

<Prerequisites>  
  - **dotenv** - package for managing environment variables - [read here](https://www.npmjs.com/package/dotenv)
  - **tsx** - package for running TypeScript files - [read here](https://tsx.is)
  - **PlanetScale** - MySQL database platform - [read here](https://planetscale.com)
  - **database-js** - PlanetScale serverless driver - [read here](https://github.com/planetscale/database-js)
</Prerequisites>

> **Info:** Looking for PostgreSQL? Check out our [PlanetScale Postgres guide](/docs/get-started/planetscale-postgres-new)

> **Info:** For this tutorial, we will use the `database-js` driver to make **HTTP** calls to the PlanetScale database. If you need to
> connect to PlanetScale through TCP, you can refer to our [MySQL Get Started](/docs/get-started/mysql-new) page

#### Step 1 - Install **@planetscale/database** package

#### Step 2 - Setup connection variables

Create a `.env` file in the root of your project and add your database connection variable:

```plaintext
DATABASE_HOST=
DATABASE_USERNAME=
DATABASE_PASSWORD=
```

> **Info:** To get all the necessary environment variables to connect through the `database-js` driver, you can check the [PlanetScale docs](https://planetscale.com/docs/tutorials/planetscale-serverless-driver-node-example#use-the-sample-repository)

#### Step 3 - Connect Drizzle ORM to the database

#### Step 4 - Create a table

#### Step 5 - Setup Drizzle config file

#### Step 6 - Applying changes to the database

#### Step 7 - Seed and Query the database

#### Step 8 - Run index.ts file
