import React from "react";
import { cn } from "@/lib/utils";

/**
 * A page section: vertical rhythm, surface tone, and the hairline rule that
 * separates one from the next.
 *
 * Three ad-hoc paddings were in use (`py-20 lg:py-28` on the homepage,
 * `py-16 sm:py-20` on inner pages, `py-12 sm:py-16` on the product detail).
 * They are collapsed to two named rhythms:
 *
 * - `default` — the generous rhythm, for a section that is the page's subject.
 * - `compact` — the tight rhythm, for supporting and index-like blocks.
 *
 * Pairing the rhythm with `tone` is what produces density contrast. The
 * homepage previously alternated white/slate-50 mechanically for all ten
 * sections, which spent the contrast without buying any hierarchy; choosing
 * rhythm by content weight is what makes one block read as more important
 * than the next.
 */
export const sectionDensities = {
  default: "py-20 lg:py-28",
  compact: "py-16 sm:py-20",
  tight: "py-12 sm:py-16",
} as const;

export const sectionTones = {
  white: "bg-white",
  muted: "bg-slate-50",
  dark: "bg-slate-900 text-white",
  none: "",
} as const;

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  density?: keyof typeof sectionDensities;
  tone?: keyof typeof sectionTones;
  /** Hairline rule beneath the section. Off for the last block before the footer. */
  divided?: boolean;
  /**
   * The secondary routes wrap their whole body in this rhythm, but as a plain
   * `div` rather than a `section` — they already sit inside the single `<main>`
   * landmark, and adding nine more unnamed regions would be noise.
   */
  as?: React.ElementType;
}

export function Section({
  density = "default",
  tone = "white",
  divided = true,
  as: Tag = "section",
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <Tag
      className={cn(
        "relative",
        sectionDensities[density],
        sectionTones[tone],
        divided && "border-b border-slate-200/90",
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
