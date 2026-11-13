import { search, cityQueries } from "@/data/keywords";
import { cities, states } from "@/data/locations";
import { treatments } from "@/data/treatments";

/**
 * Single source of truth for the master keyword list: every keyword is assigned to the page that targets it.
 * Pages render their own list ("Related searches" + meta keywords), and docs/keywords-master-list.csv is generated from this.
 */
export interface KeywordRow {
  group: string;
  location: string;
  type: string;
  keyword: string;
  page: string;
}

const lc = (s: string) =>
  s
    .split(" ")
    .map((w) => (/^[A-Z0-9][A-Z0-9-]+$/.test(w) ? w : w.toLowerCase()))
    .join(" ");

const EXCLUDED_ALIASES = /^(Alwar|Ganjam|Khairthal-Tijara|UIT Bhiwadi|Delhi NCR|Thane Mumbai)$/;

function build(): KeywordRow[] {
  const rows: KeywordRow[] = [];
  const add = (group: string, location: string, type: string, keyword: string, page: string) =>
    rows.push({ group, location, type, keyword: keyword.replace(/\s+/g, " ").trim(), page });

  [
    "madhaav aesthetic", "madhaav aaesthetic", "madhaav aesthetic and cure vibe clinic", "cure vibe clinic", "cure vibe hair transplant and dermatology clinic",
    "dr mannu singgh", "dr manu singh", "dr manu singh dermatologist", "dr kapil patil hair transplant", "dr vinay chouksey", "madhaav aesthetic reviews", "madhaav aesthetic contact number",
  ].forEach((k) => add("Brand", "All", "Brand", k, "/"));

  for (const t of treatments) {
    const s = search[t.slug];
    if (!s) continue;
    s.short.forEach((k) => add(t.name, "India", "Short-tail", k, `/treatments/${t.slug}`));
    s.long.forEach((k) => add(t.name, "India", "Long-tail", k, `/treatments/${t.slug}`));
    s.hinglish.forEach((k) => add(t.name, "India", "Hinglish", k, `/treatments/${t.slug}`));
  }

  for (const c of cities) {
    const st = states.find((x) => x.slug === c.stateSlug);
    const names = [c.name, ...c.aliases.filter((a) => a !== c.name && !EXCLUDED_ALIASES.test(a))];
    cityQueries(c.name).forEach((k) => add("City", c.displayName, "Short-tail", k, `/${c.slug}`));
    names.slice(1).forEach((n) => cityQueries(n).slice(0, 6).forEach((k) => add("City", c.displayName, "Spelling variant", k, `/${c.slug}`)));
    [
      `best hair transplant clinic in ${c.name}`, `best skin clinic in ${c.name}`, `best dermatologist near me in ${c.name}`, `hair transplant doctor in ${c.name}`,
      `trichologist in ${c.name}`, `hair specialist in ${c.name}`, `skin doctor in ${c.name}`, `cosmetologist in ${c.name}`, `hair transplant cost in ${c.name}`,
      `hair transplant price in ${c.name}`, `hair transplant on EMI in ${c.name}`, `hair clinic open on sunday ${c.name}`,
    ].forEach((k) => add("City", c.displayName, "Long-tail", k, `/${c.slug}`));
    c.localTerms.forEach((l) => l.terms.forEach((k) => add("City", c.displayName, `Regional (${l.lang})`, k.replace(/\s*\(.*\)\s*$/, ""), `/${c.slug}`)));
    if (st) {
      [`hair transplant in ${st.name}`, `best hair transplant in ${st.name}`, `best dermatologist in ${st.name}`, `hair transplant cost in ${st.name}`, `skin clinic in ${st.name}`].forEach((k) =>
        add("State", st.name, "State-level", k, `/locations/${st.slug}`)
      );
    }
    for (const t of treatments) {
      const s = search[t.slug];
      const short = lc(t.shortName);
      const base = [`${short} in ${c.name}`, `best ${short} in ${c.name}`, `${short} cost in ${c.name}`, `${short} price in ${c.name}`, `${short} near me ${c.name}`];
      if (s) base.push(...s.short.slice(0, 3).map((k) => `${k.replace(/ near me$/, "")} in ${c.name}`));
      names.slice(1, 3).forEach((n) => base.push(`${short} ${n}`));
      [...new Set(base)].forEach((k) => add(t.name, c.displayName, "Treatment + city", k, `/${c.slug}/${t.slug}`));
    }
    for (const a of c.areas) {
      const ak = [
        `hair transplant near ${a.name}`, `hair clinic near ${a.name}`, `dermatologist near ${a.name}`, `skin specialist near ${a.name}`, `skin clinic in ${a.name}`,
        `hair fall treatment near ${a.name}`, `PRP treatment near ${a.name}`, `GFC treatment near ${a.name}`, `laser hair removal near ${a.name}`, `hydrafacial near ${a.name}`,
      ];
      if (a.pin) ak.push(`dermatologist ${a.pin}`, `hair clinic ${a.pin}`);
      ak.forEach((k) => add("Locality", `${a.name}, ${c.name}`, "Locality", k, `/${c.slug}/${a.slug}`));
    }
  }

  const seen = new Set<string>();
  return rows.filter((r) => {
    const key = `${r.location}|${r.keyword}`.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

let cache: { rows: KeywordRow[]; byPage: Map<string, string[]> } | null = null;

function index() {
  if (!cache) {
    const rows = build();
    const byPage = new Map<string, string[]>();
    for (const r of rows) {
      const list = byPage.get(r.page) ?? [];
      if (!list.some((k) => k.toLowerCase() === r.keyword.toLowerCase())) list.push(r.keyword);
      byPage.set(r.page, list);
    }
    cache = { rows, byPage };
  }
  return cache;
}

export const allKeywordRows = () => index().rows;

/** Keywords the master list assigns to this exact page path. */
export const keywordsFor = (path: string) => index().byPage.get(path) ?? [];
