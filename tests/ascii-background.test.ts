import { describe, expect, it } from "vitest";
import {
  ASCII_BACKGROUND_ANIMATED_ROWS,
  ASCII_BACKGROUND_ROWS,
  isAnimatedAsciiBackgroundRow,
} from "@/content/ascii-background";

describe("ASCII hero background content", () => {
  it("builds a deterministic branded field with only three live rows", () => {
    expect(ASCII_BACKGROUND_ROWS).toHaveLength(12);
    expect(ASCII_BACKGROUND_ROWS.every((row) => row.length === 96)).toBe(true);
    expect(ASCII_BACKGROUND_ROWS.join("\n")).toContain(
      "aattica. // human-made.",
    );
    expect(ASCII_BACKGROUND_ANIMATED_ROWS).toEqual([1, 5, 9]);
    expect(ASCII_BACKGROUND_ROWS.map((_, index) =>
      isAnimatedAsciiBackgroundRow(index),
    ).filter(Boolean)).toHaveLength(3);
  });
});
