import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { bills } from "./bills";
import { transactions } from "./transactions";

export const billPayments = sqliteTable("bill_payments", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  billId: text("bill_id")
    .notNull()
    .references(() => bills.id),
  transactionId: text("transaction_id")
    .notNull()
    .references(() => transactions.id),
  amount: real("amount").notNull(),
  paymentDate: integer("payment_date", { mode: "timestamp" }).notNull(),
});
