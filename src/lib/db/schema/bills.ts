import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { categories } from "./categories";

export const bills = sqliteTable("bills", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("user_id").notNull(),
  name: text("name").notNull(),
  amount: real("amount").notNull(),
  dueDate: integer("due_date", { mode: "timestamp" }).notNull(),
  status: text("status", { enum: ["pending", "paid", "overdue"] })
    .notNull()
    .default("pending"),
  categoryId: text("category_id").references(() => categories.id),
});
