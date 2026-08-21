# Drivee Peak Case Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish an employer-facing bilingual Drivee Peak case study while turning unfinished project cards into honest non-links.

**Architecture:** Add a typed published-project registry and localized Drivee dictionaries, then statically render `app/[lang]/projects/[slug]/page.tsx`. Keep presentation assets local and optimized through `next/image`; reuse the existing locale and site URL utilities for routing, metadata, and sitemap output.

**Tech Stack:** Next.js 16.3.1 App Router, React 19.2.8, TypeScript 6, `next/image`, Vitest 4, Testing Library, CSS.

**Spec:** `docs/superpowers/specs/2026-08-21-drivee-case-page-design.md`

## Global Constraints

- Publish only `drivee`; unsupported slugs return 404.
- Render ЧестноПро and Atlanta VPN as visibly disabled roadmap cards, never broken links.
- Preserve the confirmed facts and make no unsupported production or performance claims.
- Preserve all 19 slides in their original order and 16:9 ratio.
- Keep content and presentation usable without client-side JavaScript.
- Keep existing smooth scrolling and reduced-motion behavior unchanged.
- Pass all tests, lint, production build, desktop QA, and mobile QA before commit.

---

### Task 1: Published project content and assets

**Files:**
- Create: `content/projects.types.ts`
- Create: `content/projects.en.ts`
- Create: `content/projects.ru.ts`
- Create: `content/projects.ts`
- Create: `tests/projects-content.test.ts`
- Create: `public/cases/drivee/slides/slide-01.png` through `slide-19.png`

**Interfaces:**
- Produces: `PUBLISHED_PROJECT_SLUGS = ["drivee"] as const`
- Produces: `type PublishedProjectSlug`
- Produces: `isPublishedProjectSlug(value: string): value is PublishedProjectSlug`
- Produces: `getProjectContent(locale: Locale, slug: PublishedProjectSlug): ProjectContent`
- Produces: `getProjectStaticParams(): { lang: Locale; slug: PublishedProjectSlug }[]`

- [ ] Write a failing content test that asserts both locale dictionaries, exact Drivee slug, confirmed award/outcome language, 19 ordered slides, and four static route combinations reduced to the exact two locale/slug pairs.
- [ ] Run `pnpm test tests/projects-content.test.ts` and verify failure because the project registry does not exist.
- [ ] Implement the typed registry and bilingual dictionaries with no JSX or runtime fetching.
- [ ] Copy the supplied 19 PNG files to normalized public paths without recompression or reordering.
- [ ] Run the content test and verify it passes.
- [ ] Commit only the content, test, and normalized assets as `feat: add localized Drivee case content`.

### Task 2: Static case route and semantic view

**Files:**
- Create: `app/[lang]/projects/[slug]/page.tsx`
- Create: `components/projects/project-header.tsx`
- Create: `components/projects/project-case.tsx`
- Create: `components/projects/project-slides.tsx`
- Create: `tests/project-page.test.tsx`

**Interfaces:**
- Produces: `LocalizedProjectPage({ locale, content })`
- Produces: `generateStaticParams()` from the project registry
- Produces: localized `generateMetadata()` with canonical and language alternates
- Consumes: slide sources with explicit `3840 × 2160` intrinsic dimensions

- [ ] Write a failing page test that renders RU and EN Drivee views and asserts heading hierarchy, role, research, award, honest unsold outcome, 19 images, return link, and locale counterpart.
- [ ] Run `pnpm test tests/project-page.test.tsx` and verify failure because the route and view do not exist.
- [ ] Implement the server-rendered route, semantic case view, compact header, and `next/image` presentation list.
- [ ] Validate locale and slug before dictionary access and call `notFound()` for unsupported values.
- [ ] Run the page and content tests and verify they pass.
- [ ] Commit the route and components as `feat: add the Drivee case page`.

### Task 3: Honest home-card states and editorial styling

**Files:**
- Modify: `content/home.types.ts`
- Modify: `content/home.en.ts`
- Modify: `content/home.ru.ts`
- Modify: `components/home/projects-section.tsx`
- Modify: `app/globals.css`
- Modify: `tests/home-page.test.tsx`
- Modify: `tests/project-page.test.tsx`

**Interfaces:**
- Adds: `ProjectSummary.status: "published" | "coming-soon"`
- Adds: localized `statusLabel`
- Preserves: the existing Drivee link and visual order of all three cards

- [ ] Add failing home tests proving Drivee is a link while the other two cards expose a localized disabled status and no missing-page anchor.
- [ ] Run the home test and verify failure against the current three-link rendering.
- [ ] Implement published and coming-soon card variants without adding click handlers.
- [ ] Add the Drivee editorial layout, accent tokens, responsive presentation grid, focus states, and mobile overflow protection.
- [ ] Run home and project-page tests and verify they pass.
- [ ] Commit the home states and styling as `feat: style the Drivee case experience`.

### Task 4: Search surfaces and final verification

**Files:**
- Modify: `app/sitemap.ts`
- Modify: `tests/metadata.test.ts`
- Modify: `README.md`

**Interfaces:**
- Adds: `/en/projects/drivee` and `/ru/projects/drivee` sitemap entries
- Preserves: localized home metadata and sitemap entries

- [ ] Add failing sitemap assertions for both Drivee URLs while preserving the two home URLs.
- [ ] Run `pnpm test tests/metadata.test.ts` and verify failure against the current two-entry sitemap.
- [ ] Add the case entries and update README current-stage wording.
- [ ] Run `pnpm test`, `pnpm lint`, and `pnpm build`.
- [ ] Perform desktop and mobile browser QA for both locale routes, test the return and language links, confirm no overflow or console errors, and verify the 19-slide order.
- [ ] Commit the final search/docs checkpoint as `feat: publish the Drivee case study`.
- [ ] Push `main` only after GitHub authentication succeeds.
