import { getAuth } from "@clerk/hono";
import { zValidator } from "@hono/zod-validator";
import { desc, eq } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { Hono } from "hono";
import { z } from "zod";
import { db } from "../db";
import { budgets, categories, transactions } from "../db/schema";

const insertBudgetSchema = createInsertSchema(budgets, {
  maxSpending: z.number().positive(),
  theme: z.enum([
    "green",
    "yellow",
    "cyan",
    "navy",
    "red",
    "purple",
    "light-purple",
    "turquoise",
    "brown",
    "magenta",
    "blue",
    "navy-grey",
    "army-green",
    "gold",
    "orange",
  ]),
  categoryId: z.string().min(1),
}).omit({ id: true, userId: true });

const app = new Hono();

app.post("/", zValidator("json", insertBudgetSchema), async (c) => {
  const auth = getAuth(c);

  if (!auth.userId) return c.json({ error: "Unauthorized" }, 401);

  const body = c.req.valid("json");

  const [budget] = await db
    .insert(budgets)
    .values({
      ...body,
      userId: auth.userId,
    })
    .returning();

  return c.json(budget, 201);
});

app.get("/", async (c) => {
  const auth = getAuth(c);

  if (!auth?.userId) return c.json({ error: "Unauthorized" }, 401);

  const budgetsData = await db
    .select({
      id: budgets.id,
      maxSpending: budgets.maxSpending,
      currentSpending: budgets.currentSpending,
      theme: budgets.theme,
      category: categories.name,
      categoryId: budgets.categoryId,
    })
    .from(budgets)
    .leftJoin(categories, eq(budgets.categoryId, categories.id))
    .where(eq(budgets.userId, auth.userId));

  const budgetsWithTransactions = await Promise.all(
    budgetsData.map(async (budget) => {
      const latestTransactions = await db
        .select({
          id: transactions.id,
          counterParty: transactions.counterParty,
          amount: transactions.amount,
          date: transactions.date,
          type: transactions.type,
        })
        .from(transactions)
        .where(eq(transactions.categoryId, budget.categoryId))
        .orderBy(desc(transactions.date))
        .limit(3);

      return {
        ...budget,
        latestTransactions,
      };
    }),
  );

  return c.json(budgetsWithTransactions);
});

export default app;
