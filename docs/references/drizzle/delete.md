# SQL Delete
You can delete all rows in the table:
```typescript
await db.delete(users);
```
And you can delete with filters and conditions:
```typescript
await db.delete(users).where(eq(users.name, 'Dan'));
```

### Limit

Use `.limit()` to add `limit` clause to the query - for example:
```typescript
await db.delete(users).where(eq(users.name, 'Dan')).limit(2);
```
```sql
delete from "users" where "users"."name" = $1 limit $2;
```

### Order By
Use `.orderBy()` to add `order by` clause to the query, sorting the results by the specified fields:
```typescript
import { asc, desc } from 'drizzle-orm';

await db.delete(users).where(eq(users.name, 'Dan')).orderBy(users.name);
await db.delete(users).where(eq(users.name, 'Dan')).orderBy(desc(users.name));

// order by multiple fields
await db.delete(users).where(eq(users.name, 'Dan')).orderBy(users.name, users.name2);
await db.delete(users).where(eq(users.name, 'Dan')).orderBy(asc(users.name), desc(users.name2));
```
```sql
delete from "users" where "users"."name" = $1 order by "name";
delete from "users" where "users"."name" = $1 order by "name" desc;

delete from "users" where "users"."name" = $1 order by "name", "name2";
delete from "users" where "users"."name" = $1 order by "name" asc, "name2" desc;
```

### Returning
You can delete a row and get it back in PostgreSQL and SQLite:
```typescript
const deletedUser = await db.delete(users)
  .where(eq(users.name, 'Dan'))
  .returning();

// partial return
const deletedUserIds: { deletedId: number }[] = await db.delete(users)
  .where(eq(users.name, 'Dan'))
  .returning({ deletedId: users.id });
```

## Output
You can insert a row and get it back in PostgreSQL and SQLite like such:
```typescript
await db.insert(users).values({ name: "Dan" }).output();

// partial return
await db.insert(users).values({ name: "Partial Dan" }).output({ insertedId: users.id });
```

## WITH DELETE clause

> **Info:** Check how to use WITH statement with [select](/docs/select#with-clause), [insert](/docs/insert#with-insert-clause), [update](/docs/update#with-update-clause)

Using the `with` clause can help you simplify complex queries by splitting them into smaller subqueries called common table expressions (CTEs):
```typescript
const averageAmount = db.$with('average_amount').as(
  db.select({ value: sql`avg(${orders.amount})`.as('value') }).from(orders)
);

const result = await db
	.with(averageAmount)
	.delete(orders)
	.where(gt(orders.amount, sql`(select * from ${averageAmount})`))
	.returning({
		id: orders.id
	});
```
```sql
with "average_amount" as (select avg("amount") as "value" from "orders") 
delete from "orders" 
where "orders"."amount" > (select * from "average_amount") 
returning "id"
```
