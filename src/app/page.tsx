import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { ServicesWheel, type ServiceCard } from "@/components/home/ServicesWheel";
import { Statement } from "@/components/home/Statement";
import { Journey } from "@/components/home/Journey";
import { Doctors } from "@/components/home/Doctors";
import { Clinics } from "@/components/home/Clinics";
import { FinalCta } from "@/components/home/FinalCta";
import { Faq } from "@/components/ui/Faq";
import { SectionHead } from "@/components/ui/SectionHead";
import { JsonLd } from "@/components/ui/JsonLd";
import { homeFaqs } from "@/data/faqs";
import { reviews } from "@/data/reviews";
import { getTreatment } from "@/data/treatments";

/** The services wheel: six doorways into the treatments, each with its own photograph. */
const serviceCards: ServiceCard[] = [
  { slug: "hair-transplant", href: "/treatments/hair-transplant", tag: "Hair restoration", title: "Hair transplant", text: "Permanent, natural hairlines with FUE, planned graft by graft." },
  { slug: "gfc-hair-treatment", href: "/treatments/hair-loss-treatment", tag: "Hair regrowth", title: "Hair fall treatment", text: "PRP, GFC, exosomes and QR678 to stop shedding and thicken thin hair." },
  { slug: "laser-hair-reduction", href: "/treatments/laser-hair-reduction", tag: "Laser", title: "Laser hair reduction", text: "Smooth, long-lasting results for face and body, on Indian skin." },
  { slug: "hydrafacial", href: "/treatments/hydrafacial", tag: "Skin & glow", title: "Hydrafacial & peels", text: "Deep-cleansed, hydrated, brighter skin with no downtime." },
  { slug: "acne-treatment", href: "/treatments/acne-treatment", tag: "Clear skin", title: "Acne & pigmentation", text: "Treat breakouts, scars, melasma and dark spots at the root." },
  { slug: "psoriasis-treatment", href: "/treatments?c=clinical-dermatology", tag: "Dermatology", title: "Skin conditions", text: "Eczema, psoriasis and fungal infections, treated by doctors." },
].map(({ slug, ...c }) => {
  const t = getTreatment(slug)!;
  return { ...c, image: t.image, imageAlt: t.imageAlt };
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
      <Hero />
      <Statement />
      <ServicesWheel cards={serviceCards} />
      <Journey steps={getTreatment("hair-transplant")!.steps} />
      <ReviewsSection list={homeReviews} title="What our patients say on Google" tone="dark" />
      <Doctors />
      <Clinics />
      <section className="bg-cream py-16 md:py-24" aria-labelledby="faq-title">
        <div className="wrap grid gap-14 lg:grid-cols-12">
          <SectionHead className="lg:col-span-4" eyebrow="FAQ" title={<span id="faq-title">Frequently asked questions</span>} lead="Quick answers about cost, pain, results and clinic timings." />
          <div className="lg:col-span-8">
            <Faq items={homeFaqs} />
          </div>
        </div>
      </section>
      <div className="bg-shell pt-4">
        <SearchTerms title="People also search for" terms={keywordsFor("/").map((label) => ({ label }))} />
      </div>
      <FinalCta />
      <JsonLd data={[faqLd(homeFaqs), ...branches.map(clinicLd)]} />
    </>
  );
}
