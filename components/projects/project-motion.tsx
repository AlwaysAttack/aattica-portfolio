"use client";

import {
  type ReactNode,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { useScramble } from "use-scramble";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const SCRAMBLE_RANGE = [35, 36, 37, 42, 43, 45, 46, 47, 58, 60, 61, 62, 64] as [
  number,
  number,
  ...number[],
];

type MotionProps = {
  reducedMotion?: boolean;
};

type ProjectRevealProps = MotionProps & {
  children: ReactNode;
  className?: string;
};

type ProjectScrambleTextProps = MotionProps & {
  text: string;
};

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

function usePrefersReducedMotion() {
  return useSyncExternalStore(subscribeToReducedMotion, getReducedMotionSnapshot, () => false);
}

export function ProjectReveal({ children, className, reducedMotion }: ProjectRevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const userPrefersReducedMotion = usePrefersReducedMotion();
  const shouldReduceMotion = reducedMotion ?? userPrefersReducedMotion;
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const element = elementRef.current;

    if (shouldReduceMotion || !element || typeof IntersectionObserver === "undefined") {
      setReady(true);
      setVisible(true);
      return;
    }

    setReady(true);
    setVisible(false);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return;
        }

        setVisible(true);
        observer.disconnect();
      },
      { rootMargin: "0px 0px -10%", threshold: 0.08 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [shouldReduceMotion]);

  return (
    <div
      ref={elementRef}
      className={["project-reveal", className].filter(Boolean).join(" ")}
      data-project-reveal
      data-reveal-ready={ready}
      data-reveal-visible={visible}
      data-testid="project-reveal"
    >
      {children}
    </div>
  );
}

export function ProjectScrambleText({ text, reducedMotion }: ProjectScrambleTextProps) {
  const userPrefersReducedMotion = usePrefersReducedMotion();
  const shouldReduceMotion = reducedMotion ?? userPrefersReducedMotion;
  const { ref, replay } = useScramble({
    text,
    playOnMount: false,
    speed: 0.55,
    tick: 1,
    step: 2,
    scramble: 2,
    seed: 3,
    chance: 0.75,
    range: SCRAMBLE_RANGE,
    overdrive: false,
    overflow: false,
    ignore: [" "],
  });
  const replayRef = useRef(replay);

  useEffect(() => {
    replayRef.current = replay;
  }, [replay]);

  useEffect(() => {
    if (!shouldReduceMotion) {
      replayRef.current();
    }
  }, [shouldReduceMotion, text]);

  return (
    <span ref={ref} aria-label={text}>
      {text}
    </span>
  );
}
