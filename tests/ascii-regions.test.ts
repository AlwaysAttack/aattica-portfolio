import { describe, expect, it } from "vitest";
import {
  ASCII_BEAR,
  ASCII_GRID_HEIGHT,
  ASCII_GRID_WIDTH,
} from "@/content/ascii-bear";
import {
  ASCII_REGION_NAMES,
  buildAsciiRegionBlocks,
  buildAsciiRegionMasks,
} from "@/lib/ascii-regions";

function lines(value: string) {
  return value.split("\n");
}

describe("ASCII region masks", () => {
  it("builds five fixed grids that recombine to the canonical source", () => {
    const masks = buildAsciiRegionMasks(ASCII_BEAR);
    const layers = ASCII_REGION_NAMES.map((name) => masks[name]);

    expect(ASCII_REGION_NAMES).toHaveLength(5);

    for (const layer of layers) {
      const layerLines = lines(layer);
      expect(layerLines).toHaveLength(ASCII_GRID_HEIGHT);
      expect(
        layerLines.every(
          (line) => [...line].length === ASCII_GRID_WIDTH,
        ),
      ).toBe(true);
    }

    const sourceLines = lines(ASCII_BEAR);
    const layerLines = layers.map(lines);
    const recombined = sourceLines
      .map((sourceLine, y) =>
        [...sourceLine]
          .map((sourceGlyph, x) => {
            const values = layerLines.map((layer) => layer[y][x]);
            expect(values.filter((value) => value !== " ")).toHaveLength(
              sourceGlyph === " " ? 0 : 1,
            );
            return values.find((value) => value !== " ") ?? " ";
          })
          .join(""),
      )
      .join("\n");

    expect(recombined).toBe(ASCII_BEAR);
  });

  it("rejects sources that do not match the fixed grid", () => {
    expect(() => buildAsciiRegionMasks("small")).toThrow(
      "ASCII source must be a fixed 51 by 108 grid",
    );
  });

  it("crops every region to a positioned block without changing the art", () => {
    const blocks = buildAsciiRegionBlocks(ASCII_BEAR);
    const reconstructed = Array.from({ length: ASCII_GRID_HEIGHT }, () =>
      Array.from({ length: ASCII_GRID_WIDTH }, () => " "),
    );

    for (const name of ASCII_REGION_NAMES) {
      const block = blocks[name];
      const blockLines = block.text.split("\n");

      expect(block.width).toBeGreaterThan(0);
      expect(block.height).toBeGreaterThan(0);
      expect(blockLines).toHaveLength(block.height);
      expect(blockLines.every((line) => [...line].length === block.width)).toBe(
        true,
      );

      blockLines.forEach((line, localY) => {
        [...line].forEach((glyph, localX) => {
          if (glyph !== " ") {
            reconstructed[block.y + localY][block.x + localX] = glyph;
          }
        });
      });
    }

    expect(reconstructed.map((row) => row.join("")).join("\n")).toBe(
      ASCII_BEAR,
    );
  });
});
