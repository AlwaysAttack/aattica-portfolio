import { NextRequest } from "next/server";
import { describe, expect, it } from "vitest";
import { GET } from "@/app/api/locale/[lang]/route";
import { proxy } from "@/proxy";

describe("root locale redirect", () => {
  it("uses the browser language when no preference has been saved", () => {
    const response = proxy(
      new NextRequest("https://aattica.cc/", {
        headers: { "accept-language": "ru-RU,ru;q=0.9,en;q=0.7" },
      }),
    );

    expect(response.headers.get("location")).toBe("https://aattica.cc/ru");
  });

  it("gives a valid locale cookie precedence over the browser", () => {
    const response = proxy(
      new NextRequest("https://aattica.cc/", {
        headers: {
          "accept-language": "ru-RU,ru;q=0.9",
          cookie: "locale=en",
        },
      }),
    );

    expect(response.headers.get("location")).toBe("https://aattica.cc/en");
  });

  it("ignores invalid cookies and falls back to English", () => {
    const response = proxy(
      new NextRequest("https://aattica.cc/", {
        headers: { cookie: "locale=de" },
      }),
    );

    expect(response.headers.get("location")).toBe("https://aattica.cc/en");
  });
});

describe("manual locale endpoint", () => {
  it("stores only the selected locale and redirects to its fixed route", async () => {
    const response = await GET(
      new NextRequest("https://aattica.cc/api/locale/ru?next=https://bad.test"),
      { params: Promise.resolve({ lang: "ru" }) },
    );

    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toBe("https://aattica.cc/ru");
    expect(response.headers.get("set-cookie")).toContain("locale=ru");
    expect(response.headers.get("set-cookie")).toContain("Path=/");
    expect(response.headers.get("set-cookie")).toContain("Max-Age=15811200");
    expect(response.headers.get("set-cookie")).toContain("HttpOnly");
    expect(response.headers.get("set-cookie")).toContain("SameSite=lax");
  });

  it("returns 404 for an unsupported locale", async () => {
    const response = await GET(
      new NextRequest("https://aattica.cc/api/locale/de"),
      { params: Promise.resolve({ lang: "de" }) },
    );

    expect(response.status).toBe(404);
    expect(response.headers.get("location")).toBeNull();
    expect(response.headers.get("set-cookie")).toBeNull();
  });
});
