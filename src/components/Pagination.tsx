import React from "react";
import Button from "./Button";
import { useAdvocatesContext } from "../app/contexts/AdvocatesContext";

interface PaginationProps {
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({ className = "" }) => {
  const { pagination, handlePageChange } = useAdvocatesContext();

  if (!pagination) return null;
  const { page, totalPages, hasNextPage, hasPreviousPage, total } = pagination;

  const generatePageNumbers = () => {
    const pages = [];
    const maxVisible = 7;

    if (totalPages <= maxVisible) {
      // Show all pages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show smart pagination
      if (page <= 4) {
        // Show first pages
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (page >= totalPages - 3) {
        // Show last pages
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Show middle pages
        pages.push(1);
        pages.push("...");
        for (let i = page - 1; i <= page + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const pageNumbers = generatePageNumbers();

  return (
    <div className={`flex flex-col items-center gap-4 my-5 ${className}`}>
      <div className="text-secondary-600 text-sm">
        <span>
          Showing page {page} of {totalPages} ({total.toLocaleString()} total)
        </span>
      </div>

      <div className="flex items-center flex-wrap justify-center gap-1">
        <Button
          onClick={() => handlePageChange(page - 1)}
          disabled={!hasPreviousPage}
          className="mr-2"
        >
          Previous
        </Button>

        {pageNumbers.map((pageNum, index) => {
          if (pageNum === "...") {
            return (
              <span
                key={`ellipsis-${index}`}
                className="mx-2 text-secondary-500"
              >
                ...
              </span>
            );
          }

          return (
            <Button
              key={pageNum}
              onClick={() => handlePageChange(pageNum as number)}
              className={`mx-1 ${
                pageNum === page
                  ? "!bg-primary-600 !text-white hover:bg-primary-700 border-primary-600"
                  : "bg-white text-secondary-700 hover:bg-secondary-50 border-secondary-300"
              }`}
            >
              {pageNum}
            </Button>
          );
        })}

        <Button
          onClick={() => handlePageChange(page + 1)}
          disabled={!hasNextPage}
          className="ml-2"
        >
          Next
        </Button>
      </div>
    </div>
  );
};
