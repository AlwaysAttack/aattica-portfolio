# Static Home Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the disposable single-file prototype with a testable Next.js home page whose fixed order is hero, About me, Selected projects, Contact, and footer.

**Architecture:** Build a server-rendered App Router page from small presentational sections and a typed local content module. Keep the opening hero static in this increment so layout, content hierarchy, responsive behavior, and assets can be reviewed before Motion and the live ASCII renderer are introduced in a separate plan.

**Tech Stack:** Node.js 24.19.0, pnpm 11.19.0, Next.js 16.3.1, React 19.2.8, TypeScript 7.0.2, CSS Modules/global CSS, Vitest, React Testing Library.

## Global Constraints

- Home order is exactly: animated hero, About me, Selected projects, Contact, footer.
- This increment renders a static hero; it does not implement glyph scrambling or Motion.
- About me precedes Selected projects in visual and DOM order.
- Desktop About uses contained sticky positioning; mobile About is a single non-sticky column.
- The centered bear uses the approved `Frame 1.png`; the background uses the approved `Frame 2.png`.
- The useful page content and navigation remain available without client-side JavaScript.
- Long portfolio copy uses a readable sans-serif; monospace is reserved for metadata and ASCII-related details.
- Telegram, email, and the form remain independently reachable; the form is explicitly marked as a frontend demonstration.
- Draft resume files remain ignored and are not published.

---

## File structure

```text
app/
  globals.css                 global tokens, reset, layout, responsive rules
  layout.tsx                  root metadata and document shell
  page.tsx                    home section composition only
components/home/
  about-section.tsx           prominent sticky About presentation
  contact-section.tsx         direct contact links and demo form
  hero-section.tsx            static approved opening composition
  projects-section.tsx        ordered project cards
components/site-header.tsx    anchor navigation and static language control
content/home.ts               typed profile, navigation, and project content
public/brand/
  aattica-bear.png            approved Frame 1 asset
  aattica-banner.png          approved Frame 2 asset
tests/
  home-page.test.tsx          semantic order and essential links
  setup.ts                    Testing Library matchers
prototype/
  index.html                  preserved disposable navigation prototype
eslint.config.mjs             Next.js lint configuration
next.config.ts                Next.js configuration
package.json                  scripts and pinned runtime dependencies
tsconfig.json                 strict TypeScript configuration
vitest.config.ts              jsdom test configuration and path alias
```

---

### Task 1: Next.js foundation and preserved prototype

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next-env.d.ts`
- Create: `next.config.ts`
- Create: `eslint.config.mjs`
- Create: `vitest.config.ts`
- Create: `tests/setup.ts`
- Move: `index.html` to `prototype/index.html`
- Create during install: `pnpm-lock.yaml`

**Interfaces:**
- Consumes: the current repository root and `.gitignore`.
- Produces: `pnpm dev`, `pnpm build`, `pnpm lint`, and `pnpm test` commands used by every later task.

- [ ] **Step 1: Preserve the navigation prototype**

Move the existing file without changing its contents:

```bash
mkdir -p prototype
git mv index.html prototype/index.html
```

- [ ] **Step 2: Create the package manifest**

Create `package.json`:

```json
{
  "name": "aattica-portfolio",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint .",
    "test": "vitest run"
  },
  "dependencies": {
    "next": "16.3.1",
    "react": "19.2.8",
    "react-dom": "19.2.8"
  },
  "devDependencies": {
    "@testing-library/dom": "latest",
    "@testing-library/jest-dom": "latest",
    "@testing-library/react": "16.3.2",
    "@types/node": "latest",
    "@types/react": "latest",
    "@types/react-dom": "latest",
    "eslint": "latest",
    "eslint-config-next": "16.3.1",
    "jsdom": "latest",
    "typescript": "7.0.2",
    "vitest": "latest"
  },
  "packageManager": "pnpm@11.19.0"
}
```

- [ ] **Step 3: Add strict framework and test configuration**

Create `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

Create `next-env.d.ts`:

```ts
/// <reference types="next" />
/// <reference types="next/image-types/global" />
```

Create `next.config.ts`:

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
};

export default nextConfig;
```

Create `eslint.config.mjs`:

```js
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";

export default defineConfig([
  ...nextVitals,
  globalIgnores([".next/**", "out/**", "prototype/**"]),
]);
```

Create `vitest.config.ts`:

```ts
import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: ["./tests/setup.ts"],
  },
  resolve: {
    alias: { "@": path.resolve(__dirname, ".") },
  },
});
```

Create `tests/setup.ts`:

```ts
import "@testing-library/jest-dom/vitest";
```

- [ ] **Step 4: Install the locked dependency set**

Run:

```bash
pnpm install
```

Expected: installation succeeds and creates `pnpm-lock.yaml` without editing the pinned Next.js, React, or TypeScript versions.

- [ ] **Step 5: Verify the empty foundation**

Run:

```bash
pnpm exec tsc --noEmit
pnpm lint
```

Expected: both commands exit successfully. The application build is deferred until `app/layout.tsx` and `app/page.tsx` exist in Task 3.

- [ ] **Step 6: Commit the foundation**

```bash
git add package.json pnpm-lock.yaml tsconfig.json next-env.d.ts next.config.ts eslint.config.mjs vitest.config.ts tests/setup.ts prototype/index.html
git commit -m "chore: add Next.js frontend foundation"
```

---

### Task 2: Typed home content and semantic-order test

**Files:**
- Create: `content/home.ts`
- Create: `tests/home-page.test.tsx`

**Interfaces:**
- Consumes: Vitest and Testing Library from Task 1.
- Produces: `homeContent`, `HomeSectionId`, and a failing semantic contract for the home page assembled in Task 3.

- [ ] **Step 1: Define the failing home-page contract**

Create `tests/home-page.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import HomePage from "@/app/page";

vi.mock("next/image", () => ({
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img {...props} />
  ),
}));

describe("home page", () => {
  it("places About before Selected projects", () => {
    render(<HomePage />);

    const about = screen.getByRole("region", { name: "About me" });
    const projects = screen.getByRole("region", { name: "Selected projects" });

    expect(about.compareDocumentPosition(projects)).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING,
    );
  });

  it("offers direct Telegram and email contact paths", () => {
    render(<HomePage />);

    expect(screen.getByRole("link", { name: "Telegram" })).toHaveAttribute(
      "href",
      "https://t.me/aattica",
    );
    expect(screen.getByRole("link", { name: "contact@aattica.cc" })).toHaveAttribute(
      "href",
      "mailto:contact@aattica.cc",
    );
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run:

```bash
pnpm test -- tests/home-page.test.tsx
```

Expected: FAIL because `app/page.tsx` does not exist.

- [ ] **Step 3: Create typed content**

Create `content/home.ts`:

```ts
export type HomeSectionId = "top" | "about" | "projects" | "contact";

export type ProjectSummary = {
  slug: "drivee" | "chestnopro" | "atlanta-vpn";
  index: string;
  title: string;
  category: string;
  summary: string;
  result: string;
};

export const homeContent = {
  navigation: [
    { href: "#about", label: "About" },
    { href: "#projects", label: "Projects" },
    { href: "#contact", label: "Contact" },
  ],
  hero: {
    eyebrow: "aattica. / human-made.",
    scrollLabel: "Scroll to meet me",
  },
  about: {
    title: "About me",
    statement: "I design clear digital products from problem framing and user flows to polished interfaces and developer handoff.",
    experience: "2 years of experience",
    availability: "Available for remote and freelance work",
    skills: ["UX research", "User flows", "Interface design", "Prototyping", "Design systems", "Developer handoff"],
    tools: ["Figma", "ProtoPie", "Adobe Illustrator", "Blender", "React", "HTML/CSS/JS"],
  },
  projects: [
    {
      slug: "drivee",
      index: "01",
      title: "Drivee Peak",
      category: "Product design · Hackathon",
      summary: "Recommended pricing and automated driver selection inside the Drivee ecosystem.",
      result: "Best App Design",
    },
    {
      slug: "chestnopro",
      index: "02",
      title: "ЧестноПро",
      category: "Branding · Real business",
      summary: "Naming, identity and information materials for a service center.",
      result: "Business cards and information stand produced",
    },
    {
      slug: "atlanta-vpn",
      index: "03",
      title: "Atlanta VPN",
      category: "iOS · Individual concept",
      summary: "A clean flow from launch to connection through location selection.",
      result: "Competition presentation and prototype",
    },
  ] satisfies ProjectSummary[],
} as const;
```

- [ ] **Step 4: Type-check the content module**

Run:

```bash
pnpm exec tsc --noEmit
```

Expected: the only remaining failure is the intentionally absent `app/page.tsx` imported by the test.

- [ ] **Step 5: Commit the content contract and failing test**

```bash
git add content/home.ts tests/home-page.test.tsx
git commit -m "test: define static home page contract"
```

---

### Task 3: Static page sections and brand assets

**Files:**
- Create: `app/layout.tsx`
- Create: `app/page.tsx`
- Create: `components/site-header.tsx`
- Create: `components/home/hero-section.tsx`
- Create: `components/home/about-section.tsx`
- Create: `components/home/projects-section.tsx`
- Create: `components/home/contact-section.tsx`
- Copy: `Frame 1.png` to `public/brand/aattica-bear.png`
- Copy: `Frame 2.png` to `public/brand/aattica-banner.png`

**Interfaces:**
- Consumes: `homeContent` from Task 2 and approved local image assets.
- Produces: a server-rendered semantic home page and section components styled in Task 4.

- [ ] **Step 1: Add the root layout**

Create `app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "aattica. — UX/UI & Product Designer",
  description: "Portfolio of Daniil Golsky, UX/UI and product designer.",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 2: Add the header and four semantic sections**

Implement each file with one responsibility:

```tsx
// components/site-header.tsx
import { homeContent } from "@/content/home";

export function SiteHeader() {
  return (
    <header className="site-header">
      <a className="brand" href="#top">aattica.</a>
      <nav aria-label="Primary navigation">
        {homeContent.navigation.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
        <button type="button" aria-label="Switch language" disabled>RU / EN</button>
      </nav>
    </header>
  );
}
```

```tsx
// components/home/hero-section.tsx
import Image from "next/image";
import { homeContent } from "@/content/home";

export function HeroSection() {
  return (
    <section id="top" className="hero" aria-label="aattica introduction">
      <Image className="hero__background" src="/brand/aattica-banner.png" alt="" fill priority sizes="100vw" />
      <div className="hero__shade" />
      <Image className="hero__bear" src="/brand/aattica-bear.png" alt="aattica bear mark" width={1080} height={1080} priority />
      <a className="hero__scroll" href="#about">{homeContent.hero.scrollLabel} ↓</a>
    </section>
  );
}
```

```tsx
// components/home/about-section.tsx
import { homeContent } from "@/content/home";

export function AboutSection() {
  const { about } = homeContent;
  return (
    <section id="about" className="about" aria-labelledby="about-title">
      <div className="about__sticky"><p className="eyebrow">01 / PROFILE</p><h1 id="about-title">{about.title}</h1></div>
      <div className="about__content">
        <p className="about__statement">{about.statement}</p>
        <dl><div><dt>Experience</dt><dd>{about.experience}</dd></div><div><dt>Availability</dt><dd>{about.availability}</dd></div></dl>
        <h2>Capabilities</h2><ul>{about.skills.map((skill) => <li key={skill}>{skill}</li>)}</ul>
        <h2>Tools</h2><p>{about.tools.join(" · ")}</p>
      </div>
    </section>
  );
}
```

```tsx
// components/home/projects-section.tsx
import { homeContent } from "@/content/home";

export function ProjectsSection() {
  return (
    <section id="projects" className="projects" aria-labelledby="projects-title">
      <p className="eyebrow">02 / SELECTED WORK</p><h2 id="projects-title">Selected projects</h2>
      <div className="project-list">{homeContent.projects.map((project) => (
        <a className="project-card" href={`/projects/${project.slug}`} key={project.slug}>
          <span className="project-card__index">{project.index}</span><div><p className="meta">{project.category}</p><h3>{project.title}</h3><p>{project.summary}</p><strong>{project.result}</strong></div><span aria-hidden="true">↗</span>
        </a>
      ))}</div>
    </section>
  );
}
```

```tsx
// components/home/contact-section.tsx
export function ContactSection() {
  return (
    <section id="contact" className="contact" aria-labelledby="contact-title">
      <p className="eyebrow">03 / CONTACT</p><h2 id="contact-title">Let’s make something human.</h2>
      <div className="contact__links"><a href="https://t.me/aattica">Telegram</a><a href="mailto:contact@aattica.cc">contact@aattica.cc</a></div>
      <form onSubmit={(event) => event.preventDefault()} aria-describedby="form-note">
        <label>Name<input name="name" required /></label><label>Reply contact<input name="contact" required /></label><label>Company<input name="company" /></label><label>Message<textarea name="message" required /></label><button type="submit">Send message</button>
      </form><p id="form-note">Frontend demonstration — Django delivery will be connected later.</p>
    </section>
  );
}
```

The form's submit handler requires `contact-section.tsx` to begin with `"use client";`.

- [ ] **Step 3: Compose the page in the required order**

Create `app/page.tsx`:

```tsx
import { AboutSection } from "@/components/home/about-section";
import { ContactSection } from "@/components/home/contact-section";
import { HeroSection } from "@/components/home/hero-section";
import { ProjectsSection } from "@/components/home/projects-section";
import { SiteHeader } from "@/components/site-header";

export default function HomePage() {
  return <><SiteHeader /><main><HeroSection /><AboutSection /><ProjectsSection /><ContactSection /></main><footer>aattica. / human-made. © 2026</footer></>;
}
```

- [ ] **Step 4: Copy the approved brand assets**

```bash
mkdir -p public/brand
cp "Frame 1.png" public/brand/aattica-bear.png
cp "Frame 2.png" public/brand/aattica-banner.png
```

- [ ] **Step 5: Run the semantic contract**

Run:

```bash
pnpm test -- tests/home-page.test.tsx
```

Expected: PASS for About/Projects order and both direct contact links.

- [ ] **Step 6: Commit the semantic page**

```bash
git add app components content public/brand tests/home-page.test.tsx
git commit -m "feat: add semantic portfolio home page"
```

---

### Task 4: Responsive static visual system

**Files:**
- Create: `app/globals.css`

**Interfaces:**
- Consumes: class names emitted by Task 3.
- Produces: the reviewable static layout that becomes the base for the separate ASCII-motion plan.

- [ ] **Step 1: Create global tokens and layout rules**

Create `app/globals.css` with:

```css
:root { color-scheme: dark; --bg:#111; --panel:#171717; --text:#f5f5f2; --muted:#929292; --line:#303030; --page:min(1180px,calc(100% - 48px)); }
* { box-sizing:border-box; }
html { scroll-behavior:smooth; background:var(--bg); }
body { margin:0; color:var(--text); background:var(--bg); font:16px/1.5 Arial,sans-serif; }
a { color:inherit; }
.site-header { position:fixed; z-index:20; inset:0 0 auto; width:var(--page); height:72px; margin:auto; display:flex; align-items:center; justify-content:space-between; }
.site-header nav { display:flex; align-items:center; gap:20px; }
.site-header a { text-decoration:none; }
.brand { font-size:24px; font-weight:700; }
.hero { position:relative; min-height:100svh; overflow:hidden; display:grid; place-items:center; isolation:isolate; }
.hero__background { object-fit:cover; z-index:-3; }
.hero__shade { position:absolute; inset:0; z-index:-2; background:radial-gradient(circle at center,transparent 0 22%,rgba(17,17,17,.25) 55%,rgba(17,17,17,.72) 100%); }
.hero__bear { width:min(62vw,620px); height:auto; mix-blend-mode:screen; }
.hero__scroll { position:absolute; bottom:32px; font-family:monospace; text-decoration:none; }
.about,.projects,.contact { width:var(--page); margin:auto; padding:120px 0; border-top:1px solid var(--line); }
.about { display:grid; grid-template-columns:minmax(240px,.8fr) minmax(0,1.2fr); gap:8vw; }
.about__sticky { position:sticky; top:120px; align-self:start; }
.about__statement { font-size:clamp(28px,4vw,52px); line-height:1.08; letter-spacing:-.04em; }
.about dl div { display:grid; grid-template-columns:140px 1fr; padding:16px 0; border-top:1px solid var(--line); }
.about dt,.eyebrow,.meta { color:var(--muted); font-family:monospace; }
.about ul { display:grid; grid-template-columns:repeat(2,1fr); gap:8px; padding:0; list-style:none; }
.projects h2,.contact h2 { font-size:clamp(40px,7vw,84px); line-height:.95; }
.project-list { display:grid; gap:16px; }
.project-card { min-height:220px; display:grid; grid-template-columns:60px 1fr auto; gap:24px; padding:28px; text-decoration:none; background:var(--panel); border:1px solid var(--line); }
.project-card:first-child { min-height:360px; align-items:end; }
.project-card:hover { border-color:var(--text); }
.project-card h3 { margin:.25em 0; font-size:clamp(30px,5vw,60px); }
.contact__links { display:flex; flex-wrap:wrap; gap:12px; margin:32px 0; }
.contact__links a,.contact button { padding:12px 16px; border:1px solid var(--text); background:transparent; color:var(--text); }
.contact form { display:grid; gap:16px; max-width:680px; }
.contact label { display:grid; gap:6px; }
.contact input,.contact textarea { padding:13px; border:1px solid var(--line); background:var(--panel); color:var(--text); font:inherit; }
.contact textarea { min-height:140px; }
footer { width:var(--page); margin:auto; padding:36px 0; color:var(--muted); border-top:1px solid var(--line); }
```

- [ ] **Step 2: Add the mobile fallback**

Append to `app/globals.css`:

```css
@media (max-width:720px) {
  :root { --page:calc(100% - 32px); }
  .site-header { align-items:flex-start; height:auto; padding:18px 0; }
  .site-header nav { gap:12px; flex-wrap:wrap; justify-content:flex-end; }
  .site-header nav a { display:none; }
  .hero__bear { width:min(92vw,520px); }
  .about,.projects,.contact { padding:80px 0; }
  .about { display:block; }
  .about__sticky { position:static; }
  .about ul { grid-template-columns:1fr; }
  .project-card { grid-template-columns:40px 1fr; }
  .project-card > :last-child { display:none; }
}

@media (prefers-reduced-motion:reduce) {
  html { scroll-behavior:auto; }
  *,*::before,*::after { animation-duration:.01ms!important; animation-iteration-count:1!important; transition-duration:.01ms!important; }
}
```

- [ ] **Step 3: Run all static checks**

Run:

```bash
pnpm test
pnpm lint
pnpm build
```

Expected: all tests pass, ESLint exits successfully, and Next.js produces a production build.

- [ ] **Step 4: Visually inspect desktop and mobile**

Run:

```bash
pnpm dev
```

Verify at 1440×900 and 390×844:

- centered bear remains fully visible;
- banner fills the viewport without layout shift;
- About is before Projects;
- sticky About works only on desktop;
- every navigation anchor lands on the correct section;
- content remains readable with reduced motion enabled.

- [ ] **Step 5: Commit the static visual baseline**

```bash
git add app/globals.css
git commit -m "feat: style static aattica home page"
```

---

### Task 5: Publish the review checkpoint

**Files:**
- Modify: `README.md`

**Interfaces:**
- Consumes: the passing static home page from Tasks 1–4.
- Produces: a documented GitHub checkpoint ready for visual feedback before the animation plan.

- [ ] **Step 1: Update the current-stage README text**

Replace the disposable-prototype status with:

```markdown
## Current stage

The repository contains the first reviewable Next.js checkpoint:

- static aattica hero using the approved bear and banner;
- prominent About section before selected projects;
- selected project summaries and direct contact paths;
- responsive desktop/mobile layout;
- automated semantic-order checks.

ASCII reveal motion, localized routes, case pages, and Django integration are intentionally deferred to later checkpoints.
```

- [ ] **Step 2: Run final verification**

Run:

```bash
pnpm test && pnpm lint && pnpm build
git status --short
```

Expected: all commands pass; only the intentional README modification remains before commit.

- [ ] **Step 3: Commit and push the checkpoint**

```bash
git add README.md
git commit -m "docs: record static home checkpoint"
git push origin main
```

- [ ] **Step 4: Stop for visual review**

Do not start the Motion/ASCII implementation. Present the desktop and mobile result to the user and collect feedback on composition, scale, spacing, and About prominence first.
