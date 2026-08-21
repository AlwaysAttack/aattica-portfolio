import type { ProjectContent, ProjectSlide } from "@/content/projects.types";

const slides: readonly ProjectSlide[] = [
  { src: "/cases/drivee/slides/slide-01.png", alt: "Peak logo over a city map", width: 3840, height: 2160 },
  { src: "/cases/drivee/slides/slide-02.png", alt: "Drivee Peak title card: search for the best price", width: 3840, height: 2160 },
  { src: "/cases/drivee/slides/slide-03.png", alt: "Hackathon project format and team roles", width: 3840, height: 2160 },
  { src: "/cases/drivee/slides/slide-04.png", alt: "Service problem section title", width: 3840, height: 2160 },
  { src: "/cases/drivee/slides/slide-05.png", alt: "Drivee price-offer problem for passengers and drivers", width: 3840, height: 2160 },
  { src: "/cases/drivee/slides/slide-06.png", alt: "Goal: faster and clearer price agreement between passenger and driver", width: 3840, height: 2160 },
  { src: "/cases/drivee/slides/slide-07.png", alt: "Solution exploration section title", width: 3840, height: 2160 },
  { src: "/cases/drivee/slides/slide-08.png", alt: "Passenger journey from route to matched driver", width: 3840, height: 2160 },
  { src: "/cases/drivee/slides/slide-09.png", alt: "Price recommendation beside manual input on the passenger screen", width: 3840, height: 2160 },
  { src: "/cases/drivee/slides/slide-10.png", alt: "Comparing driver offers and prices on the passenger screen", width: 3840, height: 2160 },
  { src: "/cases/drivee/slides/slide-11.png", alt: "Automatic driver selection with an opt-out control", width: 3840, height: 2160 },
  { src: "/cases/drivee/slides/slide-12.png", alt: "Driver journey from order feed to counteroffer", width: 3840, height: 2160 },
  { src: "/cases/drivee/slides/slide-13.png", alt: "Automation supports but does not replace manual control", width: 3840, height: 2160 },
  { src: "/cases/drivee/slides/slide-14.png", alt: "Five passenger search steps across mobile screens", width: 3840, height: 2160 },
  { src: "/cases/drivee/slides/slide-15.png", alt: "Driver accepts or counteroffers on an order screen", width: 3840, height: 2160 },
  { src: "/cases/drivee/slides/slide-16.png", alt: "Price decision with passenger choice preserved", width: 3840, height: 2160 },
  { src: "/cases/drivee/slides/slide-17.png", alt: "Peak onboarding and state screens", width: 3840, height: 2160 },
  { src: "/cases/drivee/slides/slide-18.png", alt: "Peak closing statement: choice for both sides", width: 3840, height: 2160 },
  { src: "/cases/drivee/slides/slide-19.png", alt: "aattica closing card", width: 3840, height: 2160 },
];

export const driveeContentEn = {
  slug: "drivee",
  navigation: {
    backToProjects: "Back to selected projects",
    switchLocale: "Read in Russian",
    presentation: "Original presentation",
    contact: "Get in touch",
  },
  hero: {
    title: "Drivee Peak",
    valueProposition:
      "A hackathon concept for making taxi price agreement faster and clearer while preserving choice for passengers and drivers.",
    award: "Best App Design",
    role: "UX/UI designer",
    format: "Team hackathon project",
    outcome: "Awarded concept; not commercially launched or sold.",
  },
  context: {
    title: "Context",
    body: "Drivee Peak explored a clearer taxi price-agreement experience.",
  },
  problem: {
    title: "Problem",
    body: "Price agreement can be slow and opaque. The concept focused on making the decision easier to understand without removing either side's control.",
  },
  research: {
    title: "Research",
    body: "The team conducted direct interviews and analysed competitor sites and solutions to identify familiar decision patterns.",
  },
  role: {
    title: "My role",
    body: "I created the guideline, UX/UI, Figma screens, and the presentation. I also reconstructed the driver-side flow and CJM without access to Drivee's private driver-order interface.",
  },
  process: {
    title: "Process",
    body: "The reconstructed driver-side flow and CJM were created without access to Drivee's private driver-order interface. They cover cancellation, price changes, driver search, counteroffers, and related states using established interaction patterns.",
  },
  solution: {
    title: "Solution",
    body: "The proposal helps people compare price decisions while keeping manual choice available.",
    principles: [
      "A price recommendation informed by the model.",
      "Comparable driver responses for a clearer decision.",
      "Optional automated driver selection.",
      "Preserved manual choice for passengers and drivers.",
    ],
  },
  delivered: {
    title: "Delivered work",
    body: "A teammate trained the price-decision model using marketplace orders and public external sources. The team implemented the UI in React Native.",
    uiImplementation: "UI implemented by the team in React Native.",
  },
  outcome: {
    title: "Outcome",
    body: "Drivee Peak received the hackathon's Best App Design award. It was not commercially launched or sold after the hackathon, so this case makes no performance or business-metric claims.",
  },
  limitations: {
    title: "Limitations",
    body: "This was a hackathon project, not a production rollout. There are no launch, revenue, conversion, or adoption metrics to report.",
  },
  facts: [
    { label: "Format", value: "Team hackathon project" },
    { label: "Role", value: "UX/UI designer" },
    { label: "Recognition", value: "Best App Design" },
    { label: "Implementation", value: "React Native" },
  ],
  slides,
} satisfies ProjectContent;
