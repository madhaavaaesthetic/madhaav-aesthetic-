"use client";

import { useState } from "react";
import { AnimatePresence, m } from "motion/react";
import type { FAQ } from "@/data/types";
import { cn } from "@/lib/utils";
import { Plus } from "./Icons";

export function Faq({ items, tone = "light" }: { items: FAQ[]; tone?: "light" | "dark" }) {
  const [open, setOpen] = useState<number | null>(0);
  const dark = tone === "dark";
  return (
    <div className={cn("border-t", dark ? "border-shell/15" : "border-cocoa/15")}>
      {items.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.q} className={cn("border-b", dark ? "border-shell/15" : "border-cocoa/15")}>
            <h3>
              <button
                type="button"
                id={`faq-q-${i}`}
                aria-controls={`faq-a-${i}`}
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group flex w-full items-start justify-between gap-6 py-6 text-left"
              >
                <span className={cn("font-display text-[1.35rem] leading-snug transition-colors md:text-2xl", isOpen ? "text-vermilion" : dark ? "text-shell" : "text-cocoa", "group-hover:text-vermilion")}>
                  {f.q}
                </span>
                <span
                  className={cn(
                    "mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-full border text-lg transition-all duration-500",
                    isOpen ? "rotate-45 border-vermilion bg-vermilion text-shell" : dark ? "border-shell/25" : "border-cocoa/20"
                  )}
                >
                  <Plus />
                </span>
              </button>
            </h3>
            {/* Answers stay in the DOM so crawlers and AI assistants can read them. */}
            <AnimatePresence initial={false}>
              <m.div
                id={`faq-a-${i}`}
                role="region"
                aria-labelledby={`faq-q-${i}`}
                initial={false}
                animate={isOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <p className={cn("max-w-3xl pb-7 text-[1.02rem] leading-relaxed", dark ? "text-shell/75" : "text-cocoa/75")}>{f.a}</p>
              </m.div>
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
