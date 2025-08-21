"use client";

import { InputHTMLAttributes } from "react";

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  // Any additional props specific to search input
}

export default function SearchInput({
  className = "",
  ...props
}: SearchInputProps) {
  const baseClasses =
    "px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500";

  return (
    <input
      {...props}
      className={`${baseClasses} ${className}`}
      suppressHydrationWarning={true}
      // Add data attribute to help identify this as a search input for extensions
      data-testid="search-input"
    />
  );
}
