import { homeContent } from "@/content/home";

export function SiteHeader() {
  return (
    <header className="site-header">
      <a className="brand" href="#top">
        aattica.
      </a>
      <nav aria-label="Primary navigation">
        {homeContent.navigation.map((item) => (
          <a href={item.href} key={item.href}>
            {item.label}
          </a>
        ))}
        <button type="button" aria-label="Switch language" disabled>
          RU / EN
        </button>
      </nav>
    </header>
  );
}
