import { ReactNode } from "react";

interface TableCellProps {
  children: ReactNode;
  className?: string;
}

export default function TableCell({
  children,
  className = "",
}: TableCellProps) {
  return (
    <td
      className={`border border-secondary-300 p-2 text-secondary-900 ${className}`}
    >
      {children}
    </td>
  );
}
