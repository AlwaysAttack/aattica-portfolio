import Image from "next/image";
import type { ProjectSlide } from "@/content/projects";

type ProjectSlidesProps = {
  label: string;
  slides: readonly ProjectSlide[];
};

export function ProjectSlides({ label, slides }: ProjectSlidesProps) {
  return (
    <section className="project-slides" aria-labelledby="project-slides-title">
      <h2 id="project-slides-title">{label}</h2>
      <ol>
        {slides.map((slide, index) => (
          <li key={slide.src}>
            <Image
              alt={slide.alt}
              height={slide.height}
              loading={index === 0 ? undefined : "lazy"}
              preload={index === 0}
              sizes="(max-width: 768px) 100vw, 1120px"
              src={slide.src}
              width={slide.width}
            />
          </li>
        ))}
      </ol>
    </section>
  );
}
