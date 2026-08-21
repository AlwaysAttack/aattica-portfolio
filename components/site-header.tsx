import type { HomeContent } from "@/content/home";
import type { Locale } from "@/lib/i18n";

type SiteHeaderProps = {
  content: HomeContent["navigation"];
  locale: Locale;
};

export function SiteHeader({ content, locale }: SiteHeaderProps) {
  const otherLocale = locale === "en" ? "ru" : "en";

  return (
    <header className="site-header">
      <a className="brand" href="#top">
        aattica.
      </a>
      <nav aria-label={content.ariaLabel}>
        {content.items.map((item) => (
          <a href={item.href} key={item.href}>
            {item.label}
          </a>
        ))}
        <a
          className="locale-switch"
          href={`/api/locale/${otherLocale}`}
          aria-label={content.switchLabel}
        >
          {content.switchText}
        </a>
      </nav>
    </header>
  );
}
