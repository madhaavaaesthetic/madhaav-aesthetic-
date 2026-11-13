import type { Metadata } from "next";
import { SITE_URL, absoluteUrl, branches, site, type Branch } from "./site";
import type { FAQ, Treatment } from "@/data/types";
import type { Doctor } from "@/data/doctors";
import type { Post } from "@/data/posts";
import { treatments } from "@/data/treatments";
import { reviews } from "@/data/reviews";

interface MetaInput {
  title: string;
  description: string;
  path: string;
  image?: string;
  keywords?: string[];
  type?: "website" | "article";
  noindex?: boolean;
  geo?: { region: string; placename: string; lat: number; lng: number };
  publishedTime?: string;
}

export const BASE_OTHER_META: Record<string, string> = {
  "geo.region": "IN-OR",
  "geo.placename": "Berhampur, Odisha",
  "geo.position": "19.3129609;84.8023602",
  ICBM: "19.3129609, 84.8023602",
  "mobile-web-app-capable": "yes",
  "apple-mobile-web-app-title": "Madhaav",
  rating: "general",
  language: "English",
  "revisit-after": "7 days",
  distribution: "global",
};

const REGION_CODES: Record<string, string> = { Odisha: "IN-OR", Maharashtra: "IN-MH", Rajasthan: "IN-RJ", Delhi: "IN-DL", Haryana: "IN-HR" };
export const regionCode = (state: string) => REGION_CODES[state] ?? "IN";

/** Square brand logo used as the share image for the home page and pages without their own photo. */
const DEFAULT_OG = { url: "/images/og-logo.jpg", width: 1080, height: 1080, type: "image/jpeg" };

export function pageMeta({ title, description, path, image, keywords, type = "website", noindex, geo, publishedTime }: MetaInput): Metadata {
  const url = absoluteUrl(path);
  // Pages with their own photo (treatments, clinics, posts) share it; everything else shows the clinic logo.
  const ogImage = image ?? DEFAULT_OG.url;
  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    other: {
      ...BASE_OTHER_META,
      ...(geo
        ? {
            "geo.region": geo.region,
            "geo.placename": geo.placename,
            "geo.position": `${geo.lat};${geo.lng}`,
            ICBM: `${geo.lat}, ${geo.lng}`,
          }
        : {}),
      ...(publishedTime ? { "article:published_time": publishedTime } : {}),
    },
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      locale: "en_IN",
      type,
      images: [image ? { url: ogImage, alt: title } : { ...DEFAULT_OG, alt: title }],
    },
    twitter: { card: image ? "summary_large_image" : "summary", title, description, images: [ogImage] },
    robots: noindex ? { index: false, follow: true } : { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  };
}

const ORG_ID = `${SITE_URL}/#organization`;
const SITE_ID = `${SITE_URL}/#website`;
const branchId = (b: Branch) => `${SITE_URL}/${b.citySlug}#clinic`;

export function organizationLd() {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalOrganization",
    "@id": ORG_ID,
    name: site.name,
    legalName: site.legalName,
    alternateName: site.alternateNames,
    url: SITE_URL,
    logo: absoluteUrl("/images/logo-full.png"),
    image: absoluteUrl("/images/logo-full.jpg"),
    slogan: site.tagline,
    description: site.description,
    telephone: site.phone,
    sameAs: [site.instagram, site.threads, ...branches.map((b) => b.mapsUrl)],
    medicalSpecialty: ["Dermatologic", "PlasticSurgery"],
    founder: { "@id": `${SITE_URL}/doctors/dr-mannu-singgh#physician` },
    subOrganization: branches.map((b) => ({ "@id": branchId(b) })),
    aggregateRating: { "@type": "AggregateRating", ratingValue: site.rating.value, reviewCount: site.rating.count, bestRating: 5 },
  };
}

export function websiteLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": SITE_ID,
    url: SITE_URL,
    name: site.name,
    inLanguage: "en-IN",
    publisher: { "@id": ORG_ID },
  };
}

export function clinicLd(b: Branch) {
  return {
    "@context": "https://schema.org",
    "@type": ["MedicalClinic", "LocalBusiness"],
    "@id": branchId(b),
    name: b.name,
    url: absoluteUrl(`/${b.citySlug}`),
    image: absoluteUrl(b.image),
    logo: absoluteUrl("/images/logo-full.png"),
    telephone: b.phone,
    priceRange: "₹₹",
    currenciesAccepted: "INR",
    paymentAccepted: "Cash, UPI, Credit Card, Debit Card, EMI",
    parentOrganization: { "@id": ORG_ID },
    address: {
      "@type": "PostalAddress",
      streetAddress: `${b.street}, ${b.locality}`,
      addressLocality: b.city,
      addressRegion: b.region,
      postalCode: b.postalCode,
      addressCountry: "IN",
    },
    geo: { "@type": "GeoCoordinates", latitude: b.geo.lat, longitude: b.geo.lng },
    hasMap: b.mapsUrl,
    openingHoursSpecification: site.openingHoursSpec.map((s) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: s.opens,
      closes: s.closes,
    })),
    aggregateRating: { "@type": "AggregateRating", ratingValue: b.rating.value, reviewCount: b.rating.count, bestRating: 5 },
    review: reviews
      .filter((r) => r.city === b.slug)
      .slice(0, 5)
      .map((r) => ({
        "@type": "Review",
        author: { "@type": "Person", name: r.name },
        datePublished: r.date,
        reviewBody: r.text,
        reviewRating: { "@type": "Rating", ratingValue: r.stars, bestRating: 5 },
      })),
    medicalSpecialty: ["Dermatologic", "PlasticSurgery"],
    isAcceptingNewPatients: true,
    ...(b.hfrId ? { identifier: { "@type": "PropertyValue", propertyID: "HFR ID", value: b.hfrId } } : {}),
    availableService: treatments.map((t) => ({
      "@type": t.procedureType === "Medical" ? "MedicalTherapy" : "MedicalProcedure",
      name: t.name,
      url: absoluteUrl(`/${b.citySlug}/${t.slug}`),
    })),
  };
}

export function physicianLd(d: Doctor) {
  return {
    "@context": "https://schema.org",
    "@type": "Physician",
    "@id": `${SITE_URL}/doctors/${d.slug}#physician`,
    name: d.name,
    ...(d.alternateName ? { alternateName: d.alternateName } : {}),
    url: absoluteUrl(`/doctors/${d.slug}`),
    description: d.bio[0],
    jobTitle: d.role,
    hasCredential: d.credentials,
    knowsAbout: d.focus,
    worksFor: { "@id": ORG_ID },
    memberOf: { "@id": ORG_ID },
  };
}

export function treatmentLd(t: Treatment, path: string, areaServed?: string) {
  return {
    "@context": "https://schema.org",
    "@type": t.procedureType === "Medical" ? "MedicalTherapy" : "MedicalProcedure",
    name: t.name,
    alternateName: t.keywords.slice(0, 4),
    description: t.summary,
    url: absoluteUrl(path),
    image: absoluteUrl(t.image),
    ...(t.procedureType !== "Medical" ? { procedureType: `https://schema.org/${t.procedureType === "Surgical" ? "SurgicalProcedure" : t.procedureType === "Percutaneous" ? "PercutaneousProcedure" : "NoninvasiveProcedure"}` } : {}),
    howPerformed: t.steps.map((s) => `${s.title}: ${s.text}`).join(" "),
    preparation: "Consultation and clinical assessment with a doctor.",
    followup: t.aftercare.join("; "),
    status: "https://schema.org/EventScheduled",
    ...(areaServed ? { areaServed: { "@type": "City", name: areaServed } } : {}),
    provider: { "@id": ORG_ID },
  };
}

export function faqLd(faqs: FAQ[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: absoluteUrl(it.path) })),
  };
}

export function articleLd(p: Post) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    headline: p.title,
    description: p.excerpt,
    image: absoluteUrl(p.image),
    datePublished: p.date,
    dateModified: p.date,
    inLanguage: "en-IN",
    url: absoluteUrl(`/blog/${p.slug}`),
    author: { "@id": `${SITE_URL}/doctors/dr-mannu-singgh#physician`, "@type": "Physician", name: "Dr. Mannu Singgh" },
    reviewedBy: { "@type": "Physician", name: "Dr. Mannu Singgh" },
    publisher: { "@id": ORG_ID },
    keywords: p.keywords.join(", "),
  };
}

export function serviceAreaLd(name: string, path: string, areaNames: string[], branch?: Branch) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name,
    url: absoluteUrl(path),
    about: { "@id": branch ? branchId(branch) : ORG_ID },
    audience: { "@type": "PeopleAudience", geographicArea: areaNames.map((n) => ({ "@type": "Place", name: n })) },
    publisher: { "@id": ORG_ID },
  };
}
