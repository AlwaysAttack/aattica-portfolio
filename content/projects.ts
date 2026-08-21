import { driveeContentEn } from "@/content/projects.en";
import { driveeContentRu } from "@/content/projects.ru";
import type { ProjectContent } from "@/content/projects.types";
import { LOCALES, type Locale } from "@/lib/i18n";

export const PUBLISHED_PROJECT_SLUGS = ["drivee"] as const;

export type PublishedProjectSlug = (typeof PUBLISHED_PROJECT_SLUGS)[number];

const dictionaries: Record<Locale, Record<PublishedProjectSlug, ProjectContent>> = {
  en: { drivee: driveeContentEn },
  ru: { drivee: driveeContentRu },
};

export function isPublishedProjectSlug(value: string): value is PublishedProjectSlug {
  return PUBLISHED_PROJECT_SLUGS.includes(value as PublishedProjectSlug);
}

export function getProjectContent(locale: Locale, slug: PublishedProjectSlug): ProjectContent {
  return dictionaries[locale][slug];
}

export function getProjectStaticParams(): { lang: Locale; slug: PublishedProjectSlug }[] {
  return LOCALES.flatMap((lang) => PUBLISHED_PROJECT_SLUGS.map((slug) => ({ lang, slug })));
}

export type { ProjectContent, ProjectSlide } from "@/content/projects.types";
