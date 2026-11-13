"use client";

import { useRef } from "react";
import { gsap, SplitText, prefersReducedMotion } from "@/lib/gsap";
import { useLazyGSAP } from "@/lib/lazy-gsap";
import { cn } from "@/lib/utils";

/** Words brighten one by one as the paragraph scrolls through the viewport. */
export function ScrubText({ text, className, highlight = [] }: { text: string; className?: string; highlight?: string[] }) {
  const ref = useRef<HTMLParagraphElement>(null);

  useLazyGSAP(ref, () => {
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;
      const split = SplitText.create(el, { type: "words", wordsClass: "scrub-word", aria: "none" });
      split.words.forEach((w) => {
        const clean = (w.textContent || "").replace(/[^\w]/g, "").toLowerCase();
        if (highlight.includes(clean)) (w as HTMLElement).classList.add("text-grad");
      });
      gsap.fromTo(
        split.words,
        { opacity: 0.52 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.1,
          scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 45%", scrub: 0.6 },
        }
      );
      return () => split.revert();
  });

  return (
    <p ref={ref} className={cn(className)}>
      {text}
    </p>
  );
}
