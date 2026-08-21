import type { MetadataRoute } from "next";
import { getProjectStaticParams } from "@/content/projects";
import { LOCALES } from "@/lib/i18n";
import { getSiteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();

  return [
    ...LOCALES.map((locale) => ({
      url: new URL(`/${locale}`, siteUrl).toString(),
      changeFrequency: "monthly" as const,
      priority: 1,
    })),
    ...getProjectStaticParams().map(({ lang, slug }) => ({
      url: new URL(`/${lang}/projects/${slug}`, siteUrl).toString(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
