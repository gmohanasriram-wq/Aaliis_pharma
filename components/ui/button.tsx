import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * `primaryOnDark` / `outlineOnDark` encode what five call sites were already
   * expressing by overriding colours through `className`: a button sitting on
   * the slate-900 panels. forest-900 does not carry enough contrast against
   * slate-900, so the lighter forest-600 is the correct emphasis there — and
   * that is a property of the surface the button sits on, not of the caller.
   *
   * `secondary` and `ghost` had no call sites and are removed.
   */
  variant?: "primary" | "outline" | "primaryOnDark" | "outlineOnDark";
  size?: "sm" | "md" | "lg";
  href?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      href,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none rounded-lg";

    const variantStyles = {
      primary:
        "bg-brand-forest-900 text-white hover:bg-brand-forest-800 focus:ring-brand-forest-900 shadow-sm",
      outline:
        "border border-slate-300 bg-white text-slate-800 hover:bg-slate-50 focus:ring-slate-400",
      primaryOnDark:
        "bg-brand-forest-600 text-white hover:bg-brand-forest-500 focus:ring-brand-forest-400 shadow-sm",
      outlineOnDark:
        "border border-slate-700 bg-transparent text-white hover:bg-slate-800 focus:ring-slate-500",
    };

    const sizeStyles = {
      sm: "h-9 px-3 text-xs",
      md: "h-11 px-5 text-sm",
      lg: "h-12 px-7 text-base font-semibold",
    };

    const combinedClasses = cn(
      baseStyles,
      variantStyles[variant],
      sizeStyles[size],
      className
    );

    if (href) {
      const { type: _type, ...restProps } = props;
      return (
        <Link href={href} className={combinedClasses} {...(restProps as any)}>
          {children}
        </Link>
      );
    }

    return (
      <button ref={ref} className={combinedClasses} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
