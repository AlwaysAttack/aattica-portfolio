# use-scramble ASCII Hero Design

**Date:** 2026-08-17  
**Status:** Approved direction, awaiting written-spec review  
**Supersedes:** The custom distributed-convergence animation described in `2026-08-17-portfolio-opening-and-home-design.md`

## Goal

Animate the exact 108×51 ASCII bear with the characteristic `use-scramble` text effect. Several semantic areas of the mark should resolve independently, while the grid, line breaks, typography, and final source remain fixed.

The effect must read as characters scrambling into the finished artwork. It must not look like a rectangular field of noise, a raster image converted into text, or a moving/deforming picture.

## Approved visual behavior

- The mark remains a fixed 108-column by 51-row `<pre>` grid in JetBrains Mono Regular.
- Five transparent full-grid layers occupy the same position:
  1. left ear and left outer contour;
  2. right ear and right outer contour;
  3. upper bridge and central forehead;
  4. inner face and cheeks;
  5. nose, mouth, and lower contour.
- Each layer is animated by its own `useScramble` hook.
- Layer starts are staggered by approximately 150–250 ms. The total reveal should complete in approximately 5–6 seconds.
- Random glyphs appear only at cells that contain a non-space glyph in the final layer mask. Empty cells remain empty throughout the animation.
- Spaces and newline characters are ignored by the scrambler. No line may change width, wrap, drift, or shift vertically.
- Random characters are selected only from the artwork palette: `@▓█▒08GLfi;:,.`.
- At completion, the five layers visually combine into the exact canonical ASCII source.
- The Frame 2 banner remains the background. No bear PNG or other raster representation is rendered.

## Architecture

### Canonical source

`content/ascii-bear.ts` remains the single source of truth. It stores the exact 51 lines, pads every line to 108 cells, and exposes the glyph palette and grid dimensions.

### Region masks

A pure helper partitions every non-space source cell into exactly one of five regions. The partition uses five semantic anchor points and a deterministic nearest-anchor assignment. This produces organic boundaries without duplicating or dropping source glyphs.

The helper returns five strings. Every returned string is itself a 108×51 grid: cells assigned to that region retain the canonical glyph, while all other cells contain spaces. Newlines are identical across all masks.

Required invariants:

- every mask is 108×51;
- masks do not overlap at non-space cells;
- combining all masks reproduces the canonical source exactly;
- mask generation contains no animation and no randomness.

### Scramble layers

`AsciiHeroMark` renders five absolutely overlaid `<pre>` elements. Each element receives one mask and its own `useScramble` hook configured with:

- the mask as `text`;
- `playOnMount: false` so starts can be coordinated;
- `ignore: [" ", "\n"]` to preserve the grid;
- a Unicode `range` built from the canonical ASCII palette;
- calibrated `speed`, `tick`, `step`, `scramble`, `seed`, and `chance` values;
- `overdrive: false` to avoid inserting an unrelated underscore glyph.

Only the library may generate intermediate character frames. The removed custom frame renderer must not be retained as a fallback or mixed into the effect.

A small controller may schedule each hook's documented `replay()` function, observe completion callbacks, and set the session-complete flag. It must not generate or mutate animation frames itself.

### Timing and visibility

The first scramble frame is prepared before the layer group becomes visible, preventing a flash of the completed mark. All five hooks then run with their staggered starts. Exact parameter values may be tuned during visual QA, but the acceptance target remains a 5–6 second total reveal on both desktop and mobile.

The component pauses no page navigation. About, Projects, and Contact anchors remain usable during the reveal.

### Repeat visits and reduced motion

- When `prefers-reduced-motion: reduce` is active, show the exact static mark and do not start the hooks.
- After a reveal completes in the current tab session, store `aattica:ascii-intro-complete=true` in `sessionStorage`.
- On later page loads in the same session, show the exact static mark immediately.
- A `<noscript>` fallback contains the exact static mark.

## Styling

- `font-family: "JetBrains Mono", monospace`;
- `font-weight: 400`;
- ligatures disabled;
- fixed `line-height: 1` and `white-space: pre`;
- every layer uses the same width, font size, line height, and grid cell;
- desktop and mobile scale only the font size of the complete layer group;
- no background, border, shadow, or fill may be applied to an individual `<pre>` layer.

The mobile target remains fully visible at 390 px and must continue to fit at widths down to 320 px.

## Accessibility

- The animated layers are `aria-hidden="true"`.
- A single visually hidden label describes the graphic as `aattica bear mark`.
- The scramble effect never becomes screen-reader content.
- The library's reduced-motion behavior is supplemented by the component's explicit static path so accessibility does not depend on timing.

## Testing and acceptance

Automated tests must verify:

1. canonical source dimensions and the original 14 leading spaces are preserved;
2. five masks are produced at 108×51;
3. every canonical non-space cell belongs to exactly one mask;
4. recombining the masks reproduces the canonical source exactly;
5. `AsciiHeroMark` renders five raster-free scramble layers;
6. the palette, ignored characters, and replay scheduling are passed to `useScramble`;
7. reduced-motion and session-complete states render the exact static source;
8. the page still contains accessible navigation and the About anchor works during the reveal.

Visual QA must cover:

- 1440×900 desktop and 390×844 mobile;
- early scramble, overlapping regional reveals, and final frame;
- absence of a rectangular noise field or black square;
- no line wrapping, drift, clipping, or font substitution;
- exact final silhouette;
- no browser console errors.

## Out of scope

- Reworking the banner, navigation, About section, projects, or contact content;
- adding a replay control to the production UI;
- animating the logo with canvas, WebGL, SVG filters, raster conversion, or a second text-animation engine;
- publishing or pushing the implementation before visual approval.
