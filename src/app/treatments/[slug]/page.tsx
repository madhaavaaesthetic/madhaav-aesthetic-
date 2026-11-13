import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTreatment, treatments, categoryName } from "@/data/treatments";
import { cities } from "@/data/locations";
import { PageHero } from "@/components/sections/PageHero";
import { TreatmentBody } from "@/components/sections/TreatmentBody";
import { FinalCta } from "@/components/home/FinalCta";
import { JsonLd } from "@/components/ui/JsonLd";
import { faqLd, pageMeta, treatmentLd } from "@/lib/seo";
import { searchFor } from "@/data/keywords";
import { keywordsFor } from "@/lib/page-keywords";
import Link from "next/link";
import { lower } from "@/lib/utils";

export const dynamicParams = false;

export function generateStaticParams() {
  return treatments.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const t = getTreatment(slug);
  if (!t) return {};
  return pageMeta({
    title: `${t.name}: Cost, Procedure, Results & Best Clinic | Madhaav Aesthetic`,
    description: `${t.summary.split(". ")[0]}. ${searchFor(t.slug) ? `Typical cost ${searchFor(t.slug)!.cost.range.split(" (")[0]} ${searchFor(t.slug)!.cost.unit}. ` : ""}Clinics in Berhampur, Thane West & Bhiwadi · 0% EMI.`.slice(0, 300),
    path: `/treatments/${t.slug}`,
    image: t.image,
    keywords: [...keywordsFor(`/treatments/${t.slug}`), ...t.keywords, ...(searchFor(t.slug)?.short ?? []), ...(searchFor(t.slug)?.long ?? []), ...(searchFor(t.slug)?.hinglish ?? [])],
  });
}

export default async function TreatmentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const t = getTreatment(slug);
  if (!t) notFound();
  const sr = searchFor(t.slug);
  const faqs = sr
    ? [...t.faqs, { q: `What is the cost of ${lower(t.shortName)} in India?`, a: `${t.name} typically costs ${sr.cost.range} ${sr.cost.unit}. The exact price depends on ${sr.cost.factors.join(", ").toLowerCase()}. Madhaav Aesthetic gives a written quote after consultation, with 0% EMI options.` }]
    : t.faqs;

  return (
    <>
      <PageHero
        crumbs={[{ name: "Treatments", path: "/treatments" }, { name: t.name, path: `/treatments/${t.slug}` }]}
        eyebrow={categoryName(t.category)}
        title={t.name}
        lead={<p>{t.summary}</p>}
        image={t.image}
        imageAlt={t.imageAlt}
        waMessage={`Hi Madhaav Aesthetic, I'd like to know more about ${t.name}.`}
        bookHref={`/contact?treatment=${encodeURIComponent(t.name)}`}
      >
        <div className="mt-10">
          <p className="eyebrow text-cocoa/70">Available at</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {cities.map((c) => (
              <Link key={c.slug} href={`/${c.slug}/${t.slug}`} className="rounded-full bg-shell px-4 py-2 text-sm text-cocoa ring-1 ring-cocoa/10 hover:text-vermilion">
                {t.shortName} in {c.name}
              </Link>
            ))}
          </div>
        </div>
      </PageHero>
      <TreatmentBody t={t} faqs={faqs} pageTerms={keywordsFor(`/treatments/${t.slug}`)} />
      <FinalCta title={`Ready to talk about ${lower(t.shortName)}?`} message={`Hi Madhaav Aesthetic, I'd like to book a consultation for ${t.name}.`} />
      <JsonLd data={[treatmentLd(t, `/treatments/${t.slug}`), faqLd(faqs)]} />
    </>
  );
}
