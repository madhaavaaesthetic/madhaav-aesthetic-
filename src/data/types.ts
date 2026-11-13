export type TreatmentCategory = "hair-restoration" | "hair-regrowth" | "skin-aesthetics" | "clinical-dermatology" | "wellness";

export type DoctorSlug = "dr-mannu-singgh" | "dr-kapil-patil" | "dr-vinay-chouksey";

export interface FAQ {
  q: string;
  a: string;
}

export interface Treatment {
  slug: string;
  name: string;
  shortName: string;
  category: TreatmentCategory;
  tagline: string;
  summary: string;
  keywords: string[];
  image: string;
  imageAlt: string;
  core?: boolean;
  procedureType: "Surgical" | "Noninvasive" | "Percutaneous" | "Medical";
  stats: { label: string; value: string }[];
  intro: string[];
  idealFor: string[];
  steps: { title: string; text: string }[];
  benefits: string[];
  timeline: { when: string; what: string }[];
  aftercare: string[];
  safety: string;
  faqs: FAQ[];
  related: string[];
  doctors: DoctorSlug[];
  local: { humid: string; dry: string };
  /** A named treatment we offer within this service (e.g. Cosmelan), explained in its own section. */
  spotlight?: { eyebrow: string; title: string; paragraphs: string[]; points: string[]; note?: string };
}

export type Climate = "humid" | "dry";

export interface Area {
  slug: string;
  name: string;
  /** Short description of the locality used in copy. */
  about: string;
  distance: string;
  route: string;
  pin?: string;
  landmarks: string[];
  kind: "locality" | "suburb" | "town" | "city";
}

export interface City {
  slug: string;
  name: string;
  displayName: string;
  aliases: string[];
  state: string;
  stateSlug: string;
  district: string;
  climate: Climate;
  geo: { lat: number; lng: number };
  pins: string[];
  hero: string;
  intro: string[];
  climateNote: string;
  waterNote: string;
  reach: string[];
  localTerms: { lang: string; terms: string[] }[];
  clinic: {
    verified: boolean;
    label: string;
    street?: string;
    locality?: string;
    postalCode?: string;
    note: string;
  };
  areas: Area[];
  faqs: FAQ[];
}

export interface State {
  slug: string;
  name: string;
  intro: string;
  cities: string[];
}
