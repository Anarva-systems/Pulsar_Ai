import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/private/", "/_next/"],
      },
      {
        userAgent: [
          "Googlebot",
          "Googlebot-Image",
          "Googlebot-Mobile",
          "Google-Extended",
          "Bingbot",
          "Slurp",
          "DuckDuckBot",
          "Baiduspider",
          "YandexBot",
          "Applebot",
          "GPTBot",
          "ChatGPT-User",
          "PerplexityBot",
          "ClaudeBot",
        ],
        allow: "/",
        disallow: ["/api/private/"],
      },
    ],
    sitemap: "https://pulsaragent.in/sitemap.xml",
    host: "https://pulsaragent.in",
  };
}
