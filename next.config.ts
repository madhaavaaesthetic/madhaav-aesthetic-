import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

// Inline scripts are required for Next.js hydration and JSON-LD, so script-src keeps 'unsafe-inline';
// everything else is locked to this origin plus the Google Maps embed.
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://*.googleusercontent.com https://*.gstatic.com https://*.googleapis.com https://*.google.com",
  "font-src 'self' data:",
  "media-src 'self'",
  "connect-src 'self'",
  "frame-src https://www.google.com https://maps.google.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  ...(isProd ? [{ key: "Content-Security-Policy", value: csp }] : []),
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [390, 640, 828, 1080, 1280, 1600, 1920],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      { source: "/api/:path*", headers: [{ key: "Cache-Control", value: "no-store" }, { key: "X-Robots-Tag", value: "noindex" }] },
    ];
  },
  async redirects() {
    return [
      { source: "/brahmapur", destination: "/berhampur", permanent: true },
      { source: "/brahmapur/:path*", destination: "/berhampur/:path*", permanent: true },
      { source: "/delhi", destination: "/new-delhi", permanent: true },
      { source: "/delhi/:path*", destination: "/new-delhi/:path*", permanent: true },
      { source: "/thane-west", destination: "/thane", permanent: true },
      { source: "/products-services", destination: "/treatments", permanent: true },
      { source: "/posts", destination: "/blog", permanent: true },
    ];
  },
};

export default nextConfig;
