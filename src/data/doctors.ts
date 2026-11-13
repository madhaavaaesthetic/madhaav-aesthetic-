import type { DoctorSlug } from "./types";

export interface Doctor {
  slug: DoctorSlug;
  name: string;
  alternateName?: string;
  role: string;
  credentials: string;
  base: string;
  initials: string;
  bio: string[];
  focus: string[];
  treatments: string[];
}

export const doctors: Doctor[] = [
  {
    slug: "dr-mannu-singgh",
    name: "Dr. Mannu Singgh",
    alternateName: "Dr. Manu Singh",
    role: "Founder · Trichologist & Dermatologist",
    credentials: "Trichologist and Dermatologist",
    base: "Berhampur · Thane · Bhiwadi",
    initials: "MS",
    bio: [
      "Dr. Mannu Singgh founded Madhaav Aesthetic & Cure Vibe Clinics to bring diagnosis-led hair and skin care to patients who would otherwise travel to a metro for it. As a trichologist and dermatologist, the focus is on finding the cause of hair loss or a skin problem before choosing a treatment.",
      "Dr. Singgh leads consultations, trichoscopy and medical plans across the clinics, supervises regenerative hair therapies (PRP, GFC, exosomes, QR678) and works with the surgical team on hair transplant candidacy and long-term care.",
    ],
    focus: ["Hair fall diagnosis & trichoscopy", "Female hair loss & PCOS", "Alopecia areata", "Acne, pigmentation & melasma", "Eczema, psoriasis & fungal infections"],
    treatments: ["hair-loss-treatment", "female-hair-loss-treatment", "gfc-hair-treatment", "prp-hair-treatment", "alopecia-areata-treatment", "acne-treatment", "pigmentation-treatment", "psoriasis-treatment"],
  },
  {
    slug: "dr-kapil-patil",
    name: "Dr. Kapil Patil",
    role: "Hair Transplant Surgeon",
    credentials: "MBBS, PGDMT",
    base: "Mumbai · visiting surgeon",
    initials: "KP",
    bio: [
      "Dr. Kapil Patil (MBBS, PGDMT) is a hair transplant surgeon from Mumbai who performs FUE hair, beard and moustache transplants for Madhaav Aesthetic.",
      "His work centres on natural hairline design, careful donor management and graft handling. Planning starts at consultation with the hairline drawn with the patient, and continues through aftercare.",
    ],
    focus: ["FUE hair transplant", "Hairline design", "Crown restoration", "Beard & moustache transplant"],
    treatments: ["hair-transplant", "fue-hair-transplant", "beard-transplant"],
  },
  {
    slug: "dr-vinay-chouksey",
    name: "Dr. Vinay Chouksey",
    role: "Hair Transplant Surgeon · Laser & Cosmetic Surgeon",
    credentials: "MS",
    base: "Mumbai · visiting surgeon",
    initials: "VC",
    bio: [
      "Dr. Vinay Chouksey (MS) is a hair transplant surgeon from Mumbai who performs FUE hair transplants for Madhaav Aesthetic. He is also a laser and cosmetic surgeon and leads the clinic's laser and aesthetic programme.",
      "In hair transplants he focuses on natural hairline design, careful graft extraction and dense, natural-looking placement. On the laser side he sets the protocols for laser hair reduction, carbon peel, tattoo removal and pigmentation, choosing settings that are safe for Indian skin types.",
    ],
    focus: ["FUE hair transplant", "Hairline design", "Laser hair reduction", "Carbon peel & laser toning", "Laser tattoo removal", "Scalp micro-pigmentation"],
    treatments: ["hair-transplant", "fue-hair-transplant", "laser-hair-reduction", "carbon-peel", "tattoo-removal", "scalp-micropigmentation", "hydrafacial"],
  },
];

export const getDoctor = (slug: string) => doctors.find((d) => d.slug === slug);
