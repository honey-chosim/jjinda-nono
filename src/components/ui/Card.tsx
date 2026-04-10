import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  padding?: "none" | "sm" | "md" | "lg";
}

export default function Card({
  className,
  padding = "md",
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "bg-[var(--surface)] rounded-2xl border border-[var(--border)] shadow-sm",
        {
          "p-0": padding === "none",
          "p-3": padding === "sm",
          "p-5": padding === "md",
          "p-6": padding === "lg",
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
