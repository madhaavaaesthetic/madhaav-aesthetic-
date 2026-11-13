import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export function LegalPage({ title, path, updated, children }: { title: string; path: string; updated: string; children: React.ReactNode }) {
  return (
    <section className="pt-[calc(var(--header-h)+1.5rem)] pb-16 md:pb-20">
      <div className="wrap max-w-3xl">
        <Breadcrumbs items={[{ name: title, path }]} />
        <h1 className="mt-10 font-display text-[clamp(2.4rem,5vw,4.4rem)] leading-none text-cocoa">{title}</h1>
        <p className="mt-4 text-sm text-cocoa/70">Last updated {updated}</p>
        <div className="prose-clinic mt-10">{children}</div>
      </div>
    </section>
  );
}
