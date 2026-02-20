const rows = await db.select({ id: users.id, name: users.name }).from(users)
const inserted = await db.insert(users).values({ name: "test" }).returning({ id: users.id })
