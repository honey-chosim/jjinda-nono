"use client";

import { cn } from "@/lib/utils";
import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  suffix?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, suffix, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label className="text-sm font-medium text-[var(--text)]">
            {label}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            className={cn(
              "w-full h-12 px-4 rounded-xl border border-[var(--border)] bg-[var(--surface)]",
              "text-[var(--text)] text-sm placeholder:text-[var(--text-muted)]",
              "transition-all duration-150",
              "focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              error && "border-[var(--danger)] focus:border-[var(--danger)] focus:ring-[var(--danger)]",
              suffix && "pr-12",
              className
            )}
            {...props}
          />
          {suffix && (
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-[var(--text-muted)]">
              {suffix}
            </span>
          )}
        </div>
        {error && (
          <p className="text-xs text-[var(--danger)] mt-0.5">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
