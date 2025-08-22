interface LoadingTableProps {
  isLoading: boolean;
  searchTerm: string;
  columnsCount: number;
}

export default function LoadingTable({
  isLoading,
  searchTerm,
  columnsCount,
}: LoadingTableProps) {
  return (
    <tr>
      <td
        colSpan={columnsCount}
        className="border border-secondary-300 text-center p-5 text-secondary-600"
      >
        {isLoading ? (
          <span className="text-primary-600">🔍 Loading advocates...</span>
        ) : searchTerm ? (
          <span className="text-secondary-500">
            No advocates found matching &ldquo;{searchTerm}&rdquo;
          </span>
        ) : (
          "No advocates found"
        )}
      </td>
    </tr>
  );
}
