import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline" | "warning" | "success";
}

export function Badge({
  className,
  variant = "default",
  children,
  ...props
}: BadgeProps) {
  const variantStyles = {
    default: "bg-brand-navy-900 text-white",
    secondary: "bg-brand-navy-100 text-brand-navy-800",
    outline: "border border-slate-300 text-slate-700 bg-white",
    warning: "bg-amber-50 text-amber-800 border border-amber-200",
    success: "bg-emerald-50 text-emerald-800 border border-emerald-200",
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
