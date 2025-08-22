type ColumnConfig = {
  key: string;
  header: string;
  accessor: (advocate: any) => React.ReactNode;
  className?: string;
  minWidth?: string;
};

interface TableHeaderProps {
  columns: ColumnConfig[];
}

export default function TableHeader({ columns }: TableHeaderProps) {
  return (
    <thead className="sticky -top-1 z-5">
      <tr>
        {columns.map((column) => (
          <th
            key={column.key}
            className="border border-secondary-300 p-2 bg-primary-50 text-left text-primary-800 font-semibold"
            style={{ minWidth: column.minWidth }}
          >
            {column.header}
          </th>
        ))}
      </tr>
    </thead>
  );
}
