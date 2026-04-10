"use client";

import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      fullWidth = false,
      loading = false,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-150 select-none",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--primary)]",
          "disabled:opacity-40 disabled:cursor-not-allowed",
          "active:scale-[0.98]",
          {
            // variants
            "bg-[var(--primary)] text-white hover:bg-[#1F2937] shadow-sm":
              variant === "primary",
            "bg-[var(--secondary)] text-white hover:bg-purple-600 shadow-sm":
              variant === "secondary",
            "border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] hover:bg-gray-50":
              variant === "outline",
            "text-[var(--text)] hover:bg-gray-100": variant === "ghost",
            "bg-[var(--danger)] text-white hover:bg-red-700 shadow-sm":
              variant === "danger",
            // sizes
            "text-xs px-3 h-8": size === "sm",
            "text-sm px-4 h-11": size === "md",
            "text-base px-6 h-14": size === "lg",
            // full width
            "w-full": fullWidth,
          },
          className
        )}
        {...props}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <svg
              className="animate-spin h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            {children}
          </span>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
