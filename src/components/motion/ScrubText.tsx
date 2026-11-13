"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { cn } from "@/lib/utils";

/** Words brighten one by one as the paragraph scrolls through the viewport. */
export function ScrubText({ text, className, highlight = [] }: { text: string; className?: string; highlight?: string[] }) {
  const ref = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;
      const split = SplitText.create(el, { type: "words", wordsClass: "scrub-word" });
      split.words.forEach((w) => {
        const clean = (w.textContent || "").replace(/[^\w]/g, "").toLowerCase();
        if (highlight.includes(clean)) (w as HTMLElement).classList.add("text-grad");
      });
      gsap.fromTo(
        split.words,
        { opacity: 0.14 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.1,
          scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 45%", scrub: 0.6 },
        }
      );
      return () => split.revert();
    },
    { scope: ref }
  );

  return (
    <p ref={ref} className={cn(className)}>
      {text}
    </p>
  );
}
