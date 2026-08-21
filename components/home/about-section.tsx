import type { HomeContent } from "@/content/home";

type AboutSectionProps = {
  content: HomeContent["about"];
};

export function AboutSection({ content }: AboutSectionProps) {
  return (
    <section id="about" className="about" aria-labelledby="about-title">
      <div className="about__sticky">
        <p className="eyebrow">{content.eyebrow}</p>
        <h1 id="about-title">{content.title}</h1>
        <p className="about__statement">{content.statement}</p>
      </div>
      <div className="about__content">
        <p className="about__intro">{content.introduction}</p>
        <div className="about__approach">
          <h2>{content.approachTitle}</h2>
          <p>{content.approach}</p>
        </div>
        <dl className="about__facts">
          {content.facts.map((fact) => (
            <div key={fact.label}>
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>
        <h2>{content.capabilitiesTitle}</h2>
        <ul className="about__capabilities">
          {content.capabilities.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
        <h2>{content.toolsTitle}</h2>
        <p className="about__tools">{content.tools.join(" · ")}</p>
        <h2>{content.resumesTitle}</h2>
        <div className="about__resumes">
          {content.resumes.map((resume) => (
            <a href={resume.href} key={resume.href} rel="noreferrer" target="_blank">
              {resume.label}
              <span aria-hidden="true">↗</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
