import { getAuth } from "@hono/clerk-auth";
import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { db } from "../db";
import { transactions } from "../db/schema";

const app = new Hono();

app.get("/", async (c) => {
  const auth = getAuth(c);

  if (!auth?.userId) return c.json({ error: "Unauthorized" }, 401);

  const data = await db
    .select()
    .from(transactions)
    .where(eq(transactions.userId, auth.userId));

  const balance = data.reduce((acc, t) => {
    return t.type === "income" ? acc + t.amount : acc - t.amount;
  }, 0);

  const totalIcome = data
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  const totalExpenses = data
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  return c.json({ balance, totalIcome, totalExpenses });
});

export default app;
