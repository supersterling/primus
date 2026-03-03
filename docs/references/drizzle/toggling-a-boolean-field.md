<Prerequisites>
- Get started with [PostgreSQL](/docs/get-started-postgresql), [MySQL](/docs/get-started-mysql) and [SQLite](/docs/get-started-sqlite)
- [Update statement](/docs/update)
- [Filters](/docs/operators) and [not operator](/docs/operators#not)
- Boolean data type in [MySQL](/docs/column-types/mysql#boolean) and [SQLite](/docs/column-types/sqlite#boolean)
</Prerequisites>

To toggle a column value you can use `update().set()` method like below:

```tsx
import { eq, not } from 'drizzle-orm';

const db = drizzle(...);

await db
  .update(table)
  .set({
    isActive: not(table.isActive),
  })
  .where(eq(table.id, 1));
```

```sql
update "table" set "is_active" = not "is_active" where "id" = 1;
```

Please note that there is no boolean type in MySQL and SQLite.
MySQL uses tinyint(1).
SQLite uses integers 0 (false) and 1 (true).
