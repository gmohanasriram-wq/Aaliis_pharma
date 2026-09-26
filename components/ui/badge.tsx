import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * `default`, `secondary` and `success` had no call sites and are removed.
   * The only live uses are the prescription-status chip on a product card,
   * which needs exactly the two that remain.
   */
  variant?: "outline" | "warning";
}

export function Badge({
  className,
  variant = "outline",
  children,
  ...props
}: BadgeProps) {
  const variantStyles = {
    outline: "border border-slate-300 text-slate-700 bg-white",
    warning: "bg-amber-50 text-amber-800 border border-amber-200",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold tracking-wide transition-colors",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
