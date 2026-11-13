import { branches, site, absoluteUrl } from "@/lib/site";
import { treatments } from "@/data/treatments";
import { cities } from "@/data/locations";
import { doctors } from "@/data/doctors";
import { posts } from "@/data/posts";

export const dynamic = "force-static";

export function GET() {
  const lines = [
    `# ${site.name}`,
    "",
    `> ${site.description}`,
    "",
    "Doctor-led hair restoration and dermatology. Every plan starts with diagnosis (trichoscopy and blood work where needed). 0% EMI available. Open Monday–Sunday, 10:00–13:00 and 16:00–20:00. Free consultation on Wednesdays.",
    `Rated ${site.rating.value}/5 from ${site.rating.count}+ Google reviews across three clinics.`,
    "",
    "## Clinics",
    ...branches.map((b) => `- ${b.label}: ${b.street}, ${b.locality}, ${b.city}, ${b.region} ${b.postalCode}. Phone ${b.phoneDisplay}. Google rating ${b.rating.value} (${b.rating.count} reviews). Page: ${absoluteUrl(`/${b.citySlug}`)}`),
    `- New Delhi / NCR: patients are seen at the Bhiwadi clinic (about 1 hour via NH-48). Page: ${absoluteUrl("/new-delhi")}`,
    "",
    "## Doctors",
    ...doctors.map((d) => `- [${d.name}](${absoluteUrl(`/doctors/${d.slug}`)}): ${d.role}, ${d.credentials}`),
    "",
    "## Treatments",
    ...treatments.map((t) => `- [${t.name}](${absoluteUrl(`/treatments/${t.slug}`)}): ${t.summary}`),
    "",
    "## Locations",
    ...cities.map((c) => `- [${c.displayName}, ${c.state}](${absoluteUrl(`/${c.slug}`)}): areas served include ${c.areas.map((a) => a.name).join(", ")}`),
    "",
    "## Tools",
    `- [Hair graft calculator](${absoluteUrl("/tools/hair-graft-calculator")})`,
    `- [Hair loss self-test](${absoluteUrl("/tools/hair-loss-test")})`,
    "",
    "## Articles",
    ...posts.map((p) => `- [${p.title}](${absoluteUrl(`/blog/${p.slug}`)}): ${p.excerpt}`),
    "",
    "## Optional",
    `- [Full content for LLMs](${absoluteUrl("/llms-full.txt")})`,
    `- [Contact & booking](${absoluteUrl("/contact")}): WhatsApp ${site.phoneDisplay}`,
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
