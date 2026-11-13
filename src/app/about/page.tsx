import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Statement } from "@/components/home/Statement";
import { WhyBento } from "@/components/home/WhyBento";
import { InsideClinic } from "@/components/home/InsideClinic";
import { Clinics } from "@/components/home/Clinics";
import { FinalCta } from "@/components/home/FinalCta";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "About Madhaav Aesthetic & Cure Vibe Clinics | Hair & Skin Clinics in Odisha, Maharashtra & Rajasthan",
  description: "Madhaav Aesthetic & Cure Vibe Clinics, founded by trichologist and dermatologist Dr. Mannu Singgh: doctor-led hair restoration and skin care in Berhampur, Thane West and Bhiwadi.",
  path: "/about",
  keywords: ["Madhaav Aesthetic", "Cure Vibe Clinic", "Dr Mannu Singgh", "hair transplant clinic Odisha", "skin clinic Thane", "hair clinic Rajasthan"],
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "About", path: "/about" }]}
        eyebrow="About Madhaav"
        title="About Madhaav Aesthetic"
        lead={
          <p>
            Madhaav Aesthetic & Cure Vibe Clinics began in Berhampur with a simple idea: people shouldn&apos;t have to travel to a metro for honest, doctor-led hair and skin care. Today the same standard runs across Berhampur, Thane West and Bhiwadi.
          </p>
        }
        image="/images/bhiwadi-clinic-reception.jpg"
        imageAlt="Reception of Madhaav Aesthetic clinic"
      />
      <Statement />
      <WhyBento />
      <InsideClinic />
      <Clinics />
      <FinalCta />
    </>
  );
}
