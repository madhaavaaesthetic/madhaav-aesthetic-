"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { treatments, categories } from "@/data/treatments";
import { BOOKING_CLINICS, SLOT_TIMES, formatDate, formatSlot, upcomingDates } from "@/lib/booking";
import { branchBySlug, whatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";
import { ArrowRight, Calendar, Check, Clock, Pin, WhatsApp } from "@/components/ui/Icons";

type Step = 0 | 1 | 2 | 3;
const STEPS = ["Clinic & treatment", "Date & time", "Your details"];
const field =
  "w-full rounded-2xl border border-cocoa/15 bg-shell px-5 py-4 text-cocoa placeholder:text-cocoa/40 outline-none transition focus:border-vermilion focus:ring-4 focus:ring-vermilion/10";

export default function BookingForm({ defaultClinic, defaultTreatment }: { defaultClinic?: string; defaultTreatment?: string }) {
  const dates = useMemo(() => upcomingDates(), []);
  const [step, setStep] = useState<Step>(0);
  const [clinic, setClinic] = useState(() => {
    const q = new URLSearchParams(window.location.search).get("clinic");
    return q && BOOKING_CLINICS.some((c) => c.value === q) ? q : (defaultClinic ?? "berhampur");
  });
  const [treatment, setTreatment] = useState(() => {
    const q = new URLSearchParams(window.location.search).get("treatment");
    return q && treatments.some((t) => t.name === q) ? q : (defaultTreatment ?? "Hair fall / hair loss consultation");
  });
  const [date, setDate] = useState(dates[0].iso);
  const [time, setTime] = useState<string | null>(null);
  const [slots, setSlots] = useState<{ open: string[]; full: string[] } | null>(null);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const [form, setForm] = useState({ name: "", phone: "", email: "", notes: "", firstVisit: true, website: "" });
  const [startedAt] = useState(() => Date.now());
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<{ message: string; fallback?: boolean } | null>(null);
  const [done, setDone] = useState<{ ref: string; confirmationSent: boolean } | null>(null);

  useEffect(() => {
    let cancelled = false;
    const ctrl = new AbortController();
    const run = async () => {
      setLoadingSlots(true);
      try {
        const res = await fetch(`/api/booking/slots?clinic=${clinic}&date=${date}`, { signal: ctrl.signal, cache: "no-store" });
        const data = await res.json();
        if (!cancelled) setSlots(res.ok ? data : { open: [], full: [] });
      } catch {
        if (!cancelled) setSlots(null);
      } finally {
        if (!cancelled) setLoadingSlots(false);
      }
    };
    run();
    return () => {
      cancelled = true;
      ctrl.abort();
    };
  }, [clinic, date, refresh]);

  const clinicInfo = BOOKING_CLINICS.find((c) => c.value === clinic)!;
  const branch = branchBySlug(clinicInfo.branch)!;
  const summary = time ? `${formatDate(date)}, ${formatSlot(time)}` : formatDate(date);
  const waMessage = `Hi Madhaav Aesthetic, I'd like to book: ${treatment} at ${clinicInfo.label} on ${summary}.${form.name ? ` Name: ${form.name}.` : ""}${form.phone ? ` Phone: ${form.phone}.` : ""}`;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!time) return setStep(1);
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, clinic, treatment, date, time, startedAt }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setDone({ ref: data.ref, confirmationSent: data.confirmationSent });
        setStep(3);
      } else {
        setError({ message: data.error ?? "Something went wrong. Please try again.", fallback: data.fallback });
        if (data.slotTaken) {
          setTime(null);
          setStep(1);
          setRefresh((r) => r + 1);
        }
      }
    } catch {
      setError({ message: "No connection. Please book on WhatsApp instead.", fallback: true });
    } finally {
      setSubmitting(false);
    }
  }

  const slotState = (t: string) => {
    if (!slots) return SLOT_TIMES.includes(t) ? "open" : "closed";
    if (slots.full.includes(t)) return "full";
    return slots.open.includes(t) ? "open" : "closed";
  };

  return (
    <div className="relative overflow-hidden rounded-[2rem] bg-shell ring-1 ring-cocoa/10">
      <div aria-hidden className="glow -top-24 -right-24 h-64 w-72 opacity-25" />
      {step < 3 && (
        <ol className="relative flex border-b border-cocoa/10">
          {STEPS.map((s, i) => (
            <li key={s} className="flex-1">
              <button
                type="button"
                onClick={() => i < step && setStep(i as Step)}
                className={cn("flex w-full items-center gap-2.5 px-4 py-4 text-left text-sm md:px-6", i === step ? "text-cocoa" : "text-cocoa/70", i < step && "cursor-pointer hover:text-cocoa")}
              >
                <span className={cn("grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-semibold", i < step ? "bg-vermilion text-shell" : i === step ? "bg-cocoa text-shell" : "bg-cocoa/8")}>
                  {i < step ? <Check /> : i + 1}
                </span>
                <span className="hidden font-medium sm:inline">{s}</span>
              </button>
            </li>
          ))}
        </ol>
      )}

      <form onSubmit={submit} noValidate className="relative p-5 md:p-9">
        <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="absolute -left-[9999px]" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} />
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div key="s0" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.35 }}>
              <p className="eyebrow text-vermilion">Step 1 · Choose your clinic</p>
              <div role="radiogroup" aria-label="Clinic" className="mt-4 grid gap-3 sm:grid-cols-2">
                {BOOKING_CLINICS.map((c) => {
                  const b = branchBySlug(c.branch)!;
                  const active = clinic === c.value;
                  return (
                    <button
                      key={c.value}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      onClick={() => {
                        setClinic(c.value);
                        setTime(null);
                      }}
                      className={cn("rounded-2xl p-4 text-left ring-1 transition", active ? "bg-cocoa text-shell ring-cocoa" : "bg-cream ring-cocoa/10 hover:ring-cocoa/30")}
                    >
                      <span className="block font-display text-xl">{c.label}</span>
                      <span className={cn("mt-1 flex gap-1.5 text-xs", active ? "text-shell/70" : "text-cocoa/70")}>
                        <Pin className="mt-0.5 shrink-0" /> {b.street}, {b.city}
                      </span>
                    </button>
                  );
                })}
              </div>
              <label className="mt-7 block">
                <span className="eyebrow mb-3 block text-vermilion">What do you need help with?</span>
                <select className={field} value={treatment} onChange={(e) => setTreatment(e.target.value)}>
                  <option>Hair fall / hair loss consultation</option>
                  <option>Skin problem consultation</option>
                  {categories.map((cat) => (
                    <optgroup key={cat.slug} label={cat.name}>
                      {treatments
                        .filter((t) => t.category === cat.slug)
                        .map((t) => (
                          <option key={t.slug}>{t.name}</option>
                        ))}
                    </optgroup>
                  ))}
                  <option>Not sure: I need advice</option>
                </select>
              </label>
              <div className="mt-8 flex justify-end">
                <button type="button" onClick={() => setStep(1)} className="btn btn-primary">
                  Choose date & time <ArrowRight />
                </button>
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div key="s1" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.35 }}>
              <p className="eyebrow text-vermilion">Step 2 · Pick a date</p>
              <div className="no-scrollbar -mx-5 mt-4 flex gap-2 overflow-x-auto px-5 pb-2 md:-mx-9 md:px-9" data-lenis-prevent>
                {dates.map((d) => {
                  const active = d.iso === date;
                  return (
                    <button
                      key={d.iso}
                      type="button"
                      onClick={() => {
                        setDate(d.iso);
                        setTime(null);
                      }}
                      aria-pressed={active}
                      className={cn("relative flex w-[4.6rem] shrink-0 flex-col items-center rounded-2xl py-3 ring-1 transition", active ? "bg-vermilion text-shell ring-vermilion" : "bg-cream text-cocoa ring-cocoa/10 hover:ring-cocoa/30")}
                    >
                      <span className="text-[0.7rem] font-semibold uppercase opacity-75">{d.isToday ? "Today" : d.weekday}</span>
                      <span className="font-display text-2xl leading-tight">{d.day}</span>
                      <span className="text-[0.7rem] opacity-70">{d.month}</span>
                      {d.isWednesday && <span className={cn("absolute -top-2 rounded-full px-2 py-0.5 text-[0.6rem] font-bold uppercase", active ? "bg-shell text-vermilion" : "bg-vermilion text-shell")}>Free</span>}
                    </button>
                  );
                })}
              </div>

              <p className="eyebrow mt-7 text-vermilion">Pick a time · {clinicInfo.label}</p>
              {(["Morning", "Evening"] as const).map((part) => (
                <div key={part} className="mt-4">
                  <p className="mb-2 flex items-center gap-2 text-sm text-cocoa/70">
                    <Clock /> {part} {part === "Morning" ? "(10 am – 1 pm)" : "(4 pm – 8 pm)"}
                  </p>
                  <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-7">
                    {SLOT_TIMES.filter((t) => (part === "Morning" ? t < "13:00" : t >= "16:00")).map((t) => {
                      const state = slotState(t);
                      const active = time === t;
                      return (
                        <button
                          key={t}
                          type="button"
                          disabled={state !== "open" || loadingSlots}
                          onClick={() => setTime(t)}
                          className={cn(
                            "relative rounded-xl py-3 text-sm font-medium ring-1 transition",
                            active ? "bg-cocoa text-shell ring-cocoa" : "bg-cream text-cocoa ring-cocoa/10 hover:ring-cocoa/35",
                            state !== "open" && "cursor-not-allowed opacity-35 line-through",
                            loadingSlots && "animate-pulse"
                          )}
                        >
                          {formatSlot(t)}
                          {state === "full" && <span className="block text-[0.6rem] no-underline">Full</span>}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
              {slots && slots.open.length === 0 && !loadingSlots && <p className="mt-4 text-sm text-crimson">No slots left on this day. Please choose another date.</p>}
              <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
                <button type="button" onClick={() => setStep(0)} className="text-sm text-cocoa/70 link-underline">
                  ← Back
                </button>
                <button type="button" disabled={!time} onClick={() => setStep(2)} className="btn btn-primary disabled:opacity-40">
                  Continue <ArrowRight />
                </button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="s2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.35 }}>
              <div className="glass mb-6 flex flex-wrap items-center gap-x-6 gap-y-2 rounded-2xl px-5 py-4 text-sm text-cocoa">
                <span className="flex items-center gap-2">
                  <Calendar className="text-vermilion" /> {summary}
                </span>
                <span className="flex items-center gap-2">
                  <Pin className="text-vermilion" /> {clinicInfo.label}
                </span>
                <span className="text-cocoa/70">{treatment}</span>
              </div>
              <p className="eyebrow text-vermilion">Step 3 · Your details</p>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm text-cocoa/70">Full name *</span>
                  <input className={field} autoComplete="name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" />
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm text-cocoa/70">Mobile number *</span>
                  <input className={field} type="tel" inputMode="tel" autoComplete="tel" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="10-digit mobile" />
                </label>
                <label className="block md:col-span-2">
                  <span className="mb-2 block text-sm text-cocoa/70">Email (for your confirmation & calendar invite)</span>
                  <input className={field} type="email" inputMode="email" autoComplete="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" />
                </label>
                <label className="block md:col-span-2">
                  <span className="mb-2 block text-sm text-cocoa/70">Anything we should know? (optional)</span>
                  <textarea rows={3} className={cn(field, "resize-none")} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} placeholder="e.g. hair fall for 6 months, already tried PRP" />
                </label>
                <label className="flex items-center gap-3 text-sm text-cocoa/80 md:col-span-2">
                  <input type="checkbox" checked={form.firstVisit} onChange={(e) => setForm({ ...form, firstVisit: e.target.checked })} className="h-5 w-5 accent-[#E23B2A]" />
                  This is my first visit to Madhaav Aesthetic
                </label>
              </div>
              <AnimatePresence>
                {error && (
                  <motion.div role="alert" initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-5 rounded-2xl bg-crimson/8 p-4 text-sm text-crimson">
                    {error.message}
                    {error.fallback && (
                      <a href={whatsappLink(waMessage, branch.whatsapp)} target="_blank" rel="noopener" className="mt-3 flex w-fit items-center gap-2 rounded-full bg-[#25D366] px-4 py-2 font-semibold text-white">
                        <WhatsApp /> Book on WhatsApp
                      </a>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
                <button type="button" onClick={() => setStep(1)} className="text-sm text-cocoa/70 link-underline">
                  ← Change time
                </button>
                <button type="submit" disabled={submitting} className="btn btn-primary !min-h-14 !px-8 disabled:opacity-60" data-cursor="Book">
                  {submitting ? "Booking…" : "Confirm booking"} <ArrowRight />
                </button>
              </div>
              <p className="mt-4 text-xs text-cocoa/70">Your details go only to our clinic team and are used to confirm your appointment.</p>
            </motion.div>
          )}

          {step === 3 && done && (
            <motion.div key="s3" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="py-6 text-center">
              <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.1 }} className="mx-auto grid h-20 w-20 place-items-center rounded-full grad-ember text-4xl text-shell">
                <Check />
              </motion.span>
              <h3 className="mt-6 font-display text-title text-cocoa">You&apos;re booked in.</h3>
              <p className="mx-auto mt-3 max-w-md text-cocoa/70">
                {summary} at {clinicInfo.label}. Our team will call or WhatsApp you to confirm.
                {done.confirmationSent ? " We've also emailed you a confirmation with a calendar invite." : ""}
              </p>
              <p className="mt-4 font-semibold text-cocoa">Booking reference: {done.ref}</p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <a href={branch.directionsUrl} target="_blank" rel="noopener" className="btn btn-dark">
                  <Pin /> Directions
                </a>
                <a href={whatsappLink(`Hi, my booking reference is ${done.ref} (${summary}).`, branch.whatsapp)} target="_blank" rel="noopener" className="btn btn-ghost text-cocoa">
                  <WhatsApp className="text-[#25D366]" /> Message the clinic
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
}
