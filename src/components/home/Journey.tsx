"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { InViewVideo } from "@/components/ui/InViewVideo";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import type { Treatment } from "@/data/types";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { ArrowUpRight } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";

const SLIDES: { src: string; alt: string; video?: string }[] = [
  { src: "/images/brand-trichoscopy-scan.jpg", alt: "Doctor scanning the scalp with a trichoscope during a hair transplant consultation" },
  { src: "/images/hairline-measurement.jpg", alt: "Surgeon measuring and drawing a natural hairline before a hair transplant" },
  { src: "/images/operation-theatre.jpg", alt: "Hair transplant operation theatre prepared for a local-anaesthesia procedure" },
  { src: "/videos/fue-extraction-berhampur.webp", alt: "FUE graft extraction in the Berhampur operation theatre", video: "/videos/fue-extraction-berhampur.mp4" },
  { src: "/images/hair-transplant-surgery-team.jpg", alt: "Hair transplant team implanting grafts at natural angles" },
  { src: "/images/brand-hair-transplant-planning.jpg", alt: "Doctor reviewing hair growth with a patient at a follow-up visit" },
];

const num = (i: number) => String(i + 1).padStart(2, "0");

function Media({ i, sizes, className }: { i: number; sizes: string; className?: string }) {
  const s = SLIDES[i] ?? SLIDES[0];
  return s.video ? (
    <InViewVideo className={cn("h-full w-full object-cover", className)} src={s.video} poster={s.src} label={s.alt} />
  ) : (
    <Image src={s.src} alt={s.alt} fill sizes={sizes} className={cn("object-cover", className)} />
  );
}

/** Text laid over the bottom of a photo on a translucent gradient. */
function Caption({ i, title, text, className }: { i: number; title: string; text: string; className?: string }) {
  return (
    <div className={cn("absolute inset-x-0 bottom-0 z-20 p-6 text-shell md:p-9", className)}>
      <p className="font-hero text-sm tracking-[0.2em] text-ember tabular-nums">
        {num(i)} <span className="text-shell/60">/ {num(SLIDES.length - 1)}</span>
      </p>
      <h3 className="mt-2 font-display text-[clamp(1.6rem,2.6vw,2.4rem)] leading-tight">{title}</h3>
      <p className="mt-2.5 max-w-xl text-[0.98rem] leading-relaxed text-shell/85">{text}</p>
    </div>
  );
}

const SHADE = "pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[72%] bg-gradient-to-t from-night/90 via-night/55 to-transparent backdrop-blur-[1px]";

export function Journey({ steps }: { steps: Treatment["steps"] }) {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const q = gsap.utils.selector(el);
      const reduce = prefersReducedMotion();
      const slides = q("[data-slide]");
      gsap.set(slides, { clipPath: (i: number) => (i === 0 ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)") });

      const show = (i: number) => {
        setActive(i);
        slides.forEach((s, j) => {
          gsap.to(s, { clipPath: j <= i ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)", duration: reduce ? 0 : 1.1, ease: "expo.inOut", overwrite: true });
          const media = s.querySelector("img, video");
          if (media && j === i && !reduce) gsap.fromTo(media, { scale: 1.15 }, { scale: 1, duration: 1.6, ease: "expo.out", overwrite: true });
        });
      };

      // Desktop: invisible markers along the right column drive which step the sticky photo shows.
      q("[data-marker]").forEach((m, i) => {
        ScrollTrigger.create({ trigger: m, start: "top 60%", end: "bottom 60%", onToggle: (self) => self.isActive && show(i) });
      });

      // Phones: each photo card wipes in and its caption rises as it scrolls into view.
      if (!reduce) {
        q("[data-card]").forEach((card) => {
          gsap.fromTo(card, { clipPath: "inset(12% 6% 0% 6% round 1.75rem)" }, { clipPath: "inset(0% 0% 0% 0% round 1.75rem)", ease: "none", scrollTrigger: { trigger: card, start: "top 95%", end: "top 45%", scrub: true } });
          const cap = card.querySelector("[data-cap]");
          if (cap) gsap.from(cap, { y: 30, autoAlpha: 0, duration: 1, ease: "expo.out", scrollTrigger: { trigger: card, start: "top 70%", once: true } });
        });
      }
    },
    { scope: root }
  );

  return (
    <section ref={root} className="relative bg-shell py-16 md:py-24" aria-labelledby="journey-title">
      <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-14">
        {/* Left: introduction and a step index that follows the scroll */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-24">
            <p className="eyebrow flex items-center gap-3 text-vermilion">
              <span className="h-px w-8 bg-current" /> How a hair transplant works
            </p>
            <SplitReveal as="h2" id="journey-title" className="mt-4 font-display text-title text-cocoa lg:text-[clamp(2.2rem,min(3.3vw,6.4svh),3.4rem)] lg:leading-[1.04]">
              Your hair transplant in 6 simple steps
            </SplitReveal>
            <p className="mt-4 max-w-md text-cocoa/70">
              From the first scalp check to your final review, you know exactly what happens and when. The FUE procedure is done in one day by our hair transplant surgeons from Mumbai.
            </p>
            <ol className="mt-6 hidden lg:block" aria-label="Steps">
              {steps.map((s, i) => (
                <li key={s.title} className="flex items-baseline gap-4 border-b border-cocoa/10 py-[min(0.6rem,1.1svh)]">
                  <span className={cn("font-hero text-sm tabular-nums transition-colors duration-500", i === active ? "text-vermilion" : "text-cocoa/70")}>{num(i)}</span>
                  <span className={cn("font-display text-lg transition-colors duration-500", i === active ? "font-semibold text-cocoa" : "text-cocoa/75")}>{s.title}</span>
                </li>
              ))}
            </ol>
            <Link href="/treatments/hair-transplant" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-vermilion link-underline">
              Hair transplant cost, recovery and FAQs <ArrowUpRight />
            </Link>
          </div>
        </div>

        {/* Right (desktop): one tall sticky photo; the active step's text sits on a translucent gradient at its foot */}
        <div className="relative hidden lg:col-span-7 lg:block" style={{ height: `${steps.length * 70}vh` }}>
          {steps.map((s, i) => (
            <div key={s.title} data-marker aria-hidden className="absolute inset-x-0" style={{ top: `${i * 70}vh`, height: "70vh" }} />
          ))}
          <div className="sticky top-24 h-[calc(100vh-8rem)] overflow-hidden rounded-[2rem] bg-night">
            {SLIDES.map((s, i) => (
              <div key={s.src} data-slide className="absolute inset-0" style={{ zIndex: i, clipPath: i === 0 ? undefined : "inset(100% 0% 0% 0%)" }}>
                <Media i={i} sizes="(max-width:1280px) 56vw, 52vw" />
              </div>
            ))}
            <div className={SHADE} />
            {steps.map((s, i) => (
              <Caption
                key={s.title}
                i={i}
                title={s.title}
                text={s.text}
                className={cn("transition-all duration-700 ease-[var(--ease-expo)]", i === active ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0")}
              />
            ))}
            <div className="absolute top-6 left-6 z-30 flex gap-1.5">
              {SLIDES.map((s, i) => (
                <span key={s.src} className={`h-1 rounded-full transition-all duration-500 ${i === active ? "w-8 bg-shell" : "w-3 bg-shell/40"}`} />
              ))}
            </div>
          </div>
        </div>

        {/* Phones and tablets: a photo card per step with its text over the image */}
        <ol className="space-y-6 lg:hidden">
          {steps.map((s, i) => (
            <li key={s.title} data-card className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-night sm:aspect-[4/3]">
              <Media i={i} sizes="92vw" />
              <div className={SHADE} />
              <div data-cap>
                <Caption i={i} title={s.title} text={s.text} />
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
