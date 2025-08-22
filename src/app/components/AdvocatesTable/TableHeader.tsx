type ColumnConfig = {
  key: string;
  header: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
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
        {columns.map((column) => {
          const IconComponent = column.icon;
          return (
            <th
              key={column.key}
              className="border border-secondary-300 p-2 bg-primary-50 text-sm text-left text-primary-800 font-semibold"
              style={{ minWidth: column.minWidth }}
            >
              <div className="flex items-center gap-0.5">
                <IconComponent size={16} className="text-primary-600 w-4 h-4" />
                <span>{column.header}</span>
              </div>
            </th>
          );
        })}
      </tr>
    </thead>
  );
}
