import { getAuth } from "@clerk/hono";
import { desc, eq } from "drizzle-orm";
import { Hono } from "hono";
import { db } from "../db";
import { bills } from "../db/schema";

const app = new Hono();

app.get("/", async (c) => {
  const auth = getAuth(c);

  if (!auth?.userId) return c.json({ error: "Unauthorized" }, 401);

  const data = await db
    .select()
    .from(bills)
    .where(eq(bills.userId, auth.userId))
    .orderBy(desc(bills.dueDate));

  return c.json(data);
});

export default app;
