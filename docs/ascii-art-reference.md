# aattica ASCII art reference

## Source assets

- `Frame 1.png` — square bear mark on a dark ASCII-textured background.
- `Frame 2.png` — wide dark banner with `aattica.` on the left and `human-made.` on the right.
- Original text art: `/Users/aattica/.codex/attachments/4fe4d707-96f7-48c3-bcb9-c56eef57a41a/pasted-text.txt`.

## Bear mark

The mark is a frontal, symmetrical bear head rendered as dense terminal-style text. Its main silhouette is white, with black negative-space details forming the ears, eyes/muzzle division, and nose. Small visible glyphs along the contour keep the image recognizably text-based rather than pixel-art.

Text source properties:

- 51 total lines, 49 non-empty lines;
- every source line is padded to exactly 108 characters;
- the first non-empty line starts with 14 spaces, which are part of the art and must not be trimmed;
- glyph palette: `@`, `▓`, `█`, `▒`, `0`, `8`, `G`, `L`, `f`, `i`, `;`, `:`, `,`, `.`;
- intended rendering: locally hosted JetBrains Mono Regular with ligatures disabled, preserved whitespace, and a centered fixed grid;
- aspect ratio is wide in text coordinates because terminal glyphs are taller than they are wide.

## Banner

The banner is nearly black with oversized, low-contrast text fragments forming a background texture. The readable foreground wordmarks are:

- `aattica.` aligned toward the left;
- `human-made.` aligned toward the right.

The background words repeat at low opacity and fade unevenly across the area. The effect should feel printed or phosphorescent, not like a developer terminal grid.

## Intended website use

- The bear remains the primary symbol and sits in the center of the opening hero.
- `Frame 2.png` provides the opening background direction, with a responsive/mobile crop prepared separately if needed.
- The live ASCII text version is used for the reveal and stable final state on every screen from 320 px upward.
- `Frame 1.png` is a visual reference only and must not appear as a hero layer or animation fallback.
- ASCII styling is concentrated in the opening, metadata, separators, loading states, and footer.
- Long portfolio text remains set in a highly readable sans-serif.
- Motion must respect the operating system's reduced-motion preference.

## Animation constraint

The approved reveal direction is distributed convergence over 6.8 seconds. Initial random glyphs may occupy any cell in the 108 × 51 grid so the silhouette is not visible prematurely. Correct characters lock into fixed coordinates in regional waves, noise in final-empty cells disappears, and the last frame reproduces the complete padded source exactly. Character coordinates never move.
