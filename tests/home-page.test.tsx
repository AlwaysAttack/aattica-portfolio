import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HomePage from "@/app/page";

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
    expect(
      screen.getByRole("link", { name: "contact@aattica.cc" }),
    ).toHaveAttribute("href", "mailto:contact@aattica.cc");
  });

  it("links navigation to About, Projects and Contact", () => {
    render(<HomePage />);

    const navigation = screen.getByRole("navigation", { name: "Primary navigation" });

    expect(screen.getByRole("link", { name: "About" })).toHaveAttribute("href", "#about");
    expect(screen.getByRole("link", { name: "Projects" })).toHaveAttribute("href", "#projects");
    expect(screen.getByRole("link", { name: "Contact" })).toHaveAttribute("href", "#contact");
    expect(navigation).toBeInTheDocument();
  });

  it("shows the approved bear as raster-free accessible ASCII art", () => {
    render(<HomePage />);

    expect(screen.getByText("aattica bear mark")).toBeInTheDocument();
    expect(
      screen.queryByRole("img", { name: "aattica bear mark" }),
    ).not.toBeInTheDocument();
    expect(screen.getAllByTestId("ascii-scramble-layer")).toHaveLength(5);
    for (const layer of screen.getAllByTestId("ascii-scramble-layer")) {
      expect(layer).toHaveAttribute("aria-hidden", "true");
    }
  });

  it("renders native hero wordmarks without the Frame 2 PNG", () => {
    render(<HomePage />);

    expect(
      screen.getByLabelText("aattica. // human-made."),
    ).toBeInTheDocument();
    expect(screen.getByTestId("ascii-hero-background")).toBeInTheDocument();
    expect(
      document.querySelector('img[src*="aattica-banner.png"]'),
    ).not.toBeInTheDocument();
  });

  it("uses the role label instead of repeating the main hero wordmark", () => {
    render(<HomePage />);

    expect(screen.getByText("ux/ui designer")).toBeInTheDocument();
    expect(screen.queryByText("aattica. / human-made.")).not.toBeInTheDocument();
    expect(
      screen.getByLabelText("aattica. // human-made."),
    ).toBeInTheDocument();
  });

  it("explains that form submission is a frontend demonstration", () => {
    render(<HomePage />);

    fireEvent.submit(screen.getByRole("form", { name: "Contact form" }));

    expect(screen.getByRole("status")).toHaveTextContent(
      "Demo submitted — Django delivery will be connected later.",
    );
  });
});
