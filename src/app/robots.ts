import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Search engines and AI assistants are all explicitly welcome so the clinic can be cited in AI answers.
const AI_AND_SEARCH_BOTS = [
  "Googlebot", "Googlebot-Image", "Google-Extended", "Bingbot", "Applebot", "Applebot-Extended", "DuckDuckBot", "YandexBot", "Slurp",
  "GPTBot", "ChatGPT-User", "OAI-SearchBot",
  "ClaudeBot", "Claude-User", "Claude-SearchBot", "anthropic-ai",
  "PerplexityBot", "Perplexity-User",
  "CCBot", "Meta-ExternalAgent", "Meta-ExternalFetcher", "FacebookBot", "Amazonbot", "Bytespider",
  "cohere-ai", "cohere-training-data-crawler", "MistralAI-User", "DuckAssistBot", "YouBot", "PhindBot", "Diffbot", "Timpibot", "ImagesiftBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: "/api/" },
      ...AI_AND_SEARCH_BOTS.map((ua) => ({ userAgent: ua, allow: "/", disallow: "/api/" })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
