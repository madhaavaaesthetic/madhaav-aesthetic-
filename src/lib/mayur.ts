import type { BookingInput } from "./booking";

/**
 * MAYUR (the clinic management system) integration.
 * Enabled only when both MAYUR_API_URL and MAYUR_API_KEY are set (Vercel env). Without them, or if
 * MAYUR doesn't answer within the timeout, the site keeps its email-based booking flow, so a booking
 * is never lost because of MAYUR. The key is server-only; never expose it with NEXT_PUBLIC_.
 */

const BASE = (process.env.MAYUR_API_URL || "").replace(/\/$/, "");
const KEY = process.env.MAYUR_API_KEY || "";
const TIMEOUT_MS = 8000;

export const mayurConfigured = () => BASE.startsWith("https://") && KEY.length >= 32;

async function call(path: string, init?: RequestInit) {
  return fetch(`${BASE}/api/public/v1${path}`, {
    ...init,
    headers: { Authorization: `Bearer ${KEY}`, "Content-Type": "application/json", ...init?.headers },
    signal: AbortSignal.timeout(TIMEOUT_MS),
    cache: "no-store",
  });
}

/** Open slot times ("HH:MM") for a clinic and date from MAYUR, or null if MAYUR is unavailable. */
export async function mayurOpenSlots(clinic: string, date: string): Promise<string[] | null> {
  try {
    const res = await call(`/availability?${new URLSearchParams({ clinic, date })}`);
    if (!res.ok) return null;
    const body = (await res.json()) as { open?: unknown };
    return Array.isArray(body.open) ? body.open.filter((t): t is string => typeof t === "string") : null;
  } catch (e) {
    console.error("[mayur] availability failed", e);
    return null;
  }
}

export type MayurBooking =
  | { status: "booked"; ref: string; patientCode: string; appointmentId: string }
  | { status: "slot_taken" }
  | { status: "unavailable" };

/** Create the booking in MAYUR. "unavailable" means: fall back to the email-only flow. */
export async function mayurBook(b: BookingInput, ref: string): Promise<MayurBooking> {
  try {
    const res = await call("/bookings", {
      method: "POST",
      body: JSON.stringify({
        clinic: b.clinic,
        date: b.date,
        time: b.time,
        name: b.name,
        phone: b.phone,
        email: b.email,
        treatment: b.treatment,
        notes: b.notes,
        firstVisit: b.firstVisit,
        externalRef: ref,
      }),
    });
    if (res.status === 409) return { status: "slot_taken" };
    if (!res.ok) {
      console.error("[mayur] booking rejected", res.status, await res.text().catch(() => ""));
      return { status: "unavailable" };
    }
    const body = (await res.json()) as { ref?: string; patientCode?: string; appointmentId?: string };
    // MAYUR's booking reference (MA-<BRANCH>-<DDMMYY>-<serial>) is what the patient sees; ours is only a fallback.
    return { status: "booked", ref: body.ref || ref, patientCode: body.patientCode ?? "", appointmentId: body.appointmentId ?? "" };
  } catch (e) {
    console.error("[mayur] booking failed", e);
    return { status: "unavailable" };
  }
}
