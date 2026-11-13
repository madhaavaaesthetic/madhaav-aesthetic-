"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { getTreatment } from "@/data/treatments";
import { whatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";
import { ArrowRight, WhatsApp } from "@/components/ui/Icons";

type Key = "pattern" | "shedding" | "patchy" | "scalp" | "hormonal";

const QUESTIONS: { q: string; options: { label: string; score: Partial<Record<Key, number>> }[] }[] = [
  {
    q: "Where do you notice hair loss most?",
    options: [
      { label: "Receding hairline or temples", score: { pattern: 3 } },
      { label: "Crown / top of the head", score: { pattern: 2, hormonal: 1 } },
      { label: "Widening parting", score: { hormonal: 3, pattern: 1 } },
      { label: "Round, smooth bald patches", score: { patchy: 4 } },
      { label: "All over: more hair in the comb", score: { shedding: 3 } },
    ],
  },
  {
    q: "How did it start?",
    options: [
      { label: "Slowly, over years", score: { pattern: 2, hormonal: 1 } },
      { label: "Suddenly, within weeks", score: { shedding: 2, patchy: 2 } },
      { label: "After illness, fever, surgery or delivery", score: { shedding: 3 } },
      { label: "Not sure", score: {} },
    ],
  },
  {
    q: "Does anyone in your family have thinning hair?",
    options: [
      { label: "Yes, father's or mother's side", score: { pattern: 3, hormonal: 1 } },
      { label: "No", score: { shedding: 1, patchy: 1 } },
      { label: "Don't know", score: {} },
    ],
  },
  {
    q: "How does your scalp feel?",
    options: [
      { label: "Itchy, flaky or oily", score: { scalp: 3 } },
      { label: "Red, scaly patches", score: { scalp: 3 } },
      { label: "Normal", score: { pattern: 1 } },
    ],
  },
  {
    q: "Any of these apply to you?",
    options: [
      { label: "Irregular periods, PCOS or thyroid issues", score: { hormonal: 3 } },
      { label: "Crash diet, low iron or vegetarian diet low in protein", score: { shedding: 2 } },
      { label: "A lot of stress recently", score: { shedding: 2, patchy: 1 } },
      { label: "None of these", score: { pattern: 1 } },
    ],
  },
  {
    q: "What would you like to achieve?",
    options: [
      { label: "Stop the hair fall", score: { shedding: 1, scalp: 1 } },
      { label: "Regrow thinning areas", score: { pattern: 1, hormonal: 1 } },
      { label: "Restore a hairline or bald area permanently", score: { pattern: 2 } },
      { label: "Get bald patches to regrow", score: { patchy: 2 } },
    ],
  },
];

const RESULTS: Record<Key, { title: string; text: string; treatments: string[] }> = {
  pattern: { title: "Pattern hair loss is likely", text: "Your answers point towards androgenetic (genetic) hair loss. It is very treatable when caught early: medical therapy and regenerative treatments can slow it and thicken hair, and a transplant can restore areas that are already bald.", treatments: ["hair-loss-treatment", "gfc-hair-treatment", "hair-transplant"] },
  shedding: { title: "Shedding (telogen effluvium) is likely", text: "Sudden, all-over shedding often follows illness, stress, deficiencies or crash diets. Finding and correcting the trigger usually matters most, and regenerative therapy can speed recovery.", treatments: ["hair-loss-treatment", "prp-hair-treatment", "qr678-hair-treatment"] },
  patchy: { title: "Alopecia areata should be checked", text: "Round, smooth bald patches can signal alopecia areata, an autoimmune condition. The follicles are usually alive and respond to targeted treatment, so earlier is better.", treatments: ["alopecia-areata-treatment", "gfc-hair-treatment"] },
  scalp: { title: "Your scalp may be the problem", text: "Itchy, flaky or scaly scalps (dandruff, seborrhoeic dermatitis, fungal infection or psoriasis) inflame follicles and increase hair fall. Treating the scalp skin often comes first.", treatments: ["hair-loss-treatment", "fungal-infection-treatment", "psoriasis-treatment"] },
  hormonal: { title: "Hormonal or female-pattern thinning is likely", text: "A widening parting with hormonal symptoms often points to female pattern hair loss, PCOS or thyroid-related thinning. Blood tests and a scalp scan guide a plan that combines medical care with regrowth therapies.", treatments: ["female-hair-loss-treatment", "gfc-hair-treatment", "exosome-hair-treatment"] },
};

export function HairLossTest() {
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState<Record<Key, number>>({ pattern: 0, shedding: 0, patchy: 0, scalp: 0, hormonal: 0 });
  const done = step >= QUESTIONS.length;
  const top = (Object.entries(scores) as [Key, number][]).sort((a, b) => b[1] - a[1])[0][0];
  const res = RESULTS[top];

  const choose = (s: Partial<Record<Key, number>>) => {
    setScores((prev) => {
      const next = { ...prev };
      (Object.keys(s) as Key[]).forEach((k) => (next[k] += s[k] ?? 0));
      return next;
    });
    setStep((x) => x + 1);
  };

  return (
    <div className="mx-auto max-w-3xl">
      <div className="h-1.5 overflow-hidden rounded-full bg-sand">
        <motion.div className="h-full rounded-full grad-ember" animate={{ width: `${(Math.min(step, QUESTIONS.length) / QUESTIONS.length) * 100}%` }} transition={{ type: "spring", stiffness: 120, damping: 20 }} />
      </div>
      <div className="relative mt-10 min-h-[26rem]">
        <AnimatePresence mode="wait">
          {!done ? (
            <motion.div key={step} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}>
              <p className="eyebrow text-vermilion">
                Question {step + 1} of {QUESTIONS.length}
              </p>
              <h2 className="mt-4 font-display text-heading text-cocoa">{QUESTIONS[step].q}</h2>
              <div className="mt-8 grid gap-3">
                {QUESTIONS[step].options.map((o) => (
                  <button key={o.label} type="button" onClick={() => choose(o.score)} className="group flex items-center justify-between rounded-2xl bg-shell px-6 py-5 text-left text-cocoa ring-1 ring-cocoa/10 transition hover:bg-cocoa hover:text-shell">
                    {o.label}
                    <ArrowRight className="opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100" />
                  </button>
                ))}
              </div>
              {step > 0 && (
                <button type="button" onClick={() => setStep((s) => s - 1)} className="mt-6 text-sm text-cocoa/70 link-underline">
                  ← Back
                </button>
              )}
            </motion.div>
          ) : (
            <motion.div key="result" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="rounded-[2rem] bg-night p-8 text-shell md:p-12">
              <p className="eyebrow text-ember">Your result</p>
              <h2 className="mt-4 font-display text-title">{res.title}</h2>
              <p className="mt-5 text-shell/75">{res.text}</p>
              <p className="eyebrow mt-8 text-shell/65">Worth reading</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {res.treatments.map((s) => {
                  const t = getTreatment(s);
                  return t ? (
                    <Link key={s} href={`/treatments/${s}`} className="rounded-full bg-shell/10 px-4 py-2 text-sm hover:bg-shell/20">
                      {t.name}
                    </Link>
                  ) : null;
                })}
              </div>
              <div className="mt-10 flex flex-wrap gap-3">
                <a href={whatsappLink(`Hi Madhaav Aesthetic, I took the hair loss self-test. Result: ${res.title}. I'd like a consultation.`)} target="_blank" rel="noopener" className={cn("btn btn-primary")}>
                  <WhatsApp /> Book a scalp analysis
                </a>
                <button type="button" onClick={() => { setStep(0); setScores({ pattern: 0, shedding: 0, patchy: 0, scalp: 0, hormonal: 0 }); }} className="btn btn-ghost text-shell">
                  Retake
                </button>
              </div>
              <p className="mt-6 text-xs text-shell/65">This self-test is educational and is not a diagnosis. Only an examination by a doctor can confirm the cause of hair loss.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
