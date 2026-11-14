import { cities, states } from "@/data/locations";
import { coreTreatments, treatments } from "@/data/treatments";
import { doctors } from "@/data/doctors";
import { posts } from "@/data/posts";

export interface RouteEntry {
  path: string;
  priority: number;
  changeFrequency: "weekly" | "monthly" | "yearly";
  lastModified?: string;
}

/** Every indexable URL on the site, generated from the same data the pages use. */
export function allRoutes(): RouteEntry[] {
  const r: RouteEntry[] = [
    { path: "/", priority: 1, changeFrequency: "weekly" },
    { path: "/treatments", priority: 0.9, changeFrequency: "monthly" },
    { path: "/locations", priority: 0.9, changeFrequency: "monthly" },
    { path: "/doctors", priority: 0.8, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.8, changeFrequency: "monthly" },
    { path: "/about", priority: 0.6, changeFrequency: "yearly" },
    { path: "/results", priority: 0.6, changeFrequency: "monthly" },
    { path: "/blog", priority: 0.7, changeFrequency: "weekly" },
    { path: "/products", priority: 0.5, changeFrequency: "monthly" },
    { path: "/tools/hair-graft-calculator", priority: 0.8, changeFrequency: "monthly" },
    { path: "/tools/hair-loss-test", priority: 0.7, changeFrequency: "monthly" },
    { path: "/privacy-policy", priority: 0.2, changeFrequency: "yearly" },
    { path: "/medical-disclaimer", priority: 0.2, changeFrequency: "yearly" },
    { path: "/cookie-policy", priority: 0.2, changeFrequency: "yearly" },
    { path: "/site-map", priority: 0.3, changeFrequency: "monthly" },
  ];
  treatments.forEach((t) => r.push({ path: `/treatments/${t.slug}`, priority: t.core ? 0.9 : 0.8, changeFrequency: "monthly" }));
  doctors.forEach((d) => r.push({ path: `/doctors/${d.slug}`, priority: 0.6, changeFrequency: "yearly" }));
  posts.forEach((p) => r.push({ path: `/blog/${p.slug}`, priority: 0.6, changeFrequency: "yearly", lastModified: p.date }));
  states.forEach((s) => r.push({ path: `/locations/${s.slug}`, priority: 0.7, changeFrequency: "monthly" }));
  cities.forEach((c) => {
    r.push({ path: `/${c.slug}`, priority: c.clinic.verified ? 0.95 : 0.8, changeFrequency: "weekly" });
    treatments.forEach((t) => r.push({ path: `/${c.slug}/${t.slug}`, priority: t.core ? 0.85 : 0.7, changeFrequency: "monthly" }));
    c.areas.forEach((a) => {
      r.push({ path: `/${c.slug}/${a.slug}`, priority: 0.6, changeFrequency: "monthly" });
      coreTreatments.forEach((t) => r.push({ path: `/${c.slug}/${a.slug}/${t.slug}`, priority: 0.5, changeFrequency: "monthly" }));
    });
  });
  return r;
}
