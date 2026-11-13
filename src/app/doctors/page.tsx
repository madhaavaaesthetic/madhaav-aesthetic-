import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Doctors } from "@/components/home/Doctors";
import { FinalCta } from "@/components/home/FinalCta";
import { JsonLd } from "@/components/ui/JsonLd";
import { doctors } from "@/data/doctors";
import { pageMeta, physicianLd } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Our Doctors: Trichologist, Dermatologist & Hair Transplant Surgeons | Madhaav",
  description: "Meet Dr. Mannu Singgh (trichologist & dermatologist), Dr. Kapil Patil (MBBS, PGDMT) and Dr. Vinay Chouksey (MS), hair transplant surgeons from Mumbai.",
  path: "/doctors",
  keywords: ["trichologist", "dermatologist", "hair transplant surgeon", "hair transplant surgeons in Berhampur", "Dr Mannu Singgh", "Dr Manu Singh", "Dr Kapil Patil", "Dr Vinay Chouksey"],
});

export default function DoctorsPage() {
  return (
    <>
      <PageHero crumbs={[{ name: "Doctors", path: "/doctors" }]} eyebrow="The team" title="Meet our doctors" lead={<p>Your hair or skin problem is diagnosed by a trichologist and dermatologist. Hair transplants and laser treatments are done by experienced surgeons from Mumbai.</p>} image="/images/brand-hair-transplant-planning.jpg" imageAlt="Doctor explaining a hair restoration plan on a tablet" />
      <Doctors />
      <FinalCta />
      <JsonLd data={doctors.map(physicianLd)} />
    </>
  );
}
