"use client";

import { ArrowsDownUpIcon } from "@phosphor-icons/react";
import type { ColumnDef } from "@tanstack/react-table";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

type DataTableProps<TData> = {
  data: TData[];
  columns: ColumnDef<TData>[];
};

export default function DataTable<TData>({
  data,
  columns,
}: DataTableProps<TData>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: { pageSize: 10 },
    },
  });

  return (
    <div>
      <input
        placeholder="Search transaction..."
        value={
          (table.getColumn("counterParty")?.getFilterValue() as string) ?? ""
        }
        onChange={(e) =>
          table.getColumn("counterParty")?.setFilterValue(e.target.value)
        }
        className="border rounded-xl px-4 py-2"
      />
      <table className="w-full mt-4">
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
                  <ArrowsDownUpIcon size={32} />
                  <p className="text-preset-4-bd">No transactions yet</p>
                  <p className="text-preset-5-rg">
                    Your transactions will appear here
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

      <div className="flex items-center justify-between mt-4">
        <button
          type="button"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="px-4 py-2 border rounded-xl disabled:opacity-50"
        >
          Prev
        </button>
        <div className="flex gap-2">
          {Array.from({ length: table.getPageCount() }, (_, i) => (
            <button
              type="button"
              key={i}
              onClick={() => table.setPageIndex(i)}
              className={`px-4 py-2 border rounded-xl ${
                table.getState().pagination.pageIndex === i
                  ? "bg-primary text-white"
                  : ""
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="px-4 py-2 border rounded-xl disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
