"use client";

import { useEffect } from "react";
import { useScramble } from "use-scramble";
import {
  ASCII_BACKGROUND_ROWS,
  isAnimatedAsciiBackgroundRow,
} from "@/content/ascii-background";

type AsciiHeroBackgroundProps = {
  reducedMotion?: boolean;
};

type BackgroundRowProps = {
  index: number;
  text: string;
};

function StaticBackgroundRow({ text }: BackgroundRowProps) {
  return <span data-background-row>{text}</span>;
}

function AnimatedBackgroundRow({ index, text }: BackgroundRowProps) {
  const { ref, replay } = useScramble({
    text,
    playOnMount: false,
    speed: 0.35,
    tick: 2,
    step: 8,
    scramble: 3,
    seed: 8,
    chance: 0.35,
    overdrive: false,
    overflow: false,
    ignore: [" ", "\n"],
  });

  useEffect(() => {
    const initialDelay = 1200 + index * 320;
    const repeatDelay = 8000 + index * 420;
    const timeout = window.setTimeout(() => {
      if (!document.hidden) {
        replay();
      }
    }, initialDelay);
    const interval = window.setInterval(() => {
      if (!document.hidden) {
        replay();
      }
    }, repeatDelay);

    return () => {
      window.clearTimeout(timeout);
      window.clearInterval(interval);
    };
  }, [index, replay]);

  return (
    <span ref={ref} data-background-row data-animated="true">
      {text}
    </span>
  );
}

export function AsciiHeroBackground({
  reducedMotion = false,
}: AsciiHeroBackgroundProps) {
  return (
    <div data-testid="ascii-hero-background" aria-hidden="true">
      {ASCII_BACKGROUND_ROWS.map((text, index) =>
        !reducedMotion && isAnimatedAsciiBackgroundRow(index) ? (
          <AnimatedBackgroundRow key={index} index={index} text={text} />
        ) : (
          <StaticBackgroundRow key={index} index={index} text={text} />
        ),
      )}
    </div>
  );
}
