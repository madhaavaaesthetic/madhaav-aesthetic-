import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cities, getState, states } from "@/data/locations";
import { coreTreatments } from "@/data/treatments";
import { PageHero } from "@/components/sections/PageHero";
import { ClinicCard } from "@/components/sections/LocalBlock";
import { FinalCta } from "@/components/home/FinalCta";
import { pageMeta, regionCode } from "@/lib/seo";
import { keywordsFor } from "@/lib/page-keywords";
import { SearchTerms } from "@/components/sections/SearchTerms";

export const dynamicParams = false;
export function generateStaticParams() {
  return states.map((s) => ({ state: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ state: string }> }): Promise<Metadata> {
  const { state } = await params;
  const s = getState(state);
  if (!s) return {};
  const c = cities.find((x) => x.slug === s.cities[0])!;
  return pageMeta({
    title: `Hair Transplant & Skin Clinic in ${s.name} | Madhaav Aesthetic`,
    description: s.intro,
    path: `/locations/${s.slug}`,
    keywords: [...keywordsFor(`/locations/${s.slug}`), `hair transplant ${s.name}`, `best hair clinic in ${s.name}`, `dermatologist ${s.name}`, `PRP treatment ${s.name}`, `GFC treatment ${s.name}`],
    geo: { region: regionCode(c.state), placename: s.name, lat: c.geo.lat, lng: c.geo.lng },
  });
}

export default async function StatePage({ params }: { params: Promise<{ state: string }> }) {
  const { state } = await params;
  const s = getState(state);
  if (!s) notFound();
  const list = cities.filter((c) => s.cities.includes(c.slug));
  return (
    <>
      <PageHero crumbs={[{ name: "Locations", path: "/locations" }, { name: s.name, path: `/locations/${s.slug}` }]} eyebrow="State" title={`Hair & skin care in ${s.name}`} lead={<p>{s.intro}</p>} />
      <section className="pb-16 md:pb-20">
        <div className="wrap space-y-16">
          {list.map((c) => (
            <div key={c.slug} className="grid gap-10 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <ClinicCard city={c} />
              </div>
              <div className="lg:col-span-7">
                <h2 className="font-display text-title text-cocoa">
                  <Link href={`/${c.slug}`} className="hover:text-vermilion">{c.displayName}</Link>
                </h2>
                <p className="mt-4 text-cocoa/75">{c.intro[1]}</p>
                <p className="eyebrow mt-8 text-vermilion">Popular in {c.name}</p>
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {coreTreatments.map((t) => (
                    <li key={t.slug}>
                      <Link href={`/${c.slug}/${t.slug}`} className="link-underline text-cocoa">{t.name} in {c.name}</Link>
                    </li>
                  ))}
                </ul>
                <p className="eyebrow mt-8 text-vermilion">Areas</p>
                <p className="mt-3 text-sm leading-7 text-cocoa/70">
                  {c.areas.map((a, i) => (
                    <span key={a.slug}>
                      <Link href={`/${c.slug}/${a.slug}`} className="hover:text-vermilion">{a.name}</Link>
                      {i < c.areas.length - 1 ? " · " : ""}
                    </span>
                  ))}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <SearchTerms title={`Popular searches in ${s.name}`} terms={keywordsFor(`/locations/${s.slug}`).map((label) => ({ label }))} />
      <FinalCta />
    </>
  );
}
