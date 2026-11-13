export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://madhaavaaesthetic.com").replace(/\/$/, "");

export interface Branch {
  slug: string;
  citySlug: string;
  name: string;
  label: string;
  street: string;
  locality: string;
  city: string;
  district: string;
  region: string;
  regionCode: string;
  postalCode: string;
  phone: string;
  phoneDisplay: string;
  whatsapp: string;
  geo: { lat: number; lng: number };
  rating: { value: number; count: number };
  mapsUrl: string;
  directionsUrl: string;
  mapEmbed: string;
  image: string;
  hfrId?: string;
}

const embed = (lat: number, lng: number) => `https://www.google.com/maps?q=${lat},${lng}&z=16&output=embed`;
const directions = (lat: number, lng: number) => `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;

export const branches: Branch[] = [
  {
    slug: "berhampur",
    citySlug: "berhampur",
    name: "Madhaav Aesthetic and Cure Vibe Clinic: Dr. Mannu Singgh",
    label: "Berhampur (Brahmapur)",
    street: "Room No. 36, BDA Complex, New Bus Stand",
    locality: "Aurobinda Nagar",
    city: "Brahmapur",
    district: "Ganjam",
    region: "Odisha",
    regionCode: "OD",
    postalCode: "760004",
    phone: "+919116004333",
    phoneDisplay: "+91 91160 04333",
    whatsapp: "919116004333",
    geo: { lat: 19.3129609, lng: 84.8023602 },
    rating: { value: 4.8, count: 243 },
    mapsUrl: "https://maps.google.com/?cid=7195382621818988740",
    directionsUrl: directions(19.3129609, 84.8023602),
    mapEmbed: embed(19.3129609, 84.8023602),
    image: "/images/clinic-storefront-berhampur.jpg",
  },
  {
    slug: "thane",
    citySlug: "thane",
    name: "Madhaav Aaesthetic and Cure Vibe Clinics, Thane West",
    label: "Thane West (Naupada)",
    street: "Shop No. 5, Nakhwa Enclave, Opp. Naupada Police Station",
    locality: "Vishnu Nagar, Naupada, Thane West",
    city: "Thane",
    district: "Thane",
    region: "Maharashtra",
    regionCode: "MH",
    postalCode: "400602",
    phone: "+919769765901",
    phoneDisplay: "+91 97697 65901",
    whatsapp: "919116004333",
    geo: { lat: 19.1890295, lng: 72.9678343 },
    rating: { value: 5.0, count: 14 },
    mapsUrl: "https://maps.google.com/?cid=5733233205223239754",
    directionsUrl: directions(19.1890295, 72.9678343),
    mapEmbed: embed(19.1890295, 72.9678343),
    image: "/images/thane-clinic-storefront-naupada.jpg",
    hfrId: "IN2710050569",
  },
  {
    slug: "bhiwadi",
    citySlug: "bhiwadi",
    name: "Madhaav Aaesthetic and Cure Vibe Clinics, Bhiwadi",
    label: "Bhiwadi (Rajasthan)",
    street: "First Floor, D-11, Madhav Marg, Bhagat Singh Colony",
    locality: "U.I.T.",
    city: "Bhiwadi",
    district: "Khairthal-Tijara",
    region: "Rajasthan",
    regionCode: "RJ",
    postalCode: "301019",
    phone: "+919116004222",
    phoneDisplay: "+91 91160 04222",
    whatsapp: "919116004222",
    geo: { lat: 28.2057328, lng: 76.8113928 },
    rating: { value: 4.9, count: 43 },
    mapsUrl: "https://maps.google.com/?cid=16550247746303103683",
    directionsUrl: directions(28.2057328, 76.8113928),
    mapEmbed: embed(28.2057328, 76.8113928),
    image: "/images/bhiwadi-clinic-storefront.jpg",
  },
];

export const branchBySlug = (slug: string) => branches.find((b) => b.slug === slug);

const totalReviews = branches.reduce((n, b) => n + b.rating.count, 0);
const weighted = branches.reduce((n, b) => n + b.rating.value * b.rating.count, 0) / totalReviews;

export const site = {
  name: "Madhaav Aesthetic & Cure Vibe Clinics",
  shortName: "Madhaav Aesthetic",
  legalName: "Madhaav Aesthetic and Cure Vibe Clinic",
  alternateNames: [
    "Madhaav Aaesthetic and Cure Vibe Clinics",
    "Cure Vibe Hair Transplant & Dermatology Clinic",
    "Madhaav Aesthetic",
    "माधव एस्थेटिक आणि क्योर वाइब क्लिनिक",
  ],
  tagline: "Timeless Beauty, Expertly Delivered.",
  description:
    "Hair transplant, hair regrowth and dermatology clinics in Berhampur (Odisha), Thane West (Maharashtra) and Bhiwadi (Rajasthan), led by Dr. Mannu Singgh with hair transplant and laser surgeons from Mumbai. FUE, PRP, GFC, exosomes, QR678, laser hair reduction, Hydrafacial, acne and pigmentation care.",
  phone: "+919116004333",
  phoneDisplay: "+91 91160 04333",
  altPhones: [
    { tel: "+919116004222", display: "+91 91160 04222" },
    { tel: "+919769765901", display: "+91 97697 65901" },
    { tel: "+919337339712", display: "+91 93373 39712" },
  ],
  whatsapp: "919116004333",
  rating: { value: Math.round(weighted * 10) / 10, count: totalReviews },
  googleReviewsUrl: "https://maps.google.com/?cid=7195382621818988740",
  instagram: "https://www.instagram.com/madhaav_aesthetics/",
  threads: "https://www.threads.net/@madhaav_aesthetics",
  hours: [{ days: "Monday – Sunday", slots: ["10:00 am – 1:00 pm", "4:00 pm – 8:00 pm"] }],
  openingHoursSpec: [
    { opens: "10:00", closes: "13:00" },
    { opens: "16:00", closes: "20:00" },
  ],
  freeWednesday: "Free consultation every Wednesday",
  emiPartners: ["SaveIN", "Bajaj Finserv Health"],
} as const;

export const whatsappLink = (message?: string, number: string = site.whatsapp) =>
  `https://wa.me/${number}${message ? `?text=${encodeURIComponent(message)}` : ""}`;

export const telLink = (tel: string = site.phone) => `tel:${tel}`;

export const absoluteUrl = (path = "/") => `${SITE_URL}${path === "/" ? "" : path}`;
