import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const baseUrl = "https://admill.co.zw";

export default function sitemap(): MetadataRoute.Sitemap {
  const solutions = [
    "electrical-engineering",
    "power-energy",
    "building-automation",
    "industrial-automation",
    "electronic-security",
    "fire-life-safety",
    "systems-integration",
  ];

  const industries = [
    "mining",
    "manufacturing",
    "commercial",
    "healthcare",
    "education",
    "hospitality",
  ];

  return [
    { url: baseUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/solutions`, changeFrequency: "monthly", priority: 0.9 },
    ...solutions.map((slug) => ({ url: `${baseUrl}/solutions/${slug}`, changeFrequency: "monthly" as const, priority: 0.9 })),
    { url: `${baseUrl}/industries`, changeFrequency: "monthly", priority: 0.8 },
    ...industries.map((slug) => ({ url: `${baseUrl}/industries/${slug}`, changeFrequency: "monthly" as const, priority: 0.8 })),
  ];
}
