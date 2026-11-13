import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;
const base = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" } as const;

export const ArrowUpRight = (p: P) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" {...base} {...p}><path d="M7 17 17 7M8 7h9v9" /></svg>
);
export const ArrowRight = (p: P) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" {...base} {...p}><path d="M4 12h16M14 6l6 6-6 6" /></svg>
);
export const Phone = (p: P) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" {...base} {...p}><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" /></svg>
);
export const Pin = (p: P) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" {...base} {...p}><path d="M12 21s-7-5.6-7-11a7 7 0 0 1 14 0c0 5.4-7 11-7 11Z" /><circle cx="12" cy="10" r="2.5" /></svg>
);
export const Clock = (p: P) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" {...base} {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
);
export const Star = (p: P) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" {...p}><path d="m12 2.8 2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.2l-5.7 3.1 1.2-6.4-4.7-4.4 6.4-.8z" /></svg>
);
export const Plus = (p: P) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" {...base} {...p}><path d="M12 5v14M5 12h14" /></svg>
);
export const Instagram = (p: P) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" {...base} {...p}><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" /></svg>
);
export const WhatsApp = (p: P) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" {...p}>
    <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.3a.4.4 0 0 0 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.9 11.9 0 0 0 4.6 4c1.7.7 2.3.8 3.2.7a2.7 2.7 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .2-1.3c-.1-.1-.2-.2-.4-.3Z" />
  </svg>
);
export const Check = (p: P) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" {...base} {...p}><path d="m5 12.5 4.2 4.2L19 7" /></svg>
);
export const Shield = (p: P) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" {...base} {...p}><path d="M12 3 5 6v6c0 4.4 3 7.6 7 9 4-1.4 7-4.6 7-9V6z" /><path d="m9 12 2 2 4-4" /></svg>
);
export const Scope = (p: P) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" {...base} {...p}><circle cx="11" cy="11" r="6" /><path d="m20 20-4.5-4.5M11 8v6M8 11h6" /></svg>
);
export const Wallet = (p: P) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" {...base} {...p}><rect x="3" y="6" width="18" height="13" rx="3" /><path d="M16 12.5h2M3 9h15a3 3 0 0 0-3-3H6" /></svg>
);
export const Calendar = (p: P) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" {...base} {...p}><rect x="3" y="5" width="18" height="16" rx="3" /><path d="M8 3v4M16 3v4M3 10h18" /></svg>
);
export const Scalpel = (p: P) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" {...base} {...p}><path d="M4 20 14 10l3 3L8 20zM14 10l5-5a2.1 2.1 0 0 1 3 3l-5 5" /></svg>
);
export const Sparkle = (p: P) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" {...base} {...p}><path d="M12 3c.6 4.2 2.8 6.4 7 7-4.2.6-6.4 2.8-7 7-.6-4.2-2.8-6.4-7-7 4.2-.6 6.4-2.8 7-7ZM19 16c.3 1.6 1 2.3 2.5 2.5-1.6.3-2.3 1-2.5 2.5-.3-1.6-1-2.3-2.5-2.5 1.6-.3 2.3-1 2.5-2.5Z" /></svg>
);
export const Play = (p: P) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" {...p}><path d="M8 5.5v13a1 1 0 0 0 1.5.9l10.4-6.5a1 1 0 0 0 0-1.8L9.5 4.6A1 1 0 0 0 8 5.5Z" /></svg>
);
