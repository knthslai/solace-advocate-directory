import { Advocate } from "../types/database";

export interface AdvocatesResponse {
  data: Advocate[];
}

export const fetchAdvocates = async (
  searchTerm?: string
): Promise<Advocate[]> => {
  const url = searchTerm
    ? `/api/advocates?search=${encodeURIComponent(searchTerm)}`
    : "/api/advocates";

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const jsonResponse: AdvocatesResponse = await response.json();
  return jsonResponse.data || [];
};
