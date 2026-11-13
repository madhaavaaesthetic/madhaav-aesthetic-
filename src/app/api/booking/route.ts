import { NextResponse } from "next/server";
import { slotNeedle, validateBooking, type BookingInput } from "@/lib/booking";
import { adminEmail, icsInvite, patientEmail } from "@/lib/booking-emails";
import { mailConfigured, searchSubjects, sendEmail } from "@/lib/mailer";
import { clientIp, rateLimited, sameOrigin } from "@/lib/request-guard";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const CAPACITY = Number(process.env.BOOKING_SLOT_CAPACITY || 2);
const MAX_BODY_BYTES = 10_000;
const EMAIL_RE = /^[^\s@<>()[\],;:"]+@[^\s@<>()[\],;:"]+\.[a-z]{2,}$/i;

const makeRef = (b: BookingInput) => `MDH-${b.date.slice(2).replace(/-/g, "")}-${crypto.randomUUID().slice(0, 4).toUpperCase()}`;

export async function POST(req: Request) {
  if (!sameOrigin(req)) return NextResponse.json({ ok: false, error: "Forbidden." }, { status: 403 });
  if (!(req.headers.get("content-type") ?? "").includes("application/json")) {
    return NextResponse.json({ ok: false, error: "Unsupported request." }, { status: 415 });
  }
  if (Number(req.headers.get("content-length") ?? 0) > MAX_BODY_BYTES) {
    return NextResponse.json({ ok: false, error: "Request too large." }, { status: 413 });
  }

  const ip = clientIp(req);
  if (rateLimited("booking", ip, 5, 10 * 60_000)) {
    return NextResponse.json({ ok: false, error: "Too many attempts. Please call or WhatsApp us instead." }, { status: 429 });
  }

  let payload: Partial<BookingInput>;
  try {
    const raw = await req.text();
    if (raw.length > MAX_BODY_BYTES) return NextResponse.json({ ok: false, error: "Request too large." }, { status: 413 });
    payload = JSON.parse(raw);
    if (!payload || typeof payload !== "object" || Array.isArray(payload)) throw new Error("not an object");
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot field and "filled too fast" check quietly drop bots.
  if (payload.website || (typeof payload.startedAt === "number" && Date.now() - payload.startedAt < 2500)) {
    return NextResponse.json({ ok: true, ref: "MDH-RECEIVED" });
  }

  const v = validateBooking(payload);
  if (!v.ok) return NextResponse.json({ ok: false, error: v.error }, { status: 422 });
  const b = v.value;

  if (!mailConfigured()) {
    return NextResponse.json({ ok: false, error: "Online booking is temporarily unavailable. Please book on WhatsApp.", fallback: true }, { status: 503 });
  }

  try {
    const taken = (await searchSubjects(slotNeedle(b.clinic, b.date, b.time))).length;
    if (taken >= CAPACITY) return NextResponse.json({ ok: false, error: "Sorry, that slot was just taken. Please choose another time.", slotTaken: true }, { status: 409 });
  } catch (e) {
    console.error("[booking] availability check failed", e);
  }

  const ref = makeRef(b);
  const admin = process.env.BOOKING_ADMIN_EMAIL || "support@madhaavaaesthetic.com";
  const extra = (process.env.BOOKING_NOTIFY_EMAILS || "")
    .split(",")
    .map((s) => s.trim())
    .filter((e) => EMAIL_RE.test(e) && e.toLowerCase() !== admin.toLowerCase());
  const ics = icsInvite(b, ref);

  try {
    const a = adminEmail(b, ref);
    await sendEmail({ to: [admin, ...extra], subject: a.subject, html: a.html, text: a.text, attachments: [ics] });
  } catch (e) {
    console.error("[booking] admin email failed", e);
    return NextResponse.json({ ok: false, error: "We couldn't save your booking just now. Please book on WhatsApp.", fallback: true }, { status: 502 });
  }

  // Confirmation emails are capped per address so the form can't be used to spam a third party.
  let confirmationSent = false;
  if (b.email && !rateLimited("confirm", b.email, 2, 24 * 60 * 60_000)) {
    try {
      const p = patientEmail(b, ref);
      await sendEmail({ to: [b.email], subject: p.subject, html: p.html, text: p.text, attachments: [ics] });
      confirmationSent = true;
    } catch (e) {
      console.error("[booking] patient email failed", e);
    }
  }

  return NextResponse.json({ ok: true, ref, confirmationSent });
}

export function GET() {
  return NextResponse.json({ error: "Method not allowed." }, { status: 405, headers: { Allow: "POST" } });
}
