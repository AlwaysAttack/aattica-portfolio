import type { HomeContent } from "@/content/home";
import type { Locale } from "@/lib/i18n";

type ProjectsSectionProps = {
  content: HomeContent["projects"];
  locale: Locale;
};

export function ProjectsSection({ content, locale }: ProjectsSectionProps) {
  return (
    <section
      id="projects"
      className="projects"
      aria-labelledby="projects-title"
    >
      <p className="eyebrow">{content.eyebrow}</p>
      <h2 id="projects-title">{content.title}</h2>
      <div className="project-list">
        {content.items.map((project) => (
          <a
            className="project-card"
            href={`/${locale}/projects/${project.slug}`}
            key={project.slug}
            aria-label={project.openLabel}
          >
            <span className="project-card__index">{project.index}</span>
            <div>
              <p className="meta">{project.category}</p>
              <h3>{project.title}</h3>
              <p>{project.summary}</p>
              <strong>{project.result}</strong>
            </div>
            <span aria-hidden="true">↗</span>
          </a>
        ))}
      </div>
    </section>
  );
}
