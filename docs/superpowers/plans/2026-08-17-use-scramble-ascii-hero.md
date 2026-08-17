# use-scramble ASCII Hero Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the rejected whole-grid convergence renderer with five independently staggered `use-scramble` layers that resolve into the exact canonical ASCII bear.

**Architecture:** A pure region-mask helper partitions each non-space source cell into one of five deterministic semantic regions. `AsciiHeroMark` overlays five fixed-grid `<pre>` elements, gives each element to its own `useScramble` hook, and uses only the hook's `replay()` and lifecycle callbacks to coordinate the reveal.

**Tech Stack:** Next.js 16, React 19, TypeScript, `use-scramble` 2.2.15, JetBrains Mono via Fontsource, Vitest, Testing Library.

## Global Constraints

- Preserve the exact 108×51 canonical source and its original 14 leading spaces.
- Animate five regions: left contour, right contour, bridge, inner face, and nose/lower contour.
- Only `use-scramble` may generate intermediate character frames.
- Ignore spaces and newlines and draw random glyphs only from `@▓█▒08GLfi;:,.`.
- Target a 5–6 second reveal with 150–250 ms staggered region starts.
- Keep navigation interactive, support reduced motion, and skip animation after completion in the current tab session.
- Do not render a bear PNG, rectangular noise field, background, border, shadow, or fill on any scramble layer.
- Do not push implementation before user visual approval.

---

### Task 1: Deterministic semantic region masks

**Files:**
- Create: `lib/ascii-regions.ts`
- Create: `tests/ascii-regions.test.ts`
- Delete: `lib/ascii-convergence.ts`
- Delete: `tests/ascii-convergence.test.ts`

**Interfaces:**
- Consumes: `ASCII_GRID_WIDTH`, `ASCII_GRID_HEIGHT`, and `ASCII_BEAR` from `content/ascii-bear.ts`.
- Produces: `ASCII_REGION_NAMES`, `AsciiRegionName`, and `buildAsciiRegionMasks(source: string): Record<AsciiRegionName, string>`.

- [ ] **Step 1: Write the failing region-mask tests**

```ts
import { describe, expect, it } from "vitest";
import {
  ASCII_BEAR,
  ASCII_GRID_HEIGHT,
  ASCII_GRID_WIDTH,
} from "@/content/ascii-bear";
import {
  ASCII_REGION_NAMES,
  buildAsciiRegionMasks,
} from "@/lib/ascii-regions";

describe("ASCII region masks", () => {
  it("builds five fixed grids that recombine to the canonical source", () => {
    const masks = buildAsciiRegionMasks(ASCII_BEAR);
    expect(ASCII_REGION_NAMES).toHaveLength(5);

    const layers = ASCII_REGION_NAMES.map((name) => masks[name]);
    for (const layer of layers) {
      const lines = layer.split("\n");
      expect(lines).toHaveLength(ASCII_GRID_HEIGHT);
      expect(lines.every((line) => [...line].length === ASCII_GRID_WIDTH)).toBe(true);
    }

    const recombined = ASCII_BEAR.split("\n")
      .map((_, y) =>
        Array.from({ length: ASCII_GRID_WIDTH }, (_, x) => {
          const values = layers.map((layer) => layer.split("\n")[y][x]);
          expect(values.filter((value) => value !== " ")).toHaveLength(
            ASCII_BEAR.split("\n")[y][x] === " " ? 0 : 1,
          );
          return values.find((value) => value !== " ") ?? " ";
        }).join(""),
      )
      .join("\n");

    expect(recombined).toBe(ASCII_BEAR);
  });
});
```

- [ ] **Step 2: Run the focused test and confirm the missing-module failure**

Run: `pnpm vitest run tests/ascii-regions.test.ts`

Expected: FAIL because `@/lib/ascii-regions` does not exist.

- [ ] **Step 3: Implement nearest-anchor mask partitioning**

```ts
import { ASCII_GRID_HEIGHT, ASCII_GRID_WIDTH } from "@/content/ascii-bear";

export const ASCII_REGION_NAMES = [
  "left",
  "right",
  "bridge",
  "face",
  "nose",
] as const;

export type AsciiRegionName = (typeof ASCII_REGION_NAMES)[number];

const REGION_ANCHORS: Record<AsciiRegionName, { x: number; y: number }> = {
  left: { x: 24, y: 18 },
  right: { x: 84, y: 18 },
  bridge: { x: 54, y: 17 },
  face: { x: 54, y: 31 },
  nose: { x: 54, y: 43 },
};

function closestRegion(x: number, y: number): AsciiRegionName {
  return ASCII_REGION_NAMES.reduce((closest, candidate) => {
    const current = REGION_ANCHORS[closest];
    const next = REGION_ANCHORS[candidate];
    const currentDistance = (x - current.x) ** 2 + (y - current.y) ** 2;
    const nextDistance = (x - next.x) ** 2 + (y - next.y) ** 2;
    return nextDistance < currentDistance ? candidate : closest;
  }, ASCII_REGION_NAMES[0]);
}

export function buildAsciiRegionMasks(source: string) {
  const lines = source.split("\n");
  if (
    lines.length !== ASCII_GRID_HEIGHT ||
    lines.some((line) => [...line].length !== ASCII_GRID_WIDTH)
  ) {
    throw new Error("ASCII source must be a fixed 51 by 108 grid");
  }

  return Object.fromEntries(
    ASCII_REGION_NAMES.map((region) => [
      region,
      lines
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
```

- [ ] **Step 4: Delete the rejected renderer and run source plus mask tests**

Run: `pnpm vitest run tests/ascii-source.test.ts tests/ascii-regions.test.ts`

Expected: PASS with no import of `ascii-convergence` remaining outside the component test scheduled for Task 2.

### Task 2: Five use-scramble layers and session controller

**Files:**
- Modify: `package.json`
- Modify: `pnpm-lock.yaml`
- Replace: `components/home/ascii-hero-mark.tsx`
- Replace: `tests/ascii-hero-mark.test.tsx`

**Interfaces:**
- Consumes: `buildAsciiRegionMasks(ASCII_BEAR)` from Task 1 and `useScramble(props)` from `use-scramble`.
- Produces: `AsciiHeroMark({ reducedMotion?: boolean })`, five `data-region` scramble layers, one static fallback, and the session key `aattica:ascii-intro-complete`.

- [ ] **Step 1: Replace the component tests with a mocked use-scramble contract**

```ts
const scrambleCalls: Array<Record<string, unknown>> = [];
const replay = vi.fn();

vi.mock("use-scramble", () => ({
  useScramble: (options: Record<string, unknown>) => {
    scrambleCalls.push(options);
    return { ref: { current: null }, replay };
  },
}));

it("configures five fixed scramble layers from the approved palette", () => {
  render(<AsciiHeroMark reducedMotion={false} />);
  expect(screen.getAllByTestId("ascii-scramble-layer")).toHaveLength(5);
  expect(scrambleCalls).toHaveLength(5);
  for (const call of scrambleCalls) {
    expect(call.ignore).toEqual([" ", "\n"]);
    expect(call.playOnMount).toBe(false);
    expect(call.overdrive).toBe(false);
  }
});

it("shows the exact static source for reduced motion", () => {
  render(<AsciiHeroMark reducedMotion />);
  expect(screen.getByTestId("ascii-bear-static")).toHaveTextContent(ASCII_BEAR);
  expect(replay).not.toHaveBeenCalled();
});
```

- [ ] **Step 2: Run the component test and confirm it fails against the old renderer**

Run: `pnpm vitest run tests/ascii-hero-mark.test.tsx`

Expected: FAIL because `use-scramble` is not installed and the component still renders one custom frame.

- [ ] **Step 3: Install the documented library and remove the unused motion package**

Run: `pnpm add use-scramble@2.2.15 && pnpm remove motion`

Expected: `package.json` contains exact `use-scramble: "2.2.15"` and no `motion` dependency.

- [ ] **Step 4: Implement fixed layer configuration and orchestration**

Use these stable values as the first calibrated pass:

```ts
const REGION_DELAYS = [0, 180, 360, 540, 720] as const;
const SCRAMBLE_RANGE = [...ASCII_GLYPH_PALETTE].map((glyph) =>
  glyph.codePointAt(0),
) as [number, number, ...number[]];

const options = {
  text,
  playOnMount: false,
  speed: 0.55,
  tick: 2,
  step: 70,
  scramble: 5,
  seed: 12,
  chance: 1,
  range: SCRAMBLE_RANGE,
  overdrive: false,
  overflow: true,
  ignore: [" ", "\n"],
  onAnimationStart,
  onAnimationEnd,
};
```

Render five `ScrambleLayer` children unconditionally so hook order stays fixed. Each child schedules only its documented `replay()` call when `play` becomes true. The parent checks reduced motion and `sessionStorage` after mount, hides the complete mark until the first `onAnimationStart`, and stores the session flag after all five `onAnimationEnd` callbacks have fired.

- [ ] **Step 5: Run component, mask, and home integration tests**

Run: `pnpm vitest run tests/ascii-regions.test.ts tests/ascii-hero-mark.test.tsx tests/home-page.test.tsx`

Expected: PASS; no bear image; five region layers; exact static fallback.

### Task 3: Layer styling, tuning, and full verification

**Files:**
- Modify: `app/globals.css`
- Modify: `tests/home-page.test.tsx` if the layer markup requires a more precise query
- Modify: `README.md` only after user visual approval

**Interfaces:**
- Consumes: `.hero-mark`, `.hero-mark__layers`, `.hero-mark__layer`, and `.hero-mark__static` markup from Task 2.
- Produces: identical layer geometry at desktop and mobile, plus a visually reviewed local preview.

- [ ] **Step 1: Replace single-frame styles with identical overlaid layers**

```css
.hero-mark__layers,
.hero-mark__static,
.hero-mark__noscript {
  grid-area: 1 / 1;
  width: 108ch;
}

.hero-mark__layers {
  position: relative;
  height: 51em;
}

.hero-mark__layer {
  position: absolute;
  inset: 0;
  width: 108ch;
  margin: 0;
  overflow: visible;
  color: inherit;
  font: inherit;
  line-height: 1;
  white-space: pre;
  background: none;
  border: 0;
}
```

Use one shared opacity on `.hero-mark__layers`; do not animate individual layer position, scale, or opacity.

- [ ] **Step 2: Run all automated verification**

Run: `pnpm test && pnpm lint && pnpm build && git diff --check`

Expected: all tests pass, lint has no findings, production build succeeds, and the diff has no whitespace errors.

- [ ] **Step 3: Inspect desktop timing and tune only hook parameters**

Open a fresh session at 1440×900. Capture the early scramble, overlapping regional reveal, and final frame. If duration is outside 5–6 seconds, adjust only `speed`, `tick`, `step`, `scramble`, `seed`, or the five delays; do not add a custom frame renderer.

- [ ] **Step 4: Inspect mobile geometry and interaction**

Open a fresh session at 390×844. Confirm the 108×51 group fits without clipping, the five layers share identical bounds, About remains clickable during the reveal, and the console contains no errors.

- [ ] **Step 5: Stop for user visual approval**

Leave the working local preview open. Do not update `README.md`, commit implementation, or push until the user approves the visual result.
