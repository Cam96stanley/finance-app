import { zValidator } from "@hono/zod-validator";
import { createInsertSchema } from "drizzle-zod";
import { Hono } from "hono";
import { z } from "zod";
import { db } from "../db";
import { transactions } from "../db/schema";

const inserTransactionSchema = createInsertSchema(transactions, {
  amount: z.number().positive(),
  type: z.enum(["income", "expense"]),
  counterParty: z.string().min(1).max(100),
}).omit({ date: true, id: true });

const app = new Hono();

app.post("/", zValidator("json", inserTransactionSchema), async (c) => {
  const body = c.req.valid("json");

  const [transaction] = await db
    .insert(transactions)
    .values({
      ...body,
      date: new Date(),
    })
    .returning();

  return c.json(transaction, 201);
});

app.get("/", async (c) => {
  const data = await db.select().from(transactions);
  return c.json(data);
});

export default app;
