import { act, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const { replaySpy, scrambleOptions } = vi.hoisted(() => ({
  replaySpy: vi.fn(),
  scrambleOptions: [] as Array<Record<string, unknown>>,
}));

vi.mock("use-scramble", () => ({
  useScramble: (options: Record<string, unknown>) => {
    scrambleOptions.push(options);
    return { ref: { current: null }, replay: replaySpy };
  },
}));

import { ProjectReveal, ProjectScrambleText } from "@/components/projects/project-motion";

describe("project motion", () => {
  beforeEach(() => {
    replaySpy.mockClear();
    scrambleOptions.length = 0;
  });

  it("keeps revealed content readable when motion is reduced", async () => {
    render(
      <ProjectReveal reducedMotion>
        <p>Readable project evidence</p>
      </ProjectReveal>,
    );

    expect(screen.getByText("Readable project evidence")).toBeVisible();
    expect(screen.getByTestId("project-reveal")).toHaveAttribute("data-reveal-visible", "true");
  });

  it("reveals a block when it enters the viewport", async () => {
    let intersectionCallback: IntersectionObserverCallback | undefined;
    const observe = vi.fn();
    const disconnect = vi.fn();

    vi.stubGlobal(
      "IntersectionObserver",
      class {
        constructor(callback: IntersectionObserverCallback) {
          intersectionCallback = callback;
        }
        observe = observe;
        disconnect = disconnect;
        unobserve = vi.fn();
        takeRecords = vi.fn(() => []);
        root = null;
        rootMargin = "0px";
        thresholds = [];
      },
    );

    render(
      <ProjectReveal reducedMotion={false}>
        <p>Animated evidence</p>
      </ProjectReveal>,
    );

    expect(observe).toHaveBeenCalledOnce();
    expect(screen.getByTestId("project-reveal")).toHaveAttribute("data-reveal-visible", "false");

    act(() => {
      intersectionCallback?.([{ isIntersecting: true } as IntersectionObserverEntry], {} as IntersectionObserver);
    });

    expect(screen.getByTestId("project-reveal")).toHaveAttribute("data-reveal-visible", "true");
    expect(disconnect).toHaveBeenCalledOnce();
    vi.unstubAllGlobals();
  });

  it("uses a restrained scramble treatment and preserves the accessible label", () => {
    render(<ProjectScrambleText text="Drivee Peak" reducedMotion={false} />);

    expect(screen.getByText("Drivee Peak")).toHaveAttribute("aria-label", "Drivee Peak");
    expect(scrambleOptions.at(-1)).toMatchObject({
      text: "Drivee Peak",
      playOnMount: false,
      overdrive: false,
      overflow: false,
    });
    expect(replaySpy).toHaveBeenCalledOnce();
  });
});
