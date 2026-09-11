// Per-site runtime configuration — the matrix interface contract.
// Injected by /site-config.js (generated per site by the deploy pipeline) as
// window.__SITE_CONFIG__ BEFORE the bundle executes. Missing file or partial
// fields fall back to the KeyStarter defaults below, so the main site behaves
// identically whether the file is absent or empty.
//
// Prices live ONLY in /site-config.js (deploy config, per site) — never in the
// bundle. Checkout prices always come from WooCommerce.

export interface SiteConfig {
  siteId: string;            // matrix slug, e.g. "keys-starter"
  siteName: string;          // brand shown in UI and email signatures
  canonicalOrigin: string;   // absolute origin used for canonical/og URLs
  apiBase: string;           // prefix for WP/API calls; "" = same-origin proxy (default)
  supportEmail: string;      // contact address + email-form recipient
  whatsappNumber: string;    // wa.me digits without "+"
  whatsappText: string;      // prefilled WhatsApp chat message
  gaId: string;              // GA4 measurement id (single unified gtag)
  defaultTitle: string;      // SEO fallback title
  defaultDesc: string;       // SEO fallback description
  logoSrc: string;           // header logo path (deployed per site)
  design?: string;           // storefront skin: "terminal" | undefined (default)
  locales?: string[];        // optional locale whitelist for i18n
  productSlugs?: string[];   // optional catalog whitelist, in display order
  priceAnchors?: Record<string, number>; // display-only "was" prices; checkout is always Woo
}

declare global {
  interface Window {
    __SITE_CONFIG__?: Partial<SiteConfig>;
  }
}

const DEFAULTS: SiteConfig = {
  siteId: "keys-starter",
  siteName: "KeyStarter",
  canonicalOrigin: "https://keys-starter.com",
  apiBase: "",
  supportEmail: "admin@keys-starter.com",
  whatsappNumber: "14807647544",
  whatsappText: "Hello KeyStarter, I have a question about your products.",
  gaId: "G-SVM4WGFYKD",
  defaultTitle: "KeyStarter — Genuine Software Licenses",
  defaultDesc:
    "Buy genuine Windows 11/10 Pro, Office, IoT and Server license keys at KeyStarter. Instant email delivery, lifetime support, secure checkout.",
  logoSrc: "/keystarter-logo.svg",
};

export const SITE: SiteConfig = {
  ...DEFAULTS,
  ...(typeof window !== "undefined" ? window.__SITE_CONFIG__ : undefined),
};

/** Prefix a same-origin API path with this site's API base. */
export const api = (path: string): string => SITE.apiBase + path;

/** Catalog whitelist: when productSlugs is set, filter to it and keep its order. */
export function filterBySiteCatalog<T extends { slug: string }>(list: T[]): T[] {
  if (!SITE.productSlugs || SITE.productSlugs.length === 0) return list;
  const rank = new Map(SITE.productSlugs.map((s, i) => [s, i] as const));
  return list
    .filter((x) => rank.has(x.slug))
    .sort((a, b) => (rank.get(a.slug) as number) - (rank.get(b.slug) as number));
}
