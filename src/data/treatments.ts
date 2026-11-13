import { hairTreatments } from "./treatments-hair";
import { skinTreatments } from "./treatments-skin";
import type { Treatment, TreatmentCategory } from "./types";

export const treatments: Treatment[] = [...hairTreatments, ...skinTreatments];

export const treatmentMap = new Map(treatments.map((t) => [t.slug, t]));

export const getTreatment = (slug: string) => treatmentMap.get(slug);

export const coreTreatments = treatments.filter((t) => t.core);

export const categories: { slug: TreatmentCategory; name: string; blurb: string }[] = [
  { slug: "hair-restoration", name: "Hair Restoration", blurb: "Surgical and permanent solutions: FUE, beard transplant and micro-pigmentation." },
  { slug: "hair-regrowth", name: "Hair Regrowth", blurb: "Non-surgical therapies that stop shedding and thicken thinning hair." },
  { slug: "skin-aesthetics", name: "Skin & Glow", blurb: "Lasers, peels and medi-facials for clarity, tone and smoothness." },
  { slug: "clinical-dermatology", name: "Clinical Dermatology", blurb: "Medical care for acne, eczema, psoriasis and fungal infections." },
  { slug: "wellness", name: "Cure Vibe Wellness", blurb: "Whole-body care that supports your skin and hair from the inside." },
];

export const categoryName = (c: TreatmentCategory) => categories.find((x) => x.slug === c)?.name ?? c;
