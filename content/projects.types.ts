export type ProjectSlide = {
  src: string;
  alt: string;
  width: 3840;
  height: 2160;
};

export type ProjectContent = {
  slug: ProjectSlug;
  navigation: {
    backToProjects: string;
    switchLocale: string;
    presentation: string;
    contact: string;
  };
  hero: {
    title: string;
    valueProposition: string;
    award: string;
    role: string;
    format: string;
    outcome: string;
  };
  context: {
    title: string;
    body: string;
  };
  problem: {
    title: string;
    body: string;
  };
  research: {
    title: string;
    body: string;
  };
  role: {
    title: string;
    body: string;
  };
  process: {
    title: string;
    body: string;
  };
  solution: {
    title: string;
    body: string;
    principles: readonly string[];
  };
  delivered: {
    title: string;
    body: string;
    uiImplementation: string;
  };
  outcome: string;
  limitations: {
    title: string;
    body: string;
  };
  facts: readonly { label: string; value: string }[];
  slides: readonly ProjectSlide[];
};
import type { ProjectSlug } from "@/content/home.types";
