"use client";
import React, { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  filterFns,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Container from "@/components/global/container";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  ArrowDown,
  ArrowDownUp,
  ArrowUp,
  ChevronDown,
  CirclePlus,
  Ellipsis,
  EllipsisVertical,
  FilterIcon,
} from "lucide-react";
import { MixerHorizontalIcon } from "@radix-ui/react-icons";
import { Progress } from "@/components/ui/progress";
const status = ["Single", "Married"];
const data = [
  {
    fullName: "Tanner Linsley",
    age: 33,
    visits: 100,
    progress: 50,
    status: "Married",
  },
  {
    fullName: "Kevin Vandy",
    age: 27,
    visits: 200,
    progress: 100,
    status: "Single",
  },
  {
    fullName: "Sarah Chen",
    age: 29,
    visits: 150,
    progress: 75,
    status: "Married",
  },
  {
    fullName: "Michael Rodriguez",
    age: 35,
    visits: 80,
    progress: 40,
    status: "Single",
  },
  {
    fullName: "Emma Wilson",
    age: 31,
    visits: 120,
    progress: 60,
    status: "Married",
  },
  {
    fullName: "James Thompson",
    age: 42,
    visits: 90,
    progress: 45,
    status: "Married",
  },
  {
    fullName: "Lisa Anderson",
    age: 28,
    visits: 175,
    progress: 85,
    status: "Single",
  },
  {
    fullName: "David Martinez",
    age: 36,
    visits: 130,
    progress: 65,
    status: "Married",
  },
  {
    fullName: "Rachel Taylor",
    age: 30,
    visits: 160,
    progress: 80,
    status: "Single",
  },
  {
    fullName: "Daniel Brown",
    age: 34,
    visits: 110,
    progress: 55,
    status: "Married",
  },
  {
    fullName: "Jessica Lee",
    age: 32,
    visits: 140,
    progress: 70,
    status: "Single",
  },
  {
    fullName: "Christopher Garcia",
    age: 39,
    visits: 95,
    progress: 48,
    status: "Married",
  },
  {
    fullName: "Amanda Miller",
    age: 26,
    visits: 185,
    progress: 92,
    status: "Single",
  },
  {
    fullName: "Ryan Davis",
    age: 37,
    visits: 125,
    progress: 62,
    status: "Married",
  },
  {
    fullName: "Michelle Johnson",
    age: 33,
    visits: 145,
    progress: 72,
    status: "Single",
  },
  {
    fullName: "Steven White",
    age: 41,
    visits: 85,
    progress: 42,
    status: "Married",
  },
  {
    fullName: "Laura Smith",
    age: 29,
    visits: 170,
    progress: 85,
    status: "Single",
  },
  {
    fullName: "Thomas Wilson",
    age: 38,
    visits: 115,
    progress: 58,
    status: "Married",
  },
  {
    fullName: "Jennifer Clark",
    age: 31,
    visits: 155,
    progress: 77,
    status: "Single",
  },
  {
    fullName: "William Harris",
    age: 40,
    visits: 105,
    progress: 52,
    status: "Married",
  },
];
const columns = [
  {
    accessorKey: "fullName",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="p-0 hover:bg-transparent"
        onClick={column.getToggleSortingHandler()}
      >
        Name
        {column.getIsSorted() === "asc" ? (
          <ArrowUp className="ml-2 h-4 w-4" />
        ) : column.getIsSorted() === "desc" ? (
          <ArrowDown className="ml-2 h-4 w-4" />
        ) : (
          <ArrowDownUp className="ml-2 h-4 w-4" />
        )}
      </Button>
    ),
    cell: ({ row }) => (
      <p className="capitalize font-medium">{row.getValue("fullName")}</p>
    ),
    enableHiding: false,
  },

  {
    header: ({ column }) => <p className="text-left">Status</p>,
    accessorKey: "status",
    cell: (props) => (
      <div>
        {props.getValue() === "Married" ? (
          <Badge variant={"secondary"}>{props.getValue()}</Badge>
        ) : (
          <Badge>{props.getValue()}</Badge>
        )}
      </div>
    ),
    filterFn: (row, id, filterValues) => {
      return filterValues.includes(row.getValue(id));
    },
  },
  {
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="p-0 hover:bg-transparent"
        onClick={column.getToggleSortingHandler()}
      >
        Age
        {column.getIsSorted() === "asc" ? (
          <ArrowUp className="ml-2 h-4 w-4" />
        ) : column.getIsSorted() === "desc" ? (
          <ArrowDown className="ml-2 h-4 w-4" />
        ) : (
          <ArrowDownUp className="ml-2 h-4 w-4" />
        )}
      </Button>
    ),
    accessorKey: "age",
    cell: (props) => <p>{props.getValue()}</p>,
  },

  {
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="p-0 hover:bg-transparent"
        onClick={column.getToggleSortingHandler()}
      >
        Visits
        {column.getIsSorted() === "asc" ? (
          <ArrowUp className="ml-2 h-4 w-4" />
        ) : column.getIsSorted() === "desc" ? (
          <ArrowDown className="ml-2 h-4 w-4" />
        ) : (
          <ArrowDownUp className="ml-2 h-4 w-4" />
        )}
      </Button>
    ),
    accessorKey: "visits",
    cell: (props) => <p>{props.getValue()}</p>,
  },
  {
    header: ({ column }) => (
      <div className="text-left ">
        <Button
          variant="ghost"
          className="p-0 hover:bg-transparent "
          onClick={column.getToggleSortingHandler()}
        >
          Progress
          {column.getIsSorted() === "asc" ? (
            <ArrowUp className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === "desc" ? (
            <ArrowDown className="ml-2 h-4 w-4" />
          ) : (
            <ArrowDownUp className="ml-2 h-4 w-4" />
          )}
        </Button>
      </div>
    ),
    accessorKey: "progress",
    cell: (props) => <Progress value={props.getValue()} />,
  },
  {
    header: "",
    accessorKey: "actions",
    cell: (props) => (
      <div className="flex justify-end w-full">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="px-3 focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none"
            >
              <EllipsisVertical size={20} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>hhhhhhh</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    ),
    enableHiding: false,
  },
];
export default function App() {
  const [columnFilters, setColumnFilters] = useState([
    { id: "status", value: status },
  ]);
  const [mounted, setMounted] = React.useState(false);
  const [columnVisibility, setColumnVisibility] = useState({});
  React.useEffect(() => {
    setMounted(true);
  }, []);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      columnFilters,
      columnVisibility,
    },
    onColumnVisibilityChange: setColumnVisibility,
  });
  const searchValue = React.useMemo(
    () => columnFilters.find((search) => search.id === "fullName")?.value || "",
    [columnFilters]
  );
  const onSearch = (id, value) => {
    setColumnFilters((prev) =>
      prev.filter((f) => f.id !== "fullName").concat({ id, value })
    );
  };
  const filterStatuses =
    columnFilters.find((f) => f.id === "status")?.value || [];
  if (!mounted) {
    return null;
  }
  return (
    <Container>
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter emails..."
          className="max-w-sm focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none"
          value={searchValue}
          onChange={(e) => onSearch("fullName", e.target.value)}
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="mx-2 focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none"
            >
              <CirclePlus />
              Status{" "}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Status</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {status.map((stat) => (
              <DropdownMenuCheckboxItem
                checked={filterStatuses.includes(stat)}
                key={stat}
                onClick={() => {
                  setColumnFilters((prev) => {
                    const statuses = prev.find(
                      (filter) => filter.id === "status"
                    )?.value;
                    if (!statuses) {
                      return prev.concat({ id: "status", value: [stat] });
                    }
                    return prev.map((f) =>
                      f.id === "status"
                        ? {
                            ...f,
                            value: filterStatuses.includes(stat)
                              ? statuses.filter((s) => s !== stat)
                              : statuses.concat(stat),
                          }
                        : f
                    );
                  });
                }}
              >
                {stat}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="ml-auto focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none"
            >
              View <MixerHorizontalIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllLeafColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  checked={column.getIsVisible()}
                  onClick={column.getToggleVisibilityHandler()}
                >
                  {column.columnDef.accessorKey.toUpperCase()}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {table
                .getHeaderGroups()
                .map((headergroup) =>
                  headergroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </TableHead>
                  ))
                )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
            {table.getRowModel().rows.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center font-medium"
                >
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </Container>
  );
}
