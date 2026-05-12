"use client";

import { CheckCircleIcon, WarningCircleIcon } from "@phosphor-icons/react";
import type { ColumnDef } from "@tanstack/react-table";

export type Bill = {
  id: string;
  name: string;
  amount: number;
  dueDate: string;
  status: "paid" | "pending" | "overdue";
};

export const columns: ColumnDef<Bill>[] = [
  {
    accessorKey: "name",
    header: "Bill Title",
    cell: ({ row }) => (
      <p className="text-preset-4-bd">{row.getValue("name")}</p>
    ),
  },
  {
    accessorKey: "due_date",
    header: "Due Date",
    cell: ({ row }) => {
      const status = row.original.status;
      const date = new Date(row.getValue("dueDate"));
      const day = date.getDate();

      return (
        <div className="flex items-center gap-2">
          <p
            className={`text-preset-4-rg ${status === "paid" ? "text-green" : status === "overdue" ? "text-red" : ""}`}
          >
            Monthly - {day}th
          </p>
          {status === "paid" && (
            <CheckCircleIcon size={16} className="text-green" weight="fill" />
          )}
          {status === "overdue" && (
            <WarningCircleIcon size={16} className="text-red" weight="fill" />
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "amount",
    header: () => <p className="text-right">Amount</p>,
    cell: ({ row }) => {
      const amount = row.getValue("amount") as number;
      const status = row.original.status;
      return (
        <p
          className={`text-preset-4-bd text-right ${status === "overdue" ? "text-red" : ""}`}
        >
          ${amount.toFixed(2)}
        </p>
      );
    },
  },
];
