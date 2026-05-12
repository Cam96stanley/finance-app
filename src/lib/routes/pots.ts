import { getAuth } from "@clerk/hono";
import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { db } from "../db";
import { pots } from "../db/schema";

const app = new Hono();

app.get("/", async (c) => {
  const auth = getAuth(c);

  if (!auth?.userId) return c.json({ error: "Unauthorized" }, 401);

  const data = await db.select().from(pots).where(eq(pots.userId, auth.userId));

  return c.json(data);
});

export default app;
