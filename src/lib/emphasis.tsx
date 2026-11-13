import type { ReactNode } from "react";

/** Terms patients search for and scan for; their first mention in a paragraph is set slightly bolder. */
export const KEY_TERMS = [
  "FUE hair transplant", "hair transplant", "beard transplant", "FUE", "PRP", "GFC", "exosomes", "exosome", "QR678", "Dutexome",
  "Cosmelan", "laser hair reduction", "laser hair removal", "Hydrafacial", "carbon peel", "chemical peel", "laser toning",
  "melasma", "pigmentation", "acne scars", "acne", "alopecia areata", "scalp micropigmentation", "tattoo removal",
  "hair fall", "hair loss", "trichoscopy", "dermatologist", "trichologist", "0% EMI", "free consultation",
  "Berhampur", "Brahmapur", "Thane West", "Bhiwadi", "New Delhi",
];

const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const PATTERN = new RegExp(`(^|[^\\w-])(${[...KEY_TERMS].sort((a, b) => b.length - a.length).map(escape).join("|")})(?=$|[^\\w-])`, "gi");

/** Returns the text with the first mention of each key term wrapped in <strong>. Pure function: safe on server and client. */
export function emphasize(text: string): ReactNode {
  const out: ReactNode[] = [];
  const seen = new Set<string>();
  let last = 0;
  for (const m of text.matchAll(PATTERN)) {
    const term = m[2];
    const key = term.toLowerCase();
    // treat "exosome"/"exosomes" and "hair transplant"/"FUE hair transplant" as one idea per paragraph
    const idea = key.replace(/s$/, "").replace(/^fue hair transplant$/, "hair transplant");
    if (seen.has(idea)) continue;
    seen.add(idea);
    const start = (m.index ?? 0) + m[1].length;
    if (start > last) out.push(text.slice(last, start));
    out.push(
      <strong key={start} className="font-semibold">
        {term}
      </strong>
    );
    last = start + term.length;
  }
  if (!out.length) return text;
  if (last < text.length) out.push(text.slice(last));
  return out;
}
