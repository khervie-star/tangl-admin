"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import { CaretSortIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { IInvestmentRequest, TInvestorTypes } from "@/types";
import { Button } from "../ui/button";
import React from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Chip, Tooltip } from "@mui/material";

// Define the status options
// const statusOptions = ["PENDING", "APPROVED", "REJECTED"] as const
// type TStatus = typeof statusOptions[number]
type TStatus = "PENDING" | "APPROVED" | "REJECTED";

// Column definitions

export function InvestmentsDataTable({
  data,
  isLoading,
}: {
  data: IInvestmentRequest[];
  isLoading: boolean;
}) {
  const router = useRouter();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [selectedInvestorTypes, setSelectedInvestorTypes] = useState<string[]>(
    []
  );
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);

  const investmentColumns: ColumnDef<IInvestmentRequest>[] = [
    {
      accessorKey: "firstName",
      header: ({ column }) => {
        return (
          <Button
            variant={"ghost"}
            onClick={() =>
              column.toggleSorting(column.getIsSorted() === "asc")
            }>
            First Name
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("firstName") || "-"}</div>
      ),
    },
    {
      accessorKey: "lastName",
      header: ({ column }) => {
        return (
          <Button
            variant={"ghost"}
            onClick={() =>
              column.toggleSorting(column.getIsSorted() === "asc")
            }>
            Last Name
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("lastName") || "-"}</div>
      ),
    },
    {
      accessorKey: "emailAddress",
      header: ({ column }) => {
        return (
          <Button
            variant={"ghost"}
            onClick={() =>
              column.toggleSorting(column.getIsSorted() === "asc")
            }>
            Email
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("emailAddress") || "-"}</div>
      ),
    },
    {
      accessorKey: "investmentType",
      header: "Investor Type",
      cell: ({ row }) => {
        const type = row.getValue("investmentType") as TInvestorTypes;

        if (!type)
          return <div className="text-muted-foreground">Not specified</div>;

        const typeMap = {
          INDIVIDUAL: {
            label: "Individual",
            variant: "outline",
            title: "Indivdual Investor",
          },
          COMPANY: {
            label: "Company",
            variant: "default",
            title: "Company Investor",
          },
          HIGHNETWORTHINDIVIDUAL: {
            label: "HNW Individual",
            variant: "secondary",
            title: "High Net-worth Individual",
          },
          SOPHISTICATEDINDIVIDUAL: {
            label: "Sophisticated",
            variant: "secondary",
            title: "Sophisticated Individual",
          },
        };

        const { label, variant, title } = typeMap[type] || {
          label: type,
          variant: "outline",
        };

        return (
          <Tooltip title={title}>
            <Chip
              variant={variant as any}
              className="!cursor-pointer"
              label={label}
            />
          </Tooltip>
        );
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id) as string);
      },
    },
    {
      accessorKey: "investmentAmount",
      header: "Amount",
      cell: ({ row }) => {
        const amount = row.getValue("investmentAmount") as number;
        const currency = row.original.investmentCurrency || "GBP";

        if (!amount) return <div className="text-muted-foreground">-</div>;

        return (
          <div className="font-medium">
            {new Intl.NumberFormat("en-GB", {
              style: "currency",
              currency: currency,
            }).format(amount)}
          </div>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() =>
              column.toggleSorting(column.getIsSorted() === "asc")
            }>
            Date Added
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const date = row.getValue("createdAt")
          ? new Date(row.getValue("createdAt"))
          : null;

        return (
          <div>
            {date
              ? date.toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })
              : "-"}
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = (row.getValue("status") as TStatus) || "PENDING";

        return (
          <p
            className={`w-fit font-semibold px-3 py-1 rounded-full capitalize ${
              status?.toLocaleLowerCase() === "approved"
                ? "bg-green-100 text-green-600"
                : status?.toLocaleLowerCase() === "rejected"
                ? "bg-red-100 text-red-600"
                : "bg-yellow-100 text-yellow-600"
            }`}>
            {status || "PENDING"}
          </p>
        );
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id) as string);
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const investment = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <DotsHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() =>
                  navigator.clipboard
                    .writeText(investment._id ?? "")
                    .then(() => toast("Investment ID copied to clipboard!"))
                    .catch(() => toast.error("Failed to copy ID"))
                }>
                Copy ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => handleViewDetails(investment._id as string)}>
                View details
              </DropdownMenuItem>
              {/* <DropdownMenuItem>Edit status</DropdownMenuItem> */}
              {/* <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">
                Delete
              </DropdownMenuItem> */}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
    columns: investmentColumns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });

  // Apply multiple filters for investor type
  React.useEffect(() => {
    if (selectedInvestorTypes.length > 0) {
      table.getColumn("investmentType")?.setFilterValue(selectedInvestorTypes);
    } else {
      table.getColumn("investmentType")?.setFilterValue(undefined);
    }
  }, [selectedInvestorTypes, table]);

  // Apply multiple filters for status
  React.useEffect(() => {
    if (selectedStatus.length > 0) {
      table.getColumn("status")?.setFilterValue(selectedStatus);
    } else {
      table.getColumn("status")?.setFilterValue(undefined);
    }
  }, [selectedStatus, table]);

  const handleViewDetails = (id: string) => {
    router.push(`/investment-requests/${id}`);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Input
            placeholder="Filter by name..."
            value={
              (table.getColumn("firstName")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("firstName")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />

          <Select
            onValueChange={(value) => {
              if (value === "all") {
                setSelectedInvestorTypes([]);
              } else {
                setSelectedInvestorTypes([value]);
              }
            }}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Investor Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="INDIVIDUAL">Individual</SelectItem>
              <SelectItem value="COMPANY">Company</SelectItem>
              <SelectItem value="HIGHNETWORTHINDIVIDUAL">
                HNW Individual
              </SelectItem>
              <SelectItem value="SOPHISTICATEDINDIVIDUAL">
                Sophisticated
              </SelectItem>
            </SelectContent>
          </Select>

          <Select
            onValueChange={(value) => {
              if (value === "all") {
                setSelectedStatus([]);
              } else {
                setSelectedStatus([value]);
              }
            }}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="PENDING">Pending</SelectItem>
              <SelectItem value="APPROVED">Approved</SelectItem>
              <SelectItem value="REJECTED">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Columns</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter(
                  (column) => column.id !== "actions" && column.getCanHide()
                )
                .map((column) => {
                  return (
                    <DropdownMenuItem
                      key={column.id}
                      className="capitalize"
                      onClick={() =>
                        column.toggleVisibility(!column.getIsVisible())
                      }>
                      <input
                        type="checkbox"
                        className="mr-2"
                        checked={column.getIsVisible()}
                        onChange={() => {}}
                      />
                      {column.id}
                    </DropdownMenuItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              // Loading state
              Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={`loading-${index}`}>
                  {Array.from({ length: investmentColumns.length }).map(
                    (_, cellIndex) => (
                      <TableCell key={`loading-cell-${cellIndex}`}>
                        <Skeleton className="h-6 w-full" />
                      </TableCell>
                    )
                  )}
                </TableRow>
              ))
            ) : table.getRowModel().rows?.length ? (
              // Data loaded
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              // Empty state
              <TableRow>
                <TableCell
                  colSpan={investmentColumns.length}
                  className="h-24 text-center">
                  <div className="flex flex-col items-center justify-center gap-2 py-8">
                    <p className="text-lg font-medium">
                      No investment requests found
                    </p>
                    <p className="text-muted-foreground">
                      Try adjusting your filters or search terms
                    </p>
                    <Button
                      variant="outline"
                      className="mt-2"
                      onClick={() => {
                        table.resetColumnFilters();
                        setSelectedInvestorTypes([]);
                        setSelectedStatus([]);
                      }}>
                      Reset filters
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {table.getRowModel().rows.length || 0} of {data.length}{" "}
          requests
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}>
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
