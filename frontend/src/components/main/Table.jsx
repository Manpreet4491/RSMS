import React, { useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";

const Table = () => {
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [globalFilter, setGlobalFilter] = React.useState("");
  const arr = [1,2,3,4,5]

  const columns = useMemo(
    () => [
      {
        accessorKey: "userId",
        header: "Transaction ID",
        cell: ({ getValue }) => (
          <span className="text-sm text-brand">{getValue()}</span>
        ),
      },
      {
        accessorKey: "userName",
        header: "Date",
        cell: ({ getValue }) => (
          <div className="text-sm text-brand uppercase">{getValue()}</div>
        ),
      },
      {
        accessorKey: "availableFunds",
        header: "Customer ID",
        cell: ({ getValue }) => (
          <div className="text-sm text-brand">{getValue()}</div>
        ),
      },
      {
        accessorKey: "futMargin",
        header: "Customer Name",
        cell: ({ getValue }) => (
          <div className="text-sm text-brand">{getValue()}</div>
        ),
      },
      {
        accessorKey: "optbrokerage",
        header: "Phone Number",
        cell: ({ getValue }) => (
          <div className="text-sm text-brand">{getValue()}</div>
        ),
      },
      {
        accessorKey: "futBrokerage",
        header: "Gender",
        cell: ({ getValue }) => (
          <div className="text-sm text-brand">{getValue()}</div>
        ),
      },
      {
        accessorKey: "isDemoId",
        header: "Age",
        cell: ({ getValue }) => (
          <div className="text-sm text-brand">{getValue()}</div>
        ),
      },
      {
        accessorKey: "createdAt",
        header: "Product Category",
        cell: ({ getValue }) => (
          <div className="text-sm text-brand">{getValue()}</div>
        ),
      },
      {
        accessorKey: "createdAt",
        header: "Quantity",
        cell: ({ getValue }) => (
          <div className="text-sm text-brand">{getValue()}</div>
        ),
      },
    ],
    []
  );

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data: arr,
    columns,
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  return (
    <>
      {/* Table */}
      <div className="h-full">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-grayBG">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-6 py-3 text-xs font-sans text-textMuted cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      {{
                        asc: <span className="text-blue-600">↑</span>,
                        desc: <span className="text-blue-600">↓</span>,
                      }[header.column.getIsSorted()] ?? null}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-6 py-4 whitespace-nowrap text-sm"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {/* {table.getPageCount() > 1 && (
        <div className="px-4 py-3 border-t border-gray-200 sm:px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-700">
                Page {table.getState().pagination.pageIndex + 1} of{" "}
                {table.getPageCount()}
              </span>
              <select
                value={table.getState().pagination.pageSize}
                onChange={(e) => {
                  table.setPageSize(Number(e.target.value));
                }}
                className="px-2 py-1 border border-gray-300 rounded text-sm"
              >
                {[5, 10, 20, 50].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    Show {pageSize}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
                className="px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                First
              </button>
              <button
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className="px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                className="px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
              <button
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
                className="px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Last
              </button>
            </div>
          </div>
        </div>
      )} */}
    </>
  );
};

export default Table;
