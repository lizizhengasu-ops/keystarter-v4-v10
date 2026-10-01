import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { products } from "../data/products";
import { DEFAULT_OG_IMAGE, PRODUCT_OG_IMAGES } from "../data/product-og-images";
import { BLOG_ARTICLES } from "../data/blog-articles";
import { EDGE_PRODUCT_META, EDGE_BLOG_INDEX, EDGE_PRODUCTS_INDEX } from "../data/seo-edge";
import { SITE as SITE_CONFIG } from "../site-config";
import { SITE_FAQS, B2B_FAQS, GENERIC_FAQS, FAQ_BY_SERIES } from "../data/faq";
import { HOME_FAQS } from "../data/home-faqs";
import { CONTENT_UPDATED } from "../data/content-meta";
import { FAQ_SERIES_MAP } from "../data/product-comparison";
import type { FAQItem } from "../data/faq";

const SITE = SITE_CONFIG.canonicalOrigin;
const SITE_NAME = SITE_CONFIG.siteName;
const FALLBACK_TITLE = SITE_CONFIG.defaultTitle;
const FALLBACK_DESC = SITE_CONFIG.defaultDesc;

interface PageMeta {
  title: string;
  description: string;
}

const ROUTE_META: Record<string, PageMeta> = {
  "/": { title: FALLBACK_TITLE, description: FALLBACK_DESC },
  "/product-category/windows": {
    title: "Windows License Keys — Buy Genuine Windows 10/11 | KeyStarter",
    description: "Genuine Windows 10 and 11 license keys: Home, Pro, Official and IoT editions. Instant email delivery and verified activation.",
  },
  "/product-category/office": {
    title: "Office License Keys — Office 2019 & 2021 Professional Plus | KeyStarter",
    description: "Genuine Office 2019 and 2021 Professional Plus keys: perpetual licenses, instant delivery and lifetime activation.",
  },
  "/product-category/server-sql": {
    title: "Windows Server & SQL License Keys — Volume Pricing | KeyStarter",
    description: "Windows Server 2019/2022/2025 and SQL Server runtime keys: IoT editions, volume pricing and compliance documentation.",
  },
  "/product-category/iot-enterprise": {
    title: "Windows IoT Enterprise License Keys — LTSC Editions | KeyStarter",
    description: "Windows 10/11 IoT Enterprise LTSC keys: Value, High End and Entry editions with 10-year lifecycle support.",
  },
  "/products": {
    title: "All Products — Genuine Windows, Office, IoT & Server Keys",
    description:
      "Browse genuine Windows 11/10, Office 2019/2021, IoT and Server license keys with instant delivery, lifetime support and secure checkout.",
  },
  "/blog": {
    title: "Blog — KeyStarter",
    description:
      "Guides and updates from KeyStarter about Windows, Office and software licensing.",
  },
  "/links": {
    title: "Quick Links — KeyStarter",
    description:
      "Shop best sellers, read the blog, subscribe for updates and request a B2B quote at KeyStarter.",
  },
  "/b2b": {
    title: "B2B License Keys & Volume Licensing — Custom Quotes | KeyStarter",
    description:
      "Buy B2B license keys in volume: genuine Windows, Office, IoT and Server keys for teams of 5 to 5,000 — custom quotes in 24h, compliance documentation and dedicated support.",
  },
  "/about": {
    title: "About KeyStarter",
    description:
      "KeyStarter provides genuine Microsoft license keys with instant delivery and lifetime support.",
  },
  "/support": {
    title: "Support Center — Activation, Licensing & Refund Help | KeyStarter",
    description:
      "Get help with Windows, Office, IoT and Server license keys: activation, installation, refunds and account questions at KeyStarter.",
  },
  "/faq": {
    title: "FAQ — KeyStarter",
    description:
      "Answers to common questions about KeyStarter license keys, delivery and activation.",
  },
  "/black-friday": {
    title: "Black Friday 2026 — Microsoft Key Deals, Early Access | KeyStarter",
    description:
      "Join the Black Friday 2026 early-access list: genuine Windows and Office license keys at Black Friday prices, instant email delivery and a 14-day refund guarantee.",
  },
  "/contact": {
    title: "Contact — KeyStarter",
    description: "Contact KeyStarter support for order and licensing questions.",
  },
  "/account": {
    title: "My Account — KeyStarter",
    description: "Manage your KeyStarter orders and licenses.",
  },
  "/cart": {
    title: "Cart — KeyStarter",
    description: "Review your KeyStarter cart and check out securely.",
  },
  "/privacy": {
    title: "Privacy Policy — How KeyStarter Protects Your Data",
    description:
      "How KeyStarter collects, uses and protects personal data: order data, analytics, cookies and your GDPR/CCPA rights.",
  },
  "/terms": {
    title: "Terms of Service — KeyStarter Software Licensing",
    description:
      "The terms governing purchases and use of Microsoft license keys delivered by KeyStarter, including licensing scope and delivery.",
  },
  "/refund": {
    title: "14-Day Refund Policy — KeyStarter License Keys",
    description:
      "Keys that fail to activate through no fault of the buyer are replaced or refunded within 14 days. See the full policy and process.",
  },
  "/cookies": {
    title: "Cookie Policy — KeyStarter",
    description: "How KeyStarter uses cookies on its website.",
  },
  "/disclaimer": {
    title: "Disclaimer — KeyStarter",
    description: "Legal disclaimer for KeyStarter product listings and services.",
  },
  "/licensing": {
    title: "Licensing Information — KeyStarter",
    description:
      "Licensing details for Windows, Office, IoT and Server products at KeyStarter.",
  },
  "/changelog": {
    title: "Product Changelog — KeyStarter Platform Updates",
    description: "Recent updates and improvements to the KeyStarter website.",
  },
  "/downloads": {
    title: "Downloads & Delivery — KeyStarter",
    description:
      "Official Microsoft installers and delivery instructions for your Windows, Office, Server and SQL licenses.",
  },
};

const NOT_FOUND_META: PageMeta = {
  title: "Page Not Found — KeyStarter",
  description: FALLBACK_DESC,
};

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(
    `meta[${attr}="${key}"]`
  );
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(
    'link[rel="canonical"]'
  );
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function setJsonLd(nodes: object | object[] | null) {
  // SPA owns #seo-jsonld. Worker-injected blocks (no id) carry live WP data:
  // ABSORB their BlogPosting/FAQPage into the rebuilt graph (worker data wins
  // - it has real dateModified), drop the rest, then rebuild as one owner
  // block. Pitfall 26 fix: this stops hydration from stripping the worker's
  // FAQPage on blog articles (crawler view and browser view now agree).
  const absorbed: Record<string, object> = {};
  document.head
    .querySelectorAll('script[type="application/ld+json"]:not(#seo-jsonld)')
    .forEach((el) => {
      try {
        const j = JSON.parse(el.textContent || "") as { "@graph"?: object[] };
        ((j["@graph"] || [j]) as { "@type"?: string }[]).forEach((n) => {
          if (
            n &&
            (n["@type"] === "BlogPosting" || n["@type"] === "FAQPage") &&
            !absorbed[n["@type"]]
          ) {
            absorbed[n["@type"]] = n;
          }
        });
      } catch {
        /* malformed external block - ignore */
      }
      el.remove();
    });
  document.head
    .querySelectorAll("script#seo-jsonld")
    .forEach((el) => el.remove());
  if (!nodes || (Array.isArray(nodes) && nodes.length === 0)) return;
  let list: object[] = Array.isArray(nodes) ? nodes.slice() : [nodes];
  list = list.filter(
    (n) => !absorbed[(n as { "@type"?: string })["@type"] ?? ""]
  );
  list = list.concat(Object.values(absorbed));
  if (list.length === 0) return;
  const payload = { "@context": "https://schema.org", "@graph": list };
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.id = "seo-jsonld";
  script.textContent = JSON.stringify(payload);
  document.head.appendChild(script);
}

// Stable entity id so every page references the same Organization node.
const ORG_ID = `${SITE}/#organization`;
const ORG_NODE = {
  "@type": "Organization",
  "@id": ORG_ID,
  name: SITE_NAME,
  url: SITE,
  logo: `${SITE}/keystarter-logo.svg`,
  description:
    "KeyStarter is a third-party reseller of genuine Microsoft Windows, Office, IoT and Server license keys, serving individuals and businesses with instant delivery, volume pricing and compliance support.",
  sameAs: ["https://www.trustpilot.com/review/keys-starter.com"],
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: SITE_CONFIG.supportEmail,
      availableLanguage: ["English"],
    },
  ],
};
const ORG_JSONLD = ORG_NODE;

const faqNode = (id: string, faqs: FAQItem[], dateModified?: string) => ({
  "@type": "FAQPage",
  "@id": id,
  ...(dateModified ? { dateModified } : {}),
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});

const breadcrumbNode = (id: string, items: { name: string; url: string }[]) => ({
  "@type": "BreadcrumbList",
  "@id": id,
  itemListElement: items.map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: it.name,
    item: it.url,
  })),
});

export default function SeoManager() {
  const { pathname } = useLocation();
  const firstRender = useRef(true);
  // True only on the very first effect run when the edge already injected
  // title/canonical/og — those stay edge-owned; JSON-LD never does.
  const firstRenderEdgeOwned = useRef(false);

  useEffect(() => {
    // Remove the edge-injected sr-only brand/product H1 so each page has exactly
    // one visible main H1.
    document
      .querySelectorAll('h1[style*="position:absolute"], h1[style*="left:-9999px"]')
      .forEach((el) => el.remove());
    // Keep the server/edge-injected SEO v2 title/meta/canonical/og, but the SPA
    // is the single owner of structured data: on every route (including the
    // edge-owned first paint) replace all JSON-LD with the current @graph.
    if (firstRender.current) {
      firstRender.current = false;
      if (document.head.querySelector('link[rel="canonical"]')) {
        firstRenderEdgeOwned.current = true;
        // Some deployments do not ship an og:image — never let the page go out
        // without one.
        if (!document.head.querySelector('meta[property="og:image"]')) {
          upsertMeta("property", "og:image", DEFAULT_OG_IMAGE);
        }
        const prodLd = Array.from(document.querySelectorAll('script[type="application/ld+json"]'))
          .map(s => { try { return { s, j: JSON.parse(s.textContent) }; } catch { return null; } })
          .find(x => x && x.j && x.j["@type"] === "Product" && !x.j.image);
        if (prodLd) {
          try {
            const sl = location.pathname.replace(/^.*\/product\//, "").replace(/\/+$/, "");
            prodLd.j.image = PRODUCT_OG_IMAGES[sl] || DEFAULT_OG_IMAGE;
            prodLd.s.textContent = JSON.stringify(prodLd.j);
          } catch { /* leave edge LD untouched */ }
        }
        // fall through to the shared JSON-LD builder below
      }
    }
    const path = pathname.replace(/\/+$/, "") || "/";
    const product =
      path.startsWith("/product/") && path.length > "/product/".length
        ? products.find((p) => p.slug === path.slice("/product/".length))
        : undefined;
    const blogSlug =
      path.startsWith("/blog/") && path.length > "/blog/".length
        ? path.slice("/blog/".length)
        : null;
    const article = blogSlug ? BLOG_ARTICLES[blogSlug] : undefined;
    const meta = product
      ? (EDGE_PRODUCT_META[product.slug] ?? {
          title: `${product.n} — ${SITE_NAME}`,
          description: `${product.d} - ${product.specs.version}, ${product.specs.type}. Instant delivery with lifetime support.`,
        })
      : article
        ? { title: `${article.title} | ${SITE_NAME}`, description: article.description }
        : blogSlug
          ? {
              title: `${blogSlug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())} | ${SITE_NAME}`,
              description: ROUTE_META["/blog"].description,
            }
          : path === "/products"
            ? EDGE_PRODUCTS_INDEX
            : path === "/blog"
              ? EDGE_BLOG_INDEX
              : ROUTE_META[path] ?? NOT_FOUND_META;

    // SPA owns structured data on every route; title/meta/canonical stay
    // edge-owned on the first render when the edge already injected them.
    const edgeOwned = firstRenderEdgeOwned.current;

    if (!edgeOwned) {
      document.title = meta.title;
      upsertMeta("name", "description", meta.description);
      setCanonical(`${SITE}${path}`);
      upsertMeta("property", "og:title", meta.title);
      upsertMeta("property", "og:description", meta.description);
      upsertMeta("property", "og:url", `${SITE}${path}`);
      upsertMeta("property", "og:type", product ? "product" : article ? "article" : "website");
      upsertMeta("property", "og:site_name", SITE_NAME);
      upsertMeta("name", "twitter:card", "summary");
      upsertMeta("name", "twitter:title", meta.title);
      upsertMeta("name", "twitter:description", meta.description);
      const ogImage = product
        ? PRODUCT_OG_IMAGES[product.slug] || DEFAULT_OG_IMAGE
        : DEFAULT_OG_IMAGE;
      upsertMeta("property", "og:image", ogImage);
      upsertMeta("name", "twitter:image", ogImage);
    }

    let jsonLd: object | object[] | null = null;
    if (path === "/") {
      jsonLd = [
        ORG_NODE,
        {
          "@type": "WebSite",
          "@id": `${SITE}/#website`,
          name: SITE_NAME,
          url: SITE,
          publisher: { "@id": ORG_ID },
        },
        {
          "@type": "WebPage",
          "@id": `${SITE}/#webpage`,
          url: `${SITE}/`,
          name: SITE_NAME,
          isPartOf: { "@id": `${SITE}/#website` },
          dateModified: CONTENT_UPDATED,
        },
        faqNode(`${SITE}/#faq`, HOME_FAQS, CONTENT_UPDATED),
      ];
    } else if (article) {
      jsonLd = {
        "@type": "BlogPosting",
        headline: article.title,
        datePublished: article.datePublished,
        dateModified: article.dateModified,
        author: { "@id": ORG_ID },
        publisher: { "@id": ORG_ID },
        mainEntityOfPage: article.url,
        url: article.url,
      };
    } else if (product) {
      const productFaqs = [
        ...(FAQ_SERIES_MAP[product.slug]
          ? FAQ_BY_SERIES[FAQ_SERIES_MAP[product.slug]] || []
          : []),
        ...GENERIC_FAQS,
      ];
      const productUrl = `${SITE}/product/${product.slug}`;
      jsonLd = [
        {
          "@type": "Product",
          "@id": `${productUrl}#product`,
          name: product.n,
          description: meta.description,
          image: PRODUCT_OG_IMAGES[product.slug] || DEFAULT_OG_IMAGE,
          brand: { "@type": "Brand", name: "Microsoft" },
          category: product.specs.type,
          dateModified: CONTENT_UPDATED,
          offers: {
            "@type": "Offer",
            availability: "https://schema.org/InStock",
            url: productUrl,
            // Price intentionally omitted: WooCommerce is the single source of truth.
          },
        },
        faqNode(`${productUrl}#faq`, productFaqs, CONTENT_UPDATED),
        breadcrumbNode(`${productUrl}#breadcrumb`, [
          { name: "Home", url: `${SITE}/` },
          { name: "Products", url: `${SITE}/products` },
          { name: product.n, url: productUrl },
        ]),
      ];
    } else if (path === "/b2b") {
      jsonLd = [
        {
          "@type": "Service",
          "@id": `${SITE}/b2b#service`,
          name: "Enterprise Volume Licensing",
          serviceType: "Microsoft software volume licensing",
          description:
            "Volume Microsoft licensing for businesses from 5 to 5,000+ seats: tiered pricing from 5 keys, VAT invoices, PO-based purchasing, wire transfer, CSV key delivery and compliance documentation for SAM audits. Custom quotes within 24 hours.",
          provider: { "@id": ORG_ID },
          areaServed: "Worldwide",
          url: `${SITE}/b2b`,
          dateModified: CONTENT_UPDATED,
        },
        faqNode(`${SITE}/b2b#faq`, B2B_FAQS, CONTENT_UPDATED),
        breadcrumbNode(`${SITE}/b2b#breadcrumb`, [
          { name: "Home", url: `${SITE}/` },
          { name: "B2B & Volume Licensing", url: `${SITE}/b2b` },
        ]),
      ];
    } else if (path === "/faq") {
      jsonLd = [faqNode(`${SITE}/faq#faq`, SITE_FAQS, CONTENT_UPDATED)];
    } else if (path.startsWith("/product-category/")) {
      const catSlug = path.slice("/product-category/".length);
      const catNames = {
        windows: "Windows License Keys",
        office: "Office License Keys",
        "server-sql": "Windows Server & SQL License Keys",
        "iot-enterprise": "Windows IoT Enterprise License Keys",
      };
      const catMatch = {
        windows: (sl: string) => /^windows-1[01]-(pro|home)(-official)?$/.test(sl),
        office: (sl: string) => /^office-\d{4}-pro-plus$/.test(sl),
        "server-sql": (sl: string) => /^(win-svr-iot|sql-svr)-/.test(sl),
        "iot-enterprise": (sl: string) => /^win-1[01]-iot-/.test(sl),
      }[catSlug];
      const catName = (catNames as Record<string, string>)[catSlug] || catSlug;
      const catProducts = catMatch ? products.filter((p) => catMatch(p.slug)) : [];
      jsonLd = [
        {
          "@type": "ItemList",
          "@id": `${SITE}${path}#list`,
          name: catName,
          dateModified: CONTENT_UPDATED,
          numberOfItems: catProducts.length,
          itemListElement: catProducts.map((p, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: `${SITE}/product/${p.slug}`,
            name: p.n,
          })),
        },
        breadcrumbNode(`${SITE}${path}#breadcrumb`, [
          { name: "Home", url: `${SITE}/` },
          { name: catName, url: `${SITE}${path}` },
        ]),
      ];
    } else {
      jsonLd = ORG_JSONLD;
    }
    setJsonLd(jsonLd);
  }, [pathname]);

  return null;
}
