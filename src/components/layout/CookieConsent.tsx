"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, m } from "motion/react";
import { OPEN_SETTINGS, openCookieSettings, saveConsent, useConsent } from "@/lib/consent";

/** Cookie consent card: shown after the intro until the visitor chooses; reopened from "Cookie settings" in the footer. */
export function CookieConsent() {
  const consent = useConsent();
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState(false);
  const [maps, setMaps] = useState(true);

  useEffect(() => {
    // Wait for the intro to finish so the card never covers it.
    const go = () => setReady(true);
    if (document.documentElement.dataset.loaded) go();
    else window.addEventListener("madhaav:loaded", go, { once: true });
    const reopen = () => {
      setSettings(true);
      setOpen(true);
    };
    window.addEventListener(OPEN_SETTINGS, reopen);
    return () => {
      window.removeEventListener("madhaav:loaded", go);
      window.removeEventListener(OPEN_SETTINGS, reopen);
    };
  }, []);

  const visible = ready && (open || consent === null);
  const choose = (allowMaps: boolean) => {
    saveConsent(allowMaps);
    setOpen(false);
    setSettings(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <m.div
          role="dialog"
          aria-labelledby="cookie-title"
          aria-describedby="cookie-text"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="glass fixed right-3 bottom-[5.5rem] left-3 z-[180] max-w-md rounded-[1.25rem] p-4 text-cocoa sm:right-auto md:bottom-6 md:left-6 md:rounded-[1.5rem] md:p-6"
        >
          <p id="cookie-title" className="font-display text-lg md:text-xl">
            Cookies & your privacy
          </p>
          <p id="cookie-text" className="mt-1.5 text-[0.8rem] leading-relaxed text-cocoa/80 md:mt-2 md:text-sm">
            We use only essential storage to run this site. Google Maps on our clinic pages sets its own cookies, so we load maps only if you allow it. No advertising
            or tracking cookies.{" "}
            <Link href="/cookie-policy" className="font-semibold text-vermilion underline underline-offset-2">
              Cookie policy
            </Link>
          </p>
          {settings && (
            <div className="mt-4 space-y-3 rounded-2xl bg-white/60 p-4 text-sm">
              <label className="flex items-start gap-3">
                <input type="checkbox" checked disabled className="mt-0.5 h-4 w-4 accent-[#E23B2A]" />
                <span>
                  <span className="font-semibold">Essential</span>
                  <span className="block text-cocoa/75">Remembers your cookie choice and whether you have seen the intro. Always on.</span>
                </span>
              </label>
              <label className="flex items-start gap-3">
                <input type="checkbox" checked={maps} onChange={(e) => setMaps(e.target.checked)} className="mt-0.5 h-4 w-4 accent-[#E23B2A]" />
                <span>
                  <span className="font-semibold">Google Maps</span>
                  <span className="block text-cocoa/75">Shows clinic maps. Google may set cookies when a map loads.</span>
                </span>
              </label>
            </div>
          )}
          <div className="mt-3 flex flex-wrap items-center gap-2 md:mt-4">
            {settings ? (
              <button type="button" onClick={() => choose(maps)} className="btn btn-dark !min-h-11 !px-5 text-sm">
                Save choices
              </button>
            ) : (
              <>
                <button type="button" onClick={() => choose(true)} className="btn btn-dark !min-h-10 !px-4 text-sm md:!min-h-11 md:!px-5">
                  Accept all
                </button>
                <button type="button" onClick={() => choose(false)} className="btn btn-ghost !min-h-10 !px-4 text-sm text-cocoa md:!min-h-11 md:!px-5">
                  Essential only
                </button>
                <button type="button" onClick={() => setSettings(true)} className="px-2 text-sm font-semibold text-cocoa/80 underline underline-offset-2">
                  Settings
                </button>
              </>
            )}
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}

/** Footer link that reopens the consent card. */
export function CookieSettingsLink({ className }: { className?: string }) {
  return (
    <button type="button" onClick={openCookieSettings} className={className}>
      Cookie settings
    </button>
  );
}
