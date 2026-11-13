import { emphasize } from "@/lib/emphasis";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cities, getArea, getCity } from "@/data/locations";
import { coreTreatments, getTreatment, treatments, categoryName } from "@/data/treatments";
import type { Area, City, Treatment } from "@/data/types";
import { PageHero } from "@/components/sections/PageHero";
import { TreatmentBody } from "@/components/sections/TreatmentBody";
import { AreaLinks, ClinicCard, LocalProse } from "@/components/sections/LocalBlock";
import { TreatmentCard } from "@/components/ui/TreatmentCard";
import { Faq } from "@/components/ui/Faq";
import { Reveal } from "@/components/motion/Reveal";
import { FinalCta } from "@/components/home/FinalCta";
import { JsonLd } from "@/components/ui/JsonLd";
import { areaContent, branchForCity, cityTreatmentContent } from "@/lib/local-content";
import { clinicLd, faqLd, pageMeta, regionCode, serviceAreaLd, treatmentLd } from "@/lib/seo";
import { keywordsFor } from "@/lib/page-keywords";
import { SearchTerms } from "@/components/sections/SearchTerms";

export const dynamicParams = false;

export function generateStaticParams() {
  return cities.flatMap((c) => [...treatments.map((t) => ({ city: c.slug, slug: t.slug })), ...c.areas.map((a) => ({ city: c.slug, slug: a.slug }))]);
}

type Params = Promise<{ city: string; slug: string }>;

function resolve(citySlug: string, slug: string) {
  const city = getCity(citySlug);
  if (!city) return null;
  const t = getTreatment(slug);
  if (t) return { city, t } as const;
  const area = getArea(city, slug);
  if (area) return { city, area } as const;
  return null;
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { city: cs, slug } = await params;
  const r = resolve(cs, slug);
  if (!r) return {};
  const { city } = r;
  const geo = { region: regionCode(city.state), placename: `${city.name}, ${city.state}`, lat: city.geo.lat, lng: city.geo.lng };
  if ("t" in r && r.t) {
    const c = cityTreatmentContent(city, r.t);
    return pageMeta({ title: c.metaTitle, description: c.description, path: `/${city.slug}/${r.t.slug}`, image: r.t.image, keywords: [...keywordsFor(`/${city.slug}/${r.t.slug}`), ...c.keywordsLine, ...r.t.keywords.slice(0, 6)], geo });
  }
  const area = r.area!;
  const c = areaContent(city, area);
  return pageMeta({
    title: c.metaTitle,
    description: c.description,
    path: `/${city.slug}/${area.slug}`,
    keywords: [...keywordsFor(`/${city.slug}/${area.slug}`), `skin clinic ${area.name}`, `hair fall treatment ${area.name}`],
    geo: { ...geo, placename: `${area.name}, ${city.name}, ${city.state}` },
  });
}

export default async function CitySlugPage({ params }: { params: Params }) {
  const { city: cs, slug } = await params;
  const r = resolve(cs, slug);
  if (!r) notFound();
  if ("t" in r && r.t) return <CityTreatment city={r.city} t={r.t} />;
  return <AreaPage city={r.city} area={r.area!} />;
}

function CityTreatment({ city, t }: { city: City; t: Treatment }) {
  const c = cityTreatmentContent(city, t);
  const path = `/${city.slug}/${t.slug}`;
  return (
    <>
      <PageHero
        crumbs={[
          { name: city.displayName, path: `/${city.slug}` },
          { name: `${t.shortName} in ${city.name}`, path },
        ]}
        eyebrow={`${categoryName(t.category)} · ${city.displayName}`}
        title={c.h1}
        lead={<p>{emphasize(c.intro[0])}</p>}
        image={t.image}
        imageAlt={`${t.imageAlt}, ${city.name}`}
        waMessage={`Hi Madhaav Aesthetic, I'd like to know about ${t.name} in ${city.name}.`}
        bookHref={`/contact?clinic=${city.slug}&treatment=${encodeURIComponent(t.name)}`}
      />
      <TreatmentBody
        t={t}
        faqs={c.faqs}
        placeLabel={city.name}
        citySlug={city.slug === "new-delhi" ? "bhiwadi" : city.slug}
        pageTerms={keywordsFor(path)}
        intro={[c.intro[1]]}
        relatedHref={(s) => `/${city.slug}/${s}`}
        localSlot={<LocalProse city={city} localWhy={c.localWhy} />}
      />
      <section className="pb-16 md:pb-20">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <ClinicCard city={city} />
          </div>
          <div className="space-y-10 lg:col-span-7">
            {t.core ? <AreaLinks city={city} treatmentSlug={t.slug} title={`${t.shortName} near you in ${city.name}`} /> : <AreaLinks city={city} />}
            <div>
              <p className="eyebrow text-vermilion">{t.shortName} in other cities</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {cities
                  .filter((x) => x.slug !== city.slug)
                  .map((x) => (
                    <li key={x.slug}>
                      <Link href={`/${x.slug}/${t.slug}`} className="inline-block rounded-full bg-shell px-4 py-2 text-sm ring-1 ring-cocoa/10 hover:text-vermilion">
                        {t.shortName} in {x.name}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
      <FinalCta title={`${t.shortName} in ${city.name}: let's talk.`} message={`Hi Madhaav Aesthetic, I'd like to book ${t.name} in ${city.name}.`} />
      <JsonLd data={[treatmentLd(t, path, city.name), faqLd(c.faqs), ...(city.clinic.verified ? [clinicLd(branchForCity(city))] : [])]} />
    </>
  );
}

function AreaPage({ city, area }: { city: City; area: Area }) {
  const c = areaContent(city, area);
  const path = `/${city.slug}/${area.slug}`;
  return (
    <>
      <PageHero
        crumbs={[
          { name: city.displayName, path: `/${city.slug}` },
          { name: area.name, path },
        ]}
        eyebrow={`${area.name} · ${city.name}, ${city.state}${area.pin ? ` · ${area.pin}` : ""}`}
        title={c.h1}
        lead={<p>{emphasize(c.intro[0])}</p>}
        aside={<ClinicCard city={city} />}
        waMessage={`Hi Madhaav Aesthetic, I live near ${area.name} and would like to book a consultation.`}
        bookHref={`/contact?clinic=${city.slug}`}
      />
      <section className="pb-16 md:pb-20">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <div className="prose-clinic lg:col-span-7">
            <h2 className="!mt-0">Hair and skin care for {area.name}</h2>
            <p>{emphasize(c.intro[1])}</p>
            <LocalProse city={city} area={area} />
            {area.landmarks.length > 0 && (
              <p>
                Landmarks around {area.name}: {area.landmarks.join(", ")}. Suggested route to the clinic: {area.route}.
              </p>
            )}
          </div>
          <div className="lg:col-span-5">
            <p className="eyebrow text-vermilion">Most booked from {area.name}</p>
            <ul className="mt-5 divide-y divide-cocoa/10 border-y border-cocoa/10">
              {coreTreatments.map((t) => (
                <li key={t.slug}>
                  <Link href={`/${city.slug}/${area.slug}/${t.slug}`} className="group flex items-center justify-between gap-4 py-4">
                    <span className="font-display text-xl text-cocoa group-hover:text-vermilion">{t.name}</span>
                    <span className="text-sm text-cocoa/70">near {area.name} →</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <section className="bg-shell py-16 md:py-20">
        <div className="wrap">
          <h2 className="font-display text-title text-cocoa">Treatments for patients from {area.name}</h2>
          <Reveal group stagger={0.05} className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {treatments.slice(0, 8).map((t) => (
              <TreatmentCard key={t.slug} t={t} href={t.core ? `/${city.slug}/${area.slug}/${t.slug}` : `/${city.slug}/${t.slug}`} />
            ))}
          </Reveal>
          <Link href={`/${city.slug}`} className="mt-10 inline-block font-semibold text-vermilion link-underline">
            See all treatments in {city.name} →
          </Link>
        </div>
      </section>
      <section className="py-16 md:py-20">
        <div className="wrap grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <AreaLinks city={city} title={`Other areas near ${city.name}`} />
          </div>
          <div className="lg:col-span-7">
            <h2 className="font-display text-title text-cocoa">{area.name}: common questions</h2>
            <div className="mt-8">
              <Faq items={c.faqs} />
            </div>
          </div>
        </div>
      </section>
      <SearchTerms title={`Related searches near ${area.name}`} terms={keywordsFor(path).map((label) => ({ label }))} />
      <FinalCta title={`Near ${area.name}? Let's talk.`} message={`Hi Madhaav Aesthetic, I live near ${area.name} and would like to book a consultation.`} />
      <JsonLd data={[serviceAreaLd(c.h1, path, [area.name, city.name], branchForCity(city)), faqLd(c.faqs)]} />
    </>
  );
}
