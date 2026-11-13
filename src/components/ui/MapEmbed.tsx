"use client";

import { saveConsent, useConsent } from "@/lib/consent";
import { Pin } from "@/components/ui/Icons";

/** Google Maps iframe, loaded only after the visitor allows map cookies; until then a quiet placeholder with a direct link. */
export function MapEmbed({ src, title, directionsUrl }: { src: string; title: string; directionsUrl: string }) {
  const consent = useConsent();
  if (consent?.maps) {
    return <iframe title={title} src={src} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="absolute inset-0 h-full w-full border-0 grayscale-[0.3] sepia-[0.15]" />;
  }
  return (
    <div className="absolute inset-0 grid place-items-center bg-[radial-gradient(circle_at_50%_40%,#fbf1ea,#ecd6c8)] p-6 text-center">
      <div>
        <Pin className="mx-auto text-2xl text-vermilion" />
        <p className="mt-2 text-sm text-cocoa/80">The map is provided by Google, which may set cookies.</p>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          <button type="button" onClick={() => saveConsent(true)} className="btn btn-dark !min-h-10 !px-4 text-sm">
            Load map
          </button>
          <a href={directionsUrl} target="_blank" rel="noopener" className="btn btn-ghost !min-h-10 !px-4 text-sm text-cocoa">
            Open in Google Maps
          </a>
        </div>
      </div>
    </div>
  );
}
