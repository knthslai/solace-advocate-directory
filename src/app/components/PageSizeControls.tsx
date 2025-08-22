import { useAdvocatesContext } from "../contexts/AdvocatesContext";

export default function PageSizeControls() {
  const { pageSize, isFetching, handlePageSizeChange } = useAdvocatesContext();
  return (
    <div className="flex flex-wrap items-center gap-4">
      <label className="text-sm font-medium text-secondary-700">
        Results per page:
      </label>
      <select
        value={pageSize}
        onChange={(e) => handlePageSizeChange(Number(e.target.value))}
        className="px-2 py-1 border border-secondary-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-secondary-900"
      >
        <option value={10}>10</option>
        <option value={25}>25</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
      </select>

      {isFetching && (
        <span className="text-primary-600 italic">🔄 Loading...</span>
      )}
    </div>
  );
}
