# Localized Home and About Design

Date: 2026-08-21  
Status: ready for written-spec review

## Objective

Turn the current English-only portfolio prototype into an indexable Russian and English experience, and make About me a substantial employer-facing profile section. The completed ASCII hero remains visually and behaviorally unchanged apart from localized supporting copy.

This phase covers the complete home page in both languages. Individual case pages, the Django callback backend, production analytics, and finished resume PDFs remain later phases.

## Audience and content principles

The primary audience is employers and design teams evaluating Daniil Golsky for Junior+ or early Middle UX/UI and product-design roles.

Copy must be direct, factual, and easy to scan. It may use these confirmed facts:

- 2 years of experience;
- interface design, prototyping, responsive design, user flows, components, and design systems;
- basic UX research and developer handoff;
- Figma, ProtoPie, Adobe Illustrator, Blender, React, and HTML/CSS/JS;
- Russian native and English B2;
- available for remote and freelance work.

Age, date of birth, citizenship, desired rate, and unsupported performance claims do not appear on the home page.

## Localization architecture

### Public routes

- `/en` is the permanent English home page.
- `/ru` is the permanent Russian home page.
- `/` is an entry route that redirects before page rendering.
- Future cases will follow the same structure: `/en/projects/<slug>` and `/ru/projects/<slug>`.
- A visitor who opens an explicit localized URL is never redirected to the other language.
- Unsupported locale segments return a real 404.

The localized pages use an `app/[lang]` route segment with statically generated `en` and `ru` parameters. The locale-aware root layout sets the correct document `lang` attribute.

### First-visit language selection

The root redirect uses this precedence:

1. a valid first-party `locale` cookie;
2. the highest-priority supported language in the browser's `Accept-Language` header;
3. English as the fallback.

The redirect logic runs only for `/`. It does not inspect IP addresses, call a geolocation provider, or retain request identifiers.

### Remembering a manual choice

The language control links to a small same-origin locale endpoint. That endpoint accepts only `en` or `ru`, stores `locale=en|ru`, and redirects to the corresponding fixed home route. It cannot accept an arbitrary redirect URL.

Cookie properties:

- first party;
- value limited to `en` or `ru`;
- path `/`;
- `SameSite=Lax`;
- `HttpOnly`;
- `Secure` in production;
- six-month lifetime.

The cookie contains no user identifier. It exists only to remember an explicitly selected interface language. It will be disclosed in the future privacy/cookie notice, but it does not trigger a consent banner by itself.

### Content source

English and Russian content live in separate typed dictionaries on the server. Both dictionaries satisfy one shared home-content contract, so labels and project fields cannot silently disappear from one language.

Shared visual components receive the selected dictionary and locale as explicit inputs. Brand strings such as `aattica.`, `human-made.`, project names, email, Telegram, and tool names are not translated.

## Search and sharing

Each localized home page has its own title and description. Metadata includes:

- a self-referencing canonical URL;
- `hreflang` alternates for `en` and `ru`;
- an `x-default` alternate pointing to `/`;
- localized Open Graph locale data;
- an indexable `/en` and `/ru` entry in the sitemap.

The root redirect is not treated as a canonical content page. Search engines and shared links can address either localized page directly.

The production site origin will come from one validated configuration value. Local development uses the local origin without leaking it into production metadata.

## Header and navigation

The header keeps the current compact composition:

- `aattica.` returns to the top of the current localized page;
- About, Projects, and Contact use anchors on the current localized page;
- the language control displays the other available language rather than the disabled `RU / EN` placeholder.

English labels are `About`, `Projects`, and `Contact`. Russian labels are `Обо мне`, `Проекты`, and `Контакты`.

The switch remains keyboard accessible, works without client-side JavaScript, and has a localized accessible label.

## Hero localization boundary

The approved ASCII composition, texture, animation timing, bear source, `aattica. // human-made.` wordmark, and responsive behavior are frozen.

Only supporting text is localized:

- `ux/ui designer` remains the same brand-facing role label in both languages;
- the English scroll cue is `Scroll to meet me`;
- the Russian scroll cue is `Листайте, чтобы познакомиться`;
- accessible labels describe the introduction and bear mark in the active language.

Localization must not restart, accelerate, or visually shift the hero animation.

## About me

About remains immediately after the hero and before Selected projects. It carries more weight than a short biography paragraph.

### Desktop composition

The section uses two columns:

- the left column stays sticky only within About and contains `01 / PROFILE`, the `About me` or `Обо мне` title, and the primary positioning statement;
- the right column contains a short introduction, working approach, facts, capabilities, tools, availability, languages, and resume status.

The sticky column stops with the About section and never overlaps Projects.

### Mobile composition

The section becomes one readable column without sticky positioning. The order is title, positioning statement, introduction, working approach, facts, capabilities, tools, and resume status.

### Approved messaging

English positioning statement:

> I design clear digital products from problem framing and research to user flows, polished interfaces, and developer handoff.

Russian positioning statement:

> Проектирую понятные цифровые продукты — от постановки задачи и исследования до пользовательских сценариев, готового интерфейса и передачи в разработку.

The supporting introduction identifies Daniil as a UX/UI and product designer with two years of experience. The approach explains that he begins with the problem and context, maps scenarios, checks interaction logic, develops the interface, and prepares the result for implementation. It must not imply that every portfolio project included every method.

Facts are presented as scannable pairs:

- Experience / Опыт — 2 years / 2 года;
- Languages / Языки — Russian native, English B2 / Русский — родной, английский — B2;
- Format / Формат — Remote and freelance / Удалённо и фриланс;
- Focus / Фокус — UX/UI and product design / UX/UI и продуктовый дизайн.

Capabilities remain a compact list. Tools remain a separate line so employers can distinguish methods from software.

Resume controls are visible but not fake links. Until the files exist, they display `Resume RU — coming soon` and `Resume EN — coming soon` with a disabled state. When the PDFs are supplied, the same controls become download links without changing the layout.

## Projects and contact localization

The existing project order and meaning remain fixed:

1. Drivee Peak;
2. ЧестноПро;
3. Atlanta VPN.

Section headings, categories, summaries, results, and accessible labels are translated. Project names stay unchanged. Project URLs include the active locale even though final case-page implementation belongs to the next phase.

The contact section is fully translated, including field labels, status copy, the demonstration warning, and accessible form name. Telegram and `contact@aattica.cc` stay unchanged.

The form remains a frontend demonstration in this phase. It prevents submission and sends nothing to a server. No consent checkbox is added until actual personal-data transmission is implemented; the Django phase must add a separate unchecked consent control and the required privacy documents before delivery is enabled.

## Privacy boundary

This phase deliberately minimizes processing:

- no IP geolocation;
- no analytics or marketing trackers;
- no third-party embeds;
- no server submission of form fields;
- only the first-party language preference cookie.

Before Django callback delivery or production analytics is enabled, the project requires a separate privacy review covering the operator identity, consent wording, storage location and period, deletion requests, Telegram/email processors, possible cross-border transfer, and any applicable Roskomnadzor notification.

The privacy decisions in this specification are informed by GDPR recital 30 and EDPB guidance treating IP addresses and cookie identifiers as potential personal data, CNIL guidance identifying language-preference cookies as potentially consent-exempt when limited to expected interface personalization, and the current text of Russian Federal Law No. 152-FZ. These references guide data minimization but do not replace launch-specific legal review.

References:

- <https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:02016R0679-20160504>
- <https://www.edpb.europa.eu/contact/frequently-asked-questions_en?page=1>
- <https://www.cnil.fr/sites/default/files/2026-01/recommandation_cookies_consolidee.pdf>
- <https://ips.pravo.gov.ru/api/ips/legislation/document?baseid=None&hash=98490812b3409e2a8d78a11ca9010f434ea3d9250a11dbbdb78690cd5551bdd6>

## Component boundaries

- locale utilities validate `en|ru` and select a browser preference;
- dictionaries contain display copy only;
- routing resolves and persists locale;
- the localized page composes the existing sections;
- each section renders supplied content and does not resolve locale itself;
- the contact component owns only its local demonstration state;
- metadata and sitemap code consume the same supported-locale configuration.

This keeps routing, copy, presentation, and interaction independently testable.

## Error handling

- malformed or missing `Accept-Language` falls back to English;
- an invalid locale cookie is ignored;
- an unsupported localized route returns 404;
- an invalid locale endpoint request returns 404 and never redirects externally;
- absent resume files render disabled controls rather than broken links;
- localized content remains usable if hero animation JavaScript fails.

## Verification

Automated coverage must verify:

- locale validation and weighted `Accept-Language` selection;
- cookie precedence and fallback behavior;
- root redirect behavior;
- rejection of unsupported locale values;
- content-contract parity between English and Russian;
- localized header, About, Projects, Contact, footer, and accessible labels;
- locale-prefixed project URLs;
- localized metadata, canonical URLs, alternates, and sitemap entries;
- no regression in the existing ASCII hero tests.

Browser QA must cover `/`, `/en`, and `/ru` at desktop and mobile widths. It verifies the root redirect, language switch persistence, correct document language, working anchors, no horizontal overflow, contained desktop sticky behavior, non-sticky mobile About, disabled resume states, and an unchanged hero composition.

The final implementation must pass the full test suite, lint, and production build before it is committed to `main`.

## Out of scope

- completed case-study pages;
- Django API and database;
- Telegram and email delivery;
- real form submission;
- analytics provider selection and consent interface;
- final privacy-policy legal text;
- resume PDF production;
- deployment and domain configuration.
