import type { Review } from "@/data/reviews";
import { branchBySlug, site } from "@/lib/site";
import { Marquee } from "@/components/motion/Marquee";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { ArrowUpRight, Star } from "@/components/ui/Icons";

const CITY_LABEL: Record<Review["city"], string> = { berhampur: "Berhampur", thane: "Thane West", bhiwadi: "Bhiwadi" };

export function ReviewsSection({ list, title = "Patients, in their own words.", tone = "light" }: { list: Review[]; title?: string; tone?: "light" | "dark" }) {
  if (list.length === 0) return null;
  const half = Math.ceil(list.length / 2);
  const dark = tone === "dark";
  return (
    <section className={`relative overflow-hidden py-24 md:py-32 ${dark ? "bg-night text-shell" : "bg-shell"}`} aria-labelledby="reviews-title">
      {dark && (
        <>
          <div aria-hidden className="glow top-1/3 left-[8%] h-[360px] w-[420px] opacity-35" />
          <div aria-hidden className="glow right-[5%] bottom-0 h-[300px] w-[380px] opacity-30" />
        </>
      )}
      <div className="wrap relative flex flex-wrap items-end justify-between gap-8">
        <div className="max-w-3xl">
          <p className={`eyebrow flex items-center gap-3 ${dark ? "text-ember" : "text-vermilion"}`}>
            <span className="h-px w-8 bg-current" /> Google reviews
          </p>
          <SplitReveal as="h2" id="reviews-title" className={`mt-5 font-display text-title ${dark ? "text-shell" : "text-cocoa"}`}>
            {title}
          </SplitReveal>
        </div>
        <a href={site.googleReviewsUrl} target="_blank" rel="noopener" className={`flex items-center gap-4 rounded-full py-2 pr-5 pl-2 ${dark ? "glass-dark" : "ring-1 ring-cocoa/10 bg-cream"}`}>
          <span className="grid h-12 w-12 place-items-center rounded-full bg-white font-bold text-[#4285F4] shadow-sm">G</span>
          <span>
            <span className="flex items-center gap-1 text-ember">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} />
              ))}
              <span className={`ml-1 font-semibold ${dark ? "text-shell" : "text-cocoa"}`}>{site.rating.value}</span>
            </span>
            <span className={`text-sm ${dark ? "text-shell/60" : "text-cocoa/70"}`}>{site.rating.count}+ reviews on Google</span>
          </span>
          <ArrowUpRight className="opacity-60" />
        </a>
      </div>
      <div className="relative mt-14 space-y-5">
        <Marquee duration={70}>
          {list.slice(0, half).map((r) => (
            <ReviewCard key={r.name + r.date} r={r} dark={dark} />
          ))}
        </Marquee>
        {list.length > 3 && (
          <Marquee duration={80} reverse>
            {list.slice(half).map((r) => (
              <ReviewCard key={r.name + r.date} r={r} dark={dark} />
            ))}
          </Marquee>
        )}
      </div>
    </section>
  );
}

function ReviewCard({ r, dark }: { r: Review; dark: boolean }) {
  const branch = branchBySlug(r.city);
  return (
    <figure className={`mx-2.5 flex w-[min(82vw,400px)] shrink-0 flex-col rounded-[1.75rem] p-7 ${dark ? "glass-dark" : "bg-cream ring-1 ring-cocoa/8"}`}>
      <div className="flex items-center gap-1 text-ember">
        {Array.from({ length: r.stars }).map((_, i) => (
          <Star key={i} className="text-sm" />
        ))}
      </div>
      <blockquote className={`mt-4 line-clamp-6 text-[0.98rem] leading-relaxed ${dark ? "text-shell/85" : "text-cocoa/85"}`}>“{r.text}”</blockquote>
      <figcaption className="mt-auto flex items-center gap-3 pt-6">
        <span className="grid h-10 w-10 place-items-center rounded-full grad-ember font-semibold text-shell">{r.name.charAt(0).toUpperCase()}</span>
        <span>
          <span className={`block font-semibold ${dark ? "text-shell" : "text-cocoa"}`}>{r.name}</span>
          <span className={`block text-xs ${dark ? "text-shell/65" : "text-cocoa/70"}`}>
            {branch ? `Madhaav ${CITY_LABEL[r.city]}` : CITY_LABEL[r.city]} · Google review
          </span>
        </span>
      </figcaption>
    </figure>
  );
}
