import { AsciiHeroBackground } from "@/components/home/ascii-hero-background";
import { AsciiHeroMark } from "@/components/home/ascii-hero-mark";
import { homeContent } from "@/content/home";

export function HeroSection() {
  return (
    <section id="top" className="hero" aria-label="aattica introduction">
      <div className="ascii-hero-background">
        <AsciiHeroBackground />
      </div>
      <div className="hero__shade" aria-hidden="true" />
      <p
        className="hero__wordmarks"
        aria-label="aattica. // human-made."
      >
        <span>aattica.</span>
        <span className="hero__wordmark-separator" aria-hidden="true">
          {" // "}
        </span>
        <span>human-made.</span>
      </p>
      <AsciiHeroMark />
      <p className="hero__eyebrow">{homeContent.hero.eyebrow}</p>
      <a className="hero__scroll" href="#about">
        {homeContent.hero.scrollLabel} ↓
      </a>
    </section>
  );
}
