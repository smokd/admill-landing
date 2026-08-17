import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: "https://admill.co.zw/sitemap.xml",
    host: "https://admill.co.zw",
  };
}
