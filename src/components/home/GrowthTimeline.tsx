"use client";

import { useMemo, useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

const STAGES = [
  { when: "Day 1–10", title: "Grafts settle in", text: "Tiny crusts form around each graft and shed with gentle washing. Mild swelling can come and go.", h: 0.12 },
  { when: "Week 2–8", title: "Shock loss", text: "The transplanted shafts fall out while the roots stay safely under the skin. This is expected.", h: 0.03 },
  { when: "Month 3–4", title: "First sprouts", text: "Fine new hairs break through. They're thin at first, and growth support can help here.", h: 0.36 },
  { when: "Month 6", title: "Density builds", text: "Around half of the final density shows as the hairs thicken and lengthen.", h: 0.68 },
  { when: "Month 10–12", title: "Mature result", text: "Final density and texture for most people. Crowns can take up to 15 months.", h: 1 },
];

const HAIR_COUNT = 34;

/** Scroll-scrubbed illustration of graft growth. Results are explained with an illustration rather than patient photos. */
export function GrowthTimeline({ className }: { className?: string }) {
  const root = useRef<HTMLElement>(null);

  const hairs = useMemo(
    () =>
      Array.from({ length: HAIR_COUNT }, (_, i) => {
        const x = 40 + (i * 920) / (HAIR_COUNT - 1) + (i % 2 ? 6 : -6);
        const lean = ((i * 37) % 11) - 5;
        const len = 230 + ((i * 53) % 70);
        return { x, d: `M ${x} 360 C ${x + lean * 2} ${360 - len * 0.4}, ${x + lean * 6} ${360 - len * 0.75}, ${x + lean * 9} ${360 - len}` };
      }),
    []
  );

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const q = gsap.utils.selector(el);
      const strands = q("[data-hair]");
      const panels = q("[data-stage]");
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) {
        gsap.set(strands, { scaleY: 1 });
        return;
      }
      gsap.set(strands, { scaleY: 0, transformOrigin: "50% 100%" });
      gsap.set(panels.slice(1), { autoAlpha: 0, y: 30 });

      const mm = gsap.matchMedia();
      mm.add({ desktop: "(min-width: 768px)", mobile: "(max-width: 767px)" }, (ctx) => {
        const desktop = ctx.conditions?.desktop;
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: el,
            start: desktop ? "top top" : "top 70%",
            end: desktop ? "+=220%" : "bottom 30%",
            pin: desktop ? q("[data-pin]")[0] : false,
            scrub: 0.8,
            onUpdate: (self) => {
              const fill = q("[data-progress]")[0];
              if (fill) gsap.set(fill, { scaleX: self.progress });
            },
          },
        });
        STAGES.forEach((s, i) => {
          tl.to(strands, { scaleY: (j: number) => s.h * (0.82 + ((j * 13) % 7) / 30), duration: 1, stagger: { each: 0.01, from: "random" } }, i);
          if (i > 0) {
            tl.to(panels[i - 1], { autoAlpha: 0, y: -30, duration: 0.3 }, i - 0.05);
            tl.to(panels[i], { autoAlpha: 1, y: 0, duration: 0.3 }, i + 0.1);
          }
          tl.to(q(`[data-tick="${i}"]`), { color: "#e23b2a", duration: 0.2 }, i);
        });
        tl.to({}, { duration: 0.4 });
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} className={cn("relative bg-cream", className)} aria-labelledby="growth-title">
      <div data-pin className="relative flex min-h-screen flex-col justify-center overflow-hidden py-24">
        <div className="wrap grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow flex items-center gap-3 text-vermilion">
              <span className="h-px w-8 bg-current" /> Results timeline
            </p>
            <h2 id="growth-title" className="mt-5 font-display text-title text-cocoa">
              When will you see results after a hair transplant?
            </h2>
            <p className="mt-5 max-w-md text-cocoa/70">
              Hair grows slowly. Here is what usually happens, month by month. Your doctor will tell you what to expect in your case.
            </p>
            <div className="relative mt-10 min-h-[13rem] md:min-h-[11rem]">
              {STAGES.map((s, i) => (
                <div key={s.when} data-stage className={cn("absolute inset-0", i > 0 && "opacity-0")}>
                  <p className="font-hero text-4xl text-vermilion md:text-5xl">{s.when}</p>
                  <h3 className="mt-3 font-display text-heading text-cocoa">{s.title}</h3>
                  <p className="mt-2 max-w-md text-cocoa/70">{s.text}</p>
                  <span className="sr-only">Stage {i + 1} of {STAGES.length}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="relative overflow-hidden rounded-[2rem] bg-shell p-4 ring-1 ring-cocoa/8 md:p-8">
              <svg viewBox="0 0 1000 470" className="h-auto w-full" role="img" aria-label="Illustration of transplanted hair growing over twelve months">
                <defs>
                  <linearGradient id="skin" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#f4d9ca" />
                    <stop offset="1" stopColor="#e8bfa8" />
                  </linearGradient>
                  <linearGradient id="hair" x1="0" y1="1" x2="0" y2="0">
                    <stop offset="0" stopColor="#3a1d18" />
                    <stop offset="1" stopColor="#6b3a2e" />
                  </linearGradient>
                </defs>
                <rect x="0" y="360" width="1000" height="110" fill="url(#skin)" />
                <path d="M0 360 H1000" stroke="#c99a84" strokeWidth="2" />
                {hairs.map((h, i) => (
                  <g key={i}>
                    <ellipse cx={h.x} cy={392} rx={9} ry={16} fill="#a61e22" opacity={0.85} />
                    <path d={`M ${h.x} 392 L ${h.x} 360`} stroke="#a61e22" strokeWidth={3} />
                    <path data-hair d={h.d} stroke="url(#hair)" strokeWidth={4.5} strokeLinecap="round" fill="none" style={{ transformBox: "fill-box" }} />
                  </g>
                ))}
              </svg>
              <div className="mt-6 grid grid-cols-5 gap-2 text-center text-[0.7rem] font-semibold tracking-wide text-cocoa/70 uppercase md:text-xs">
                {STAGES.map((s, i) => (
                  <span key={s.when} data-tick={i}>
                    {s.when}
                  </span>
                ))}
              </div>
              <div className="mt-3 h-1 overflow-hidden rounded-full bg-sand">
                <div data-progress className="h-full origin-left scale-x-0 rounded-full grad-ember" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
