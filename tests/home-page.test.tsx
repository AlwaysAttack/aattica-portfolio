import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { LocalizedHomePage } from "@/app/[lang]/page";
import { getHomeContent } from "@/content/home";

describe("localized home page", () => {
  it("renders the complete English employer journey", () => {
    render(<LocalizedHomePage locale="en" content={getHomeContent("en")} />);

    const navigation = screen.getByRole("navigation", {
      name: "Primary navigation",
    });
    expect(within(navigation).getByRole("link", { name: "About" })).toHaveAttribute(
      "href",
      "#about",
    );
    expect(
      within(navigation).getByRole("link", { name: "Switch to Russian" }),
    ).toHaveAttribute("href", "/api/locale/ru");

    const about = screen.getByRole("region", { name: "About me" });
    const projects = screen.getByRole("region", { name: "Selected projects" });
    expect(about.compareDocumentPosition(projects)).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING,
    );
    expect(within(about).getByText("2 years")).toBeInTheDocument();
    expect(
      within(about).getByText("Russian native, English B2"),
    ).toBeInTheDocument();
    expect(within(about).getByText("How I work")).toBeInTheDocument();
    expect(within(about).getByText("Capabilities")).toBeInTheDocument();
    expect(within(about).getByText("Tools")).toBeInTheDocument();
    expect(within(about).getAllByText(/coming soon/i)).toHaveLength(2);
    for (const resume of within(about).getAllByText(/coming soon/i)) {
      expect(resume).toHaveAttribute("aria-disabled", "true");
    }

    expect(
      within(projects).getByRole("link", { name: /Drivee Peak/ }),
    ).toHaveAttribute("href", "/en/projects/drivee");
    expect(within(projects).getAllByRole("heading", { level: 3 }).map((heading) => heading.textContent)).toEqual([
      "Drivee Peak",
      "ЧестноПро",
      "Atlanta VPN",
    ]);
    expect(within(projects).getAllByText("Coming soon")).toHaveLength(2);
    expect(within(projects).queryByRole("link", { name: "Open ЧестноПро case study" })).not.toBeInTheDocument();
    expect(within(projects).queryByRole("link", { name: "Open Atlanta VPN case study" })).not.toBeInTheDocument();
    expect(screen.getByText("aattica bear mark")).toBeInTheDocument();
    expect(screen.getAllByTestId("ascii-scramble-layer")).toHaveLength(5);

    fireEvent.submit(screen.getByRole("form", { name: "Contact form" }));
    expect(screen.getByRole("status")).toHaveTextContent(
      "Demo submitted — Django delivery will be connected later.",
    );
  });

  it("renders the complete Russian employer journey", () => {
    render(<LocalizedHomePage locale="ru" content={getHomeContent("ru")} />);

    const navigation = screen.getByRole("navigation", {
      name: "Основная навигация",
    });
    expect(
      within(navigation).getByRole("link", { name: "Обо мне" }),
    ).toHaveAttribute("href", "#about");
    expect(
      within(navigation).getByRole("link", {
        name: "Переключить на английский",
      }),
    ).toHaveAttribute("href", "/api/locale/en");

    const about = screen.getByRole("region", { name: "Обо мне" });
    const projects = screen.getByRole("region", { name: "Избранные проекты" });
    expect(about.compareDocumentPosition(projects)).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING,
    );
    expect(within(about).getByText("2 года")).toBeInTheDocument();
    expect(
      within(about).getByText("Русский — родной, английский — B2"),
    ).toBeInTheDocument();
    expect(within(about).getByText("Как я работаю")).toBeInTheDocument();
    expect(within(about).getByText("Компетенции")).toBeInTheDocument();
    expect(within(about).getByText("Инструменты")).toBeInTheDocument();
    expect(within(about).getAllByText(/скоро/i)).toHaveLength(2);
    for (const resume of within(about).getAllByText(/скоро/i)) {
      expect(resume).toHaveAttribute("aria-disabled", "true");
    }

    expect(
      within(projects).getByRole("link", { name: /Drivee Peak/ }),
    ).toHaveAttribute("href", "/ru/projects/drivee");
    expect(within(projects).getAllByRole("heading", { level: 3 }).map((heading) => heading.textContent)).toEqual([
      "Drivee Peak",
      "ЧестноПро",
      "Atlanta VPN",
    ]);
    expect(within(projects).getAllByText("Скоро")).toHaveLength(2);
    expect(within(projects).queryByRole("link", { name: "Открыть кейс ЧестноПро" })).not.toBeInTheDocument();
    expect(within(projects).queryByRole("link", { name: "Открыть кейс Atlanta VPN" })).not.toBeInTheDocument();
    expect(
      screen.getByText("ASCII-логотип aattica с медведем"),
    ).toBeInTheDocument();

    fireEvent.submit(
      screen.getByRole("form", { name: "Форма обратной связи" }),
    );
    expect(screen.getByRole("status")).toHaveTextContent(
      "Демо отправлено — доставка через Django будет подключена позже.",
    );
  });

  it("keeps the hero raster-free in both languages", () => {
    render(<LocalizedHomePage locale="en" content={getHomeContent("en")} />);

    expect(
      screen.getByLabelText("aattica. // human-made."),
    ).toBeInTheDocument();
    expect(screen.getByTestId("ascii-hero-background")).toBeInTheDocument();
    expect(
      document.querySelector('img[src*="aattica-banner.png"]'),
    ).not.toBeInTheDocument();
  });
});
