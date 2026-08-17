# Dense ASCII Hero Texture Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fill the complete hero with a dense 48-row abstract ASCII texture while retaining readable brand fragments and replacing the duplicated eyebrow with `ux/ui designer`.

**Architecture:** Derive a deterministic 48-row display model from the existing 12 source rows, with three display positions mapped to the existing motion timing indices `[1, 5, 9]`. Render every row as a centered two-segment horizontal track; only one segment in three selected rows receives `use-scramble`. CSS controls density, coverage, masking, and responsive sizing without changing the approved bear or wordmark components.

**Tech Stack:** Next.js 16, React 19, TypeScript, `use-scramble` 2.2.15, CSS transforms/masks, Vitest, Testing Library.

## Global Constraints

- Render exactly 48 visual background rows derived deterministically from the existing 12 source rows.
- Render exactly two horizontal text segments per visual row so tracks extend beyond both hero edges.
- Keep exactly three live `use-scramble` hooks and preserve timing indices `[1, 5, 9]`, replay cadence, hidden-document guard, and live reduced-motion behavior.
- Use `clamp(18px, 1.6vw, 26px)` on desktop and approximately `0.8` line-height.
- Keep background low contrast and slower than the bear, but do not fade either screen edge to complete invisibility.
- Keep the bear animation and main `aattica. // human-made.` wordmark unchanged.
- Change only the eyebrow copy to `ux/ui designer`; existing uppercase styling may display `UX/UI DESIGNER`.
- Desktop and mobile must have no horizontal page overflow.

---

## File Structure

- Modify `content/ascii-background.ts`: add the deterministic 48-row display model and motion-position mapping.
- Modify `components/home/ascii-hero-background.tsx`: render two-segment tracks and use motion timing indices independently of display positions.
- Modify `tests/ascii-background.test.ts`: verify 48-row derivation and exactly three motion rows.
- Modify `tests/ascii-hero-background.test.tsx`: verify 48 tracks, 96 segments, three live hooks, timing, and reduced motion.
- Modify `app/globals.css`: dense typography, centered full-width tracks, nonzero edge mask, and mobile sizing.
- Modify `content/home.ts`: change eyebrow content to `ux/ui designer`.
- Modify `tests/home-page.test.tsx`: verify new eyebrow and absence of duplicated top branding.

---

### Task 1: Dense display model and repeated row tracks

**Files:**
- Modify: `content/ascii-background.ts`
- Modify: `components/home/ascii-hero-background.tsx`
- Modify: `tests/ascii-background.test.ts`
- Modify: `tests/ascii-hero-background.test.tsx`

**Interfaces:**
- Produces: `AsciiBackgroundDisplayRow = { id: number; text: string; motionIndex: 1 | 5 | 9 | null }`
- Produces: `ASCII_BACKGROUND_DISPLAY_ROWS: readonly AsciiBackgroundDisplayRow[]`
- Consumes: existing `ASCII_BACKGROUND_ROWS`, `useScramble`, and live reduced-motion subscription.
- DOM contract: 48 `[data-background-row]` tracks, 96 `[data-background-segment]` spans, and exactly three `[data-animated="true"]` segments.

- [ ] **Step 1: Write failing display-model tests**

Replace the old animated-index assertion with literal display-model expectations:

```ts
expect(ASCII_BACKGROUND_DISPLAY_ROWS).toHaveLength(48);
expect(
  ASCII_BACKGROUND_DISPLAY_ROWS.map((row) => row.text),
).toEqual(Array.from({ length: 48 }, (_, index) =>
  ASCII_BACKGROUND_ROWS[index % ASCII_BACKGROUND_ROWS.length],
));
expect(
  ASCII_BACKGROUND_DISPLAY_ROWS
    .filter((row) => row.motionIndex !== null)
    .map((row) => [row.id, row.motionIndex]),
).toEqual([
  [8, 1],
  [24, 5],
  [40, 9],
]);
```

- [ ] **Step 2: Write failing component-density tests**

Update the normal-motion component test:

```ts
expect(document.querySelectorAll("[data-background-row]")).toHaveLength(48);
expect(document.querySelectorAll("[data-background-segment]")).toHaveLength(96);
expect(document.querySelectorAll('[data-animated="true"]')).toHaveLength(3);
expect(scrambleHarness.records).toHaveLength(3);
```

Update reduced-motion tests to expect 48 tracks, 96 static segments, zero animated segments, and zero hook records. Keep the dynamic preference-change test and assert that its 48 tracks remain mounted after animated children are replaced.

- [ ] **Step 3: Run focused tests and verify RED**

Run:

```bash
pnpm test -- tests/ascii-background.test.ts tests/ascii-hero-background.test.tsx
```

Expected: FAIL because `ASCII_BACKGROUND_DISPLAY_ROWS` is missing and the component still renders 12 single-segment rows.

- [ ] **Step 4: Implement the deterministic display model**

Add:

```ts
export type AsciiBackgroundDisplayRow = {
  id: number;
  text: string;
  motionIndex: 1 | 5 | 9 | null;
};

const MOTION_BY_DISPLAY_ROW = new Map<number, 1 | 5 | 9>([
  [8, 1],
  [24, 5],
  [40, 9],
]);

export const ASCII_BACKGROUND_DISPLAY_ROWS = Array.from(
  { length: 48 },
  (_, id): AsciiBackgroundDisplayRow => ({
    id,
    text: ASCII_BACKGROUND_ROWS[id % ASCII_BACKGROUND_ROWS.length],
    motionIndex: MOTION_BY_DISPLAY_ROW.get(id) ?? null,
  }),
);
```

Remove `ASCII_BACKGROUND_ANIMATED_ROWS` and `isAnimatedAsciiBackgroundRow` after all consumers move to the display model.

- [ ] **Step 5: Render centered two-segment tracks**

Change row props to accept `motionIndex` separately from display `id`. Static rows render two identical spans:

```tsx
<span data-background-row data-row-id={id}>
  <span data-background-segment>{text}</span>
  <span data-background-segment>{text}</span>
</span>
```

Animated rows keep the same outer track. Apply the `useScramble` ref and `data-animated="true"` only to the first segment; render the second segment as static text. Use `motionIndex` in the existing delay formulae so timing remains `1200 + motionIndex * 320` and `8000 + motionIndex * 420`.

Map `ASCII_BACKGROUND_DISPLAY_ROWS`; use an animated row only when `!shouldReduceMotion && row.motionIndex !== null`.

- [ ] **Step 6: Run focused tests and verify GREEN**

Run:

```bash
pnpm test -- tests/ascii-background.test.ts tests/ascii-hero-background.test.tsx
```

Expected: all display, timing, hidden-document, and reduced-motion tests pass.

- [ ] **Step 7: Commit the dense rendering unit**

```bash
git add content/ascii-background.ts components/home/ascii-hero-background.tsx tests/ascii-background.test.ts tests/ascii-hero-background.test.tsx
git commit -m "feat: render a dense repeated ASCII field"
```

---

### Task 2: Full-hero density, edge coverage, and eyebrow copy

**Files:**
- Modify: `app/globals.css`
- Modify: `content/home.ts`
- Modify: `tests/home-page.test.tsx`

**Interfaces:**
- Consumes: 48 two-segment tracks from Task 1.
- Produces: visible eyebrow `UX/UI DESIGNER` through content value `ux/ui designer` and existing uppercase CSS.
- Preserves: existing bear and main wordmark DOM/CSS contracts.

- [ ] **Step 1: Write the failing eyebrow test**

Add:

```ts
it("uses the role label instead of repeating the main hero wordmark", () => {
  render(<HomePage />);

  expect(screen.getByText("ux/ui designer")).toBeInTheDocument();
  expect(screen.queryByText("aattica. / human-made.")).not.toBeInTheDocument();
  expect(
    screen.getByLabelText("aattica. // human-made."),
  ).toBeInTheDocument();
});
```

- [ ] **Step 2: Run the page test and verify RED**

Run: `pnpm test -- tests/home-page.test.tsx`

Expected: FAIL because the eyebrow still contains `aattica. / human-made.`.

- [ ] **Step 3: Update the eyebrow content**

Change only:

```ts
hero: {
  eyebrow: "ux/ui designer",
  scrollLabel: "Scroll to meet me",
},
```

- [ ] **Step 4: Replace sparse field layout CSS**

Keep the outer absolute positioning and slow drift. Apply:

```css
.ascii-hero-background {
  inset: -10% -6%;
  font-size: clamp(18px, 1.6vw, 26px);
  line-height: 0.8;
  mask-image: radial-gradient(
    ellipse at center,
    #000 10%,
    rgb(0 0 0 / 48%) 76%,
    rgb(0 0 0 / 18%) 100%
  );
  -webkit-mask-image: radial-gradient(
    ellipse at center,
    #000 10%,
    rgb(0 0 0 / 48%) 76%,
    rgb(0 0 0 / 18%) 100%
  );
}

.ascii-hero-background [data-testid="ascii-hero-background"] {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.ascii-hero-background [data-background-row] {
  position: relative;
  left: 50%;
  display: flex;
  width: max-content;
  flex: 0 0 0.8em;
  white-space: pre;
  transform: translateX(calc(-50% + var(--row-shift)));
}

.ascii-hero-background [data-background-segment] {
  flex: none;
}
```

Set `--row-shift: -2vw` on odd rows and `2vw` on even rows. Remove the old single-row `translateX(-4%)` / `translateX(4%)` rules.

Inside the existing `max-width: 720px` media query set background `font-size: clamp(20px, 5.4vw, 23px)` and keep line-height `0.8` so 48 rows cover mobile height.

- [ ] **Step 5: Run focused tests and verify GREEN**

Run:

```bash
pnpm test -- tests/home-page.test.tsx tests/ascii-hero-background.test.tsx tests/ascii-background.test.ts
```

Expected: all focused tests pass; bear and wordmark tests remain unchanged.

- [ ] **Step 6: Browser verification**

At 1440×900 and 390×844 verify:

- 48 tracks and 96 text segments are present;
- text pixels extend across both left and right halves and from near the top to near the bottom of the hero;
- brand fragments remain recognizable within the abstract field;
- no horizontal document overflow;
- eyebrow reads `UX/UI DESIGNER` visually;
- bear and main wordmark bounds remain unchanged from the approved layout;
- console has zero errors and warnings.

- [ ] **Step 7: Run the full verification gate**

Run:

```bash
pnpm test
pnpm lint
pnpm build
git diff --check
```

Expected: zero failed tests, zero lint errors, successful static production build, and no whitespace errors.

- [ ] **Step 8: Commit the integrated texture**

```bash
git add app/globals.css content/home.ts tests/home-page.test.tsx
git commit -m "feat: fill the hero with dense ASCII texture"
```
