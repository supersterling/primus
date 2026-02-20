const inserted = await db.insert(users).values({ name: "test" }).returning()
