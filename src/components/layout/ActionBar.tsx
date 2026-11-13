"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { site, telLink, whatsappLink } from "@/lib/site";
import { Calendar, Phone, WhatsApp } from "@/components/ui/Icons";

const WA_MSG = "Hi Madhaav Aesthetic, I'd like to book a consultation.";

/** Thumb-reach booking bar on phones; a floating WhatsApp button on larger screens. */
export function ActionBar() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > 280);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <>
      <motion.div
        className="fixed inset-x-3 bottom-3 z-[100] md:hidden"
        initial={false}
        animate={{ y: show ? 0 : 110, opacity: show ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 30 }}
      >
        <div className="glass-dark grid grid-cols-3 overflow-hidden rounded-full !bg-night/90 p-1.5 text-shell">
          <a href={telLink()} className="flex min-h-12 items-center justify-center gap-2 rounded-full text-sm font-semibold">
            <Phone /> Call
          </a>
          <a href={whatsappLink(WA_MSG)} target="_blank" rel="noopener" className="flex min-h-12 items-center justify-center gap-2 rounded-full text-sm font-semibold">
            <WhatsApp /> Chat
          </a>
          <Link href="/contact" className="flex min-h-12 items-center justify-center gap-2 rounded-full bg-vermilion text-sm font-semibold">
            <Calendar /> Book
          </Link>
        </div>
      </motion.div>

      <motion.a
        href={whatsappLink(WA_MSG)}
        target="_blank"
        rel="noopener"
        aria-label={`Chat on WhatsApp with ${site.shortName}`}
        data-cursor="Chat"
        className="fixed right-6 bottom-6 z-[100] hidden h-16 w-16 place-items-center rounded-full bg-[#25D366] text-3xl text-white shadow-[0_18px_40px_-10px_rgba(37,211,102,0.6)] md:grid"
        initial={false}
        animate={{ scale: show ? 1 : 0, rotate: show ? 0 : -90 }}
        whileHover={{ scale: 1.08 }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
      >
        <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-20" />
        <WhatsApp />
      </motion.a>
    </>
  );
}
