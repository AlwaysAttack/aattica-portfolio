import Image from "next/image";
import { AsciiHeroMark } from "@/components/home/ascii-hero-mark";
import { homeContent } from "@/content/home";

export function HeroSection() {
  return (
    <section id="top" className="hero" aria-label="aattica introduction">
      <Image
        className="hero__background"
        src="/brand/aattica-banner.png"
        alt=""
        fill
        priority
        sizes="100vw"
      />
      <div className="hero__shade" aria-hidden="true" />
      <AsciiHeroMark />
      <p className="hero__eyebrow">{homeContent.hero.eyebrow}</p>
      <a className="hero__scroll" href="#about">
        {homeContent.hero.scrollLabel} ↓
      </a>
    </section>
  );
}
