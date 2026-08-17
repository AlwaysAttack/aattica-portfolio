# aattica portfolio: opening animation and home structure

Date: 2026-08-17
Revision: distributed-convergence motion direction
Status: ready for written-spec review

## Objective

Create a clear, employer-focused opening for the aattica UX/UI portfolio. The first screen introduces the identity through an animated ASCII bear without delaying access to professional information. The page then leads directly into a prominent About section, followed by selected projects and contact options.

## Audience and positioning

The primary audience is employers and design teams evaluating Daniil for Junior+ or early Middle UX/UI and product-design roles.

The public positioning is:

> Daniil Golsky is a UX/UI and product designer who works from problem framing and user flows through polished interfaces and developer handoff.

Confirmed supporting facts from the current resume:

- 2 years of experience;
- interface design, prototyping, responsive design, user flows, components, and design systems;
- basic UX research and developer handoff;
- Figma, ProtoPie, Adobe Illustrator, and Blender;
- React and HTML/CSS/JS experience;
- Russian native and English B2;
- available for remote and freelance work.

Age, date of birth, citizenship, and desired rate are not shown on the home page. They may remain in the downloadable resume.

## Page order and navigation

The home page order is fixed:

1. Animated ASCII hero
2. About me
3. Selected projects
4. Contact
5. Footer

The header contains:

- `aattica.` — return to the top;
- `About` — anchor link to About me;
- `Projects` — anchor link to Selected projects;
- `Contact` — anchor link to Contact;
- `RU / EN` — language switch for the equivalent localized page.

Selected projects must never appear before About me on the home page.

## Opening hero

### Composition

- The hero occupies the initial viewport but remains part of the document flow rather than a blocking splash screen.
- `Frame 2.png` supplies the dark banner direction and background texture.
- `aattica.` remains readable toward the left and `human-made.` toward the right on wide screens.
- The approved bear mark sits in the visual center.
- The bear is rendered as live JetBrains Mono text at every responsive size from 320 px upward.
- `Frame 1.png` is a visual reference only and is never shown in the animated hero; no opaque image or image-to-text crossfade is permitted.
- A short scroll cue appears after the reveal and points to About me.

### Sequence

Target duration: 6.8 seconds. The approved direction is **distributed convergence**.

1. `0.0–1.4 s` — random approved glyphs emerge across the full 108 × 51 grid. The noise may occupy cells that are empty in the final art, so the bear silhouette is not visible yet.
2. `1.4–4.6 s` — independent regions converge in a controlled order: nose, ears, bridge, side planes, then the outer contour. Correct glyphs lock into their final coordinates while unrelated cells continue changing.
3. `4.6–6.2 s` — incorrect glyphs are replaced by their final values and noise in cells that should be empty loses density.
4. `6.2–6.8 s` — the remaining noise disappears and the exact source art holds as a stable final frame.

Glyph coordinates never move. Each cell may change only its character and opacity, preventing line drift or geometric morphing. Desktop updates run at 10–12 text frames per second; mobile updates run at approximately 8 text frames per second. Motion opacity remains smooth between text-frame updates.

The visitor can scroll or use navigation throughout the animation. The sequence must not lock input or delay access to content.

### Repeat behavior

- The complete reveal runs when the home page is opened in a new browsing session.
- Returning from a project page in the same session shows a short fade to the completed hero instead of replaying the full sequence.
- The same complete reveal runs on desktop and mobile displays at least 320 px wide.
- No sound is used.

### Reduced motion

When the operating system requests reduced motion:

- random glyph scrambling is disabled;
- the completed JetBrains Mono art and banner appear immediately with a short opacity fade;
- all content and navigation remain immediately available.

## ASCII rendering rules

The exact source and visual characteristics are documented in `docs/ascii-art-reference.md`.

- Restore and preserve the original source as exactly 51 lines of 108 cells, including the fully padded blank lines, the 14 leading spaces of the first non-empty line, and every trailing space.
- Render with a locally hosted JetBrains Mono Regular webfont. Disable standard and contextual ligatures so every source character occupies exactly one cell.
- Use the approved glyph palette only.
- During distributed convergence, temporary random glyphs may occupy both filled and empty final cells. They must disappear or resolve before completion.
- The final animation frame must reproduce the exact source grid, not an approximation derived from `Frame 1.png`.
- Scale the complete fixed grid as one unit. Never reflow, wrap, crop, or independently reposition its lines.
- Decorative text is hidden from assistive technology; an accessible brand label remains available.
- The identical sequence runs from 320 px upward. Mobile uses a lower text-update rate rather than a raster fallback.

## About me

About me is the first content section and carries more visual weight than a short biography paragraph.

Desktop layout:

- a sticky left column containing the section label and concise positioning statement;
- a right column containing experience, approach, capabilities, tools, availability, and resume links;
- the sticky behavior ends with the About section and never overlaps Selected projects.

Mobile layout:

- a single readable column;
- no sticky positioning;
- professional summary first, followed by facts and resume links.

The About copy uses the confirmed resume facts but avoids reproducing the resume verbatim.

## Selected projects

Projects appear only after About me in this order:

1. Drivee Peak — primary product case; research, flows, UI, React Native implementation, and Best App Design award.
2. ЧестноПро — real-business naming, identity, and staged production of brand materials.
3. Atlanta VPN — compact individual iOS concept focused on a clean connection flow.

Drivee receives the largest card and strongest hierarchy. Each project card communicates project type, role, concise outcome, and a link to the complete case.

## Contact

The contact section provides three equally valid paths:

- Telegram: `@aattica`;
- email: `contact@aattica.cc`;
- minimal website form.

The later Django integration will store form submissions and attempt delivery to both Telegram and email. The frontend prototype may show a clearly labeled demonstration success state until the API exists.

## Technical direction

The production frontend will use Next.js and React.

- Motion for React orchestrates hero entry/exit, reveal states, and reduced-motion behavior.
- A small project-owned text renderer performs the deterministic ASCII reveal.
- JetBrains Mono Regular is self-hosted as WOFF2 to keep character metrics stable and avoid a font swap during the reveal.
- CSS masks and gradients create the uneven banner fade.
- Three.js and React Three Fiber are excluded from the first version.
- GSAP is excluded unless later motion requirements exceed Motion's timeline needs.

The first implementation step is a frontend-only prototype using local assets and static content. Django integration follows through an agreed API contract.

## Performance and resilience

- The useful page content exists independently of the animation.
- The server renders the deterministic initial noise frame to avoid an image or completed-art flash before hydration. A `noscript` final ASCII layer replaces it when JavaScript is unavailable.
- Animation work is limited to opacity, transforms, masks, and controlled text updates.
- The reveal loop stops when complete or when the hero is no longer visible.
- Background images have responsive sizing and do not cause layout shift.
- The ASCII renderer updates one text node rather than thousands of individual character elements.
- Mobile preserves the full 108 × 51 grid but limits character updates to approximately 8 frames per second.

## Acceptance criteria

- The completed hero composition centers the bear over the Frame 2 visual direction; the initial noise phase intentionally withholds the silhouette.
- No black square or opaque `Frame 1.png` layer appears at any point.
- The initial noise does not expose the completed bear silhouette.
- The completed bear matches the original 51 × 108 source exactly, including the first non-empty line's 14 leading spaces.
- JetBrains Mono Regular is visible before the first animated text update; no fallback-font layout shift occurs.
- The distributed-convergence reveal completes in 6.8 seconds under normal settings on desktop and mobile screens at least 320 px wide.
- Character cells remain spatially fixed throughout the sequence.
- The visitor can scroll and use header links during the reveal.
- About me precedes Selected projects visually and in document order.
- About has a contained sticky desktop presentation and a non-sticky mobile presentation.
- RU/EN controls are present in the prototype; production localization uses separate indexable routes.
- Reduced-motion users receive a stable, non-scrambling version.
- Telegram, email, and the demonstration form are independently reachable.
- The page remains understandable if animation JavaScript does not run.

## Out of scope for this prototype

- Django models and administration;
- production Telegram and email delivery;
- analytics integration;
- final case-study pages;
- final translated copy;
- deployment and DNS configuration.
