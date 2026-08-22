import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectCase } from "@/components/projects/project-case";
import { ProjectHeader } from "@/components/projects/project-header";
import {
  PUBLISHED_PROJECT_SLUGS,
  getProjectContent,
  isPublishedProjectSlug,
  type ProjectContent,
} from "@/content/projects";
import { isLocale, type Locale } from "@/lib/i18n";
import { getSiteUrl } from "@/lib/site";

type LocalizedProjectPageProps = {
  content: ProjectContent;
  locale: Locale;
};

type ProjectPageParams = {
  params: Promise<{ lang: string; slug: string }>;
};

export const dynamicParams = false;

export function LocalizedProjectPage({ content, locale }: LocalizedProjectPageProps) {
  return (
    <main>
      <ProjectHeader
        cover={content.slides[0]}
        hero={content.hero}
        locale={locale}
        navigation={content.navigation}
        slug={content.slug}
      />
      <ProjectCase content={content} locale={locale} />
    </main>
  );
}

export function generateStaticParams() {
  return PUBLISHED_PROJECT_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ProjectPageParams): Promise<Metadata> {
  const { lang, slug } = await params;

  if (!isLocale(lang) || !isPublishedProjectSlug(slug)) {
    notFound();
  }

  const content = getProjectContent(lang, slug);
  const siteUrl = getSiteUrl();
  const canonical = new URL(`/${lang}/projects/${slug}`, siteUrl).toString();
  const otherLocale = lang === "en" ? "ru" : "en";

  return {
    title: `${content.hero.title} — ${content.hero.format}`,
    description: content.hero.valueProposition,
    alternates: {
      canonical,
      languages: {
        en: new URL(`/en/projects/${slug}`, siteUrl).toString(),
        ru: new URL(`/ru/projects/${slug}`, siteUrl).toString(),
      },
    },
    openGraph: {
      type: "article",
      title: content.hero.title,
      description: content.hero.valueProposition,
      url: canonical,
      locale: lang === "en" ? "en_US" : "ru_RU",
      alternateLocale: [otherLocale === "en" ? "en_US" : "ru_RU"],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageParams) {
  const { lang, slug } = await params;

  if (!isLocale(lang) || !isPublishedProjectSlug(slug)) {
    notFound();
  }

  return <LocalizedProjectPage content={getProjectContent(lang, slug)} locale={lang} />;
}
