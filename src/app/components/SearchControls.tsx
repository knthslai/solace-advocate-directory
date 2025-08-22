import { SearchInput } from "../../components";
import { useAdvocatesContext } from "../contexts/AdvocatesContext";

export default function SearchControls() {
  const { searchTerm, handleSearchChange, resetSearch } = useAdvocatesContext();
  return (
    <div className="flex flex-wrap gap-2">
      <SearchInput
        className="flex-1 min-w-64"
        value={searchTerm}
        onChange={handleSearchChange}
        onClear={resetSearch}
        placeholder="Search..."
      />
    </div>
  );
}
