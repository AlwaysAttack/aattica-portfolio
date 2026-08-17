# Animated ASCII Hero Background Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the rendered Frame 2 PNG with a native animated ASCII field and real responsive `aattica. // human-made.` HTML wordmarks.

**Architecture:** Keep the existing bear component unchanged. Generate a deterministic decorative text field in a pure content module, render it through a focused client component, and animate only three rows with `use-scramble` while CSS moves the whole field. Compose the background, bear, and real wordmarks in `HeroSection` with breakpoint-specific layout.

**Tech Stack:** Next.js 16, React 19, TypeScript, `use-scramble` 2.2.15, CSS animations, Vitest, Testing Library.

## Global Constraints

- The current five-region bear timing, overdrive settings, and replay-on-refresh behavior must not change.
- The background must continuously move more slowly and quietly than the bear.
- Only a small subset of rows may use live `use-scramble`; layout animation must use transforms and opacity.
- Desktop uses split `aattica.` and `human-made.` wordmarks around the bear.
- Mobile uses one unbroken line below the bear: `aattica. // human-made.`.
- `prefers-reduced-motion: reduce` disables background scrambling and CSS movement.
- The hero must not render `aattica-banner.png`.

---

## File Structure

- Create `content/ascii-background.ts`: deterministic row strings and indices of the three animated rows.
- Create `components/home/ascii-hero-background.tsx`: decorative field rendering, limited `use-scramble` loops, visibility pausing, and reduced-motion handling.
- Create `tests/ascii-background.test.ts`: pure-data invariants for row content and bounded animation count.
- Create `tests/ascii-hero-background.test.tsx`: component behavior for animated rows and reduced motion.
- Modify `components/home/hero-section.tsx`: remove the PNG and compose the background plus semantic wordmarks.
- Modify `app/globals.css`: field drift, opacity mask, stacking, desktop wordmarks, mobile combined line, and reduced-motion overrides.
- Modify `tests/home-page.test.tsx`: verify real wordmarks and absence of the rendered PNG.

---

### Task 1: Deterministic ASCII field content

**Files:**
- Create: `content/ascii-background.ts`
- Create: `tests/ascii-background.test.ts`

**Interfaces:**
- Produces: `ASCII_BACKGROUND_ROWS: readonly string[]`
- Produces: `ASCII_BACKGROUND_ANIMATED_ROWS: readonly number[]`
- Produces: `isAnimatedAsciiBackgroundRow(index: number): boolean`

- [ ] **Step 1: Write the failing content test**

```ts
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
```

- [ ] **Step 2: Run the test and verify RED**

Run: `pnpm test -- tests/ascii-background.test.ts`

Expected: FAIL because `@/content/ascii-background` does not exist.

- [ ] **Step 3: Implement the deterministic field**

Create twelve hand-authored 96-character rows from spaces, `.`, `/`, `:`, `-`, `+`, `@`, `0`, `L`, `i`, and repeated `aattica. // human-made.` fragments. Export the immutable animated indices and membership helper:

```ts
export const ASCII_BACKGROUND_ANIMATED_ROWS = [1, 5, 9] as const;

export function isAnimatedAsciiBackgroundRow(index: number) {
  return ASCII_BACKGROUND_ANIMATED_ROWS.some(
    (animatedIndex) => animatedIndex === index,
  );
}
```

Each row must be padded explicitly to 96 characters in the exported fixture; runtime randomness is not allowed.

- [ ] **Step 4: Run the test and verify GREEN**

Run: `pnpm test -- tests/ascii-background.test.ts`

Expected: PASS with one test.

- [ ] **Step 5: Commit the content unit**

```bash
git add content/ascii-background.ts tests/ascii-background.test.ts
git commit -m "feat: add deterministic ASCII hero field"
```

---

### Task 2: Background animation component

**Files:**
- Create: `components/home/ascii-hero-background.tsx`
- Create: `tests/ascii-hero-background.test.tsx`

**Interfaces:**
- Consumes: `ASCII_BACKGROUND_ROWS` and `isAnimatedAsciiBackgroundRow(index)` from Task 1.
- Produces: `AsciiHeroBackground({ reducedMotion?: boolean }): JSX.Element`
- Produces DOM contract: `[data-testid="ascii-hero-background"]`, one `[data-background-row]` per row, and exactly three `[data-animated="true"]` rows in normal motion.

- [ ] **Step 1: Write the failing component tests**

Mock only `use-scramble`, recording its options and replay functions. Test these observable contracts:

```ts
it("renders a decorative field and limits live scrambling to three rows", async () => {
  render(<AsciiHeroBackground reducedMotion={false} />);
  expect(screen.getByTestId("ascii-hero-background")).toHaveAttribute(
    "aria-hidden",
    "true",
  );
  expect(document.querySelectorAll("[data-background-row]")).toHaveLength(12);
  expect(document.querySelectorAll('[data-animated="true"]')).toHaveLength(3);
  expect(scrambleRecords).toHaveLength(3);
});

it("keeps every row static when reduced motion is requested", () => {
  render(<AsciiHeroBackground reducedMotion />);
  expect(document.querySelectorAll('[data-animated="true"]')).toHaveLength(0);
  expect(scrambleRecords).toHaveLength(0);
});
```

Also use fake timers to verify each animated row calls `replay` once after its staggered initial delay and again at its 8–12 second interval, while no replay occurs when `document.hidden` is `true`.

- [ ] **Step 2: Run the component tests and verify RED**

Run: `pnpm test -- tests/ascii-hero-background.test.tsx`

Expected: FAIL because `AsciiHeroBackground` does not exist.

- [ ] **Step 3: Implement static and animated row components**

Implement `StaticBackgroundRow` as a plain `<span>` and `AnimatedBackgroundRow` as a focused child containing one unconditional `useScramble` hook. Configure animated rows with:

```ts
useScramble({
  text,
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
});
```

Start each row after `1200 + index * 320` milliseconds and replay every `8000 + index * 420` milliseconds. The interval callback must return without replaying when `document.hidden` is true. Clean up the timeout and interval on unmount.

`AsciiHeroBackground` maps all twelve rows. For animated indices it renders `AnimatedBackgroundRow`; otherwise it renders `StaticBackgroundRow`. When `reducedMotion` is true, every row uses the static component.

- [ ] **Step 4: Run the component tests and verify GREEN**

Run: `pnpm test -- tests/ascii-hero-background.test.tsx`

Expected: PASS for normal motion, reduced motion, stagger, repeat, and hidden-document cases.

- [ ] **Step 5: Commit the animation unit**

```bash
git add components/home/ascii-hero-background.tsx tests/ascii-hero-background.test.tsx
git commit -m "feat: animate the ASCII hero background"
```

---

### Task 3: Hero composition and responsive wordmarks

**Files:**
- Modify: `components/home/hero-section.tsx`
- Modify: `app/globals.css`
- Modify: `tests/home-page.test.tsx`

**Interfaces:**
- Consumes: `<AsciiHeroBackground />` from Task 2 and the existing `<AsciiHeroMark />`.
- Produces: one accessible wordmark string `aattica. // human-made.` represented by separate desktop spans and a visible separator on mobile.

- [ ] **Step 1: Write the failing page test**

Add a test that names the user-visible regression:

```ts
it("renders native hero wordmarks without the Frame 2 PNG", () => {
  render(<HomePage />);

  expect(
    screen.getByLabelText("aattica. // human-made."),
  ).toBeInTheDocument();
  expect(screen.getByTestId("ascii-hero-background")).toBeInTheDocument();
  expect(
    document.querySelector('img[src*="aattica-banner.png"]'),
  ).not.toBeInTheDocument();
});
```

- [ ] **Step 2: Run the page test and verify RED**

Run: `pnpm test -- tests/home-page.test.tsx`

Expected: FAIL because the background component and labelled HTML wordmark are absent and the PNG is still rendered.

- [ ] **Step 3: Replace the PNG with native layers**

Remove the `next/image` import and `<Image className="hero__background" ... />`. Add `<AsciiHeroBackground />` before the shade and add this wordmark between the shade and bear:

```tsx
<p
  className="hero__wordmarks"
  aria-label="aattica. // human-made."
>
  <span>aattica.</span>
  <span className="hero__wordmark-separator" aria-hidden="true">
    {" // "}
  </span>
  <span>human-made.</span>
</p>
```

Keep `<AsciiHeroMark />`, the eyebrow, and the scroll cue unchanged.

- [ ] **Step 4: Add stacking, field motion, and opacity mask CSS**

Replace `.hero__background` rules with `.ascii-hero-background` and row rules. The field must be absolute, inset beyond the viewport edges, use JetBrains Mono, have `opacity` no greater than `0.16`, and apply `mask-image: radial-gradient(ellipse at center, #000 12%, transparent 78%)`. Animate only `transform` through a 36-second alternate `ascii-field-drift` keyframe.

Give each row a single-line layout, preformatted whitespace, and alternating horizontal offsets. Do not apply `filter`, `backdrop-filter`, or animated `text-shadow`.

- [ ] **Step 5: Add responsive HTML wordmark CSS**

Desktop contract:

```css
.hero__wordmarks {
  position: absolute;
  z-index: 0;
  top: 50%;
  left: clamp(32px, 7vw, 120px);
  right: clamp(32px, 7vw, 120px);
  display: flex;
  justify-content: space-between;
  margin: 0;
  transform: translateY(-50%);
  color: var(--text);
  font-size: clamp(64px, 7.6vw, 132px);
  font-weight: 700;
  letter-spacing: -0.055em;
  white-space: nowrap;
}

.hero__wordmark-separator {
  display: none;
}
```

Mobile contract inside the existing small-screen media query:

```css
.hero__wordmarks {
  top: calc(50% + clamp(166px, 45vw, 190px));
  left: 16px;
  right: 16px;
  justify-content: center;
  transform: none;
  font-size: clamp(18px, 5.9vw, 24px);
  letter-spacing: -0.045em;
}

.hero__wordmark-separator {
  display: inline;
}
```

Add reduced-motion CSS that sets `.ascii-hero-background { animation: none; }`.

- [ ] **Step 6: Run the focused tests and verify GREEN**

Run: `pnpm test -- tests/ascii-background.test.ts tests/ascii-hero-background.test.tsx tests/home-page.test.tsx tests/ascii-hero-mark.test.tsx`

Expected: all focused tests pass and the bear tests remain unchanged.

- [ ] **Step 7: Browser verification**

At 1440×900 verify split wordmarks, centered bear, subtle moving field, bear replay after refresh, and no console errors. At 390×844 verify the combined `aattica. // human-made.` line sits below the bear, has no cropped letters, and `document.documentElement.scrollWidth === document.documentElement.clientWidth`.

- [ ] **Step 8: Run the full verification gate**

Run:

```bash
pnpm test
pnpm lint
pnpm build
git diff --check
```

Expected: 0 failed tests, 0 lint errors, successful static production build, and no whitespace errors.

- [ ] **Step 9: Commit the integrated hero**

```bash
git add components/home/hero-section.tsx app/globals.css tests/home-page.test.tsx
git commit -m "feat: compose the native animated ASCII hero"
```
