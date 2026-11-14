"use client";

import Link from "next/link";
import { useState, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/*
 * A stack of skewed cards (same interaction as the review stack): each card sits a step behind the next, the back cards are
 * dimmed, and hovering (or tapping, on phones) a card brings it into view by sliding the cards in front of it aside.
 */

export interface StackItem {
  key: string;
  content: ReactNode;
  /** Optional link; on touch screens the first tap brings the card forward and the second opens the link. */
  href?: string;
  label?: string;
}

export function CardStack({ items, tone = "light", className }: { items: StackItem[]; tone?: "light" | "dark"; className?: string }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const [active, setActive] = useState<number | null>(null);
  const focus = hovered ?? active;
  const last = items.length - 1;
  const lit = focus ?? last;

  return (
    <div
      className={cn("card-stack grid place-items-start [grid-template-areas:'stack']", className)}
      style={{ ["--n" as string]: items.length } as CSSProperties}
      onMouseLeave={() => setHovered(null)}
    >
      {items.map((it, i) => {
        const pushed = focus !== null && i > focus;
        const style = { ["--i" as string]: i, ["--push" as string]: pushed ? 1 : 0 } as CSSProperties;
        const cls = cn(
          "card-stack-item relative block [grid-area:stack] w-[min(78vw,270px)] rounded-[1.6rem] p-5 transition-[transform,filter,opacity,box-shadow] duration-500 ease-[var(--ease-expo)] sm:w-[360px] sm:p-6",
          tone === "dark"
            ? "border border-shell/15 bg-[#26140f] text-shell shadow-[0_30px_60px_-30px_rgba(0,0,0,0.8)]"
            : "border border-cocoa/8 bg-[#fffdfb] text-cocoa shadow-[0_30px_70px_-34px_rgba(58,29,24,0.45)]",
          i !== lit && "card-stack-dim",
          active === i && "ring-2 ring-vermilion/40"
        );
        const events = {
          onMouseEnter: () => setHovered(i),
          onClick: (e: React.MouseEvent) => {
            const touch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
            if (touch && active !== i) {
              e.preventDefault();
              setActive(i);
            }
          },
        };
        return it.href ? (
          <Link key={it.key} href={it.href} aria-label={it.label} className={cls} style={style} {...events}>
            {it.content}
          </Link>
        ) : (
          <div key={it.key} className={cls} style={style} {...events} role="group" aria-label={it.label}>
            {it.content}
          </div>
        );
      })}
    </div>
  );
}
