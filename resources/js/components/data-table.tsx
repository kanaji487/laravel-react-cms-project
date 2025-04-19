import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
  
type DataTableProps<T> = {
    data: T[];
    columns: Column<T>[];
    getRowKey?: (row: T, index: number) => string | number;
};

export type Column<T> = {
    key: string;
    header: string;
    className?: string;
    render?: (row: T) => React.ReactNode;
};
  
export function DataTable<T>({ data, columns, getRowKey }: DataTableProps<T>) {
    return (
      <Table className="border border-gray-300">
        <TableHeader>
          <TableRow>
            {columns.map((col) => (
              <TableHead key={col.key} className={col.className}>
                {col.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <TableRow key={getRowKey ? getRowKey(row, rowIndex) : rowIndex}>
                {columns.map((col) => (
                  <TableCell key={col.key} className={col.className}>
                    {col.render ? col.render(row) : (row as any)[col.key]}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center">
                No data available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    );
}