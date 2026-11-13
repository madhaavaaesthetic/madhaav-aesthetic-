"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, SplitText, prefersReducedMotion } from "@/lib/gsap";
import { useLazyGSAP } from "@/lib/lazy-gsap";
import { cn } from "@/lib/utils";

interface Props {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  by?: "lines" | "words" | "chars";
  delay?: number;
  stagger?: number;
  /** Animate immediately instead of when scrolled into view. */
  immediate?: boolean;
  id?: string;
}

export function SplitReveal({ as: Tag = "div", children, className, by = "lines", delay = 0, stagger, immediate, id }: Props) {
  const ref = useRef<HTMLElement>(null);

  useLazyGSAP(ref, () => {
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;
      const split = SplitText.create(el, {
        type: by === "chars" ? "lines,words,chars" : by === "words" ? "lines,words" : "lines",
        mask: "lines",
        linesClass: "split-line",
        autoSplit: true,
        // Line/word splits read fine as-is; only char splits need the aria-label + hidden children.
        aria: by === "chars" ? "auto" : "none",
        onSplit(self) {
          const targets = by === "chars" ? self.chars : by === "words" ? self.words : self.lines;
          return gsap.from(targets, {
            yPercent: 115,
            rotate: by === "lines" ? 2.5 : 0,
            duration: 1.25,
            delay,
            stagger: stagger ?? (by === "chars" ? 0.018 : by === "words" ? 0.04 : 0.09),
            ease: "expo.out",
            scrollTrigger: immediate ? undefined : { trigger: el, start: "top 88%", once: true },
          });
        },
      });
      gsap.set(el, { autoAlpha: 1 });
      return () => split.revert();
  }, immediate);

  return (
    <Tag ref={ref} id={id} className={cn(className)}>
      {children}
    </Tag>
  );
}
