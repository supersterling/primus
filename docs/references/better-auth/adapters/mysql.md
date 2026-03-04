# MySQL

Integrate Better Auth with MySQL.

MySQL is a popular open-source relational database management system (RDBMS) that is widely used for building web applications and other types of software. It provides a flexible and scalable database solution that allows for efficient storage and retrieval of data.
Read more here: [MySQL](https://www.mysql.com/).

## Example Usage

Make sure you have MySQL installed and configured.
Then, you can connect it straight into Better Auth.

```ts
import { betterAuth } from "better-auth";
import { createPool } from "mysql2/promise";

export const auth = betterAuth({
  database: createPool({
    host: "localhost",
    user: "root",
    password: "password",
    database: "database",
    timezone: "Z", // Important to ensure consistent timezone values
  }),
});
```

  For more information, read Kysely's documentation to the
  [MySQLDialect](https://kysely-org.github.io/kysely-apidoc/classes/MysqlDialect.html).

## Schema generation & migration

The [Better Auth CLI](/docs/concepts/cli) allows you to generate or migrate
your database schema based on your Better Auth configuration and plugins.

<table>
  <thead>
    <tr className="border-b">
      <th>
          MySQL Schema Generation
      </th>

      <th>
          MySQL Schema Migration
      </th>
    </tr>
  </thead>

  <tbody>
    <tr className="h-10">
      <td>
        ✅ Supported
      </td>

      <td>
        ✅ Supported
      </td>
    </tr>
  </tbody>
</table>

```bash
    npx @better-auth/cli@latest generate
```

```bash
    pnpm dlx @better-auth/cli@latest generate
```

```bash
    yarn dlx @better-auth/cli@latest generate
```

```bash
    bun x @better-auth/cli@latest generate
```

```bash
    npx @better-auth/cli@latest migrate
```

```bash
    pnpm dlx @better-auth/cli@latest migrate
```

```bash
    yarn dlx @better-auth/cli@latest migrate
```

```bash
    bun x @better-auth/cli@latest migrate
```

## Joins (Experimental)

Database joins is useful when Better-Auth needs to fetch related data from multiple tables in a single query.
Endpoints like `/get-session`, `/get-full-organization` and many others benefit greatly from this feature,
seeing upwards of 2x to 3x performance improvements depending on database latency.

The Kysely MySQL dialect supports joins out of the box since version `1.4.0`.

To enable this feature, you need to set the `experimental.joins` option to `true` in your auth configuration.

```ts
export const auth = betterAuth({
  experimental: { joins: true }
});
```

  It's possible that you may need to run migrations after enabling this feature.

## Additional Information

MySQL is supported under the hood via the [Kysely](https://kysely.dev/) adapter, any database supported by Kysely would also be supported. ([Read more here](/docs/adapters/other-relational-databases))

If you're looking for performance improvements or tips, take a look at our guide to [performance optimizations](/docs/guides/optimizing-for-performance).
