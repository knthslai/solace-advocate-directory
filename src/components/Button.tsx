"use client";

import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  "data-testid"?: string;
}

export default function Button({
  "data-testid": dataTestId,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      suppressHydrationWarning={true}
      // Add data attribute to help identify this as our button for extensions
      data-testid={dataTestId || "app-button"}
    />
  );
}
