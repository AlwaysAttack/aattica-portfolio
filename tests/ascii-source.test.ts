import { describe, expect, it } from "vitest";
import {
  ASCII_BEAR,
  ASCII_GRID_HEIGHT,
  ASCII_GRID_WIDTH,
} from "@/content/ascii-bear";

describe("approved ASCII source", () => {
  it("preserves the complete fixed grid", () => {
    const lines = ASCII_BEAR.split("\n");

    expect(ASCII_GRID_HEIGHT).toBe(51);
    expect(ASCII_GRID_WIDTH).toBe(108);
    expect(lines).toHaveLength(51);
    expect(lines.every((line) => [...line].length === 108)).toBe(true);
  });

  it("keeps the first non-empty line's 14 leading spaces", () => {
    const firstArtLine = ASCII_BEAR.split("\n").find((line) => line.trim());

    expect(firstArtLine?.match(/^ */u)?.[0]).toHaveLength(14);
  });
});
