# aattica portfolio

Personal UX/UI and product-design portfolio for Daniil Golsky.

## Current stage

The first frontend checkpoint is implemented on `main`:

- a responsive Next.js home page with Hero, About, Selected projects, Contact, and footer sections;
- working anchor navigation and a clearly marked local-only contact form demonstration;
- approved aattica bear and banner assets;
- a preserved disposable navigation prototype in `prototype/index.html`;
- home-page, ASCII-opening, and implementation specifications;
- automated structure and contact-path tests.

The next frontend checkpoints are the deterministic ASCII opening animation, RU/EN routes, and complete case-study pages. Django will later provide project administration, the portfolio API, metrics hooks, and contact-form delivery to Telegram and email from a separate integration branch.

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
