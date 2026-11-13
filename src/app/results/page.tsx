import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { GrowthTimeline } from "@/components/home/GrowthTimeline";
import { FinalCta } from "@/components/home/FinalCta";
import { Reveal } from "@/components/motion/Reveal";
import { getTreatment } from "@/data/treatments";
import type { Treatment } from "@/data/types";
import Link from "next/link";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "What Results to Expect – Hair Transplant, PRP, GFC & Skin Timelines | Madhaav",
  description: "Realistic, month-by-month timelines for hair transplant, PRP, GFC, laser hair reduction and skin treatments, explained by our doctors.",
  path: "/results",
  keywords: ["hair transplant results timeline", "PRP results", "GFC results", "when will I see results after hair transplant", "laser hair removal results"],
});

const SHOWN = ["hair-transplant", "gfc-hair-treatment", "prp-hair-treatment", "laser-hair-reduction", "pigmentation-treatment", "acne-treatment"];

export default function ResultsPage() {
  const list = SHOWN.map((s) => getTreatment(s)).filter(Boolean) as Treatment[];
  return (
    <>
      <PageHero
        crumbs={[{ name: "What to expect", path: "/results" }]}
        eyebrow="Results timeline"
        title="When will you see results?"
        lead={
          <p>
            Here is what typically happens, and when, for our most common hair and skin treatments, so you know exactly what to expect. Your doctor will set expectations for you personally.
          </p>
        }
      />
      <GrowthTimeline />
      <section className="bg-shell py-16 md:py-20">
        <div className="wrap">
          <h2 className="font-display text-title text-cocoa">Timelines by treatment</h2>
          <Reveal group stagger={0.06} className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {list.map((t) => (
              <article key={t.slug} className="rounded-[1.75rem] bg-cream p-7 ring-1 ring-cocoa/8">
                <h3 className="font-display text-2xl text-cocoa">
                  <Link href={`/treatments/${t.slug}`} className="hover:text-vermilion">{t.name}</Link>
                </h3>
                <ol className="mt-5 space-y-4">
                  {t.timeline.map((x) => (
                    <li key={x.when} className="border-l-2 border-ember pl-4">
                      <p className="font-semibold text-cocoa">{x.when}</p>
                      <p className="text-sm text-cocoa/70">{x.what}</p>
                    </li>
                  ))}
                </ol>
              </article>
            ))}
          </Reveal>
        </div>
      </section>
      <FinalCta />
    </>
  );
}
