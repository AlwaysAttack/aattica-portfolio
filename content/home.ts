import { homeContentEn } from "@/content/home.en";
import { homeContentRu } from "@/content/home.ru";
import type { HomeContent } from "@/content/home.types";
import type { Locale } from "@/lib/i18n";

const dictionaries: Record<Locale, HomeContent> = {
  en: homeContentEn,
  ru: homeContentRu,
};

export function getHomeContent(locale: Locale): HomeContent {
  return dictionaries[locale];
}

export type { HomeContent } from "@/content/home.types";
