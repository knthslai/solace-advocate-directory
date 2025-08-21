"use client";

import { InputHTMLAttributes } from "react";

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  // Any additional props specific to search input
}

export default function SearchInput(props: SearchInputProps) {
  return (
    <input
      {...props}
      suppressHydrationWarning={true}
      // Add data attribute to help identify this as a search input for extensions
      data-testid="search-input"
    />
  );
}
