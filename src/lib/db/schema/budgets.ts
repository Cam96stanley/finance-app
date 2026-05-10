import { real, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { categories } from "./categories";

const themes = [
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
] as const;

export const budgets = sqliteTable("budgets", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("user_id").notNull(),
  maxSpending: real("max_spending").notNull(),
  theme: text("theme", { enum: themes }).notNull().unique(),
  categoryId: text("category_id")
    .notNull()
    .references(() => categories.id),
});
