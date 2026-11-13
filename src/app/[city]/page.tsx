import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cities, getCity } from "@/data/locations";
import { treatments, coreTreatments } from "@/data/treatments";
import { PageHero } from "@/components/sections/PageHero";
import { AreaLinks, ClinicCard } from "@/components/sections/LocalBlock";
import { TreatmentCard } from "@/components/ui/TreatmentCard";
import { Faq } from "@/components/ui/Faq";
import { VideoCard } from "@/components/ui/VideoCard";
import { Reveal } from "@/components/motion/Reveal";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { FinalCta } from "@/components/home/FinalCta";
import { JsonLd } from "@/components/ui/JsonLd";
import { branchForCity, cityHubContent } from "@/lib/local-content";
import { clinicLd, faqLd, pageMeta, regionCode, serviceAreaLd } from "@/lib/seo";
import { ReviewsSection } from "@/components/sections/ReviewsSection";
import { BookingWidget } from "@/components/sections/BookingWidget";
import { SearchTerms } from "@/components/sections/SearchTerms";
import { reviewsFor } from "@/data/reviews";
import { keywordsFor } from "@/lib/page-keywords";

export const dynamicParams = false;

export function generateStaticParams() {
  return cities.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const { city: slug } = await params;
  const city = getCity(slug);
  if (!city) return {};
  const c = cityHubContent(city);
  return pageMeta({
    title: c.metaTitle,
    description: c.description,
    path: `/${city.slug}`,
    image: city.hero,
    keywords: [
      ...keywordsFor(`/${city.slug}`),
      ...city.aliases.flatMap((al) => [`hair transplant ${al}`, `dermatologist ${al}`, `skin clinic ${al}`]),
      ...coreTreatments.map((t) => `${t.keywords[0]} ${city.name}`),
      `hair clinic near me ${city.name}`,
    ],
    geo: { region: regionCode(city.state), placename: `${city.name}, ${city.state}`, lat: city.geo.lat, lng: city.geo.lng },
  });
}

export default async function CityPage({ params }: { params: Promise<{ city: string }> }) {
  const { city: slug } = await params;
  const city = getCity(slug);
  if (!city) notFound();
  const c = cityHubContent(city);
  const branch = branchForCity(city);
  const queryHref = (q: string) => {
    const map: [RegExp, string][] = [
      [/hair transplant/, "hair-transplant"], [/hair fall/, "hair-loss-treatment"], [/prp/i, "prp-hair-treatment"], [/gfc/i, "gfc-hair-treatment"],
      [/laser hair/, "laser-hair-reduction"], [/hydrafacial/, "hydrafacial"], [/hair doctor|hair clinic/, "hair-loss-treatment"],
    ];
    const hit = map.find(([re]) => re.test(q));
    return hit ? `/${city.slug}/${hit[1]}` : undefined;
  };

  return (
    <>
      <PageHero
        crumbs={[{ name: "Locations", path: "/locations" }, { name: city.displayName, path: `/${city.slug}` }]}
        eyebrow={`${city.displayName} · ${city.state}`}
        title={c.h1}
        lead={<p>{city.intro[0]}</p>}
        image={city.hero}
        imageAlt={`Madhaav Aesthetic clinic serving ${city.name}`}
        waMessage={`Hi Madhaav Aesthetic, I'm in ${city.name} and would like to book a consultation.`}
        bookHref={`/contact?clinic=${city.slug}`}
      />

      <section className="pb-24 md:pb-32">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <div className="prose-clinic lg:col-span-7">
            <h2 className="!mt-0">Hair transplant, hair fall and skin care in {city.name}</h2>
            <p>{city.intro[1]}</p>
            <h3>Hair and skin in {city.name}&apos;s climate</h3>
            <p>{city.climateNote}</p>
            <p>{city.waterNote}</p>
            <h3>How to reach us</h3>
            <ul>
              {city.reach.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
            <h3>Most-booked treatments in {city.name}</h3>
            <ul>
              {coreTreatments.map((t) => (
                <li key={t.slug}>
                  <Link href={`/${city.slug}/${t.slug}`}>{t.name} in {city.name}</Link>: {t.tagline}
                </li>
              ))}
            </ul>
            {city.localTerms.map((l) => (
              <p key={l.lang} className="text-sm text-cocoa/70">
                In {l.lang}: {l.terms.join(" · ")}
              </p>
            ))}
          </div>
          <aside className="space-y-5 lg:col-span-5">
            <ClinicCard city={city} />
            {city.slug === "bhiwadi" || city.slug === "new-delhi" ? (
              <VideoCard src="/videos/free-wednesday-consultation.mp4" poster="/videos/free-wednesday-consultation.jpg" title="Pocket-free Wednesday" caption="Free consultations on Wednesdays at our Bhiwadi clinic" aspect="aspect-video" sound />
            ) : null}
          </aside>
        </div>
      </section>

      <section className="bg-shell py-24 md:py-32">
        <div className="wrap">
          <SplitReveal as="h2" className="max-w-4xl font-display text-title text-cocoa">
            {`All treatments in ${city.name}`}
          </SplitReveal>
          <Reveal group stagger={0.05} className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {treatments.map((t) => (
              <TreatmentCard key={t.slug} t={t} href={`/${city.slug}/${t.slug}`} />
            ))}
          </Reveal>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="wrap grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <AreaLinks city={city} title={`Neighbourhoods & towns around ${city.name}`} />
          </div>
          <div className="lg:col-span-7">
            <h2 className="font-display text-title text-cocoa">Frequently asked questions: {city.name}</h2>
            <div className="mt-8">
              <Faq items={city.faqs} />
            </div>
          </div>
        </div>
      </section>

      <section id="book" className="bg-cream py-24 md:py-32">
        <div className="wrap grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow flex items-center gap-3 text-vermilion">
              <span className="h-px w-8 bg-current" /> Online booking
            </p>
            <h2 className="mt-5 font-display text-title text-cocoa">Book an appointment in {city.name}</h2>
            <p className="mt-5 text-cocoa/70">
              Pick a date and time that suits you. You&apos;ll get an email confirmation and a call from our {city.clinic.verified ? city.name : "Bhiwadi"} team.
            </p>
          </div>
          <div className="lg:col-span-8">
            <BookingWidget defaultClinic={city.slug} />
          </div>
        </div>
      </section>
      <ReviewsSection list={reviewsFor({ city: city.slug === "new-delhi" ? "bhiwadi" : city.slug, limit: 12 })} title={`What ${city.name} patients say about us`} />
      <div className="pt-16">
        <SearchTerms title={`Popular searches in ${city.name}`} terms={keywordsFor(`/${city.slug}`).map((q) => ({ label: q, href: queryHref(q) }))} />
      </div>
      <FinalCta title={`Book your consultation in ${city.name}.`} message={`Hi Madhaav Aesthetic, I'm in ${city.name} and would like to book a consultation.`} />
      <JsonLd
        data={[
          city.clinic.verified ? clinicLd(branch) : serviceAreaLd(`Hair & skin care for ${city.name}`, `/${city.slug}`, [city.name, ...city.areas.map((a) => a.name)], branch),
          faqLd(city.faqs),
        ]}
      />
    </>
  );
}
