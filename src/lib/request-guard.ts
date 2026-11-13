/** Small server-side guards shared by the API routes. */

const buckets = new Map<string, number[]>();
let lastSweep = Date.now();

/** Sliding-window limiter keyed by `scope:ip`. In-memory, so per server instance. */
export function rateLimited(scope: string, ip: string, limit: number, windowMs: number) {
  const now = Date.now();
  if (now - lastSweep > 5 * 60_000) {
    for (const [k, v] of buckets) if (!v.some((t) => now - t < windowMs)) buckets.delete(k);
    lastSweep = now;
  }
  const key = `${scope}:${ip}`;
  const recent = (buckets.get(key) ?? []).filter((t) => now - t < windowMs);
  recent.push(now);
  buckets.set(key, recent);
  return recent.length > limit;
}

export const clientIp = (req: Request) => req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "local";

/** Rejects cross-site browser requests: when an Origin header is sent, it must match this site's host. */
export function sameOrigin(req: Request) {
  const origin = req.headers.get("origin");
  if (!origin) return true;
  try {
    const host = req.headers.get("x-forwarded-host") || req.headers.get("host");
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

/** Removes control characters (newlines, tabs, NUL) that could break email headers. */
export const stripControl = (s: string) => s.replace(/[\u0000-\u001f\u007f]+/g, " ").trim();
