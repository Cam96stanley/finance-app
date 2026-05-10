import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { categories } from "./categories";

export const transactions = sqliteTable("transactions", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("user_id").notNull(),
  amount: real("amount").notNull(),
  type: text("type", { enum: ["income", "expense"] }).notNull(),
  counterParty: text("counterParty").notNull(),
  date: integer("date", { mode: "timestamp" }).notNull(),
  categoryId: text("category_id").references(() => categories.id),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(
    () => new Date(),
  ),
});
