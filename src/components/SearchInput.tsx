"use client";

import { InputHTMLAttributes } from "react";
import { IoSearchOutline, IoCloseOutline } from "react-icons/io5";

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  onClear?: () => void;
}

export default function SearchInput({
  className = "",
  onClear,
  value,
  ...props
}: SearchInputProps) {
  const baseClasses =
    "pl-10 pr-10 py-2 border border-secondary-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-secondary-900 placeholder-secondary-400";

  const handleClear = () => {
    if (onClear) {
      onClear();
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* Search Icon */}
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400 pointer-events-none">
        <IoSearchOutline size={18} />
      </div>

      {/* Input Field */}
      <input
        {...props}
        value={value}
        className={baseClasses}
        suppressHydrationWarning={true}
        data-testid="search-input"
      />

      {/* Clear Button - only show when there's a value */}
      {value && onClear && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary-400 hover:text-secondary-600 transition-colors"
          aria-label="Clear search"
        >
          <IoCloseOutline size={18} />
        </button>
      )}
    </div>
  );
}
