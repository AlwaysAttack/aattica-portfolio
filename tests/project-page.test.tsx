import { render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

const { notFoundSpy } = vi.hoisted(() => ({
  notFoundSpy: vi.fn(() => {
    throw new Error("not-found");
  }),
}));

vi.mock("next/navigation", () => ({ notFound: notFoundSpy }));

import {
  LocalizedProjectPage,
  dynamicParams,
  generateMetadata,
  generateStaticParams,
} from "@/app/[lang]/projects/[slug]/page";
import ProjectPage from "@/app/[lang]/projects/[slug]/page";
import { getProjectContent } from "@/content/projects";

const originalSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;

afterEach(() => {
  if (originalSiteUrl === undefined) {
    delete process.env.NEXT_PUBLIC_SITE_URL;
  } else {
    process.env.NEXT_PUBLIC_SITE_URL = originalSiteUrl;
  }
  notFoundSpy.mockClear();
});

describe("localized Drivee case page", () => {
  it("renders the English employer-facing case as a semantic document", () => {
    render(<LocalizedProjectPage locale="en" content={getProjectContent("en", "drivee")} />);

    expect(screen.getByRole("article")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1, name: "Drivee Peak" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "Research" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "My role" })).toBeInTheDocument();
    expect(screen.getByText(/direct interviews/i)).toBeInTheDocument();
    expect(screen.getByText(/Figma screens/i)).toBeInTheDocument();
    expect(screen.getByText("Best App Design")).toBeInTheDocument();
    expect(screen.getAllByText(/not commercially launched or sold/i)).not.toHaveLength(0);
    const hero = screen.getByRole("heading", { level: 1, name: "Drivee Peak" }).closest("section");
    expect(hero).not.toBeNull();
    expect(within(hero!).getByText("Awarded concept; not commercially launched or sold.")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "Outcome" })).toBeInTheDocument();
    expect(within(screen.getByRole("banner")).getByRole("link", { name: "Back to selected projects" })).toHaveAttribute(
      "href",
      "/en#projects",
    );
    expect(within(screen.getByRole("banner")).getByRole("link", { name: "Read in Russian" })).toHaveAttribute(
      "href",
      "/ru/projects/drivee",
    );
    expect(screen.getByRole("link", { name: "Get in touch" })).toHaveAttribute(
      "href",
      "/en#contact",
    );
    expect(within(screen.getByRole("article")).getByRole("link", { name: "Back to selected projects" })).toHaveAttribute(
      "href",
      "/en#projects",
    );
  });

  it("renders the Russian case with its localized navigation and evidence", () => {
    render(<LocalizedProjectPage locale="ru" content={getProjectContent("ru", "drivee")} />);

    expect(screen.getByRole("heading", { level: 1, name: "Drivee Peak" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "Исследование" })).toBeInTheDocument();
    expect(screen.getByText(/прямые интервью/i)).toBeInTheDocument();
    expect(screen.getByText("Лучший дизайн приложения")).toBeInTheDocument();
    expect(screen.getAllByText(/не был коммерчески запущен или продан/i)).not.toHaveLength(0);
    expect(within(screen.getByRole("banner")).getByRole("link", { name: "К избранным проектам" })).toHaveAttribute(
      "href",
      "/ru#projects",
    );
    expect(within(screen.getByRole("banner")).getByRole("link", { name: "Read in English" })).toHaveAttribute(
      "href",
      "/en/projects/drivee",
    );
    expect(screen.getByRole("link", { name: "Связаться" })).toHaveAttribute(
      "href",
      "/ru#contact",
    );
    expect(screen.getByRole("heading", { level: 2, name: "Результат" })).toBeInTheDocument();
  });

  it("renders all original slides with their intrinsic dimensions", () => {
    render(<LocalizedProjectPage locale="en" content={getProjectContent("en", "drivee")} />);

    const presentation = screen.getByRole("region", { name: "Original presentation" });
    const slides = within(presentation).getAllByRole("img");

    expect(slides).toHaveLength(19);
    slides.forEach((slide, index) => {
      expect(slide).toHaveAttribute("alt", expect.stringMatching(/.+/));
      expect(slide).toHaveAttribute("width", "3840");
      expect(slide).toHaveAttribute("height", "2160");
      expect(slide.getAttribute("src")).toContain(
        encodeURIComponent(`/cases/drivee/slides/slide-${String(index + 1).padStart(2, "0")}.png`),
      );
    });
  });

  it("generates only published child slugs beneath each localized parent route", () => {
    expect(dynamicParams).toBe(false);
    expect(generateStaticParams()).toEqual([{ slug: "drivee" }]);
  });

  it("publishes localized canonical metadata and direct language alternates", async () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://aattica.cc";

    const metadata = await generateMetadata({
      params: Promise.resolve({ lang: "en", slug: "drivee" }),
    });

    expect(metadata.alternates).toEqual({
      canonical: "https://aattica.cc/en/projects/drivee",
      languages: {
        en: "https://aattica.cc/en/projects/drivee",
        ru: "https://aattica.cc/ru/projects/drivee",
      },
    });
  });

  it("returns a 404 before accessing content for invalid locales or slugs", async () => {
    await expect(
      ProjectPage({ params: Promise.resolve({ lang: "de", slug: "drivee" }) }),
    ).rejects.toThrow("not-found");
    expect(notFoundSpy).toHaveBeenCalledTimes(1);

    notFoundSpy.mockClear();
    await expect(
      generateMetadata({ params: Promise.resolve({ lang: "en", slug: "atlanta-vpn" }) }),
    ).rejects.toThrow("not-found");
    expect(notFoundSpy).toHaveBeenCalledTimes(1);
  });
});
