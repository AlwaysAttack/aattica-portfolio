import { act, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { AsciiHeroMark } from "@/components/home/ascii-hero-mark";
import { ASCII_BEAR, ASCII_GLYPH_PALETTE } from "@/content/ascii-bear";
import {
  ASCII_REGION_NAMES,
  buildAsciiRegionBlocks,
} from "@/lib/ascii-regions";

type ScrambleOptions = {
  text?: string;
  playOnMount?: boolean;
  ignore?: string[];
  range?: number[];
  overdrive?: boolean | number;
  overflow?: boolean;
  speed?: number;
  tick?: number;
  step?: number;
  onAnimationStart?: () => void;
  onAnimationFrame?: (result: string) => void;
  onAnimationEnd?: () => void;
};

const scrambleHarness = vi.hoisted(() => ({
  records: new Map<
    string,
    {
      options: ScrambleOptions;
      ref: { current: HTMLElement | null };
      replay: ReturnType<typeof vi.fn>;
    }
  >(),
}));

vi.mock("use-scramble", () => ({
  useScramble: (options: ScrambleOptions) => {
    const key = options.text ?? "";
    const existing = scrambleHarness.records.get(key);

    if (existing) {
      existing.options = options;
      return existing;
    }

    const record = {
      options,
      ref: { current: null },
      replay: vi.fn(),
    };
    scrambleHarness.records.set(key, record);
    return record;
  },
}));

function installMatchMedia() {
  Object.defineProperty(window, "matchMedia", {
    configurable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
}

describe("AsciiHeroMark", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    sessionStorage.clear();
    scrambleHarness.records.clear();
    installMatchMedia();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("configures five raster-free scramble layers from the approved palette", async () => {
    render(<AsciiHeroMark reducedMotion={false} />);

    await act(async () => {});

    expect(screen.getByText("aattica bear mark")).toBeInTheDocument();
    expect(
      screen.queryByRole("img", { name: "aattica bear mark" }),
    ).not.toBeInTheDocument();
    expect(screen.getAllByTestId("ascii-scramble-layer")).toHaveLength(5);
    expect(scrambleHarness.records.size).toBe(5);

    const expectedRange = [...ASCII_GLYPH_PALETTE].map((glyph) =>
      glyph.codePointAt(0),
    );
    for (const { options } of scrambleHarness.records.values()) {
      expect(options.playOnMount).toBe(false);
      expect(options.ignore).toEqual([" ", "\n"]);
      expect(options.range).toEqual(expectedRange);
      expect(options.overdrive).toBe(true);
      expect(options.overflow).toBe(false);
      expect(options.speed).toBe(0.65);
      expect(options.tick).toBe(1);
      expect(options.step).toBe(12);
    }

    const blocks = buildAsciiRegionBlocks(ASCII_BEAR);
    for (const region of ASCII_REGION_NAMES) {
      const block = blocks[region];
      const layer = document.querySelector(`[data-region="${region}"]`);

      expect(scrambleHarness.records.has(block.text)).toBe(true);
      expect(layer).toHaveStyle({
        "--region-x": `${block.x}ch`,
        "--region-y": `${block.y}em`,
        "--region-width": `${block.width}ch`,
        "--region-height": `${block.height}em`,
      });
    }
  });

  it("keeps every layer hidden until use-scramble draws its first frame", async () => {
    render(<AsciiHeroMark reducedMotion={false} />);
    await act(async () => {});

    for (const layer of screen.getAllByTestId("ascii-scramble-layer")) {
      expect(layer).toHaveAttribute("data-active", "false");
    }

    await act(async () => {
      for (const { options } of scrambleHarness.records.values()) {
        options.onAnimationFrame?.("scrambling");
      }
    });

    for (const layer of screen.getAllByTestId("ascii-scramble-layer")) {
      expect(layer).toHaveAttribute("data-active", "false");
    }

    await act(async () => {
      for (const { options } of scrambleHarness.records.values()) {
        options.onAnimationStart?.();
        options.onAnimationFrame?.("scrambling");
      }
    });

    for (const layer of screen.getAllByTestId("ascii-scramble-layer")) {
      expect(layer).toHaveAttribute("data-active", "true");
    }
  });

  it("stagger-replays every region and records completion", async () => {
    render(<AsciiHeroMark reducedMotion={false} />);
    await act(async () => {});

    await act(async () => {
      vi.advanceTimersByTime(720);
    });

    for (const { replay } of scrambleHarness.records.values()) {
      expect(replay).toHaveBeenCalledTimes(1);
    }

    await act(async () => {
      for (const { options } of scrambleHarness.records.values()) {
        options.onAnimationEnd?.();
      }
    });

    expect(document.querySelector(".hero-mark")).toHaveAttribute(
      "data-reveal-state",
      "animating",
    );

    await act(async () => {
      for (const { options } of scrambleHarness.records.values()) {
        options.onAnimationStart?.();
        options.onAnimationEnd?.();
      }
    });

    expect(document.querySelector(".hero-mark")).toHaveAttribute(
      "data-reveal-state",
      "complete",
    );
  });

  it("shows the exact static source when reduced motion is requested", async () => {
    render(<AsciiHeroMark reducedMotion />);

    await act(async () => {});

    expect(screen.getByTestId("ascii-bear-static").textContent).toBe(
      ASCII_BEAR,
    );

    vi.runAllTimers();
    for (const { replay } of scrambleHarness.records.values()) {
      expect(replay).not.toHaveBeenCalled();
    }
  });

  it("replays the reveal after a page reload in the same session", async () => {
    sessionStorage.setItem("aattica:ascii-intro-complete", "true");
    render(<AsciiHeroMark reducedMotion={false} />);

    await act(async () => {});

    await act(async () => {
      vi.advanceTimersByTime(720);
    });

    expect(screen.queryByTestId("ascii-bear-static")).not.toBeInTheDocument();
    for (const { replay } of scrambleHarness.records.values()) {
      expect(replay).toHaveBeenCalledTimes(1);
    }
  });
});
