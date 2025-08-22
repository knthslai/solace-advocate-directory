"use client";

import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  "data-testid"?: string;
}

export default function Button({
  "data-testid": dataTestId,
  className = "",
  ...props
}: ButtonProps) {
  const baseClasses =
    "px-4 py-2 border border-secondary-300 rounded bg-white text-secondary-700 hover:bg-secondary-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500";

  return (
    <button
      {...props}
      className={`${baseClasses} ${className}`}
      suppressHydrationWarning={true}
      // Add data attribute to help identify this as our button for extensions
      data-testid={dataTestId || "app-button"}
    />
  );
}
