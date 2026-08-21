import { afterEach, describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";
import { generateMetadata } from "@/app/[lang]/page";
import { getSiteUrl } from "@/lib/site";

const originalSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;

afterEach(() => {
  if (originalSiteUrl === undefined) {
    delete process.env.NEXT_PUBLIC_SITE_URL;
  } else {
    process.env.NEXT_PUBLIC_SITE_URL = originalSiteUrl;
  }
});

describe("localized metadata", () => {
  it("publishes English canonical and language alternates", async () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://aattica.cc/";

    const metadata = await generateMetadata({
      params: Promise.resolve({ lang: "en" }),
    });

    expect(metadata.title).toBe("aattica. — UX/UI & Product Designer");
    expect(metadata.alternates).toEqual({
      canonical: "https://aattica.cc/en",
      languages: {
        en: "https://aattica.cc/en",
        ru: "https://aattica.cc/ru",
        "x-default": "https://aattica.cc/",
      },
    });
    expect(metadata.openGraph).toMatchObject({
      locale: "en_US",
      alternateLocale: ["ru_RU"],
      url: "https://aattica.cc/en",
    });
  });

  it("publishes Russian canonical and language alternates", async () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://aattica.cc";

    const metadata = await generateMetadata({
      params: Promise.resolve({ lang: "ru" }),
    });

    expect(metadata.title).toBe("aattica. — UX/UI и продуктовый дизайнер");
    expect(metadata.alternates?.canonical).toBe("https://aattica.cc/ru");
    expect(metadata.openGraph).toMatchObject({
      locale: "ru_RU",
      alternateLocale: ["en_US"],
      url: "https://aattica.cc/ru",
    });
  });

  it("lists the localized home pages and published Drivee case pages", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://aattica.cc";

    expect(sitemap()).toEqual([
      {
        url: "https://aattica.cc/en",
        changeFrequency: "monthly",
        priority: 1,
      },
      {
        url: "https://aattica.cc/ru",
        changeFrequency: "monthly",
        priority: 1,
      },
      {
        url: "https://aattica.cc/en/projects/drivee",
        changeFrequency: "monthly",
        priority: 0.8,
      },
      {
        url: "https://aattica.cc/ru/projects/drivee",
        changeFrequency: "monthly",
        priority: 0.8,
      },
    ]);
  });

  it("rejects a non-http production origin", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "javascript:alert(1)";

    expect(() => getSiteUrl()).toThrow("NEXT_PUBLIC_SITE_URL");
  });

  it("never publishes localhost as the production fallback", () => {
    expect(getSiteUrl(undefined, "production").toString()).toBe(
      "https://aattica.cc/",
    );
    expect(getSiteUrl(undefined, "development").toString()).toBe(
      "http://localhost:3000/",
    );
  });
});
