import React from "react";
import { cn } from "@/lib/utils";
import { Heading, type HeadingProps } from "@/components/ui/heading";

/**
 * The card and panel surfaces.
 *
 * Five treatments had grown up independently: a standard card (`rounded-2xl`,
 * white, `p-6 sm:p-7`), a muted card (`bg-slate-50/50`, `p-7`), a large panel
 * (`rounded-3xl`), a dark panel (`bg-slate-900`, `rounded-3xl`), and a note
 * strip (`rounded-2xl`, `text-xs`). The radius, padding and border colour
 * differed between them for no reason beyond which file they were written in.
 *
 * `interactive` carries the hover affordance only where the whole card is
 * clickable, so a static card does not lift under the cursor.
 */
export const cardVariants = {
  /** A card in a grid, holding structured content. */
  card: "rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-7 shadow-sm",
  /** A card on a muted section, so the card itself sits back. */
  muted: "rounded-2xl border border-slate-200/90 bg-slate-50/50 p-7 shadow-sm",
  /** A large panel that frames a group of cards or a featured item. */
  panel: "rounded-3xl border border-slate-200/90 bg-white shadow-sm overflow-hidden",
  /** A dark panel, for the one high-emphasis block in a section. */
  dark: "rounded-3xl border border-slate-800 bg-slate-900 text-white shadow-xl",
  /** A low-emphasis strip of supporting notes beneath a grid. */
  note: "rounded-2xl border border-slate-200/80 bg-slate-50 p-5 text-xs text-slate-600",
} as const;

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: keyof typeof cardVariants;
  /** Adds the hover lift. Use only when the entire card is a link. */
  interactive?: boolean;
}

export function Card({
  variant = "card",
  interactive = false,
  className,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        cardVariants[variant],
        interactive &&
          "transition-all duration-200 hover:border-slate-300 hover:shadow-md",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

/**
 * A card heading, paired with `Card`. Owns the green shift on hover because
 * every card heading in the codebase did it and none of them did it
 * differently — it is a property of the card, not of the individual heading.
 * The card must carry `group` for the hover to fire.
 *
 * Composes `Heading` rather than restating the h3 treatment, so the card
 * heading and a standalone h3 cannot drift apart.
 */
export function CardTitle({ className, ...props }: Omit<HeadingProps, "level">) {
  return (
    <Heading
      level="h3"
      className={cn(
        "transition-colors group-hover:text-brand-forest-900",
        className
      )}
      {...props}
    />
  );
}
