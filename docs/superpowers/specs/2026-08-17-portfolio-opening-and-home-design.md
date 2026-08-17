# aattica portfolio: opening animation and home structure

Date: 2026-08-17
Status: ready for user review

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
- The live text version of the bear is preferred during animation. `Frame 1.png` is the stable fallback.
- A short scroll cue appears after the reveal and points to About me.

### Sequence

Target duration: 1.8 to 2.4 seconds.

1. The near-black background fades in.
2. The low-contrast background text from the banner appears with an uneven regional fade.
3. The bear begins as sparse terminal noise.
4. Correct glyphs replace the noise from the center and major silhouette edges outward.
5. The final approved bear becomes stable and fully recognizable.
6. The scroll cue and minimal supporting text appear.

The visitor can scroll or use navigation throughout the animation. The sequence must not lock input or delay access to content.

### Repeat behavior

- The complete reveal runs when the home page is opened in a new browsing session.
- Returning from a project page in the same session shows a short fade to the completed hero instead of replaying the full sequence.
- No sound is used.

### Reduced motion

When the operating system requests reduced motion:

- random glyph scrambling is disabled;
- large transforms and parallax are disabled;
- the completed bear and banner appear with a short opacity fade;
- all content and navigation remain immediately available.

## ASCII rendering rules

The exact source and visual characteristics are documented in `docs/ascii-art-reference.md`.

- Preserve whitespace and line breaks in a monospaced text layer.
- Use the approved glyph palette only.
- The final animation frame must reproduce the approved silhouette.
- Temporary scrambling may alter unrevealed cells only.
- Decorative text is hidden from assistive technology; an accessible brand label remains available.
- On narrow screens, use a responsive text scale or the approved PNG fallback if the glyph grid would become unreadable.

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
- CSS masks and gradients create the uneven banner fade.
- Next Image serves responsive raster fallbacks.
- Three.js and React Three Fiber are excluded from the first version.
- GSAP is excluded unless later motion requirements exceed Motion's timeline needs.

The first implementation step is a frontend-only prototype using local assets and static content. Django integration follows through an agreed API contract.

## Performance and resilience

- The useful page content exists independently of the animation.
- JavaScript failure leaves a readable static hero and functional anchor navigation.
- Animation work is limited to opacity, transforms, masks, and controlled text updates.
- The reveal loop stops when complete or when the hero is no longer visible.
- Background images have responsive sizing and do not cause layout shift.
- The mobile design avoids rendering an unnecessarily large glyph grid.

## Acceptance criteria

- The first viewport shows the centered bear over the Frame 2 visual direction.
- The completed bear matches the provided art.
- The reveal completes within 2.4 seconds under normal settings.
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
