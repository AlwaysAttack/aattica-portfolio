import type { ReactNode } from "react";
import { ProjectReveal, ProjectScrambleText } from "@/components/projects/project-motion";
import { ProjectSlides } from "@/components/projects/project-slides";
import type { ProjectContent } from "@/content/projects";
import type { Locale } from "@/lib/i18n";

type ProjectCaseProps = {
  content: ProjectContent;
  locale: Locale;
};

type StorySectionProps = {
  body: string;
  id: string;
  title: string;
  children?: ReactNode;
};

function StorySection({ body, children, id, title }: StorySectionProps) {
  return (
    <ProjectReveal>
      <section className="project-story__block" aria-labelledby={id}>
        <h2 id={id}>{title}</h2>
        <p>{body}</p>
        {children}
      </section>
    </ProjectReveal>
  );
}

export function ProjectCase({ content, locale }: ProjectCaseProps) {
  return (
    <article className="project-case" aria-labelledby="project-title">
      <div className="project-overview" data-testid="project-overview">
        <ProjectReveal className="project-summary-reveal">
          <aside className="project-summary" aria-label={content.hero.format}>
            <p className="project-summary__eyebrow">{content.hero.format}</p>
            <p className="project-summary__lead">{content.hero.valueProposition}</p>
            <p className="project-summary__outcome">{content.hero.outcome}</p>
            <dl>
              {content.facts.map((fact) => (
                <div key={fact.label}>
                  <dt>{fact.label}</dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </ProjectReveal>

        <div className="project-story">
          <StorySection body={content.context.body} id="project-context-title" title={content.context.title} />
          <StorySection body={content.problem.body} id="project-problem-title" title={content.problem.title} />
          <StorySection body={content.research.body} id="project-research-title" title={content.research.title} />
          <StorySection body={content.role.body} id="project-role-title" title={content.role.title} />
          <StorySection body={content.process.body} id="project-process-title" title={content.process.title} />
          <StorySection body={content.solution.body} id="project-solution-title" title={content.solution.title}>
            <ul>
              {content.solution.principles.map((principle) => (
                <li key={principle}>{principle}</li>
              ))}
            </ul>
          </StorySection>
          <StorySection body={content.delivered.body} id="project-delivered-title" title={content.delivered.title}>
            <p>{content.delivered.uiImplementation}</p>
          </StorySection>
          <StorySection body={content.outcome.body} id="project-outcome-title" title={content.outcome.title} />
          <StorySection
            body={content.limitations.body}
            id="project-limitations-title"
            title={content.limitations.title}
          />
        </div>
      </div>

      <ProjectSlides label={content.navigation.presentation} slides={content.slides} />

      <ProjectReveal>
        <section className="project-contact-cta" aria-labelledby="project-contact-title">
          <p>{content.navigation.contactEyebrow}</p>
          <h2 id="project-contact-title">
            <ProjectScrambleText text={content.navigation.contact} />
          </h2>
          <p>{content.navigation.contactPrompt}</p>
          <a href={`/${locale}#contact`}>
            {content.navigation.contact}
            <span aria-hidden="true">↗</span>
          </a>
        </section>
      </ProjectReveal>

      <nav className="project-case__footer-nav" aria-label={content.navigation.backToProjects}>
        <a href={`/${locale}#projects`}>
          <span aria-hidden="true">← </span>
          {content.navigation.backToProjects}
        </a>
      </nav>
    </article>
  );
}
