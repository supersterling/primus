# Prisma

Integrate Better Auth with Prisma.

Prisma ORM is an open-source database toolkit that simplifies database access and management in applications by providing a type-safe query builder and an intuitive data modeling interface.

Before getting started, make sure you have Prisma installed and configured. For more information, see [Prisma Documentation](https://www.prisma.io/docs/)

## Example Usage

You can use the Prisma adapter to connect to your database as follows.

```ts
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "sqlite",
  }),
});
```

  Starting from Prisma 7, the `output` path field is required. If you have configured a custom output path in your `schema.prisma` file (e.g., `output = "../src/generated/prisma"`), make sure to import the Prisma client from that location instead of `@prisma/client`. For more information, see [here](https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/generating-prisma-client#the-location-of-prisma-client).

## Schema generation & migration

The [Better Auth CLI](/docs/concepts/cli) allows you to generate or migrate
your database schema based on your Better Auth configuration and plugins.

<table>
  <thead>
    <tr className="border-b">
      <th>
          Prisma Schema Generation
      </th>

      <th>
          Prisma Schema Migration
      </th>
    </tr>
  </thead>

  <tbody>
    <tr className="h-10">
      <td>
        ✅ Supported
      </td>

      <td>
        ❌ Not Supported
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

## Joins (Experimental)

Database joins is useful when Better-Auth needs to fetch related data from multiple tables in a single query.
Endpoints like `/get-session`, `/get-full-organization` and many others benefit greatly from this feature,
seeing upwards of 2x to 3x performance improvements depending on database latency.

The Prisma adapter supports joins out of the box since version `1.4.0`.
To enable this feature, you need to set the `experimental.joins` option to `true` in your auth configuration.

```ts
export const auth = betterAuth({
  experimental: { joins: true }
});
```

  Please make sure that your Prisma schema has the necessary relations defined.
  If you do not see any relations in your Prisma schema, you can manually add them using the `@relation` directive
  or run our latest CLI version `npx @better-auth/cli@latest generate` to generate a new Prisma schema with the relations.

## Additional Information

* If you're looking for performance improvements or tips, take a look at our guide to [performance optimizations](/docs/guides/optimizing-for-performance).
* [How to use Prisma ORM with Better Auth and Next.js](https://www.prisma.io/docs/guides/betterauth-nextjs)
