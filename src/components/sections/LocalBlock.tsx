import { MapEmbed } from "@/components/ui/MapEmbed";
import Link from "next/link";
import type { Area, City } from "@/data/types";
import { branchForCity } from "@/lib/local-content";
import { telLink } from "@/lib/site";
import { Clock, Phone, Pin, Star } from "@/components/ui/Icons";

/** Location context woven into treatment copy: climate, how to reach the clinic, local-language terms. */
export function LocalProse({ city, area, localWhy }: { city: City; area?: Area; localWhy?: string }) {
  return (
    <>
      <h2>{area ? `For patients near ${area.name}` : `Why it matters in ${city.name}`}</h2>
      {localWhy && <p>{localWhy}</p>}
      <p>{city.climateNote}</p>
      <p>{city.waterNote}</p>
      <h3>Getting to the clinic</h3>
      <ul>
        {area && (
          <li>
            From {area.name}: {area.distance}, {area.route}.
          </li>
        )}
        {city.reach.map((r) => (
          <li key={r}>{r}</li>
        ))}
      </ul>
      {city.localTerms.length > 0 && (
        <p className="text-sm text-cocoa/70">
          Also searched as:{" "}
          {city.localTerms
            .flatMap((l) => l.terms)
            .slice(0, 6)
            .join(" · ")}
        </p>
      )}
    </>
  );
}

export function ClinicCard({ city }: { city: City }) {
  const b = branchForCity(city);
  return (
    <div className="overflow-hidden rounded-[1.75rem] bg-shell ring-1 ring-cocoa/8">
      <div className="relative aspect-[16/10] w-full">
        <MapEmbed title={`Map: ${b.name}`} src={b.mapEmbed} directionsUrl={b.directionsUrl} />
      </div>
      <div className="p-7 md:p-8">
        <p className="eyebrow text-vermilion">{city.clinic.verified ? "Your clinic" : "Nearest clinic"}</p>
        <p className="mt-3 font-display text-2xl text-cocoa">{city.clinic.label}</p>
        <p className="mt-3 flex gap-2 text-cocoa/75">
          <Pin className="mt-1 shrink-0 text-vermilion" />
          <span>
            {b.street}, {b.locality}, {b.city}, {b.region} {b.postalCode}
          </span>
        </p>
        <p className="mt-2 flex items-center gap-2 text-cocoa/75">
          <Clock className="text-vermilion" /> Mon–Sun · 10 am–1 pm & 4–8 pm
        </p>
        <p className="mt-2 flex items-center gap-2 text-cocoa/75">
          <Star className="text-ember" /> {b.rating.value} on Google ({b.rating.count} reviews)
        </p>
        {!city.clinic.verified && <p className="mt-4 rounded-2xl bg-blush/60 p-4 text-sm text-cocoa/80">{city.clinic.note}</p>}
        <div className="mt-6 flex flex-wrap gap-3">
          <a href={telLink(b.phone)} className="btn btn-dark !min-h-11">
            <Phone /> {b.phoneDisplay}
          </a>
          <a href={b.directionsUrl} target="_blank" rel="noopener" className="btn btn-ghost !min-h-11 text-cocoa">
            Directions
          </a>
        </div>
      </div>
    </div>
  );
}

export function AreaLinks({ city, treatmentSlug, title }: { city: City; treatmentSlug?: string; title?: string }) {
  return (
    <div>
      <p className="eyebrow text-vermilion">{title ?? `Areas we serve around ${city.name}`}</p>
      <ul className="mt-5 flex flex-wrap gap-2">
        {city.areas.map((a) => (
          <li key={a.slug}>
            <Link
              href={treatmentSlug ? `/${city.slug}/${a.slug}/${treatmentSlug}` : `/${city.slug}/${a.slug}`}
              className="inline-block rounded-full border border-cocoa/15 px-4 py-2 text-sm text-cocoa/80 transition-colors hover:border-vermilion hover:text-vermilion"
            >
              {a.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
