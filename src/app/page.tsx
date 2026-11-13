import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { TreatmentMarquee } from "@/components/home/TreatmentMarquee";
import { SectionFade } from "@/components/ui/SectionFade";
import { ServicesWheel, type ServiceCard } from "@/components/home/ServicesWheel";
import { Statement } from "@/components/home/Statement";
import { Journey } from "@/components/home/Journey";
import { GrowthTimeline } from "@/components/home/GrowthTimeline";
import { InsideClinic } from "@/components/home/InsideClinic";
import { ToolsTeaser } from "@/components/home/ToolsTeaser";
import { JournalTeaser } from "@/components/home/JournalTeaser";
import { Doctors } from "@/components/home/Doctors";
import { Clinics } from "@/components/home/Clinics";
import { FinalCta } from "@/components/home/FinalCta";
import { Faq } from "@/components/ui/Faq";
import { SectionHead } from "@/components/ui/SectionHead";
import { JsonLd } from "@/components/ui/JsonLd";
import { homeFaqs } from "@/data/faqs";
import { reviews } from "@/data/reviews";
import { categoryName, getTreatment, treatments } from "@/data/treatments";

/** The services wheel shows every treatment, each with its own photograph (slim fields only, for the browser bundle). */
const serviceCards: ServiceCard[] = treatments.map((t) => ({
  href: `/treatments/${t.slug}`,
  tag: categoryName(t.category),
  title: t.shortName,
  text: t.tagline,
  image: t.image,
  imageAlt: t.imageAlt,
}));

/** One review per clinic for the home stack: English, a comfortable length, linked to that clinic's Google listing. */
const CLINIC_NAME = { berhampur: "Madhaav Berhampur", thane: "Madhaav Thane West", bhiwadi: "Madhaav Bhiwadi" } as const;
const featuredReviews: StackReview[] = (["bhiwadi", "berhampur", "thane"] as const)
  .map((city) => {
    const r =
      reviews.find((x) => x.city === city && x.stars === 5 && x.text.length >= 140 && x.text.length <= 340 && !/\b(hai|hain|ka|ki|mujhe|bahut|bohot)\b/i.test(x.text)) ??
      reviews.find((x) => x.city === city)!;
    const branch = branches.find((b) => b.slug === city);
    return { name: r.name, clinic: CLINIC_NAME[city], stars: r.stars, date: r.date, text: r.text, href: branch?.mapsUrl ?? site.googleReviewsUrl };
  });

/** 14 reviews, alternating clinics, for the home marquee (every review still appears on its clinic's pages). */
const homeReviews = (() => {
  const byCity = ["berhampur", "thane", "bhiwadi"].map((c) => reviews.filter((r) => r.city === c));
  const out: typeof reviews = [];
  for (let i = 0; out.length < 14 && byCity.some((l) => l[i]); i++) byCity.forEach((l) => l[i] && out.length < 14 && out.push(l[i]));
  return out;
})();
import { ReviewsSection } from "@/components/sections/ReviewsSection";
import type { StackReview } from "@/components/ui/ReviewStack";
import { clinicLd, faqLd, pageMeta } from "@/lib/seo";
import { branches, site } from "@/lib/site";
import { keywordsFor } from "@/lib/page-keywords";
import { SearchTerms } from "@/components/sections/SearchTerms";

export const metadata: Metadata = pageMeta({
  title: "Best Hair Transplant & Skin Clinic in Berhampur, Thane & Bhiwadi | Madhaav Aesthetic",
  description:
    "Best hair transplant, hair fall treatment (PRP, GFC, exosomes, QR678), dermatologist & laser clinic in Berhampur (Brahmapur), Thane West & Bhiwadi. 4.8★ from 300 Google reviews · 0% EMI.",
  path: "/",
  keywords: [
    "best hair transplant in Berhampur", "best hair transplant in Odisha", "hair transplant Brahmapur", "hair transplant Thane West", "hair transplant Bhiwadi",
    "best dermatologist in Berhampur", "skin specialist Thane", "skin clinic Bhiwadi", "hair fall treatment near me", "hair clinic near me",
    "PRP treatment Berhampur", "GFC hair treatment", "laser hair removal Bhiwadi", "hydrafacial Thane", "hair transplant cost", "baal jhadne ka ilaj",
    ...keywordsFor("/"),
  ],
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <TreatmentMarquee items={treatments.map((t) => ({ slug: t.slug, shortName: t.shortName }))} />
      <Statement />
      <ServicesWheel cards={serviceCards} />
      <Journey steps={getTreatment("hair-transplant")!.steps} />
      <SectionFade from="shell" to="cream" />
      <GrowthTimeline />
      <SectionFade from="cream" to="night" />
      <ReviewsSection list={homeReviews.filter((r) => !featuredReviews.some((f) => f.name === r.name && f.date === r.date))} featured={featuredReviews} title="What our patients say on Google" tone="dark" />
      <SectionFade from="night" to="cream" />
      <Doctors />
      <Clinics />
      <SectionFade from="cream" to="night" />
      <InsideClinic />
      <SectionFade from="night" to="ember" />
      <ToolsTeaser />
      <SectionFade from="ember" to="cream" />
      <section className="bg-cream py-16 md:py-24" aria-labelledby="faq-title">
        <div className="wrap grid gap-14 lg:grid-cols-12">
          <SectionHead className="lg:col-span-4" eyebrow="FAQ" title={<span id="faq-title">Frequently asked questions</span>} lead="Quick answers about cost, pain, results and clinic timings." />
          <div className="lg:col-span-8">
            <Faq items={homeFaqs} />
          </div>
        </div>
      </section>
      <SectionFade from="cream" to="shell" />
      <JournalTeaser />
      <div className="bg-shell pt-4">
        <SearchTerms title="People also search for" terms={keywordsFor("/").map((label) => ({ label }))} />
      </div>
      <SectionFade from="shell" to="cream" />
      <FinalCta />
      <JsonLd data={[faqLd(homeFaqs), ...branches.map(clinicLd)]} />
    </>
  );
}
