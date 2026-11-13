import type { Metadata } from "next";
import { posts } from "@/data/posts";
import { PageHero } from "@/components/sections/PageHero";
import { PostCard } from "@/components/home/JournalTeaser";
import { Reveal } from "@/components/motion/Reveal";
import { FinalCta } from "@/components/home/FinalCta";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Journal – Hair Loss, Hair Transplant & Skin Care Guides | Madhaav Aesthetic",
  description: "Doctor-reviewed guides on hair transplant cost and recovery, PRP vs GFC, hair fall in humid or hard-water cities, pigmentation, sensitive skin and laser hair removal.",
  path: "/blog",
  keywords: posts.flatMap((p) => p.keywords.slice(0, 2)),
});

export default function BlogIndex() {
  return (
    <>
      <PageHero crumbs={[{ name: "Journal", path: "/blog" }]} eyebrow="Journal" title="Hair and skin care guides" lead={<p>Simple, honest answers to common questions about hair fall, hair transplant, cost, acne, pigmentation and laser treatments, reviewed by our doctors.</p>} />
      <section className="pb-28">
        <Reveal group stagger={0.08} className="wrap grid gap-x-6 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <PostCard key={p.slug} slug={p.slug} title={p.title} excerpt={p.excerpt} image={p.image} alt={p.imageAlt} category={p.category} readTime={p.readTime} />
          ))}
        </Reveal>
      </section>
      <FinalCta />
    </>
  );
}
