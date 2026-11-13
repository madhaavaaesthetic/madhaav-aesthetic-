import Link from "next/link";
import { ContourBackdrop } from "@/components/brand/ContourBackdrop";
import { coreTreatments } from "@/data/treatments";

export default function NotFound() {
  return (
    <section className="relative grid min-h-[90vh] place-items-center overflow-hidden pt-[var(--header-h)]">
      <ContourBackdrop />
      <div className="wrap relative text-center">
        <p className="font-hero text-[clamp(6rem,22vw,18rem)] leading-[1.15] text-grad">404</p>
        <h1 className="mt-4 font-display text-title text-cocoa">Sorry, we can’t find that page</h1>
        <p className="mx-auto mt-4 max-w-md text-cocoa/70">It may have moved. Try one of these instead:</p>
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          <Link href="/" className="btn btn-primary">Home</Link>
          {coreTreatments.slice(0, 4).map((t) => (
            <Link key={t.slug} href={`/treatments/${t.slug}`} className="btn btn-ghost text-cocoa">{t.shortName}</Link>
          ))}
        </div>
      </div>
    </section>
  );
}
