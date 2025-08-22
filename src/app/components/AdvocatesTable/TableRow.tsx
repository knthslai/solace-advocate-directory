import TableCell from "./TableCell";

type ColumnConfig = {
  key: string;
  header: string;
  accessor: (advocate: any) => React.ReactNode;
  className?: string;
  minWidth?: string;
};

interface TableRowProps {
  advocate: any;
  columns: ColumnConfig[];
}

export default function TableRow({ advocate, columns }: TableRowProps) {
  return (
    <tr key={advocate.id} className="hover:bg-primary-50 transition-colors">
      {columns.map((column) => (
        <TableCell key={column.key} className={column.className}>
          {column.accessor(advocate)}
        </TableCell>
      ))}
    </tr>
  );
}
