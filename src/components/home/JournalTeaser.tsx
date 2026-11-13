import Image from "next/image";
import Link from "next/link";
import { posts } from "@/data/posts";
import { SectionHead } from "@/components/ui/SectionHead";
import { Reveal } from "@/components/motion/Reveal";
import { ArrowUpRight } from "@/components/ui/Icons";

export function JournalTeaser() {
  const list = posts.slice(0, 3);
  return (
    <section className="bg-shell py-16 md:py-24" aria-labelledby="journal-title">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHead eyebrow="Guides" title={<span id="journal-title">Hair and skin care guides from our doctors</span>} />
          <Link href="/blog" className="btn btn-ghost text-cocoa">
            All articles <ArrowUpRight />
          </Link>
        </div>
        <Reveal group stagger={0.1} className="mt-14 grid gap-6 md:grid-cols-3">
          {list.map((p) => (
            <PostCard key={p.slug} slug={p.slug} title={p.title} excerpt={p.excerpt} image={p.image} alt={p.imageAlt} category={p.category} readTime={p.readTime} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}

export function PostCard({ slug, title, excerpt, image, alt, category, readTime }: { slug: string; title: string; excerpt: string; image: string; alt: string; category: string; readTime: string }) {
  return (
    <Link href={`/blog/${slug}`} className="group flex flex-col" data-cursor="Read">
      <div className="relative aspect-[5/4] overflow-hidden rounded-[1.5rem]">
        <Image src={image} alt={alt} fill sizes="(max-width:768px) 92vw, 30vw" className="object-cover transition-transform duration-[1.3s] ease-[var(--ease-expo)] group-hover:scale-[1.06]" />
        <span className="absolute top-4 left-4 rounded-full bg-shell/90 px-3 py-1 text-xs font-semibold text-cocoa">{category}</span>
      </div>
      <p className="mt-5 text-xs font-semibold tracking-[0.16em] text-cocoa/70 uppercase">{readTime} read</p>
      <h3 className="mt-2 font-display text-[1.6rem] leading-tight text-cocoa transition-colors group-hover:text-vermilion">{title}</h3>
      <p className="mt-3 line-clamp-2 text-cocoa/65">{excerpt}</p>
    </Link>
  );
}
