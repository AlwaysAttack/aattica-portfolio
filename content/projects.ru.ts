import type { ProjectContent, ProjectSlide } from "@/content/projects.types";

const slides: readonly ProjectSlide[] = [
  { src: "/cases/drivee/slides/slide-01.png", alt: "Логотип Peak на карте города", width: 3840, height: 2160 },
  { src: "/cases/drivee/slides/slide-02.png", alt: "Титульный экран Drivee Peak: поиск лучшей цены", width: 3840, height: 2160 },
  { src: "/cases/drivee/slides/slide-03.png", alt: "Формат хакатон-проекта и роли команды", width: 3840, height: 2160 },
  { src: "/cases/drivee/slides/slide-04.png", alt: "Раздел проблематика сервиса", width: 3840, height: 2160 },
  { src: "/cases/drivee/slides/slide-05.png", alt: "Проблема предложений цены Drivee для пассажиров и водителей", width: 3840, height: 2160 },
  { src: "/cases/drivee/slides/slide-06.png", alt: "Цель: быстрое и понятное согласование цены между пассажиром и водителем", width: 3840, height: 2160 },
  { src: "/cases/drivee/slides/slide-07.png", alt: "Раздел углубление в решение", width: 3840, height: 2160 },
  { src: "/cases/drivee/slides/slide-08.png", alt: "Путь пассажира от маршрута до найденного водителя", width: 3840, height: 2160 },
  { src: "/cases/drivee/slides/slide-09.png", alt: "Рекомендация цены рядом с ручным вводом на экране пассажира", width: 3840, height: 2160 },
  { src: "/cases/drivee/slides/slide-10.png", alt: "Сравнение предложений водителей и цен на экране пассажира", width: 3840, height: 2160 },
  { src: "/cases/drivee/slides/slide-11.png", alt: "Автовыбор водителя с возможностью отключения", width: 3840, height: 2160 },
  { src: "/cases/drivee/slides/slide-12.png", alt: "Путь водителя от ленты заказов до встречного предложения", width: 3840, height: 2160 },
  { src: "/cases/drivee/slides/slide-13.png", alt: "Автоматизация помогает, но сохраняет ручной контроль", width: 3840, height: 2160 },
  { src: "/cases/drivee/slides/slide-14.png", alt: "Пять шагов поиска пассажира на мобильных экранах", width: 3840, height: 2160 },
  { src: "/cases/drivee/slides/slide-15.png", alt: "Водитель принимает заказ или предлагает цену на одном экране", width: 3840, height: 2160 },
  { src: "/cases/drivee/slides/slide-16.png", alt: "Выбор цены с сохранением решения пассажира", width: 3840, height: 2160 },
  { src: "/cases/drivee/slides/slide-17.png", alt: "Онбординг Peak и экраны состояний", width: 3840, height: 2160 },
  { src: "/cases/drivee/slides/slide-18.png", alt: "Финальное заявление Peak: выбор обеих сторон", width: 3840, height: 2160 },
  { src: "/cases/drivee/slides/slide-19.png", alt: "Финальная карточка aattica", width: 3840, height: 2160 },
];

export const driveeContentRu = {
  slug: "drivee",
  navigation: {
    backToProjects: "К избранным проектам",
    switchLocale: "Read in English",
    presentation: "Оригинальная презентация",
    contact: "Связаться",
    contactEyebrow: "ДАЛЬШЕ / КОНТАКТ",
    contactPrompt: "Есть вакансия, продукт или идея для сотрудничества? Давайте обсудим.",
  },
  hero: {
    title: "Drivee Peak",
    valueProposition:
      "Концепт для хакатона, который делает согласование цены поездки быстрее и понятнее, сохраняя выбор у пассажиров и водителей.",
    award: "Лучший дизайн приложения",
    role: "UX/UI-дизайнер",
    format: "Командный хакатон-проект",
    outcome: "Отмеченный наградой концепт; не был коммерчески запущен или продан.",
  },
  context: {
    title: "Контекст",
    body: "Drivee Peak исследовал, как сделать согласование цены в сервисе поездок понятнее.",
  },
  problem: {
    title: "Проблема",
    body: "Согласование цены может быть медленным и непрозрачным. Концепт делает решение понятнее, не отнимая контроль у обеих сторон.",
  },
  research: {
    title: "Исследование",
    body: "Команда провела прямые интервью и проанализировала сайты и решения конкурентов, чтобы опереться на знакомые паттерны принятия решения.",
  },
  role: {
    title: "Моя роль",
    body: "Я создал гайдлайн, UX/UI, экраны в Figma и презентацию. Также я восстановил водительский сценарий и CJM без доступа к приватному интерфейсу заказов Drivee для водителей.",
  },
  process: {
    title: "Процесс",
    body: "Водительский сценарий и CJM восстановлены без доступа к приватному интерфейсу заказов Drivee для водителей. Они включают отмену, изменение цены, поиск водителя, встречные предложения и связанные состояния, собранные на основе общепринятых паттернов взаимодействия.",
  },
  solution: {
    title: "Решение",
    body: "Предложение помогает сравнивать варианты цены и оставляет ручной выбор доступным.",
    principles: [
      "Рекомендация цены, которую предлагает модель.",
      "Сопоставимые ответы водителей для более понятного выбора.",
      "Опциональный автоматический выбор водителя.",
      "Сохранённый ручной выбор пассажира и водителя.",
    ],
  },
  delivered: {
    title: "Что было сделано",
    body: "Разработчик в команде обучил модель принятия решения по цене на заказах маркетплейса и публичных внешних источниках. Команда реализовала UI на React Native.",
    uiImplementation: "UI реализован командой на React Native.",
  },
  outcome: {
    title: "Результат",
    body: "Drivee Peak получил награду хакатона «Лучший дизайн приложения». После хакатона проект не был коммерчески запущен или продан, поэтому в кейсе нет заявлений о бизнес-метриках или результатах запуска.",
  },
  limitations: {
    title: "Ограничения",
    body: "Это хакатон-проект, а не запуск в продакшене. Метрик запуска, выручки, конверсии или внедрения нет.",
  },
  facts: [
    { label: "Формат", value: "Командный хакатон-проект" },
    { label: "Роль", value: "UX/UI-дизайнер" },
    { label: "Награда", value: "Лучший дизайн приложения" },
    { label: "Реализация", value: "React Native" },
  ],
  slides,
} satisfies ProjectContent;
