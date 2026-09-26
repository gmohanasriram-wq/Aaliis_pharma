import React from "react";
import { cn } from "@/lib/utils";

/**
 * The single content width and gutter for the site.
 *
 * Every wrapper used to hand-write its own max-width — the hero at
 * `max-w-[1520px]`, homepage sections and chrome at `max-w-7xl`, the product
 * detail page at `max-w-6xl`, page headers at `max-w-5xl`, and the policy pages
 * at `max-w-4xl`. Moving between routes shifted the left margin, which reads as
 * unfinished work. One decision, made once.
 *
 * Note: the narrower text blocks inside sections (`max-w-3xl`, `max-w-2xl`,
 * `max-w-xl`) are line-length limits for prose, not page containers, and
 * deliberately stay at their call sites.
 */
export const containerWidths = {
  /** Homepage sections, header, footer, catalogue. The default. */
  default: "max-w-7xl",
  /** The hero's framed dossier panel, which is intentionally wider than content. */
  wide: "max-w-[1520px]",
  /** Product detail. */
  medium: "max-w-6xl",
  /** Page headers on secondary routes. */
  narrow: "max-w-5xl",
  /** Long-form pages: policy and legal copy, and the enquiry form. */
  prose: "max-w-4xl",
} as const;

export interface ContainerProps extends React.HTMLAttributes<HTMLElement> {
  width?: keyof typeof containerWidths;
  as?: React.ElementType;
  /**
   * The hero is the one block where the container *is* the semantic element: it
   * carries the section's own pointer and scroll handlers, so wrapping it in an
   * extra div would add a level for nothing.
   */
  ref?: React.Ref<HTMLElement>;
}

export function Container({
  width = "default",
  as: Tag = "div",
  className,
  children,
  ref,
  ...props
}: ContainerProps) {
  return (
    <Tag
      ref={ref}
      className={cn(
        "mx-auto px-4 sm:px-6 lg:px-8",
        containerWidths[width],
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
