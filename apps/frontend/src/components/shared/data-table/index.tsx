import {
  ActionIcon,
  Button,
  Card,
  Checkbox,
  Group,
  Menu,
  Pagination,
  Select,
  Stack,
  Table,
  Text,
  TextInput,
  Tooltip,
} from "@mantine/core";
import {
  IconColumns,
  IconFilter,
  IconSearch,
  IconSortAscending,
  IconSortDescending,
} from "@tabler/icons-react";
import {
  type ColumnDef,
  type ColumnFiltersState,
  type ColumnPinningState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type PaginationState,
  type RowSelectionState,
  type SortingState,
  useReactTable,
  type VisibilityState,
} from "@tanstack/react-table";
import { useState } from "react";

export interface DataTableProps<TData> {
  columns: ColumnDef<TData>[];
  data: TData[];
  enableColumnPinning?: boolean;
  enableColumnResizing?: boolean;
  enableColumnVisibility?: boolean;
  enableFilters?: boolean;
  enableMultiRowSelection?: boolean;
  enablePagination?: boolean;
  enableRowSelection?: boolean;
  enableSearch?: boolean;
  enableSorting?: boolean;
  filters?: {
    key: string;
    label: string;
    options: { label: string; value: string }[];
  }[];
  loading?: boolean;
  pageSize?: number;
  searchPlaceholder?: string;
}

export function DataTable<TData>({
  columns,
  data,
  enableColumnPinning = false,
  enableColumnResizing = false,
  enableColumnVisibility = true,
  enableFilters = true,
  enableMultiRowSelection = true,
  enablePagination = true,
  enableRowSelection = false,
  enableSearch = true,
  enableSorting = true,
  filters = [],
  loading = false,
  pageSize = 10,
  searchPlaceholder = "Search...",
}: DataTableProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize,
  });
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [columnPinning, setColumnPinning] = useState<ColumnPinningState>({
    left: [],
    right: [],
  });

  const table = useReactTable({
    columns,
    data,
    enableColumnPinning,
    enableColumnResizing,
    enableMultiRowSelection,
    enableRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: enableFilters ? getFilteredRowModel() : undefined,
    getPaginationRowModel: enablePagination
      ? getPaginationRowModel()
      : undefined,
    getSortedRowModel: enableSorting ? getSortedRowModel() : undefined,
    globalFilterFn: "includesString",
    onColumnFiltersChange: setColumnFilters,
    onColumnPinningChange: setColumnPinning,
    onColumnVisibilityChange: setColumnVisibility,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    state: {
      columnFilters,
      columnPinning,
      columnVisibility,
      globalFilter,
      pagination,
      rowSelection,
      sorting,
    },
  });

  const handleFilterChange = (key: string, value: null | string) => {
    if (value) {
      setColumnFilters((prev) => [
        ...prev.filter((filter) => filter.id !== key),
        { id: key, value },
      ]);
    } else {
      setColumnFilters((prev) => prev.filter((filter) => filter.id !== key));
    }
  };

  if (loading) {
    return (
      <Card p="lg" radius="lg" withBorder>
        <Text>Loading...</Text>
      </Card>
    );
  }

  return (
    <Card p="lg" radius="lg" withBorder>
      <Stack gap="md">
        {/* Search and Filters */}
        {enableSearch ||
        enableFilters ||
        enableColumnVisibility ||
        enableRowSelection ? (
          <Group justify="space-between">
            <Group>
              {enableSearch && (
                <TextInput
                  leftSection={<IconSearch size={16} />}
                  onChange={(event) =>
                    setGlobalFilter(event.currentTarget.value)
                  }
                  placeholder={searchPlaceholder}
                  style={{ minWidth: 250 }}
                  value={globalFilter}
                />
              )}
              {enableFilters &&
                filters.map((filter) => (
                  <Select
                    clearable
                    data={filter.options}
                    key={filter.key}
                    leftSection={<IconFilter size={16} />}
                    onChange={(value) => handleFilterChange(filter.key, value)}
                    placeholder={filter.label}
                    value={
                      columnFilters.find(({ id }) => id === filter.key)
                        ?.value as string | undefined
                    }
                  />
                ))}
            </Group>
            <Group>
              {enableRowSelection && Object.keys(rowSelection).length > 0 && (
                <Text c="dimmed" size="sm">
                  {Object.keys(rowSelection).length} row(s) selected
                </Text>
              )}
              {enableColumnVisibility && (
                <Menu shadow="md" width={200}>
                  <Menu.Target>
                    <Button
                      leftSection={<IconColumns size={16} />}
                      size="sm"
                      variant="subtle"
                    >
                      Columns
                    </Button>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Label>Toggle columns</Menu.Label>
                    {table.getAllLeafColumns().map((column) => {
                      return (
                        <Menu.Item
                          key={column.id}
                          onClick={(e) => {
                            e.preventDefault();
                            column.toggleVisibility();
                          }}
                        >
                          <Group gap="xs">
                            <Checkbox
                              checked={column.getIsVisible()}
                              onChange={() => column.toggleVisibility()}
                              onClick={(e) => e.stopPropagation()}
                            />
                            <Text size="sm">
                              {typeof column.columnDef.header === "string"
                                ? column.columnDef.header
                                : column.id}
                            </Text>
                          </Group>
                        </Menu.Item>
                      );
                    })}
                  </Menu.Dropdown>
                </Menu>
              )}
            </Group>
          </Group>
        ) : null}

        {/* Table */}
        <Table highlightOnHover striped>
          <Table.Thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Table.Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Table.Th
                    key={header.id}
                    style={{
                      position: "relative",
                      width: enableColumnResizing
                        ? header.getSize()
                        : undefined,
                    }}
                  >
                    <Group gap="xs" wrap="nowrap">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {enableSorting && header.column.getCanSort() && (
                        <Tooltip
                          label={
                            header.column.getIsSorted()
                              ? header.column.getIsSorted() === "desc"
                                ? "Sort ascending"
                                : "Sort descending"
                              : "Sort"
                          }
                        >
                          <ActionIcon
                            onClick={header.column.getToggleSortingHandler()}
                            size="sm"
                            variant="subtle"
                          >
                            {header.column.getIsSorted() === "desc" ? (
                              <IconSortDescending size={14} />
                            ) : (
                              <IconSortAscending size={14} />
                            )}
                          </ActionIcon>
                        </Tooltip>
                      )}
                    </Group>
                    {enableColumnResizing && (
                      <button
                        aria-label="Resize column"
                        className={`resizer ${
                          header.column.getIsResizing() ? "isResizing" : ""
                        }`}
                        onMouseDown={header.getResizeHandler()}
                        onTouchStart={header.getResizeHandler()}
                        style={{
                          background: header.column.getIsResizing()
                            ? "var(--mantine-color-gray-6)"
                            : "var(--mantine-color-gray-3)",
                          border: "none",
                          cursor: "col-resize",
                          height: "100%",
                          padding: 0,
                          position: "absolute",
                          right: 0,
                          top: 0,
                          touchAction: "none",
                          userSelect: "none",
                          width: "5px",
                        }}
                        type="button"
                      />
                    )}
                  </Table.Th>
                ))}
              </Table.Tr>
            ))}
          </Table.Thead>
          <Table.Tbody>
            {table.getRowModel().rows.length === 0 ? (
              <Table.Tr>
                <Table.Td colSpan={columns.length}>
                  <Text c="dimmed" py="xl" ta="center">
                    No data available
                  </Text>
                </Table.Td>
              </Table.Tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <Table.Tr
                  key={row.id}
                  style={{
                    backgroundColor: row.getIsSelected()
                      ? "var(--mantine-color-primary-light)"
                      : undefined,
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <Table.Td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </Table.Td>
                  ))}
                </Table.Tr>
              ))
            )}
          </Table.Tbody>
        </Table>

        {/* Pagination */}
        {enablePagination ? (
          <Group justify="space-between">
            <Text c="dimmed" size="sm">
              Showing {table.getState().pagination.pageIndex * pageSize + 1} to{" "}
              {Math.min(
                (table.getState().pagination.pageIndex + 1) * pageSize,
                table.getFilteredRowModel().rows.length
              )}{" "}
              of {table.getFilteredRowModel().rows.length} entries
            </Text>
            <Pagination
              onChange={(page) =>
                setPagination((prev) => ({ ...prev, pageIndex: page - 1 }))
              }
              total={table.getPageCount()}
              value={table.getState().pagination.pageIndex + 1}
            />
          </Group>
        ) : null}
      </Stack>
    </Card>
  );
}
