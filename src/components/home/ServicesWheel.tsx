"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { Reveal } from "@/components/motion/Reveal";
import { ArrowUpRight } from "@/components/ui/Icons";

export interface ServiceCard {
  href: string;
  tag: string;
  title: string;
  text: string;
  image: string;
  imageAlt: string;
}

/**
 * "Our services" as a turning wheel: cards ride a large arc as you scroll — rising in from the right, standing upright
 * at the top, and tipping away to the left. The stage is CSS-sticky (no pinning), so it behaves the same with native
 * touch scrolling on phones as with smooth scrolling on desktop.
 */
export function ServicesWheel({ cards }: { cards: ServiceCard[] }) {
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = track.current;
      if (!el) return;
      const items = gsap.utils.toArray<HTMLElement>("[data-wheel-card]", el);
      const n = items.length;
      let R = 1, gap = 0, edge = 0;

      const measure = () => {
        const vw = window.innerWidth;
        const mobile = vw < 768;
        const cw = items[0].offsetWidth;
        R = mobile ? vw * 3.4 : Math.max(vw * 1.6, 1500);
        // Arc distance between neighbouring cards at the crest.
        gap = (cw + (mobile ? vw * 0.3 : Math.max(44, vw * 0.034))) / R;
        // Angle at which a card has fully left the side of the screen.
        edge = Math.asin(Math.min(0.99, (vw / 2 + cw * 0.6) / R));
      };

      const state = { p: 0 };
      const render = () => {
        // Start with the first card rising in from the right; end as the last one settles left of centre and leaves.
        const from = -edge * 0.55;
        const to = gap * (n - 1) + edge * 0.55;
        const offset = from + (to - from) * state.p;
        items.forEach((card, i) => {
          const th = gap * i - offset;
          const off = Math.abs(th) > edge * 1.05;
          gsap.set(card, {
            xPercent: -50,
            yPercent: -50,
            x: R * Math.sin(th),
            y: R * (1 - Math.cos(th)),
            rotation: (th * 180) / Math.PI,
            autoAlpha: off ? 0 : 1,
          });
        });
      };

      measure();
      render();
      gsap.to(state, {
        p: 1,
        ease: "none",
        onUpdate: render,
        scrollTrigger: { trigger: el, start: "top top", end: "bottom bottom", scrub: 0.7 },
      });
      const onResize = () => {
        measure();
        render();
      };
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    },
    { scope: track }
  );

  return (
    <section id="services" className="relative bg-shell" aria-labelledby="services-title">
      <div className="wrap pt-24 text-center md:pt-32">
        <Reveal>
          <span className="inline-flex rounded-full bg-white px-4 py-1.5 text-xs font-medium text-cocoa/75 shadow-[0_8px_24px_-14px_rgba(58,29,24,0.4)]">Our services</span>
        </Reveal>
        <SplitReveal as="h2" id="services-title" className="mx-auto mt-6 max-w-3xl font-display text-[clamp(2.4rem,5vw,4.6rem)] leading-[1.02] text-balance text-cocoa">
          Care chosen for your hair and skin.
        </SplitReveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-5 max-w-xl text-cocoa/70 md:text-lg">
            From the first diagnosis to long-term results, every treatment is planned and done by our doctors.
          </p>
        </Reveal>
      </div>

      <div ref={track} className="relative" style={{ height: `calc(${cards.length} * 46svh + 100svh)` }}>
        <div className="sticky top-0 h-[100svh] overflow-hidden">
          {cards.map((c, i) => (
            <Link
              key={c.href}
              href={c.href}
              data-wheel-card
              data-cursor="Explore"
              style={{ transform: "translate(-50%, -50%)", opacity: i === 0 ? 1 : 0 }}
              className="group absolute top-[48%] left-1/2 w-[min(70vw,300px)] rounded-[2rem] bg-white p-3 shadow-[0_40px_80px_-38px_rgba(58,29,24,0.45)] ring-1 ring-cocoa/5 will-change-transform md:w-[clamp(250px,20vw,310px)]"
            >
              <div className="relative aspect-[5/4] overflow-hidden rounded-[1.5rem] bg-blush">
                <Image
                  src={c.image}
                  alt={c.imageAlt}
                  fill
                  sizes="(max-width: 768px) 70vw, 20vw"
                  className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-expo)] group-hover:scale-[1.06]"
                />
              </div>
              <div className="px-3 pt-5 pb-4 text-center">
                <p className="text-[0.66rem] font-semibold tracking-[0.2em] text-vermilion uppercase">{c.tag}</p>
                <h3 className="mt-2 font-display text-[1.65rem] leading-[1.1] text-cocoa">{c.title}</h3>
                <p className="mx-auto mt-2.5 max-w-[16rem] text-[0.92rem] leading-relaxed text-cocoa/70">{c.text}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-[0.82rem] font-semibold text-cocoa transition-colors group-hover:text-vermilion">
                  Explore <ArrowUpRight />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
