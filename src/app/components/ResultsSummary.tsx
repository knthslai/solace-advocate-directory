import { useAdvocatesContext } from "../contexts/AdvocatesContext";

export default function ResultsSummary() {
  const { pagination, searchTerm } = useAdvocatesContext();
  if (!pagination) return null;

  return (
    <p className="text-secondary-600">
      {pagination.total > 0 ? (
        <>
          Showing {(pagination.page - 1) * pagination.limit + 1} -{" "}
          {Math.min(pagination.page * pagination.limit, pagination.total)} of{" "}
          {pagination.total.toLocaleString()} results
        </>
      ) : searchTerm ? (
        `No advocates found matching "${searchTerm}"`
      ) : (
        "No advocates found"
      )}
    </p>
  );
}
