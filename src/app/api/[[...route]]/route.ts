import { clerkMiddleware } from "@clerk/hono";
import { Hono } from "hono";
import { handle } from "hono/vercel";
import budgets from "@/lib/routes/budgets";
import overview from "@/lib/routes/overview";
import pots from "@/lib/routes/pots";
import transactions from "@/lib/routes/transactions";

const app = new Hono().basePath("/api");

app.use(
  "*",
  clerkMiddleware({
    publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    secretKey: process.env.CLERK_SECRET_KEY,
  }),
);

app.route("/transactions", transactions);
app.route("/overview", overview);
app.route("/budgets", budgets);
app.route("/pots", pots);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);
