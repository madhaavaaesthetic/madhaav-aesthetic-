import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { cities, states } from "@/data/locations";
import { PageHero } from "@/components/sections/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { FinalCta } from "@/components/home/FinalCta";
import { pageMeta } from "@/lib/seo";
import { branchForCity } from "@/lib/local-content";
import { ArrowUpRight, Star } from "@/components/ui/Icons";

export const metadata: Metadata = pageMeta({
  title: "Clinic Locations: Berhampur, Thane West, Bhiwadi & New Delhi | Madhaav Aesthetic",
  description: "Find Madhaav Aesthetic hair transplant & skin clinics in Berhampur (Odisha), Thane West (Maharashtra) and Bhiwadi (Rajasthan), plus every neighbourhood and town we serve.",
  path: "/locations",
  keywords: ["hair transplant clinic near me", "skin clinic near me", ...cities.flatMap((c) => c.aliases.map((a) => `hair clinic ${a}`))],
});

export default function LocationsPage() {
  return (
    <>
      <PageHero crumbs={[{ name: "Locations", path: "/locations" }]} eyebrow="Clinics & areas" title="Find a Madhaav clinic near you" lead={<p>Three clinics across three states, serving {cities.reduce((n, c) => n + c.areas.length, 0)}+ neighbourhoods and towns.</p>} />
      <section className="pb-28">
        <div className="wrap space-y-20">
          {states.map((s) => (
            <div key={s.slug}>
              <div className="flex flex-wrap items-end justify-between gap-4 border-b border-cocoa/15 pb-6">
                <h2 className="font-hero text-[clamp(2rem,5vw,4rem)] leading-none text-cocoa">{s.name}</h2>
                <Link href={`/locations/${s.slug}`} className="inline-flex items-center gap-2 text-sm font-semibold text-vermilion link-underline">
                  {s.name} overview <ArrowUpRight />
                </Link>
              </div>
              {s.cities.map((cs) => {
                const c = cities.find((x) => x.slug === cs)!;
                const b = branchForCity(c);
                return (
                  <Reveal key={c.slug} className="mt-10 grid gap-8 lg:grid-cols-12">
                    <Link href={`/${c.slug}`} className="group relative block aspect-[16/11] overflow-hidden rounded-[1.75rem] lg:col-span-5">
                      <Image src={c.hero} alt={`Madhaav Aesthetic serving ${c.name}`} fill sizes="(max-width:1024px) 92vw, 40vw" className="object-cover transition-transform duration-[1.3s] group-hover:scale-105" />
                      <span className="absolute bottom-5 left-5 rounded-full bg-shell/90 px-4 py-2 font-display text-xl text-cocoa">{c.displayName}</span>
                    </Link>
                    <div className="lg:col-span-7">
                      <p className="text-cocoa/75">{c.intro[0]}</p>
                      <p className="mt-4 flex items-center gap-2 text-sm text-cocoa/70">
                        <Star className="text-ember" /> {b.rating.value} · {b.rating.count} Google reviews {c.clinic.verified ? "" : `(${b.city} clinic)`}
                      </p>
                      <ul className="mt-6 flex flex-wrap gap-2">
                        {c.areas.map((a) => (
                          <li key={a.slug}>
                            <Link href={`/${c.slug}/${a.slug}`} className="inline-block rounded-full border border-cocoa/15 px-3.5 py-1.5 text-sm text-cocoa/80 hover:border-vermilion hover:text-vermilion">
                              {a.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          ))}
        </div>
      </section>
      <FinalCta />
    </>
  );
}
