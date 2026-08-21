"use client";

import {
  type CSSProperties,
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { useScramble } from "use-scramble";
import { ASCII_BEAR, ASCII_GLYPH_PALETTE } from "@/content/ascii-bear";
import {
  ASCII_REGION_NAMES,
  type AsciiRegionName,
  buildAsciiRegionBlocks,
} from "@/lib/ascii-regions";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const REGION_DELAYS = [0, 180, 360, 540, 720] as const;
const REGION_BLOCKS = buildAsciiRegionBlocks(ASCII_BEAR);
const SCRAMBLE_IGNORE = [" ", "\n"];
const SCRAMBLE_RANGE = [...ASCII_GLYPH_PALETTE].map((glyph) =>
  glyph.codePointAt(0),
) as [number, number, ...number[]];

type RevealState = "pending" | "animating" | "complete" | "static";

type AsciiHeroMarkProps = {
  label?: string;
  reducedMotion?: boolean;
};

type ScrambleLayerProps = {
  delay: number;
  onAnimationEnd: (region: AsciiRegionName) => void;
  onAnimationStart: () => void;
  play: boolean;
  region: AsciiRegionName;
  text: string;
  x: number;
  y: number;
  width: number;
  height: number;
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

function ScrambleLayer({
  delay,
  onAnimationEnd,
  onAnimationStart,
  play,
  region,
  text,
  x,
  y,
  width,
  height,
}: ScrambleLayerProps) {
  const hasDrawnFrameRef = useRef(false);
  const replayHasStartedRef = useRef(false);
  const [hasDrawnFrame, setHasDrawnFrame] = useState(false);
  const handleAnimationEnd = useCallback(
    () => {
      if (replayHasStartedRef.current) {
        onAnimationEnd(region);
      }
    },
    [onAnimationEnd, region],
  );
  const handleAnimationFrame = useCallback(() => {
    if (replayHasStartedRef.current && !hasDrawnFrameRef.current) {
      hasDrawnFrameRef.current = true;
      setHasDrawnFrame(true);
    }
  }, []);
  const handleAnimationStart = useCallback(() => {
    replayHasStartedRef.current = true;
    onAnimationStart();
  }, [onAnimationStart]);
  const { ref, replay } = useScramble({
    text,
    playOnMount: false,
    speed: 0.65,
    tick: 1,
    step: 12,
    scramble: 5,
    seed: 12,
    chance: 1,
    range: SCRAMBLE_RANGE,
    overdrive: true,
    overflow: false,
    ignore: SCRAMBLE_IGNORE,
    onAnimationStart: handleAnimationStart,
    onAnimationFrame: handleAnimationFrame,
    onAnimationEnd: handleAnimationEnd,
  });

  useEffect(() => {
    if (!play) {
      return;
    }

    const timer = window.setTimeout(replay, delay);
    return () => window.clearTimeout(timer);
  }, [delay, play, replay]);

  return (
    <pre
      ref={ref}
      className="hero-mark__layer"
      data-region={region}
      data-active={hasDrawnFrame}
      data-testid="ascii-scramble-layer"
      style={
        {
          "--region-x": `${x}ch`,
          "--region-y": `${y}em`,
          "--region-width": `${width}ch`,
          "--region-height": `${height}em`,
        } as CSSProperties
      }
      aria-hidden="true"
    >
      {text}
    </pre>
  );
}

export function AsciiHeroMark({
  label = "aattica bear mark",
  reducedMotion,
}: AsciiHeroMarkProps = {}) {
  const userPrefersReducedMotion = usePrefersReducedMotion();
  const shouldReduceMotion = reducedMotion ?? userPrefersReducedMotion;
  const completedRegions = useRef(new Set<AsciiRegionName>());
  const [hasStarted, setHasStarted] = useState(false);
  const [revealState, setRevealState] = useState<RevealState>("pending");

  useEffect(() => {
    let isCurrent = true;

    window.queueMicrotask(() => {
      if (isCurrent) {
        setRevealState(shouldReduceMotion ? "static" : "animating");
      }
    });

    return () => {
      isCurrent = false;
    };
  }, [shouldReduceMotion]);

  const handleAnimationStart = useCallback(() => {
    setHasStarted(true);
  }, []);

  const handleAnimationEnd = useCallback((region: AsciiRegionName) => {
    completedRegions.current.add(region);

    if (completedRegions.current.size === ASCII_REGION_NAMES.length) {
      setRevealState("complete");
    }
  }, []);

  const showStatic = revealState === "static";
  const play = revealState === "animating";

  return (
    <div className="hero-mark" data-reveal-state={revealState}>
      <span className="sr-only">{label}</span>
      <div
        className="hero-mark__layers"
        data-visible={hasStarted || revealState === "complete"}
        aria-hidden="true"
      >
        {ASCII_REGION_NAMES.map((region, index) => (
          <ScrambleLayer
            key={region}
            region={region}
            text={REGION_BLOCKS[region].text}
            x={REGION_BLOCKS[region].x}
            y={REGION_BLOCKS[region].y}
            width={REGION_BLOCKS[region].width}
            height={REGION_BLOCKS[region].height}
            delay={REGION_DELAYS[index]}
            play={play}
            onAnimationStart={handleAnimationStart}
            onAnimationEnd={handleAnimationEnd}
          />
        ))}
      </div>
      {showStatic ? (
        <pre
          className="hero-mark__static"
          data-testid="ascii-bear-static"
          aria-hidden="true"
        >
          {ASCII_BEAR}
        </pre>
      ) : null}
      <noscript>
        <pre className="hero-mark__noscript" aria-hidden="true">
          {ASCII_BEAR}
        </pre>
      </noscript>
    </div>
  );
}
