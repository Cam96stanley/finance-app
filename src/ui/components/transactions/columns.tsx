"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { Transaction } from "@/lib/types";

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "counterParty",
    header: "Recipient / Sender",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "date",
    header: "Transaction Date",
    cell: ({ row }) =>
      new Date(row.getValue("date")).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      const amount = row.getValue("amount") as number;
      const type = row.original.type;
      return (
        <p className={type === "income" ? "text-green" : ""}>
          {type === "income" ? "+" : "-"}${amount.toFixed(2)}
        </p>
      );
    },
  },
];
