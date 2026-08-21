import { notFound } from "next/navigation";
import { AboutSection } from "@/components/home/about-section";
import { ContactSection } from "@/components/home/contact-section";
import { HeroSection } from "@/components/home/hero-section";
import { ProjectsSection } from "@/components/home/projects-section";
import { SiteHeader } from "@/components/site-header";
import { getHomeContent, type HomeContent } from "@/content/home";
import { isLocale, type Locale } from "@/lib/i18n";

type LocalizedHomePageProps = {
  content: HomeContent;
  locale: Locale;
};

export function LocalizedHomePage({
  content,
  locale,
}: LocalizedHomePageProps) {
  return (
    <>
      <SiteHeader content={content.navigation} locale={locale} />
      <main>
        <HeroSection content={content.hero} />
        <AboutSection content={content.about} />
        <ProjectsSection content={content.projects} locale={locale} />
        <ContactSection content={content.contact} />
      </main>
      <footer>{content.footer}</footer>
    </>
  );
}

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;

  if (!isLocale(lang)) {
    notFound();
  }

  return <LocalizedHomePage locale={lang} content={getHomeContent(lang)} />;
}
