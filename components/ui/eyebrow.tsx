import React from "react";
import { cn } from "@/lib/utils";

/**
 * The small mono-set label above a heading — the dossier's section marker.
 *
 * Three variants had drifted apart: the homepage used `text-xs` with
 * `tracking-[0.2em]` in forest green as a `<span>`, inner pages used the
 * identical treatment but as an `<h2>`, and metadata rows used `text-[10px]`
 * with `tracking-widest` in slate. Same idea, three sets of numbers. This holds
 * two tones and two sizes.
 *
 * The `as` prop exists because the eyebrow is sometimes a genuine heading for
 * the block beneath it (inner pages) and sometimes a label inside a heading
 * that already exists (the homepage, where the `<h2>` follows immediately).
 * Rendering it as `<h2>` in the second case would put two headings on one
 * block, so the homepage keeps it a `<span>`.
 */
export const eyebrowTones = {
  brand: "text-brand-forest-800",
  muted: "text-slate-500",
} as const;

export const eyebrowSizes = {
  /** The label above a section or page heading. */
  xs: "text-xs tracking-[0.2em]",
  /** Inline metadata rows inside cards and panels. */
  micro: "text-[10px] tracking-widest",
} as const;

export interface EyebrowProps extends React.HTMLAttributes<HTMLElement> {
  tone?: keyof typeof eyebrowTones;
  size?: keyof typeof eyebrowSizes;
  as?: React.ElementType;
}

export function Eyebrow({
  tone = "brand",
  size = "xs",
  as: Tag = "span",
  className,
  children,
  ...props
}: EyebrowProps) {
  return (
    <Tag
      className={cn(
        "font-mono font-bold uppercase",
        eyebrowSizes[size],
        eyebrowTones[tone],
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
