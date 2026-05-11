import { getAuth } from "@clerk/hono";
import { zValidator } from "@hono/zod-validator";
import { createInsertSchema } from "drizzle-zod";
import { Hono } from "hono";
import { z } from "zod";
import { db } from "../db";
import { budgets } from "../db/schema";

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

export default app;
