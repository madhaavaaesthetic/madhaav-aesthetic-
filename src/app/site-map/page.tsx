import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { categories, coreTreatments, treatments } from "@/data/treatments";
import { cities, states } from "@/data/locations";
import { doctors } from "@/data/doctors";
import { posts } from "@/data/posts";
import { pageMeta } from "@/lib/seo";
import { allRoutes } from "@/lib/routes";

export const metadata: Metadata = pageMeta({
  title: "Sitemap – All Pages | Madhaav Aesthetic",
  description: "Every page on the Madhaav Aesthetic website: treatments, clinics in Berhampur, Thane, Bhiwadi and New Delhi, nearby areas, doctors, tools and guides.",
  path: "/site-map",
});

const linkCls = "text-cocoa/80 transition-colors hover:text-vermilion link-underline";

function Branch({ title, href, children, count }: { title: string; href?: string; children?: React.ReactNode; count?: number }) {
  return (
    <li className="relative pl-5 before:absolute before:top-[0.7em] before:left-0 before:h-px before:w-3 before:bg-sand">
      <span className="inline-flex flex-wrap items-baseline gap-2">
        {href ? (
          <Link href={href} className="font-semibold text-cocoa transition-colors hover:text-vermilion">
            {title}
          </Link>
        ) : (
          <span className="font-semibold text-cocoa">{title}</span>
        )}
        {count !== undefined && <span className="text-xs text-cocoa/70">{count} pages</span>}
      </span>
      {children && <ul className="mt-2 ml-1 space-y-1.5 border-l border-sand pb-1 text-[0.94rem]">{children}</ul>}
    </li>
  );
}

const Leaf = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <li className="relative pl-5 before:absolute before:top-[0.75em] before:left-0 before:h-px before:w-3 before:bg-sand">
    <Link href={href} className={linkCls}>
      {children}
    </Link>
  </li>
);

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-[1.75rem] bg-shell p-6 ring-1 ring-cocoa/8 md:p-8">
      <h2 className="font-display text-heading text-cocoa">{title}</h2>
      <ul className="mt-5 space-y-3">{children}</ul>
    </section>
  );
}

export default function SiteMapPage() {
  const total = allRoutes().length;
  return (
    <>
      <PageHero
        crumbs={[{ name: "Sitemap", path: "/site-map" }]}
        eyebrow={`${total} pages`}
        title="Sitemap"
        lead={<p>Every page on our website, organised by section. Location pages branch from state to city to the treatments and neighbourhoods we serve.</p>}
      />
      <div className="wrap grid gap-6 pb-16 lg:grid-cols-3">
        <Panel title="Main pages">
          <Branch title="Home" href="/" />
          <Branch title="About Madhaav Aesthetic" href="/about" />
          <Branch title="Doctors" href="/doctors">
            {doctors.map((d) => (
              <Leaf key={d.slug} href={`/doctors/${d.slug}`}>
                {d.name}, {d.role}
              </Leaf>
            ))}
          </Branch>
          <Branch title="When will you see results?" href="/results" />
          <Branch title="Book an appointment" href="/contact" />
          <Branch title="Tools">
            <Leaf href="/tools/hair-graft-calculator">Hair graft calculator</Leaf>
            <Leaf href="/tools/hair-loss-test">Hair loss self-test</Leaf>
          </Branch>
          <Branch title="Guides" href="/blog">
            {posts.map((p) => (
              <Leaf key={p.slug} href={`/blog/${p.slug}`}>
                {p.title}
              </Leaf>
            ))}
          </Branch>
          <Branch title="Legal">
            <Leaf href="/privacy-policy">Privacy policy</Leaf>
            <Leaf href="/medical-disclaimer">Medical disclaimer</Leaf>
          </Branch>
        </Panel>

        <Panel title="Treatments">
          <Branch title="All treatments" href="/treatments" count={treatments.length}>
            {categories.map((c) => {
              const list = treatments.filter((t) => t.category === c.slug);
              if (!list.length) return null;
              return (
                <Branch key={c.slug} title={c.name}>
                  {list.map((t) => (
                    <Leaf key={t.slug} href={`/treatments/${t.slug}`}>
                      {t.name}
                    </Leaf>
                  ))}
                </Branch>
              );
            })}
          </Branch>
        </Panel>

        <Panel title="Clinic locations">
          <Branch title="All locations" href="/locations">
            {states.map((s) => (
              <Branch key={s.slug} title={s.name} href={`/locations/${s.slug}`}>
                {cities
                  .filter((c) => s.cities.includes(c.slug))
                  .map((c) => (
                    <Leaf key={c.slug} href={`/${c.slug}`}>
                      {c.displayName} ({c.areas.length} areas)
                    </Leaf>
                  ))}
              </Branch>
            ))}
          </Branch>
        </Panel>
      </div>

      {cities.map((c) => (
        <section key={c.slug} className="pb-16" aria-labelledby={`sm-${c.slug}`}>
          <div className="wrap">
            <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-cocoa/15 pb-4">
              <h2 id={`sm-${c.slug}`} className="font-display text-title text-cocoa">
                <Link href={`/${c.slug}`} className="hover:text-vermilion">
                  {c.displayName}, {c.state}
                </Link>
              </h2>
              <span className="text-sm text-cocoa/70">{1 + treatments.length + c.areas.length * (1 + coreTreatments.length)} pages</span>
            </div>
            <div className="mt-8 grid gap-6 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <ul className="space-y-3">
                  <Branch title={`Treatments in ${c.name}`} count={treatments.length}>
                    {treatments.map((t) => (
                      <Leaf key={t.slug} href={`/${c.slug}/${t.slug}`}>
                        {t.name} in {c.name}
                      </Leaf>
                    ))}
                  </Branch>
                </ul>
              </div>
              <div className="lg:col-span-8">
                <p className="eyebrow text-vermilion">Areas around {c.name}</p>
                <ul className="mt-4 grid gap-x-6 gap-y-5 sm:grid-cols-2 xl:grid-cols-3">
                  {c.areas.map((a) => (
                    <Branch key={a.slug} title={a.name} href={`/${c.slug}/${a.slug}`}>
                      {coreTreatments.map((t) => (
                        <Leaf key={t.slug} href={`/${c.slug}/${a.slug}/${t.slug}`}>
                          {t.shortName}
                        </Leaf>
                      ))}
                    </Branch>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      ))}

      <p className="wrap pb-16 text-sm text-cocoa/70">
        Looking for the machine-readable version? See <a href="/sitemap.xml" className="text-vermilion link-underline">sitemap.xml</a>.
      </p>
    </>
  );
}
