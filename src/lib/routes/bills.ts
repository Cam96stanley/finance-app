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

  const totalBills = data.reduce((acc, b) => acc + b.amount, 0);

  const paidBills = data.filter((b) => b.status === "paid");
  const pendingBills = data.filter((b) => b.status === "pending");
  const overdueBills = data.filter((b) => b.status === "overdue");

  const summary = {
    paid: {
      count: paidBills.length,
      total: paidBills.reduce((acc, b) => acc + b.amount, 0),
    },
    upcoming: {
      count: pendingBills.length,
      total: pendingBills.reduce((acc, b) => acc + b.amount, 0),
    },
    dueSoon: {
      count: overdueBills.length,
      total: overdueBills.reduce((acc, b) => acc + b.amount, 0),
    }
  }

  return c.json({
    bills: data,
    totalBills,
    summary,
  });
});

export default app;
