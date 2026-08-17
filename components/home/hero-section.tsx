import Image from "next/image";
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
      <Image
        className="hero__bear"
        src="/brand/aattica-bear.png"
        alt="aattica bear mark"
        width={1080}
        height={1080}
        priority
      />
      <p className="hero__eyebrow">{homeContent.hero.eyebrow}</p>
      <a className="hero__scroll" href="#about">
        {homeContent.hero.scrollLabel} ↓
      </a>
    </section>
  );
}
