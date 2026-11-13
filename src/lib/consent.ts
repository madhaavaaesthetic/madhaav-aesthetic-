"use client";

import { useSyncExternalStore } from "react";

/** The visitor's cookie choice. Essential storage is always on; Google Maps embeds (which set Google cookies) are optional. */
export interface Consent {
  maps: boolean;
  updated: string;
}

const KEY = "madhaav-cookie-consent";
const CHANGE = "madhaav:consent";
export const OPEN_SETTINGS = "madhaav:cookie-settings";

const read = (): string | null => {
  try {
    return localStorage.getItem(KEY);
  } catch {
    return null;
  }
};

export function saveConsent(maps: boolean) {
  const value: Consent = { maps, updated: new Date().toISOString() };
  try {
    localStorage.setItem(KEY, JSON.stringify(value));
  } catch {}
  window.dispatchEvent(new Event(CHANGE));
}

export const openCookieSettings = () => window.dispatchEvent(new Event(OPEN_SETTINGS));

const subscribe = (cb: () => void) => {
  window.addEventListener(CHANGE, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(CHANGE, cb);
    window.removeEventListener("storage", cb);
  };
};

const SERVER = "__server__";

/** Current choice: null = not chosen yet; undefined = not known yet (server render). */
export function useConsent(): Consent | null | undefined {
  const raw = useSyncExternalStore(subscribe, read, () => SERVER);
  if (raw === SERVER) return undefined;
  if (raw === null) return null;
  try {
    return JSON.parse(raw) as Consent;
  } catch {
    return null;
  }
}
