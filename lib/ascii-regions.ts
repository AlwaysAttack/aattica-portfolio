import { ASCII_GRID_HEIGHT, ASCII_GRID_WIDTH } from "@/content/ascii-bear";

export const ASCII_REGION_NAMES = [
  "left",
  "right",
  "bridge",
  "face",
  "nose",
] as const;

export type AsciiRegionName = (typeof ASCII_REGION_NAMES)[number];

export type AsciiRegionBlock = {
  text: string;
  x: number;
  y: number;
  width: number;
  height: number;
};

const REGION_ANCHORS: Record<
  AsciiRegionName,
  { x: number; y: number }
> = {
  left: { x: 24, y: 18 },
  right: { x: 84, y: 18 },
  bridge: { x: 54, y: 17 },
  face: { x: 54, y: 31 },
  nose: { x: 54, y: 43 },
};

function squaredDistance(
  x: number,
  y: number,
  anchor: { x: number; y: number },
) {
  return (x - anchor.x) ** 2 + (y - anchor.y) ** 2;
}

function closestRegion(x: number, y: number): AsciiRegionName {
  return ASCII_REGION_NAMES.reduce((closest, candidate) =>
    squaredDistance(x, y, REGION_ANCHORS[candidate]) <
    squaredDistance(x, y, REGION_ANCHORS[closest])
      ? candidate
      : closest,
  );
}

export function buildAsciiRegionMasks(source: string) {
  const sourceLines = source.split("\n");

  if (
    sourceLines.length !== ASCII_GRID_HEIGHT ||
    sourceLines.some((line) => [...line].length !== ASCII_GRID_WIDTH)
  ) {
    throw new Error("ASCII source must be a fixed 51 by 108 grid");
  }

  return Object.fromEntries(
    ASCII_REGION_NAMES.map((region) => [
      region,
      sourceLines
        .map((line, y) =>
          [...line]
            .map((glyph, x) =>
              glyph !== " " && closestRegion(x, y) === region ? glyph : " ",
            )
            .join(""),
        )
        .join("\n"),
    ]),
  ) as Record<AsciiRegionName, string>;
}

export function buildAsciiRegionBlocks(source: string) {
  const masks = buildAsciiRegionMasks(source);

  return Object.fromEntries(
    ASCII_REGION_NAMES.map((region) => {
      const maskLines = masks[region].split("\n").map((line) => [...line]);
      const occupiedCells = maskLines.flatMap((line, y) =>
        line.flatMap((glyph, x) => (glyph === " " ? [] : [{ x, y }])),
      );
      const minX = Math.min(...occupiedCells.map(({ x }) => x));
      const maxX = Math.max(...occupiedCells.map(({ x }) => x));
      const minY = Math.min(...occupiedCells.map(({ y }) => y));
      const maxY = Math.max(...occupiedCells.map(({ y }) => y));
      const text = maskLines
        .slice(minY, maxY + 1)
        .map((line) => line.slice(minX, maxX + 1).join(""))
        .join("\n");

      return [
        region,
        {
          text,
          x: minX,
          y: minY,
          width: maxX - minX + 1,
          height: maxY - minY + 1,
        },
      ];
    }),
  ) as Record<AsciiRegionName, AsciiRegionBlock>;
}
