export type ProjectSlug = "drivee" | "chestnopro" | "atlanta-vpn";

export type ProjectSummary = {
  slug: ProjectSlug;
  index: string;
  title: string;
  category: string;
  summary: string;
  result: string;
  openLabel: string;
};

export type HomeContent = {
  metadata: {
    title: string;
    description: string;
    openGraphLocale: string;
  };
  navigation: {
    ariaLabel: string;
    items: readonly { href: string; label: string }[];
    switchLabel: string;
    switchText: string;
  };
  hero: {
    ariaLabel: string;
    bearLabel: string;
    wordmarkLabel: string;
    eyebrow: string;
    scrollLabel: string;
  };
  about: {
    eyebrow: string;
    title: string;
    statement: string;
    introduction: string;
    approachTitle: string;
    approach: string;
    facts: readonly { label: string; value: string }[];
    capabilitiesTitle: string;
    capabilities: readonly string[];
    toolsTitle: string;
    tools: readonly string[];
    resumesTitle: string;
    resumes: readonly string[];
  };
  projects: {
    eyebrow: string;
    title: string;
    items: readonly ProjectSummary[];
  };
  contact: {
    eyebrow: string;
    title: string;
    formLabel: string;
    fields: {
      name: string;
      replyContact: string;
      company: string;
      message: string;
    };
    sendLabel: string;
    note: string;
    submittedStatus: string;
  };
  footer: string;
};
