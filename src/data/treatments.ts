import { hairTreatments } from "./treatments-hair";
import { skinTreatments } from "./treatments-skin";
import type { Treatment } from "./types";

export const treatments: Treatment[] = [...hairTreatments, ...skinTreatments];

export const treatmentMap = new Map(treatments.map((t) => [t.slug, t]));

export const getTreatment = (slug: string) => treatmentMap.get(slug);

export const coreTreatments = treatments.filter((t) => t.core);

export { categories, categoryName } from "./categories";
