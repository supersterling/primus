# MS SQL

Integrate Better Auth with MS SQL.

Microsoft SQL Server is a relational database management system developed by Microsoft, designed for enterprise-level data storage, management, and analytics with robust security and scalability features.
Read more [here](https://en.wikipedia.org/wiki/Microsoft_SQL_Server).

## Example Usage

Make sure you have MS SQL installed and configured.
Then, you can connect it straight into Better Auth.

```ts
import { betterAuth } from "better-auth";
import { MssqlDialect } from "kysely";
import * as Tedious from 'tedious'
import * as Tarn from 'tarn'

const dialect = new MssqlDialect({
  tarn: {
    ...Tarn,
    options: {
      min: 0,
      max: 10,
    },
  },
  tedious: {
    ...Tedious,
    connectionFactory: () => new Tedious.Connection({
      authentication: {
        options: {
          password: 'password',
          userName: 'username',
        },
        type: 'default',
      },
      options: {
        database: 'some_db',
        port: 1433,
        trustServerCertificate: true,
      },
      server: 'localhost',
    }),
  },
  TYPES: {
		...Tedious.TYPES,
		DateTime: Tedious.TYPES.DateTime2,
	},
})

export const auth = betterAuth({
  database: {
    dialect,
    type: "mssql"
  }
});

```

  For more information, read Kysely's documentation to the [MssqlDialect](https://kysely-org.github.io/kysely-apidoc/classes/MssqlDialect.html).

## Schema generation & migration

The [Better Auth CLI](/docs/concepts/cli) allows you to generate or migrate
your database schema based on your Better Auth configuration and plugins.

<table>
  <thead>
    <tr className="border-b">
      <th>
          MS SQL Schema Generation
      </th>

      <th>
          MS SQL Schema Migration
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

The Kysely MS SQL dialect supports joins out of the box since version `1.4.0`.
To enable this feature, you need to set the `experimental.joins` option to `true` in your auth configuration.

```ts
export const auth = betterAuth({
  experimental: { joins: true }
});
```

  It's possible that you may need to run migrations after enabling this feature.

## Additional Information

MS SQL is supported under the hood via the [Kysely](https://kysely.dev/) adapter, any database supported by Kysely would also be supported. ([Read more here](/docs/adapters/other-relational-databases))

If you're looking for performance improvements or tips, take a look at our guide to [performance optimizations](/docs/guides/optimizing-for-performance).
