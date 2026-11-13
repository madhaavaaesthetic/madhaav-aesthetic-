"use client";

import { m } from "motion/react";
import { useEffect, useState, type ReactNode } from "react";

let hydrated = false;

export default function Template({ children }: { children: ReactNode }) {
  // The curtain only plays on client-side navigations; the server HTML must never be covered.
  const [curtain] = useState(() => typeof window !== "undefined" && hydrated);
  useEffect(() => {
    hydrated = true;
  }, []);

  return (
    <>
      {curtain && (
        <m.div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[150] grad-ember"
          initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
          animate={{ clipPath: "inset(0% 0% 100% 0%)" }}
          transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1], delay: 0.05 }}
        />
      )}
      {children}
    </>
  );
}
