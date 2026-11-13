import Link from "next/link";
import type { Treatment } from "@/data/types";
import { searchFor } from "@/data/keywords";
import { Reveal } from "@/components/motion/Reveal";
import { whatsappLink } from "@/lib/site";
import { Check, Wallet, WhatsApp } from "@/components/ui/Icons";
import { lower } from "@/lib/utils";

export function CostSection({ t, place }: { t: Treatment; place?: string }) {
  const s = searchFor(t.slug);
  if (!s) return null;
  const where = place ? ` in ${place}` : "";
  return (
    <section className="py-16 md:py-20" aria-labelledby="cost-title">
      <div className="wrap grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="eyebrow flex items-center gap-3 text-vermilion">
            <span className="h-px w-8 bg-current" /> Cost & price
          </p>
          <h2 id="cost-title" className="mt-5 font-display text-title text-balance text-cocoa">
            How much does {lower(t.shortName)} cost{where}?
          </h2>
          <p className="mt-5 text-cocoa/70">
            Transparent pricing with a written quote after your consultation, so there are no surprises. 0% EMI lets you spread the cost.
          </p>
        </div>
        <Reveal className="lg:col-span-7">
          <div className="relative overflow-hidden rounded-[2rem] bg-night text-shell">
            <div aria-hidden className="glow -top-24 -right-16 h-72 w-80 opacity-50" />
            <div className="glass-dark relative m-3 grid gap-6 rounded-[1.5rem] p-7 md:m-4 md:grid-cols-[1fr_auto] md:items-end md:p-8">
              <div>
                <p className="eyebrow text-ember">Typical range{where}</p>
                <p className="mt-3 font-hero text-[clamp(1.8rem,3.6vw,3rem)] leading-tight">{s.cost.range}</p>
                <p className="mt-1 text-shell/60">{s.cost.unit}</p>
              </div>
              <span className="grid h-16 w-16 place-items-center rounded-full grad-ember text-3xl">
                <Wallet />
              </span>
            </div>
            <div className="relative p-8 pt-5 md:p-10 md:pt-6">
              <p className="eyebrow text-shell/65">What changes the price</p>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {s.cost.factors.map((f) => (
                  <li key={f} className="flex gap-2.5 text-shell/80">
                    <Check className="mt-1 shrink-0 text-ember" /> {f}
                  </li>
                ))}
                <li className="flex gap-2.5 text-shell/80">
                  <Check className="mt-1 shrink-0 text-ember" /> 0% EMI available
                </li>
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={whatsappLink(`Hi Madhaav Aesthetic, what is the cost of ${t.name}${where}?`)} target="_blank" rel="noopener" className="btn btn-primary">
                  <WhatsApp /> Get my exact price
                </a>
                {t.category === "hair-restoration" && (
                  <Link href="/tools/hair-graft-calculator" className="btn btn-ghost text-shell">
                    Graft calculator
                  </Link>
                )}
              </div>
              <p className="mt-5 text-xs text-shell/65">Ranges reflect typical Indian clinic pricing in 2026 and are for guidance. Your final quote follows an in-person assessment.</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
