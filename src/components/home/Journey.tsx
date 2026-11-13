"use client";

import Image from "next/image";
import { InViewVideo } from "@/components/ui/InViewVideo";
import Link from "next/link";
import { useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import type { Treatment } from "@/data/types";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { ArrowUpRight } from "@/components/ui/Icons";

const SLIDES: { src: string; alt: string; video?: string }[] = [
  { src: "/images/brand-trichoscopy-scan.jpg", alt: "Doctor scanning the scalp with a trichoscope during a hair transplant consultation" },
  { src: "/images/hairline-measurement.jpg", alt: "Surgeon measuring and drawing a natural hairline before a hair transplant" },
  { src: "/images/operation-theatre.jpg", alt: "Hair transplant operation theatre prepared for a local-anaesthesia procedure" },
  { src: "/videos/fue-extraction-berhampur.webp", alt: "FUE graft extraction in the Berhampur operation theatre", video: "/videos/fue-extraction-berhampur.mp4" },
  { src: "/images/hair-transplant-surgery-team.jpg", alt: "Hair transplant team implanting grafts at natural angles" },
  { src: "/images/brand-hair-transplant-planning.jpg", alt: "Doctor reviewing hair growth with a patient at a follow-up visit" },
];

export function Journey({ steps }: { steps: Treatment["steps"] }) {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const q = gsap.utils.selector(el);
      const slides = q("[data-slide]");
      const reduce = prefersReducedMotion();
      gsap.set(slides, { clipPath: (i: number) => (i === 0 ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)") });

      const show = (i: number) => {
        setActive(i);
        slides.forEach((s, j) => {
          const visible = j <= i;
          gsap.to(s, { clipPath: visible ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)", duration: reduce ? 0 : 1.1, ease: "expo.inOut", overwrite: true });
          const img = s.querySelector("img, video");
          if (img && j === i && !reduce) gsap.fromTo(img, { scale: 1.18 }, { scale: 1, duration: 1.6, ease: "expo.out", overwrite: true });
        });
      };

      q("[data-step]").forEach((step, i) => {
        ScrollTrigger.create({ trigger: step, start: "top 55%", end: "bottom 55%", onToggle: (self) => self.isActive && show(i) });
        if (!reduce) gsap.fromTo(step, { y: 40 }, { y: 0, ease: "none", scrollTrigger: { trigger: step, start: "top 92%", end: "top 55%", scrub: true } }); // transform only: text stays full-contrast
      });
      if (!reduce) {
        gsap.fromTo(q("[data-line]"), { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: q("[data-steps]")[0], start: "top 60%", end: "bottom 60%", scrub: true } });
        q("[data-inline-pic]").forEach((pic) =>
          gsap.fromTo(pic, { clipPath: "inset(0% 100% 0% 0% round 1.25rem)" }, { clipPath: "inset(0% 0% 0% 0% round 1.25rem)", duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: pic, start: "top 85%", once: true } })
        );
      }
    },
    { scope: root }
  );

  return (
    <section ref={root} className="relative bg-shell py-16 md:py-24" aria-labelledby="journey-title">
      <div className="wrap grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-24">
            <p className="eyebrow flex items-center gap-3 text-vermilion">
              <span className="h-px w-8 bg-current" /> How a hair transplant works
            </p>
            <SplitReveal as="h2" id="journey-title" className="mt-5 font-display text-title text-cocoa">
              Your hair transplant in 6 simple steps
            </SplitReveal>
            <p className="mt-5 max-w-md text-cocoa/70">
              From the first scalp check to your final review, you know exactly what happens and when. The FUE procedure is done in one day by our hair transplant surgeon from Mumbai.
            </p>

            <div className="relative mt-8 hidden aspect-[4/3] overflow-hidden rounded-[1.75rem] bg-night lg:block xl:aspect-[5/4]">
              {SLIDES.map((s, i) => (
                <div key={s.src} data-slide className="absolute inset-0" style={{ zIndex: i, clipPath: i === 0 ? undefined : "inset(100% 0% 0% 0%)" }}>
                  {s.video ? (
                    <InViewVideo className="h-full w-full object-cover" src={s.video} poster={s.src} label={s.alt} />
                  ) : (
                    <Image src={s.src} alt={s.alt} fill sizes="(max-width:1280px) 40vw, 34vw" className="object-cover" />
                  )}
                </div>
              ))}
              <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-t from-night/70 via-transparent to-transparent" />
              <div className="glass absolute right-4 bottom-4 left-4 z-30 flex items-center justify-between gap-4 rounded-2xl px-5 py-3.5">
                <span className="font-display text-lg text-cocoa">{steps[active]?.title}</span>
                <span className="font-hero text-sm text-vermilion tabular-nums">
                  {String(active + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
                </span>
              </div>
              <div className="absolute top-4 left-4 z-30 flex gap-1.5">
                {SLIDES.map((s, i) => (
                  <span key={s.src} className={`h-1 rounded-full transition-all duration-500 ${i === active ? "w-8 bg-shell" : "w-3 bg-shell/40"}`} />
                ))}
              </div>
            </div>

            <Link href="/treatments/hair-transplant" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-vermilion link-underline">
              Hair transplant cost, recovery and FAQs <ArrowUpRight />
            </Link>
          </div>
        </div>

        <div className="relative lg:col-span-6 lg:col-start-7" data-steps>
          <div className="absolute top-2 bottom-2 left-[1.15rem] w-px bg-sand md:left-[1.4rem]" />
          <div data-line className="absolute top-2 bottom-2 left-[1.15rem] w-px origin-top bg-gradient-to-b from-ember via-vermilion to-crimson md:left-[1.4rem]" />
          <ol className="space-y-16 md:space-y-28 lg:py-[12vh]">
            {steps.map((s, i) => (
              <li key={s.title} data-step className="relative pl-14 md:pl-20">
                <span className={`absolute top-2 left-[0.65rem] h-5 w-5 rounded-full ring-4 ring-shell transition-colors duration-500 md:left-[0.9rem] ${i <= active ? "bg-vermilion" : "bg-sand"}`} />
                <span aria-hidden data-num={String(i + 1).padStart(2, "0")} className="block font-hero text-6xl leading-none text-sand before:content-[attr(data-num)] md:text-8xl" />
                <h3 className="mt-3 font-display text-heading text-cocoa">{s.title}</h3>
                <p className="mt-3 max-w-lg text-cocoa/70">{s.text}</p>
                <div data-inline-pic className="relative mt-5 aspect-[16/10] overflow-hidden rounded-[1.25rem] lg:hidden">
                  {SLIDES[i]?.video ? (
                    <InViewVideo className="h-full w-full object-cover" src={SLIDES[i].video} poster={SLIDES[i].src} label={SLIDES[i].alt} />
                  ) : (
                    <Image src={SLIDES[i]?.src ?? SLIDES[0].src} alt={SLIDES[i]?.alt ?? ""} fill sizes="92vw" className="object-cover" />
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
