import { describe, expect, it } from "vitest";
import {
  ASCII_BACKGROUND_DISPLAY_ROWS,
  ASCII_BACKGROUND_ROWS,
} from "@/content/ascii-background";

describe("ASCII hero background content", () => {
  it("builds a deterministic branded display field with three live rows", () => {
    expect(ASCII_BACKGROUND_ROWS).toHaveLength(12);
    expect(ASCII_BACKGROUND_ROWS.every((row) => row.length === 96)).toBe(true);
    expect(ASCII_BACKGROUND_ROWS.join("\n")).toContain(
      "aattica. // human-made.",
    );
    expect(ASCII_BACKGROUND_DISPLAY_ROWS).toHaveLength(48);
    expect(ASCII_BACKGROUND_DISPLAY_ROWS.map((row) => row.text)).toEqual(
      Array.from(
        { length: 48 },
        (_, index) => ASCII_BACKGROUND_ROWS[index % ASCII_BACKGROUND_ROWS.length],
      ),
    );
    expect(
      ASCII_BACKGROUND_DISPLAY_ROWS
        .filter((row) => row.motionIndex !== null)
        .map((row) => [row.id, row.motionIndex]),
    ).toEqual([
      [8, 1],
      [24, 5],
      [40, 9],
    ]);
  });
});
