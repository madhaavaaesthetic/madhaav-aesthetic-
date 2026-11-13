import type { Metadata } from "next";
import { treatments, categories } from "@/data/treatments";
import { PageHero } from "@/components/sections/PageHero";
import { TreatmentGrid } from "@/components/sections/TreatmentGrid";
import { FinalCta } from "@/components/home/FinalCta";
import { JsonLd } from "@/components/ui/JsonLd";
import { pageMeta } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Hair & Skin Treatments: Hair Transplant, PRP, GFC, Laser, Hydrafacial | Madhaav",
  description: `All ${treatments.length} treatments at Madhaav Aesthetic: FUE hair transplant, beard transplant, PRP, GFC, exosomes, QR678, laser hair reduction, Hydrafacial, carbon peel, acne, pigmentation, eczema and psoriasis care.`,
  path: "/treatments",
  keywords: treatments.flatMap((t) => t.keywords.slice(0, 2)),
});

export default function TreatmentsIndex() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Treatments", path: "/treatments" }]}
        eyebrow={`${treatments.length} treatments · ${categories.length} disciplines`}
        title="Hair and skin treatments"
        lead={<p>All our treatments for hair fall, baldness, hair transplant, acne, pigmentation and other skin problems. Use the filters to find yours, or book a consultation and the doctor will recommend the right one.</p>}
      />
      <TreatmentGrid />
      <FinalCta />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Treatments at Madhaav Aesthetic",
          itemListElement: treatments.map((t, i) => ({ "@type": "ListItem", position: i + 1, name: t.name, url: absoluteUrl(`/treatments/${t.slug}`) })),
        }}
      />
    </>
  );
}
