"use client";

import { MagnifyingGlassIcon } from "@phosphor-icons/react";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

type BillsTableProps<TData> = {
  data: TData[];
  columns: ColumnDef<TData>[];
};

export default function RecurringBillsTable<TData>({
  data,
  columns,
}: BillsTableProps<TData>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="bg-white rounded-xl p-8 flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 border rounded-xl px-4 py-2 w-64">
          <input
            placeholder="Search bills..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(e) =>
              table.getColumn("name")?.setFilterValue(e.target.value)
            }
            className="outline-none text-preset-4-rg flex-1"
          />
          <MagnifyingGlassIcon size={16} className="text-muted-foreground" />
        </div>
        <div className="flex items-center gap-2">
          <p className="text-preset-4-rg text-muted-foreground">Sort by</p>
          <select
            className="border rounded-xl px-4 py-2 text-preset-4-rg"
            onChange={(e) => {
              if (e.target.value === "latest") {
                table.getColumn("dueDate")?.toggleSorting(false);
              } else if (e.target.value === "oldest") {
                table.getColumn("dueDate")?.toggleSorting(true);
              } else if (e.target.value === "a-z") {
                table.getColumn("name")?.toggleSorting(false);
              } else if (e.target.value === "z-a") {
                table.getColumn("name")?.toggleSorting(true);
              }
            }}
          >
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
            <option value="a-z">A-Z</option>
            <option value="z-a">Z-A</option>
          </select>
        </div>
      </div>

      <table className="w-full">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="text-left text-preset-5-rg text-muted-foreground py-3"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="text-center py-12">
                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                  <p className="text-preset-4-bd">No bills found</p>
                  <p className="text-preset-5-rg">
                    Your recurring bills will apear here
                  </p>
                </div>
              </td>
            </tr>
          ) : (
            table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border-t border-gray-100">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="py-4">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
