import TableCell from "./TableCell";

type ColumnConfig = {
  key: string;
  header: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  accessor: (advocate: any) => React.ReactNode;
  className?: string;
  minWidth?: string;
};

interface TableRowProps {
  advocate: any;
  columns: ColumnConfig[];
  index: number;
}

export default function TableRow({ advocate, columns, index }: TableRowProps) {
  const isEven = index % 2 === 0;
  const bgColor = isEven ? "bg-white" : "bg-slate-50";

  return (
    <tr
      key={advocate.id}
      className={`${bgColor} hover:bg-primary-50 transition-colors`}
    >
      {columns.map((column) => (
        <TableCell key={column.key} className={column.className}>
          {column.accessor(advocate)}
        </TableCell>
      ))}
    </tr>
  );
}
