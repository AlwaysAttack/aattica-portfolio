export type ProjectSummary = {
  slug: "drivee" | "chestnopro" | "atlanta-vpn";
  index: string;
  title: string;
  category: string;
  summary: string;
  result: string;
};

export const homeContent = {
  navigation: [
    { href: "#about", label: "About" },
    { href: "#projects", label: "Projects" },
    { href: "#contact", label: "Contact" },
  ],
  hero: {
    eyebrow: "aattica. / human-made.",
    scrollLabel: "Scroll to meet me",
  },
  about: {
    title: "About me",
    statement:
      "I design clear digital products from problem framing and user flows to polished interfaces and developer handoff.",
    experience: "2 years of experience",
    availability: "Available for remote and freelance work",
    skills: [
      "UX research",
      "User flows",
      "Interface design",
      "Prototyping",
      "Design systems",
      "Developer handoff",
    ],
    tools: [
      "Figma",
      "ProtoPie",
      "Adobe Illustrator",
      "Blender",
      "React",
      "HTML/CSS/JS",
    ],
  },
  projects: [
    {
      slug: "drivee",
      index: "01",
      title: "Drivee Peak",
      category: "Product design · Hackathon",
      summary:
        "Recommended pricing and automated driver selection inside the Drivee ecosystem.",
      result: "Best App Design",
    },
    {
      slug: "chestnopro",
      index: "02",
      title: "ЧестноПро",
      category: "Branding · Real business",
      summary:
        "Naming, identity and information materials for a service center.",
      result: "Business cards and information stand produced",
    },
    {
      slug: "atlanta-vpn",
      index: "03",
      title: "Atlanta VPN",
      category: "iOS · Individual concept",
      summary:
        "A clean flow from launch to connection through location selection.",
      result: "Competition presentation and prototype",
    },
  ] satisfies ProjectSummary[],
} as const;
