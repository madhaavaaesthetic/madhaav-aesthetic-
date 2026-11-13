import type { BookingInput } from "./booking";
import { BOOKING_CLINICS, SLOT_DURATION_MIN, formatDate, formatSlot, slotTag } from "./booking";
import { SITE_URL, branchBySlug, site } from "./site";
import type { MailAttachment } from "./mailer";

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export function bookingContext(b: BookingInput, ref: string) {
  const clinic = BOOKING_CLINICS.find((c) => c.value === b.clinic)!;
  const branch = branchBySlug(clinic.branch)!;
  return { clinic, branch, ref, when: `${formatDate(b.date)}, ${formatSlot(b.time)}` };
}

/** Calendar invite with the time fixed in IST (UTC+05:30). */
export function icsInvite(b: BookingInput, ref: string): MailAttachment {
  const { branch, clinic } = bookingContext(b, ref);
  const [y, m, d] = b.date.split("-").map(Number);
  const [hh, mm] = b.time.split(":").map(Number);
  const start = new Date(Date.UTC(y, m - 1, d, hh, mm) - 330 * 60000);
  const end = new Date(start.getTime() + SLOT_DURATION_MIN * 60000);
  const f = (dt: Date) => dt.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const body = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Madhaav Aesthetic//Booking//EN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${ref}@madhaavaaesthetic.com`,
    `DTSTAMP:${f(new Date())}`,
    `DTSTART:${f(start)}`,
    `DTEND:${f(end)}`,
    `SUMMARY:Madhaav Aesthetic – ${b.treatment}`,
    `LOCATION:${branch.street}\\, ${branch.locality}\\, ${branch.city} ${branch.postalCode}`,
    `DESCRIPTION:Booking ${ref} at ${clinic.label}. Call ${branch.phoneDisplay} to reschedule.`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  return { filename: `madhaav-booking-${ref}.ics`, content: Buffer.from(body).toString("base64"), contentType: "text/calendar; charset=utf-8; method=PUBLISH" };
}

const shell = (inner: string) => `<!doctype html><html><body style="margin:0;background:#F6EEE7;font-family:Arial,Helvetica,sans-serif;color:#3A1D18">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F6EEE7;padding:24px 12px"><tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#FBF7F3;border-radius:20px;overflow:hidden">
<tr><td style="background:linear-gradient(135deg,#F58A2A,#E23B2A 60%,#A61E22);background-color:#E23B2A;padding:22px 28px;color:#fff">
<div style="font-family:Georgia,serif;font-size:24px;font-weight:bold">Madhaav Aesthetic</div>
<div style="font-size:11px;letter-spacing:3px;opacity:.85">HAIR TRANSPLANT · SKIN CLINIC</div></td></tr>
<tr><td style="padding:28px">${inner}</td></tr>
<tr><td style="padding:18px 28px;background:#1C0E0B;color:#d9c9bf;font-size:12px">${esc(site.name)} · ${esc(site.phoneDisplay)} · <a href="${SITE_URL}" style="color:#F58A2A">${SITE_URL.replace("https://", "")}</a></td></tr>
</table></td></tr></table></body></html>`;

const row = (k: string, v: string) => `<tr><td style="padding:8px 0;color:#8a5a4a;font-size:13px;width:38%;vertical-align:top">${k}</td><td style="padding:8px 0;font-size:15px;font-weight:bold">${v}</td></tr>`;

export function adminEmail(b: BookingInput, ref: string) {
  const { clinic, branch, when } = bookingContext(b, ref);
  const wa = `https://wa.me/91${b.phone}?text=${encodeURIComponent(`Hi ${b.name}, this is Madhaav Aesthetic ${branch.city}. Your consultation is confirmed for ${when}. Reply here if you need to change it.`)}`;
  const subject = `New booking: ${b.name} · ${b.treatment} · ${clinic.label} · ${formatDate(b.date)} ${formatSlot(b.time)} ${slotTag(b.clinic, b.date, b.time)}`;
  const html = shell(`
<p style="margin:0 0 6px;font-size:12px;letter-spacing:2px;color:#E23B2A">NEW CONSULTATION BOOKING · ${esc(ref)}</p>
<h1 style="margin:0 0 18px;font-family:Georgia,serif;font-size:26px">${esc(b.name)} booked ${esc(when)}</h1>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
${row("Clinic", esc(clinic.label))}${row("Date & time", esc(when))}${row("Treatment", esc(b.treatment))}
${row("Mobile", `<a href="tel:+91${b.phone}" style="color:#3A1D18">+91 ${b.phone}</a>`)}
${row("Email", b.email ? `<a href="mailto:${esc(b.email)}" style="color:#3A1D18">${esc(b.email)}</a>` : "—")}
${row("First visit", b.firstVisit ? "Yes" : "No / not stated")}${row("Notes", b.notes ? esc(b.notes) : "—")}
</table>
<p style="margin:24px 0 8px">
<a href="tel:+91${b.phone}" style="display:inline-block;background:#3A1D18;color:#fff;text-decoration:none;padding:12px 18px;border-radius:999px;font-weight:bold;margin:0 6px 8px 0">Call patient</a>
<a href="${wa}" style="display:inline-block;background:#25D366;color:#fff;text-decoration:none;padding:12px 18px;border-radius:999px;font-weight:bold;margin:0 6px 8px 0">Confirm on WhatsApp</a>
${b.email ? `<a href="mailto:${esc(b.email)}?subject=${encodeURIComponent(`Your Madhaav Aesthetic booking ${ref}`)}" style="display:inline-block;background:#E23B2A;color:#fff;text-decoration:none;padding:12px 18px;border-radius:999px;font-weight:bold;margin:0 6px 8px 0">Email patient</a>` : ""}
</p>
<p style="font-size:12px;color:#8a5a4a">This slot now counts as booked on the website. Deleting this email frees the slot again.</p>`);
  const text = `New booking ${ref}\n${b.name} · +91 ${b.phone}${b.email ? ` · ${b.email}` : ""}\n${clinic.label}\n${when}\nTreatment: ${b.treatment}\nNotes: ${b.notes ?? "-"}`;
  return { subject, html, text };
}

export function patientEmail(b: BookingInput, ref: string) {
  const { clinic, branch, when } = bookingContext(b, ref);
  const subject = `Booking received: ${b.treatment} on ${formatDate(b.date)} at ${formatSlot(b.time)} – Madhaav Aesthetic`;
  const html = shell(`
<p style="margin:0 0 6px;font-size:12px;letter-spacing:2px;color:#E23B2A">BOOKING REFERENCE ${esc(ref)}</p>
<h1 style="margin:0 0 12px;font-family:Georgia,serif;font-size:26px">Thank you, ${esc(b.name.split(" ")[0])}. Your slot is reserved.</h1>
<p style="margin:0 0 18px;line-height:1.6">Our team will call or WhatsApp you on <b>+91 ${b.phone}</b> to confirm. If you need to change the time, just reply to this email or call ${esc(branch.phoneDisplay)}.</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F6EEE7;border-radius:14px;padding:6px 16px">
${row("When", esc(when))}${row("Treatment", esc(b.treatment))}${row("Clinic", esc(clinic.label))}
${row("Address", esc(`${branch.street}, ${branch.locality}, ${branch.city}, ${branch.region} ${branch.postalCode}`))}
</table>
<p style="margin:22px 0 6px"><a href="${branch.directionsUrl}" style="display:inline-block;background:#E23B2A;color:#fff;text-decoration:none;padding:12px 20px;border-radius:999px;font-weight:bold">Get directions</a></p>
<p style="font-size:13px;line-height:1.6;color:#6b4a3f;margin-top:18px"><b>Before your visit:</b> bring any previous prescriptions or reports, and arrive 10 minutes early. For hair consultations, please come with clean, dry hair and no styling products.</p>
<p style="font-size:12px;color:#8a5a4a">A calendar invite is attached.</p>`);
  const text = `Thank you, ${b.name}. Booking ${ref}\n${when}\n${b.treatment}\n${clinic.label}: ${branch.street}, ${branch.locality}, ${branch.city}\nWe'll call +91 ${b.phone} to confirm. To change, call ${branch.phoneDisplay}.`;
  return { subject, html, text };
}
