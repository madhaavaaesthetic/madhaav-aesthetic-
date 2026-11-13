"use client";

import type { RefObject } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

type Setup = () => void | (() => void);

/** How far below the viewport (in screen heights) an element must be before its animation is prepared. */
const AHEAD = 1.5;

/**
 * Like useGSAP, but defers the setup of below-the-fold animations until the element is within ~1.5 screens of view.
 *
 * Scroll-reveal animations only play when scrolled to, so preparing them early has no visible benefit, yet doing all of
 * them during hydration (SplitText line measuring, ScrollTrigger position reads) was the page's biggest main-thread task.
 * Elements near the top of the page (or with `eager`) set up immediately, exactly as before.
 */
export function useLazyGSAP(ref: RefObject<HTMLElement | null>, setup: Setup, eager = false) {
  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      let ctx: gsap.Context | undefined;
      const run = () => {
        ctx = gsap.context(setup, el);
      };
      const near = () => el.getBoundingClientRect().top < window.innerHeight * (1 + AHEAD);

      if (eager || near()) {
        run();
        return () => ctx?.revert();
      }

      let frame = 0;
      const check = () => {
        frame = 0;
        if (!near()) return;
        stop();
        run();
      };
      const onScroll = () => {
        if (!frame) frame = requestAnimationFrame(check);
      };
      const stop = () => {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
        if (frame) cancelAnimationFrame(frame);
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll, { passive: true });
      return () => {
        stop();
        ctx?.revert();
      };
    },
    { scope: ref }
  );
}
