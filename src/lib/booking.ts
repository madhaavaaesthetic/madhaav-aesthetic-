import { branches } from "./site";
import { treatments } from "@/data/treatments";

/** Shared by the booking UI and the API so both agree on clinics, slots and validation. */

export const BOOKING_CLINICS = [
  ...branches.map((b) => ({ value: b.slug, label: b.label, branch: b.slug })),
  { value: "new-delhi", label: "New Delhi / NCR (seen at Bhiwadi)", branch: "bhiwadi" },
] as const;

export const SLOT_TIMES = ["10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30"];

export const BOOKING_DAYS_AHEAD = 21;
export const SLOT_DURATION_MIN = 30;

const IST_OFFSET_MIN = 330;

/** Current date and minutes-since-midnight in India Standard Time, regardless of the server or browser timezone. */
export function nowInIST(d = new Date()) {
  const ist = new Date(d.getTime() + (IST_OFFSET_MIN + d.getTimezoneOffset()) * 60000);
  const date = `${ist.getFullYear()}-${String(ist.getMonth() + 1).padStart(2, "0")}-${String(ist.getDate()).padStart(2, "0")}`;
  return { date, minutes: ist.getHours() * 60 + ist.getMinutes(), dateObj: ist };
}

export function upcomingDates(count = BOOKING_DAYS_AHEAD) {
  const { dateObj } = nowInIST();
  return Array.from({ length: count }, (_, i) => {
    const d = new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate() + i);
    const iso = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    return {
      iso,
      weekday: d.toLocaleDateString("en-IN", { weekday: "short" }),
      day: d.getDate(),
      month: d.toLocaleDateString("en-IN", { month: "short" }),
      isWednesday: d.getDay() === 3,
      isToday: i === 0,
    };
  });
}

const toMinutes = (t: string) => Number(t.slice(0, 2)) * 60 + Number(t.slice(3, 5));

/** Slots still bookable on a date: today's slots need at least 60 minutes' notice. */
export function openSlots(dateIso: string) {
  const { date, minutes } = nowInIST();
  if (dateIso < date) return [];
  if (dateIso > date) return SLOT_TIMES;
  return SLOT_TIMES.filter((t) => toMinutes(t) >= minutes + 60);
}

export const formatSlot = (t: string) => {
  const m = toMinutes(t);
  const h = Math.floor(m / 60);
  return `${((h + 11) % 12) + 1}:${String(m % 60).padStart(2, "0")} ${h < 12 ? "am" : "pm"}`;
};

export const formatDate = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

/** Subject tag that lets the API count bookings per slot by searching the mailbox. */
export const slotTag = (clinic: string, date: string, time: string) => `[MDH-SLOT:${clinic}:${date}:${time}]`;
/** Substring used to find every booking for a clinic on a day (or one exact slot when time is given). */
export const slotNeedle = (clinic: string, date: string, time?: string) => (time ? slotTag(clinic, date, time) : `MDH-SLOT:${clinic}:${date}:`);

export interface BookingInput {
  name: string;
  phone: string;
  email?: string;
  clinic: string;
  treatment: string;
  date: string;
  time: string;
  notes?: string;
  firstVisit?: boolean;
  website?: string;
  startedAt?: number;
}

/** Treatment values the booking form can submit; anything else is rejected. */
export const BOOKING_TREATMENTS = [
  "Hair fall / hair loss consultation",
  "Skin problem consultation",
  "Not sure: I need advice",
  ...treatments.map((t) => t.name),
];

const clean = (s: unknown, max: number) =>
  String(s ?? "")
    .replace(/[\u0000-\u001f\u007f]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);

/** Letters (any script), spaces and . ' - only, so a name can't carry links, markup or fake slot tags. */
const NAME_RE = /^[\p{L}\p{M}][\p{L}\p{M} .'-]{1,79}$/u;

export function validateBooking(b: Partial<BookingInput>): { ok: true; value: BookingInput } | { ok: false; error: string } {
  const name = clean(b.name, 80);
  const phoneDigits = String(b.phone ?? "").replace(/\D/g, "").replace(/^91(?=\d{10}$)/, "");
  const email = clean(b.email, 254).toLowerCase();
  const clinic = String(b.clinic ?? "");
  const date = String(b.date ?? "");
  const time = String(b.time ?? "");
  const treatment = clean(b.treatment, 120) || BOOKING_TREATMENTS[0];
  if (!NAME_RE.test(name)) return { ok: false, error: "Please enter your full name (letters only)." };
  if (!/^[6-9]\d{9}$/.test(phoneDigits)) return { ok: false, error: "Please enter a valid 10-digit Indian mobile number." };
  if (email && !/^[^\s@<>()[\],;:"]+@[^\s@<>()[\],;:"]+\.[a-z]{2,}$/i.test(email)) return { ok: false, error: "That email address doesn't look right." };
  if (!BOOKING_CLINICS.some((c) => c.value === clinic)) return { ok: false, error: "Please choose a clinic." };
  if (!BOOKING_TREATMENTS.includes(treatment)) return { ok: false, error: "Please choose a treatment from the list." };
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return { ok: false, error: "Please choose a date." };
  const allowedDates = upcomingDates().map((d) => d.iso);
  if (!allowedDates.includes(date)) return { ok: false, error: `Please choose a date within the next ${BOOKING_DAYS_AHEAD} days.` };
  if (!openSlots(date).includes(time)) return { ok: false, error: "That time is no longer available. Please pick another slot." };
  return {
    ok: true,
    value: {
      name,
      phone: phoneDigits,
      email: email || undefined,
      clinic,
      treatment,
      date,
      time,
      notes: clean(b.notes, 1000).replace(/[[\]]/g, "") || undefined,
      firstVisit: Boolean(b.firstVisit),
    },
  };
}
