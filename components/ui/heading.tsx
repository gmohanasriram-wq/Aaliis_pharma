import React from "react";
import { cn } from "@/lib/utils";

/**
 * The site's heading scale.
 *
 * Every heading was hand-written at its call site, so the same section heading
 * shipped with `leading-[1.05]`, `leading-[1.06]` and `leading-[1.08]` and with
 * either `mt-2` or `mt-3` — differences that encoded nothing and were simply an
 * artefact of which section was written when. The scale below is derived from
 * the shipping hero treatment, which is the strongest element on the page and
 * which `design-analysis.md` §5 now records.
 */
export const headingLevels = {
  /** The hero. Larger and heavier than everything else, by design. */
  display:
    "text-[2rem] xs:text-[2.5rem] sm:text-4xl md:text-5xl lg:text-[3.75rem] xl:text-[4.5rem] font-black leading-[1.02]",
  /** Page titles on secondary routes. */
  h1: "text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.08]",
  /** Section headings. */
  h2: "text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.08]",
  /** Headings inside a card. */
  h3: "text-base sm:text-lg font-bold leading-snug",
} as const;

export const headingTones = {
  default: "text-slate-900",
  /** For headings on the dark slate-900 panels. */
  inverse: "text-white",
  /** For headings whose section sits on a dark surface but owns its own colour. */
  brand: "text-brand-forest-950",
} as const;

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: keyof typeof headingLevels;
  tone?: keyof typeof headingTones;
  /** Overrides the tag independently of the visual level. */
  as?: "h1" | "h2" | "h3" | "h4" | "div" | "span";
  /** Defaults on for `display` and `h2`, where it prevents orphaned last lines. */
  balance?: boolean;
}

export function Heading({
  level = "h2",
  tone = "default",
  as,
  balance,
  className,
  children,
  ...props
}: HeadingProps) {
  const Tag = (as ?? (level === "display" ? "h1" : level)) as React.ElementType;
  const shouldBalance = balance ?? (level === "display" || level === "h2");

  return (
    <Tag
      className={cn(
        "tracking-tight",
        headingLevels[level],
        headingTones[tone],
        shouldBalance && "text-balance",
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
