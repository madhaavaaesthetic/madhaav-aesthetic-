import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { doctors, getDoctor } from "@/data/doctors";
import { getTreatment } from "@/data/treatments";
import type { Treatment } from "@/data/types";
import { PageHero } from "@/components/sections/PageHero";
import { TreatmentCard } from "@/components/ui/TreatmentCard";
import { Reveal } from "@/components/motion/Reveal";
import { FinalCta } from "@/components/home/FinalCta";
import { JsonLd } from "@/components/ui/JsonLd";
import { pageMeta, physicianLd } from "@/lib/seo";

export const dynamicParams = false;
export function generateStaticParams() {
  return doctors.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const d = getDoctor(slug);
  if (!d) return {};
  return pageMeta({
    title: `${d.name}${d.alternateName ? ` (${d.alternateName})` : ""} – ${d.role} | Madhaav Aesthetic`,
    description: `${d.name}, ${d.credentials}. ${d.bio[0]}`.slice(0, 300),
    path: `/doctors/${d.slug}`,
    keywords: [d.name, ...(d.alternateName ? [d.alternateName] : []), d.role, ...d.focus],
  });
}

export default async function DoctorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const d = getDoctor(slug);
  if (!d) notFound();
  const ts = d.treatments.map((s) => getTreatment(s)).filter(Boolean) as Treatment[];
  return (
    <>
      <PageHero
        crumbs={[{ name: "Doctors", path: "/doctors" }, { name: d.name, path: `/doctors/${d.slug}` }]}
        eyebrow={d.role}
        title={d.name}
        lead={<p>{d.credentials} · {d.base}</p>}
        aside={
          <div className="relative mx-auto grid aspect-square max-w-sm place-items-center rounded-full grad-ember text-shell shadow-2xl">
            <span className="font-hero text-[7rem] leading-none">{d.initials}</span>
          </div>
        }
      />
      <section className="pb-16">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <div className="prose-clinic lg:col-span-7">
            <h2 className="!mt-0">About {d.name}</h2>
            {d.bio.map((p) => (
              <p key={p}>{p}</p>
            ))}
            {d.alternateName && <p className="text-sm text-cocoa/70">Also written as {d.alternateName}.</p>}
          </div>
          <div className="lg:col-span-5">
            <p className="eyebrow text-vermilion">Areas of focus</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {d.focus.map((f) => (
                <li key={f} className="rounded-full bg-blush px-4 py-2 text-sm text-cocoa">{f}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <section className="bg-shell py-16">
        <div className="wrap">
          <h2 className="font-display text-title text-cocoa">Treatments led by {d.name.split(" ").slice(0, 2).join(" ")}</h2>
          <Reveal group stagger={0.06} className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {ts.map((t) => (
              <TreatmentCard key={t.slug} t={t} />
            ))}
          </Reveal>
        </div>
      </section>
      <FinalCta />
      <JsonLd data={physicianLd(d)} />
    </>
  );
}
