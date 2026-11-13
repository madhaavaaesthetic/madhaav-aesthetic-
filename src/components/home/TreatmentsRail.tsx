"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { getTreatment, categories, treatments } from "@/data/treatments";
import { TreatmentCard } from "@/components/ui/TreatmentCard";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { ArrowUpRight } from "@/components/ui/Icons";

const FEATURED = [
  "hair-transplant",
  "hair-loss-treatment",
  "gfc-hair-treatment",
  "prp-hair-treatment",
  "exosome-hair-treatment",
  "qr678-hair-treatment",
  "laser-hair-reduction",
  "hydrafacial",
  "pigmentation-treatment",
  "acne-treatment",
];

export function TreatmentsRail() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const t = track.current!;
        const distance = () => t.scrollWidth - window.innerWidth;
        const tween = gsap.to(t, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: section.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            onUpdate: (self) => bar.current && gsap.set(bar.current, { scaleX: self.progress }),
          },
        });
        t.querySelectorAll<HTMLElement>("[data-rail-card]").forEach((card) => {
          gsap.from(card, {
            yPercent: 12,
            rotate: 2,
            ease: "none",
            scrollTrigger: { trigger: card, containerAnimation: tween, start: "left right", end: "left 55%", scrub: true },
          });
        });
      });
    },
    { scope: section }
  );

  const featured = FEATURED.map((s) => getTreatment(s)!).filter(Boolean);

  return (
    <section ref={section} className="relative overflow-hidden bg-cream py-24 lg:flex lg:h-screen lg:items-center lg:py-0" aria-labelledby="treatments-title">
      <div ref={track} className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto px-[var(--gutter)] lg:w-max lg:snap-none lg:overflow-visible lg:gap-7 lg:pr-[10vw]">
        <div className="flex w-[85vw] shrink-0 snap-start flex-col justify-center sm:w-[60vw] lg:w-[34vw] lg:pr-10">
          <p className="eyebrow flex items-center gap-3 text-vermilion">
            <span className="h-px w-8 bg-current" /> Treatments
          </p>
          <SplitReveal as="h2" id="treatments-title" className="mt-5 font-display text-title text-cocoa">
            Treatments for hair fall, baldness and skin problems
          </SplitReveal>
          <p className="mt-6 max-w-md text-lead text-cocoa/70">
            {treatments.length} doctor-led treatments, from FUE hair transplant and PRP to laser hair removal, Hydrafacial and acne care. Not sure which one you need? Your doctor will tell you at the consultation.
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {categories.map((c) => (
              <Link key={c.slug} href={`/treatments?c=${c.slug}`} className="rounded-full border border-cocoa/15 px-4 py-2 text-sm text-cocoa/80 transition-colors hover:border-vermilion hover:text-vermilion">
                {c.name}
              </Link>
            ))}
          </div>
        </div>

        {featured.map((t, i) => (
          <div key={t.slug} data-rail-card className="w-[78vw] shrink-0 snap-start sm:w-[46vw] lg:w-[23vw] lg:min-w-[300px]">
            <TreatmentCard t={t} index={i} className="h-full" />
          </div>
        ))}

        <Link
          href="/treatments"
          data-cursor="View all"
          className="group flex w-[70vw] shrink-0 snap-start flex-col justify-between rounded-[1.75rem] grad-ember p-8 text-shell sm:w-[40vw] lg:w-[22vw] lg:min-w-[280px]"
        >
          <span className="font-hero text-7xl">{treatments.length}</span>
          <span>
            <span className="block font-display text-4xl leading-tight">See all {treatments.length} treatments</span>
            <span className="mt-6 grid h-14 w-14 place-items-center rounded-full bg-shell text-2xl text-vermilion transition-transform duration-500 group-hover:rotate-45">
              <ArrowUpRight />
            </span>
          </span>
        </Link>
      </div>

      <div className="absolute bottom-10 left-[var(--gutter)] hidden h-px w-48 bg-cocoa/15 lg:block">
        <div ref={bar} className="h-full origin-left scale-x-0 bg-vermilion" />
      </div>
    </section>
  );
}
