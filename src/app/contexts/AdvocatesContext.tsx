"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useAdvocatesPaginated, useDebounce } from "../../hooks";
import { AdvocatesResponse } from "../../services/advocates";

interface Advocate {
  id: number;
  firstName: string;
  lastName: string;
  city: string;
  degree: string;
  specialties: string | string[];
  yearsOfExperience: number;
  phoneNumber: number;
  createdAt: Date | null;
}

interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

interface AdvocatesContextType {
  // State
  searchTerm: string;
  debouncedSearchTerm: string;
  currentPage: number;
  pageSize: number;

  // Data
  advocates: Advocate[];
  pagination: PaginationInfo | undefined;
  isLoading: boolean;
  error: Error | null;
  isFetching: boolean;

  // Actions
  setSearchTerm: (term: string) => void;
  setCurrentPage: (page: number) => void;
  setPageSize: (size: number) => void;
  resetSearch: () => void;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePageChange: (page: number) => void;
  handlePageSizeChange: (size: number) => void;
}

const AdvocatesContext = createContext<AdvocatesContextType | undefined>(
  undefined
);

export const useAdvocatesContext = () => {
  const context = useContext(AdvocatesContext);
  if (context === undefined) {
    throw new Error(
      "useAdvocatesContext must be used within an AdvocatesProvider"
    );
  }
  return context;
};

interface AdvocatesProviderProps {
  children: React.ReactNode;
}

export const AdvocatesProvider: React.FC<AdvocatesProviderProps> = ({
  children,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(25);

  // Use debounce for the search term
  useDebounce(searchTerm, setDebouncedSearchTerm, 300);

  // Reset to page 1 when search term changes
  useEffect(() => {
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

  // Action handlers
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };

  const resetSearch = () => {
    setSearchTerm("");
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  const value: AdvocatesContextType = {
    // State
    searchTerm,
    debouncedSearchTerm,
    currentPage,
    pageSize,

    // Data
    advocates,
    pagination,
    isLoading,
    error,
    isFetching,

    // Actions
    setSearchTerm,
    setCurrentPage,
    setPageSize,
    resetSearch,
    handleSearchChange,
    handlePageChange,
    handlePageSizeChange,
  };

  return (
    <AdvocatesContext.Provider value={value}>
      {children}
    </AdvocatesContext.Provider>
  );
};
