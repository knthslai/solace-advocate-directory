"use client";

import React, { useState } from "react";
import { useAdvocatesPaginated, useDebounce } from "../hooks";
import { SearchInput, Button, Pagination } from "../components";
import { AdvocatesResponse } from "../services/advocates";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(25);

  // Use debounce for the search term
  useDebounce(searchTerm, setDebouncedSearchTerm, 300);

  // Reset to page 1 when search term changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchTerm]);

  // Use TanStack Query hook for paginated data
  const {
    data: response,
    isLoading,
    error,
    isFetching,
  } = useAdvocatesPaginated({
    searchTerm: debouncedSearchTerm || undefined,
    page: currentPage,
    limit: pageSize,
  }) as {
    data: AdvocatesResponse | undefined;
    isLoading: boolean;
    error: Error | null;
    isFetching: boolean;
  };

  const advocates = response?.data || [];
  const pagination = response?.pagination;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };

  const onReset = () => {
    setSearchTerm("");
    setCurrentPage(1);
  };

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (error) {
    return (
      <main className="p-6">
        <h1 className="text-3xl font-bold mb-4">Solace Advocates</h1>
        <div className="text-red-600 p-5 bg-red-50 border border-red-200 rounded">
          Error loading advocates. Please try again.
        </div>
      </main>
    );
  }
  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-2">Solace Advocates</h1>

      <p className="text-gray-600 mb-5">
        Enhanced with pagination and large dataset support.
      </p>

      <div suppressHydrationWarning={true}>
        {/* Search Controls */}
        <div className="mb-5">
          <p className="mb-2">Search</p>
          <div className="flex flex-wrap gap-2">
            <SearchInput
              className="flex-1 min-w-64"
              value={searchTerm}
              onChange={onChange}
              placeholder="Search by name, city, degree, specialty..."
            />
            <Button onClick={onReset}>Reset Search</Button>
          </div>
        </div>

        {/* Page Size Controls */}
        <div className="mb-5 flex flex-wrap items-center gap-4">
          <label className="text-sm font-medium">Results per page:</label>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="px-2 py-1 border border-gray-300 rounded"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>

          {isFetching && (
            <span className="text-blue-600 italic">🔄 Loading...</span>
          )}
        </div>

        {/* Search Status */}
        {searchTerm && (
          <p className="mb-4">
            Searching for: <span className="font-bold">{searchTerm}</span>
          </p>
        )}

        {/* Results Summary */}
        {pagination && (
          <p className="text-gray-600 mb-5">
            {pagination.total > 0 ? (
              <>
                Showing {(pagination.page - 1) * pagination.limit + 1} -{" "}
                {Math.min(pagination.page * pagination.limit, pagination.total)}{" "}
                of {pagination.total.toLocaleString()} advocates
                {searchTerm && ` matching "${searchTerm}"`}
              </>
            ) : searchTerm ? (
              `No advocates found matching "${searchTerm}"`
            ) : (
              "No advocates found"
            )}
          </p>
        )}
      </div>

      {/* Data Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2 bg-gray-100 text-left">
                First Name
              </th>
              <th className="border border-gray-300 p-2 bg-gray-100 text-left">
                Last Name
              </th>
              <th className="border border-gray-300 p-2 bg-gray-100 text-left">
                City
              </th>
              <th className="border border-gray-300 p-2 bg-gray-100 text-left">
                Degree
              </th>
              <th className="border border-gray-300 p-2 bg-gray-100 text-left">
                Specialties
              </th>
              <th className="border border-gray-300 p-2 bg-gray-100 text-left">
                Years of Experience
              </th>
              <th className="border border-gray-300 p-2 bg-gray-100 text-left">
                Phone Number
              </th>
            </tr>
          </thead>
          <tbody>
            {advocates && advocates.length > 0 ? (
              advocates.map((advocate) => {
                // Parse specialties from JSON string if needed
                let specialties: string[] = [];
                if (typeof advocate.specialties === "string") {
                  try {
                    specialties = JSON.parse(advocate.specialties);
                  } catch (e) {
                    specialties = [];
                  }
                } else if (Array.isArray(advocate.specialties)) {
                  specialties = advocate.specialties;
                }

                return (
                  <tr key={advocate.id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 p-2">
                      {advocate.firstName}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {advocate.lastName}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {advocate.city}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {advocate.degree}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {specialties.map((s: string, idx: number) => (
                        <div key={idx} className="text-xs mb-1">
                          {s}
                        </div>
                      ))}
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      {advocate.yearsOfExperience}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {advocate.phoneNumber}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan={7}
                  className="border border-gray-300 text-center p-5"
                >
                  {isLoading ? (
                    <span className="text-blue-600">
                      🔍 Loading advocates...
                    </span>
                  ) : searchTerm ? (
                    <span className="text-gray-500">
                      No advocates found matching &ldquo;{searchTerm}&rdquo;
                    </span>
                  ) : (
                    "No advocates found"
                  )}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {pagination && pagination.totalPages > 1 && (
        <Pagination pagination={pagination} onPageChange={onPageChange} />
      )}
    </main>
  );
}
