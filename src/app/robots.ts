import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/private/", "/_next/"],
    },
    sitemap: "https://pulsaragent.in/sitemap.xml",
    host: "https://pulsaragent.in",
  };
}
