import type { HomeContent } from "@/content/home.types";

export const homeContentEn = {
  metadata: {
    title: "aattica. — UX/UI & Product Designer",
    description:
      "Portfolio of Daniil Golsky, a UX/UI and product designer focused on clear flows, polished interfaces, and developer-ready outcomes.",
    openGraphLocale: "en_US",
  },
  navigation: {
    ariaLabel: "Primary navigation",
    items: [
      { href: "#about", label: "About" },
      { href: "#projects", label: "Projects" },
      { href: "#contact", label: "Contact" },
    ],
    switchLabel: "Switch to Russian",
    switchText: "RU",
  },
  hero: {
    ariaLabel: "aattica introduction",
    bearLabel: "aattica bear mark",
    wordmarkLabel: "aattica. // human-made.",
    eyebrow: "ux/ui designer",
    scrollLabel: "Scroll to meet me",
  },
  about: {
    eyebrow: "01 / PROFILE",
    title: "About me",
    statement:
      "I design clear digital products from problem framing and research to user flows, polished interfaces, and developer handoff.",
    introduction:
      "I’m Daniil Golsky, a UX/UI and product designer with 2 years of experience turning complex scenarios into interfaces people can understand and use.",
    approachTitle: "How I work",
    approach:
      "I start with the problem and its context, map the important scenarios, check the interaction logic, and then develop the visual system. I keep implementation in view throughout the process and prepare clear materials for developer handoff.",
    facts: [
      { label: "Experience", value: "2 years" },
      { label: "Languages", value: "Russian native, English B2" },
      { label: "Format", value: "Remote and freelance" },
      { label: "Focus", value: "UX/UI and product design" },
    ],
    capabilitiesTitle: "Capabilities",
    capabilities: [
      "UX research",
      "User flows",
      "Interface design",
      "Prototyping",
      "Responsive design",
      "Components and design systems",
      "Developer handoff",
    ],
    toolsTitle: "Tools",
    tools: [
      "Figma",
      "ProtoPie",
      "Adobe Illustrator",
      "Blender",
      "React",
      "HTML/CSS/JS",
    ],
    resumesTitle: "Resume",
    resumes: ["Resume RU — coming soon", "Resume EN — coming soon"],
  },
  projects: {
    eyebrow: "02 / SELECTED WORK",
    title: "Selected projects",
    statusLabel: "Coming soon",
    items: [
      {
        slug: "drivee",
        status: "published",
        index: "01",
        title: "Drivee Peak",
        category: "Product design · Hackathon",
        summary:
          "Recommended pricing and automated driver selection inside the Drivee ecosystem.",
        result: "Best App Design",
        openLabel: "Open Drivee Peak case study",
      },
      {
        slug: "chestnopro",
        status: "coming-soon",
        index: "02",
        title: "ЧестноПро",
        category: "Branding · Real business",
        summary:
          "Naming, identity, and information materials for a service center.",
        result: "Business cards and information stand produced",
        openLabel: "Open ЧестноПро case study",
      },
      {
        slug: "atlanta-vpn",
        status: "coming-soon",
        index: "03",
        title: "Atlanta VPN",
        category: "iOS · Individual concept",
        summary:
          "A clean flow from launch to connection through location selection.",
        result: "Competition presentation and prototype",
        openLabel: "Open Atlanta VPN case study",
      },
    ],
  },
  contact: {
    eyebrow: "03 / CONTACT",
    title: "Let’s make something human.",
    formLabel: "Contact form",
    fields: {
      name: "Name",
      replyContact: "Reply contact",
      company: "Company",
      message: "Message",
    },
    sendLabel: "Send message",
    note: "Frontend demonstration — messages are not delivered yet.",
    submittedStatus:
      "Demo submitted — Django delivery will be connected later.",
  },
  footer: "aattica. // human-made. © 2026",
} satisfies HomeContent;
