import type { MetadataRoute } from "next";
import { brand } from "@/lib/config";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    ...(brand.domain
      ? { sitemap: `${brand.domain.replace(/\/$/, "")}/sitemap.xml` }
      : {}),
  };
}
