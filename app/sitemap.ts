import type { MetadataRoute } from "next";
import { LOCALES } from "@/lib/i18n";
import { getSiteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();

  return LOCALES.map((locale) => ({
    url: new URL(`/${locale}`, siteUrl).toString(),
    changeFrequency: "monthly" as const,
    priority: 1,
  }));
}
