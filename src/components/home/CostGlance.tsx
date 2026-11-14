import { SectionHead } from "@/components/ui/SectionHead";
import { Reveal } from "@/components/motion/Reveal";
import { CardStack, type StackItem } from "@/components/ui/CardStack";
import { Check } from "@/components/ui/Icons";
import { searchFor } from "@/data/keywords";
import { categoryName, getTreatment } from "@/data/treatments";

const SLUGS = ["hair-transplant", "gfc-hair-treatment", "prp-hair-treatment", "laser-hair-reduction", "hydrafacial"];

/** Typical cost ranges for the most-asked treatments (the same estimates shown on each treatment page), as a card stack. */
export function CostGlance() {
  const items: StackItem[] = SLUGS.flatMap((slug) => {
    const t = getTreatment(slug);
    const s = searchFor(slug);
    if (!t || !s) return [];
    return [
      {
        key: slug,
        href: `/treatments/${slug}#cost-title`,
        label: `${t.shortName}: typical cost ${s.cost.range} ${s.cost.unit}`,
        content: (
          <>
            <p className="text-[0.66rem] font-semibold tracking-[0.18em] text-vermilion uppercase">{categoryName(t.category)}</p>
            <p className="mt-2 font-display text-[1.4rem] leading-tight sm:text-2xl">{t.shortName}</p>
            <p className="mt-3 font-hero text-[1.5rem] leading-none sm:text-[1.75rem]">{s.cost.range}</p>
            <p className="mt-1 text-sm text-cocoa/70">{s.cost.unit} · typical range</p>
            <ul className="mt-3 space-y-1.5 text-[0.85rem] text-cocoa/75">
              {s.cost.factors.slice(0, 2).map((f) => (
                <li key={f} className="flex gap-2">
                  <Check className="mt-0.5 shrink-0 text-vermilion" /> {f}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[0.8rem] font-semibold text-vermilion">Full cost guide ↗</p>
          </>
        ),
      },
    ];
  });

  return (
    <section className="relative bg-cream py-16 md:py-24" aria-labelledby="costs-title">
      <div className="wrap grid items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHead
            eyebrow="Costs at a glance"
            title={<span id="costs-title">What do treatments cost?</span>}
            lead="Typical price ranges in India for our most-asked treatments. Your exact price depends on your assessment, and you always get a written quote first."
          />
          <Reveal delay={0.1}>
            <ul className="mt-8 space-y-3 text-cocoa/80">
              {["0% EMI options on transplants and treatment courses", "Your written quote lists sessions, medicines and follow-ups", "Free consultation every Wednesday"].map((x) => (
                <li key={x} className="flex gap-3">
                  <Check className="mt-1 shrink-0 text-vermilion" /> {x}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-xs text-cocoa/70">Ranges are typical Indian clinic pricing in 2026 and are for guidance only.</p>
          </Reveal>
        </div>
        <Reveal className="flex justify-center lg:col-span-7 lg:pl-8">
          <CardStack items={items} />
        </Reveal>
      </div>
    </section>
  );
}
