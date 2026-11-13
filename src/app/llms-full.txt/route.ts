import { branches, site, absoluteUrl } from "@/lib/site";
import { treatments } from "@/data/treatments";
import { cities } from "@/data/locations";
import { doctors } from "@/data/doctors";
import { homeFaqs } from "@/data/faqs";

export const dynamic = "force-static";

export function GET() {
  const out: string[] = [`# ${site.name}: full reference`, "", site.description, ""];
  out.push("## Clinics", "");
  branches.forEach((b) => {
    out.push(`### ${b.label}`, `Address: ${b.street}, ${b.locality}, ${b.city}, ${b.district} district, ${b.region} ${b.postalCode}, India`, `Phone: ${b.phoneDisplay}`, `Hours: Monday–Sunday 10:00–13:00, 16:00–20:00`, `Google rating: ${b.rating.value}/5 from ${b.rating.count} reviews`, `Map: ${b.mapsUrl}`, "");
  });
  out.push("## Doctors", "");
  doctors.forEach((d) => out.push(`### ${d.name}${d.alternateName ? ` (also ${d.alternateName})` : ""}`, `${d.role}, ${d.credentials}. ${d.base}.`, ...d.bio, `Focus: ${d.focus.join(", ")}`, ""));
  out.push("## Treatments", "");
  treatments.forEach((t) => {
    out.push(`### ${t.name}`, `URL: ${absoluteUrl(`/treatments/${t.slug}`)}`, t.summary, ...t.intro);
    out.push(`Key facts: ${t.stats.map((s) => `${s.label}: ${s.value}`).join("; ")}`);
    out.push(`Suitable for: ${t.idealFor.join("; ")}`);
    out.push(`Steps: ${t.steps.map((s, i) => `${i + 1}. ${s.title}: ${s.text}`).join(" ")}`);
    out.push(`Timeline: ${t.timeline.map((x) => `${x.when}: ${x.what}`).join(" ")}`);
    out.push(`Safety: ${t.safety}`);
    t.faqs.forEach((f) => out.push(`Q: ${f.q}`, `A: ${f.a}`));
    out.push("");
  });
  out.push("## Locations served", "");
  cities.forEach((c) => {
    out.push(`### ${c.displayName}, ${c.state}`, ...c.intro, c.climateNote, `Areas: ${c.areas.map((a) => `${a.name} (${a.distance})`).join(", ")}`);
    c.faqs.forEach((f) => out.push(`Q: ${f.q}`, `A: ${f.a}`));
    out.push("");
  });
  out.push("## General FAQs", "");
  homeFaqs.forEach((f) => out.push(`Q: ${f.q}`, `A: ${f.a}`));
  return new Response(out.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
