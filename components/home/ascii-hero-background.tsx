"use client";

import { useEffect, useSyncExternalStore } from "react";
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

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeToReducedMotion(callback: () => void) {
  if (typeof window.matchMedia !== "function") {
    return () => {};
  }

  const mediaQuery = window.matchMedia(REDUCED_MOTION_QUERY);
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  return typeof window.matchMedia === "function"
    ? window.matchMedia(REDUCED_MOTION_QUERY).matches
    : false;
}

function getReducedMotionServerSnapshot() {
  return false;
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );
}

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
  reducedMotion,
}: AsciiHeroBackgroundProps = {}) {
  const userPrefersReducedMotion = usePrefersReducedMotion();
  const shouldReduceMotion = reducedMotion ?? userPrefersReducedMotion;

  return (
    <div data-testid="ascii-hero-background" aria-hidden="true">
      {ASCII_BACKGROUND_ROWS.map((text, index) =>
        !shouldReduceMotion && isAnimatedAsciiBackgroundRow(index) ? (
          <AnimatedBackgroundRow key={index} index={index} text={text} />
        ) : (
          <StaticBackgroundRow key={index} index={index} text={text} />
        ),
      )}
    </div>
  );
}
