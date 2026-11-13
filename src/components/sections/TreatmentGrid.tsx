"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, LayoutGroup, m } from "motion/react";
import { categories, treatments } from "@/data/treatments";
import type { TreatmentCategory } from "@/data/types";
import { TreatmentCard } from "@/components/ui/TreatmentCard";
import { cn } from "@/lib/utils";

type Cat = TreatmentCategory | "all";

/** The fallback renders the full "all" grid, so the static HTML always lists every treatment. */
export function TreatmentGrid() {
  return (
    <Suspense fallback={<Grid initial="all" />}>
      <GridFromUrl />
    </Suspense>
  );
}

function GridFromUrl() {
  const c = useSearchParams().get("c");
  const initial: Cat = c && categories.some((x) => x.slug === c) ? (c as TreatmentCategory) : "all";
  return <Grid key={initial} initial={initial} />;
}

function Grid({ initial }: { initial: Cat }) {
  const [cat, setCat] = useState<Cat>(initial);
  const list = cat === "all" ? treatments : treatments.filter((t) => t.category === cat);
  const blurb = categories.find((c) => c.slug === cat)?.blurb;

  return (
    <section className="pb-16 md:pb-20">
      <div className="wrap">
        <LayoutGroup>
          <div role="tablist" aria-label="Filter treatments" className="no-scrollbar -mx-[var(--gutter)] flex gap-2 overflow-x-auto px-[var(--gutter)] pb-2">
            {[{ slug: "all" as const, name: "All" }, ...categories].map((c) => {
              const active = cat === c.slug;
              return (
                <button
                  key={c.slug}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setCat(c.slug)}
                  className={cn("relative shrink-0 rounded-full px-5 py-2.5 text-sm font-medium transition-colors", active ? "text-shell" : "text-cocoa/75 hover:text-cocoa")}
                >
                  {active && <m.span layoutId="cat-pill" className="absolute inset-0 rounded-full bg-cocoa" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
                  <span className="relative">{c.name}</span>
                </button>
              );
            })}
          </div>
          <AnimatePresence mode="wait">
            {blurb && (
              <m.p key={cat} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-6 max-w-2xl text-cocoa/70">
                {blurb}
              </m.p>
            )}
          </AnimatePresence>
          <m.div layout className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <AnimatePresence mode="popLayout">
              {list.map((t, i) => (
                <m.div
                  key={t.slug}
                  layout
                  initial={{ opacity: 0, y: 30, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: Math.min(i, 8) * 0.03 }}
                >
                  <TreatmentCard t={t} className="h-full" />
                </m.div>
              ))}
            </AnimatePresence>
          </m.div>
        </LayoutGroup>
      </div>
    </section>
  );
}
