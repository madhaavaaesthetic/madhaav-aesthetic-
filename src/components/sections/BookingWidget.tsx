"use client";

import dynamic from "next/dynamic";

/** The booking form depends on today's date in IST, so it renders only in the browser to avoid build-time dates. */
const BookingForm = dynamic(() => import("./BookingForm"), {
  ssr: false,
  loading: () => (
    <div className="rounded-[2rem] bg-shell p-8 ring-1 ring-cocoa/10" aria-busy="true">
      <div className="h-5 w-48 animate-pulse rounded-full bg-cocoa/10" />
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-20 animate-pulse rounded-2xl bg-cocoa/6" />
        ))}
      </div>
      <div className="mt-6 h-14 animate-pulse rounded-2xl bg-cocoa/6" />
    </div>
  ),
});

export function BookingWidget(props: { defaultClinic?: string; defaultTreatment?: string }) {
  return <BookingForm {...props} />;
}
