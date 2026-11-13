import type { Area, City, FAQ, Treatment } from "@/data/types";
import { getDoctor } from "@/data/doctors";
import { branchBySlug, site, type Branch } from "./site";
import { fill, lower, pick, pickMany } from "./utils";
import { searchFor } from "@/data/keywords";

export const branchForCity = (city: City): Branch => branchBySlug(city.slug) ?? branchBySlug("bhiwadi")!;

const addressLine = (b: Branch) => `${b.street}, ${b.locality}, ${b.city}, ${b.region} ${b.postalCode}`;

const doctorNames = (t: Treatment) =>
  t.doctors
    .map((d) => getDoctor(d))
    .filter(Boolean)
    .map((d) => `${d!.name} (${d!.credentials})`)
    .join(" and ");

function vars(city: City, t?: Treatment, area?: Area): Record<string, string> {
  const b = branchForCity(city);
  return {
    city: city.name,
    cityFull: city.displayName,
    state: city.state,
    district: city.district,
    t: t?.name ?? "",
    ts: t?.shortName ?? "",
    tl: lower(t?.shortName ?? ""),
    area: area?.name ?? "",
    distance: area?.distance ?? "",
    route: area?.route ?? "",
    branch: b.label,
    address: addressLine(b),
    phone: b.phoneDisplay,
  };
}

const CT_INTROS = [
  "Looking for {t} in {cityFull}? At Madhaav Aesthetic, {tl} begins with a proper diagnosis by a trichologist and dermatologist, not a sales pitch. We assess your concern, explain what is realistic, and build a plan around you.",
  "{t} in {city} at Madhaav Aesthetic is led by doctors, planned around you, and explained in plain language. Every patient starts with an examination so the treatment fits the cause, the stage and your goals.",
  "If you are searching for {tl} near you in {city}, {state}, this page explains how the treatment works at our clinic, who it suits, how many sessions or how much recovery to expect, and how to book.",
];

const CT_LOCAL_VERIFIED = [
  "Our {city} clinic at {address} is open seven days a week, with morning and evening slots, so treatment fits around work or college.",
  "You'll find us at {address}. The clinic is open every day from 10 am to 1 pm and 4 pm to 8 pm.",
];

const CT_LOCAL_REMOTE = [
  "We don't have a clinic inside {city} yet. Patients from {city} are seen at our {branch} clinic ({address}), and you can start with a WhatsApp consultation before you travel.",
  "{city} patients are welcome at our nearest clinic in {branch}. Share photos and your concern on WhatsApp first, and we'll tell you whether a visit makes sense.",
];

export function cityTreatmentContent(city: City, t: Treatment) {
  const v = vars(city, t);
  const seed = `${city.slug}/${t.slug}`;
  const verified = city.clinic.verified;
  const s = searchFor(t.slug);
  const b = branchForCity(city);
  const metaTitle = pick(seed + "title", [
    `Best ${t.shortName} in ${city.name} – Cost, Doctors & Reviews | Madhaav`,
    `Best ${t.name} in ${city.name} | Cost & Results – Madhaav Aesthetic`,
    `${t.shortName} in ${city.name}: Cost, Best Clinic & Doctors | Madhaav`,
  ]);
  const description = `Best ${lower(t.shortName)} in ${city.displayName}${verified ? "" : " (seen at our Bhiwadi clinic)"}. ${s ? `Typical cost ${s.cost.range.split(" (")[0]} ${s.cost.unit}. ` : ""}${b.rating.value}★ from ${b.rating.count} Google reviews · 0% EMI · Book on WhatsApp.`;
  const intro = [fill(pick(seed, CT_INTROS), v), fill(pick(seed + "l", verified ? CT_LOCAL_VERIFIED : CT_LOCAL_REMOTE), v)];
  const localWhy = t.local[city.climate];
  const names = [city.name, ...city.aliases.filter((al) => al !== city.name).slice(0, 2)];
  const keywordsLine = [
    ...names.flatMap((n) => [`best ${lower(t.shortName)} in ${n}`, `${(s?.short[0] ?? t.keywords[0]).toLowerCase()} ${n}`]),
    `${lower(t.shortName)} near me`,
    `${lower(t.shortName)} cost in ${city.name}`,
    `${lower(t.shortName)} price in ${city.name}`,
    ...(s?.short ?? []).slice(0, 5),
    ...(s?.long ?? []).slice(0, 4),
    ...(s?.hinglish ?? []).slice(0, 2),
  ];
  const faqs: FAQ[] = [
    {
      q: `Which is the best clinic for ${lower(t.shortName)} in ${city.name}?`,
      a: `Madhaav Aesthetic is ${verified ? `rated ${b.rating.value}★ by ${b.rating.count} patients on Google in ${city.name}` : `rated ${b.rating.value}★ on Google at our Bhiwadi clinic, the nearest to ${city.name}`}. Every plan starts with a doctor-led diagnosis, ${t.category === "hair-restoration" ? "hair transplants are performed by a surgeon from Mumbai," : "treatments are supervised by our dermatology team,"} and you get a written quote with 0% EMI options.`,
    },
    {
      q: `Where can I get ${lower(t.shortName)} in ${city.name}?`,
      a: verified
        ? `At Madhaav Aesthetic, ${addressLine(branchForCity(city))}. Call ${v.phone} or message us on WhatsApp to book.`
        : `Patients from ${city.name} are treated at our ${v.branch} clinic, ${v.address}. Start with a WhatsApp consultation on +91 91160 04333.`,
    },
    {
      q: pick(seed + "cq", [`How much does ${lower(t.shortName)} cost in ${city.name}?`, `What is the price of ${lower(t.shortName)} in ${city.name}?`]),
      a: `${s ? `${t.name} typically costs ${s.cost.range} ${s.cost.unit} in India. ` : ""}Your exact price depends on ${s ? s.cost.factors.join(", ").toLowerCase() : "your assessment"}. You get a clear, written quote after your consultation in ${city.name}, and 0% EMI options are available.`,
    },
    { q: `Who performs ${lower(t.shortName)} at Madhaav?`, a: `${t.name} is planned and supervised by ${doctorNames(t)}.` },
    ...pickMany(seed + "f", t.faqs, 3),
  ];
  return { metaTitle, description, intro, localWhy, keywordsLine, faqs, h1: `Best ${t.name} in ${city.name}` };
}

const AREA_INTROS = [
  "Living in {area}? Madhaav Aesthetic is {distance} away, {route}. People from {area} come to us for hair fall, hair transplants and skin care with doctors who explain every step.",
  "For patients in {area}, our {branch} clinic is {distance} away, {route}. Here's what we offer, how to reach us, and answers to common questions.",
  "{area} is {areaAbout}. Patients from here visit Madhaav Aesthetic, {distance} away, for diagnosis-led hair and skin treatment.",
];

export function areaContent(city: City, area: Area) {
  const v: Record<string, string> = { ...vars(city, undefined, area), areaAbout: area.about };
  const seed = `${city.slug}/${area.slug}`;
  const metaTitle = pick(seed + "t", [
    `Best Hair Transplant & Skin Clinic near ${area.name}, ${city.name} | Madhaav`,
    `Best Dermatologist & Hair Clinic near ${area.name}, ${city.name} | Madhaav`,
    `Hair Fall Treatment, Hair Transplant & Skin Doctor near ${area.name} | Madhaav`,
  ]);
  const description = `Looking for a hair or skin clinic near ${area.name}, ${city.name}? Hair transplant, PRP & GFC hair fall treatment, laser hair removal, Hydrafacial & dermatologist care, ${area.distance} away. ${branchForCity(city).rating.value}★ on Google.`;
  const intro = [fill(pick(seed, AREA_INTROS), v), `${area.name} is ${area.about}. ${city.climateNote.split(". ")[0]}.`];
  const faqs: FAQ[] = [
    { q: `How far is Madhaav Aesthetic from ${area.name}?`, a: `Our ${v.branch} clinic is ${area.distance} from ${area.name}, ${area.route}. Address: ${v.address}.` },
    { q: `Is there a hair transplant clinic near ${area.name}?`, a: city.clinic.verified ? `Yes. Madhaav Aesthetic in ${city.name} offers consultation and FUE hair transplant planning, with procedures performed by our hair transplant surgeon from Mumbai.` : `Our nearest clinic for ${area.name} is in ${v.branch}. You can start with a WhatsApp consultation before you travel.` },
    { q: `What are the timings for patients from ${area.name}?`, a: `Every day, 10:00 am – 1:00 pm and 4:00 pm – 8:00 pm. Call ${v.phone} to book a slot that suits your commute.` },
    { q: `Do you treat skin problems for ${area.name} residents too?`, a: `Yes: acne, pigmentation, melasma, eczema, psoriasis and fungal infections, plus laser hair reduction, Hydrafacial and carbon peel.` },
  ];
  return { metaTitle, description, intro, faqs, h1: `Best hair & skin clinic near ${area.name}` };
}

export function areaTreatmentContent(city: City, area: Area, t: Treatment) {
  const v = vars(city, t, area);
  const seed = `${city.slug}/${area.slug}/${t.slug}`;
  const metaTitle = pick(seed, [
    `Best ${t.shortName} near ${area.name}, ${city.name} – Cost & Clinic | Madhaav`,
    `${t.shortName} near ${area.name} (${city.name}): Cost & Best Clinic | Madhaav`,
  ]);
  const s = searchFor(t.slug);
  const description = `${t.shortName} near ${area.name}, ${city.name}. ${s ? `Typical cost ${s.cost.range.split(" (")[0]} ${s.cost.unit}. ` : ""}Clinic ${area.distance} away · ${branchForCity(city).rating.value}★ Google rating · 0% EMI. Book on WhatsApp.`;
  const intro = [
    fill(
      pick(seed + "i", [
        "If you live in or around {area} and are considering {tl}, Madhaav Aesthetic is {distance} away, {route}.",
        "Patients from {area} choose Madhaav Aesthetic for {tl} because care is doctor-led, explained honestly and planned around them. The clinic is {distance} away, {route}.",
        "{t} for {area}: our {branch} clinic is {distance} away, {route}, and open seven days a week.",
      ]),
      v
    ),
    t.intro[0],
  ];
  const faqs: FAQ[] = [
    { q: `Where is the nearest clinic for ${lower(t.shortName)} near ${area.name}?`, a: `Madhaav Aesthetic, ${v.address}, ${area.distance} from ${area.name}.` },
    ...(s ? [{ q: `What does ${lower(t.shortName)} cost near ${area.name}?`, a: `${t.name} typically costs ${s.cost.range} ${s.cost.unit}. The exact price depends on ${s.cost.factors.join(", ").toLowerCase()}. 0% EMI is available.` }] : []),
    ...pickMany(seed + "f", t.faqs, 4),
  ];
  return { metaTitle, description, intro, faqs, h1: `Best ${t.name} near ${area.name}` };
}

export function cityHubContent(city: City) {
  const metaTitle = `Best Hair Transplant & Skin Clinic in ${city.name}${city.slug === "berhampur" ? " (Brahmapur)" : ""} | Dermatologist – Madhaav`;
  const description = city.clinic.verified
    ? `Best hair transplant & skin clinic in ${city.name}: FUE hair transplant, hair fall treatment (PRP, GFC, QR678), laser hair removal, Hydrafacial, acne & pigmentation. ${branchForCity(city).rating.value}★ (${branchForCity(city).rating.count} reviews). Open daily.`
    : `Hair transplant and skin care for ${city.name} patients at our nearest clinic in Bhiwadi (about 1 hr via NH-48). WhatsApp consultations, 0% EMI, ${site.rating.value}★ rated.`;
  return { metaTitle, description, h1: city.clinic.verified ? `Best hair transplant & skin clinic in ${city.name}` : `Hair transplant & skin care for ${city.name}` };
}
