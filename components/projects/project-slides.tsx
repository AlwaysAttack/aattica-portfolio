import Image from "next/image";
import { ProjectReveal } from "@/components/projects/project-motion";
import type { ProjectSlide } from "@/content/projects";

type ProjectSlidesProps = {
  label: string;
  slides: readonly ProjectSlide[];
};

export function ProjectSlides({ label, slides }: ProjectSlidesProps) {
  return (
    <section className="project-slides" aria-labelledby="project-slides-title" data-after-overview="true">
      <div className="project-slides__divider" aria-hidden="true">
        <span />
        <span>+</span>
      </div>
      <ProjectReveal className="project-slides__heading">
        <p>CASE / DECK</p>
        <h2 id="project-slides-title">{label}</h2>
      </ProjectReveal>
      <ol>
        {slides.map((slide) => (
          <li key={slide.src}>
            <ProjectReveal>
              <Image
                alt={slide.alt}
                height={slide.height}
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 1120px"
                src={slide.src}
                width={slide.width}
              />
            </ProjectReveal>
          </li>
        ))}
      </ol>
    </section>
  );
}
