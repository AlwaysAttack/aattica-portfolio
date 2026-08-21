# Localized Home and About Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deliver a complete indexable `/en` and `/ru` home page with browser-language routing, a remembered manual language choice, localized SEO, and a stronger employer-facing About section.

**Architecture:** Keep the localized pages statically generated under `app/[lang]`, use a root-only Next.js Proxy for cookie and `Accept-Language` negotiation, and use a fixed same-origin route handler to persist a manual choice. Store English and Russian copy in typed server dictionaries and pass it into shared visual sections so the approved ASCII hero remains isolated from routing and copy lookup.

**Tech Stack:** Next.js 16.3.1 App Router and Proxy, React 19.2.8, TypeScript 6, Vitest 4, Testing Library, CSS.

**Spec:** `docs/superpowers/specs/2026-08-21-localized-home-and-about-design.md`

## Global Constraints

- Public content routes are exactly `/en` and `/ru`; only `/` auto-redirects.
- Root locale precedence is valid `locale` cookie, weighted `Accept-Language`, then English.
- Do not use IP geolocation, analytics, third-party embeds, or server form submission.
- Persist only `locale=en|ru` for six months with `Path=/`, `SameSite=Lax`, `HttpOnly`, and production `Secure`.
- Keep the ASCII bear source, background density, wordmark, animation timing, and responsive composition unchanged.
- About must remain before Projects, with contained sticky desktop behavior and a single non-sticky mobile column.
- Resume controls are visibly disabled until real PDF files exist.
- Project cards use locale-prefixed future URLs.
- Unsupported locales and invalid locale endpoint values return 404.
- All tests, lint, production build, desktop QA, and mobile QA must pass before the final commit.

---

## File Structure

- Create `lib/i18n.ts`: supported-locale constants, guards, cookie constants, and weighted language selection.
- Create `proxy.ts`: root-only locale redirect.
- Create `app/api/locale/[lang]/route.ts`: validated cookie persistence and fixed redirect.
- Create `content/home.types.ts`: shared localized-content contract.
- Create `content/home.en.ts` and `content/home.ru.ts`: complete dictionaries.
- Create `content/home.ts`: server-only dictionary loader and locale helpers.
- Move `app/layout.tsx` to `app/[lang]/layout.tsx`: locale-aware document language and metadata base.
- Move `app/page.tsx` to `app/[lang]/page.tsx`: localized page composition and metadata.
- Create `app/sitemap.ts`: localized index entries.
- Modify home components: accept explicit dictionary sections and locale.
- Modify `app/globals.css`: expanded About, resume controls, and localized-header responsive polish.
- Create `tests/i18n.test.ts`, `tests/locale-route.test.ts`, and replace `tests/home-page.test.tsx` with locale-aware coverage.

---

### Task 1: Locale negotiation and persistence

**Files:**
- Create: `lib/i18n.ts`
- Create: `proxy.ts`
- Create: `app/api/locale/[lang]/route.ts`
- Create: `tests/i18n.test.ts`
- Create: `tests/locale-route.test.ts`

**Interfaces:**
- Produces: `LOCALES = ["en", "ru"] as const`
- Produces: `type Locale = (typeof LOCALES)[number]`
- Produces: `isLocale(value: string): value is Locale`
- Produces: `selectLocale(acceptLanguage: string | null): Locale`
- Produces: `LOCALE_COOKIE` and `LOCALE_COOKIE_MAX_AGE`
- Produces: root-only `proxy(request: NextRequest): NextResponse`
- Produces: locale endpoint `GET(request, { params }): Promise<Response>`

- [ ] **Step 1: Write failing locale-unit tests**

Cover exact locales, regional tags, weighted priorities, wildcard/malformed values, missing headers, and unsupported cookie values:

```ts
expect(isLocale("en")).toBe(true);
expect(isLocale("de")).toBe(false);
expect(selectLocale("de-DE,de;q=0.9,ru;q=0.8,en;q=0.7")).toBe("ru");
expect(selectLocale("ru;q=0.4,en-US;q=0.9")).toBe("en");
expect(selectLocale(null)).toBe("en");
```

- [ ] **Step 2: Run locale tests and verify RED**

Run: `pnpm test -- tests/i18n.test.ts`

Expected: FAIL because `lib/i18n.ts` does not exist.

- [ ] **Step 3: Implement the minimal weighted selector**

Parse comma-separated language ranges, normalize each primary tag, parse valid `q` values, ignore unsupported ranges, sort by descending quality and original order, and return English when no supported language remains. Export the exact interfaces above and set the cookie lifetime to `60 * 60 * 24 * 183` seconds.

- [ ] **Step 4: Run locale tests and verify GREEN**

Run: `pnpm test -- tests/i18n.test.ts`

Expected: all locale tests pass.

- [ ] **Step 5: Write failing routing tests**

Directly call Proxy with `NextRequest` instances and assert:

```ts
expect(proxy(new NextRequest("https://aattica.cc/", {
  headers: { "accept-language": "ru-RU,ru;q=0.9" },
})).headers.get("location")).toBe("https://aattica.cc/ru");
```

Add cookie precedence and English fallback assertions. Call the route handler with awaited params; assert valid `ru` sets the exact cookie attributes and redirects only to `/ru`, while `de` returns 404.

- [ ] **Step 6: Run routing tests and verify RED**

Run: `pnpm test -- tests/locale-route.test.ts`

Expected: FAIL because Proxy and the endpoint do not exist.

- [ ] **Step 7: Implement root Proxy and fixed locale endpoint**

Use `config.matcher = "/"`. Read only `request.cookies.get(LOCALE_COOKIE)?.value` and `request.headers.get("accept-language")`. Redirect with `NextResponse.redirect(new URL(`/${locale}`, request.url))`.

In the endpoint, await `params`, validate with `isLocale`, return `notFound()` for unsupported values, set the cookie with the global attributes, and redirect to the fixed same-origin `/${lang}` URL. Never accept a `next`, `return`, or arbitrary URL parameter.

- [ ] **Step 8: Run routing tests and verify GREEN**

Run: `pnpm test -- tests/i18n.test.ts tests/locale-route.test.ts`

Expected: all negotiation and persistence tests pass.

- [ ] **Step 9: Commit locale infrastructure**

```bash
git add lib/i18n.ts proxy.ts app/api/locale/[lang]/route.ts tests/i18n.test.ts tests/locale-route.test.ts
git commit -m "feat: add persistent locale routing"
```

---

### Task 2: Typed dictionaries and localized routes

**Files:**
- Create: `content/home.types.ts`
- Create: `content/home.en.ts`
- Create: `content/home.ru.ts`
- Modify: `content/home.ts`
- Move: `app/layout.tsx` to `app/[lang]/layout.tsx`
- Move: `app/page.tsx` to `app/[lang]/page.tsx`
- Modify: `components/site-header.tsx`
- Modify: `components/home/hero-section.tsx`
- Modify: `components/home/about-section.tsx`
- Modify: `components/home/projects-section.tsx`
- Modify: `components/home/contact-section.tsx`
- Modify: `components/home/ascii-hero-mark.tsx`
- Modify: `tests/home-page.test.tsx`

**Interfaces:**
- Produces: `HomeContent` containing `metadata`, `navigation`, `hero`, `about`, `projects`, `contact`, and `footer`.
- Produces: `getHomeContent(locale: Locale): HomeContent`.
- Section props consume only their relevant content slice plus `locale` where URLs require it.
- Page consumes `PageProps<"/[lang]">`, validates `lang`, and calls `notFound()` for unsupported values.

- [ ] **Step 1: Replace page tests with failing bilingual assertions**

Render the extracted localized home-page view once with `homeContent.en` and once with `homeContent.ru`. Assert section order, localized navigation and headings, contact labels/status, hero accessible labels, unchanged bear layers, and project destinations `/en/projects/drivee` and `/ru/projects/drivee`.

Assert About includes all four facts, the approach paragraph, capabilities, tools, and two disabled resume controls in both languages.

- [ ] **Step 2: Run page tests and verify RED**

Run: `pnpm test -- tests/home-page.test.tsx`

Expected: FAIL because components still import one global English object and no localized page view exists.

- [ ] **Step 3: Define one complete content contract and both dictionaries**

Use readonly arrays and `satisfies HomeContent`. Preserve exact project slugs and names. Include every visible and accessible string currently hardcoded in components, including form labels, submission status, section eyebrows, footer, and bear description.

Use the approved About positioning statements verbatim. Add concise localized introduction and approach copy without claiming every method was used in every project.

- [ ] **Step 4: Convert sections to explicit content props**

Remove all direct imports of `homeContent` from shared components. Keep `ContactSection` as the only client component. Pass its content object as serializable props. Pass the localized bear label into `AsciiHeroMark` without changing its scramble logic or DOM layer count.

Use a normal anchor for the locale endpoint so switching works without JavaScript. Use localized project URLs. Render resume controls as `<span aria-disabled="true">` elements rather than empty anchors.

- [ ] **Step 5: Move the route into `app/[lang]`**

The localized root layout imports the font and global CSS, generates `en` and `ru` static params, validates the locale, and renders `<html lang={lang}>`.

The page awaits `params`, validates the locale, loads its dictionary, and composes the existing sections in the unchanged order. Export a pure `LocalizedHomePage` view for component tests while keeping the route's default export async.

- [ ] **Step 6: Run page and hero tests and verify GREEN**

Run:

```bash
pnpm test -- tests/home-page.test.tsx tests/ascii-hero-mark.test.tsx tests/ascii-hero-background.test.tsx
```

Expected: localized page tests and all frozen hero tests pass.

- [ ] **Step 7: Commit localized content and routes**

```bash
git add app components content tests/home-page.test.tsx
git commit -m "feat: localize the portfolio home page"
```

---

### Task 3: Employer-facing About layout

**Files:**
- Modify: `app/globals.css`
- Modify: `tests/home-page.test.tsx`

**Interfaces:**
- Consumes: semantic About markup and resume controls from Task 2.
- Produces: `.about__sticky`, `.about__intro`, `.about__approach`, `.about__facts`, `.about__capabilities`, `.about__tools`, and `.about__resumes` layout contracts.
- Preserves: document order Hero → About → Projects → Contact.

- [ ] **Step 1: Add failing semantic About assertions**

Assert the About region contains a heading hierarchy, a definition list with four entries, named Capabilities and Tools subsections, and exactly two elements with `aria-disabled="true"` whose labels communicate that resumes are coming soon.

- [ ] **Step 2: Run the page test and verify RED if markup is incomplete**

Run: `pnpm test -- tests/home-page.test.tsx`

Expected: FAIL on any missing semantic or resume-state contract.

- [ ] **Step 3: Implement the expanded visual hierarchy**

Keep the current two-column `.about` grid. Move the positioning statement into the sticky column below the title and reduce it to a supporting display size. Give the right column clear vertical groups, fine divider lines, restrained monospace labels, and a readable measure.

Style disabled resume controls as visible bordered pills/cards with muted color and `cursor: not-allowed`; do not attach click behavior. At `max-width: 720px`, keep the existing static left column, switch facts and capabilities to one column, and maintain at least 44px touch-height where controls later become links.

- [ ] **Step 4: Run page test and verify GREEN**

Run: `pnpm test -- tests/home-page.test.tsx`

Expected: all About and localized-page assertions pass.

- [ ] **Step 5: Commit the About presentation**

```bash
git add app/globals.css tests/home-page.test.tsx
git commit -m "feat: strengthen the portfolio profile section"
```

---

### Task 4: Localized metadata, sitemap, and final verification

**Files:**
- Create: `lib/site.ts`
- Create: `app/sitemap.ts`
- Modify: `app/[lang]/layout.tsx`
- Modify: `app/[lang]/page.tsx`
- Create: `tests/metadata.test.ts`

**Interfaces:**
- Produces: `getSiteUrl(): URL` using a validated production environment value with a localhost development fallback.
- Produces: localized `generateMetadata` output with canonical and language alternates.
- Produces: sitemap entries for `/en` and `/ru` only.

- [ ] **Step 1: Write failing metadata tests**

Assert each locale returns its localized title and description, canonical URL, `en`, `ru`, and `x-default` alternates, and matching Open Graph locale. Assert `sitemap()` returns exactly two localized page URLs.

- [ ] **Step 2: Run metadata tests and verify RED**

Run: `pnpm test -- tests/metadata.test.ts`

Expected: FAIL because localized metadata utilities and sitemap do not exist.

- [ ] **Step 3: Implement site URL validation, metadata, and sitemap**

Accept only absolute `http:` or `https:` values from `NEXT_PUBLIC_SITE_URL`. Trim trailing slashes through the `URL` type. Use `http://localhost:3000` only when the variable is absent. Build canonicals with `new URL(`/${locale}`, siteUrl)` and expose `/` as `x-default`.

- [ ] **Step 4: Run metadata tests and verify GREEN**

Run: `pnpm test -- tests/metadata.test.ts`

Expected: all metadata and sitemap tests pass.

- [ ] **Step 5: Run the complete automated verification**

Run:

```bash
pnpm test
pnpm lint
pnpm build
```

Expected: every command exits successfully with no test, lint, type, or build errors.

- [ ] **Step 6: Run browser QA**

At 1440×900 and 390×844 verify `/` redirects correctly, `/en` and `/ru` render the correct `html[lang]`, header anchors work, language switching persists on a later `/` visit, desktop About sticks only inside its section, mobile About is static, resume controls are disabled, hero geometry is unchanged, and `scrollWidth === clientWidth`.

- [ ] **Step 7: Review the final diff**

Run:

```bash
git diff --check
git status --short
git diff --stat
```

Expected: no whitespace errors, only planned files changed, and no generated build artifacts staged.

- [ ] **Step 8: Commit SEO and verified integration**

```bash
git add app lib tests/metadata.test.ts
git commit -m "feat: add localized portfolio metadata"
```
