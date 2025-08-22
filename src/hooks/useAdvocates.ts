import { useQuery } from "@tanstack/react-query";
import { fetchAdvocates } from "../services/advocates";

export const useAdvocates = (searchTerm?: string) => {
  return useQuery({
    queryKey: ["advocates", searchTerm],
    queryFn: () => fetchAdvocates(searchTerm),
    enabled: Boolean(searchTerm), // Only fetch when there's a search term
    staleTime: 2 * 60 * 1000, // 2 minutes for search results
  });
};

export const useAllAdvocates = () => {
  return useQuery({
    queryKey: ["advocates"],
    queryFn: () => fetchAdvocates(),
    staleTime: 5 * 60 * 1000, // 5 minutes for all advocates
  });
};
