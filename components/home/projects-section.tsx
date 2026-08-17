import { homeContent } from "@/content/home";

export function ProjectsSection() {
  return (
    <section
      id="projects"
      className="projects"
      aria-labelledby="projects-title"
    >
      <p className="eyebrow">02 / SELECTED WORK</p>
      <h2 id="projects-title">Selected projects</h2>
      <div className="project-list">
        {homeContent.projects.map((project) => (
          <a
            className="project-card"
            href={`/projects/${project.slug}`}
            key={project.slug}
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
