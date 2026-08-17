"use client";

import { useEffect, useSyncExternalStore } from "react";
import { useScramble } from "use-scramble";
import { ASCII_BACKGROUND_DISPLAY_ROWS } from "@/content/ascii-background";

type AsciiHeroBackgroundProps = {
  reducedMotion?: boolean;
};

type BackgroundRowProps = {
  id: number;
  motionIndex: 1 | 5 | 9;
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

function StaticBackgroundRow({ id, text }: Omit<BackgroundRowProps, "motionIndex">) {
  return (
    <span data-background-row data-row-id={id}>
      <span data-background-segment>{text}</span>
      <span data-background-segment>{text}</span>
    </span>
  );
}

function AnimatedBackgroundRow({ id, motionIndex, text }: BackgroundRowProps) {
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
    const initialDelay = 1200 + motionIndex * 320;
    const repeatDelay = 8000 + motionIndex * 420;
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
  }, [motionIndex, replay]);

  return (
    <span data-background-row data-row-id={id}>
      <span ref={ref} data-background-segment data-animated="true">
        {text}
      </span>
      <span data-background-segment>{text}</span>
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
      {ASCII_BACKGROUND_DISPLAY_ROWS.map((row) =>
        !shouldReduceMotion && row.motionIndex !== null ? (
          <AnimatedBackgroundRow
            key={row.id}
            id={row.id}
            motionIndex={row.motionIndex}
            text={row.text}
          />
        ) : (
          <StaticBackgroundRow key={row.id} id={row.id} text={row.text} />
        ),
      )}
    </div>
  );
}
