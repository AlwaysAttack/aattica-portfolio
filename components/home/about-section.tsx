import { homeContent } from "@/content/home";

export function AboutSection() {
  const { about } = homeContent;

  return (
    <section id="about" className="about" aria-labelledby="about-title">
      <div className="about__sticky">
        <p className="eyebrow">01 / PROFILE</p>
        <h1 id="about-title">{about.title}</h1>
      </div>
      <div className="about__content">
        <p className="about__statement">{about.statement}</p>
        <dl>
          <div>
            <dt>Experience</dt>
            <dd>{about.experience}</dd>
          </div>
          <div>
            <dt>Availability</dt>
            <dd>{about.availability}</dd>
          </div>
        </dl>
        <h2>Capabilities</h2>
        <ul>
          {about.skills.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
        <h2>Tools</h2>
        <p>{about.tools.join(" · ")}</p>
      </div>
    </section>
  );
}
