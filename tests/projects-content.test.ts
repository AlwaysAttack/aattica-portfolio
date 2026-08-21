import { describe, expect, it } from "vitest";

import {
  PUBLISHED_PROJECT_SLUGS,
  getProjectContent,
  getProjectStaticParams,
  isPublishedProjectSlug,
} from "@/content/projects";
import type { Locale } from "@/lib/i18n";

const factExpectations: Record<
  Locale,
  {
    hero: RegExp[];
    context: RegExp[];
    problem: RegExp[];
    research: RegExp[];
    role: RegExp[];
    process: RegExp[];
    solution: RegExp[];
    delivered: RegExp[];
    outcome: RegExp[];
    limitations: RegExp[];
  }
> = {
  en: {
    hero: [/taxi price agreement/i, /passengers and drivers/i],
    context: [/price-agreement experience/i],
    problem: [/slow and opaque/i, /control/i],
    research: [/direct interviews/i, /competitor sites and solutions/i],
    role: [/guideline/i, /Figma screens/i, /presentation/i],
    process: [/driver-side flow and CJM/i, /without access to Drivee's private driver-order interface/i, /cancellation/i, /price changes/i, /driver search/i, /counteroffers/i, /established interaction patterns/i],
    solution: [/price recommendation/i, /comparable driver responses/i, /optional automated driver selection/i, /manual choice/i],
    delivered: [/teammate/i, /marketplace orders/i, /public external sources/i, /team.*React Native/i],
    outcome: [/Best App Design/i, /not commercially launched or sold/i],
    limitations: [/not a production rollout/i, /no launch, revenue, conversion, or adoption metrics/i],
  },
  ru: {
    hero: [/согласовани.*цен/i, /пассажир.*водител/i],
    context: [/согласование цены/i],
    problem: [/медленным и непрозрачным/i, /контрол/i],
    research: [/прямые интервью/i, /сайты и решения конкурентов/i],
    role: [/гайдлайн/i, /Figma/i, /презентаци/i],
    process: [/водительский сценарий и CJM/i, /без доступа к приватному интерфейсу/i, /отмен/i, /изменение цены/i, /поиск водителя/i, /встречн.*предложен/i, /общепринятых паттернов взаимодействия/i],
    solution: [/рекомендация цены/i, /ответы водителей/i, /автоматический выбор водителя/i, /ручной выбор/i],
    delivered: [/разработчик в команде/i, /заказах маркетплейса/i, /публичных внешних источниках/i, /команда.*React Native/i],
    outcome: [/Лучший дизайн приложения/i, /не был коммерчески запущен или продан/i],
    limitations: [/не запуск в продакшене/i, /Метрик запуска, выручки, конверсии или внедрения нет/i],
  },
};

const slideAltExpectations: Record<Locale, readonly RegExp[]> = {
  en: [
    /Peak logo over a city map/i,
    /best price/i,
    /hackathon project format/i,
    /service problem/i,
    /Drivee price-offer problem/i,
    /faster.*clearer price agreement/i,
    /solution exploration/i,
    /passenger journey/i,
    /price recommendation beside manual input/i,
    /comparing driver offers/i,
    /automatic driver selection/i,
    /driver journey.*counteroffer/i,
    /automation.*manual control/i,
    /five passenger search steps/i,
    /driver accepts or counteroffers/i,
    /price decision.*passenger choice/i,
    /Peak onboarding and state screens/i,
    /choice for both sides/i,
    /aattica closing card/i,
  ],
  ru: [
    /логотип Peak на карте города/i,
    /поиск лучшей цены/i,
    /формат хакатон-проекта/i,
    /проблематика сервиса/i,
    /проблема предложений цены Drivee/i,
    /быстрое и понятное согласование цены/i,
    /углубление в решение/i,
    /путь пассажира/i,
    /рекомендация цены рядом с ручным вводом/i,
    /сравнение предложений водителей/i,
    /автовыбор водителя/i,
    /путь водителя.*встречн.*предложен/i,
    /автоматизация.*ручной контроль/i,
    /пять шагов поиска пассажира/i,
    /водитель принимает заказ или предлагает цену/i,
    /выбор цены.*пассажир/i,
    /онбординг Peak и экраны состояний/i,
    /выбор обеих сторон/i,
    /финальная карточка aattica/i,
  ],
};

describe("published project content", () => {
  it("publishes only the Drivee case and generates its two localized routes", () => {
    expect(PUBLISHED_PROJECT_SLUGS).toEqual(["drivee"]);
    expect(isPublishedProjectSlug("drivee")).toBe(true);
    expect(isPublishedProjectSlug("atlanta-vpn")).toBe(false);
    expect(getProjectStaticParams()).toEqual([
      { lang: "en", slug: "drivee" },
      { lang: "ru", slug: "drivee" },
    ]);
  });

  it.each(["en", "ru"] as const)("provides every confirmed Drivee fact group in %s", (locale) => {
    const content = getProjectContent(locale, "drivee");
    const expected = factExpectations[locale];

    expect(content.slug).toBe("drivee");
    expected.hero.forEach((pattern) => expect(content.hero.valueProposition).toMatch(pattern));
    expected.context.forEach((pattern) => expect(content.context.body).toMatch(pattern));
    expected.problem.forEach((pattern) => expect(content.problem.body).toMatch(pattern));
    expected.research.forEach((pattern) => expect(content.research.body).toMatch(pattern));
    expected.role.forEach((pattern) => expect(content.role.body).toMatch(pattern));
    expected.process.forEach((pattern) => expect(content.process.body).toMatch(pattern));
    expected.solution.forEach((pattern) =>
      expect(`${content.solution.body} ${content.solution.principles.join(" ")}`).toMatch(pattern),
    );
    expected.delivered.forEach((pattern) =>
      expect(`${content.delivered.body} ${content.delivered.uiImplementation}`).toMatch(pattern),
    );
    expected.outcome.forEach((pattern) => expect(content.outcome.body).toMatch(pattern));
    expected.limitations.forEach((pattern) => expect(content.limitations.body).toMatch(pattern));
  });

  it.each(["en", "ru"] as const)("gives each ordered presentation visual a localized description in %s", (locale) => {
    const slides = getProjectContent(locale, "drivee").slides;

    expect(slides).toHaveLength(19);
    expect(slides.map((slide) => slide.src)).toEqual(
      Array.from(
        { length: 19 },
        (_, index) => `/cases/drivee/slides/slide-${String(index + 1).padStart(2, "0")}.png`,
      ),
    );
    expect(slides.every((slide) => slide.width === 3840 && slide.height === 2160)).toBe(true);
    expect(slideAltExpectations[locale]).toHaveLength(slides.length);
    slides.forEach((slide, index) => {
      expect(slide.alt).toMatch(slideAltExpectations[locale][index]);
      expect(slide.alt).not.toMatch(/presentation slide \d+|слайд \d+ презентации/i);
    });
  });
});
