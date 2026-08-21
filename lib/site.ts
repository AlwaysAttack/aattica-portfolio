const DEVELOPMENT_SITE_URL = "http://localhost:3000";
const PRODUCTION_SITE_URL = "https://aattica.cc";

export function getSiteUrl(
  configuredUrl = process.env.NEXT_PUBLIC_SITE_URL,
  environment = process.env.NODE_ENV,
): URL {
  const fallbackUrl =
    environment === "production" ? PRODUCTION_SITE_URL : DEVELOPMENT_SITE_URL;
  const resolvedUrl = configuredUrl ?? fallbackUrl;

  let siteUrl: URL;
  try {
    siteUrl = new URL(resolvedUrl);
  } catch {
    throw new Error("NEXT_PUBLIC_SITE_URL must be an absolute http(s) URL");
  }

  if (siteUrl.protocol !== "http:" && siteUrl.protocol !== "https:") {
    throw new Error("NEXT_PUBLIC_SITE_URL must be an absolute http(s) URL");
  }

  return new URL(siteUrl.origin);
}
