import { useQuery } from "@tanstack/react-query";
import { fetchAdvocates, FetchAdvocatesParams } from "../services/advocates";

// Main hook for paginated data with search, sorting, and pagination
export const useAdvocatesPaginated = (params: FetchAdvocatesParams = {}) => {
  return useQuery({
    queryKey: ["advocates", "paginated", params],
    queryFn: () => fetchAdvocates(params),
    staleTime: 2 * 60 * 1000, // 2 minutes for paginated results
    placeholderData: (previousData) => previousData, // Keep previous data while loading new page
  });
};
