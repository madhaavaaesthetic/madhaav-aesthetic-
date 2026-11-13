"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

interface Props {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  y?: number;
  delay?: number;
  stagger?: number;
  /** Animate direct children one after another instead of the wrapper. */
  group?: boolean;
  start?: string;
}

export function Reveal({ as: Tag = "div", children, className, y = 48, delay = 0, stagger = 0.08, group, start = "top 88%" }: Props) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;
      const targets = group ? Array.from(el.children) : el;
      gsap.from(targets, {
        y,
        autoAlpha: 0,
        duration: 1.2,
        delay,
        stagger: group ? stagger : 0,
        ease: "expo.out",
        scrollTrigger: { trigger: el, start, once: true },
      });
    },
    { scope: ref }
  );

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
