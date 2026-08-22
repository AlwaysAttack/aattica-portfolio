import Image from "next/image";
import { ProjectScrambleText } from "@/components/projects/project-motion";
import type { ProjectContent, ProjectSlide } from "@/content/projects";
import type { Locale } from "@/lib/i18n";

type ProjectHeaderProps = {
  locale: Locale;
  slug: string;
  navigation: {
    backToProjects: string;
    switchLocale: string;
  };
  hero: ProjectContent["hero"];
  cover: ProjectSlide;
};

export function ProjectHeader({ locale, slug, navigation, hero, cover }: ProjectHeaderProps) {
  const otherLocale = locale === "en" ? "ru" : "en";

  return (
    <header className="project-header">
      <nav className="project-header__nav" aria-label={navigation.backToProjects}>
        <a href={`/${locale}#projects`}>
          <span aria-hidden="true">← </span>
          {navigation.backToProjects}
        </a>
        <a href={`/${otherLocale}/projects/${slug}`}>{navigation.switchLocale}</a>
      </nav>
      <div className="project-cover">
        <Image alt={cover.alt} fill preload sizes="100vw" src={cover.src} />
        <div className="project-cover__shade" aria-hidden="true" />
        <div className="project-cover__content">
          <p>{hero.format}</p>
          <h1 id="project-title">
            <ProjectScrambleText text={hero.title} />
          </h1>
          <p>{hero.role}</p>
        </div>
      </div>
    </header>
  );
}
