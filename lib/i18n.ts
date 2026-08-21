export const LOCALES = ["en", "ru"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";
export const LOCALE_COOKIE = "locale";
export const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 183;

export function isLocale(value: string): value is Locale {
  return LOCALES.includes(value as Locale);
}

export function selectLocale(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) {
    return DEFAULT_LOCALE;
  }

  const candidates = acceptLanguage
    .split(",")
    .map((entry, index) => {
      const [languageRange, ...parameters] = entry.trim().split(";");
      const locale = languageRange.toLowerCase().split("-")[0];
      const qualityParameter = parameters
        .map((parameter) => parameter.trim())
        .find((parameter) => parameter.startsWith("q="));
      const quality = qualityParameter
        ? Number(qualityParameter.slice(2))
        : 1;

      if (!isLocale(locale) || !Number.isFinite(quality) || quality <= 0 || quality > 1) {
        return null;
      }

      return { locale, quality, index };
    })
    .filter((candidate): candidate is NonNullable<typeof candidate> => candidate !== null)
    .sort((left, right) => right.quality - left.quality || left.index - right.index);

  return candidates[0]?.locale ?? DEFAULT_LOCALE;
}
