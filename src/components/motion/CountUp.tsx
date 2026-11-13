"use client";

import { useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { useLazyGSAP } from "@/lib/lazy-gsap";
import { cn } from "@/lib/utils";

export function CountUp({ value, decimals = 0, suffix = "", prefix = "", className }: { value: number; decimals?: number; suffix?: string; prefix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const format = (n: number) => `${prefix}${n.toLocaleString("en-IN", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}${suffix}`;

  useLazyGSAP(ref, () => {
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;
      const obj = { n: 0 };
      el.textContent = format(0);
      // A steady, clearly visible count (a strong ease-out made it look like an instant jump), started once the number is well in view.
      gsap.fromTo(el, { y: 14, autoAlpha: 0.3 }, { y: 0, autoAlpha: 1, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 85%", once: true } });
      gsap.to(obj, {
        n: value,
        duration: 2.6,
        ease: "power1.out",
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
        onUpdate: () => {
          el.textContent = format(obj.n);
        },
      });
  });

  return (
    <span ref={ref} className={cn("inline-block tabular-nums", className)}>
      {format(value)}
    </span>
  );
}
