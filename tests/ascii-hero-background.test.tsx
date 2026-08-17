import { act, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { AsciiHeroBackground } from "@/components/home/ascii-hero-background";

type ScrambleOptions = {
  text: string;
  playOnMount: boolean;
  speed: number;
  tick: number;
  step: number;
  scramble: number;
  seed: number;
  chance: number;
  overdrive: boolean;
  overflow: boolean;
  ignore: string[];
};

const scrambleHarness = vi.hoisted(() => ({
  records: [] as Array<{
    options: ScrambleOptions;
    replay: ReturnType<typeof vi.fn>;
  }>,
}));

vi.mock("use-scramble", () => ({
  useScramble: (options: ScrambleOptions) => {
    const record = { options, replay: vi.fn(), ref: { current: null } };
    scrambleHarness.records.push(record);
    return record;
  },
}));

describe("AsciiHeroBackground", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    scrambleHarness.records.length = 0;
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
    vi.restoreAllMocks();
    Object.defineProperty(document, "hidden", {
      configurable: true,
      value: false,
    });
  });

  it("renders a decorative field and limits live scrambling to three rows", () => {
    render(<AsciiHeroBackground reducedMotion={false} />);

    expect(screen.getByTestId("ascii-hero-background")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
    expect(document.querySelectorAll("[data-background-row]")).toHaveLength(12);
    expect(document.querySelectorAll('[data-animated="true"]')).toHaveLength(3);
    expect(scrambleHarness.records).toHaveLength(3);
    expect(scrambleHarness.records.map((record) => record.options)).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
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
        }),
      ]),
    );
  });

  it("keeps every row static when reduced motion is requested", () => {
    render(<AsciiHeroBackground reducedMotion />);

    expect(document.querySelectorAll('[data-animated="true"]')).toHaveLength(0);
    expect(scrambleHarness.records).toHaveLength(0);
  });

  it("stagger-replays each animated row at its own initial delay and interval", () => {
    render(<AsciiHeroBackground reducedMotion={false} />);

    act(() => {
      vi.advanceTimersByTime(1200 + 1 * 320 - 1);
    });

    for (const { replay } of scrambleHarness.records) {
      expect(replay).not.toHaveBeenCalled();
    }

    act(() => {
      vi.advanceTimersByTime(1);
    });

    expect(scrambleHarness.records[0].replay).toHaveBeenCalledTimes(1);
    expect(scrambleHarness.records[1].replay).not.toHaveBeenCalled();
    expect(scrambleHarness.records[2].replay).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(1200 + 5 * 320 - (1200 + 1 * 320) - 1);
    });

    expect(scrambleHarness.records[1].replay).not.toHaveBeenCalled();
    expect(scrambleHarness.records[2].replay).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(1);
    });

    expect(scrambleHarness.records[0].replay).toHaveBeenCalledTimes(1);
    expect(scrambleHarness.records[1].replay).toHaveBeenCalledTimes(1);
    expect(scrambleHarness.records[2].replay).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(1200 + 9 * 320 - (1200 + 5 * 320) - 1);
    });

    expect(scrambleHarness.records[2].replay).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(1);
    });

    for (const { replay } of scrambleHarness.records) {
      expect(replay).toHaveBeenCalledTimes(1);
    }

    act(() => {
      vi.advanceTimersByTime(8000 + 1 * 420 - (1200 + 9 * 320) - 1);
    });

    expect(scrambleHarness.records[0].replay).toHaveBeenCalledTimes(1);
    expect(scrambleHarness.records[1].replay).toHaveBeenCalledTimes(1);
    expect(scrambleHarness.records[2].replay).toHaveBeenCalledTimes(1);

    act(() => {
      vi.advanceTimersByTime(1);
    });

    expect(scrambleHarness.records[0].replay).toHaveBeenCalledTimes(2);
    expect(scrambleHarness.records[1].replay).toHaveBeenCalledTimes(1);
    expect(scrambleHarness.records[2].replay).toHaveBeenCalledTimes(1);

    act(() => {
      vi.advanceTimersByTime(8000 + 5 * 420 - (8000 + 1 * 420) - 1);
    });

    expect(scrambleHarness.records[1].replay).toHaveBeenCalledTimes(1);

    act(() => {
      vi.advanceTimersByTime(1);
    });

    expect(scrambleHarness.records[0].replay).toHaveBeenCalledTimes(2);
    expect(scrambleHarness.records[1].replay).toHaveBeenCalledTimes(2);
    expect(scrambleHarness.records[2].replay).toHaveBeenCalledTimes(1);

    act(() => {
      vi.advanceTimersByTime(8000 + 9 * 420 - (8000 + 5 * 420) - 1);
    });

    expect(scrambleHarness.records[2].replay).toHaveBeenCalledTimes(1);

    act(() => {
      vi.advanceTimersByTime(1);
    });

    expect(scrambleHarness.records[0].replay).toHaveBeenCalledTimes(2);
    expect(scrambleHarness.records[1].replay).toHaveBeenCalledTimes(2);
    expect(scrambleHarness.records[2].replay).toHaveBeenCalledTimes(2);
  });

  it("does not replay while the document is hidden", () => {
    Object.defineProperty(document, "hidden", {
      configurable: true,
      value: true,
    });
    render(<AsciiHeroBackground reducedMotion={false} />);

    act(() => {
      vi.advanceTimersByTime(1200 + 9 * 320 + 8000 + 9 * 420);
    });

    for (const { replay } of scrambleHarness.records) {
      expect(replay).not.toHaveBeenCalled();
    }
  });
});
