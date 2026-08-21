# aattica portfolio

Personal UX/UI and product-design portfolio for Daniil Golsky.

## Current stage

The current frontend includes:

- responsive English and Russian home routes with Hero, About, Selected projects, Contact, and footer sections;
- a static bilingual Drivee Peak case study with the original 19-slide presentation;
- an honest project index: Drivee is published, while ЧестноПро and Atlanta VPN are visibly marked as coming soon rather than linked to missing pages;
- working anchor navigation and a clearly marked frontend-only contact demonstration;
- approved aattica bear assets;
- a preserved disposable navigation prototype in `prototype/index.html`;
- home-page, ASCII-opening, and Drivee case implementation specifications;
- automated content, route, metadata, home-card, and contact-path tests.

Django will later provide project administration, the portfolio API, metrics hooks, and contact-form delivery to Telegram and email from a separate integration branch.

## Local development

```bash
pnpm install
pnpm dev
```

Quality checks:

```bash
pnpm test
pnpm lint
pnpm build
```

## Brand direction

`aattica. / human-made.`

ASCII is used as an identity system in the opening hero, metadata, transitions, and footer. Long case-study content remains clean and readable.

## Documents

- `docs/superpowers/specs/2026-08-17-portfolio-opening-and-home-design.md`
- `docs/ascii-art-reference.md`
