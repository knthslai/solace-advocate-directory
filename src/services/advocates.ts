import { Advocate } from "../types/database";
import { simulateNetworkDelay } from "./performance-simulation";

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface AdvocatesResponse {
  data: Advocate[];
  pagination: PaginationInfo;
  search: string | null;
}

export interface FetchAdvocatesParams {
  searchTerm?: string;
  page?: number;
  limit?: number;
}

export const fetchAdvocates = async (
  params: FetchAdvocatesParams = {}
): Promise<AdvocatesResponse> => {
  // Optional performance simulation for testing
  await simulateNetworkDelay();

  const { searchTerm, page = 1, limit = 50 } = params;

  const searchParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });

  if (searchTerm) {
    searchParams.append("search", searchTerm);
  }

  const url = `/api/advocates?${searchParams.toString()}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const jsonResponse: AdvocatesResponse = await response.json();
  return jsonResponse;
};
