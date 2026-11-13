import Link from "next/link";

/** "People also search for": long-tail and regional phrasings, linked where a matching page exists. */
export function SearchTerms({ title, terms }: { title: string; terms: { label: string; href?: string }[] }) {
  if (terms.length === 0) return null;
  return (
    <section className="pb-20" aria-label={title}>
      <div className="wrap">
        <p className="eyebrow text-cocoa/70">{title}</p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {terms.map((t) => (
            <li key={t.label}>
              {t.href ? (
                <Link href={t.href} className="inline-block rounded-full bg-shell px-4 py-2 text-sm text-cocoa/75 ring-1 ring-cocoa/10 transition-colors hover:text-vermilion hover:ring-vermilion/40">
                  {t.label}
                </Link>
              ) : (
                <span className="inline-block rounded-full bg-shell px-4 py-2 text-sm text-cocoa/65 ring-1 ring-cocoa/8">{t.label}</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
