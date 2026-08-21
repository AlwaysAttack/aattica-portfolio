import type { Locale } from "@/lib/i18n";

type ProjectHeaderProps = {
  locale: Locale;
  slug: string;
  navigation: {
    backToProjects: string;
    switchLocale: string;
  };
};

export function ProjectHeader({ locale, slug, navigation }: ProjectHeaderProps) {
  const otherLocale = locale === "en" ? "ru" : "en";

  return (
    <header className="project-header">
      <a href={`/${locale}#projects`}>{navigation.backToProjects}</a>
      <a href={`/${otherLocale}/projects/${slug}`}>{navigation.switchLocale}</a>
    </header>
  );
}
