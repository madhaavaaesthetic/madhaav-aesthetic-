import { emphasize } from "@/lib/emphasis";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { FAQ, Treatment } from "@/data/types";
import { getDoctor } from "@/data/doctors";
import { getTreatment } from "@/data/treatments";
import { Reveal } from "@/components/motion/Reveal";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { Faq } from "@/components/ui/Faq";
import { TreatmentCard } from "@/components/ui/TreatmentCard";
import { VideoCard } from "@/components/ui/VideoCard";
import { ArrowUpRight, Check, Shield } from "@/components/ui/Icons";
import { CostSection } from "./CostSection";
import { ReviewsSection } from "./ReviewsSection";
import { SearchTerms } from "./SearchTerms";
import { reviewsFor } from "@/data/reviews";
import { searchFor } from "@/data/keywords";
import { lower } from "@/lib/utils";

export function TreatmentBody({
  t,
  faqs,
  localSlot,
  relatedHref,
  intro,
  placeLabel,
  citySlug,
  pageTerms = [],
}: {
  t: Treatment;
  faqs: FAQ[];
  localSlot?: ReactNode;
  relatedHref?: (slug: string) => string;
  intro?: string[];
  placeLabel?: string;
  citySlug?: string;
  pageTerms?: string[];
}) {
  const related = t.related.map((s) => getTreatment(s)).filter(Boolean) as Treatment[];
  const showVideo = t.category === "hair-restoration";
  const search = searchFor(t.slug);
  const where = placeLabel ? ` in ${placeLabel}` : "";
  const generic = search ? [...search.short.map((k) => `${k}${where && !k.includes("near me") ? where.toLowerCase() : ""}`), ...search.long, ...search.hinglish] : [];
  const terms = [...new Set([...pageTerms, ...generic].map((k) => k.trim()))].map((label) => ({ label }));
  const reviewList = reviewsFor({ city: citySlug, treatment: t.slug, limit: 10 });

  return (
    <>
      <section className="border-y border-cocoa/10 bg-shell">
        <dl className="wrap grid grid-cols-2 md:grid-cols-4">
          {t.stats.map((s, i) => (
            <div key={s.label} className={`py-8 md:py-10 ${i % 2 ? "pl-6" : "pr-6"} md:px-8 ${i > 0 ? "md:border-l md:border-cocoa/10" : "md:pl-0"} ${i > 1 ? "border-t border-cocoa/10 md:border-t-0" : ""}`}>
              <dt className="eyebrow text-cocoa/70">{s.label}</dt>
              <dd className="mt-3 font-hero text-[clamp(1.4rem,2.6vw,2.2rem)] leading-none text-cocoa">{s.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="py-16 md:py-20">
        <div className="wrap grid gap-14 lg:grid-cols-12">
          <div className="prose-clinic lg:col-span-7">
            <h2 className="!mt-0">
              {t.shortName}
              {placeLabel ? ` in ${placeLabel}` : ""}: an overview
            </h2>
            {(intro ?? []).map((p) => (
              <p key={p}>{emphasize(p)}</p>
            ))}
            {t.intro.map((p) => (
              <p key={p}>{emphasize(p)}</p>
            ))}
            {localSlot}
          </div>
          <aside className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Reveal className="rounded-[1.75rem] bg-night p-8 text-shell md:p-10">
                <p className="eyebrow text-ember">Who is it for?</p>
                <ul className="mt-6 space-y-4">
                  {t.idealFor.map((x) => (
                    <li key={x} className="flex gap-3 text-shell/85">
                      <Check className="mt-1 shrink-0 text-ember" /> <span>{emphasize(x)}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className="btn btn-primary mt-8 w-full">
                  Book a consultation
                </Link>
              </Reveal>
              {showVideo && (
                <Reveal className="mt-5 grid grid-cols-2 gap-4" delay={0.1}>
                  <VideoCard src="/videos/fue-extraction-berhampur.mp4" poster="/videos/fue-extraction-berhampur.webp" title="Inside our OT" caption="FUE extraction" />
                  <div className="relative overflow-hidden rounded-[1.75rem]">
                    <Image src="/images/operation-theatre.jpg" alt="Hair transplant operation theatre" fill sizes="22vw" className="object-cover" />
                  </div>
                </Reveal>
              )}
            </div>
          </aside>
        </div>
      </section>

      {t.spotlight && (
        <section className="pb-16 md:pb-20" aria-labelledby="spotlight-title">
          <div className="wrap">
            <Reveal className="relative overflow-hidden rounded-[2rem] bg-white p-8 shadow-[0_40px_90px_-50px_rgba(58,29,24,0.45)] ring-1 ring-cocoa/8 md:p-12">
              <div aria-hidden className="glow -top-24 -right-20 h-72 w-80 opacity-25" />
              <div className="relative grid gap-10 lg:grid-cols-12">
                <div className="lg:col-span-7">
                  <p className="eyebrow text-vermilion">{t.spotlight.eyebrow}</p>
                  <h2 id="spotlight-title" className="mt-4 font-display text-[clamp(1.9rem,3.4vw,3rem)] leading-[1.1] text-cocoa">
                    {t.spotlight.title}
                  </h2>
                  <div className="mt-6 space-y-4 text-[1.02rem] leading-relaxed text-cocoa/80">
                    {t.spotlight.paragraphs.map((p) => (
                      <p key={p}>{emphasize(p)}</p>
                    ))}
                  </div>
                </div>
                <div className="lg:col-span-5">
                  <ul className="space-y-3 rounded-[1.5rem] bg-cream p-6 md:p-7">
                    {t.spotlight.points.map((pt) => (
                      <li key={pt} className="flex gap-3 text-cocoa/85">
                        <Check className="mt-1 shrink-0 text-vermilion" /> <span>{emphasize(pt)}</span>
                      </li>
                    ))}
                  </ul>
                  {t.spotlight.note && <p className="mt-4 text-sm text-cocoa/70">{t.spotlight.note}</p>}
                  <Link href="/contact" className="btn btn-dark mt-6 w-full">
                    Ask about {t.spotlight.eyebrow.split("·").pop()?.trim()}
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      <section className="bg-shell py-16 md:py-20">
        <div className="wrap">
          <p className="eyebrow flex items-center gap-3 text-vermilion">
            <span className="h-px w-8 bg-current" /> How it works
          </p>
          <SplitReveal as="h2" className="mt-5 max-w-3xl font-display text-title text-cocoa">
            {`Your ${lower(t.shortName)} step by step.`}
          </SplitReveal>
          <Reveal group stagger={0.08} className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {t.steps.map((s, i) => (
              <div key={s.title} className="group relative overflow-hidden rounded-[1.5rem] bg-cream p-7 ring-1 ring-cocoa/8 transition-colors duration-500 hover:bg-night hover:text-shell">
                <span aria-hidden data-num={String(i + 1).padStart(2, "0")} className="block font-hero text-5xl text-ember/80 before:content-[attr(data-num)]" />
                <h3 className="mt-5 font-display text-2xl">{s.title}</h3>
                <p className="mt-2 text-[0.96rem] opacity-75">{emphasize(s.text)}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="wrap grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow flex items-center gap-3 text-vermilion">
              <span className="h-px w-8 bg-current" /> What to expect
            </p>
            <SplitReveal as="h2" className="mt-5 font-display text-title text-cocoa">
              When will you see results?
            </SplitReveal>
            <ul className="mt-8 flex flex-wrap gap-2">
              {t.benefits.map((b) => (
                <li key={b} className="rounded-full bg-blush px-4 py-2 text-sm text-cocoa">
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <ol className="relative lg:col-span-7 before:absolute before:top-3 before:bottom-3 before:left-[7px] before:w-px before:bg-gradient-to-b before:from-ember before:via-vermilion before:to-crimson">
            {t.timeline.map((x) => (
              <Reveal as="li" key={x.when} className="relative pb-10 pl-10 last:pb-0">
                <span className="absolute top-2 left-0 h-[15px] w-[15px] rounded-full border-[3px] border-cream bg-vermilion" />
                <p className="font-hero text-2xl text-cocoa">{x.when}</p>
                <p className="mt-2 text-cocoa/70">{x.what}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <CostSection t={t} place={placeLabel} />

      <section className="bg-night py-16 text-shell md:py-20">
        <div className="wrap grid gap-12 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow text-ember">Aftercare</p>
            <h2 className="mt-5 font-display text-title">Aftercare: what to do after treatment</h2>
            <ul className="mt-8 space-y-3">
              {t.aftercare.map((a) => (
                <li key={a} className="flex gap-3 text-shell/80">
                  <Check className="mt-1 shrink-0 text-ember" /> {a}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1} className="self-end rounded-[1.75rem] bg-shell/5 p-8 ring-1 ring-shell/10">
            <Shield className="text-3xl text-ember" />
            <p className="mt-4 font-display text-2xl">Is it safe?</p>
            <p className="mt-3 text-shell/70">{t.safety}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              {t.doctors.map((d) => {
                const doc = getDoctor(d);
                if (!doc) return null;
                return (
                  <Link key={d} href={`/doctors/${d}`} className="flex items-center gap-3 rounded-full bg-shell/10 py-2 pr-4 pl-2 text-sm hover:bg-shell/20">
                    <span className="grid h-9 w-9 place-items-center rounded-full grad-ember font-semibold">{doc.initials}</span>
                    <span>
                      {doc.name}
                      <span className="block text-xs text-shell/60">{doc.credentials}</span>
                    </span>
                  </Link>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="wrap grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow flex items-center gap-3 text-vermilion">
              <span className="h-px w-8 bg-current" /> FAQs
            </p>
            <h2 className="mt-5 font-display text-title text-cocoa">
              {t.shortName}
              {placeLabel ? ` in ${placeLabel}` : ""}: your questions
            </h2>
          </div>
          <div className="lg:col-span-8">
            <Faq items={faqs} />
          </div>
        </div>
      </section>

      <ReviewsSection list={reviewList} title={`What patients say about ${lower(t.shortName)} at Madhaav`} />

      {related.length > 0 && (
        <section className="bg-shell py-16 md:py-20">
          <div className="wrap">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <h2 className="font-display text-title text-cocoa">Related treatments</h2>
              <Link href="/treatments" className="inline-flex items-center gap-2 font-semibold text-vermilion link-underline">
                All treatments <ArrowUpRight />
              </Link>
            </div>
            <Reveal group stagger={0.08} className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {related.slice(0, 4).map((r) => (
                <TreatmentCard key={r.slug} t={r} href={relatedHref ? relatedHref(r.slug) : undefined} />
              ))}
            </Reveal>
          </div>
        </section>
      )}
      <div className="pt-10">
        <SearchTerms title={`People also search for${where}`} terms={terms} />
      </div>
    </>
  );
}
