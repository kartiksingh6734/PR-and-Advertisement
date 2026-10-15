import type { MetadataRoute } from "next";
import { brand } from "@/lib/config";
import { services, industries } from "@/lib/content";
export default function sitemap(): MetadataRoute.Sitemap {
  if (!brand.domain) return [];
  return [
    "",
    "/about",
    "/services",
    "/industries",
    "/how-we-work",
    "/pricing",
    "/contact",
    "/growth-plan-finder",
    "/faqs",
    "/privacy",
    "/terms",
    ...services.map((s) => `/services/${s.slug}`),
    ...industries.map((s) => `/industries/${s.slug}`),
  ].map((path) => ({ url: `${brand.domain.replace(/\/$/, "")}${path}` }));
}
