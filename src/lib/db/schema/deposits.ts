import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { pots } from "./pots";
import { transactions } from "./transactions";

export const potDeposits = sqliteTable("pots_deposits", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("user_id").notNull(),
  potId: text("pot_id")
    .notNull()
    .references(() => pots.id),
  transactionId: text("transaction_id")
    .notNull()
    .references(() => transactions.id),
  amount: real("amount").notNull(),
  depositDate: integer("deposit_date", { mode: "timestamp" }).notNull(),
});
