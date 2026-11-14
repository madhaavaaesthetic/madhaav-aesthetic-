"use client";

import Link from "next/link";
import { useRef, type CSSProperties, type ReactNode } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { cn } from "@/lib/utils";

/*
 * Cards that stack on top of one another as you scroll: each card sticks a little below the previous one, and the cards
 * underneath shrink and dim slightly as the next one slides over them. CSS-sticky, so it works the same with touch scrolling.
 */

export interface ScrollStackItem {
  key: string;
  content: ReactNode;
  href?: string;
  label?: string;
}

export function ScrollStack({ items, className }: { items: ScrollStackItem[]; className?: string }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el || prefersReducedMotion()) return;
      const cards = gsap.utils.toArray<HTMLElement>("[data-stack-card]", el);
      cards.forEach((card, i) => {
        const next = cards[i + 1];
        if (!next) return;
        const depth = cards.length - 1 - i; // cards further down the pile end up smaller
        const st = { trigger: next, start: "top 85%", end: "top 30%", scrub: true };
        gsap.to(card.firstElementChild, { scale: 1 - Math.min(depth, 4) * 0.035, ease: "none", scrollTrigger: st });
        // a soft cream veil (instead of a CSS filter, which renders muddy over shadows on some phones)
        gsap.to(card.querySelector("[data-veil]"), { opacity: 0.45, ease: "none", scrollTrigger: st });
      });
    },
    { scope: root }
  );

  return (
    <div ref={root} className={cn("relative", className)}>
      {items.map((it, i) => {
        const body = (
          <div className="relative origin-top rounded-[1.75rem] border border-cocoa/8 bg-[#fffdfb] p-6 text-cocoa shadow-[0_-18px_50px_-28px_rgba(58,29,24,0.35),0_30px_60px_-36px_rgba(58,29,24,0.4)] will-change-transform md:p-8">
            {it.content}
            <div data-veil aria-hidden className="pointer-events-none absolute inset-0 rounded-[1.75rem] bg-[#efe3d9] opacity-0" />
          </div>
        );
        return (
          <div
            key={it.key}
            data-stack-card
            className="sticky mb-6 last:mb-0 md:mb-10"
            style={{ top: `calc(var(--header-h) + 1.5rem + ${i} * 1.1rem)`, zIndex: i + 1 } as CSSProperties}
          >
            {it.href ? (
              <Link href={it.href} aria-label={it.label} className="block transition-transform duration-300 hover:-translate-y-0.5">
                {body}
              </Link>
            ) : (
              <div role="group" aria-label={it.label}>
                {body}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
