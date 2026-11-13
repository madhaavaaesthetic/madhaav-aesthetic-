import { NextResponse } from "next/server";
import { BOOKING_CLINICS, SLOT_TIMES, openSlots, slotNeedle, upcomingDates } from "@/lib/booking";
import { mailConfigured, searchSubjects } from "@/lib/mailer";
import { clientIp, rateLimited } from "@/lib/request-guard";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const CAPACITY = Number(process.env.BOOKING_SLOT_CAPACITY || 2);
const CACHE_MS = 20_000;
const cache = new Map<string, { at: number; full: string[] }>();

/** GET /api/booking/slots?clinic=berhampur&date=2026-11-14 → which slots are open and which are full. */
export async function GET(req: Request) {
  if (rateLimited("slots", clientIp(req), 60, 60_000)) {
    return NextResponse.json({ error: "Too many requests." }, { status: 429 });
  }
  const url = new URL(req.url);
  const clinic = url.searchParams.get("clinic") ?? "";
  const date = url.searchParams.get("date") ?? "";
  if (!BOOKING_CLINICS.some((c) => c.value === clinic) || !upcomingDates().some((d) => d.iso === date)) {
    return NextResponse.json({ error: "Invalid clinic or date." }, { status: 400 });
  }

  const open = openSlots(date);
  const key = `${clinic}|${date}`;
  let full = cache.get(key)?.at && Date.now() - cache.get(key)!.at < CACHE_MS ? cache.get(key)!.full : null;

  if (!full) {
    full = [];
    if (mailConfigured()) {
      try {
        const subjects = await searchSubjects(slotNeedle(clinic, date));
        const counts = new Map<string, number>();
        for (const s of subjects) {
          const m = s.match(/\[MDH-SLOT:[^:\]]+:\d{4}-\d{2}-\d{2}:(\d{2}:\d{2})\]/);
          if (m) counts.set(m[1], (counts.get(m[1]) ?? 0) + 1);
        }
        full = SLOT_TIMES.filter((t) => (counts.get(t) ?? 0) >= CAPACITY);
        cache.set(key, { at: Date.now(), full });
        if (cache.size > 500) cache.delete(cache.keys().next().value!);
      } catch (e) {
        console.error("[booking] slot lookup failed", e);
      }
    }
  }

  return NextResponse.json({ open: open.filter((t) => !full!.includes(t)), full }, { headers: { "Cache-Control": "no-store" } });
}
