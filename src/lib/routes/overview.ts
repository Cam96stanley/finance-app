import { getAuth } from "@hono/clerk-auth";
import { desc, eq } from "drizzle-orm";
import { Hono } from "hono";
import { db } from "../db";
import { budgets, categories, pots, transactions } from "../db/schema";

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
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);

  const totalExpenses = data
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  const recentTransactions = await db
    .select({
      id: transactions.id,
      counterParty: transactions.counterParty,
      amount: transactions.amount,
      date: transactions.date,
      type: transactions.type,
    })
    .from(transactions)
    .where(eq(transactions.userId, auth.userId))
    .orderBy(desc(transactions.date))
    .limit(5);

  const potsData = await db
    .select()
    .from(pots)
    .where(eq(pots.userId, auth.userId))
    .limit(4);

  const totalSaved = potsData.reduce((acc, p) => acc + p.currentAmount, 0);

  const budgetsData = await db
    .select({
      maxSpending: budgets.maxSpending,
      currentSpending: budgets.currentSpending,
      theme: budgets.theme,
      category: categories.name,
    })
    .from(budgets)
    .leftJoin(categories, eq(budgets.categoryId, categories.id))
    .where(eq(budgets.userId, auth.userId))
    .limit(4);

  const totalBudget = budgetsData.reduce((acc, b) => acc + b.maxSpending, 0);

  return c.json({
    balance,
    totalIcome,
    totalExpenses,
    recentTransactions,
    pots: {
      totalSaved,
      items: potsData,
    },
    budgets: {
      totalBudget,
      items: budgetsData,
    },
  });
});

export default app;
