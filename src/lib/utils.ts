import clsx, { type ClassValue } from "clsx";

export const cn = (...inputs: ClassValue[]) => clsx(inputs);

export function hashString(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** Deterministically picks a variant so sibling programmatic pages read differently but stay stable across builds. */
export function pick<T>(seed: string, options: readonly T[]): T {
  return options[hashString(seed) % options.length];
}

export function pickMany<T>(seed: string, options: readonly T[], count: number): T[] {
  const arr = [...options];
  let h = hashString(seed);
  for (let i = arr.length - 1; i > 0; i--) {
    h = Math.imul(h ^ (h >>> 15), 2246822507) >>> 0;
    const j = h % (i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.slice(0, count);
}

export function fill(template: string, vars: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? `{${k}}`);
}

export const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-");

/** Lowercases a phrase for use mid-sentence while keeping acronyms such as GFC, PRP, FUE and QR678 intact. */
export const lower = (s: string) =>
  s
    .split(" ")
    .map((w) => (/^[A-Z0-9][A-Z0-9-]+$/.test(w) ? w : w.toLowerCase()))
    .join(" ");
