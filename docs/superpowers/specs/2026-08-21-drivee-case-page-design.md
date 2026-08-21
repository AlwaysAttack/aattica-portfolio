# Drivee Peak Case Page Design

Date: 2026-08-21
Status: approved for continuous implementation

## Objective

Publish the first complete bilingual case study at `/en/projects/drivee` and `/ru/projects/drivee`. The page must help an employer understand the problem, Daniil's contribution, the product logic, the delivered interface, and the honest outcome before they inspect the full presentation.

## Scope

This phase publishes Drivee Peak only. The existing ЧестноПро and Atlanta VPN cards remain visible as portfolio roadmap items, but they become clearly disabled rather than linking to missing pages. The route and content boundaries must allow those cases to be added later without restructuring the home page.

## Confirmed case facts

- Drivee Peak was a team hackathon project.
- The goal was to make taxi price agreement faster and clearer while preserving choice for passengers and drivers.
- Research included direct interviews and analysis of competitor sites and solutions.
- Daniil reconstructed the driver-side flow and CJM without access to Drivee's private driver-order interface, using established patterns and covering cancellation, price changes, driver search, and related states.
- A programmer teammate trained the price-decision model using marketplace orders and public external sources.
- Daniil created the guideline, UX/UI, Figma screens, and presentation.
- The UI was implemented in React Native.
- The project received the hackathon's Best App Design award.
- The project was not sold after the hackathon; the case must not imply production adoption or business impact that did not occur.

## Information architecture

The case page uses this order:

1. compact case header with a return link and direct RU/EN counterpart;
2. employer-facing hero with title, one-sentence value proposition, award, role, format, and outcome;
3. problem and research context;
4. product principles and the passenger/driver flow;
5. solution details: price recommendation, comparable driver responses, optional automated driver selection, and preserved manual choice;
6. delivered work and honest outcome;
7. the original 19-slide presentation in sequence;
8. return to selected projects and contact call-to-action.

The presentation remains authored visual evidence, not a substitute for the page narrative. Images use their original 16:9 ratio, responsive sizes, intrinsic dimensions, lazy loading after the cover, and localized alt text.

## Routing and content

- `ProjectSlug` remains the shared home-card slug type.
- A published-project registry initially contains only `drivee`.
- Localized Drivee copy lives in typed server dictionaries, separate from JSX.
- Unsupported locales or slugs return a real 404.
- Both Drivee routes are included in static generation, metadata alternates, and the sitemap.
- The case language switch links directly to the corresponding localized case. It does not introduce an arbitrary redirect parameter into the locale cookie endpoint.

## Visual direction

The case keeps the portfolio's black, off-white, muted-gray, and JetBrains Mono foundation. Drivee's bright green is used only as a case accent for the award, dividers, and small markers. Long text stays clean and typographic; ASCII remains a brand signature in the global experience and is not repeated as a large case-page effect.

Desktop uses a wide editorial grid with a sticky summary rail where useful. Mobile becomes one column, preserves the complete presentation order, avoids horizontal overflow, and keeps all touch targets at least 44 px high.

## Accessibility and motion

- semantic `article`, headings, definition lists, and labelled sections;
- descriptive image alt text without repeating visible captions;
- a skip-friendly document order with no scroll locking;
- existing native smooth anchor scrolling remains active;
- `prefers-reduced-motion` continues to disable smooth scrolling and non-essential transitions;
- keyboard focus remains visible.

## Verification

Automated coverage verifies published/unpublished project-card behavior, bilingual Drivee content, all 19 presentation images in order, static params, invalid-slug handling, localized metadata, and sitemap entries.

Browser QA covers `/en/projects/drivee` and `/ru/projects/drivee` at desktop and mobile widths, including language switching, return links, image aspect ratios, no horizontal overflow, heading order, and an empty error log.

## Out of scope

- complete ЧестноПро and Atlanta VPN pages;
- Django project administration;
- database-backed project content;
- callback delivery, analytics, and consent UI;
- claims about production launch, revenue, conversion, or sale of Drivee Peak.
