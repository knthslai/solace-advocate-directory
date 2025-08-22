import { useAdvocatesContext } from "../contexts/AdvocatesContext";

export default function SearchStatus() {
  const { searchTerm } = useAdvocatesContext();
  if (!searchTerm) return null;

  return (
    <p className="text-secondary-700">
      Searching for:{" "}
      <span className="font-bold text-primary-600">{searchTerm}</span>
    </p>
  );
}
