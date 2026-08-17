# Distributed ASCII Hero Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the approved 6.8-second distributed-convergence ASCII reveal on every viewport from 320 px upward, with exact JetBrains Mono metrics and no raster bear layer.

**Architecture:** A validated fixed-grid source module owns the exact 51 × 108 art. A pure deterministic renderer generates complete text frames for four time phases without moving cells, and one client component throttles text-node updates while Motion handles opacity. The server and client share the same initial-noise frame; a `noscript` layer supplies the exact final art when JavaScript is unavailable.

**Tech Stack:** Next.js 16.3.1, React 19.2.8, TypeScript 6.0.3, Motion 12.43.0, `@fontsource/jetbrains-mono` 5.3.0, Vitest, React Testing Library, CSS.

## Global Constraints

- The reveal duration is exactly 6800 ms.
- The fixed source grid is exactly 51 lines × 108 cells, including all padding and the first non-empty line's 14 leading spaces.
- JetBrains Mono Regular 400 is self-hosted; `liga` and `calt` are disabled.
- `Frame 1.png`, opaque bear images, and image-to-text crossfades are absent from the rendered hero.
- Initial noise can occupy final-empty cells and must not expose the bear silhouette.
- Cell coordinates and line geometry never move; only characters and layer opacity change.
- Desktop text updates at 100 ms intervals; mobile text updates at 125 ms intervals.
- The same reveal runs at every viewport width from 320 px upward.
- Reduced-motion and repeated-session states show the completed source without scrambling.
- Navigation and scrolling remain interactive for the full sequence.

---

### Task 1: Remove the rejected experiment and restore the exact source contract

**Files:**
- Restore: `components/home/hero-section.tsx`
- Restore: `app/globals.css`
- Restore: `tests/home-page.test.tsx`
- Delete: `components/home/ascii-hero-mark.tsx`
- Delete: `content/ascii-bear.ts`
- Delete: `lib/ascii-reveal.ts`
- Delete: `tests/ascii-hero-mark.test.tsx`
- Delete: `tests/ascii-reveal.test.ts`
- Create: `content/ascii-bear.ts`
- Create: `tests/ascii-source.test.ts`

**Interfaces:**
- Consumes: the attachment source documented in `docs/ascii-art-reference.md`.
- Produces: `ASCII_GRID_WIDTH = 108`, `ASCII_GRID_HEIGHT = 51`, `ASCII_GLYPH_PALETTE`, and `ASCII_BEAR` with exact padded line geometry.

- [ ] **Step 1: Remove the rejected implementation and return the tracked home files to the static checkpoint**

Delete the uncommitted experimental component, renderer, copied source, and tests. Restore the tracked Hero, CSS bear rules, and home-page test to commit `0cc779d` behavior while leaving the approved docs commit and Motion dependency untouched.

- [ ] **Step 2: Write the failing exact-source test**

Create `tests/ascii-source.test.ts` with literal expectations:

```ts
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
```

- [ ] **Step 3: Run the test and verify RED**

Run `pnpm test tests/ascii-source.test.ts`. Expected: import failure because the replacement exact-source module does not exist.

- [ ] **Step 4: Create the exact padded source module**

Represent the 51 original lines as leading-space-preserving string literals and call `padEnd(108, " ")` on each literal before joining with `\n`. Validate every unpadded line is at most 108 cells; never call `trim()` on the complete art.

- [ ] **Step 5: Run the source test and verify GREEN**

Run `pnpm test tests/ascii-source.test.ts`. Expected: both geometry tests pass.

---

### Task 2: Pure distributed-convergence renderer

**Files:**
- Create: `lib/ascii-convergence.ts`
- Create: `tests/ascii-convergence.test.ts`

**Interfaces:**
- Consumes: `ASCII_BEAR`, `ASCII_GRID_WIDTH`, `ASCII_GRID_HEIGHT`, and `ASCII_GLYPH_PALETTE`.
- Produces: `CONVERGENCE_DURATION_MS = 6800`, `getTextFrameInterval(viewportWidth: number): 100 | 125`, and `buildConvergenceFrame(source: string, elapsedMs: number, frame: number): string`.

- [ ] **Step 1: Write failing renderer behavior tests**

Cover these independent mutations:

```ts
expect(getTextFrameInterval(1440)).toBe(100);
expect(getTextFrameInterval(390)).toBe(125);
expect(buildConvergenceFrame(ASCII_BEAR, 6800, 68)).toBe(ASCII_BEAR);
```

Also assert that the `0 ms` frame contains an approved glyph in a cell that is empty in the final source, no target-filled cell is already locked at `0 ms`, every frame retains 51 lines of 108 cells, and the number of correctly matched target cells increases from `2000 ms` to `4600 ms` to `6200 ms`.

- [ ] **Step 2: Run renderer tests and verify RED**

Run `pnpm test tests/ascii-convergence.test.ts`. Expected: import failure because `lib/ascii-convergence.ts` does not exist.

- [ ] **Step 3: Implement the four deterministic phases**

Use coordinate hashing rather than `Math.random()`. At `0–1400 ms`, populate sparse whole-grid noise and deliberately avoid matching target-filled cells. At `1400–4600 ms`, lock cells using regional anchor times for nose, ears, bridge, side planes, and contour. At `4600–6200 ms`, increase target correctness and reduce empty-cell noise. At `6200–6800 ms`, remove remaining noise and return the source exactly at 6800 ms.

- [ ] **Step 4: Run renderer tests and verify GREEN**

Run `pnpm test tests/ascii-source.test.ts tests/ascii-convergence.test.ts`. Expected: all source and phase contracts pass.

---

### Task 3: Accessible session-aware animation controller

**Files:**
- Create: `components/home/ascii-hero-mark.tsx`
- Create: `tests/ascii-hero-mark.test.tsx`

**Interfaces:**
- Consumes: `ASCII_BEAR`, `buildConvergenceFrame`, `CONVERGENCE_DURATION_MS`, `getTextFrameInterval`, `motion`, and `useReducedMotion`.
- Produces: `AsciiHeroMark`, which renders one animated `<pre>`, one reduced-motion final `<pre>`, an accessible text label, and a `noscript` final `<pre>` without any image element.

- [ ] **Step 1: Write failing component tests**

With controlled animation frames and a real DOM, assert that the component exposes `aattica bear mark` as accessible text, renders no image with that name, starts from the deterministic non-final noise frame, shows exact final art when `reducedMotion` is true, and stores `aattica:ascii-intro-complete` after 6800 ms of visible animation.

- [ ] **Step 2: Run component tests and verify RED**

Run `pnpm test tests/ascii-hero-mark.test.tsx`. Expected: import failure because `AsciiHeroMark` does not exist.

- [ ] **Step 3: Implement the minimal controller**

Initialize from `buildConvergenceFrame(ASCII_BEAR, 0, 0)` so server and client markup match. Keep opacity at zero until the first client decision. For new sessions, update the single text node at the interval returned by `getTextFrameInterval`; for reduced motion or a completed session, set the exact final frame before fading in. Pause active elapsed time while an `IntersectionObserver` reports the mark outside the viewport, and cancel all scheduled work on unmount.

- [ ] **Step 4: Run component tests and verify GREEN**

Run `pnpm test tests/ascii-hero-mark.test.tsx tests/ascii-convergence.test.ts`. Expected: component and renderer tests pass without timer leaks or console warnings.

---

### Task 4: JetBrains Mono and responsive Hero integration

**Files:**
- Modify: `package.json`
- Modify: `pnpm-lock.yaml`
- Modify: `app/layout.tsx`
- Modify: `components/home/hero-section.tsx`
- Modify: `app/globals.css`
- Modify: `tests/home-page.test.tsx`

**Interfaces:**
- Consumes: `AsciiHeroMark` and Fontsource's `@fontsource/jetbrains-mono/400.css`.
- Produces: a raster-free Hero with a fixed 108ch grid, JetBrains Mono metrics, responsive scaling from 320 px, and unchanged anchor navigation.

- [ ] **Step 1: Add a failing home integration contract**

Change the bear test to assert accessible text named `aattica bear mark`, the decorative fixed-grid `<pre>`, and the absence of an image named `aattica bear mark`.

- [ ] **Step 2: Run the home test and verify RED**

Run `pnpm test tests/home-page.test.tsx`. Expected: the new raster-free contract fails against the static image Hero.

- [ ] **Step 3: Install and import the exact font package**

Run `pnpm add @fontsource/jetbrains-mono@5.3.0 --save-exact`, then import `@fontsource/jetbrains-mono/400.css` once from `app/layout.tsx`.

- [ ] **Step 4: Integrate and style the fixed grid**

Replace the bear `<Image>` with `AsciiHeroMark`. Set `font-family: "JetBrains Mono", monospace`, weight 400, `font-variant-ligatures: none`, `font-feature-settings: "liga" 0, "calt" 0`, `white-space: pre`, and `width: 108ch`. Center the complete block and scale only through font size: desktop `clamp(5px, 0.58vw, 8.4px)` and mobile `clamp(4.35px, 1.36vw, 5.6px)`. Do not hide the live grid at any supported viewport.

- [ ] **Step 5: Verify automated integration**

Run `pnpm test`, `pnpm lint`, and `pnpm build`. Expected: all tests pass, lint has zero findings, and `/` remains statically prerendered.

- [ ] **Step 6: Perform visual review and stop before publication**

Inspect new-session frames near 0.5 s, 2.5 s, 5.2 s, and 6.8 s at 1440 × 900 and 390 × 844; verify no black square, no font swap, no line drift, usable navigation during motion, reduced-motion final state, and an empty browser error log. Leave the reviewed page open for the user and do not push implementation until approval.

---

### Task 5: Publish the approved animation checkpoint

**Files:**
- Modify: `README.md`

**Interfaces:**
- Consumes: user approval of Task 4's visual checkpoint.
- Produces: documented, committed, and pushed `main` state.

- [ ] **Step 1: Document the distributed-convergence behavior**

Record the 6.8-second desktop/mobile reveal, reduced-motion behavior, exact fixed grid, and remaining deferred scope.

- [ ] **Step 2: Run final verification**

Run `pnpm test && pnpm lint && pnpm build`, `git diff --check`, and confirm draft resume files remain ignored.

- [ ] **Step 3: Commit and push after visual approval**

Commit with `feat: build distributed ASCII convergence` and push `main` only after the user approves the rendered result.
