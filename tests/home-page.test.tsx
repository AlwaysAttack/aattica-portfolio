import { fireEvent, render, screen } from "@testing-library/react";
import type { ImgHTMLAttributes } from "react";
import { describe, expect, it, vi } from "vitest";
import HomePage from "@/app/page";

vi.mock("next/image", () => ({
  default: ({
    fill: _fill,
    priority: _priority,
    alt,
    ...props
  }: ImgHTMLAttributes<HTMLImageElement> & {
    fill?: boolean;
    priority?: boolean;
  }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img alt={alt ?? ""} {...props} />
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

  it("shows the approved bear mark in the introduction", () => {
    render(<HomePage />);

    expect(screen.getByRole("img", { name: "aattica bear mark" })).toBeInTheDocument();
  });

  it("explains that form submission is a frontend demonstration", () => {
    render(<HomePage />);

    fireEvent.submit(screen.getByRole("form", { name: "Contact form" }));

    expect(screen.getByRole("status")).toHaveTextContent(
      "Demo submitted — Django delivery will be connected later.",
    );
  });
});
