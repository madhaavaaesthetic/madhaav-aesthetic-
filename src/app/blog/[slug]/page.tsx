import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost, posts } from "@/data/posts";
import { getTreatment } from "@/data/treatments";
import type { Treatment } from "@/data/types";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { TreatmentCard } from "@/components/ui/TreatmentCard";
import { PostCard } from "@/components/home/JournalTeaser";
import { FinalCta } from "@/components/home/FinalCta";
import { JsonLd } from "@/components/ui/JsonLd";
import { articleLd, pageMeta } from "@/lib/seo";

export const dynamicParams = false;
export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) return {};
  return pageMeta({ title: `${p.title} | Madhaav Aesthetic`, description: p.excerpt, path: `/blog/${p.slug}`, image: p.image, keywords: p.keywords, type: "article", publishedTime: p.date });
}

const fmt = (d: string) => new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) notFound();
  const related = p.related.map((s) => getTreatment(s)).filter(Boolean) as Treatment[];
  const more = posts.filter((x) => x.slug !== p.slug).slice(0, 3);

  return (
    <>
      <article>
        <header className="pt-[calc(var(--header-h)+1.5rem)]">
          <div className="wrap max-w-5xl">
            <Breadcrumbs items={[{ name: "Journal", path: "/blog" }, { name: p.title, path: `/blog/${p.slug}` }]} />
            <p className="eyebrow mt-10 text-vermilion">
              {p.category} · {p.readTime} read · <time dateTime={p.date}>{fmt(p.date)}</time>
            </p>
            <SplitReveal as="h1" immediate className="mt-5 font-display text-[clamp(2.3rem,5.4vw,5rem)] leading-[1] text-balance text-cocoa">
              {p.title}
            </SplitReveal>
            <p className="mt-6 max-w-3xl text-lead text-cocoa/70">{p.excerpt}</p>
            <p className="mt-6 text-sm text-cocoa/70">
              Medically reviewed by <Link href="/doctors/dr-mannu-singgh" className="text-cocoa link-underline">Dr. Mannu Singgh</Link>, Trichologist & Dermatologist
            </p>
          </div>
          <div className="wrap mt-12">
            <div className="relative aspect-[21/9] overflow-hidden rounded-[2rem]">
              <Image src={p.image} alt={p.imageAlt} fill loading="eager" fetchPriority="high" sizes="100vw" className="object-cover" />
            </div>
          </div>
        </header>
        <div className="wrap grid gap-12 py-20 lg:grid-cols-12">
          <aside className="lg:col-span-3">
            <nav aria-label="In this article" className="lg:sticky lg:top-28">
              <p className="eyebrow text-cocoa/70">In this article</p>
              <ol className="mt-4 space-y-2 text-sm">
                {p.sections.map((s, i) => (
                  <li key={s.h}>
                    <a href={`#s-${i}`} className="text-cocoa/70 hover:text-vermilion">{s.h}</a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>
          <div className="prose-clinic lg:col-span-7">
            {p.sections.map((s, i) => (
              <section key={s.h} id={`s-${i}`}>
                <h2>{s.h}</h2>
                {s.p.map((para) => (
                  <p key={para}>{para}</p>
                ))}
                {s.list && (
                  <ul>
                    {s.list.map((li) => (
                      <li key={li}>{li}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
            <p className="mt-10 rounded-2xl bg-blush/60 p-5 text-sm">
              This article is for general education and isn&apos;t a substitute for a consultation. Treatment suitability and results vary between individuals.
            </p>
          </div>
        </div>
      </article>
      {related.length > 0 && (
        <section className="bg-shell py-16">
          <div className="wrap">
            <h2 className="font-display text-title text-cocoa">Related treatments</h2>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((t) => (
                <TreatmentCard key={t.slug} t={t} />
              ))}
            </div>
          </div>
        </section>
      )}
      <section className="py-16">
        <div className="wrap">
          <h2 className="font-display text-title text-cocoa">Keep reading</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {more.map((m) => (
              <PostCard key={m.slug} slug={m.slug} title={m.title} excerpt={m.excerpt} image={m.image} alt={m.imageAlt} category={m.category} readTime={m.readTime} />
            ))}
          </div>
        </div>
      </section>
      <FinalCta />
      <JsonLd data={articleLd(p)} />
    </>
  );
}
