"use client";

import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { animate, m, AnimatePresence, useMotionValue, useTransform } from "motion/react";
import { GRAFT_TABLE, NorwoodHead } from "@/components/brand/NorwoodHead";
import { whatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";
import { WhatsApp } from "@/components/ui/Icons";

const DENSITY = [
  { key: "natural", label: "Natural", hint: "Soft, age-appropriate coverage", k: 0.88 },
  { key: "fuller", label: "Fuller", hint: "Noticeably denser front", k: 1 },
  { key: "max", label: "Maximum", hint: "Highest density the donor allows", k: 1.15 },
] as const;

const DONOR = [
  { key: "good", label: "Thick at the back" },
  { key: "average", label: "Average" },
  { key: "unsure", label: "Not sure" },
] as const;

function Num({ value }: { value: number }) {
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => Math.round(v / 10) * 10);
  const [txt, setTxt] = useState("0");
  useEffect(() => {
    // A calm count from the previous estimate to the new one (fast changes read as a flicker).
    const c = animate(mv, value, { duration: 2.2, ease: [0.22, 1, 0.36, 1] });
    const un = rounded.on("change", (v) => setTxt(v.toLocaleString("en-IN")));
    return () => {
      c.stop();
      un();
    };
  }, [value, mv, rounded]);
  return <>{txt}</>;
}

export function GraftCalculator() {
  return (
    <Suspense fallback={<Calculator initialStage={3} />}>
      <CalculatorFromUrl />
    </Suspense>
  );
}

function CalculatorFromUrl() {
  const s = Number(useSearchParams().get("stage"));
  const initial = s >= 1 && s <= 7 ? s : 3;
  return <Calculator key={initial} initialStage={initial} />;
}

function Calculator({ initialStage }: { initialStage: number }) {
  const [stage, setStage] = useState(initialStage);
  const [density, setDensity] = useState<(typeof DENSITY)[number]["key"]>("fuller");
  const [donor, setDonor] = useState<(typeof DONOR)[number]["key"]>("average");

  const row = GRAFT_TABLE[stage];
  const k = DENSITY.find((d) => d.key === density)!.k;
  const min = Math.round((row.min * k) / 50) * 50;
  const max = Math.round((row.max * k) / 50) * 50;
  const sessions = max > 4200 || (donor !== "good" && max > 3500) ? "1–2 sessions" : max === 0 ? "No surgery" : "1 session";
  const hairs = `${Math.round((min * 2.1) / 100) * 100}–${Math.round((max * 2.3) / 100) * 100}`;
  const message = `Hi Madhaav Aesthetic, I used the graft calculator: Norwood ${stage}, ${density} density, donor ${donor}. Estimate ${min}–${max} grafts. I'd like a personal assessment.`;

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="space-y-10 lg:col-span-7">
        <div>
          <p className="eyebrow text-vermilion">1 · Your hair loss stage (Norwood)</p>
          <div role="radiogroup" aria-label="Norwood stage" className="mt-5 grid grid-cols-4 gap-3 sm:grid-cols-7">
            {[1, 2, 3, 4, 5, 6, 7].map((n) => (
              <button
                key={n}
                type="button"
                role="radio"
                aria-checked={stage === n}
                onClick={() => setStage(n)}
                className={cn("rounded-2xl p-2.5 text-center ring-1 transition-all", stage === n ? "bg-shell ring-2 ring-vermilion shadow-lg" : "bg-shell/60 ring-cocoa/10 hover:bg-shell")}
              >
                <NorwoodHead stage={n} active={stage === n} />
                <span className="mt-1 block text-xs font-semibold text-cocoa">NW {n}</span>
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="eyebrow text-vermilion">2 · Density goal</p>
          <div role="radiogroup" aria-label="Density goal" className="mt-5 grid gap-3 sm:grid-cols-3">
            {DENSITY.map((d) => (
              <button key={d.key} type="button" role="radio" aria-checked={density === d.key} onClick={() => setDensity(d.key)} className={cn("rounded-2xl p-5 text-left ring-1 transition", density === d.key ? "bg-cocoa text-shell ring-cocoa" : "bg-shell ring-cocoa/10 hover:ring-cocoa/30")}>
                <span className="block font-display text-xl">{d.label}</span>
                <span className="mt-1 block text-sm opacity-70">{d.hint}</span>
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="eyebrow text-vermilion">3 · Hair at the back of your head</p>
          <div role="radiogroup" aria-label="Donor area" className="mt-5 flex flex-wrap gap-2">
            {DONOR.map((d) => (
              <button key={d.key} type="button" role="radio" aria-checked={donor === d.key} onClick={() => setDonor(d.key)} className={cn("rounded-full px-5 py-3 text-sm ring-1 transition", donor === d.key ? "bg-cocoa text-shell ring-cocoa" : "bg-shell text-cocoa ring-cocoa/15")}>
                {d.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="lg:col-span-5">
        <div className="sticky top-28 overflow-hidden rounded-[2rem] bg-night p-8 text-shell md:p-10" aria-live="polite">
          <div className="flex items-start justify-between gap-6">
            <div className="min-w-0">
              <p className="eyebrow text-ember">Estimated grafts</p>
              <p className="mt-3 font-hero text-[clamp(1.8rem,7.8vw,2.4rem)] leading-none whitespace-nowrap tabular-nums sm:text-[clamp(2rem,3.3vw,3.1rem)]">
                {max === 0 ? "—" : (
                  <>
                    <Num value={min} />–<Num value={max} />
                  </>
                )}
              </p>
            </div>
            <div className="w-16 shrink-0 md:w-24">
              <AnimatePresence mode="wait">
                <m.div key={stage} initial={{ opacity: 0, rotate: -10, scale: 0.8 }} animate={{ opacity: 1, rotate: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}>
                  <NorwoodHead stage={stage} active />
                </m.div>
              </AnimatePresence>
            </div>
          </div>
          <dl className="mt-8 grid grid-cols-2 gap-5 border-t border-shell/10 pt-6 text-sm">
            <div>
              <dt className="text-shell/65">Sessions</dt>
              <dd className="mt-1 font-display text-xl">{sessions}</dd>
            </div>
            <div>
              <dt className="text-shell/65">Approx. hairs</dt>
              <dd className="mt-1 font-display text-xl">{max === 0 ? "—" : hairs}</dd>
            </div>
            <div>
              <dt className="text-shell/65">Technique</dt>
              <dd className="mt-1 font-display text-xl">{max === 0 ? "Medical therapy" : "FUE"}</dd>
            </div>
            <div>
              <dt className="text-shell/65">Final result</dt>
              <dd className="mt-1 font-display text-xl">{max === 0 ? "3–6 months" : "10–12 months"}</dd>
            </div>
          </dl>
          <p className="mt-6 text-sm text-shell/70">{row.note}</p>
          <a href={whatsappLink(message)} target="_blank" rel="noopener" className="btn btn-primary mt-8 w-full">
            <WhatsApp /> Get my personal quote
          </a>
          <p className="mt-4 text-xs text-shell/65">
            An indicative estimate only. The exact graft count, cost and suitability are confirmed after an in-person donor and scalp examination. 0% EMI available. <Link href="/treatments/hair-transplant" className="underline">How transplants work</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
