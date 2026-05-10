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

export const pots = sqliteTable("pots", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("user_id").notNull(),
  name: text("name").notNull(),
  targetName: real("target_amount").notNull(),
  theme: text("theme", { enum: themes }).notNull().unique(),
  categoryId: text("category_id").references(() => categories.id),
});
