import type { ProjectContent } from "@/content/projects";
import type { Locale } from "@/lib/i18n";
import { ProjectSlides } from "@/components/projects/project-slides";

type ProjectCaseProps = {
  content: ProjectContent;
  locale: Locale;
};

export function ProjectCase({ content, locale }: ProjectCaseProps) {
  return (
    <article className="project-case" aria-labelledby="project-title">
      <section className="project-hero">
        <p>{content.hero.format}</p>
        <h1 id="project-title">{content.hero.title}</h1>
        <p>{content.hero.valueProposition}</p>
        <p>{content.hero.outcome}</p>
        <dl>
          {content.facts.map((fact) => (
            <div key={fact.label}>
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="project-context-title">
        <h2 id="project-context-title">{content.context.title}</h2>
        <p>{content.context.body}</p>
      </section>
      <section aria-labelledby="project-problem-title">
        <h2 id="project-problem-title">{content.problem.title}</h2>
        <p>{content.problem.body}</p>
      </section>
      <section aria-labelledby="project-research-title">
        <h2 id="project-research-title">{content.research.title}</h2>
        <p>{content.research.body}</p>
      </section>
      <section aria-labelledby="project-role-title">
        <h2 id="project-role-title">{content.role.title}</h2>
        <p>{content.role.body}</p>
      </section>
      <section aria-labelledby="project-process-title">
        <h2 id="project-process-title">{content.process.title}</h2>
        <p>{content.process.body}</p>
      </section>
      <section aria-labelledby="project-solution-title">
        <h2 id="project-solution-title">{content.solution.title}</h2>
        <p>{content.solution.body}</p>
        <ul>
          {content.solution.principles.map((principle) => (
            <li key={principle}>{principle}</li>
          ))}
        </ul>
      </section>
      <section aria-labelledby="project-delivered-title">
        <h2 id="project-delivered-title">{content.delivered.title}</h2>
        <p>{content.delivered.body}</p>
        <p>{content.delivered.uiImplementation}</p>
      </section>
      <section aria-labelledby="project-outcome-title">
        <h2 id="project-outcome-title">{content.outcome.title}</h2>
        <p>{content.outcome.body}</p>
      </section>
      <section aria-labelledby="project-limitations-title">
        <h2 id="project-limitations-title">{content.limitations.title}</h2>
        <p>{content.limitations.body}</p>
      </section>
      <ProjectSlides label={content.navigation.presentation} slides={content.slides} />
      <nav aria-label={content.navigation.backToProjects}>
        <a href={`/${locale}#projects`}>{content.navigation.backToProjects}</a>
        <a href={`/${locale}#contact`}>{content.navigation.contact}</a>
      </nav>
    </article>
  );
}
