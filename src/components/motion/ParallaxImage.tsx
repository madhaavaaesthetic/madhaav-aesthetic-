"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { useLazyGSAP } from "@/lib/lazy-gsap";
import { cn } from "@/lib/utils";

interface Props {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  sizes?: string;
  priority?: boolean;
  /** Parallax travel as a percent of the image height. */
  amount?: number;
  /** Clip-path reveal when scrolled into view. */
  reveal?: boolean;
}

export function ParallaxImage({ src, alt, className, imgClassName, sizes = "(max-width: 768px) 100vw, 50vw", priority, amount = 12, reveal = true }: Props) {
  const wrap = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useLazyGSAP(wrap, () => {
      if (!wrap.current || !inner.current || prefersReducedMotion()) return;
      gsap.fromTo(
        inner.current,
        { yPercent: -amount / 2 },
        { yPercent: amount / 2, ease: "none", scrollTrigger: { trigger: wrap.current, start: "top bottom", end: "bottom top", scrub: true } }
      );
      if (reveal) {
        gsap.fromTo(
          wrap.current,
          { clipPath: "inset(18% 12% 18% 12% round 28px)" },
          { clipPath: "inset(0% 0% 0% 0% round 0px)", duration: 1.6, ease: "expo.out", scrollTrigger: { trigger: wrap.current, start: "top 85%", once: true } }
        );
        gsap.fromTo(inner.current.querySelector("img"), { scale: 1.25 }, { scale: 1, duration: 1.8, ease: "expo.out", scrollTrigger: { trigger: wrap.current, start: "top 85%", once: true } });
      }
  }, priority);

  return (
    <div ref={wrap} className={cn("relative overflow-hidden", className)}>
      <div ref={inner} className="absolute inset-x-0" style={{ top: `-${amount / 2}%`, bottom: `-${amount / 2}%` }}>
        <Image src={src} alt={alt} fill sizes={sizes} loading={priority ? "eager" : undefined} fetchPriority={priority ? "high" : undefined} className={cn("object-cover", imgClassName)} />
      </div>
    </div>
  );
}
