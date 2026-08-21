import { AsciiHeroBackground } from "@/components/home/ascii-hero-background";
import { AsciiHeroMark } from "@/components/home/ascii-hero-mark";
import type { HomeContent } from "@/content/home";

type HeroSectionProps = {
  content: HomeContent["hero"];
};

export function HeroSection({ content }: HeroSectionProps) {
  return (
    <section id="top" className="hero" aria-label={content.ariaLabel}>
      <div className="ascii-hero-background">
        <AsciiHeroBackground />
      </div>
      <div className="hero__shade" aria-hidden="true" />
      <p
        className="hero__wordmarks"
        aria-label={content.wordmarkLabel}
      >
        <span>aattica.</span>
        <span className="hero__wordmark-separator" aria-hidden="true">
          {" // "}
        </span>
        <span>human-made.</span>
      </p>
      <AsciiHeroMark label={content.bearLabel} />
      <p className="hero__eyebrow">{content.eyebrow}</p>
      <a className="hero__scroll" href="#about">
        {content.scrollLabel} ↓
      </a>
    </section>
  );
}
