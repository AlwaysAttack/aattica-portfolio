import { describe, expect, it } from "vitest";
import { isLocale, selectLocale } from "@/lib/i18n";

describe("locale selection", () => {
  it("accepts only the two published locale segments", () => {
    expect(isLocale("en")).toBe(true);
    expect(isLocale("ru")).toBe(true);
    expect(isLocale("en-US")).toBe(false);
    expect(isLocale("de")).toBe(false);
  });

  it("selects the highest-priority supported browser language", () => {
    expect(
      selectLocale("de-DE,de;q=0.9,ru;q=0.8,en;q=0.7"),
    ).toBe("ru");
    expect(selectLocale("ru;q=0.4,en-US;q=0.9")).toBe("en");
    expect(selectLocale("ru-RU,ru;q=0.9,en;q=0.7")).toBe("ru");
  });

  it("falls back to English for missing or unusable headers", () => {
    expect(selectLocale(null)).toBe("en");
    expect(selectLocale("")).toBe("en");
    expect(selectLocale("de-DE,*;q=0.8" )).toBe("en");
    expect(selectLocale("ru;q=nope,en;q=0.5")).toBe("en");
  });
});
