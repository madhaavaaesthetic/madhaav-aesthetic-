import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { Statement } from "@/components/home/Statement";
import { TreatmentsRail } from "@/components/home/TreatmentsRail";
import { Journey } from "@/components/home/Journey";
import { GrowthTimeline } from "@/components/home/GrowthTimeline";
import { Doctors } from "@/components/home/Doctors";
import { WhyBento } from "@/components/home/WhyBento";
import { Clinics } from "@/components/home/Clinics";
import { InsideClinic } from "@/components/home/InsideClinic";
import { ToolsTeaser } from "@/components/home/ToolsTeaser";
import { JournalTeaser } from "@/components/home/JournalTeaser";
import { FinalCta } from "@/components/home/FinalCta";
import { Faq } from "@/components/ui/Faq";
import { SectionHead } from "@/components/ui/SectionHead";
import { JsonLd } from "@/components/ui/JsonLd";
import { homeFaqs } from "@/data/faqs";
import { reviews } from "@/data/reviews";
import { getTreatment, treatments } from "@/data/treatments";

/** The home rail's featured treatments, reduced to the fields the cards show (keeps full treatment data out of the browser bundle). */
const railTreatments = [
  "hair-transplant",
  "hair-loss-treatment",
  "gfc-hair-treatment",
  "prp-hair-treatment",
  "exosome-hair-treatment",
  "qr678-hair-treatment",
  "laser-hair-reduction",
  "hydrafacial",
  "pigmentation-treatment",
  "acne-treatment",
].map((slug) => {
  const t = getTreatment(slug)!;
  return { slug: t.slug, name: t.name, image: t.image, imageAlt: t.imageAlt, tagline: t.tagline, category: t.category };
});

/** 14 reviews, alternating clinics, for the home marquee (every review still appears on its clinic's pages). */
const homeReviews = (() => {
  const byCity = ["berhampur", "thane", "bhiwadi"].map((c) => reviews.filter((r) => r.city === c));
  const out: typeof reviews = [];
  for (let i = 0; out.length < 14 && byCity.some((l) => l[i]); i++) byCity.forEach((l) => l[i] && out.length < 14 && out.push(l[i]));
  return out;
})();
import { ReviewsSection } from "@/components/sections/ReviewsSection";
import { clinicLd, faqLd, pageMeta } from "@/lib/seo";
import { branches } from "@/lib/site";
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
      <Hero marquee={treatments.map((t) => ({ slug: t.slug, shortName: t.shortName }))} />
      <Statement />
      <TreatmentsRail featured={railTreatments} total={treatments.length} />
      <WhyBento />
      <Journey steps={getTreatment("hair-transplant")!.steps} />
      <GrowthTimeline />
      <ReviewsSection list={homeReviews} title="What our patients say on Google" tone="dark" />
      <Doctors />
      <Clinics />
      <InsideClinic />
      <ToolsTeaser />
      <section className="bg-cream py-16 md:py-24" aria-labelledby="faq-title">
        <div className="wrap grid gap-14 lg:grid-cols-12">
          <SectionHead className="lg:col-span-4" eyebrow="FAQ" title={<span id="faq-title">Frequently asked questions</span>} lead="Quick answers about cost, pain, results and clinic timings." />
          <div className="lg:col-span-8">
            <Faq items={homeFaqs} />
          </div>
        </div>
      </section>
      <JournalTeaser />
      <div className="bg-shell pt-4">
        <SearchTerms title="People also search for" terms={keywordsFor("/").map((label) => ({ label }))} />
      </div>
      <FinalCta />
      <JsonLd data={[faqLd(homeFaqs), ...branches.map(clinicLd)]} />
    </>
  );
}
