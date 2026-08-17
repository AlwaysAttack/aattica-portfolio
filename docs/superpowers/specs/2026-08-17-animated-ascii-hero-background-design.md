# Animated ASCII hero background design

## Goal

Replace the static Frame 2 PNG in the hero with a native, animated ASCII background while preserving the approved central bear animation. Render the `aattica.` and `human-made.` wordmarks as real HTML text rather than pixels embedded in an image.

## Visual composition

The hero has three independent visual layers:

1. A low-contrast ASCII field made from repeated `aattica. // human-made.` fragments and a restrained set of noise glyphs.
2. The existing five-region `use-scramble` bear reveal, centered above the background.
3. Two large HTML wordmarks: `aattica.` on the left and `human-made.` on the right.

The background uses an uneven opacity mask so fragments appear and disappear across the hero instead of forming a uniformly readable wallpaper. Its motion remains slower and quieter than the bear reveal.

On desktop, the wordmarks reproduce the wide Frame 2 composition on opposite sides of the bear. On mobile, both wordmarks move below the bear and become one unbroken line: `aattica. / human-made.`. They must fit within the viewport without horizontal scrolling or cropped letters.

## Motion

The background uses a hybrid animation:

- HTML text rows provide the actual ASCII artwork.
- GPU-friendly CSS transforms create a very slow continuous drift.
- A small subset of rows periodically replays `use-scramble` to change characters without recalculating the entire field.
- Row phases and delays are staggered so the field does not pulse in unison.

The central bear keeps its current approved timing, overdrive behavior, region split, and replay-on-refresh behavior. Background motion must not delay or restart the bear.

When `prefers-reduced-motion: reduce` is active, the field is rendered statically, row replay is disabled, and the bear uses its existing static fallback.

## Component boundaries

- `HeroSection` owns stacking order and composes the background, bear, wordmarks, eyebrow, and scroll cue.
- `AsciiHeroBackground` owns deterministic row content, selective scrambling, and the reduced-motion fallback.
- `AsciiHeroMark` remains responsible only for the bear.
- The large wordmarks remain plain semantic HTML in `HeroSection`; they do not depend on the PNG or the background component.

The current `aattica-banner.png` is retained as a design reference asset but is no longer rendered by the site.

## Performance constraints

- Animate transforms and opacity, not layout properties.
- Limit live `use-scramble` rows; the majority of the field stays as static HTML moving through CSS.
- Avoid animated text shadows and filters on the field.
- Pause background replay when the document is hidden.
- Keep the field decorative and excluded from the accessibility tree.

## Responsive behavior

- Desktop and tablet: split wordmarks flank the centered bear.
- Mobile: one centered line below the bear, with responsive font sizing and no overflow.
- The ASCII field fills the hero at every breakpoint and may crop decoratively at its edges.
- The bear remains the primary visual focus and keeps its existing mobile scale.

## Verification

Automated tests cover deterministic row generation, limited animated-row count, reduced-motion behavior, semantic HTML wordmarks, mobile combined-label markup, and removal of the rendered PNG. Browser checks cover desktop and 390 px mobile composition, refresh replay, no horizontal overflow, and console errors. The full test suite, lint, production build, and `git diff --check` must pass before completion.
