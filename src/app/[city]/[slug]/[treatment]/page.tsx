import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cities, getArea, getCity } from "@/data/locations";
import { coreTreatments, getTreatment, categoryName } from "@/data/treatments";
import { PageHero } from "@/components/sections/PageHero";
import { TreatmentBody } from "@/components/sections/TreatmentBody";
import { AreaLinks, ClinicCard, LocalProse } from "@/components/sections/LocalBlock";
import { FinalCta } from "@/components/home/FinalCta";
import { JsonLd } from "@/components/ui/JsonLd";
import { areaTreatmentContent } from "@/lib/local-content";
import { faqLd, pageMeta, regionCode, treatmentLd } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return cities.flatMap((c) => c.areas.flatMap((a) => coreTreatments.map((t) => ({ city: c.slug, slug: a.slug, treatment: t.slug }))));
}

type Params = Promise<{ city: string; slug: string; treatment: string }>;

function resolve(cs: string, as: string, ts: string) {
  const city = getCity(cs);
  const area = city && getArea(city, as);
  const t = getTreatment(ts);
  if (!city || !area || !t || !t.core) return null;
  return { city, area, t };
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const p = await params;
  const r = resolve(p.city, p.slug, p.treatment);
  if (!r) return {};
  const c = areaTreatmentContent(r.city, r.area, r.t);
  return pageMeta({
    title: c.metaTitle,
    description: c.description,
    path: `/${r.city.slug}/${r.area.slug}/${r.t.slug}`,
    image: r.t.image,
    keywords: [`${r.t.keywords[0]} near ${r.area.name}`, `${r.t.keywords[0]} ${r.area.name}`, `${r.t.keywords[0]} ${r.city.name}`, `${r.t.shortName} near me`],
    geo: { region: regionCode(r.city.state), placename: `${r.area.name}, ${r.city.name}`, lat: r.city.geo.lat, lng: r.city.geo.lng },
  });
}

export default async function AreaTreatmentPage({ params }: { params: Params }) {
  const p = await params;
  const r = resolve(p.city, p.slug, p.treatment);
  if (!r) notFound();
  const { city, area, t } = r;
  const c = areaTreatmentContent(city, area, t);
  const path = `/${city.slug}/${area.slug}/${t.slug}`;

  return (
    <>
      <PageHero
        crumbs={[
          { name: city.displayName, path: `/${city.slug}` },
          { name: area.name, path: `/${city.slug}/${area.slug}` },
          { name: t.shortName, path },
        ]}
        eyebrow={`${categoryName(t.category)} · near ${area.name}`}
        title={c.h1}
        lead={<p>{c.intro[0]}</p>}
        image={t.image}
        imageAlt={t.imageAlt}
        waMessage={`Hi Madhaav Aesthetic, I live near ${area.name} and want to know about ${t.name}.`}
        bookHref={`/contact?clinic=${city.slug}&treatment=${encodeURIComponent(t.name)}`}
      />
      <TreatmentBody
        t={t}
        faqs={c.faqs}
        placeLabel={area.name}
        citySlug={city.slug === "new-delhi" ? "bhiwadi" : city.slug}
        relatedHref={(s) => (getTreatment(s)?.core ? `/${city.slug}/${area.slug}/${s}` : `/${city.slug}/${s}`)}
        localSlot={<LocalProse city={city} area={area} localWhy={t.local[city.climate]} />}
      />
      <section className="pb-24 md:pb-32">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <ClinicCard city={city} />
          </div>
          <div className="space-y-10 lg:col-span-7">
            <AreaLinks city={city} treatmentSlug={t.slug} title={`${t.shortName} in other areas of ${city.name}`} />
            <p>
              <Link href={`/${city.slug}/${t.slug}`} className="font-semibold text-vermilion link-underline">
                {t.name} in {city.name} →
              </Link>
            </p>
          </div>
        </div>
      </section>
      <FinalCta title={`${t.shortName} near ${area.name}.`} message={`Hi Madhaav Aesthetic, I live near ${area.name} and would like to book ${t.name}.`} />
      <JsonLd data={[treatmentLd(t, path, `${area.name}, ${city.name}`), faqLd(c.faqs)]} />
    </>
  );
}
