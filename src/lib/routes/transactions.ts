import { getAuth } from "@clerk/hono";
import { zValidator } from "@hono/zod-validator";
import { desc, eq } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { Hono } from "hono";
import { z } from "zod";
import { db } from "../db";
import { transactions } from "../db/schema";

const inserTransactionSchema = createInsertSchema(transactions, {
  amount: z.number().positive(),
  type: z.enum(["income", "expense"]),
  counterParty: z.string().min(1).max(100),
  date: z.coerce.date(),
}).omit({ id: true });

const app = new Hono();

app.post("/", zValidator("json", inserTransactionSchema), async (c) => {
  const auth = getAuth(c);

  if (!auth?.userId) return c.json({ error: "Unauthorized" }, 401);

  const body = c.req.valid("json");

  const [transaction] = await db
    .insert(transactions)
    .values({
      ...body,
      userId: auth.userId,
      date: new Date(body.date),
    })
    .returning();

  return c.json(transaction, 201);
});

app.get("/", async (c) => {
  const auth = getAuth(c);

  if (!auth?.userId) return c.json({ error: "Unauthorized" }, 401);

  const data = await db
    .select({
      id: transactions.id,
      counterParty: transactions.counterParty,
      amount: transactions.amount,
      date: transactions.date,
      type: transactions.type,
      categoryId: transactions.categoryId,
    })
    .from(transactions)
    .where(eq(transactions.userId, auth.userId))
    .orderBy(desc(transactions.date));

  return c.json(data);
});

export default app;
