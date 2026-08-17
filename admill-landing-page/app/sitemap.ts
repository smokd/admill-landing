import type { MetadataRoute } from "next";

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
    ...solutions.map((slug) => ({ url: `${baseUrl}/solutions/${slug}`, changeFrequency: "monthly" as const, priority: 0.9 })),
    ...industries.map((slug) => ({ url: `${baseUrl}/industries/${slug}`, changeFrequency: "monthly" as const, priority: 0.8 })),
  ];
}
