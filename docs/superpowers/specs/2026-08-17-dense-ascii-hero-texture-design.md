# Dense ASCII hero texture design

## Goal

Turn the current sparse, left-weighted ASCII background into a dense abstract text texture that fills the entire hero while keeping fragments of `aattica. // human-made.` recognizable. Replace the duplicated eyebrow branding with `ux/ui designer`.

## Texture composition

- Render 48 visual rows derived deterministically from the existing 12 source rows.
- Repeat every row horizontally so its track extends beyond both viewport edges at all supported widths.
- Mix branded fragments with `.`, `/`, `:`, `-`, `+`, `@`, `0`, `L`, and `i` noise so the field reads first as texture and second as text.
- Preserve only three live `use-scramble` rows across the complete 48-row field. All other rows remain static HTML moved by CSS.
- Center the row tracks and alternate small horizontal offsets so no empty right-side region appears.

## Density and hierarchy

- Background font size: `clamp(18px, 1.6vw, 26px)` on desktop and a viewport-safe minimum on mobile.
- Background line-height: approximately `0.8`.
- Use the existing low opacity, mask fade, and slow transform-only drift so the bear and main wordmarks retain priority.
- The texture must cover the full hero width and height without horizontal page overflow.

## Hero copy

- Keep the main HTML wordmark `aattica. // human-made.` unchanged.
- Change the small top eyebrow from the repeated brand phrase to `ux/ui designer` in content data. Existing uppercase styling may render it as `UX/UI DESIGNER`.

## Motion and accessibility

- Keep the approved bear animation unchanged.
- Keep the background replay cadence and live reduced-motion subscription unchanged.
- When reduced motion is active, all 48 rows remain visible but static and no background replay timers run.

## Responsive behavior

- Desktop and mobile both receive a full-bleed dense texture.
- Mobile keeps the combined main wordmark below the bear.
- Row repetition may crop decoratively at hero edges, but the document must not overflow horizontally.

## Verification

Automated tests cover 48 rendered rows, exactly three animated rows, repeated horizontal track content, the updated eyebrow, and reduced-motion behavior. Browser QA at 1440×900 and 390×844 verifies full-width/full-height coverage, absence of a right-side void, readable branded fragments, no overflow, clean console output, and unchanged bear/wordmark placement.
