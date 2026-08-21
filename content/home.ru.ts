import type { HomeContent } from "@/content/home.types";

export const homeContentRu = {
  metadata: {
    title: "aattica. — UX/UI и продуктовый дизайнер",
    description:
      "Портфолио Даниила Гольского — UX/UI и продуктового дизайнера, который проектирует понятные сценарии, интерфейсы и готовит решения к разработке.",
    openGraphLocale: "ru_RU",
  },
  navigation: {
    ariaLabel: "Основная навигация",
    items: [
      { href: "#about", label: "Обо мне" },
      { href: "#projects", label: "Проекты" },
      { href: "#contact", label: "Контакты" },
    ],
    switchLabel: "Переключить на английский",
    switchText: "EN",
  },
  hero: {
    ariaLabel: "Знакомство с aattica",
    bearLabel: "ASCII-логотип aattica с медведем",
    wordmarkLabel: "aattica. // human-made.",
    eyebrow: "ux/ui designer",
    scrollLabel: "Листайте, чтобы познакомиться",
  },
  about: {
    eyebrow: "01 / ПРОФИЛЬ",
    title: "Обо мне",
    statement:
      "Проектирую понятные цифровые продукты — от постановки задачи и исследования до пользовательских сценариев, готового интерфейса и передачи в разработку.",
    introduction:
      "Я Даниил Гольский, UX/UI и продуктовый дизайнер с опытом 2 года. Превращаю сложные сценарии в интерфейсы, которые легко понять и использовать.",
    approachTitle: "Как я работаю",
    approach:
      "Начинаю с задачи и её контекста, собираю важные сценарии, проверяю логику взаимодействия и затем развиваю визуальную систему. На протяжении процесса учитываю реализацию и готовлю понятные материалы для передачи разработчику.",
    facts: [
      { label: "Опыт", value: "2 года" },
      { label: "Языки", value: "Русский — родной, английский — B2" },
      { label: "Формат", value: "Удалённо и фриланс" },
      { label: "Фокус", value: "UX/UI и продуктовый дизайн" },
    ],
    capabilitiesTitle: "Компетенции",
    capabilities: [
      "UX-исследования",
      "Пользовательские сценарии",
      "Дизайн интерфейсов",
      "Прототипирование",
      "Адаптивный дизайн",
      "Компоненты и дизайн-системы",
      "Передача в разработку",
    ],
    toolsTitle: "Инструменты",
    tools: [
      "Figma",
      "ProtoPie",
      "Adobe Illustrator",
      "Blender",
      "React",
      "HTML/CSS/JS",
    ],
    resumesTitle: "Резюме",
    resumes: ["Резюме RU — скоро", "Резюме EN — скоро"],
  },
  projects: {
    eyebrow: "02 / ИЗБРАННЫЕ РАБОТЫ",
    title: "Избранные проекты",
    statusLabel: "Скоро",
    items: [
      {
        slug: "drivee",
        status: "published",
        index: "01",
        title: "Drivee Peak",
        category: "Продуктовый дизайн · Хакатон",
        summary:
          "Рекомендация цены и автоматизированный выбор водителя внутри экосистемы Drivee.",
        result: "Награда Best App Design",
        openLabel: "Открыть кейс Drivee Peak",
      },
      {
        slug: "chestnopro",
        status: "coming-soon",
        index: "02",
        title: "ЧестноПро",
        category: "Брендинг · Реальный бизнес",
        summary:
          "Нейминг, айдентика и информационные материалы для сервисного центра.",
        result: "Визитки и информационный стенд реализованы",
        openLabel: "Открыть кейс ЧестноПро",
      },
      {
        slug: "atlanta-vpn",
        status: "coming-soon",
        index: "03",
        title: "Atlanta VPN",
        category: "iOS · Индивидуальный концепт",
        summary:
          "Чистый сценарий от запуска приложения до подключения через выбор локации.",
        result: "Конкурсная презентация и прототип",
        openLabel: "Открыть кейс Atlanta VPN",
      },
    ],
  },
  contact: {
    eyebrow: "03 / КОНТАКТЫ",
    title: "Давайте сделаем что-то человеческое.",
    formLabel: "Форма обратной связи",
    fields: {
      name: "Имя",
      replyContact: "Контакт для ответа",
      company: "Компания",
      message: "Сообщение",
    },
    sendLabel: "Отправить сообщение",
    note: "Демонстрация фронтенда — сообщения пока не доставляются.",
    submittedStatus:
      "Демо отправлено — доставка через Django будет подключена позже.",
  },
  footer: "aattica. // human-made. © 2026",
} satisfies HomeContent;
